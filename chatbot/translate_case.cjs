#!/usr/bin/env node
// Translate a Bridging Vol I case study (.docx under /assets/cases/) into
// another language. Round-trips through Markdown using pandoc:
//   in.docx  →  (pandoc) →  in.md
//                            (Claude translates prose, preserves formatting)
//   in.md    →  (pandoc) →  out.docx
//
// The translated .docx is written to /assets/cases/<lang>/<same-name>.docx
// so Chapter 6's per-language links (which the book translator rewrites
// to /assets/cases/<lang>/…) resolve cleanly.
//
// Usage: node translate_case.cjs <in.docx> <lang> <out.docx>
//
// lang codes: es fr de pt-BR zh ja  (add more in LANG_NAMES).

const fs = require('fs');
const os = require('os');
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

function loadGlossary(lang) {
  const p = path.join(__dirname, 'i18n-glossary', lang + '.json');
  if (!fs.existsSync(p)) return {};
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { console.error('  (glossary parse error, ignored: ' + e.message + ')'); return {}; }
}

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

async function translateChunk(chunk, lang, glossary) {
  const langName = LANG_NAMES[lang] || lang;
  const glossaryText = Object.keys(glossary).length
    ? '\n\nPreferred technical terminology (use these translations consistently):\n' +
      Object.entries(glossary).map(([en, tr]) => `  "${en}" → "${tr}"`).join('\n')
    : '';
  const sys =
    'You are a technical translator working on a set of decision-analytics ' +
    'case studies for Professor Warren Powell. Translate the given English ' +
    'text into ' + langName + ' with these STRICT rules:\n' +
    '1. Preserve every Markdown structure (headings `#`, `##`, ..., lists, ' +
    'blockquotes, tables, code fences, link syntax `[text](url)`, emphasis ' +
    '`*x*`/`**x**`) EXACTLY. Translate visible text; never translate link ' +
    'URLs, code, or numbers.\n' +
    '2. Preserve every table\'s pipe/dash structure. Translate cell text; ' +
    'never change column count, row count, or alignment markers.\n' +
    '3. Preserve every $…$ / $$…$$ math span EXACTLY as-is (LaTeX).\n' +
    '4. Do NOT translate: proper nouns (Powell, Bellman, Markov), fictional ' +
    'company/person names within the case, product / drug / trial codes ' +
    '(AST-417, etc.), currency symbols, or file paths.\n' +
    '5. Numbers, units, and dates stay in their original form. Keep "$214 ' +
    'million" as-is; do not localize currency to euros/yen/etc.\n' +
    '6. Chapter/figure/exhibit/table references keep their number: ' +
    '"Exhibit 1" → the ' + langName + ' equivalent of "Exhibit" plus " 1".\n' +
    '7. Return ONLY the translated text. No preamble, no commentary, no ' +
    'wrapping quotes.' +
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

function runPandoc(args) {
  const r = spawnSync('pandoc', args, { encoding: 'utf8' });
  if (r.status !== 0) {
    throw new Error('pandoc failed (' + r.status + '): ' + (r.stderr || ''));
  }
  return r.stdout;
}

async function translateCase(srcDocx, lang, outDocx) {
  if (!LANG_NAMES[lang]) throw new Error('Unknown lang: ' + lang);
  if (!fs.existsSync(srcDocx)) throw new Error('Source not found: ' + srcDocx);

  // Scratch working directory (unique per run so parallel runs don't collide).
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'translate-case-'));
  const enMd = path.join(scratch, 'en.md');
  const trMd = path.join(scratch, 'tr.md');

  try {
    // 1) docx → markdown
    console.error('  pandoc: ' + path.basename(srcDocx) + ' → markdown');
    runPandoc(['-t', 'markdown', '--wrap=none', '-o', enMd, srcDocx]);
    const enBody = fs.readFileSync(enMd, 'utf8');

    // 2) chunk + translate
    const chunks = chunkBody(enBody);
    const glossary = loadGlossary(lang);
    console.error('  ' + chunks.length + ' chunk(s)');
    let usageIn = 0, usageOut = 0;
    const parts = [];
    for (let i = 0; i < chunks.length; i++) {
      console.error('  translating chunk ' + (i + 1) + '/' + chunks.length + '...');
      const { text, usage } = await translateChunk(chunks[i], lang, glossary);
      parts.push(text);
      if (usage) { usageIn += usage.input_tokens || 0; usageOut += usage.output_tokens || 0; }
    }
    fs.writeFileSync(trMd, parts.join('\n\n'), 'utf8');

    // 3) markdown → docx (reference-doc absent — default styling is fine
    //    for case studies; Warren can restyle later if needed).
    console.error('  pandoc: markdown → ' + path.basename(outDocx));
    fs.mkdirSync(path.dirname(outDocx), { recursive: true });
    runPandoc(['-f', 'markdown', '-o', outDocx, trMd]);
    console.error('  wrote ' + outDocx + '  (in=' + usageIn + ', out=' + usageOut + ' tokens)');
  } finally {
    // Best-effort cleanup — leaving artifacts in os.tmpdir isn't a problem.
    try { fs.rmSync(scratch, { recursive: true, force: true }); } catch (_) {}
  }
}

// ── CLI ─────────────────────────────────────────────────────────
const [, , src, lang, out] = process.argv;
if (!src || !lang || !out) {
  console.error('usage: node translate_case.cjs <in.docx> <lang> <out.docx>');
  console.error('  langs: ' + Object.keys(LANG_NAMES).join(' '));
  process.exit(1);
}
translateCase(src, lang, out).catch(err => {
  console.error('ERROR: ' + (err && err.stack || err));
  process.exit(1);
});
