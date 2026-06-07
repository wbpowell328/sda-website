// CASTLE chatbot — local Express server that proxies chat messages to Claude
// with RAG retrieval from a Voyage-embedded SQLite vector store.
// API keys live only here, never in the browser.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import rateLimit from 'express-rate-limit';
import crypto from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { retrieve, formatContext, stats } from './rag.js';
import { initLogger, loggerEnabled, logMessage, hashIp } from './logger.js';
import adminRouter from './admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env'), override: true });
const PORT = Number(process.env.PORT) || 3000;
const MODEL = process.env.CLAUDE_MODEL || 'claude-haiku-4-5-20251001';
const SYSTEM_PROMPT_PATH = path.join(__dirname, 'system-prompt.txt');
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
const client = new Anthropic();

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

    // --- Call Claude ------------------------------------------------------
    // Strip any non-API fields the widget attached for its own bookkeeping
    // (e.g. `citations` on assistant messages). Anthropic rejects unknown keys.
    const cleanMessages = messages.map(m => ({ role: m.role, content: m.content }));
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: systemBlocks,
      messages: cleanMessages,
    });

    let assistantText = '';
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        assistantText += event.delta.text;
        send({ delta: event.delta.text });
      }
    }
    const final = await stream.finalMessage();
    send({
      done: true,
      usage: final.usage,
      citations,  // surface what was retrieved so the UI can show sources
    });

    // Log the assistant's reply after the stream completes.
    logMessage({
      sessionId,
      role: 'assistant',
      content: assistantText,
      ipHash,
      inputTokens: final.usage?.input_tokens,
      outputTokens: final.usage?.output_tokens,
      cacheCreationTokens: final.usage?.cache_creation_input_tokens,
      cacheReadTokens: final.usage?.cache_read_input_tokens,
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
