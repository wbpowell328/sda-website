// Password hashing + DB-backed session cookies. Opaque session tokens
// (not JWT) so logout / password-change can trivially revoke by deleting
// rows — no signing-key rotation to manage.

import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { getDb } from './db.js';

const SESSION_COOKIE = 'cfa_session';
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const BCRYPT_COST = 12;

export async function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

export async function createSession(userId) {
  const db = getDb();
  const id = crypto.randomBytes(32).toString('hex');
  const expiresAt = Math.floor((Date.now() + SESSION_DURATION_MS) / 1000);
  await db.execute({
    sql: 'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
    args: [id, userId, expiresAt],
  });
  return { id, expiresAt };
}

export async function destroySession(sessionId) {
  if (!sessionId) return;
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM sessions WHERE id = ?', args: [sessionId] });
}

export async function destroyAllSessionsForUser(userId) {
  const db = getDb();
  await db.execute({ sql: 'DELETE FROM sessions WHERE user_id = ?', args: [userId] });
}

export function setSessionCookie(res, sessionId) {
  res.cookie(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_MS,
    path: '/',
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE, { path: '/' });
}

// Looks up the session cookie and attaches req.user = { id, email } if valid.
// Does not reject the request — routes that require auth use requireAuth below.
export async function attachUser(req, res, next) {
  const sessionId = req.cookies?.[SESSION_COOKIE];
  if (!sessionId) return next();
  try {
    const db = getDb();
    const nowSec = Math.floor(Date.now() / 1000);
    const result = await db.execute({
      sql: `SELECT u.id, u.email, s.expires_at
              FROM sessions s JOIN users u ON u.id = s.user_id
             WHERE s.id = ?`,
      args: [sessionId],
    });
    const row = result.rows[0];
    if (row && Number(row.expires_at) > nowSec) {
      req.user = { id: Number(row.id), email: row.email };
      req.sessionId = sessionId;
    }
  } catch (e) {
    console.error('[auth] session lookup failed:', e.message);
  }
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not logged in.' });
  next();
}

const RESET_TOKEN_DURATION_MS = 60 * 60 * 1000; // 1 hour

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

// Returns the raw token — only ever put in the emailed link, never stored.
export async function createPasswordResetToken(userId) {
  const db = getDb();
  const rawToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = Math.floor((Date.now() + RESET_TOKEN_DURATION_MS) / 1000);
  await db.execute({
    sql: 'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
    args: [userId, hashToken(rawToken), expiresAt],
  });
  return rawToken;
}

// Validates a raw token from the emailed link. If valid, marks it used and
// returns the user id; otherwise returns null. Does not rotate the
// password itself — the caller does that in the same request.
export async function consumePasswordResetToken(rawToken) {
  if (typeof rawToken !== 'string' || !rawToken) return null;
  const db = getDb();
  const nowSec = Math.floor(Date.now() / 1000);
  const result = await db.execute({
    sql: `SELECT id, user_id, expires_at, used_at FROM password_reset_tokens WHERE token_hash = ?`,
    args: [hashToken(rawToken)],
  });
  const row = result.rows[0];
  if (!row || row.used_at || Number(row.expires_at) <= nowSec) return null;

  await db.execute({ sql: 'UPDATE password_reset_tokens SET used_at = unixepoch() WHERE id = ?', args: [row.id] });
  return Number(row.user_id);
}
