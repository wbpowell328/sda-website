// Persistent conversation log → Turso (hosted SQLite).
// Captures every user question and assistant answer with token counts,
// session id, and an anonymized IP hash for review via /admin/conversations.

import { createClient } from '@libsql/client';
import crypto from 'node:crypto';

let client = null;
let ready = false;

export function loggerEnabled() {
  return !!(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

export async function initLogger() {
  if (!loggerEnabled()) return false;
  client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  // Idempotent schema bootstrap. Safe to run on every startup.
  await client.execute(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL,           -- 'user' or 'assistant'
      content TEXT NOT NULL,
      ip_hash TEXT,                 -- SHA-256 of (ip + IP_HASH_SALT)
      input_tokens INTEGER,
      output_tokens INTEGER,
      cache_creation_tokens INTEGER,
      cache_read_tokens INTEGER,
      citations TEXT,               -- JSON
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
  `);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_conv_session ON conversations(session_id);`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_conv_created ON conversations(created_at);`);

  ready = true;
  return true;
}

export function hashIp(ip) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || 'castle-default-salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex').slice(0, 12);
}

export async function logMessage({
  sessionId, role, content, ipHash = null,
  inputTokens = null, outputTokens = null,
  cacheCreationTokens = null, cacheReadTokens = null,
  citations = null,
}) {
  if (!ready || !client) return;
  try {
    await client.execute({
      sql: `INSERT INTO conversations
            (session_id, role, content, ip_hash, input_tokens, output_tokens,
             cache_creation_tokens, cache_read_tokens, citations)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        sessionId, role, content, ipHash,
        inputTokens, outputTokens,
        cacheCreationTokens, cacheReadTokens,
        citations ? JSON.stringify(citations) : null,
      ],
    });
  } catch (e) {
    // Logging must never break chat. Just record the error and continue.
    console.error('[logger] failed to insert:', e.message);
  }
}

export async function recentConversations({ limit = 200 } = {}) {
  if (!ready || !client) return [];
  const result = await client.execute({
    sql: `SELECT id, session_id, role, content, ip_hash,
                 input_tokens, output_tokens,
                 cache_creation_tokens, cache_read_tokens, citations,
                 created_at
            FROM conversations
           ORDER BY id DESC
           LIMIT ?`,
    args: [limit],
  });
  return result.rows.map(r => ({
    id: Number(r.id),
    sessionId: r.session_id,
    role: r.role,
    content: r.content,
    ipHash: r.ip_hash,
    inputTokens: r.input_tokens ? Number(r.input_tokens) : null,
    outputTokens: r.output_tokens ? Number(r.output_tokens) : null,
    cacheCreationTokens: r.cache_creation_tokens ? Number(r.cache_creation_tokens) : null,
    cacheReadTokens: r.cache_read_tokens ? Number(r.cache_read_tokens) : null,
    citations: r.citations ? JSON.parse(r.citations) : null,
    createdAt: Number(r.created_at),
  }));
}

export async function stats() {
  if (!ready || !client) return null;
  const r = await client.execute(`
    SELECT
      COUNT(*) AS total_messages,
      COUNT(DISTINCT session_id) AS sessions,
      COUNT(DISTINCT ip_hash) AS unique_ips,
      SUM(input_tokens) AS total_input_tokens,
      SUM(output_tokens) AS total_output_tokens,
      MIN(created_at) AS first_at,
      MAX(created_at) AS last_at
      FROM conversations
  `);
  const row = r.rows[0] || {};
  return {
    totalMessages: Number(row.total_messages || 0),
    sessions:      Number(row.sessions || 0),
    uniqueIps:     Number(row.unique_ips || 0),
    totalInputTokens:  Number(row.total_input_tokens || 0),
    totalOutputTokens: Number(row.total_output_tokens || 0),
    firstAt: row.first_at ? Number(row.first_at) : null,
    lastAt:  row.last_at  ? Number(row.last_at)  : null,
  };
}
