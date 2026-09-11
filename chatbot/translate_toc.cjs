#!/usr/bin/env node
// Translate a Jekyll TOC data file (e.g. _data/sdam_toc.yml or
// _data/bridging_vol1_toc.yml) into another language. Preserves structure
// and every `url:` value; rewrites urls from /<book>/… to /<book>/<lang>/…;
// translates titles + book_subtitle. Does NOT touch author or book_title
// (book keeps its published English title).
//
// Usage: node translate_toc.cjs <source.yml> <lang> <output.yml> [--book=<slug>]

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const client = new Anthropic();
const MODEL = process.env.TRANSLATE_MODEL || 'claude-sonnet-5';

const LANG_NAMES = {
  es: 'Spanish', fr: 'French', de: 'German',
  'pt-BR': 'Brazilian Portuguese', zh: 'Simplified Chinese', ja: 'Japanese',
};

const BOOKS = {
  sdam:            { urlPrefix: '/sdam/' },
  'bridging-vol1': { urlPrefix: '/bridging-vol1/' },
};
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

async function translateStrings(strings, lang) {
  const langName = LANG_NAMES[lang];
  const numbered = strings.map((s, i) => (i + 1) + '. ' + s).join('\n');
  const sys =
    'Translate each of the numbered English chapter/section titles into ' + langName + '. ' +
    'Return EXACTLY the same numbered list, one translation per line, no commentary. ' +
    'Keep proper nouns and product names in English. Do NOT translate the leading number.';
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: sys,
    messages: [{ role: 'user', content: numbered }],
  });
  const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n');
  // Parse "1. …" lines back out, in order
  const out = new Array(strings.length).fill('');
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*(\d+)\.\s*(.+?)\s*$/);
    if (m) {
      const idx = Number(m[1]) - 1;
      if (idx >= 0 && idx < strings.length) out[idx] = m[2];
    }
  }
  for (let i = 0; i < strings.length; i++) if (!out[i]) out[i] = strings[i];
  return out;
}

async function main() {
  const argv = process.argv.slice(2);
  let book = 'sdam';
  const positional = [];
  for (const a of argv) {
    const m = a.match(/^--book=(.+)$/);
    if (m) { book = m[1]; continue; }
    positional.push(a);
  }
  const [src, lang, outPath] = positional;
  if (!src || !lang || !outPath) {
    console.error('usage: node translate_toc.cjs <source.yml> <lang> <output.yml> [--book=<slug>]');
    process.exit(1);
  }
  if (!BOOKS[book]) {
    console.error('Unknown book: ' + book + '. Known: ' + Object.keys(BOOKS).join(', '));
    process.exit(1);
  }
  const bookCfg = BOOKS[book];
  const raw = fs.readFileSync(src, 'utf8');
  const lines = raw.split(/\r?\n/);

  // Collect every string we'll translate: book_subtitle + each chapter title.
  const stringsToTr = [];
  const stringSlots = [];   // { lineIdx, kind: 'subtitle'|'title' }
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const mSub = l.match(/^book_subtitle:\s*"?(.+?)"?\s*$/);
    if (mSub) { stringsToTr.push(mSub[1]); stringSlots.push({ lineIdx: i, kind: 'subtitle' }); continue; }
    const mTit = l.match(/^(\s*)title:\s*"?(.+?)"?\s*$/);
    if (mTit) { stringsToTr.push(mTit[2]); stringSlots.push({ lineIdx: i, kind: 'title', indent: mTit[1] }); continue; }
  }
  console.error('  translating ' + stringsToTr.length + ' string(s)...');
  const translated = await translateStrings(stringsToTr, lang);

  // Rewrite: URLs (/sdam/… → /sdam/<lang>/…) + substitute translated strings.
  for (let s = 0; s < stringSlots.length; s++) {
    const slot = stringSlots[s];
    const tr = translated[s];
    if (slot.kind === 'subtitle') {
      lines[slot.lineIdx] = 'book_subtitle: ' + JSON.stringify(tr);
    } else {
      lines[slot.lineIdx] = (slot.indent || '') + 'title: ' + JSON.stringify(tr);
    }
  }
  const urlRe = new RegExp(
    '^(\\s*url:\\s*)"(' + escapeRe(bookCfg.urlPrefix) + ')([^"]*)"\\s*$'
  );
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(urlRe);
    if (m) lines[i] = m[1] + '"' + bookCfg.urlPrefix + lang + '/' + m[3] + '"';
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
  console.error('  wrote ' + outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
