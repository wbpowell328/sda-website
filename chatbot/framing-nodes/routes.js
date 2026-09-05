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
