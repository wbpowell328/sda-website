// RAG retrieval module — shared by the server.
// Loads knowledge.db (built by ingest.js), exposes retrieve(query, k) which
// returns the top-k most relevant chunks for a given user question.

import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'knowledge.db');
const EMBED_MODEL = 'voyage-3';

let db = null;

function getDb() {
  if (db) return db;
  if (!existsSync(DB_PATH)) {
    throw new Error(
      `knowledge.db not found at ${DB_PATH}. Run "npm run ingest" first.`
    );
  }
  db = new Database(DB_PATH, { readonly: true });
  sqliteVec.load(db);
  return db;
}

// Embed a single query via Voyage. Uses input_type: "query" (different from
// document) — Voyage tunes the embedding space slightly for retrieval.
async function embedQuery(text) {
  if (!process.env.VOYAGE_API_KEY) {
    throw new Error('Missing VOYAGE_API_KEY for RAG retrieval.');
  }
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: [text],
      model: EMBED_MODEL,
      input_type: 'query',
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Voyage API ${res.status}: ${body}`);
  }
  const json = await res.json();
  return new Float32Array(json.data[0].embedding);
}

// Retrieve top-k chunks for a user query. Returns an array of:
//   { book, chapter, section, subsection, text, distance }
export async function retrieve(query, k = 8) {
  const conn = getDb();
  const vec = await embedQuery(query);
  const rows = conn.prepare(`
    SELECT
      c.book, c.chapter, c.section, c.subsection, c.text, c.source_file,
      v.distance
    FROM chunk_vectors v
    JOIN chunks c ON c.id = v.rowid
    WHERE v.embedding MATCH ?
      AND k = ?
    ORDER BY v.distance ASC
  `).all(Buffer.from(vec.buffer), k);
  return rows;
}

// Format retrieved chunks into a context block to inject into Claude's prompt.
// Numbered citations [1], [2], ... that the model can refer back to in its
// reply.
export function formatContext(chunks) {
  if (!chunks || chunks.length === 0) return '';
  const lines = ['Relevant excerpts from Warren\'s work:\n'];
  chunks.forEach((c, i) => {
    const cite = [c.book, c.chapter, c.section, c.subsection]
      .filter(s => s && s.trim())
      .join(' · ');
    lines.push(`[${i + 1}] ${cite || c.book}`);
    lines.push(c.text.trim());
    lines.push('');
  });
  return lines.join('\n');
}

// Stats / health
export function stats() {
  const conn = getDb();
  const totalChunks = conn.prepare('SELECT COUNT(*) AS n FROM chunks').get().n;
  const byBook = conn.prepare(`
    SELECT book, COUNT(*) AS n, SUM(char_count) AS chars
    FROM chunks GROUP BY book ORDER BY n DESC
  `).all();
  return { totalChunks, byBook };
}
