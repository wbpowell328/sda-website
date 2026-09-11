#!/usr/bin/env node
// Full-batch book translator. Runs across every configured language for
// the chosen book. For each language:
//   1. Ensure chatbot/i18n-glossary/<lang>.json exists (bootstrap from the
//      English keys in es.json if not — the value column is machine-translated
//      by Claude into the target language). Glossaries are SHARED across
//      books because they carry field-wide terminology, not book-specific
//      titles.
//   2. Translate _data/<tocName>.yml → _data/<tocName>_<slug>.yml (unless
//      already present).
//   3. For each page in the book's PAGES list:
//        - Skip if the output file already exists (idempotent). Pass --force
//          to overwrite.
//        - Otherwise: run translate_book.cjs and write to
//          _pages/<pageStem>-<lang>-<rest>.md.
//
// Usage:
//   node translate_batch.cjs [--book=<slug>] [--force] [--stale] [--only=<lang>[,<lang>...]]
//     e.g. node translate_batch.cjs                                # SDAM (default)
//          node translate_batch.cjs --book=bridging-vol1           # Bridging Vol I
//          node translate_batch.cjs --book=bridging-vol1 --only=es # Spanish pilot
//          node translate_batch.cjs --force
//          node translate_batch.cjs --stale       # re-translate only pages
//                                                 # whose English source
//                                                 # has changed since the
//                                                 # last translation
//
// Modes are mutually exclusive:
//   default : skip pages whose output file already exists (fills gaps).
//   --force : re-translate everything, overwriting whatever's on disk.
//   --stale : re-translate ONLY existing pages whose stored source-body
//             hash differs from the English source's current hash.
//             Missing pages and up-to-date pages are both skipped.
//
// The script logs progress on stderr and prints a final summary of
// (pages translated, pages skipped, pages failed) so it can be safely
// re-run to fill gaps if any single page failed.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const client = new Anthropic();
const MODEL = process.env.TRANSLATE_MODEL || 'claude-sonnet-5';

const LANG_NAMES = {
  es:      'Spanish',
  fr:      'French',
  de:      'German',
  'pt-BR': 'Brazilian Portuguese',
  zh:      'Simplified Chinese (zh-Hans)',
  ja:      'Japanese',
};
const LANGS = Object.keys(LANG_NAMES);

// Per-book config. `pageStem` is the shared prefix of every source page
// AND the target page (e.g. sdam.md, sdam-chapter-1.md → sdam-<lang>.md,
// sdam-<lang>-chapter-1.md). `tocName` is the base name of the _data/*.yml
// TOC (without language suffix). `pages` is the ordered source list.
const BOOKS = {
  sdam: {
    pageStem: 'sdam',
    tocName:  'sdam_toc',
    pages: [
      'sdam.md', 'sdam-about.md', 'sdam-contents.md', 'sdam-preface.md',
      'sdam-chapter-1.md', 'sdam-chapter-2.md', 'sdam-chapter-3.md',
      'sdam-chapter-4.md', 'sdam-chapter-5.md', 'sdam-chapter-6.md',
      'sdam-chapter-7.md', 'sdam-chapter-8.md', 'sdam-chapter-9.md',
      'sdam-chapter-10.md', 'sdam-chapter-11.md', 'sdam-chapter-12.md',
      'sdam-chapter-13.md', 'sdam-chapter-14.md', 'sdam-references.md',
    ],
  },
  'bridging-vol1': {
    pageStem: 'bridging-vol1',
    tocName:  'bridging_vol1_toc',
    pages: [
      'bridging-vol1.md', 'bridging-vol1-about.md', 'bridging-vol1-contents.md',
      'bridging-vol1-chapter-1.md', 'bridging-vol1-chapter-2.md',
      'bridging-vol1-chapter-3.md', 'bridging-vol1-chapter-4.md',
      'bridging-vol1-chapter-5.md', 'bridging-vol1-chapter-6.md',
      'bridging-vol1-chapter-7.md',
    ],
  },
};

const REPO_ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(REPO_ROOT, '_pages');
const DATA_DIR  = path.join(REPO_ROOT, '_data');
const GLOSS_DIR = path.join(__dirname, 'i18n-glossary');

function langSlug(lang) { return lang.replace(/-/g, '_').toLowerCase(); }

// ── Glossary bootstrap ──────────────────────────────────────────
async function ensureGlossary(lang) {
  const outPath = path.join(GLOSS_DIR, lang + '.json');
  if (fs.existsSync(outPath)) return;
  console.error('[' + lang + '] bootstrapping glossary...');
  const es = JSON.parse(fs.readFileSync(path.join(GLOSS_DIR, 'es.json'), 'utf8'));
  const englishTerms = Object.keys(es);
  const langName = LANG_NAMES[lang];
  const numbered = englishTerms.map((t, i) => (i + 1) + '. ' + t).join('\n');
  const sys =
    'Translate each of the numbered English technical terms into ' + langName + '. ' +
    'These are terms from operations research, stochastic optimization, ' +
    'reinforcement learning, and sequential decision analytics. Use the ' +
    'standard academic translation used in ' + langName + '-language textbooks ' +
    'on these topics. Keep proper nouns (Bellman, Markov, Monte Carlo) in ' +
    'their original form. For Chapter/Section/Figure/Table/Equation/Exercise ' +
    'the value is the SINGLE ' + langName + ' word ONLY (do not include the number). ' +
    'Return EXACTLY the same numbered list, one translation per line, no commentary.';
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    system: sys,
    messages: [{ role: 'user', content: numbered }],
  });
  const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*(\d+)\.\s*(.+?)\s*$/);
    if (!m) continue;
    const idx = Number(m[1]) - 1;
    if (idx >= 0 && idx < englishTerms.length) out[englishTerms[idx]] = m[2];
  }
  // Any term the model dropped falls back to English (harmless — unchanged
  // rendering).
  for (const t of englishTerms) if (!out[t]) out[t] = t;
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.error('[' + lang + '] glossary written: ' + Object.keys(out).length + ' terms');
}

// ── TOC bootstrap ───────────────────────────────────────────────
function ensureToc(lang, bookCfg, bookSlug) {
  const outPath = path.join(DATA_DIR, bookCfg.tocName + '_' + langSlug(lang) + '.yml');
  if (fs.existsSync(outPath)) return { skipped: true };
  console.error('[' + lang + '] translating TOC (' + bookCfg.tocName + ')...');
  const srcPath = path.join(DATA_DIR, bookCfg.tocName + '.yml');
  const r = spawnSync('node', [
    path.join(__dirname, 'translate_toc.cjs'),
    srcPath, lang, outPath, '--book=' + bookSlug,
  ], { stdio: 'inherit', env: process.env });
  if (r.status !== 0) throw new Error('TOC translation failed for ' + lang);
  return { skipped: false };
}

// ── Page translation ────────────────────────────────────────────
function pageOutPath(lang, srcName, bookCfg) {
  // <stem>.md            → <stem>-<lang>.md   (the front cover)
  // <stem>-chapter-1.md  → <stem>-<lang>-chapter-1.md
  const stem = bookCfg.pageStem;
  if (srcName === stem + '.md') return path.join(PAGES_DIR, stem + '-' + lang + '.md');
  const rest = srcName.replace(new RegExp('^' + stem.replace(/[-]/g, '\\-') + '-'), '');
  return path.join(PAGES_DIR, stem + '-' + lang + '-' + rest);
}
// Read a translated page's stored `translated_from_hash` front-matter
// value. Returns null if the file is missing or the field isn't present.
function readStoredHash(pagePath) {
  if (!fs.existsSync(pagePath)) return null;
  const raw = fs.readFileSync(pagePath, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fmLines = m[1].split(/\r?\n/);
  for (const line of fmLines) {
    const kv = line.match(/^translated_from_hash:\s*"?([A-Za-z0-9]+)"?\s*$/);
    if (kv) return kv[1];
  }
  return null;
}
// Compute the hash of an English source's BODY (what translate_book.cjs
// stamps as translated_from_hash). Must match the algorithm there.
function computeSourceBodyHash(srcPath) {
  const raw = fs.readFileSync(srcPath, 'utf8');
  const m = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  const body = m ? m[1] : raw;
  return crypto.createHash('sha256').update(body).digest('hex').slice(0, 16);
}
// stale = true if the translated file exists but its stored source hash
// doesn't match the English source's current hash. false if either the
// file is missing (missing is not stale — a missing translation gets
// translated in normal --stale mode too) or the hashes match.
function isStale(srcPath, outPath) {
  if (!fs.existsSync(outPath)) return false;
  const stored = readStoredHash(outPath);
  if (!stored) return false;   // pre-hash file — leave it alone unless --force
  return computeSourceBodyHash(srcPath) !== stored;
}

// Modes:
//   default : skip if output exists (idempotent — for filling gaps)
//   --force : always overwrite
//   --stale : re-translate ONLY files whose stored source hash differs
//             from the current English source; skip missing files AND
//             files with matching hashes.
function translatePage(srcName, lang, opts, bookCfg, bookSlug) {
  const src = path.join(PAGES_DIR, srcName);
  const out = pageOutPath(lang, srcName, bookCfg);
  const exists = fs.existsSync(out);
  if (opts.stale) {
    if (!exists) {
      console.error('[' + lang + '] SKIP (missing; --stale only touches existing files): ' + path.basename(out));
      return 'skipped';
    }
    if (!isStale(src, out)) {
      console.error('[' + lang + '] SKIP (up-to-date): ' + path.basename(out));
      return 'skipped';
    }
    console.error('[' + lang + '] STALE — retranslate: ' + srcName + ' → ' + path.basename(out));
  } else {
    if (exists && !opts.force) {
      console.error('[' + lang + '] SKIP (exists): ' + path.basename(out));
      return 'skipped';
    }
    console.error('[' + lang + '] TRANSLATE: ' + srcName + ' → ' + path.basename(out));
  }
  const r = spawnSync('node', [
    path.join(__dirname, 'translate_book.cjs'),
    src, lang, out, '--book=' + bookSlug,
  ], { stdio: 'inherit', env: process.env });
  return r.status === 0 ? 'ok' : 'failed';
}

// ── Fix front-matter for the home page ──────────────────────────
// translate_book.cjs rewrites /sdam/ → /sdam/<lang>/ generically. For the
// home page (sdam.md, permalink /sdam/) it produces /sdam/<lang>/ correctly
// via the same rule. No special-casing needed here; leaving this stub so
// the location of any future permalink weirdness has a home.

// ── Driver ──────────────────────────────────────────────────────
async function main() {
  const argv = process.argv.slice(2);
  const force = argv.includes('--force');
  const stale = argv.includes('--stale');
  if (force && stale) {
    console.error('--force and --stale are mutually exclusive.');
    process.exit(2);
  }
  const opts = { force, stale };
  let langs = LANGS;
  let bookSlug = 'sdam';
  for (const a of argv) {
    const mo = a.match(/^--only=(.+)$/);
    if (mo) langs = mo[1].split(',').filter(l => LANGS.indexOf(l) >= 0);
    const mb = a.match(/^--book=(.+)$/);
    if (mb) bookSlug = mb[1];
  }
  const bookCfg = BOOKS[bookSlug];
  if (!bookCfg) {
    console.error('Unknown book: ' + bookSlug + '. Known: ' + Object.keys(BOOKS).join(', '));
    process.exit(2);
  }

  fs.mkdirSync(GLOSS_DIR, { recursive: true });
  const summary = { ok: 0, skipped: 0, failed: 0, failures: [] };

  console.error('BOOK: ' + bookSlug + '  (' + bookCfg.pages.length + ' pages × ' + langs.length + ' language(s))');

  for (const lang of langs) {
    console.error('════════════════════════════════════════════════════════');
    console.error('LANGUAGE: ' + lang + ' (' + LANG_NAMES[lang] + ')' + (stale ? ' [--stale]' : force ? ' [--force]' : ''));
    console.error('════════════════════════════════════════════════════════');
    try {
      // Setup is per-language and only runs when there's no glossary/TOC yet.
      // --stale doesn't affect these — glossaries/TOCs are cheap and stable.
      await ensureGlossary(lang);
      ensureToc(lang, bookCfg, bookSlug);
    } catch (err) {
      console.error('[' + lang + '] setup failed: ' + err.message);
      summary.failed++;
      summary.failures.push(lang + ':setup');
      continue;
    }
    for (const page of bookCfg.pages) {
      const status = translatePage(page, lang, opts, bookCfg, bookSlug);
      summary[status]++;
      if (status === 'failed') summary.failures.push(lang + ':' + page);
    }
  }

  console.error('════════════════════════════════════════════════════════');
  console.error('SUMMARY: ok=' + summary.ok + ' skipped=' + summary.skipped + ' failed=' + summary.failed);
  if (summary.failures.length) {
    console.error('FAILURES:');
    for (const f of summary.failures) console.error('  - ' + f);
    console.error('Re-run this script to retry failed pages (successes are idempotent-skipped).');
  }
  process.exit(summary.failed > 0 ? 1 : 0);
}

main().catch(err => { console.error(err); process.exit(1); });
