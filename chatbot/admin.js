// Admin page: view recent chatbot conversations.
// Protected by HTTP Basic Auth using the ADMIN_PASSWORD env var.

import express from 'express';
import { recentConversations, stats, loggerEnabled } from './logger.js';

const router = express.Router();

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
}

function formatDate(epochSec) {
  if (!epochSec) return '';
  return new Date(epochSec * 1000).toISOString().replace('T', ' ').slice(0, 19);
}

// Basic auth middleware
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(503).send('Admin disabled: set ADMIN_PASSWORD env var.');
  }
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="CASTLE admin"');
    return res.status(401).send('Authentication required.');
  }
  let user = '', pass = '';
  try {
    const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    if (idx >= 0) { user = decoded.slice(0, idx); pass = decoded.slice(idx + 1); }
  } catch {}
  if (pass !== expected) {
    res.set('WWW-Authenticate', 'Basic realm="CASTLE admin"');
    return res.status(401).send('Invalid credentials.');
  }
  next();
}

router.get('/admin/conversations', requireAdmin, async (req, res) => {
  if (!loggerEnabled()) {
    return res.status(503).send('Logger not configured (TURSO_DATABASE_URL / TURSO_AUTH_TOKEN missing).');
  }
  const limit = Math.min(Number(req.query.limit) || 200, 1000);
  let rows = [];
  let s = null;
  try {
    [rows, s] = await Promise.all([recentConversations({ limit }), stats()]);
  } catch (e) {
    return res.status(500).send('Logger error: ' + escapeHtml(e.message));
  }

  // Group consecutive rows by session_id, oldest to newest within each group.
  const sessions = new Map();
  for (const r of rows) {
    if (!sessions.has(r.sessionId)) sessions.set(r.sessionId, []);
    sessions.get(r.sessionId).push(r);
  }
  // For each session, sort ascending (rows came back DESC)
  const sessionList = [];
  for (const [sid, msgs] of sessions) {
    msgs.sort((a, b) => a.id - b.id);
    sessionList.push({
      sessionId: sid,
      messages: msgs,
      firstAt: msgs[0].createdAt,
      lastAt: msgs[msgs.length - 1].createdAt,
      ipHash: msgs[msgs.length - 1].ipHash,
    });
  }
  // Sort sessions by most recent activity, newest first
  sessionList.sort((a, b) => b.lastAt - a.lastAt);

  const totalCost = s ? (
    ((s.totalInputTokens || 0) * 0.80 + (s.totalOutputTokens || 0) * 4.00) / 1_000_000
  ).toFixed(3) : '0';

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CASTLE chatbot — admin</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
         margin: 0; padding: 0; background: #f5ecd6; color: #2b2419; line-height: 1.5; }
  header { background: #3d2914; color: #f5ecd6; padding: 0.9rem 1.5rem; border-bottom: 4px solid #c9621e; }
  header h1 { margin: 0; font-size: 1.3rem; font-family: "Georgia", serif; }
  header .meta { color: #d4b88a; font-size: 0.85rem; margin-top: 0.25rem; }
  main { max-width: 1100px; margin: 0 auto; padding: 1.5rem; }
  .stats {
    background: #fff; border: 1px solid #d8c89c; border-radius: 6px;
    padding: 1rem 1.25rem; margin-bottom: 1.5rem;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem;
  }
  .stat .label { color: #7a6240; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; }
  .stat .value { color: #3d2914; font-size: 1.4rem; font-weight: 700; font-family: "Georgia", serif; }
  .session {
    background: #fff; border: 1px solid #e5d8b5; border-radius: 6px;
    padding: 1rem 1.25rem; margin-bottom: 1rem;
  }
  .session-header { color: #7a6240; font-size: 0.82rem; margin-bottom: 0.75rem;
                    display: flex; gap: 1rem; flex-wrap: wrap; border-bottom: 1px solid #ede0bd; padding-bottom: 0.5rem; }
  .session-header code { background: #ede0bd; padding: 0.1em 0.4em; border-radius: 3px; font-size: 0.9em; }
  .msg { margin: 0.5rem 0; padding: 0.5rem 0.85rem; border-radius: 6px; }
  .msg.user { background: #3d2914; color: #f5ecd6; }
  .msg.assistant { background: #faf5e6; border: 1px solid #e5d8b5; }
  .msg .role { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.75; margin-bottom: 0.3rem; }
  .msg .content { white-space: pre-wrap; word-wrap: break-word; }
  .msg .tokens { font-size: 0.72rem; opacity: 0.7; margin-top: 0.4rem; }
  .empty { text-align: center; color: #7a6240; padding: 3rem; font-style: italic; }
</style>
</head>
<body>
<header>
  <h1>CASTLE chatbot — conversation log</h1>
  <div class="meta">Showing latest ${rows.length} messages across ${sessionList.length} sessions.</div>
</header>
<main>
  <div class="stats">
    <div class="stat"><div class="label">Messages</div><div class="value">${s?.totalMessages ?? 0}</div></div>
    <div class="stat"><div class="label">Sessions</div><div class="value">${s?.sessions ?? 0}</div></div>
    <div class="stat"><div class="label">Unique IPs</div><div class="value">${s?.uniqueIps ?? 0}</div></div>
    <div class="stat"><div class="label">Input tokens</div><div class="value">${(s?.totalInputTokens ?? 0).toLocaleString()}</div></div>
    <div class="stat"><div class="label">Output tokens</div><div class="value">${(s?.totalOutputTokens ?? 0).toLocaleString()}</div></div>
    <div class="stat"><div class="label">Cost (~$)</div><div class="value">$${totalCost}</div></div>
  </div>

  ${sessionList.length === 0 ? '<div class="empty">No conversations logged yet.</div>' :
    sessionList.map(sess => `
      <div class="session">
        <div class="session-header">
          <span>Session <code>${escapeHtml(sess.sessionId.slice(0, 8))}</code></span>
          <span>IP <code>${escapeHtml(sess.ipHash || '?')}</code></span>
          <span>${escapeHtml(formatDate(sess.firstAt))}${sess.firstAt !== sess.lastAt ? ' → ' + escapeHtml(formatDate(sess.lastAt)) : ''}</span>
          <span>${sess.messages.length} messages</span>
        </div>
        ${sess.messages.map(m => `
          <div class="msg ${escapeHtml(m.role)}">
            <div class="role">${escapeHtml(m.role)}</div>
            <div class="content">${escapeHtml(m.content)}</div>
            ${m.role === 'assistant' && (m.inputTokens || m.outputTokens) ? `
              <div class="tokens">in: ${m.inputTokens || 0}, out: ${m.outputTokens || 0}${m.cacheReadTokens ? ', cache read: ' + m.cacheReadTokens : ''}</div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `).join('')}
</main>
</body>
</html>`);
});

export default router;
