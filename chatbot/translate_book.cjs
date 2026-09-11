#!/usr/bin/env node
// Translate a Jekyll book page (e.g. an SDAM or Bridging Vol I chapter)
// into another language. Math blocks ($...$ and $$...$$) are extracted
// and re-inserted verbatim so LaTeX is never touched. HTML tags and
// Markdown structure are preserved by instructing Claude to keep them
// literal.
//
// Usage: node translate_book.cjs <source.md> <lang> <output.md> [--book=<slug>]
//   e.g. node translate_book.cjs ../_pages/sdam-chapter-1.md es ../_pages/sdam-es-chapter-1.md
//        node translate_book.cjs ../_pages/bridging-vol1-chapter-1.md es \
//             ../_pages/bridging-vol1-es-chapter-1.md --book=bridging-vol1
//
// lang codes: es fr de pt-BR zh ja  (add more in LANG_NAMES).
// book slug:  sdam (default) | bridging-vol1  (add more in BOOKS).
//
// Front matter is rewritten:
//   permalink   /<book>/…              → /<book>/<lang>/…
//   book_home   /<book>/…              → /<book>/<lang>/…
//   book_data   <book>_toc             → <book>_toc_<lang_slug>
//   title                              → translated
//   + adds lang, translated_from, translated_from_hash
//
// Notes
// -----
// * Math extractor treats every "$$…$$" block as an opaque unit and every
//   single-line "$…$" span as inline. Delimiters that span multiple lines
//   as "$…\n…$" are not supported (this book doesn't use them).
// * Body is chunked at paragraph boundaries so each Claude call stays under
//   ~12k source chars.
// * Placeholders use ⟦N⟧ (math angle brackets around a digit) — a token
//   Claude reliably preserves and that never appears in the source prose.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
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

// Per-book config. `urlPrefix` MUST start and end with `/`. `tocName` is
// the base name (without the language suffix) of the _data/*.yml TOC.
const BOOKS = {
  sdam: {
    urlPrefix: '/sdam/',
    tocName:   'sdam_toc',
  },
  'bridging-vol1': {
    urlPrefix: '/bridging-vol1/',
    tocName:   'bridging_vol1_toc',
  },
};

// ── Front matter ────────────────────────────────────────────────
// The book pages use a very simple YAML shape:
//   ---
//   layout: book
//   book_data: sdam_toc
//   book_home: /sdam/contents/
//   title: "Chapter 1: Modeling sequential decision problems"
//   permalink: /sdam/chapter-1/
//   date: 2026-07-17
//   ---
// so we parse it line-by-line to avoid adding a YAML dependency to the
// chatbot's deployed package.json.
function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('No YAML front matter found (must begin with "---").');
  const body = m[2];
  const lines = m[1].split(/\r?\n/);
  const fm = {};
  const order = [];
  for (const line of lines) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;                    // multi-line values not used in this book
    let val = kv[2].trim();
    // Strip surrounding quotes ("…" or '…') — matches how the source is written.
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[kv[1]] = val;
    order.push(kv[1]);
  }
  return { fm, order, body };
}
function stringifyFrontMatter(fm, order) {
  // Preserve the original key order, then append any newly-added keys at the end
  // in the order they were added.
  const seen = new Set(order);
  const extras = Object.keys(fm).filter(k => !seen.has(k));
  const all = order.filter(k => fm[k] !== undefined && fm[k] !== null).concat(extras);
  const lines = ['---'];
  for (const k of all) {
    const v = String(fm[k]);
    // Quote titles / any value with special chars; keep simple values bare.
    const needsQuote = /[:#"'\\\n]/.test(v) || v !== v.trim();
    lines.push(k + ': ' + (needsQuote ? JSON.stringify(v) : v));
  }
  lines.push('---');
  return lines.join('\n');
}

// ── Protected-span extractor ────────────────────────────────────
// Replaces math ($…$ and $$…$$) AND Liquid tags/outputs ({% … %} and
// {{ … }}) with opaque ⟦N⟧ placeholders. Liquid tags matter because SDAM
// chapters wrap their whole body in {% raw %} … {% endraw %} — dropping
// either side of that pair breaks Jekyll/Pages builds.
function extractProtected(text) {
  const blocks = [];
  let out = '';
  let i = 0;
  while (i < text.length) {
    // Liquid tag {% … %} (highest priority — includes {% raw %} / {% endraw %}).
    if (text[i] === '{' && text[i + 1] === '%') {
      const end = text.indexOf('%}', i + 2);
      if (end !== -1) {
        blocks.push(text.slice(i, end + 2));
        out += '⟦' + (blocks.length - 1) + '⟧';
        i = end + 2;
        continue;
      }
    }
    // Liquid output {{ … }}.
    if (text[i] === '{' && text[i + 1] === '{') {
      const end = text.indexOf('}}', i + 2);
      if (end !== -1) {
        blocks.push(text.slice(i, end + 2));
        out += '⟦' + (blocks.length - 1) + '⟧';
        i = end + 2;
        continue;
      }
    }
    // Block math $$…$$
    if (text[i] === '$' && text[i + 1] === '$') {
      const end = text.indexOf('$$', i + 2);
      if (end !== -1) {
        blocks.push(text.slice(i, end + 2));
        out += '⟦' + (blocks.length - 1) + '⟧';
        i = end + 2;
        continue;
      }
    }
    // Inline math $…$ (single line; kramdown-friendly convention in this book)
    if (text[i] === '$') {
      let j = i + 1;
      while (j < text.length && text[j] !== '$' && text[j] !== '\n') j++;
      if (j < text.length && text[j] === '$') {
        blocks.push(text.slice(i, j + 1));
        out += '⟦' + (blocks.length - 1) + '⟧';
        i = j + 1;
        continue;
      }
    }
    out += text[i];
    i++;
  }
  return { text: out, blocks };
}
function restoreProtected(text, blocks) {
  return text.replace(/⟦(\d+)⟧/g, (_, n) => blocks[Number(n)] || '');
}

// ── Chunker ─────────────────────────────────────────────────────
// Split at paragraph boundaries; keep each chunk ≲ 12k source chars so the
// Claude call finishes well under max_tokens.
function chunkBody(body, maxChars = 12000) {
  const paragraphs = body.split(/\n\n+/);
  const chunks = [];
  let cur = '';
  for (const p of paragraphs) {
    const pWithSep = (cur ? '\n\n' : '') + p;
    if (cur.length + pWithSep.length > maxChars && cur.length > 0) {
      chunks.push(cur);
      cur = p;
    } else {
      cur += pWithSep;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

// ── Glossary ────────────────────────────────────────────────────
// Optional per-language glossary at chatbot/i18n-glossary/<lang>.json:
//   { "state variable": "variable de estado", ... }
// Fed into the system prompt so the same term always renders the same way.
function loadGlossary(lang) {
  const p = path.join(__dirname, 'i18n-glossary', lang + '.json');
  if (!fs.existsSync(p)) return {};
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { console.error('  (glossary parse error, ignored: ' + e.message + ')'); return {}; }
}

// ── Translator ──────────────────────────────────────────────────
async function translateChunk(chunk, lang, glossary) {
  const langName = LANG_NAMES[lang] || lang;
  const glossaryText = Object.keys(glossary).length
    ? '\n\nPreferred technical terminology (use these translations consistently):\n' +
      Object.entries(glossary).map(([en, tr]) => `  "${en}" → "${tr}"`).join('\n')
    : '';
  const sys =
    'You are a technical translator specializing in operations research, stochastic ' +
    'optimization, reinforcement learning, and sequential decision analytics. ' +
    'Translate the given English text into ' + langName + ' with these STRICT rules:\n' +
    '1. Preserve every ⟦N⟧ placeholder EXACTLY as-is. These are math blocks that will be ' +
    'reinjected verbatim; do NOT translate, unwrap, renumber, or alter them.\n' +
    '2. Preserve every HTML tag and attribute EXACTLY as-is. Only translate the visible ' +
    'text between tags (including alt text and figcaptions). Never translate attribute ' +
    'names, class names, id values, or URLs.\n' +
    '3. Preserve every Markdown structure (headings, lists, blockquotes, code fences, ' +
    'link syntax `[text](url)`, emphasis `*x*`/`**x**`). Translate the human-readable ' +
    'text inside links, but never the URL.\n' +
    '4. Preserve every Liquid tag ({% raw %}, {% endraw %}, {{ }}) EXACTLY as-is.\n' +
    '5. Do NOT translate: book titles (e.g. "Reinforcement Learning and Stochastic ' +
    'Optimization", "RLSO"), proper nouns (Powell, Bellman, Markov, Monte Carlo), ' +
    'code, LaTeX commands, package/library names (Python, NumPy), or file paths.\n' +
    '6. Chapter/figure/table references keep their number: "Figure 1.1" → the ' +
    langName + ' equivalent of "Figure" plus " 1.1".\n' +
    '7. Return ONLY the translated text. No preamble, no commentary, no wrapping ' +
    'quotes, no explanation of your choices.' +
    glossaryText;
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: sys,
    messages: [{ role: 'user', content: chunk }],
  });
  const parts = (response.content || [])
    .filter(b => b.type === 'text')
    .map(b => b.text);
  return {
    text: parts.join('\n'),
    usage: response.usage,
  };
}

// ── Front-matter rewriter ───────────────────────────────────────
function langSlug(lang) { return lang.replace(/-/g, '_').toLowerCase(); }
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function rewriteFrontMatter(fm, lang, book) {
  const cfg = BOOKS[book];
  if (!cfg) throw new Error('Unknown book: ' + book);
  // /<book>/chapter-1/ → /<book>/<lang>/chapter-1/
  const prefixRe = new RegExp('^' + escapeRe(cfg.urlPrefix));
  const langPrefix = cfg.urlPrefix + lang + '/';
  if (fm.permalink) fm.permalink = fm.permalink.replace(prefixRe, langPrefix);
  if (fm.book_home) {
    fm.book_home = fm.book_home.replace(prefixRe, langPrefix);
  } else {
    // Source omits book_home (Bridging Vol I lets the layout auto-default
    // to the English contents). Translated pages need an explicit one so
    // the "back to contents" link and topbar title stay in-language.
    fm.book_home = langPrefix + 'contents/';
  }
  // Set book_data explicitly. Some source pages omit it and rely on the
  // layout default; translated pages must name their per-language TOC
  // outright or the layout falls back to the English one.
  fm.book_data = cfg.tocName + '_' + langSlug(lang);
  fm.lang = lang;
  fm.translated_from = 'en';
}

// ── Driver ──────────────────────────────────────────────────────
// Localize internal `/<book>/…` links in a translated body to
// `/<book>/<lang>/…`.
// - Negative lookbehind excludes URL-interior occurrences (asset paths like
//   `/assets/images/<book>/foo.png` have a letter directly before the slash).
// - Negative lookahead skips URLs already carrying a known language prefix
//   (idempotent — safe to run twice).
// So only URL-start occurrences (preceded by whitespace, `"`, `'`, `(`,
// `=`, or start-of-string) get rewritten.
function localizeBookLinks(text, lang, book) {
  const cfg = BOOKS[book];
  const knownLangs = Object.keys(LANG_NAMES).join('|');
  // urlPrefix is like '/sdam/' or '/bridging-vol1/'. Strip the leading /
  // for regex readability and escape the middle.
  const inner = escapeRe(cfg.urlPrefix.replace(/^\/|\/$/g, ''));
  const re = new RegExp('(?<![A-Za-z0-9_])/' + inner + '/(?!(?:' + knownLangs + ')/)', 'g');
  return text.replace(re, cfg.urlPrefix + lang + '/');
}

async function translateFile(sourcePath, lang, outputPath, book) {
  if (!LANG_NAMES[lang]) throw new Error('Unknown lang: ' + lang + '. Known: ' + Object.keys(LANG_NAMES).join(', '));
  if (!BOOKS[book]) throw new Error('Unknown book: ' + book + '. Known: ' + Object.keys(BOOKS).join(', '));
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const { fm, order, body } = parseFrontMatter(raw);
  const glossary = loadGlossary(lang);

  // Track a hash of the English body so a future run can detect drift.
  const bodyHash = crypto.createHash('sha256').update(body).digest('hex').slice(0, 16);

  // 1) Translate the title separately (small, worth doing on its own).
  // Claude occasionally wraps translated titles in **bold** or *italics*
  // markdown (probably matching the emphasis it perceives in a "chapter
  // title"). That breaks Jekyll YAML if the title lands in front matter
  // unquoted — strip surrounding emphasis so downstream YAML is always
  // a plain string.
  const enTitle = fm.title || '';
  let trTitle = enTitle;
  if (enTitle.trim()) {
    console.error('  translating title...');
    const { text } = await translateChunk(enTitle, lang, glossary);
    trTitle = text.trim()
      .replace(/^#{1,6}\s+/, '')                 // "## Kapitel 2..." → "Kapitel 2..."
      .replace(/^\*\*(.*)\*\*$/, '$1')
      .replace(/^\*(.*)\*$/, '$1')
      .replace(/^_{1,2}(.*)_{1,2}$/, '$1')
      .replace(/^["'“”‘’](.*)["'“”‘’]$/, '$1')
      .trim();
  }

  // 2) Extract math → placeholders, chunk, translate each chunk, restore math.
  // First strip the boundary {% raw %} … {% endraw %} wrapper if present.
  // These tags land at the very start / end of every chunk and Claude
  // occasionally drops the leading one as "noise" — better to add them
  // back deterministically than to send them through the model.
  let rawPrefix = '';
  let rawSuffix = '';
  let bodyForXtract = body;
  const rawOpen  = bodyForXtract.match(/^([\s]*\{%-?\s*raw\s*-?%\}[\s]*)/);
  if (rawOpen) {
    rawPrefix = rawOpen[1];
    bodyForXtract = bodyForXtract.slice(rawPrefix.length);
  }
  const rawClose = bodyForXtract.match(/([\s]*\{%-?\s*endraw\s*-?%\}[\s]*)$/);
  if (rawClose) {
    rawSuffix = rawClose[1];
    bodyForXtract = bodyForXtract.slice(0, bodyForXtract.length - rawSuffix.length);
  }
  const { text: bodyProse, blocks } = extractProtected(bodyForXtract);
  const chunks = chunkBody(bodyProse);
  console.error('  ' + chunks.length + ' chunk(s), ' + blocks.length + ' math block(s)');
  let usageIn = 0, usageOut = 0;
  const translatedChunks = [];
  for (let i = 0; i < chunks.length; i++) {
    console.error('  translating chunk ' + (i + 1) + '/' + chunks.length + '...');
    const { text, usage } = await translateChunk(chunks[i], lang, glossary);
    translatedChunks.push(text);
    if (usage) { usageIn += usage.input_tokens || 0; usageOut += usage.output_tokens || 0; }
  }
  const trBodyProse = translatedChunks.join('\n\n');
  let trBody = restoreProtected(trBodyProse, blocks);
  // Rewrite internal book links to keep the reader in their chosen language.
  trBody = localizeBookLinks(trBody, lang, book);
  // Re-attach the {% raw %} / {% endraw %} boundary wrapper we stripped
  // before extraction, so Jekyll sees the same "raw" contract as the
  // original.
  trBody = rawPrefix + trBody + rawSuffix;

  // 3) Rewrite front matter for the translated page.
  fm.title = trTitle;
  rewriteFrontMatter(fm, lang, book);
  fm.translated_from_hash = bodyHash;

  // 4) Round-trip sanity BEFORE write: every placeholder present in the
  // extract must survive translation. If the model dropped one we bail —
  // otherwise the corrupt file sits on disk and the batch's idempotent
  // "skip if exists" logic would prevent a clean re-run.
  const missing = [];
  for (let i = 0; i < blocks.length; i++) {
    if (!trBodyProse.includes('⟦' + i + '⟧')) missing.push(i);
  }
  if (missing.length) {
    throw new Error('Translated text lost ' + missing.length + ' math placeholder(s): ⟦' +
      missing.slice(0, 5).join('⟧, ⟦') + '⟧' + (missing.length > 5 ? ', …' : '') +
      ' — nothing written; re-run to try again.');
  }

  // 5) Write output.
  const out = stringifyFrontMatter(fm, order) + '\n\n' + trBody;
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, out, 'utf8');
  console.error('  wrote ' + outputPath + '  (in=' + usageIn + ', out=' + usageOut + ' tokens)');
}

// ── CLI ─────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
let book = 'sdam';
const positional = [];
for (const a of argv) {
  const m = a.match(/^--book=(.+)$/);
  if (m) { book = m[1]; continue; }
  positional.push(a);
}
const [src, lang, out] = positional;
if (!src || !lang || !out) {
  console.error('usage: node translate_book.cjs <source.md> <lang> <output.md> [--book=<slug>]');
  console.error('  langs: ' + Object.keys(LANG_NAMES).join(' '));
  console.error('  books: ' + Object.keys(BOOKS).join(' ') + ' (default: sdam)');
  process.exit(1);
}
translateFile(src, lang, out, book).catch(err => {
  console.error('ERROR: ' + (err && err.stack || err));
  process.exit(1);
});
