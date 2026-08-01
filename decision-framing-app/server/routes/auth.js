import express from 'express';
import rateLimit from 'express-rate-limit';
import { getDb } from '../lib/db.js';
import {
  hashPassword, verifyPassword, isValidEmail, isValidPassword,
  createSession, destroySession, setSessionCookie, clearSessionCookie,
  createPasswordResetToken, consumePasswordResetToken, destroyAllSessionsForUser,
} from '../lib/auth.js';
import { sendPasswordResetEmail } from '../lib/email.js';
import { asyncHandler } from '../lib/asyncHandler.js';

const router = express.Router();

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: Number(process.env.SIGNUP_RATE_LIMIT) || 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many signup attempts. Please wait an hour and try again.' },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.LOGIN_RATE_LIMIT) || 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please wait 15 minutes and try again.' },
});

const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: Number(process.env.RESET_RATE_LIMIT) || 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many password reset requests. Please wait an hour and try again.' },
});

router.post('/api/auth/signup', signupLimiter, asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (!isValidPassword(password)) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  const db = getDb();
  const existing = await db.execute({ sql: 'SELECT id FROM users WHERE email = ?', args: [email] });
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'An account with that email already exists.' });
  }

  const passwordHash = await hashPassword(password);
  const result = await db.execute({
    sql: 'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    args: [email, passwordHash],
  });
  const userId = Number(result.lastInsertRowid);

  const session = await createSession(userId);
  setSessionCookie(res, session.id);
  res.json({ user: { id: userId, email } });
}));

router.post('/api/auth/login', loginLimiter, asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!isValidEmail(email) || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  const db = getDb();
  const result = await db.execute({ sql: 'SELECT id, email, password_hash FROM users WHERE email = ?', args: [email] });
  const row = result.rows[0];
  const genericError = { error: 'Invalid email or password.' };
  if (!row) return res.status(401).json(genericError);

  const ok = await verifyPassword(password, row.password_hash);
  if (!ok) return res.status(401).json(genericError);

  const session = await createSession(Number(row.id));
  setSessionCookie(res, session.id);
  res.json({ user: { id: Number(row.id), email: row.email } });
}));

router.post('/api/auth/logout', asyncHandler(async (req, res) => {
  await destroySession(req.sessionId);
  clearSessionCookie(res);
  res.json({ ok: true });
}));

router.get('/api/auth/me', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not logged in.' });
  res.json({ user: req.user });
});

// Always returns the same generic message regardless of whether the email
// exists, to avoid leaking which addresses have accounts.
router.post('/api/auth/request-password-reset', resetLimiter, asyncHandler(async (req, res) => {
  const { email } = req.body || {};
  const genericResponse = { ok: true, message: 'If an account exists for that email, a reset link has been sent.' };
  if (!isValidEmail(email)) return res.json(genericResponse);

  const db = getDb();
  const result = await db.execute({ sql: 'SELECT id FROM users WHERE email = ?', args: [email] });
  const row = result.rows[0];
  if (row) {
    const rawToken = await createPasswordResetToken(Number(row.id));
    const baseUrl = process.env.APP_BASE_URL || `${req.protocol}://${req.get('host')}`;
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(email, resetUrl);
  }
  res.json(genericResponse);
}));

router.post('/api/auth/reset-password', asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body || {};
  if (!isValidPassword(newPassword)) return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  const userId = await consumePasswordResetToken(token);
  if (!userId) return res.status(400).json({ error: 'This reset link is invalid or has expired.' });

  const db = getDb();
  const passwordHash = await hashPassword(newPassword);
  await db.execute({ sql: 'UPDATE users SET password_hash = ? WHERE id = ?', args: [passwordHash, userId] });
  await destroyAllSessionsForUser(userId);

  res.json({ ok: true });
}));

export default router;
