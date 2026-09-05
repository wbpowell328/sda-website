// Framing tool v2 — Postgres connection pool + one-shot schema apply.
//
// DATABASE_URL is expected to be a standard Postgres connection string, e.g.
// `postgres://user:pass@host:5432/dbname?sslmode=require`. Render Postgres
// hands you exactly that in the dashboard.
//
// If DATABASE_URL is missing, we do NOT crash the whole chatbot server —
// the framing-node routes just respond 503 with a clear message. This lets
// the existing chatbot keep working before Warren wires the addon.
//
// initSchema() runs schema.sql idempotently on first successful pool
// acquisition. Safe to re-run: every CREATE uses IF NOT EXISTS and the
// trigger uses DROP-then-CREATE.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pg from 'pg';

const { Pool } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));

let pool = null;
let schemaApplied = false;
let initInFlight = null;

export function hasDatabaseUrl() {
  return typeof process.env.DATABASE_URL === 'string'
    && process.env.DATABASE_URL.trim().length > 0;
}

export function getPool() {
  if (!hasDatabaseUrl()) return null;
  if (pool) return pool;
  // Render's managed Postgres requires SSL; local dev usually doesn't. Rely
  // on the connection string's sslmode= for that. Setting `ssl: { rejectUnauthorized: false }`
  // handles the Render case where the cert chain isn't in node's trust store.
  const isRender = /render\.com/i.test(process.env.DATABASE_URL || '');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isRender ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 30_000,
  });
  pool.on('error', (err) => {
    console.error('[framing-nodes] pg pool error:', err.message);
  });
  return pool;
}

export async function initSchema() {
  if (schemaApplied) return;
  if (initInFlight) return initInFlight;
  const p = getPool();
  if (!p) throw new Error('DATABASE_URL not configured');
  initInFlight = (async () => {
    const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
    // A single query() executes the whole script in one implicit transaction.
    await p.query(sql);
    schemaApplied = true;
    console.log('[framing-nodes] schema applied');
  })();
  try { await initInFlight; }
  finally { initInFlight = null; }
}

// Small convenience wrapper — every route uses this so we get a consistent
// 503 response when the DB is missing instead of a stack trace.
export async function query(text, params) {
  const p = getPool();
  if (!p) {
    const err = new Error('Database not configured on this server');
    err.status = 503;
    throw err;
  }
  if (!schemaApplied) await initSchema();
  return p.query(text, params);
}

// Transaction helper: pass a callback that receives a client with the same
// `.query(text, params)` signature. Automatic BEGIN / COMMIT / ROLLBACK.
export async function tx(fn) {
  const p = getPool();
  if (!p) {
    const err = new Error('Database not configured on this server');
    err.status = 503;
    throw err;
  }
  if (!schemaApplied) await initSchema();
  const client = await p.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch (_) { /* swallow */ }
    throw err;
  } finally {
    client.release();
  }
}
