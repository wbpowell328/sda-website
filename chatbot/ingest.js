// Build the RAG knowledge.db from Warren's source material.
//
// Walks ../Ask Prof Powell chat material/ — one subfolder per book of .tex
// files plus .docx folders for LinkedIn etc. — converts each file to clean
// Markdown via Pandoc, chunks at section boundaries, embeds the chunks via
// Voyage AI, and stores them in a local SQLite database with a vec0 virtual
// table for fast similarity search.
//
// Usage:
//   npm run ingest          (full rebuild)
//   npm run ingest -- --dry (parse + chunk only; skip embedding/DB write)
//
// Idempotent: drops and rebuilds the tables each run.

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import pLimit from 'p-limit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

const SOURCE_ROOT = path.resolve(__dirname, '..', 'Ask Prof Powell chat material');
const PAGES_ROOT  = path.resolve(__dirname, '..', '_pages');
const DB_PATH = path.join(__dirname, 'knowledge.db');
const EMBED_MODEL = 'voyage-3';
const EMBED_DIM = 1024;
const CHUNK_MAX_CHARS = 4000;   // ~1000 tokens
const CHUNK_OVERLAP_CHARS = 400; // ~100 tokens
const EMBED_BATCH_SIZE = 64;     // Voyage allows up to 128
const DRY_RUN = process.argv.includes('--dry');

if (!DRY_RUN && !process.env.VOYAGE_API_KEY) {
  console.error('Missing VOYAGE_API_KEY in .env. Get one at https://www.voyageai.com');
  process.exit(1);
}

// ============================================================================
// Source discovery
// ============================================================================

// Folder name → human-readable book name + short citation tag.
const BOOK_META = {
  'Reinforcement Learning and Stochastic Optimization': { name: 'RLSO', full: 'Reinforcement Learning and Stochastic Optimization' },
  'Optimal Learning':                                    { name: 'Optimal Learning', full: 'Optimal Learning' },
  'Sequential Decision Analytics and Modeling':          { name: 'SDAM', full: 'Sequential Decision Analytics and Modeling' },
  'Framing the Problem':                                 { name: 'Framing the Problem', full: 'Framing Decision Problems (Bridging Decision Problems, Vol. I)' },
  'Modern Approach to Teaching Optimization':            { name: 'MATO', full: 'A Modern Approach to Teaching Optimization' },
  'LinkedIn posts':                                      { name: 'LinkedIn', full: 'LinkedIn posts' },
};

// Skip master / template files — these are just \documentclass + \input.
const SKIP_TEX_PATTERNS = [
  /_Wiley\.tex$/i,
  /^master[._-]/i,
  /^main[._-]/i,
];

function discoverSources() {
  const sources = [];

  // Site pages — every _pages/*.md becomes a 'page' source labeled "CASTLE Site".
  if (existsSync(PAGES_ROOT)) {
    for (const f of readdirSync(PAGES_ROOT).sort()) {
      if (!f.toLowerCase().endsWith('.md')) continue;
      sources.push({ kind: 'page', file: path.join(PAGES_ROOT, f), book: 'CASTLE Site', folder: '_pages' });
    }
  }

  if (!existsSync(SOURCE_ROOT)) {
    console.error(`Source folder not found: ${SOURCE_ROOT}`);
    process.exit(1);
  }
  for (const entry of readdirSync(SOURCE_ROOT)) {
    const full = path.join(SOURCE_ROOT, entry);
    if (statSync(full).isFile()) {
      // Top-level files like "Important links.docx"
      const lower = entry.toLowerCase();
      if (lower.endsWith('.docx') && !entry.startsWith('~$')) {
        sources.push({ kind: 'docx', file: full, book: 'Reference', folder: '' });
      }
      continue;
    }
    if (!statSync(full).isDirectory()) continue;
    const meta = BOOK_META[entry] || { name: entry, full: entry };
    const files = readdirSync(full).sort();
    for (const f of files) {
      const fp = path.join(full, f);
      const lower = f.toLowerCase();
      if (f.startsWith('~$')) continue;
      if (lower.endsWith('.tex')) {
        if (SKIP_TEX_PATTERNS.some(rx => rx.test(f))) continue;
        sources.push({ kind: 'tex', file: fp, book: meta.name, folder: entry });
      } else if (lower.endsWith('.docx')) {
        sources.push({ kind: 'docx', file: fp, book: meta.name, folder: entry });
      }
    }
  }
  return sources;
}

// ============================================================================
// Voyage embedding API
// ============================================================================

async function voyageEmbed(texts, inputType) {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: texts,
      model: EMBED_MODEL,
      input_type: inputType,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Voyage API ${res.status}: ${body}`);
  }
  const json = await res.json();
  return json.data.sort((a, b) => a.index - b.index);
}

// ============================================================================
// Pandoc conversion
// ============================================================================

function pandocConvert(srcPath, kind) {
  if (kind === 'page') return convertSitePage(srcPath);
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'castle-ingest-'));
  const out = path.join(tmp, 'out.md');
  try {
    if (kind === 'tex') {
      // For LaTeX, feed pandoc only the document body wrapped in a minimal
      // preamble. Avoids pandoc choking on Kindle-style \titleformat,
      // \usepackage, custom commands, etc. — none of which are content.
      const raw = readFileSync(srcPath, 'utf8');
      const body = stripPreamble(raw);
      const stub = `\\documentclass{article}\n\\begin{document}\n${body}\n\\end{document}\n`;
      const input = path.join(tmp, 'in.tex');
      writeFileSync(input, stub, 'utf8');
      execSync(`pandoc -f latex "${input}" -t markdown -o "${out}"`, {
        stdio: ['ignore', 'pipe', 'pipe'],
        maxBuffer: 64 * 1024 * 1024,
      });
    } else {
      execSync(`pandoc "${srcPath}" -t markdown -o "${out}"`, {
        stdio: ['ignore', 'pipe', 'pipe'],
        maxBuffer: 64 * 1024 * 1024,
      });
    }
    return readFileSync(out, 'utf8');
  } catch (err) {
    console.error(`  pandoc failed on ${path.basename(srcPath)}: ${(err.stderr?.toString() || err.message).split('\n').slice(0, 3).join(' | ')}`);
    return null;
  } finally {
    try { rmSync(tmp, { recursive: true, force: true }); } catch {}
  }
}

// Convert a Jekyll _pages/*.md page. Strip front matter, capture the title,
// drop the {% raw %} wrappers, then convert the inner HTML to Markdown via
// Pandoc. Returns the same Markdown shape pandocConvert would for any other
// source, with a top-level "# Title" so chunkMarkdown labels chunks properly.
function convertSitePage(srcPath) {
  const raw = readFileSync(srcPath, 'utf8');
  let title = path.basename(srcPath, '.md');
  let body = raw;
  const fm = raw.match(/^---\s*\r?\n([\s\S]+?)\r?\n---\s*\r?\n/);
  if (fm) {
    const titleMatch = fm[1].match(/^\s*title:\s*['"]?(.+?)['"]?\s*$/m);
    if (titleMatch) title = titleMatch[1].trim();
    body = raw.slice(fm[0].length);
  }
  body = body
    .replace(/\{%\s*raw\s*%\}/g, '')
    .replace(/\{%\s*endraw\s*%\}/g, '')
    .trim();
  if (!body) return null;

  // If the body looks like HTML, run it through Pandoc to clean it up.
  if (/<[a-zA-Z][^>]*>/.test(body)) {
    const tmp = mkdtempSync(path.join(os.tmpdir(), 'castle-page-'));
    const input = path.join(tmp, 'in.html');
    const out = path.join(tmp, 'out.md');
    try {
      writeFileSync(input, body, 'utf8');
      execSync(`pandoc -f html "${input}" -t markdown -o "${out}"`, {
        stdio: ['ignore', 'pipe', 'pipe'],
        maxBuffer: 32 * 1024 * 1024,
      });
      body = readFileSync(out, 'utf8');
    } catch (err) {
      console.error(`  pandoc html→md failed on ${path.basename(srcPath)}: ${err.message.split('\n')[0]}`);
      // Fall through with the raw HTML — Claude can still read it.
    } finally {
      try { rmSync(tmp, { recursive: true, force: true }); } catch {}
    }
  }

  return `# ${title}\n\n${body}\n`;
}

// Pull just the content between \begin{document} and \end{document}, then
// strip pure-typography commands that pandoc chokes on (titleformat, etc.).
// If there's no \begin{document}, the file is probably a chapter — only the
// command-stripping step applies.
function stripPreamble(tex) {
  let body = tex;
  const beginIdx = tex.indexOf('\\begin{document}');
  if (beginIdx >= 0) {
    const endIdx = tex.lastIndexOf('\\end{document}');
    body = tex.slice(beginIdx + '\\begin{document}'.length, endIdx >= 0 ? endIdx : undefined);
  }
  // Strip multi-argument typography commands (no content, pandoc can't parse them).
  body = stripCommand(body, '\\titleformat');
  body = stripCommand(body, '\\titlespacing');
  body = stripCommand(body, '\\setcounter');
  body = stripCommand(body, '\\thispagestyle');
  body = stripCommand(body, '\\pagestyle');
  return body;
}

// Remove every occurrence of `\name{...}{...}[...]{...}` plus any following
// balanced brace or bracket groups. Whitespace between args is fine.
function stripCommand(tex, name) {
  const out = [];
  let i = 0;
  while (i < tex.length) {
    const idx = tex.indexOf(name, i);
    if (idx < 0) { out.push(tex.slice(i)); break; }
    // Ensure name is not a prefix of a longer command (e.g., \pagestyle vs \pagestylechange)
    const nextCh = tex[idx + name.length];
    if (nextCh && /[A-Za-z]/.test(nextCh)) {
      out.push(tex.slice(i, idx + name.length));
      i = idx + name.length;
      continue;
    }
    // Append everything before the command.
    out.push(tex.slice(i, idx));
    // Now skip the command and all immediately following {...} or [...] groups.
    let j = idx + name.length;
    while (j < tex.length) {
      // Skip whitespace
      while (j < tex.length && /\s/.test(tex[j])) j++;
      if (tex[j] === '{' || tex[j] === '[') {
        const close = tex[j] === '{' ? '}' : ']';
        const open = tex[j];
        let depth = 1;
        j++;
        while (j < tex.length && depth > 0) {
          if (tex[j] === '\\') { j += 2; continue; }
          if (tex[j] === open) depth++;
          else if (tex[j] === close) depth--;
          j++;
        }
      } else {
        break;
      }
    }
    i = j;
  }
  return out.join('');
}

// ============================================================================
// Markdown -> structured chunks
// ============================================================================

// Walk markdown; track current chapter / section / subsection; emit chunks
// at section boundaries, splitting any over-large section by paragraph.
function chunkMarkdown(md, baseMeta) {
  const chunks = [];
  const lines = md.split(/\r?\n/);

  let chapter = baseMeta.chapter || '';
  let section = '';
  let subsection = '';
  let buffer = [];

  function flush() {
    const text = buffer.join('\n').trim();
    buffer = [];
    if (!text) return;
    splitOversized(text).forEach(part => {
      chunks.push({
        ...baseMeta,
        chapter,
        section,
        subsection,
        text: part,
      });
    });
  }

  for (const line of lines) {
    // Match markdown headers produced by pandoc from \chapter / \section / \subsection.
    const h1 = line.match(/^# +(.+?)\s*(?:\{.*\})?\s*$/);
    const h2 = line.match(/^## +(.+?)\s*(?:\{.*\})?\s*$/);
    const h3 = line.match(/^### +(.+?)\s*(?:\{.*\})?\s*$/);
    if (h1) {
      flush();
      chapter = cleanHeader(h1[1]);
      section = '';
      subsection = '';
      continue;
    }
    if (h2) {
      flush();
      section = cleanHeader(h2[1]);
      subsection = '';
      continue;
    }
    if (h3) {
      flush();
      subsection = cleanHeader(h3[1]);
      continue;
    }
    buffer.push(line);
  }
  flush();
  return chunks;
}

function cleanHeader(s) {
  return s
    .replace(/\[.*?\]\{[^}]*\}/g, '$&') // keep
    .replace(/\\label\{[^}]+\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitOversized(text) {
  if (text.length <= CHUNK_MAX_CHARS) return [text];
  const paras = text.split(/\n\s*\n/);
  const out = [];
  let cur = '';
  for (const p of paras) {
    if ((cur + '\n\n' + p).length > CHUNK_MAX_CHARS && cur) {
      out.push(cur);
      // Carry a tail of the previous chunk for context-overlap.
      const tail = cur.slice(-CHUNK_OVERLAP_CHARS);
      cur = tail + '\n\n' + p;
    } else {
      cur = cur ? `${cur}\n\n${p}` : p;
    }
  }
  if (cur) out.push(cur);
  // If a single paragraph itself exceeded max, hard-split it.
  return out.flatMap(c => c.length <= CHUNK_MAX_CHARS * 1.5 ? [c] : hardSplit(c));
}

function hardSplit(text) {
  const out = [];
  for (let i = 0; i < text.length; i += CHUNK_MAX_CHARS - CHUNK_OVERLAP_CHARS) {
    out.push(text.slice(i, i + CHUNK_MAX_CHARS));
  }
  return out;
}

// Derive a citation-friendly label for a site page from its filename.
// e.g., "rlvssda.md" -> "/rlvssda/"
function pageLabelFromFile(filename) {
  const base = path.basename(filename, '.md');
  return `/${base}/`;
}

// Derive a useful chapter label from a .tex filename for multi-file books.
// e.g., "12-policyfunctionapproximation.tex" -> "Ch. 12 Policy Function Approximation"
function chapterFromFilename(filename) {
  const base = path.basename(filename, '.tex');
  const m = base.match(/^(\d+)[-_](.+)$/);
  if (!m) return base;
  const num = m[1];
  const title = m[2].replace(/[-_]/g, ' ').replace(/([A-Z])/g, ' $1').trim();
  return `Ch. ${parseInt(num, 10)} — ${title.replace(/\b\w/g, c => c.toUpperCase())}`;
}

// ============================================================================
// Main pipeline
// ============================================================================

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('CASTLE RAG ingestion');
  console.log(`Source: ${SOURCE_ROOT}`);
  console.log(`Database: ${DB_PATH}${DRY_RUN ? ' (dry run — DB not written)' : ''}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const sources = discoverSources();
  console.log(`Found ${sources.length} source files across ${new Set(sources.map(s => s.book)).size} books.`);

  // Phase 1: convert + chunk
  const allChunks = [];
  for (const src of sources) {
    const rel = src.kind === 'page'
      ? path.relative(path.resolve(__dirname, '..'), src.file)
      : path.relative(SOURCE_ROOT, src.file);
    process.stdout.write(`  [${src.book}] ${path.basename(src.file)}... `);
    const md = pandocConvert(src.file, src.kind);
    if (!md) { console.log('skipped'); continue; }
    const baseMeta = {
      book: src.book,
      sourceFile: rel,
      chapter: src.kind === 'tex' ? chapterFromFilename(src.file)
             : src.kind === 'page' ? pageLabelFromFile(src.file)
             : '',
    };
    const chunks = chunkMarkdown(md, baseMeta);
    allChunks.push(...chunks);
    console.log(`${chunks.length} chunks`);
  }

  const totalChars = allChunks.reduce((s, c) => s + c.text.length, 0);
  console.log(`\nTotal chunks: ${allChunks.length}`);
  console.log(`Total chars: ${totalChars.toLocaleString()} (~${Math.round(totalChars / 4).toLocaleString()} tokens)`);

  if (DRY_RUN) {
    console.log('\nDry run — skipping embedding + DB write.');
    console.log('First 3 chunks for inspection:');
    for (const c of allChunks.slice(0, 3)) {
      console.log('  ---');
      console.log(`  Book: ${c.book} | Chapter: ${c.chapter} | Section: ${c.section}`);
      console.log(`  ${c.text.slice(0, 200).replace(/\n/g, ' ')}...`);
    }
    return;
  }

  // Phase 2: embed in batches via Voyage REST API
  console.log('\nEmbedding chunks via Voyage...');
  const limit = pLimit(4);
  const embeddings = new Array(allChunks.length);
  let done = 0;
  const tasks = [];
  for (let i = 0; i < allChunks.length; i += EMBED_BATCH_SIZE) {
    const batch = allChunks.slice(i, i + EMBED_BATCH_SIZE);
    const offset = i;
    tasks.push(limit(async () => {
      const data = await voyageEmbed(batch.map(c => c.text), 'document');
      data.forEach((d, j) => { embeddings[offset + j] = d.embedding; });
      done += batch.length;
      process.stdout.write(`\r  ${done}/${allChunks.length} chunks embedded`);
    }));
  }
  await Promise.all(tasks);
  console.log('');

  // Phase 3: write to SQLite. Drop existing tables in SQL (works even if
  // a running chatbot has the .db file open read-only on Windows).
  console.log('\nWriting to SQLite...');
  const db = new Database(DB_PATH);
  sqliteVec.load(db);

  db.exec(`
    DROP TABLE IF EXISTS chunks;
    DROP TABLE IF EXISTS chunk_vectors;
    CREATE TABLE chunks (
      id INTEGER PRIMARY KEY,
      book       TEXT NOT NULL,
      source_file TEXT,
      chapter    TEXT,
      section    TEXT,
      subsection TEXT,
      text       TEXT NOT NULL,
      char_count INTEGER NOT NULL
    );
    CREATE VIRTUAL TABLE chunk_vectors USING vec0(
      embedding float[${EMBED_DIM}]
    );
  `);

  const insertChunk = db.prepare(`
    INSERT INTO chunks (id, book, source_file, chapter, section, subsection, text, char_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertVec = db.prepare(`INSERT INTO chunk_vectors (rowid, embedding) VALUES (?, ?)`);

  const tx = db.transaction(() => {
    for (let i = 0; i < allChunks.length; i++) {
      const c = allChunks[i];
      const rowid = i + 1;
      insertChunk.run(rowid, c.book, c.sourceFile, c.chapter, c.section, c.subsection, c.text, c.text.length);
      // sqlite-vec requires BigInt rowid + Float32Array embedding (per its Node example).
      insertVec.run(BigInt(rowid), new Float32Array(embeddings[i]));
    }
  });
  tx();

  const finalCount = db.prepare('SELECT COUNT(*) AS n FROM chunks').get().n;
  console.log(`Wrote ${finalCount} chunks to ${DB_PATH}`);
  console.log('Done.');
}

main().catch(err => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
