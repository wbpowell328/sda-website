#!/usr/bin/env node
// Full-batch case-study translator for Bridging Vol I. Translates every
// .docx under /assets/cases/ into every configured language, writing to
// /assets/cases/<lang>/<same-name>.docx so Chapter 6's per-language links
// resolve.
//
// Usage:
//   node translate_cases_batch.cjs [--force] [--only=<lang>[,<lang>...]]
//     e.g. node translate_cases_batch.cjs --only=es
//          node translate_cases_batch.cjs --force
//
// Default : skip if the output already exists (idempotent — fills gaps).
// --force : re-translate everything.
//
// Prints a running summary and a final list of failures. Safe to re-run
// after a failure — successes are idempotent-skipped.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const LANG_NAMES = {
  es:      'Spanish',
  fr:      'French',
  de:      'German',
  'pt-BR': 'Brazilian Portuguese',
  zh:      'Simplified Chinese (zh-Hans)',
  ja:      'Japanese',
};
const LANGS = Object.keys(LANG_NAMES);

const REPO_ROOT = path.resolve(__dirname, '..');
const CASES_DIR = path.join(REPO_ROOT, 'assets', 'cases');

function listCases() {
  return fs.readdirSync(CASES_DIR)
    .filter(f => f.toLowerCase().endsWith('.docx'))
    .filter(f => !f.startsWith('~$'))   // Word lockfiles
    .sort();
}

function translateOne(caseFile, lang, opts) {
  const src = path.join(CASES_DIR, caseFile);
  const outDir = path.join(CASES_DIR, lang);
  const out = path.join(outDir, caseFile);
  if (fs.existsSync(out) && !opts.force) {
    console.error('[' + lang + '] SKIP (exists): ' + caseFile);
    return 'skipped';
  }
  console.error('[' + lang + '] TRANSLATE: ' + caseFile);
  const r = spawnSync('node', [
    path.join(__dirname, 'translate_case.cjs'),
    src, lang, out,
  ], { stdio: 'inherit', env: process.env });
  return r.status === 0 ? 'ok' : 'failed';
}

async function main() {
  const argv = process.argv.slice(2);
  const force = argv.includes('--force');
  let langs = LANGS;
  for (const a of argv) {
    const m = a.match(/^--only=(.+)$/);
    if (m) langs = m[1].split(',').filter(l => LANGS.indexOf(l) >= 0);
  }
  const opts = { force };

  const cases = listCases();
  console.error('CASES: ' + cases.length + ' file(s) × ' + langs.length + ' language(s)');

  const summary = { ok: 0, skipped: 0, failed: 0, failures: [] };
  for (const lang of langs) {
    console.error('════════════════════════════════════════════════════════');
    console.error('LANGUAGE: ' + lang + ' (' + LANG_NAMES[lang] + ')' + (force ? ' [--force]' : ''));
    console.error('════════════════════════════════════════════════════════');
    for (const c of cases) {
      const status = translateOne(c, lang, opts);
      summary[status]++;
      if (status === 'failed') summary.failures.push(lang + ':' + c);
    }
  }
  console.error('════════════════════════════════════════════════════════');
  console.error('SUMMARY: ok=' + summary.ok + ' skipped=' + summary.skipped + ' failed=' + summary.failed);
  if (summary.failures.length) {
    console.error('FAILURES:');
    for (const f of summary.failures) console.error('  - ' + f);
    console.error('Re-run this script to retry failed files (successes are idempotent-skipped).');
  }
  process.exit(summary.failed > 0 ? 1 : 0);
}

main().catch(err => { console.error(err); process.exit(1); });
