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

    const userText =
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
app.post('/chat', chatLimiter, async (req, res) => {
  const { messages, sessionId: clientSessionId } = req.body || {};
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
