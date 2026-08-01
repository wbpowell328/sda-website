// Turso (hosted libSQL) connection + idempotent schema bootstrap.
// Follows the same pattern as chatbot/logger.js, but this app owns a
// separate Turso database with a real relational schema (users/projects/
// metrics/decisions/matrix cells), not an append-only log.

import { createClient } from '@libsql/client';

let client = null;
let ready = false;

export function dbConfigured() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) return false;
  // A local file: URL needs no auth token — handy for local dev without a Turso account.
  if (url.startsWith('file:')) return true;
  return !!process.env.TURSO_AUTH_TOKEN;
}

export function getDb() {
  if (!client) throw new Error('Database not initialized — call initDb() first.');
  return client;
}

export function dbReady() {
  return ready;
}

export async function initDb() {
  if (!dbConfigured()) return false;
  client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    ...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
  });

  await client.batch([
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    )`,
    `CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      expires_at INTEGER NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,
    `CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      expires_at INTEGER NOT NULL,
      used_at INTEGER
    )`,
    `CREATE INDEX IF NOT EXISTS idx_reset_user ON password_reset_tokens(user_id)`,
    `CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    )`,
    `CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id)`,
    `CREATE TABLE IF NOT EXISTS metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      level INTEGER NOT NULL,
      position INTEGER NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_metrics_project ON metrics(project_id, level, position)`,
    `CREATE TABLE IF NOT EXISTS decisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      decision_type TEXT,
      position INTEGER NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_decisions_project ON decisions(project_id, position)`,
    `CREATE TABLE IF NOT EXISTS matrix_cells (
      decision_id INTEGER NOT NULL REFERENCES decisions(id) ON DELETE CASCADE,
      metric_id INTEGER NOT NULL REFERENCES metrics(id) ON DELETE CASCADE,
      rating TEXT NOT NULL DEFAULT 'N' CHECK (rating IN ('H','M','L','N')),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
      PRIMARY KEY (decision_id, metric_id)
    )`,
  ]);

  ready = true;
  return true;
}
