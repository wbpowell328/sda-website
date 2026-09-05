// Framing tool v2 — one-time root bootstrap.
//
// Creates two special nodes if they don't already exist:
//   1. Root node — owner = Warren. Parent = null. is_root = true.
//   2. Public users node — a child of root that will parent every
//      self-service first-save node. is_public_users = true.
//
// Prints both URLs to the console. Warren copies them from the Render
// log stream (or from wherever this script is run) and bookmarks them.
//
// Run:  DATABASE_URL=... node chatbot/framing-nodes/bootstrap.js
//
// The uniq_root_node and uniq_public_users_node partial indexes make
// re-runs safe — the second insert attempt is a no-op. This script also
// prints the URLs of the existing rows so you can recover them if you
// lose the log.

import 'dotenv/config';
import { getPool, initSchema, query } from './db.js';
import { newReadId, newWriteToken } from './tokens.js';

const PUBLIC_BASE_URL = process.env.FRAMING_TOOL_URL
  || 'https://warrenpowell.org/decision-framing-tool/';

function fmtUrls(node) {
  const base = PUBLIC_BASE_URL.replace(/\/+$/, '');
  const readUrl  = base + '/?node=' + node.read_id;
  const writeUrl = base + '/?node=' + node.read_id + '&w=' + node.write_token;
  return { readUrl, writeUrl };
}

async function ensureRoot() {
  const existing = await query('SELECT * FROM nodes WHERE is_root = true LIMIT 1');
  if (existing.rowCount) return { row: existing.rows[0], created: false };
  const row = (await query(
    `INSERT INTO nodes (read_id, write_token, parent_id, name, owner_label, is_root)
     VALUES ($1, $2, NULL, $3, $4, true)
     RETURNING *`,
    [newReadId(), newWriteToken(), 'Root (Warren)', 'Warren Powell']
  )).rows[0];
  return { row, created: true };
}

async function ensurePublicUsers(rootId) {
  const existing = await query('SELECT * FROM nodes WHERE is_public_users = true LIMIT 1');
  if (existing.rowCount) return { row: existing.rows[0], created: false };
  const row = (await query(
    `INSERT INTO nodes (read_id, write_token, parent_id, name, owner_label, is_public_users)
     VALUES ($1, $2, $3, $4, $5, true)
     RETURNING *`,
    [newReadId(), newWriteToken(), rootId, 'Public users', 'Warren Powell']
  )).rows[0];
  return { row, created: true };
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Set it in your Render dashboard');
    console.error('(or export it locally) before running bootstrap.');
    process.exit(1);
  }
  await initSchema();
  const root = await ensureRoot();
  const pub  = await ensurePublicUsers(root.row.id);

  const rootUrls = fmtUrls(root.row);
  const pubUrls  = fmtUrls(pub.row);

  console.log('');
  console.log('====================================================================');
  console.log('  FRAMING TOOL v2 — ROOT BOOTSTRAP');
  console.log('====================================================================');
  console.log('');
  console.log('Root node   ' + (root.created ? '(newly created)' : '(already existed)'));
  console.log('  Name       : ' + root.row.name);
  console.log('  Read URL   : ' + rootUrls.readUrl);
  console.log('  Write URL  : ' + rootUrls.writeUrl);
  console.log('');
  console.log('Public users node   ' + (pub.created ? '(newly created)' : '(already existed)'));
  console.log('  Name       : ' + pub.row.name);
  console.log('  Read URL   : ' + pubUrls.readUrl);
  console.log('  Write URL  : ' + pubUrls.writeUrl);
  console.log('');
  console.log('====================================================================');
  console.log('  SAVE THE WRITE URL FOR THE ROOT NODE SOMEWHERE VERY SAFE.');
  console.log('  Losing it means nobody can rescue you — no admin console exists.');
  console.log('====================================================================');
  console.log('');

  await getPool().end();
}

main().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
