// CASTLE chatbot — local Express server that proxies chat messages to Claude
// with RAG retrieval from a Voyage-embedded SQLite vector store.
// API keys live only here, never in the browser.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import mammoth from 'mammoth';
import crypto from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { retrieve, formatContext, stats } from './rag.js';
import { initLogger, loggerEnabled, logMessage, hashIp } from './logger.js';
import adminRouter from './admin.js';
import framingNodesRouter from './framing-nodes/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env'), override: true });
const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.CLAUDE_MODEL || 'claude-haiku-4-5-20251001';
// Framing generation is heavier work than chat Q&A (long documents in, strict
// JSON out) so it defaults to Sonnet. Override via FRAMING_MODEL env var if
// costs bite — Haiku 4.5 also handles this task well.
const FRAMING_MODEL = process.env.FRAMING_MODEL || 'claude-sonnet-5';
const SYSTEM_PROMPT_PATH = path.join(__dirname, 'system-prompt.txt');
const FRAMING_PROMPT_PATH = path.join(__dirname, 'framing-prompt.txt');
const RAG_K = Number(process.env.RAG_K) || 8;
const KNOWLEDGE_DB_PATH = path.join(__dirname, 'knowledge.db');

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY. Copy .env.example to .env and paste your key.');
  process.exit(1);
}
if (!existsSync(SYSTEM_PROMPT_PATH)) {
  console.error(`Missing ${SYSTEM_PROMPT_PATH}.`);
  console.error('Run "npm run build-context" first.');
  process.exit(1);
}

const RAG_ENABLED = existsSync(KNOWLEDGE_DB_PATH) && !!process.env.VOYAGE_API_KEY;
const systemPrompt = readFileSync(SYSTEM_PROMPT_PATH, 'utf8');
const framingPrompt = existsSync(FRAMING_PROMPT_PATH)
  ? readFileSync(FRAMING_PROMPT_PATH, 'utf8')
  : null;
const client = new Anthropic();

// ---- Session-scoped PDF attachments ---------------------------------------
// Users can attach a PDF that stays with their conversation. Held in memory,
// keyed by sessionId, and evicted after ATTACHMENT_TTL_MS of inactivity.
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB) || 10;
const ATTACHMENT_TTL_MS = Number(process.env.ATTACHMENT_TTL_MS) || 60 * 60 * 1000; // 1h
const attachments = new Map(); // sessionId -> { data: Buffer, filename, mediaType, uploadedAt }

setInterval(() => {
  const cutoff = Date.now() - ATTACHMENT_TTL_MS;
  for (const [id, att] of attachments) if (att.uploadedAt < cutoff) attachments.delete(id);
}, 5 * 60 * 1000).unref();

function sanitizeSessionId(raw) {
  if (typeof raw !== 'string') return '';
  return raw.trim().slice(0, 64);
}

// ---- Per-session message cap + cooldown -----------------------------------
// Stops one conversation from going on indefinitely (e.g. a user peppering
// the bot with pointless questions after being asked to stop). Separate from
// CHAT_RATE_LIMIT below, which is a per-IP backstop against scripted abuse --
// this one targets a single conversation regardless of how many other
// sessions share that IP (e.g. a classroom on one campus network).
const SESSION_MESSAGE_CAP = Number(process.env.SESSION_MESSAGE_CAP) || 20;
const SESSION_COOLDOWN_MS = Number(process.env.SESSION_COOLDOWN_MS) || 30 * 60 * 1000; // 30 min
const sessionActivity = new Map(); // sessionId -> { count, cappedAt: number|null, lastSeen }

setInterval(() => {
  const cutoff = Date.now() - SESSION_COOLDOWN_MS - 60 * 60 * 1000; // generous grace period
  for (const [id, a] of sessionActivity) if (a.lastSeen < cutoff) sessionActivity.delete(id);
}, 30 * 60 * 1000).unref();

// Returns an error string if this session should be blocked right now, else null.
// Also updates the session's counters as a side effect.
function checkSessionCap(sessionId) {
  const activity = sessionActivity.get(sessionId) || { count: 0, cappedAt: null, lastSeen: 0 };
  activity.lastSeen = Date.now();

  if (activity.cappedAt) {
    const elapsed = Date.now() - activity.cappedAt;
    if (elapsed < SESSION_COOLDOWN_MS) {
      const waitMin = Math.ceil((SESSION_COOLDOWN_MS - elapsed) / 60000);
      sessionActivity.set(sessionId, activity);
      return `You have hit the message limit for a single session. Please return in ${waitMin} more minute${waitMin === 1 ? '' : 's'} to continue.`;
    }
    // Cooldown elapsed -- start a fresh cycle.
    activity.count = 0;
    activity.cappedAt = null;
  }

  activity.count += 1;
  if (activity.count > SESSION_MESSAGE_CAP) {
    activity.cappedAt = Date.now();
    sessionActivity.set(sessionId, activity);
    const waitMin = Math.round(SESSION_COOLDOWN_MS / 60000);
    return `You have hit the message limit for a single session. Please return in ${waitMin} minutes to continue.`;
  }

  sessionActivity.set(sessionId, activity);
  return null;
}

const app = express();
// Render (and most reverse proxies) forwards client IP via X-Forwarded-For.
// Trust one hop so rate limiting keys on the real client, not the proxy.
app.set('trust proxy', 1);

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins.length === 0 ? true : allowedOrigins }));
app.use(express.json({ limit: '1mb' }));

// Per-IP rate limit on the expensive /chat endpoint. Tuned for "a few friends
// testing" — anyone hammering it will hit the cap quickly.
const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,    // 1 hour
  limit: Number(process.env.CHAT_RATE_LIMIT) || 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Rate limit exceeded. Please wait an hour and try again.' },
});

// Serve the landing page and widget from /public.
const PUBLIC_DIR = path.join(__dirname, 'public');
if (existsSync(PUBLIC_DIR)) app.use(express.static(PUBLIC_DIR));

app.get('/health', (req, res) => {
  const ragInfo = RAG_ENABLED ? safeStats() : { enabled: false };
  res.json({
    ok: true,
    model: MODEL,
    systemPromptChars: systemPrompt.length,
    approxTokens: Math.round(systemPrompt.length / 4),
    rag: { enabled: RAG_ENABLED, k: RAG_K, ...ragInfo },
  });
});

function safeStats() { try { return { enabled: true, ...stats() }; } catch (e) { return { enabled: false, error: e.message }; } }

app.use(adminRouter);
// Framing tool v2 — server-backed multi-user library.
// Silently 503s if DATABASE_URL isn't configured yet, so the chatbot
// keeps working before Warren adds the Render Postgres addon.
app.use('/api/framing-nodes', framingNodesRouter);

// ---- Upload / attachment endpoints ----------------------------------------
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: Number(process.env.UPLOAD_RATE_LIMIT) || 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Upload rate limit exceeded. Please wait an hour and try again.' },
});
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') return cb(new Error('Only PDF files are supported.'));
    cb(null, true);
  },
});

app.post('/upload', uploadLimiter, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const sessionId = sanitizeSessionId(req.query.sessionId || req.body?.sessionId);
    if (!sessionId) return res.status(400).json({ error: 'sessionId required' });
    attachments.set(sessionId, {
      data: req.file.buffer,
      filename: req.file.originalname || 'document.pdf',
      mediaType: 'application/pdf',
      uploadedAt: Date.now(),
    });
    res.json({ ok: true, filename: req.file.originalname, size: req.file.size });
  });
});

app.get('/attachment', (req, res) => {
  const sessionId = sanitizeSessionId(req.query.sessionId);
  const att = sessionId ? attachments.get(sessionId) : null;
  if (!att) return res.json({ attached: false });
  res.json({ attached: true, filename: att.filename, size: att.data.length });
});

app.delete('/attachment', (req, res) => {
  const sessionId = sanitizeSessionId(req.query.sessionId);
  if (sessionId) attachments.delete(sessionId);
  res.json({ ok: true });
});

// ---- /framing --------------------------------------------------------------
// One-shot endpoint used by /decision-framing-tool/ to generate a first-cut decision
// framing (metrics pyramid + decision matrix + uncertainty matrix) from a
// text description, a URL, and/or an uploaded document. Fills all three tools
// on the page in one call. Independent of the /chat session model.
const FRAMING_MAX_UPLOAD_MB = Number(process.env.FRAMING_MAX_UPLOAD_MB) || 15;
const FRAMING_MAX_CHARS = Number(process.env.FRAMING_MAX_CHARS) || 120000;
const framingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: Number(process.env.FRAMING_RATE_LIMIT) || 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Framing rate limit exceeded. Please wait an hour and try again.' },
});
const framingUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: FRAMING_MAX_UPLOAD_MB * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const ok =
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'text/plain' ||
      file.mimetype === 'text/markdown' ||
      /\.(pdf|docx|txt|md)$/i.test(file.originalname || '');
    if (!ok) return cb(new Error('Only PDF, DOCX, TXT, or MD files are supported.'));
    cb(null, true);
  },
});

const FRAMING_TOOL = {
  name: 'record_framing',
  description: 'Record a decision framing: a metrics pyramid, an ordered decisions list with its impact matrix, and an ordered uncertainties list with its impact matrix.',
  input_schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'A short case name (2–5 words) suitable for a filename or a library card title. This is NOT a description — it is a compact identifier. Examples: "Aurora Motors", "Northstar Inventory", "Regional Freight Dispatch", "Meningitis Trial Design". No punctuation at the end, no leading article. Derive from the company / problem / domain named in the source material.',
      },
      description: {
        type: 'string',
        description: 'A 1–2 sentence abstract of the framed decision problem — who the decision-maker is, what they\'re deciding, and roughly the shape (e.g. "A regional dispatch manager choosing weekly load and driver assignments under demand and disruption uncertainty. 6 metrics, 5 decisions, 5 uncertainties."). Shown under the title in the library. Aim for 20–40 words.',
      },
      metrics: {
        type: 'array',
        items: { type: 'string' },
        description: 'Short performance metric names (2–4 words), ordered by pyramid tier (Tier 1 first). Length must match the requested size: small=4, medium=6, large=10, max=20.',
      },
      assignments: {
        type: 'object',
        additionalProperties: { type: 'integer', minimum: 1, maximum: 4 },
        description: 'Every metric name → its pyramid tier (1–4). Exactly one metric maps to 1.',
      },
      decisions: {
        type: 'array',
        items: { type: 'string' },
        description: 'Decisions the decision-maker controls, ordered most-impactful first. Length must match: small=3, medium=5, large=8, max=20.',
      },
      subDecisions: {
        type: 'object',
        description: 'OPTIONAL. For any top-level decision that is CATEGORICAL — a choice among concrete alternatives (e.g. "Choose supplier" → specific suppliers, "Choose production location" → specific cities, "Which drug candidate to advance" → specific compounds) — provide the ordered list of options. Keys must match top-level decision names exactly. OMIT entries for atomic decisions (e.g. "Set price", "Approve design", "Schedule production"). Sub-count caps per size: small≤4, medium≤6, large≤8, max≤12 per parent. Do NOT nest further — this is the ONLY additional level.',
        additionalProperties: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      matrix: {
        type: 'object',
        description: 'Impact matrix keyed by decision name → object keyed by metric name → "H"|"M"|"L"|"N". Include every (decision, metric) pair. Keyed by the TOP-level decision names only — do NOT include sub-decision rows here.',
        additionalProperties: {
          type: 'object',
          additionalProperties: { type: 'string', enum: ['H', 'M', 'L', 'N'] },
        },
      },
      uncertainties: {
        type: 'array',
        items: { type: 'string' },
        description: 'External uncertain factors, ordered most-impactful first. Length must match: small=3, medium=5, large=8, max=20.',
      },
      uMatrix: {
        type: 'object',
        description: 'Impact matrix keyed by uncertainty name → object keyed by metric name → "H"|"M"|"L"|"N". Include every pair.',
        additionalProperties: {
          type: 'object',
          additionalProperties: { type: 'string', enum: ['H', 'M', 'L', 'N'] },
        },
      },
    },
    required: ['metrics', 'assignments', 'decisions', 'matrix', 'uncertainties', 'uMatrix'],
  },
};

// ---- create_framing_link (AskPP chatbot tool) -----------------------------
// Lets the AskPP chatbot hand the user a URL that opens Warren's decision
// framing tool with a fully-populated framing. The framing tool already
// reads its whole state from the ?p= URL param (that's how Copy URL works);
// we just base64url-encode the framing here and prepend &src=askpp so the
// tool page can badge the banner as "AI draft — Ask Professor Powell".
const FRAMING_TOOL_URL = process.env.FRAMING_TOOL_URL
  || 'https://warrenpowell.org/decision-framing-tool/';
const CREATE_FRAMING_LINK_TOOL = {
  name: 'create_framing_link',
  description:
    'Produce a URL that opens Warren\'s decision framing tool with a pre-populated framing (scope + metrics pyramid + decision × metric matrix + uncertainty × metric matrix, all pre-scored). Call this when the user has explained a decision problem in enough detail (or explicitly asks for a framing draft or "what would the framing look like") — NOT when they are just discussing framing concepts. Include the returned URL in your reply as a Markdown link like [Open in the decision framing tool →](URL), and add one or two sentences describing what the user will see.',
  input_schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'A short case name (2–5 words) suitable for a filename or a library card title. NOT a description — a compact identifier. Examples: "Aurora Motors", "Northstar Inventory", "Regional Freight Dispatch". Derive from the company / problem / domain named in the user\'s message.',
      },
      scope: {
        type: 'string',
        description: 'Who or what makes these decisions — role + altitude in the org + planning horizon. Every item below must fit this decision-maker.',
      },
      description: {
        type: 'string',
        description: 'A 1–2 sentence abstract of the framed decision problem — who the decision-maker is, what they\'re deciding, and roughly the shape (e.g. "A regional dispatch manager choosing weekly load and driver assignments under demand and disruption uncertainty. 6 metrics, 5 decisions, 5 uncertainties."). Shown under the title in the library. Aim for 20–40 words.',
      },
      metrics: {
        type: 'array',
        items: { type: 'string' },
        description: 'Short performance metric names (2–4 words each), 4–10 items, ordered by pyramid tier.',
      },
      assignments: {
        type: 'object',
        additionalProperties: { type: 'integer', minimum: 1, maximum: 4 },
        description: 'Every metric → pyramid tier 1–4. Exactly one metric maps to 1.',
      },
      decisions: {
        type: 'array',
        items: { type: 'string' },
        description: 'The levers the decision-maker actually controls (3–8 items), ordered most-impactful first.',
      },
      subDecisions: {
        type: 'object',
        description: 'OPTIONAL. For any top-level decision that is CATEGORICAL — a choice among concrete alternatives (e.g. "Choose supplier" → specific suppliers, "Choose production location" → specific cities, "Which drug candidate to advance" → specific compounds) — provide the ordered list of options. Keys must match top-level decision names exactly. OMIT entries for atomic decisions. Up to ~6 options per parent for a typical chat-generated framing. Do NOT nest further — this is the ONLY additional level.',
        additionalProperties: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      matrix: {
        type: 'object',
        description: 'Impact matrix keyed by decision name → object keyed by metric name → "H"|"M"|"L"|"N". Include every (decision, metric) pair. Keyed by the TOP-level decision names only — do NOT include sub-decision rows here.',
        additionalProperties: {
          type: 'object',
          additionalProperties: { type: 'string', enum: ['H', 'M', 'L', 'N'] },
        },
      },
      uncertainties: {
        type: 'array',
        items: { type: 'string' },
        description: 'External uncertain factors the decision-maker must react to (3–8 items), ordered most-impactful first.',
      },
      uMatrix: {
        type: 'object',
        description: 'Impact matrix keyed by uncertainty name → object keyed by metric name → "H"|"M"|"L"|"N". Include every (uncertainty, metric) pair.',
        additionalProperties: {
          type: 'object',
          additionalProperties: { type: 'string', enum: ['H', 'M', 'L', 'N'] },
        },
      },
    },
    required: ['metrics', 'assignments', 'decisions', 'matrix', 'uncertainties', 'uMatrix'],
  },
};

function encodeFramingToUrl(input) {
  // Coerce every field into the framing tool's state shape.
  const decisions = Array.isArray(input && input.decisions) ? input.decisions : [];
  // Translate the model's subDecisions map into the tool's subframes tree.
  // Only include entries whose parent name matches an actual top-level
  // decision — silently drop stray keys the model may have hallucinated.
  const subframes = {};
  const rawSubs = (input && input.subDecisions && typeof input.subDecisions === 'object')
    ? input.subDecisions : {};
  const parents = new Set(decisions.map(String));
  for (const parent of parents) {
    const subs = rawSubs[parent];
    if (Array.isArray(subs)) {
      const clean = subs.filter(Boolean).map(String);
      if (clean.length) {
        subframes[parent] = {
          scope: '', decisions: clean, matrix: {}, subframes: {},
        };
      }
    }
  }
  const doc = {
    title:         String((input && input.title) || ''),
    scope:         String((input && input.scope) || ''),
    description:   String((input && input.description) || ''),
    metrics:       Array.isArray(input && input.metrics)       ? input.metrics       : [],
    assignments:   (input && input.assignments && typeof input.assignments === 'object') ? input.assignments : {},
    chipColors:    {},   // chatbot doesn't set metric flavors
    decisions,
    matrix:        (input && input.matrix && typeof input.matrix === 'object') ? input.matrix : {},
    subframes,
    uncertainties: Array.isArray(input && input.uncertainties) ? input.uncertainties : [],
    uMatrix:       (input && input.uMatrix && typeof input.uMatrix === 'object') ? input.uMatrix : {},
  };
  const enc = Buffer.from(JSON.stringify(doc), 'utf8').toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return FRAMING_TOOL_URL + '?p=' + enc + '&src=askpp';
}

const ASKPP_TOOL_INSTRUCTIONS =
  '\n\n## Tool: create_framing_link\n\n' +
  'You have a `create_framing_link` tool that hands the user a URL opening ' +
  'Warren\'s decision framing tool with a fully-populated framing (scope, ' +
  'metrics pyramid, decision × metric matrix, uncertainty × metric matrix, ' +
  'all pre-scored H / M / L / N). Use it ONLY when the user has explained ' +
  'a specific decision problem in enough detail to justify a draft — or ' +
  'explicitly asks for one ("give me the framing", "what would the framing ' +
  'look like", "draft it in the tool"). Do NOT call it when the user is ' +
  'just discussing framing concepts or asking definitional questions.\n\n' +
  'When you do call it:\n' +
  '  1. Silently construct a first-cut framing following Warren\'s methodology: ' +
  'a short case `title` (2–5 words like "Aurora Motors" or "Northstar Inventory"), ' +
  'a short scope (role + altitude + horizon), 4–10 metrics organized into a ' +
  '4-tier pyramid (exactly one Tier 1), 3–8 decisions the decision-maker ' +
  'controls, and 3–8 uncertainties they must react to. Pre-score both ' +
  'matrices honestly (not every cell is H — discriminate). ' +
  'When a top-level decision is CATEGORICAL (choose-among-options — e.g. ' +
  '"Choose supplier", "Choose production location", "Which drug candidate to ' +
  'advance"), populate `subDecisions[decision name]` with the specific ' +
  'options (up to ~6). OMIT subDecisions for atomic decisions ("Set price", ' +
  '"Approve design"). Sub-decisions live at ONE level below the parent — ' +
  'no deeper.\n' +
  '  2. Pass it to the tool; you\'ll get back a URL.\n' +
  '  3. In your reply, include the URL as a Markdown link: ' +
  '`[Open in the decision framing tool →](URL)`. Add one or two sentences ' +
  'so the user knows what they\'ll see (Tier 1 metric, rough count of ' +
  'decisions and uncertainties). Do NOT dump the full framing in the chat ' +
  'body — the tool page is the artifact.';

// Very small HTML → text so pages fetched by URL are usable prompt input.
// Strips scripts/styles, unwraps tags, collapses whitespace. Not perfect but
// good enough — Claude tolerates messy input.
function htmlToText(html) {
  return String(html)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Resolve a file (in-memory buffer + declared mediaType/filename) into a
// Claude content block. PDFs go native (Claude reads layout/tables). DOCX
// gets extracted with mammoth. Text just decodes.
async function fileToContentBlock(buf, mediaType, filename) {
  const name = (filename || '').toLowerCase();
  const isPdf = mediaType === 'application/pdf' || name.endsWith('.pdf');
  const isDocx = mediaType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    || name.endsWith('.docx');
  const isText = mediaType === 'text/plain' || mediaType === 'text/markdown'
    || name.endsWith('.txt') || name.endsWith('.md');

  if (isPdf) {
    return {
      type: 'document',
      source: { type: 'base64', media_type: 'application/pdf', data: buf.toString('base64') },
    };
  }
  if (isDocx) {
    const { value } = await mammoth.extractRawText({ buffer: buf });
    const text = (value || '').trim().slice(0, FRAMING_MAX_CHARS);
    return { type: 'text', text: `[Document: ${filename || 'upload.docx'}]\n\n${text}` };
  }
  if (isText) {
    const text = buf.toString('utf8').trim().slice(0, FRAMING_MAX_CHARS);
    return { type: 'text', text: `[Document: ${filename || 'upload.txt'}]\n\n${text}` };
  }
  throw new Error(`Unsupported file type: ${mediaType || filename}`);
}

// Fetch a user-supplied URL server-side (avoids CORS) and turn it into a
// Claude content block. Bounded by size + timeout so a hostile URL can't
// hang the process. Handles PDF, DOCX, HTML/text natively.
async function urlToContentBlock(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  let resp;
  try {
    resp = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'CASTLE-framing-bot/1.0 (+https://warrenpowell.org)' },
    });
  } finally {
    clearTimeout(timeout);
  }
  if (!resp.ok) throw new Error(`Fetch failed (${resp.status}) for ${url}`);
  const ctype = (resp.headers.get('content-type') || '').toLowerCase();
  const buf = Buffer.from(await resp.arrayBuffer());
  if (buf.length > FRAMING_MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`Fetched document too large (${(buf.length / 1024 / 1024).toFixed(1)} MB, cap ${FRAMING_MAX_UPLOAD_MB} MB).`);
  }
  const nameFromUrl = (() => {
    try { return new URL(url).pathname.split('/').pop() || url; }
    catch (_) { return url; }
  })();

  if (ctype.includes('pdf') || /\.pdf(\?|$)/i.test(url)) {
    return fileToContentBlock(buf, 'application/pdf', nameFromUrl);
  }
  if (ctype.includes('wordprocessingml') || /\.docx(\?|$)/i.test(url)) {
    return fileToContentBlock(
      buf,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      nameFromUrl,
    );
  }
  // Everything else: treat as text/HTML. HTML gets tag-stripped; plain text
  // is used as-is.
  const raw = buf.toString('utf8');
  const text = (ctype.includes('html') || /<html[\s>]/i.test(raw.slice(0, 500)) ? htmlToText(raw) : raw)
    .trim()
    .slice(0, FRAMING_MAX_CHARS);
  return { type: 'text', text: `[Source URL: ${url}]\n\n${text}` };
}

function sizeInstructions(size) {
  const s = String(size || 'medium').toLowerCase();
  // Fourth number is the per-parent sub-decision cap for categorical
  // top-level decisions — 0 disables sub-decisions entirely.
  const spec = {
    small:  [4,  3,  3,  4],
    medium: [6,  5,  5,  6],
    large:  [10, 8,  8,  8],
    max:    [20, 20, 20, 12],
  };
  const [m, d, u, subCap] = spec[s] || spec.medium;
  return { size: s in spec ? s : 'medium', metrics: m, decisions: d, uncertainties: u, subCap };
}

// Per-matrix scoring: given the metrics + rows already on the page, fill in
// H/M/L/N cells for one impact matrix. Cheaper + faster than /framing since
// the model isn't inventing the vocabulary, only scoring the interactions.
const MATRIX_TOOL = {
  name: 'record_matrix',
  description: 'Record an impact matrix: for every (row, metric) pair, assign H/M/L/N.',
  input_schema: {
    type: 'object',
    properties: {
      matrix: {
        type: 'object',
        description: 'Object keyed by row name → object keyed by metric name → "H"|"M"|"L"|"N". Include every (row, metric) pair.',
        additionalProperties: {
          type: 'object',
          additionalProperties: { type: 'string', enum: ['H', 'M', 'L', 'N'] },
        },
      },
    },
    required: ['matrix'],
  },
};

app.post('/framing/matrix', framingLimiter, express.json({ limit: '256kb' }), async (req, res) => {
  try {
    const kindRaw = String(req.body?.kind || '').toLowerCase();
    const kind = kindRaw === 'uncertainty' ? 'uncertainty' : (kindRaw === 'decision' ? 'decision' : null);
    if (!kind) return res.status(400).json({ error: 'kind must be "decision" or "uncertainty".' });

    const metrics = Array.isArray(req.body?.metrics) ? req.body.metrics.filter(Boolean).map(String) : [];
    const rows    = Array.isArray(req.body?.rows)    ? req.body.rows.filter(Boolean).map(String)    : [];
    if (metrics.length === 0) return res.status(400).json({ error: 'metrics list is empty.' });
    if (rows.length === 0)    return res.status(400).json({ error: 'rows list is empty.' });
    if (metrics.length > 40 || rows.length > 40) {
      return res.status(400).json({ error: 'Matrix too large (max 40 x 40).' });
    }

    const rowLabel = kind === 'uncertainty' ? 'uncertainties' : 'decisions';
    const rowVerb  = kind === 'uncertainty'
      ? 'external uncertain factors that the decision-maker does NOT control'
      : 'levers the decision-maker actually controls';
    const systemText =
      `You are scoring an impact matrix for Professor Warren Powell's decision-framing tool.\n\n` +
      `The user has already picked ${metrics.length} performance METRICS (ordered by pyramid tier, most important first) ` +
      `and ${rows.length} ${rowLabel} (${rowVerb}). Your job is only to fill in the H/M/L/N impact score for every ` +
      `(row, metric) pair — do NOT invent new metrics or rows, do NOT rename them.\n\n` +
      `Scores:\n` +
      `  H — high impact (strongly moves this metric)\n` +
      `  M — medium (noticeable, second-order effect)\n` +
      `  L — low (small but real)\n` +
      `  N — no meaningful impact\n\n` +
      `Guidance:\n` +
      `- Consider both direct and indirect effects.\n` +
      `- Every row should have at least one H (otherwise it doesn't belong in the model).\n` +
      `- Not every column needs an H from every row — be honest about N cells.\n` +
      `- A matrix full of Hs is useless; discriminate.\n\n` +
      `Return via the record_matrix tool. Keys must match the input strings character-for-character (capitalization + punctuation).`;

    const priorNotes = String(req.body?.priorNotes || '').trim().slice(0, 20000);
    const userText =
      (priorNotes
        ? 'PROBLEM-SETTING NOTES — the user has previously asked the AI to read their material and distill it. Use these notes to inform your H/M/L/N scoring:\n\n' + priorNotes + '\n\n'
        : '') +
      `Metrics (pyramid-ordered, Tier 1 first):\n` +
      metrics.map((m, i) => `  ${i + 1}. ${m}`).join('\n') +
      `\n\n${rowLabel[0].toUpperCase() + rowLabel.slice(1)} (rows):\n` +
      rows.map((r, i) => `  ${i + 1}. ${r}`).join('\n') +
      `\n\nScore every (row, metric) cell.`;

    const response = await client.messages.create({
      model: FRAMING_MODEL,
      // Sized for a 20x20 matrix (max framing size). Each cell entry in
      // the JSON is ~7-10 tokens once the metric name is repeated in the
      // key, so 400 cells alone can push ~4000 output tokens; leaving
      // headroom keeps large matrices from truncating mid-generation.
      max_tokens: 8192,
      system: systemText,
      tools: [MATRIX_TOOL],
      tool_choice: { type: 'tool', name: MATRIX_TOOL.name },
      messages: [{ role: 'user', content: userText }],
    });

    const toolBlock = (response.content || []).find(
      (b) => b.type === 'tool_use' && b.name === MATRIX_TOOL.name,
    );
    if (!toolBlock || !toolBlock.input?.matrix) {
      return res.status(502).json({ error: 'Model did not produce a matrix. Try again.' });
    }

    // Coerce: only keep known rows/metrics; only valid H/M/L/N values.
    const raw = toolBlock.input.matrix;
    const metricSet = new Set(metrics);
    const cleaned = {};
    for (const row of rows) {
      const src = raw[row];
      if (!src || typeof src !== 'object') continue;
      const scored = {};
      for (const m of metrics) {
        const v = String(src[m] || '').toUpperCase();
        if (v === 'H' || v === 'M' || v === 'L' || v === 'N') scored[m] = v;
      }
      if (Object.keys(scored).length) cleaned[row] = scored;
    }

    return res.json({ matrix: cleaned, model: FRAMING_MODEL, usage: response.usage });
  } catch (err) {
    console.error('Framing/matrix error:', err);
    return res.status(500).json({ error: (err && err.message) || 'Unknown error' });
  }
});

// Metrics-pyramid only: given a scope/description (or URL/file) and
// optionally the user's current decisions + uncertainties, generate a
// list of metrics with 4-tier pyramid assignments. Doesn't touch
// decisions, uncertainties, or matrices. Cheaper than /framing since
// the model only produces two small fields.
const PYRAMID_TOOL = {
  name: 'record_pyramid',
  description: 'Record a metrics pyramid: an ordered list of metric names and each metric\'s tier (1 = most important, 4 = least). Exactly one metric on Tier 1.',
  input_schema: {
    type: 'object',
    properties: {
      metrics: {
        type: 'array',
        items: { type: 'string' },
        description: 'Short metric names (2–4 words each), ordered by pyramid tier (Tier 1 first). Length should match the requested size: small=4, medium=6, large=10, max=20.',
      },
      assignments: {
        type: 'object',
        additionalProperties: { type: 'integer', minimum: 1, maximum: 4 },
        description: 'Every metric name → its pyramid tier (1–4). Every metric must appear as a key; exactly one metric maps to 1.',
      },
    },
    required: ['metrics', 'assignments'],
  },
};

app.post('/framing/pyramid', framingLimiter, (req, res) => {
  framingUpload.single('file')(req, res, async (uploadErr) => {
    if (uploadErr) return res.status(400).json({ error: uploadErr.message });
    try {
      const description = String(req.body?.description || '').trim().slice(0, FRAMING_MAX_CHARS);
      const url         = String(req.body?.url || '').trim();
      const scope       = String(req.body?.scope || '').trim().slice(0, 2000);
      const { size, metrics: nM } = sizeInstructions(req.body?.size);
      // Optional: existing decisions and uncertainties as context so the
      // generated metrics fit what the user already has on-screen.
      // Sent as JSON strings in a multipart form because everything else is.
      let existingDecisions = [];
      let existingUncertainties = [];
      try {
        const d = req.body?.existingDecisions;
        if (typeof d === 'string' && d) existingDecisions = JSON.parse(d);
        const u = req.body?.existingUncertainties;
        if (typeof u === 'string' && u) existingUncertainties = JSON.parse(u);
      } catch (_) { /* ignore malformed */ }
      if (!Array.isArray(existingDecisions))    existingDecisions    = [];
      if (!Array.isArray(existingUncertainties)) existingUncertainties = [];
      existingDecisions    = existingDecisions.filter(Boolean).map(String).slice(0, 40);
      existingUncertainties = existingUncertainties.filter(Boolean).map(String).slice(0, 40);

      const userContent = [];
      if (scope) {
        userContent.push({
          type: 'text',
          text:
            `SCOPE — who (or what) is making these decisions:\n${scope}\n\n` +
            `Every metric you propose must be one this decision-maker is judged on.`,
        });
      }
      if (req.file) {
        userContent.push(await fileToContentBlock(
          req.file.buffer, req.file.mimetype, req.file.originalname,
        ));
      }
      if (url) {
        if (!/^https?:\/\//i.test(url)) {
          return res.status(400).json({ error: 'URL must start with http:// or https://.' });
        }
        userContent.push(await urlToContentBlock(url));
      }
      if (description) {
        userContent.push({ type: 'text', text: `Problem description:\n${description}` });
      }
      const priorNotes = String(req.body?.priorNotes || '').trim().slice(0, 20000);
      if (priorNotes) {
        userContent.push({
          type: 'text',
          text: 'PROBLEM-SETTING NOTES — the user has previously asked the AI to read their material and distill it. Treat these notes as authoritative background about the setting; use them to inform the metrics you propose:\n\n' + priorNotes,
        });
      }
      if (existingDecisions.length || existingUncertainties.length) {
        const parts = ['\nUser already has these on-screen — align your metrics with them:'];
        if (existingDecisions.length) {
          parts.push('Decisions (levers the decision-maker controls):');
          existingDecisions.forEach((d, i) => parts.push(`  ${i + 1}. ${d}`));
        }
        if (existingUncertainties.length) {
          parts.push('Uncertainties (external factors):');
          existingUncertainties.forEach((u, i) => parts.push(`  ${i + 1}. ${u}`));
        }
        userContent.push({ type: 'text', text: parts.join('\n') });
      }
      // Need SOMETHING to work from. If nothing but scope, that's often
      // enough to generate a plausible pyramid — allow it.
      if (userContent.length === 0) {
        return res.status(400).json({
          error: 'Add a scope, description, URL, or file first (any of these is enough).',
        });
      }

      userContent.push({
        type: 'text',
        text:
          `Produce a **${size}** metrics pyramid: exactly ${nM} metrics, each assigned to a tier 1–4 ` +
          `(exactly one metric on Tier 1). Return via the record_pyramid tool.\n\n` +
          `Do not invent decisions or uncertainties — this call is for the metrics pyramid ONLY.`,
      });

      const response = await client.messages.create({
        model: FRAMING_MODEL,
        max_tokens: 2048,
        system: framingPrompt || 'You are Professor Warren Powell\'s decision-framing assistant.',
        tools: [PYRAMID_TOOL],
        tool_choice: { type: 'tool', name: PYRAMID_TOOL.name },
        messages: [{ role: 'user', content: userContent }],
      });

      const toolBlock = (response.content || []).find(
        (b) => b.type === 'tool_use' && b.name === PYRAMID_TOOL.name,
      );
      if (!toolBlock) {
        return res.status(502).json({ error: 'Model did not produce a pyramid. Try again.' });
      }

      // Coerce: keep only string metrics; assignments must be 1–4 and
      // reference known metric names. If Tier 1 is missing, promote the
      // first metric so the pyramid at least has a top tier.
      const outMetrics = Array.isArray(toolBlock.input.metrics)
        ? toolBlock.input.metrics.filter(Boolean).map(String)
        : [];
      const rawAssign = (toolBlock.input.assignments && typeof toolBlock.input.assignments === 'object')
        ? toolBlock.input.assignments : {};
      const assignments = {};
      outMetrics.forEach((m) => {
        const t = Number(rawAssign[m]);
        if (Number.isFinite(t) && t >= 1 && t <= 4) assignments[m] = Math.round(t);
      });
      if (!Object.values(assignments).includes(1) && outMetrics.length) {
        assignments[outMetrics[0]] = 1;
      }

      return res.json({
        metrics: outMetrics,
        assignments,
        size,
        model: FRAMING_MODEL,
        usage: response.usage,
      });
    } catch (err) {
      console.error('Framing/pyramid error:', err);
      return res.status(500).json({ error: (err && err.message) || 'Unknown error' });
    }
  });
});

// Ideas-only: given a scope + description (or URL/file) and the user's
// existing metrics/decisions/uncertainties, propose a list of fresh
// decisions (or uncertainties) that could be added. Returns names
// only — no matrix scoring, no pyramid. Used by the "Generate ideas"
// button next to the Decisions/Uncertainties headers. Existing items
// are sent as context so the model doesn't propose duplicates.
const IDEAS_TOOL = {
  name: 'record_ideas',
  description: 'Record a list of proposed decisions or uncertainties (names only, no matrix scoring).',
  input_schema: {
    type: 'object',
    properties: {
      ideas: {
        type: 'array',
        items: { type: 'string' },
        description: 'Short 3–4 word noun phrases. Do not repeat any name in the "existing" list the user already has on screen.',
      },
    },
    required: ['ideas'],
  },
};

app.post('/framing/ideas', framingLimiter, (req, res) => {
  framingUpload.single('file')(req, res, async (uploadErr) => {
    if (uploadErr) return res.status(400).json({ error: uploadErr.message });
    try {
      const kindRaw = String(req.body?.kind || '').toLowerCase();
      const kind = kindRaw === 'uncertainty' ? 'uncertainty'
                 : (kindRaw === 'decision' ? 'decision' : null);
      if (!kind) return res.status(400).json({ error: 'kind must be "decision" or "uncertainty".' });

      const description = String(req.body?.description || '').trim().slice(0, FRAMING_MAX_CHARS);
      const url         = String(req.body?.url || '').trim();
      const scope       = String(req.body?.scope || '').trim().slice(0, 2000);
      // Reuse the sizing table — count of ideas mirrors count of decisions/
      // uncertainties in a framing of that size.
      const { size, decisions: nD } = sizeInstructions(req.body?.size);
      const count = nD;

      // Existing on-screen content — sent so ideas don't duplicate.
      const parseList = (raw) => {
        try {
          if (typeof raw !== 'string' || !raw) return [];
          const arr = JSON.parse(raw);
          return Array.isArray(arr) ? arr.filter(Boolean).map(String).slice(0, 60) : [];
        } catch (_) { return []; }
      };
      const existingMetrics       = parseList(req.body?.existingMetrics);
      const existingDecisions     = parseList(req.body?.existingDecisions);
      const existingUncertainties = parseList(req.body?.existingUncertainties);
      // Sub-frame decisions — only sent when kind='uncertainty' AND drilled
      // in. They concretely describe what's inside the leaf parent's context
      // (e.g. the specific marketing decisions) so proposed uncertainties
      // can be tightly linked to those.
      const subDecisions = parseList(req.body?.subDecisions);

      // Drill-in context. `parentPath` is the ancestry of decisions the user
      // has drilled into (root → … → leaf). When non-empty the model is
      // asked to narrow to that context:
      //   - kind='decision': propose sub-decisions of the leaf parent
      //   - kind='uncertainty': propose uncertainties whose outcomes matter
      //     for the leaf parent's context (still added to the ROOT list)
      // `subScope` is the per-level scope note attached to the leaf sub-frame.
      const parentPath = parseList(req.body?.parentPath);
      const subScope   = String(req.body?.subScope || '').trim().slice(0, 2000);
      const isDrilledIn = parentPath.length > 0;
      const leafParent  = isDrilledIn ? parentPath[parentPath.length - 1] : '';

      const userContent = [];
      if (scope) {
        userContent.push({
          type: 'text',
          text:
            `SCOPE — who (or what) is making these decisions:\n${scope}\n\n` +
            `Every idea you propose must belong to THIS decision-maker's altitude and planning horizon.`,
        });
      }
      if (req.file) {
        userContent.push(await fileToContentBlock(
          req.file.buffer, req.file.mimetype, req.file.originalname,
        ));
      }
      if (url) {
        if (!/^https?:\/\//i.test(url)) {
          return res.status(400).json({ error: 'URL must start with http:// or https://.' });
        }
        userContent.push(await urlToContentBlock(url));
      }
      if (description) {
        userContent.push({ type: 'text', text: `Problem description:\n${description}` });
      }
      const priorNotes = String(req.body?.priorNotes || '').trim().slice(0, 20000);
      if (priorNotes) {
        const nounPlural = kind === 'uncertainty' ? 'uncertainties' : 'decisions';
        userContent.push({
          type: 'text',
          text: 'PROBLEM-SETTING NOTES — the user has previously asked the AI to read their material and distill it. Treat these notes as authoritative background about the setting; use them to inform the ' + nounPlural + ' you propose:\n\n' + priorNotes,
        });
      }
      // Metrics come first and are framed as the DRIVER of idea generation —
      // decisions are levers that move metrics; uncertainties are what makes
      // metric outcomes uncertain. Existing decisions/uncertainties are only
      // sent as an anti-duplication list.
      if (existingMetrics.length) {
        const mParts = [
          'PERFORMANCE METRICS the decision-maker is being evaluated on ' +
          '(these MUST drive your proposals):',
        ];
        existingMetrics.forEach((m, i) => mParts.push(`  ${i + 1}. ${m}`));
        mParts.push('');
        mParts.push(
          'HARD RULE — before proposing any idea, mentally score its impact ' +
          'on each metric above using H (high) / M (medium) / L (low) / N (none). ' +
          'DO NOT propose an idea unless it would score H or M on AT LEAST ONE ' +
          'of the metrics above. Drop any idea that would score only L or N ' +
          'everywhere — those clutter the matrix without moving the needle. ' +
          'It is fine to return fewer ideas than the target count if the ' +
          'good ones run out.'
        );
        userContent.push({ type: 'text', text: mParts.join('\n') });
      }
      if (isDrilledIn) {
        const trail = parentPath.map((p) => `"${p}"`).join(' → ');
        const drillParts = [
          `DRILL-IN CONTEXT — the user has clicked into a decision to narrow ` +
          `the focus. Ancestry (root → leaf): ${trail}.`,
          '',
        ];
        if (kind === 'decision') {
          drillParts.push(
            `You are proposing NEW sub-decisions of the LEAF parent ` +
            `("${leafParent}") — more specific choices that, taken together, ` +
            `implement or refine that parent decision. Each sub-decision must ` +
            `stay under the leaf parent's umbrella (not siblings of it, not ` +
            `unrelated root decisions).`
          );
        } else {
          drillParts.push(
            `You are proposing NEW uncertainties whose outcomes materially ` +
            `change what a decision-maker inside "${leafParent}" should do. ` +
            `Bias every proposal to this context — the resolution of the ` +
            `uncertainty should visibly matter for the sub-decisions inside ` +
            `"${leafParent}", not for the enterprise as a whole. ` +
            `IMPORTANT: uncertainties live once at the root of the framing ` +
            `(not per-sub-decision), so what you return will be appended to ` +
            `the ROOT uncertainty list. That means your proposals must still ` +
            `be phrased as top-level uncertainties the whole framing can ` +
            `carry — just chosen because they matter most for this drill-in ` +
            `area.`
          );
        }
        if (subScope) {
          drillParts.push('', `Scope note attached to this sub-level: ${subScope}`);
        }
        if (kind === 'uncertainty' && subDecisions.length) {
          drillParts.push('', `Specific decisions the user has listed inside "${leafParent}" (context for what "leaf parent" concretely means):`);
          subDecisions.forEach((d, i) => drillParts.push(`  ${i + 1}. ${d}`));
        }
        userContent.push({ type: 'text', text: drillParts.join('\n') });
      }
      if (existingDecisions.length || existingUncertainties.length) {
        // Anti-dup wording differs by (kind, drill state).
        const parts = isDrilledIn
          ? ['\nUser already has these on screen — DO NOT propose duplicates of anything below.']
          : ['\nUser already has these on screen — DO NOT propose duplicates of anything below. Propose NEW items that complement what\'s already listed:'];
        if (existingDecisions.length) {
          if (isDrilledIn && kind === 'decision') {
            parts.push(`Sub-decisions of "${leafParent}" already listed:`);
          } else if (isDrilledIn && kind === 'uncertainty') {
            parts.push('Root decisions (context — you are NOT proposing decisions):');
          } else {
            parts.push('Decisions already listed:');
          }
          existingDecisions.forEach((d, i) => parts.push(`  ${i + 1}. ${d}`));
        }
        if (existingUncertainties.length) {
          parts.push('Root uncertainties already listed:');
          existingUncertainties.forEach((u, i) => parts.push(`  ${i + 1}. ${u}`));
        }
        userContent.push({ type: 'text', text: parts.join('\n') });
      }
      if (userContent.length === 0) {
        return res.status(400).json({
          error: 'Add a scope, description, URL, or file first (any of these is enough).',
        });
      }

      const kindNounSingular = kind;
      const kindNounPlural   = kind === 'uncertainty' ? 'uncertainties' : 'decisions';
      const kindDescription  = kind === 'uncertainty'
        ? 'external uncertain factors the decision-maker must react to (things they do NOT control)'
        : 'levers the decision-maker actually controls — things they DO';

      let closingText;
      if (isDrilledIn && kind === 'decision') {
        closingText =
          `Propose about ${count} NEW sub-decisions of "${leafParent}" — ` +
          `exactly ONE level of specificity down from the parent, not the ` +
          `most-specific-possible action. The idea is a decision tree: each ` +
          `drill step partitions the parent into its natural next split. ` +
          `Example: if the parent is "Increase equity investments" (a broad ` +
          `area), the sub-decisions are the next partitioning ("Choose ` +
          `industry sector", "Choose region weighting", "Choose market cap ` +
          `tier") — NOT individual tickers. If the parent is already narrow ` +
          `("Choose tech sector allocation"), sub-decisions can be more ` +
          `concrete ("Overweight semis", "Underweight software"). Users can ` +
          `always drill deeper to reach the most specific actions. Short ` +
          `noun phrases (3–4 words each). Do NOT repeat anything already on ` +
          `screen. Return via the record_ideas tool.`;
      } else if (isDrilledIn && kind === 'uncertainty') {
        closingText =
          `Propose about ${count} NEW uncertainties that most affect ` +
          `decisions inside "${leafParent}". Each should be a top-level ` +
          `uncertainty (they will be appended to the ROOT uncertainty list, ` +
          `not per-sub-frame) — but chosen because its resolution meaningfully ` +
          `changes what the decision-maker inside "${leafParent}" should do. ` +
          `Example (mutual fund, drilled into "Marketing decisions"): ` +
          `"Ad-channel response rates", "Competitor advertising spend", ` +
          `"Investor-search-term trends" — all top-level uncertainties, but ` +
          `each tightly linked to marketing choices. Short noun phrases ` +
          `(3–4 words each). Do NOT repeat anything already in the root ` +
          `uncertainty list. Return via the record_ideas tool.`;
      } else {
        closingText =
          `Propose about ${count} NEW HIGH-LEVEL ${kindNounPlural} — ` +
          `${kindDescription}. At the ROOT level, each idea must be a ` +
          `categorically DISTINCT strategic area${kind === 'uncertainty' ? ' of uncertainty' : ' of choice'}, not a specific ` +
          `${kind === 'uncertainty' ? 'event or number' : 'action'}. ` +
          (kind === 'uncertainty'
            ? `Example (mutual fund manager): "Market volatility", ` +
              `"Interest rate moves", "Customer churn", "Regulatory changes", ` +
              `"Talent availability" — five unrelated categories of exogenous ` +
              `factors the decision-maker must react to. `
            : `Example (mutual fund manager): "Increase equity ` +
              `investments", "Cash management", "Customer service", ` +
              `"Advertising", "Hiring / staffing" — five unrelated buckets ` +
              `spanning what the decision-maker controls. `) +
          `If two candidates would sit under the same natural parent, keep ` +
          `ONLY the parent and drop the variations. Aim for breadth across ` +
          `areas, not depth within one. Short noun phrases (3–4 words each). ` +
          `Do NOT repeat anything already on screen. Return via the ` +
          `record_ideas tool.`;
      }
      userContent.push({ type: 'text', text: closingText });

      const response = await client.messages.create({
        model: FRAMING_MODEL,
        max_tokens: 2048,
        system: framingPrompt || 'You are Professor Warren Powell\'s decision-framing assistant.',
        tools: [IDEAS_TOOL],
        tool_choice: { type: 'tool', name: IDEAS_TOOL.name },
        messages: [{ role: 'user', content: userContent }],
      });

      const toolBlock = (response.content || []).find(
        (b) => b.type === 'tool_use' && b.name === IDEAS_TOOL.name,
      );
      if (!toolBlock) {
        return res.status(502).json({ error: 'Model did not produce ideas. Try again.' });
      }

      // Coerce + dedupe against existing lists.
      const rawIdeas = Array.isArray(toolBlock.input.ideas)
        ? toolBlock.input.ideas.filter(Boolean).map(String)
        : [];
      const dupSet = new Set(
        (kind === 'uncertainty' ? existingUncertainties : existingDecisions)
          .map((s) => s.trim().toLowerCase())
      );
      const ideas = [];
      const seen = new Set();
      for (const raw of rawIdeas) {
        const trimmed = raw.trim();
        if (!trimmed) continue;
        const key = trimmed.toLowerCase();
        if (dupSet.has(key) || seen.has(key)) continue;
        seen.add(key);
        ideas.push(trimmed);
      }

      return res.json({
        ideas,
        kind,
        size,
        model: FRAMING_MODEL,
        usage: response.usage,
      });
    } catch (err) {
      console.error('Framing/ideas error:', err);
      return res.status(500).json({ error: (err && err.message) || 'Unknown error' });
    }
  });
});

// Ingest: read a URL / file / description ONCE, distill into neutral
// problem-setting notes the user can consult while building the framing
// themselves. Separates "read the material" from "generate a framing".
// After the user clicks "Read introductory materials" on the page, the
// returned notes are stored client-side in state.problemNotes and sent
// as `priorNotes` to every downstream AI call (pyramid, ideas, matrix,
// framing), so uploads become durable across page reloads (the file
// input itself is one-shot) and the raw URL/file don't have to be
// re-fetched or re-parsed on every request.
const INGEST_TOOL = {
  name: 'record_problem_notes',
  description: 'Record distilled problem-setting notes for the user to consult later. NOT a framing — just neutral background about the setting.',
  input_schema: {
    type: 'object',
    properties: {
      notes: {
        type: 'string',
        description: 'Distilled notes about the problem setting, 300–800 words. Organize into headed sections: **Setting**, **Decision-maker context**, **Constraints / environment**, **What could go wrong**, **Key numbers and facts** (skip any section that has nothing to say). Neutral tone, no editorializing. Do NOT propose metrics, decisions, or uncertainties — that is the user\'s job.',
      },
      sourceLabel: {
        type: 'string',
        description: 'Very short label naming the source (e.g. "Northstar Living case study", "Excerpt from Aurora Motors 10-K"). 3–8 words.',
      },
    },
    required: ['notes'],
  },
};

app.post('/framing/ingest', framingLimiter, (req, res) => {
  framingUpload.single('file')(req, res, async (uploadErr) => {
    if (uploadErr) return res.status(400).json({ error: uploadErr.message });
    try {
      const description = String(req.body?.description || '').trim().slice(0, FRAMING_MAX_CHARS);
      const url         = String(req.body?.url || '').trim();
      const scope       = String(req.body?.scope || '').trim().slice(0, 2000);

      const userContent = [];
      if (scope) {
        userContent.push({
          type: 'text',
          text: `SCOPE — who (or what) is making these decisions:\n${scope}`,
        });
      }
      if (req.file) {
        userContent.push(await fileToContentBlock(
          req.file.buffer, req.file.mimetype, req.file.originalname,
        ));
      }
      if (url) {
        if (!/^https?:\/\//i.test(url)) {
          return res.status(400).json({ error: 'URL must start with http:// or https://.' });
        }
        userContent.push(await urlToContentBlock(url));
      }
      if (description) {
        userContent.push({ type: 'text', text: `User description:\n${description}` });
      }
      if (userContent.length === 0) {
        return res.status(400).json({
          error: 'Add a scope, description, URL, or file first (any of these is enough).',
        });
      }

      userContent.push({
        type: 'text',
        text:
          'Distill everything above into neutral problem-setting notes (300–800 words). ' +
          'Sections: **Setting**, **Decision-maker context**, **Constraints / environment**, ' +
          '**What could go wrong**, **Key numbers and facts** (skip any section that has ' +
          'nothing to say). Include specific names, numbers, dates, org units, and ' +
          'constraints that appear in the material — do not paraphrase them away. ' +
          'Do NOT propose metrics, decisions, or uncertainties — leave those for the user. ' +
          'Return via the record_problem_notes tool.',
      });

      const response = await client.messages.create({
        model: FRAMING_MODEL,
        max_tokens: 3072,
        system: framingPrompt || 'You are Professor Warren Powell\'s decision-framing assistant.',
        tools: [INGEST_TOOL],
        tool_choice: { type: 'tool', name: INGEST_TOOL.name },
        messages: [{ role: 'user', content: userContent }],
      });

      const toolBlock = (response.content || []).find(
        (b) => b.type === 'tool_use' && b.name === INGEST_TOOL.name,
      );
      if (!toolBlock) {
        return res.status(502).json({ error: 'Model did not return notes. Try again.' });
      }

      return res.json({
        notes:       String(toolBlock.input.notes || '').trim(),
        sourceLabel: String(toolBlock.input.sourceLabel || '').trim(),
        model: FRAMING_MODEL,
        usage: response.usage,
      });
    } catch (err) {
      console.error('Framing/ingest error:', err);
      return res.status(500).json({ error: (err && err.message) || 'Unknown error' });
    }
  });
});

app.post('/framing', framingLimiter, (req, res) => {
  framingUpload.single('file')(req, res, async (uploadErr) => {
    if (uploadErr) return res.status(400).json({ error: uploadErr.message });
    try {
      if (!framingPrompt) {
        return res.status(500).json({ error: 'Framing prompt not configured on the server.' });
      }
      const description = String(req.body?.description || '').trim().slice(0, FRAMING_MAX_CHARS);
      const url = String(req.body?.url || '').trim();
      const scope = String(req.body?.scope || '').trim().slice(0, 2000);
      const { size, metrics: nM, decisions: nD, uncertainties: nU, subCap } = sizeInstructions(req.body?.size);

      // Build the user content: any combination of file + URL + text is fine,
      // but the user must provide at least one signal.
      const userContent = [];
      // Scope goes FIRST so the model reads it before the source material —
      // this is what filters the framing down to what the described
      // decision-maker actually owns, instead of the CEO-eye-view default.
      if (scope) {
        userContent.push({
          type: 'text',
          text:
            `SCOPE — who (or what) is making these decisions:\n${scope}\n\n` +
            `Every metric, decision, and uncertainty you propose must belong to ` +
            `THIS decision-maker's altitude and planning horizon. Read the source ` +
            `material below with that filter on.`,
        });
      }
      if (req.file) {
        userContent.push(await fileToContentBlock(
          req.file.buffer,
          req.file.mimetype,
          req.file.originalname,
        ));
      }
      if (url) {
        if (!/^https?:\/\//i.test(url)) {
          return res.status(400).json({ error: 'URL must start with http:// or https://.' });
        }
        userContent.push(await urlToContentBlock(url));
      }
      if (description) {
        userContent.push({ type: 'text', text: `User description:\n${description}` });
      }
      const priorNotes = String(req.body?.priorNotes || '').trim().slice(0, 20000);
      if (priorNotes) {
        userContent.push({
          type: 'text',
          text: 'PROBLEM-SETTING NOTES — the user has previously asked the AI to read their material and distill it. Treat these notes as authoritative background about the setting; use them to inform every part of the framing you generate (metrics, decisions, uncertainties):\n\n' + priorNotes,
        });
      }
      if (userContent.length === 0 || (userContent.length === 1 && scope)) {
        return res.status(400).json({ error: 'Provide a description, a URL, or an uploaded document (scope alone is not enough).' });
      }

      userContent.push({
        type: 'text',
        text:
          `Produce a **${size}** framing:\n` +
          `  - exactly ${nM} metrics\n` +
          `  - exactly ${nD} decisions\n` +
          `  - exactly ${nU} uncertainties\n` +
          `  - for CATEGORICAL top-level decisions (choose-among-options), up to ${subCap} sub-options per parent via subDecisions. OMIT subDecisions for atomic decisions.\n` +
          (scope
            ? `Keep every item strictly inside the SCOPE described at the top. ` +
              `Do NOT include items that belong to roles above or below this ` +
              `decision-maker, even if they're prominent in the source. `
            : ``) +
          `Pre-score both impact matrices (top-level only — sub-decision matrices are filled later). Call the record_framing tool.`,
      });

      const response = await client.messages.create({
        model: FRAMING_MODEL,
        // Sized for a "max" framing (20 metrics x 20 decisions +
        // 20 metrics x 20 uncertainties = 800 H/M/L/N cells) plus the
        // scope, assignments, and list strings. Each cell entry is
        // ~7-10 tokens (the metric name is repeated in every key), so
        // both matrices together can approach 12k output tokens.
        // Warren's initial "max" run of Aurora Motors got a decisions
        // matrix but no uncertainties matrix at 8192 — bumping to give
        // room for both matrices to complete.
        max_tokens: 16384,
        system: framingPrompt,
        tools: [FRAMING_TOOL],
        tool_choice: { type: 'tool', name: FRAMING_TOOL.name },
        messages: [{ role: 'user', content: userContent }],
      });

      const toolBlock = (response.content || []).find(
        (b) => b.type === 'tool_use' && b.name === FRAMING_TOOL.name,
      );
      if (!toolBlock) {
        return res.status(502).json({ error: 'Model did not produce a framing. Try again with a longer description.' });
      }
      return res.json({
        framing: toolBlock.input,
        size,
        model: FRAMING_MODEL,
        usage: response.usage,
      });
    } catch (err) {
      console.error('Framing error:', err);
      const msg = err && err.message ? String(err.message) : 'Unknown error';
      return res.status(500).json({ error: msg });
    }
  });
});

// Stream a chat completion back as Server-Sent Events.
// Request: { messages: [{ role: "user"|"assistant", content: "..." }, ...], sessionId?: "..." }
// Format a page-context object (currently: a framing from the
// decision-framing-tool page) into a compact text block for the
// system prompt. Returns null if the context isn't recognizable.
// Kept small on purpose — this ships on every user message.
function formatPageContextForPrompt(ctx) {
  if (!ctx || typeof ctx !== 'object') return null;
  // Understood shapes:
  //   { kind: 'framing', page: 'framing-tool', framing?: {...}, library?, framingTitle? }
  // - page: 'framing-tool' triggers the tool-usage reference block below,
  //   even when framing is empty (so a user on a blank page can still ask
  //   "how do I save?" and get a grounded answer).
  // - framing: { scope, metrics, assignments, decisions, matrix,
  //   uncertainties, uMatrix, subframes, ... } triggers the on-screen-
  //   framing block so the bot can reference the user's actual content.
  if (ctx.kind !== 'framing') return null;
  const onFramingTool = ctx.page === 'framing-tool';
  const f = (ctx.framing && typeof ctx.framing === 'object') ? ctx.framing : null;
  if (!f && !onFramingTool) return null;
  const lines = [];
  if (f) {
    lines.push('# Current framing (page context)');
    lines.push(
      'The user is viewing the decision framing tool with the following ' +
      'framing currently on-screen. When they ask about "this framing", ' +
      '"this problem", "this scope", "these metrics", or similar, they mean ' +
      'the framing below. Answer with concrete reference to their actual ' +
      'metrics/decisions/uncertainties by name.'
    );
    lines.push('');
  } else {
    lines.push('# Page context');
    lines.push('The user is on the decision framing tool page. Their workspace is currently empty (no scope, metrics, decisions, or uncertainties yet).');
    lines.push('');
  }
  if (ctx.library && typeof ctx.library === 'object') {
    if (ctx.library.ancestry && ctx.library.ancestry.length) {
      lines.push('Library: ' + ctx.library.ancestry.join(' > '));
    } else if (ctx.library.name) {
      lines.push('Library: ' + ctx.library.name);
    }
  }
  if (ctx.framingTitle) lines.push('Framing title: ' + ctx.framingTitle);
  if (f) {
  if (typeof f.scope === 'string' && f.scope.trim()) {
    lines.push('Decision-maker scope: ' + f.scope.trim());
  }
  if (typeof f.description === 'string' && f.description.trim()) {
    lines.push('Description: ' + f.description.trim());
  }
  const metrics = Array.isArray(f.metrics) ? f.metrics.filter(Boolean) : [];
  const assignments = (f.assignments && typeof f.assignments === 'object') ? f.assignments : {};
  if (metrics.length) {
    lines.push('');
    lines.push('Metrics (with pyramid tier, 1 = most important):');
    // Sort by tier ascending, then by original order.
    const sorted = metrics
      .map((m, i) => ({ m, tier: Number(assignments[m]) || 0, i }))
      .sort((a, b) => {
        const at = a.tier || 5, bt = b.tier || 5;
        if (at !== bt) return at - bt;
        return a.i - b.i;
      });
    for (const { m, tier } of sorted) {
      lines.push('  - [tier ' + (tier || 'unassigned') + '] ' + m);
    }
  }
  const decisions = Array.isArray(f.decisions) ? f.decisions.filter(Boolean) : [];
  if (decisions.length) {
    lines.push('');
    lines.push('Decisions (ordered by user\'s priority, most-impactful first):');
    for (const d of decisions) lines.push('  - ' + d);
  }
  const uncertainties = Array.isArray(f.uncertainties) ? f.uncertainties.filter(Boolean) : [];
  if (uncertainties.length) {
    lines.push('');
    lines.push('Uncertainties (ordered by impact, most-impactful first):');
    for (const u of uncertainties) lines.push('  - ' + u);
  }
  // Impact matrices in a compact grid. Only include if the user has
  // actually scored some cells — a blank matrix isn't useful signal
  // and just wastes tokens.
  const matrixHas = (mat) =>
    mat && typeof mat === 'object' && Object.keys(mat).some(k =>
      mat[k] && typeof mat[k] === 'object' && Object.keys(mat[k]).length);
  if (metrics.length && decisions.length && matrixHas(f.matrix)) {
    lines.push('');
    lines.push('Decision × metric impact matrix (H=high, M=medium, L=low, N=none):');
    const header = ['decision \\ metric', ...metrics];
    lines.push('  ' + header.join(' | '));
    for (const d of decisions) {
      const row = [d];
      for (const m of metrics) {
        const v = (f.matrix[d] && f.matrix[d][m]) || '·';
        row.push(v);
      }
      lines.push('  ' + row.join(' | '));
    }
  }
  if (metrics.length && uncertainties.length && matrixHas(f.uMatrix)) {
    lines.push('');
    lines.push('Uncertainty × metric impact matrix (H/M/L/N):');
    const header = ['uncertainty \\ metric', ...metrics];
    lines.push('  ' + header.join(' | '));
    for (const u of uncertainties) {
      const row = [u];
      for (const m of metrics) {
        const v = (f.uMatrix[u] && f.uMatrix[u][m]) || '·';
        row.push(v);
      }
      lines.push('  ' + row.join(' | '));
    }
  }
  // Optionally, sub-decisions (one level deep — as sent by the client).
  if (f.subframes && typeof f.subframes === 'object') {
    const subKeys = Object.keys(f.subframes);
    if (subKeys.length) {
      lines.push('');
      lines.push('Sub-decisions (one level down; not shown recursively):');
      for (const parent of subKeys) {
        const sub = f.subframes[parent];
        const kids = (sub && Array.isArray(sub.decisions)) ? sub.decisions.filter(Boolean) : [];
        if (kids.length) {
          lines.push('  - ' + parent + ': ' + kids.join(', '));
        }
      }
    }
  }
  } // end if (f)
  // Tool-usage reference — injected whenever the user is on the framing
  // tool page (regardless of whether they've filled anything in yet), so
  // "how do I save?" / "how do I share?" / "how do I rename?" questions
  // get grounded answers instead of generic ones.
  if (onFramingTool) {
    lines.push('');
    lines.push(FRAMING_TOOL_HELP);
  }
  return lines.join('\n');
}

// Concise quick-reference for the decision framing tool's UI, injected
// into the /chat system prompt whenever a request comes from that page.
// Keep this in sync with the actual UI when labels or flows change.
const FRAMING_TOOL_HELP = [
  '# Framing tool — quick reference (for answering "how do I…" questions)',
  '',
  'The tool has this layout, top to bottom:',
  '- **Doc banner** (amber strip near top) — shows the currently-loaded framing name and an "✎ Rename" button (only visible when a server-backed framing is loaded in edit mode).',
  '- **Toolbar** — File menu, Clear pyramid, Reset all, Copy URL, Print, ? Help.',
  '- **Library bar** (only when a server library is loaded) — breadcrumb of the library ancestry, Save (green primary, in-place update), + New framing, + New sub-library, Share URLs, Rename ✎, Regenerate URLs, Delete library, Browse ▾.',
  '- **Tree side pane** (right side, when a library is loaded) — sub-libraries + framings in the current library; click any row to open.',
  '- **Problem scope** — decision-maker scope textarea + Describe your problem + URL / file inputs + two action buttons: "Read introductory materials" (ingests the material once so future AI calls can use it as background without generating a framing) and "Generate first draft (AI)" (produces a whole framing on the spot). After ingestion, a green "📄 Notes loaded" chip appears with a "View notes" button so the user can see the distilled notes; a small × clears them.',
  '- **Metrics pyramid tool** — metric chips (list on left), drop zones for tiers 1-4, "First draft (AI)" button.',
  '- **Decision prioritization tool** — decisions textarea + "Generate ideas" button + impact matrix.',
  '- **Uncertainty prioritization tool** — same layout for uncertainties.',
  '- **Ask Professor Powell** (this chat) — inline at the bottom.',
  '',
  '## Saving',
  '- **Save vs Save as**: **File → Save** (or the library bar\'s green **Save** button) updates the current framing in place. **File → Save as…** creates a NEW framing entry in your library (prompts for title + description). Same convention as Word: Save = update current, Save as = new entry.',
  '- **First save** of a fresh workspace goes through Save as… (creates your personal library on the first ever save, then adds new framings to the same library on subsequent uses).',
  '- **Autosave**: everything is autosaved to your browser\'s localStorage on every keystroke — this is crash-protection only, it does NOT push to the server or share with anyone.',
  '',
  '## Renaming and deleting',
  '- **Rename the CURRENT framing**: click the "✎ Rename" button in the amber doc banner near the top. Title-only, does NOT touch your on-screen edits.',
  '- **Rename another framing** (not the one you\'re editing): library bar → Browse ▾ → find the framing row → click the ✎ icon.',
  '- **Delete a framing**: Browse ▾ → find the row → click × (irreversible).',
  '- **Rename a library**: library bar → Rename ✎ button (only visible in admin mode).',
  '- **Delete a library**: library bar → Delete library (only in admin mode; irreversible; wipes everything under it).',
  '',
  '## Sharing and access',
  '- **Copy URL** (toolbar): copies a URL that opens the current framing as a fresh SNAPSHOT in someone else\'s browser — their edits do NOT affect the original. Good for pasting into an email.',
  '- **Share URLs** (library bar): shows the View URL and Edit URL for the currently-loaded library. Anyone with the View URL gets read-only access; anyone with the Edit URL gets edit access. NOT a snapshot — it\'s the live library.',
  '- **Access model**: there are NO accounts or passwords. The URL IS the credential. Anyone with a URL has whatever access it encodes. To revoke: Regenerate URLs (invalidates the old ones for everyone, including you).',
  '- **Cross-device access**: your libraries are remembered in this browser\'s localStorage. To access them from a different browser or device, bookmark or email yourself the Edit URL of your root personal library — every sub-library you create hangs off it in the tree pane. Nothing else to remember.',
  '',
  '## Libraries and sub-libraries',
  '- Libraries form a tree: your personal library is the root; sub-libraries hang off it as children.',
  '- **Create a sub-library**: from within a library in admin mode, library bar → + New sub-library. The new sub-library appears in the tree pane immediately and is remembered in your browser\'s "My server libraries" list.',
  '- **Open a sub-library**: click its row in the tree pane, or in Browse ▾, or in File → Open → My server libraries.',
  '- **Add someone else\'s library**: File → Open → paste the URL they sent you into the "Add library by URL" input.',
  '',
  '## Generating ideas',
  '- **Generate ideas** button (next to Decisions or Uncertainties header): opens an idea box with AI-proposed items scored to have H or M impact on at least one metric. Check the ones you want, click "Add checked" to append.',
  '- **Drilled-in context** (decisions): if you\'ve drilled into a sub-decision, Generate ideas proposes sub-decisions of that leaf parent.',
  '- **Drilled-in context** (uncertainties): if drilled into a decision, uncertainty ideas are biased toward uncertainties that matter for that decision context. They still land in the root uncertainty list (uncertainties are flat) but each gets a small green "for: <parent>" chip.',
  '',
  '## Sub-decisions',
  '- **Drill in**: click the small ▸ button on a decision\'s row (or right-click the row) to descend into that decision\'s sub-decisions. The breadcrumb shows the path.',
  '- **Drill out**: click any earlier breadcrumb step, or the ↑ up-level button.',
  '- Uncertainties do NOT nest — they always live at the root.',
  '',
  'When answering how-to questions, refer to the specific button labels above verbatim so users can find them. If a user is confused about which button does what, spell out the exact click path (e.g. "Library bar → Browse ▾ → click ✎ on that row").',
].join('\n');

app.post('/chat', chatLimiter, async (req, res) => {
  const { messages, sessionId: clientSessionId, context: pageContext } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }
  const sessionId = (typeof clientSessionId === 'string' && clientSessionId.trim())
    ? clientSessionId.trim().slice(0, 64)
    : crypto.randomUUID();
  const ipHash = hashIp(req.ip);

  const capMessage = checkSessionCap(sessionId);
  if (capMessage) {
    return res.status(429).json({ error: capMessage });
  }

  // Log the new user message (last one in the array) up front so we don't
  // lose it if Claude later errors out.
  const lastMsg = messages[messages.length - 1];
  if (lastMsg && lastMsg.role === 'user' && lastMsg.content) {
    logMessage({ sessionId, role: 'user', content: lastMsg.content, ipHash });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();
  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  try {
    // --- RAG retrieval -----------------------------------------------------
    // Build the retrieval query from the last few user messages so that
    // follow-ups like "tell me more about that" or "explain the second one"
    // get embedded with enough surrounding context to find relevant chunks.
    let ragBlock = '';
    let citations = [];
    if (RAG_ENABLED) {
      const recentUserTurns = messages
        .filter(m => m.role === 'user')
        .slice(-3)              // last up to 3 user messages
        .map(m => m.content)
        .filter(Boolean);
      const userQuery = recentUserTurns.join('\n\n');
      if (userQuery.trim()) {
        try {
          const chunks = await retrieve(userQuery, RAG_K);
          ragBlock = formatContext(chunks);
          citations = chunks.map((c, i) => {
            // For CASTLE Site pages, derive the public URL from source_file
            // (e.g. "_pages/sda.md" -> "https://castle.princeton.edu/sda/").
            let url = null;
            if (c.book === 'CASTLE Site' && c.source_file) {
              const m = c.source_file.match(/(?:^|[\\\/])_pages[\\\/](.+?)\.md$/);
              if (m) url = `https://castle.princeton.edu/${m[1]}/`;
            }
            return {
              index: i + 1,
              book: c.book,
              chapter: c.chapter,
              section: c.section,
              url,
            };
          });
        } catch (e) {
          console.error('RAG retrieval failed (continuing without):', e.message);
        }
      }
    }

    // --- Build system blocks ----------------------------------------------
    // Static persona/bio prompt is cached (slow-changing). Retrieved excerpts
    // are appended fresh per-query (varies per user message, no caching).
    const systemBlocks = [
      { type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } },
    ];
    if (ragBlock) {
      systemBlocks.push({
        type: 'text',
        text: '\n\n' + ragBlock + '\nWhen relevant, cite excerpts inline using their [N] number.',
      });
    }
    // Append tool-use instructions AFTER any RAG block so the main persona
    // prompt keeps its cache prefix intact.
    systemBlocks.push({ type: 'text', text: ASKPP_TOOL_INSTRUCTIONS });

    // Page-supplied context — if the widget's host page sent a
    // `context` object (currently: the framing tool sends the
    // currently-loaded framing), format it as a system-prompt
    // addendum so the assistant can answer questions about "this
    // framing" directly. Failure to format is silent.
    const contextText = formatPageContextForPrompt(pageContext);
    if (contextText) {
      systemBlocks.push({ type: 'text', text: contextText });
    }

    // --- Call Claude ------------------------------------------------------
    // Strip any non-API fields the widget attached for its own bookkeeping
    // (e.g. `citations` on assistant messages). Anthropic rejects unknown keys.
    const cleanMessages = messages.map(m => ({ role: m.role, content: m.content }));

    // If this session has an attached PDF, splice it into the latest user
    // message so Claude sees the doc as context for its answer. Cached
    // ephemerally so quick follow-ups don't re-pay full input cost.
    const attachment = attachments.get(sessionId);
    if (attachment) {
      for (let i = cleanMessages.length - 1; i >= 0; i--) {
        if (cleanMessages[i].role === 'user') {
          const original = cleanMessages[i].content;
          cleanMessages[i] = {
            role: 'user',
            content: [
              {
                type: 'document',
                source: {
                  type: 'base64',
                  media_type: attachment.mediaType,
                  data: attachment.data.toString('base64'),
                },
                cache_control: { type: 'ephemeral' },
              },
              { type: 'text', text: typeof original === 'string' ? original : '' },
            ],
          };
          break;
        }
      }
    }

    // --- Streaming tool-use loop -----------------------------------------
    // First turn: model may emit text and/or tool_use blocks. If it emits
    // a tool_use, we execute it server-side, feed the tool_result back as
    // a fresh user turn, and stream the model's follow-up. Loop bounded by
    // MAX_TOOL_ROUNDS to prevent runaway. Text deltas from every turn are
    // forwarded live to the SSE client, so the user sees continuous output.
    const MAX_TOOL_ROUNDS = 3;
    const chatTools = [CREATE_FRAMING_LINK_TOOL];
    let assistantText = '';
    let lastUsage = null;
    const cumUsage = { input: 0, output: 0, cacheCreate: 0, cacheRead: 0 };

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const stream = client.messages.stream({
        model: MODEL,
        max_tokens: 4096,
        system: systemBlocks,
        tools: chatTools,
        messages: cleanMessages,
      });
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
          assistantText += event.delta.text;
          send({ delta: event.delta.text });
        }
      }
      const final = await stream.finalMessage();
      lastUsage = final.usage;
      cumUsage.input       += final.usage?.input_tokens || 0;
      cumUsage.output      += final.usage?.output_tokens || 0;
      cumUsage.cacheCreate += final.usage?.cache_creation_input_tokens || 0;
      cumUsage.cacheRead   += final.usage?.cache_read_input_tokens || 0;

      const toolUses = (final.content || []).filter(b => b.type === 'tool_use');
      if (toolUses.length === 0) break;

      // Preserve the assistant turn (with its tool_use blocks) so the
      // model can reference the tool_use_ids on the next round.
      cleanMessages.push({ role: 'assistant', content: final.content });

      // Execute each tool call and build tool_result blocks.
      const toolResults = [];
      for (const tu of toolUses) {
        let resultText;
        try {
          if (tu.name === 'create_framing_link') {
            resultText = encodeFramingToUrl(tu.input || {});
          } else {
            resultText = 'Unknown tool: ' + tu.name;
          }
        } catch (err) {
          console.error('Tool ' + tu.name + ' failed:', err);
          resultText = 'Tool error: ' + (err && err.message ? err.message : String(err));
        }
        toolResults.push({
          type: 'tool_result',
          tool_use_id: tu.id,
          content: resultText,
        });
      }
      cleanMessages.push({ role: 'user', content: toolResults });
    }

    send({
      done: true,
      usage: {
        input_tokens: cumUsage.input,
        output_tokens: cumUsage.output,
        cache_creation_input_tokens: cumUsage.cacheCreate,
        cache_read_input_tokens: cumUsage.cacheRead,
      },
      citations,   // surface what was retrieved so the UI can show sources
    });

    // Log the assistant's reply after the stream completes.
    logMessage({
      sessionId,
      role: 'assistant',
      content: assistantText,
      ipHash,
      inputTokens: cumUsage.input,
      outputTokens: cumUsage.output,
      cacheCreationTokens: cumUsage.cacheCreate,
      cacheReadTokens: cumUsage.cacheRead,
      citations,
    });
  } catch (err) {
    console.error('Chat error:', err);
    send({ error: err.message || 'Unknown error' });
  } finally {
    res.end();
  }
});

// Fallback root route — if there's no public/index.html (local dev only),
// serve the legacy demo.html and load the widget from the canonical site asset.
if (!existsSync(path.join(PUBLIC_DIR, 'index.html'))) {
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'demo.html')));
  app.get('/widget.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, '..', 'assets', 'js', 'chatbot-widget.js'));
  });
}

// Initialize logger before starting the server so admin routes work immediately.
const loggerReady = loggerEnabled()
  ? initLogger().catch(e => { console.error('[logger] init failed:', e.message); return false; })
  : Promise.resolve(false);

app.listen(PORT, async () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`CASTLE chatbot running:  http://localhost:${PORT}`);
  console.log(`Model:                   ${MODEL}`);
  console.log(`System prompt:           ${systemPrompt.length} chars (~${Math.round(systemPrompt.length / 4)} tokens)`);
  const logOk = await loggerReady;
  if (logOk) console.log(`Logger:                  Turso enabled → /admin/conversations`);
  else if (loggerEnabled()) console.log(`Logger:                  Turso CONFIGURED but INIT FAILED`);
  else console.log(`Logger:                  disabled (TURSO_DATABASE_URL/TOKEN not set)`);
  if (RAG_ENABLED) {
    try {
      const s = stats();
      console.log(`RAG:                     ${s.totalChunks} chunks indexed, retrieving top ${RAG_K} per query`);
    } catch (e) {
      console.log(`RAG:                     enabled but DB read failed — ${e.message}`);
    }
  } else if (!existsSync(KNOWLEDGE_DB_PATH)) {
    console.log(`RAG:                     disabled — knowledge.db not found (run "npm run ingest")`);
  } else {
    console.log(`RAG:                     disabled — VOYAGE_API_KEY not set`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});
