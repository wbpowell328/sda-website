// Framing tool v2 — HTTP routes.
//
// Mounted at /api/framing-nodes on the existing chatbot Express app.
// Endpoints in this Phase 1 pass:
//
//   POST   /nodes                              Create a self-service root
//                                              child (first-save flow).
//                                              Body: { name?, initial_framing? }
//                                              Response: full node + urls.
//
//   POST   /nodes/:readId/children             Create a child sub-node.
//                                              Requires ?w= write token on
//                                              THIS node OR any ancestor
//                                              (structural admin flows down).
//                                              Body: { name?, owner_label? }
//
//   GET    /nodes/:readId                      Read node + framings list.
//                                              Requires access via readId
//                                              (public capability) — that's
//                                              the point of a read URL.
//
//   POST   /nodes/:readId/regenerate           Mint fresh URLs. Requires
//                                              write token on this node OR
//                                              ancestor.
//
//   DELETE /nodes/:readId                      Cascade delete. Same auth as
//                                              regenerate.
//
//   GET    /framings/:framingId?readId=...     Read a framing. readId must
//                                              match its node or an ancestor
//                                              of it (read flows down).
//
//   POST   /framings?nodeReadId=...            Create a framing in a node.
//                                              Requires write token on THAT
//                                              node (content-write does NOT
//                                              flow down).
//                                              Body: { title, content }
//
//   PUT    /framings/:framingId                Update. Same rule as create.
//                                              Body: { title?, content? }
//
//   DELETE /framings/:framingId                Delete. Same rule.
//
// Soft-lock enforcement and full flow-down for structural admin land in
// Phase 3. This first pass punts on those and just does raw CRUD so the
// backend is testable with curl.

import express from 'express';
import { createHash } from 'node:crypto';
import {
  hasDatabaseUrl, query, tx,
} from './db.js';
import {
  newReadId, newWriteToken, isReadId, isWriteToken,
} from './tokens.js';

const router = express.Router();

// ---- helpers -------------------------------------------------------------

// Shape a raw node row for the client. Never returns write_token unless
// includeWriteToken is true — that only happens right after a create/
// regenerate, where the caller proved they should see it.
function shapeNode(row, { includeWriteToken = false } = {}) {
  if (!row) return null;
  const out = {
    read_id:         row.read_id,
    parent_id:       row.parent_id,
    name:            row.name,
    owner_label:     row.owner_label,
    is_root:         row.is_root,
    is_public_users: row.is_public_users,
    created_at:      row.created_at,
    updated_at:      row.updated_at,
    first_write_at:  row.first_write_at,
  };
  if (includeWriteToken) out.write_token = row.write_token;
  return out;
}

function shapeFraming(row) {
  if (!row) return null;
  return {
    id:         row.id,
    node_id:    row.node_id,
    title:      row.title,
    content:    row.content,
    size_bytes: row.size_bytes,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function getNodeByReadId(readId) {
  if (!isReadId(readId)) return null;
  const r = await query('SELECT * FROM nodes WHERE read_id = $1', [readId]);
  return r.rows[0] || null;
}

// Walk from `nodeId` up through `parent_id` links, collecting every
// ancestor's write_token. Used for structural-admin flow-down.
async function collectAncestorWriteTokens(nodeId) {
  const r = await query(
    `WITH RECURSIVE anc AS (
       SELECT id, parent_id, write_token FROM nodes WHERE id = $1
       UNION ALL
       SELECT n.id, n.parent_id, n.write_token
         FROM nodes n JOIN anc ON n.id = anc.parent_id
     )
     SELECT write_token FROM anc`,
    [nodeId]
  );
  return new Set(r.rows.map((x) => x.write_token));
}

// Same, but for read flow-down. Anyone with a readId matching this node OR
// any ancestor can read this node.
async function collectAncestorReadIds(nodeId) {
  const r = await query(
    `WITH RECURSIVE anc AS (
       SELECT id, parent_id, read_id FROM nodes WHERE id = $1
       UNION ALL
       SELECT n.id, n.parent_id, n.read_id
         FROM nodes n JOIN anc ON n.id = anc.parent_id
     )
     SELECT read_id FROM anc`,
    [nodeId]
  );
  return new Set(r.rows.map((x) => x.read_id));
}

// Guard for routes that need the DB. Wraps route handlers so a missing
// DATABASE_URL doesn't stack-trace — client sees a 503 with a clear
// message.
function dbRoute(handler) {
  return async (req, res, next) => {
    if (!hasDatabaseUrl()) {
      return res.status(503).json({
        error: 'Framing library backend is not configured yet.',
      });
    }
    try { await handler(req, res, next); }
    catch (err) {
      const status = err.status || 500;
      if (status >= 500) console.error('[framing-nodes]', req.method, req.originalUrl, err);
      res.status(status).json({ error: err.message || 'Internal error' });
    }
  };
}

function hashIp(rawIp) {
  const salt = process.env.IP_HASH_SALT || 'framing-nodes-default-salt';
  const s = (rawIp || '') + '|' + salt;
  return createHash('sha256').update(s).digest('hex').slice(0, 32);
}

// ---- one-time bootstrap (admin-gated) ------------------------------------
// GET /bootstrap-ui?p=<ADMIN_PASSWORD>
// Idempotent — creates root + Public users nodes if they don't exist and
// returns an HTML page showing both URL pairs. Safe to leave in production:
// gated by the shared ADMIN_PASSWORD env var; a second call just re-shows
// the existing URLs. Warren uses this once, bookmarks his root URLs, and
// then never touches it again.
router.get('/bootstrap-ui', dbRoute(async (req, res) => {
  const provided = String(req.query.p || '');
  if (!process.env.ADMIN_PASSWORD || provided !== process.env.ADMIN_PASSWORD) {
    return res.status(401).type('text/plain').send('Admin password required (add ?p=<ADMIN_PASSWORD> to the URL).');
  }

  const publicBase = (process.env.FRAMING_TOOL_URL || 'https://warrenpowell.org/decision-framing-tool/').replace(/\/+$/, '');
  const fmtUrls = (n) => ({
    read:  publicBase + '/?node=' + n.read_id,
    write: publicBase + '/?node=' + n.read_id + '&w=' + n.write_token,
  });

  // Ensure root
  let rootRow = (await query('SELECT * FROM nodes WHERE is_root = true LIMIT 1')).rows[0];
  let rootCreated = false;
  if (!rootRow) {
    rootRow = (await query(
      `INSERT INTO nodes (read_id, write_token, parent_id, name, owner_label, is_root)
       VALUES ($1, $2, NULL, $3, $4, true) RETURNING *`,
      [newReadId(), newWriteToken(), 'Root (Warren)', 'Warren Powell']
    )).rows[0];
    rootCreated = true;
  }

  // Ensure Public users
  let pubRow = (await query('SELECT * FROM nodes WHERE is_public_users = true LIMIT 1')).rows[0];
  let pubCreated = false;
  if (!pubRow) {
    pubRow = (await query(
      `INSERT INTO nodes (read_id, write_token, parent_id, name, owner_label, is_public_users)
       VALUES ($1, $2, $3, $4, $5, true) RETURNING *`,
      [newReadId(), newWriteToken(), rootRow.id, 'Public users', 'Warren Powell']
    )).rows[0];
    pubCreated = true;
  }

  const rootUrls = fmtUrls(rootRow);
  const pubUrls  = fmtUrls(pubRow);

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  res.type('text/html').send(`<!doctype html>
<html><head><meta charset="utf-8"><title>Framing tool v2 — bootstrap</title>
<style>
  body { font: 14px/1.4 system-ui, -apple-system, Segoe UI, sans-serif; max-width: 900px; margin: 24px auto; padding: 0 16px; color: #333; }
  h1 { color: #8a3a1a; }
  h2 { color: #5a3e1f; margin-top: 32px; border-bottom: 1px solid #e6d8bf; padding-bottom: 4px; }
  .status { padding: 6px 10px; border-radius: 4px; display: inline-block; font-size: 0.9em; }
  .created { background: #dcfce7; color: #14532d; }
  .existing { background: #fef3c7; color: #78350f; }
  .row { display: flex; align-items: center; gap: 8px; margin: 12px 0; }
  .label { font-weight: 600; min-width: 100px; color: #5a3e1f; }
  .url { flex: 1; font-family: ui-monospace, Menlo, monospace; font-size: 0.9em; padding: 6px 10px; background: #faf5e6; border: 1px solid #d6c4a3; border-radius: 4px; word-break: break-all; }
  button { padding: 6px 12px; border: 1px solid #c9a76a; background: #fff; color: #5a3e1f; border-radius: 4px; cursor: pointer; font: inherit; }
  button:hover { background: #f2e6c9; }
  .warning { background: #fee2e2; color: #991b1b; padding: 12px 16px; border-radius: 6px; margin-top: 24px; border-left: 4px solid #dc2626; }
</style>
</head><body>
<h1>Framing tool v2 — bootstrap</h1>

<h2>Root node <span class="status ${rootCreated ? 'created' : 'existing'}">${rootCreated ? 'newly created' : 'already existed'}</span></h2>
<p><b>Owner:</b> ${esc(rootRow.owner_label)} · <b>Name:</b> ${esc(rootRow.name)}</p>
<div class="row"><span class="label">Read URL</span><span class="url" id="r-read">${esc(rootUrls.read)}</span><button onclick="copy('r-read')">Copy</button></div>
<div class="row"><span class="label">Write URL</span><span class="url" id="r-write">${esc(rootUrls.write)}</span><button onclick="copy('r-write')">Copy</button></div>

<h2>Public users node <span class="status ${pubCreated ? 'created' : 'existing'}">${pubCreated ? 'newly created' : 'already existed'}</span></h2>
<p><b>Owner:</b> ${esc(pubRow.owner_label)} · <b>Name:</b> ${esc(pubRow.name)} (children created here by first-save)</p>
<div class="row"><span class="label">Read URL</span><span class="url" id="p-read">${esc(pubUrls.read)}</span><button onclick="copy('p-read')">Copy</button></div>
<div class="row"><span class="label">Write URL</span><span class="url" id="p-write">${esc(pubUrls.write)}</span><button onclick="copy('p-write')">Copy</button></div>

<div class="warning"><b>Save the ROOT WRITE URL somewhere very safe.</b> Losing it means nobody can rescue you — no admin console exists. A password manager entry, an encrypted note, or a printed copy in a physical safe all work.</div>

<script>
  function copy(id) {
    const t = document.getElementById(id).textContent;
    navigator.clipboard.writeText(t).then(() => {
      // brief inline confirmation on the button
      event.target.textContent = 'Copied ✓';
      setTimeout(() => { event.target.textContent = 'Copy'; }, 1200);
    });
  }
</script>
</body></html>`);
}));

// GET /admin/import-public-examples-ui?p=<ADMIN_PASSWORD>
// One-shot: creates a "Public examples" node as a child of root (if not
// already there), fetches the retirement snapshot of the old public
// library from the site, and imports each example as a framing inside
// the new node. Idempotent — re-runs skip framings whose title already
// exists in the node. Returns an HTML page showing the new node's URLs.
router.get('/admin/import-public-examples-ui', dbRoute(async (req, res) => {
  const provided = String(req.query.p || '');
  if (!process.env.ADMIN_PASSWORD || provided !== process.env.ADMIN_PASSWORD) {
    return res.status(401).type('text/plain').send('Admin password required.');
  }

  const root = (await query('SELECT * FROM nodes WHERE is_root = true LIMIT 1')).rows[0];
  if (!root) throw new Error('Root node not found — run bootstrap-ui first.');

  // Idempotent: reuse an existing "Public examples" node by name if present.
  let publicExamples = (await query(
    `SELECT * FROM nodes WHERE parent_id = $1 AND name = 'Public examples' LIMIT 1`,
    [root.id]
  )).rows[0];
  let nodeCreated = false;
  if (!publicExamples) {
    publicExamples = (await query(
      `INSERT INTO nodes (read_id, write_token, parent_id, name, owner_label)
       VALUES ($1, $2, $3, 'Public examples', 'Warren Powell')
       RETURNING *`,
      [newReadId(), newWriteToken(), root.id]
    )).rows[0];
    nodeCreated = true;
  }

  const snapshotUrl = (process.env.FRAMING_TOOL_URL
      ? new URL(process.env.FRAMING_TOOL_URL).origin
      : 'https://warrenpowell.org')
    + '/assets/framing-examples-snapshot-2026-09-05.json';

  let snapshot;
  try {
    const snapResp = await fetch(snapshotUrl);
    if (!snapResp.ok) throw new Error('HTTP ' + snapResp.status);
    snapshot = await snapResp.json();
  } catch (e) {
    throw new Error('Failed to fetch snapshot from ' + snapshotUrl + ': ' + (e.message || e));
  }

  const manifestEntries = (snapshot && snapshot._index && Array.isArray(snapshot._index.examples))
    ? snapshot._index.examples : [];
  const byFile = Object.fromEntries(manifestEntries.map(e => [e.file, e]));

  const examples = (snapshot && snapshot.examples) || {};
  const results = [];
  for (const fname of Object.keys(examples)) {
    const doc = examples[fname];
    if (!doc || typeof doc !== 'object') continue;
    const manifest = byFile[fname] || {};
    const title = String(manifest.title || doc.title || fname.replace(/\.json$/, ''))
      .slice(0, 200);
    // Copy the manifest's description into the framing content so it
    // shows in the library card / banner just like it did before.
    if (manifest.description && !doc.description) doc.description = manifest.description;

    const existing = (await query(
      'SELECT id FROM framings WHERE node_id = $1 AND title = $2 LIMIT 1',
      [publicExamples.id, title]
    )).rows[0];
    if (existing) {
      results.push({ title, status: 'skipped (already exists)' });
      continue;
    }
    await query(
      `INSERT INTO framings (node_id, title, content) VALUES ($1, $2, $3::jsonb)`,
      [publicExamples.id, title, JSON.stringify(doc)]
    );
    results.push({ title, status: 'imported' });
  }

  const publicBase = (process.env.FRAMING_TOOL_URL
    || 'https://warrenpowell.org/decision-framing-tool/').replace(/\/+$/, '');
  const readUrl  = publicBase + '/?node=' + publicExamples.read_id;
  const writeUrl = publicBase + '/?node=' + publicExamples.read_id
                 + '&w=' + publicExamples.write_token;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const rows = results.map(r => `<tr>
    <td>${esc(r.title)}</td>
    <td><span class="status ${r.status.startsWith('imported') ? 'created' : 'skip'}">${esc(r.status)}</span></td>
  </tr>`).join('');

  res.type('text/html').send(`<!doctype html>
<html><head><meta charset="utf-8"><title>Import public examples</title>
<style>
  body { font: 14px/1.4 system-ui, -apple-system, Segoe UI, sans-serif; max-width: 900px; margin: 24px auto; padding: 0 16px; color: #333; }
  h1 { color: #8a3a1a; }
  h2 { color: #5a3e1f; margin-top: 32px; border-bottom: 1px solid #e6d8bf; padding-bottom: 4px; }
  .status { padding: 4px 10px; border-radius: 4px; display: inline-block; font-size: 0.85em; }
  .created { background: #dcfce7; color: #14532d; }
  .skip { background: #fef3c7; color: #78350f; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  th, td { text-align: left; padding: 6px 10px; border-bottom: 1px solid #eee; }
  th { background: #faf5e6; color: #5a3e1f; }
  .row { display: flex; align-items: center; gap: 8px; margin: 12px 0; }
  .label { font-weight: 600; min-width: 100px; color: #5a3e1f; }
  .url { flex: 1; font-family: ui-monospace, Menlo, monospace; font-size: 0.9em; padding: 6px 10px; background: #faf5e6; border: 1px solid #d6c4a3; border-radius: 4px; word-break: break-all; }
  button { padding: 6px 12px; border: 1px solid #c9a76a; background: #fff; color: #5a3e1f; border-radius: 4px; cursor: pointer; font: inherit; }
  button:hover { background: #f2e6c9; }
</style>
</head><body>
<h1>Public examples imported</h1>

<h2>Public examples node <span class="status ${nodeCreated ? 'created' : 'skip'}">${nodeCreated ? 'newly created' : 'already existed'}</span></h2>
<div class="row"><span class="label">Read URL</span><span class="url" id="u-read">${esc(readUrl)}</span><button onclick="copy('u-read')">Copy</button></div>
<div class="row"><span class="label">Write URL</span><span class="url" id="u-write">${esc(writeUrl)}</span><button onclick="copy('u-write')">Copy</button></div>

<h2>Results (${results.length} examples processed)</h2>
<table><thead><tr><th>Title</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>

<p><em>The Read URL is what you'd put on the tool page as "Browse public examples." Bookmark the Write URL if you want to add more examples later. Re-running this URL is safe — already-imported framings (matched by title) are skipped.</em></p>

<script>
  function copy(id) {
    const t = document.getElementById(id).textContent;
    navigator.clipboard.writeText(t).then(() => {
      event.target.textContent = 'Copied ✓';
      setTimeout(() => { event.target.textContent = 'Copy'; }, 1200);
    });
  }
</script>
</body></html>`);
}));

// ---- routes --------------------------------------------------------------

// POST /nodes  — first-save auto-create under Public users
router.post('/nodes', dbRoute(async (req, res) => {
  const publicUsers = (await query(
    'SELECT id FROM nodes WHERE is_public_users = true LIMIT 1'
  )).rows[0];
  if (!publicUsers) {
    throw Object.assign(new Error(
      'Public users branch not initialized — run bootstrap.js.'
    ), { status: 500 });
  }
  const name = String(req.body?.name || 'Untitled library').slice(0, 200);
  const ipHash = hashIp(req.ip);

  const row = (await query(
    `INSERT INTO nodes (read_id, write_token, parent_id, name, created_ip_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [newReadId(), newWriteToken(), publicUsers.id, name, ipHash]
  )).rows[0];

  res.status(201).json({ node: shapeNode(row, { includeWriteToken: true }) });
}));

// POST /nodes/:readId/children  — create a sub-node
router.post('/nodes/:readId/children', dbRoute(async (req, res) => {
  const parent = await getNodeByReadId(req.params.readId);
  if (!parent) return res.status(404).json({ error: 'Parent node not found' });

  const writeToken = String(req.query.w || '');
  const validAdminTokens = await collectAncestorWriteTokens(parent.id);
  if (!isWriteToken(writeToken) || !validAdminTokens.has(writeToken)) {
    return res.status(403).json({
      error: 'Write token required (must match this node or an ancestor).',
    });
  }

  const name = String(req.body?.name || 'Untitled library').slice(0, 200);
  const ownerLabel = String(req.body?.owner_label || '').slice(0, 200);
  const ipHash = hashIp(req.ip);

  const row = (await query(
    `INSERT INTO nodes (read_id, write_token, parent_id, name, owner_label, created_ip_hash)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [newReadId(), newWriteToken(), parent.id, name, ownerLabel, ipHash]
  )).rows[0];

  res.status(201).json({ node: shapeNode(row, { includeWriteToken: true }) });
}));

// GET /nodes/:readId  — node metadata + child list + framings list
router.get('/nodes/:readId', dbRoute(async (req, res) => {
  const node = await getNodeByReadId(req.params.readId);
  if (!node) return res.status(404).json({ error: 'Node not found' });

  // Children (name + read_id only — no write_token leaks).
  const children = (await query(
    `SELECT read_id, name, owner_label, updated_at, first_write_at
       FROM nodes WHERE parent_id = $1
       ORDER BY LOWER(name)`,
    [node.id]
  )).rows;

  // Framings (metadata only — content omitted for the list view).
  const framings = (await query(
    `SELECT id, title, size_bytes, created_at, updated_at
       FROM framings WHERE node_id = $1
       ORDER BY updated_at DESC`,
    [node.id]
  )).rows;

  // Ancestry — labels-only breadcrumb, visible to any child (per design #ii).
  const ancestry = (await query(
    `WITH RECURSIVE anc AS (
       SELECT id, parent_id, name, 0 AS depth FROM nodes WHERE id = $1
       UNION ALL
       SELECT n.id, n.parent_id, n.name, anc.depth + 1
         FROM nodes n JOIN anc ON n.id = anc.parent_id
     )
     SELECT name FROM anc ORDER BY depth DESC`,
    [node.id]
  )).rows.map((r) => r.name);

  res.json({
    node: shapeNode(node),
    children,
    framings,
    ancestry,   // e.g. ['Root (Warren)', 'Public users', 'ORF 411', 'Alice']
  });
}));

// POST /nodes/:readId/regenerate  — mint fresh URLs, invalidating the old ones
router.post('/nodes/:readId/regenerate', dbRoute(async (req, res) => {
  const node = await getNodeByReadId(req.params.readId);
  if (!node) return res.status(404).json({ error: 'Node not found' });

  const writeToken = String(req.query.w || '');
  const validAdminTokens = await collectAncestorWriteTokens(node.id);
  if (!isWriteToken(writeToken) || !validAdminTokens.has(writeToken)) {
    return res.status(403).json({
      error: 'Write token required (must match this node or an ancestor).',
    });
  }

  const row = (await query(
    `UPDATE nodes SET read_id = $1, write_token = $2
       WHERE id = $3 RETURNING *`,
    [newReadId(), newWriteToken(), node.id]
  )).rows[0];

  res.json({ node: shapeNode(row, { includeWriteToken: true }) });
}));

// DELETE /nodes/:readId  — cascade delete
router.delete('/nodes/:readId', dbRoute(async (req, res) => {
  const node = await getNodeByReadId(req.params.readId);
  if (!node) return res.status(404).json({ error: 'Node not found' });
  if (node.is_root) return res.status(400).json({ error: 'Cannot delete root node.' });

  const writeToken = String(req.query.w || '');
  const validAdminTokens = await collectAncestorWriteTokens(node.id);
  if (!isWriteToken(writeToken) || !validAdminTokens.has(writeToken)) {
    return res.status(403).json({
      error: 'Write token required (must match this node or an ancestor).',
    });
  }

  // Count what's about to disappear so the client can show it in a confirm.
  const counts = (await query(
    `WITH RECURSIVE sub AS (
       SELECT id FROM nodes WHERE id = $1
       UNION ALL
       SELECT n.id FROM nodes n JOIN sub ON n.parent_id = sub.id
     )
     SELECT
       (SELECT COUNT(*) FROM sub) - 1                                AS descendant_nodes,
       (SELECT COUNT(*) FROM framings WHERE node_id IN (SELECT id FROM sub)) AS framings`,
    [node.id]
  )).rows[0];

  await query('DELETE FROM nodes WHERE id = $1', [node.id]);
  res.json({ deleted: true, ...counts });
}));

// ---- framing routes ------------------------------------------------------

async function getFramingById(id) {
  const n = Number(id);
  if (!Number.isFinite(n) || n <= 0) return null;
  const r = await query('SELECT * FROM framings WHERE id = $1', [n]);
  return r.rows[0] || null;
}

// GET /framings/:id?readId=...  — fetch full framing content
router.get('/framings/:id', dbRoute(async (req, res) => {
  const f = await getFramingById(req.params.id);
  if (!f) return res.status(404).json({ error: 'Framing not found' });

  const readId = String(req.query.readId || '');
  const validReadIds = await collectAncestorReadIds(f.node_id);
  if (!isReadId(readId) || !validReadIds.has(readId)) {
    return res.status(403).json({
      error: 'Read token required (must match this framing\'s node or an ancestor).',
    });
  }

  res.json({ framing: shapeFraming(f) });
}));

// POST /framings?nodeReadId=...&w=...  — create a framing in a node
router.post('/framings', dbRoute(async (req, res) => {
  const nodeReadId = String(req.query.nodeReadId || '');
  const node = await getNodeByReadId(nodeReadId);
  if (!node) return res.status(404).json({ error: 'Node not found' });

  const writeToken = String(req.query.w || '');
  // Content write is per-node — flow-down does NOT apply.
  if (!isWriteToken(writeToken) || writeToken !== node.write_token) {
    return res.status(403).json({
      error: 'Write token required (must match THIS node — content-write does not flow down).',
    });
  }

  const title = String(req.body?.title || 'Untitled framing').slice(0, 200);
  const content = req.body?.content ?? {};
  if (typeof content !== 'object') {
    return res.status(400).json({ error: 'content must be an object' });
  }

  await tx(async (client) => {
    const row = (await client.query(
      `INSERT INTO framings (node_id, title, content)
       VALUES ($1, $2, $3::jsonb) RETURNING *`,
      [node.id, title, JSON.stringify(content)]
    )).rows[0];
    // Stamp first_write_at on the node if this is the first write.
    if (!node.first_write_at) {
      await client.query(
        'UPDATE nodes SET first_write_at = NOW() WHERE id = $1 AND first_write_at IS NULL',
        [node.id]
      );
    }
    res.status(201).json({ framing: shapeFraming(row) });
  });
}));

// PUT /framings/:id?w=...  — update
router.put('/framings/:id', dbRoute(async (req, res) => {
  const f = await getFramingById(req.params.id);
  if (!f) return res.status(404).json({ error: 'Framing not found' });

  const node = (await query('SELECT * FROM nodes WHERE id = $1', [f.node_id])).rows[0];
  const writeToken = String(req.query.w || '');
  if (!isWriteToken(writeToken) || writeToken !== node.write_token) {
    return res.status(403).json({
      error: 'Write token required (must match this framing\'s node).',
    });
  }

  const patch = {};
  if (typeof req.body?.title === 'string') patch.title = req.body.title.slice(0, 200);
  if (req.body?.content !== undefined) {
    if (typeof req.body.content !== 'object' || req.body.content === null) {
      return res.status(400).json({ error: 'content must be an object' });
    }
    patch.content = req.body.content;
  }
  if (!Object.keys(patch).length) return res.json({ framing: shapeFraming(f) });

  // Build a small dynamic UPDATE — only touch the fields the client sent.
  const sets = [];
  const params = [];
  let i = 1;
  if (patch.title !== undefined)   { sets.push('title = $' + (i++));   params.push(patch.title); }
  if (patch.content !== undefined) { sets.push('content = $' + (i++) + '::jsonb'); params.push(JSON.stringify(patch.content)); }
  params.push(f.id);
  const row = (await query(
    'UPDATE framings SET ' + sets.join(', ') + ' WHERE id = $' + i + ' RETURNING *',
    params
  )).rows[0];

  res.json({ framing: shapeFraming(row) });
}));

// DELETE /framings/:id?w=...
router.delete('/framings/:id', dbRoute(async (req, res) => {
  const f = await getFramingById(req.params.id);
  if (!f) return res.status(404).json({ error: 'Framing not found' });

  const node = (await query('SELECT * FROM nodes WHERE id = $1', [f.node_id])).rows[0];
  const writeToken = String(req.query.w || '');
  if (!isWriteToken(writeToken) || writeToken !== node.write_token) {
    return res.status(403).json({
      error: 'Write token required (must match this framing\'s node).',
    });
  }

  await query('DELETE FROM framings WHERE id = $1', [f.id]);
  res.json({ deleted: true });
}));

export default router;
