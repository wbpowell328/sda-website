---
layout: page
title: "Decision framing tools"
permalink: /metrics-pyramid/
date: 2026-08-11
---

{% raw %}
<p>Two companion tools for the framing process:</p>
<ol>
  <li><a href="#metrics-pyramid-tool"><strong>Metrics pyramid tool</strong></a> — prioritize your performance metrics into a four-level pyramid.</li>
  <li><a href="#decision-prioritization-tool"><strong>Decision prioritization tool</strong></a> — score each decision's impact on each pyramid-ordered metric (H / M / L / N), then reorder the decisions by their impact on the most important metrics.</li>
</ol>
<p>Everything runs client-side; your work saves in the browser automatically. The <em>File</em> menu below lets you keep multiple named documents, and each contains both the pyramid and the matrix.</p>

<div class="fp-toolbar">
  <details class="fp-menu" id="fp-file-menu">
    <summary>File ▾</summary>
    <div class="fp-menu-items">
      <button type="button" id="fp-menu-new">New pyramid</button>
      <button type="button" id="fp-menu-open">Open…</button>
      <button type="button" id="fp-menu-save">Save</button>
      <button type="button" id="fp-menu-saveas">Save as…</button>
    </div>
  </details>
  <span id="fp-current-file" class="fp-current-file" title="Currently loaded pyramid"></span>
  <span class="fp-toolbar-sep" aria-hidden="true"></span>
  <button type="button" id="fp-clear">Clear pyramid</button>
  <button type="button" id="fp-reset">Reset all</button>
  <button type="button" id="fp-share">Copy share URL</button>
  <button type="button" id="fp-print">Print</button>
  <span id="fp-status" class="fp-status" role="status"></span>
</div>

<!-- Open-pyramid modal — populated at click time from localStorage. -->
<div id="fp-open-modal" class="fp-modal" hidden>
  <div class="fp-modal-card" role="dialog" aria-modal="true" aria-labelledby="fp-modal-title">
    <div class="fp-modal-header">
      <h3 id="fp-modal-title">Open pyramid</h3>
      <button type="button" class="fp-modal-close" id="fp-modal-close" aria-label="Close">×</button>
    </div>
    <p class="fp-muted" style="margin: 0 0 8px 0;">Pyramids you've saved on this browser. Click one to load it.</p>
    <div id="fp-file-list" class="fp-file-list"></div>
    <div class="fp-modal-actions">
      <button type="button" id="fp-modal-cancel">Cancel</button>
    </div>
  </div>
</div>

<h2 id="metrics-pyramid-tool" class="fp-section-h2">Metrics pyramid tool</h2>
<p>Type performance metrics on the left (one per line), then drag each chip into a tier — most important at the top, least important at the bottom. Drag between tiers to re-order, or back to <em>Unassigned</em> to remove.</p>

<div class="fp-grid">
  <div class="fp-panel fp-metrics-panel">
    <h3>Metrics</h3>
    <p class="fp-muted">One per line. Chips appear below and can be dragged into the pyramid on the right.</p>
    <textarea id="fp-metrics-input" spellcheck="true" placeholder="Revenue growth&#10;Customer satisfaction&#10;Employee retention&#10;On-time delivery&#10;Product quality"></textarea>
    <div class="fp-unassigned-label">Unassigned <span class="fp-tier-hint">(drag into a tier)</span></div>
    <div class="fp-drop-zone fp-unassigned" data-tier="0"></div>
  </div>

  <div class="fp-panel fp-pyramid-panel">
    <h3>Priority pyramid</h3>
    <p class="fp-muted">Tier 1 = most important. Drop chips onto any tier; drag between tiers to re-order.</p>
    <div class="fp-pyramid">
      <div class="fp-tier fp-tier-1">
        <div class="fp-tier-label">Tier 1 <span class="fp-tier-hint">(most important)</span></div>
        <div class="fp-drop-zone" data-tier="1"></div>
      </div>
      <div class="fp-tier fp-tier-2">
        <div class="fp-tier-label">Tier 2</div>
        <div class="fp-drop-zone" data-tier="2"></div>
      </div>
      <div class="fp-tier fp-tier-3">
        <div class="fp-tier-label">Tier 3</div>
        <div class="fp-drop-zone" data-tier="3"></div>
      </div>
      <div class="fp-tier fp-tier-4">
        <div class="fp-tier-label">Tier 4 <span class="fp-tier-hint">(least important)</span></div>
        <div class="fp-drop-zone" data-tier="4"></div>
      </div>
    </div>
  </div>
</div>

<h2 id="decision-prioritization-tool" class="fp-section-h2">Decision prioritization tool</h2>
<p>List the decisions you'd consider (one per line). The matrix below has one column per <em>tier-assigned</em> metric from the pyramid above, ordered top-to-bottom by tier (left-to-right within the same tier by the order the metrics appear in the metrics list). Click any cell to cycle through <b>H</b> (high impact) → <b>M</b> → <b>L</b> → <b>N</b> (none) → blank. When you're done scoring, drag any row up or down via the <span class="fp-grip-inline">☰</span> handle to prioritize decisions by their impact on the most important metrics.</p>

<div class="fp-grid fp-grid-narrow">
  <div class="fp-panel fp-decisions-panel">
    <h3>Decisions</h3>
    <textarea id="fp-decisions-input" spellcheck="true" placeholder="Set the price&#10;Choose a supplier&#10;Approve the design&#10;Schedule production"></textarea>
  </div>
  <div class="fp-panel fp-matrix-panel">
    <h3>Impact matrix</h3>
    <p class="fp-muted">Columns follow the pyramid order. Rows can be dragged by their <span class="fp-grip-inline">☰</span> handle.</p>
    <div class="fp-matrix-wrapper">
      <div id="fp-matrix"></div>
    </div>
  </div>
</div>

<style>
  .fp-toolbar {
    display: flex; gap: 8px; margin: 16px 0; align-items: center; flex-wrap: wrap;
  }
  .fp-toolbar button {
    padding: 6px 14px; font-size: 0.9rem;
    background: #fff; border: 1px solid #c9b891; border-radius: 4px;
    cursor: pointer; color: #5a4a35;
  }
  .fp-toolbar button:hover { background: #faf5e6; }
  .fp-status { font-size: 0.85rem; color: #7a6a55; margin-left: 8px; min-height: 1em; }
  .fp-toolbar-sep {
    display: inline-block; width: 1px; height: 24px; background: #d9c99d;
    margin: 0 4px;
  }
  .fp-current-file {
    font-size: 0.85rem; color: #5a4a35; font-weight: 600;
    padding: 4px 10px; background: #faf5e6;
    border: 1px solid #c9b891; border-radius: 4px;
  }
  .fp-current-file:empty { display: none; }

  /* File dropdown menu (uses <details> for click-toggle) */
  .fp-menu {
    position: relative;
  }
  .fp-menu > summary {
    list-style: none; cursor: pointer;
    padding: 6px 14px; font-size: 0.9rem;
    background: #fff; border: 1px solid #c9b891; border-radius: 4px;
    color: #5a4a35;
    user-select: none;
  }
  .fp-menu > summary::-webkit-details-marker { display: none; }
  .fp-menu > summary:hover { background: #faf5e6; }
  .fp-menu[open] > summary { background: #faf5e6; }
  .fp-menu-items {
    position: absolute; top: 100%; left: 0; margin-top: 2px;
    min-width: 160px; z-index: 100;
    background: #fff; border: 1px solid #c9b891; border-radius: 4px;
    padding: 4px 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .fp-menu-items button {
    display: block; width: 100%; text-align: left;
    padding: 8px 14px; font-size: 0.9rem;
    background: none; border: none; cursor: pointer; color: #5a4a35;
    border-radius: 0;
  }
  .fp-menu-items button:hover { background: #faf5e6; }
  .fp-menu-items button:disabled {
    color: #b3a58a; cursor: not-allowed; background: none;
  }

  /* Open-pyramid modal */
  .fp-modal {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
  }
  .fp-modal[hidden] { display: none; }
  .fp-modal-card {
    background: #fff; border-radius: 6px;
    padding: 20px;
    max-width: 520px; width: 90%; max-height: 80vh;
    display: flex; flex-direction: column;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }
  .fp-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px;
  }
  .fp-modal-header h3 { margin: 0; color: #5a4a35; }
  .fp-modal-close {
    background: none; border: none; font-size: 1.6rem;
    line-height: 1; padding: 0 8px; cursor: pointer;
    color: #7a6a55;
  }
  .fp-modal-close:hover { color: #c9621e; }
  .fp-file-list {
    flex: 1 1 auto;
    min-height: 60px; max-height: 50vh;
    overflow-y: auto;
    border: 1px solid #eae0c8; border-radius: 4px;
    background: #fdfaf1;
  }
  .fp-file-list:empty::before {
    content: 'No saved pyramids yet — use Save as… to create one.';
    display: block; padding: 16px; font-size: 0.9rem;
    color: #7a6a55; text-align: center; font-style: italic;
  }
  .fp-file-row {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px;
    border-bottom: 1px solid #eae0c8;
  }
  .fp-file-row:last-child { border-bottom: none; }
  .fp-file-row:hover { background: #faf5e6; }
  .fp-file-name {
    flex: 1 1 auto; min-width: 0;
    font-size: 0.95rem; color: #5a4a35; font-weight: 600;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .fp-file-meta {
    font-size: 0.8rem; color: #7a6a55; font-weight: 400;
    margin-left: 6px;
  }
  .fp-file-row button {
    padding: 4px 10px; font-size: 0.85rem;
    background: #fff; border: 1px solid #c9b891; border-radius: 3px;
    cursor: pointer; color: #5a4a35;
  }
  .fp-file-row .fp-file-load:hover { background: #faf5e6; }
  .fp-file-row .fp-file-delete {
    color: #b91c1c; border-color: #f5c5c5;
  }
  .fp-file-row .fp-file-delete:hover { background: #fdeaea; }
  .fp-modal-actions {
    margin-top: 12px; display: flex; justify-content: flex-end; gap: 8px;
  }
  .fp-modal-actions button {
    padding: 6px 14px; font-size: 0.9rem;
    background: #fff; border: 1px solid #c9b891; border-radius: 4px;
    cursor: pointer; color: #5a4a35;
  }
  .fp-modal-actions button:hover { background: #faf5e6; }

  /* Section headings between the two tools */
  .fp-section-h2 {
    margin-top: 32px; padding-top: 12px;
    border-top: 2px solid #eae0c8;
    color: #5a4a35;
  }
  .fp-grip-inline {
    display: inline-block;
    padding: 0 4px;
    background: #faf5e6;
    border: 1px solid #c9b891;
    border-radius: 3px;
    font-size: 0.85em;
    color: #7a6a55;
  }

  /* Decisions textarea reuses the metrics textarea styling. */
  #fp-decisions-input {
    width: 100%; min-height: 180px;
    padding: 8px 10px;
    border: 1px solid #c9b891; border-radius: 4px;
    font-family: inherit; font-size: 0.95rem;
    resize: vertical;
    box-sizing: border-box;
    background: #fff;
    color: #333;
  }

  /* Impact matrix — table with clickable cells and draggable rows. */
  .fp-matrix-wrapper {
    overflow-x: auto;   /* wide matrices scroll horizontally */
    max-width: 100%;
    border: 1px solid #eae0c8;
    border-radius: 4px;
    background: #fdfaf1;
  }
  .fp-matrix-empty {
    padding: 20px; margin: 0;
    color: #7a6a55; font-style: italic; text-align: center;
    font-size: 0.9rem;
  }
  table.fp-matrix {
    border-collapse: collapse;
    background: #fff;
    font-size: 0.9rem;
  }
  table.fp-matrix th,
  table.fp-matrix td {
    border: 1px solid #eae0c8;
    padding: 6px 8px;
    vertical-align: middle;
  }
  table.fp-matrix thead th {
    background: #faf5e6;
    color: #5a4a35;
    font-weight: 600;
    font-size: 0.85rem;
    position: sticky; top: 0; z-index: 1;
  }
  .fp-matrix-decision-header { min-width: 140px; text-align: left; }
  .fp-matrix-metric-header {
    min-width: 60px; max-width: 100px;
    text-align: center;
    word-break: break-word;
    line-height: 1.15;
  }
  /* Tier bands on the header columns so the pyramid grouping is visible. */
  .fp-matrix-tier-1 { background: #eadfc0 !important; }
  .fp-matrix-tier-2 { background: #f0e6cd !important; }
  .fp-matrix-tier-3 { background: #f6eeda !important; }
  .fp-matrix-tier-4 { background: #fbf6e8 !important; }

  /* Cells — click to cycle H → M → L → N → empty */
  .fp-matrix-cell {
    text-align: center;
    cursor: pointer; user-select: none;
    font-weight: 700; font-size: 0.9rem;
    min-width: 44px; height: 34px;
    transition: filter 0.1s;
  }
  .fp-matrix-cell:hover { filter: brightness(0.95); }
  .fp-matrix-cell[data-value=""]  { background: #fff; color: #d4c8a8; }
  .fp-matrix-cell[data-value=""]::before { content: '–'; }
  .fp-matrix-cell[data-value="H"] { background: #dc2626; color: #fff; }
  .fp-matrix-cell[data-value="M"] { background: #f97316; color: #fff; }
  .fp-matrix-cell[data-value="L"] { background: #facc15; color: #333; }
  .fp-matrix-cell[data-value="N"] { background: #faf5e6; color: #7a6a55; }

  .fp-matrix-decision {
    font-weight: 600; color: #5a4a35;
    max-width: 260px;
    word-break: break-word;
  }

  /* Drag handle (grip) column */
  .fp-matrix-grip {
    text-align: center;
    color: #7a6a55;
    cursor: grab;
    user-select: none;
    width: 24px;
    background: #faf5e6;
    font-size: 1.1rem;
  }
  .fp-matrix-grip:active { cursor: grabbing; }
  tr.fp-matrix-dragging { opacity: 0.4; }
  tr.fp-matrix-drop-above > td { box-shadow: inset 0 3px 0 0 #c9621e; }
  tr.fp-matrix-drop-below > td { box-shadow: inset 0 -3px 0 0 #c9621e; }

  @media print {
    /* Keep the matrix on the printed page — it's a deliverable too. */
    .fp-matrix-grip { display: none; }
    .fp-decisions-panel { display: none !important; }
  }

  .fp-grid {
    display: grid;
    grid-template-columns: minmax(240px, 1fr) minmax(340px, 2fr);
    gap: 24px;
    align-items: start;
  }
  /* Decisions/matrix grid: give the matrix more room than the pyramid
     grid does — decisions column is a compact ~25% of the panel width
     so the matrix can breathe. */
  .fp-grid-narrow {
    grid-template-columns: minmax(180px, 1fr) minmax(380px, 3fr);
  }
  @media (max-width: 800px) {
    .fp-grid,
    .fp-grid-narrow { grid-template-columns: 1fr; }
  }

  .fp-panel h3 { margin: 0 0 4px 0; color: #5a4a35; }
  .fp-muted { color: #7a6a55; font-size: 0.9rem; margin: 0 0 8px 0; }

  #fp-metrics-input {
    width: 100%; min-height: 180px;
    padding: 8px 10px;
    border: 1px solid #c9b891; border-radius: 4px;
    font-family: inherit; font-size: 0.95rem;
    resize: vertical;
    box-sizing: border-box;
    background: #fff;
    color: #333;
  }

  .fp-unassigned-label {
    margin: 14px 0 4px 0; font-weight: 600; font-size: 0.9rem; color: #5a4a35;
  }

  .fp-drop-zone {
    min-height: 48px;
    padding: 8px;
    border: 2px dashed #c9b891; border-radius: 6px;
    background: #faf5e6;
    display: flex; flex-wrap: wrap; gap: 6px;
    align-content: flex-start;
    transition: background 0.15s, border-color 0.15s;
  }
  .fp-drop-zone.fp-drag-over {
    background: #f5e5b5; border-color: #c9621e;
  }
  .fp-drop-zone:empty::before {
    content: '(drop chips here)';
    color: #b3a58a; font-size: 0.85rem; font-style: italic;
    padding: 4px;
  }

  .fp-pyramid {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    padding-top: 4px;
  }
  .fp-tier { display: flex; flex-direction: column; align-items: stretch; }
  .fp-tier-1 { width: 40%; }
  .fp-tier-2 { width: 60%; }
  .fp-tier-3 { width: 80%; }
  .fp-tier-4 { width: 100%; }
  @media (max-width: 500px) {
    .fp-tier-1, .fp-tier-2, .fp-tier-3, .fp-tier-4 { width: 100%; }
  }
  .fp-tier-label {
    font-size: 0.9rem; font-weight: 600; color: #5a4a35;
    margin-bottom: 4px; text-align: center;
  }
  .fp-tier-hint { font-weight: 400; color: #7a6a55; font-size: 0.85em; }
  .fp-tier .fp-drop-zone {
    justify-content: center;
  }

  .fp-chip {
    display: inline-flex; align-items: center;
    padding: 6px 12px;
    background: #fff; border: 1px solid #c9b891; border-radius: 20px;
    font-size: 0.9rem; color: #5a4a35;
    cursor: grab;
    user-select: none;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    max-width: 100%;
    word-break: break-word;
    text-align: center;
  }
  .fp-chip:hover { background: #faf5e6; }
  .fp-chip.fp-dragging { opacity: 0.4; cursor: grabbing; }

  @media print {
    .fp-toolbar, .fp-metrics-panel, .fp-muted { display: none !important; }
    .fp-drop-zone:empty::before { display: none; }
    .fp-grid { grid-template-columns: 1fr; }
    .fp-pyramid { max-width: 6in; margin: 0 auto; }
    .fp-drop-zone { border: 1px solid #999; background: transparent; }
    .fp-chip { border-color: #333; box-shadow: none; }
  }
</style>

<script>
(function () {
  const STORAGE_KEY = 'framing_pyramid_v1';       // "working" (autosave) state
  const FILES_KEY   = 'framing_pyramid_files_v1'; // named-file dictionary
  const CURRENT_KEY = 'framing_pyramid_current_v1'; // which named file is loaded
  const URL_PARAM = 'p';

  // State — a single "framing document" bundles the pyramid AND
  // the decision matrix so File > Save keeps them together.
  //   metrics      : ordered list of metric strings (source-of-truth
  //                  from the metrics textarea).
  //   assignments  : metric → tier 1-4 (missing/0 = Unassigned).
  //   decisions    : ordered list of decision strings; order is the
  //                  matrix row order, updated by both the textarea
  //                  and drag-to-reorder inside the matrix.
  //   matrix       : { decision: { metric: 'H'|'M'|'L'|'N' } } —
  //                  missing = blank (not yet scored).
  let state = {
    metrics: [], assignments: {},
    decisions: [], matrix: {},
  };
  let currentName = null;   // which named file, if any, is currently loaded

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ── Persistence — autosaved working state ───────────────────
  function autoSave() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { /* private mode / quota — ignore */ }
  }
  // Fill in any missing fields on a partial state blob (URL-shared
  // links or files saved before the decisions/matrix existed).
  function normalizeState(s) {
    return {
      metrics:     Array.isArray(s && s.metrics)     ? s.metrics     : [],
      assignments: (s && s.assignments)              ? s.assignments : {},
      decisions:   Array.isArray(s && s.decisions)   ? s.decisions   : [],
      matrix:      (s && s.matrix)                   ? s.matrix      : {},
    };
  }
  function load() {
    // URL param wins — someone shared a link.
    try {
      const enc = new URLSearchParams(window.location.search).get(URL_PARAM);
      if (enc) {
        const decoded = JSON.parse(atob(
          enc.replace(/-/g, '+').replace(/_/g, '/')
        ));
        if (decoded && Array.isArray(decoded.metrics)) {
          state = normalizeState(decoded);
          return;
        }
      }
    } catch (_) { /* fall through to localStorage */ }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.metrics)) {
          state = normalizeState(parsed);
        }
      }
    } catch (_) { /* ignore */ }
    try {
      const cur = localStorage.getItem(CURRENT_KEY);
      if (cur) currentName = cur;
    } catch (_) { /* ignore */ }
  }

  // ── Persistence — named-file dictionary ─────────────────────
  function readFiles() {
    try {
      const raw = localStorage.getItem(FILES_KEY);
      return raw ? (JSON.parse(raw) || {}) : {};
    } catch (_) { return {}; }
  }
  function writeFiles(files) {
    try { localStorage.setItem(FILES_KEY, JSON.stringify(files)); }
    catch (_) { /* ignore */ }
  }
  function setCurrentName(name) {
    currentName = name || null;
    try {
      if (currentName) localStorage.setItem(CURRENT_KEY, currentName);
      else localStorage.removeItem(CURRENT_KEY);
    } catch (_) { /* ignore */ }
    renderCurrentFileLabel();
  }
  function renderCurrentFileLabel() {
    const el = $('#fp-current-file');
    if (!el) return;
    el.textContent = currentName ? 'Current: ' + currentName : '';
  }
  function snapshotForSave() {
    return {
      metrics: state.metrics,
      assignments: state.assignments,
      decisions: state.decisions,
      matrix: state.matrix,
      savedAt: new Date().toISOString(),
    };
  }
  function saveFile() {
    if (!currentName) return saveAsFile();   // no current name → prompt
    const files = readFiles();
    files[currentName] = snapshotForSave();
    writeFiles(files);
    flashStatus('Saved to "' + currentName + '".');
  }
  function saveAsFile() {
    const suggested = currentName || '';
    const raw = window.prompt('Save this pyramid as:', suggested);
    if (raw == null) return;
    const name = raw.trim();
    if (!name) return;
    const files = readFiles();
    if (files[name] && !window.confirm('"' + name + '" already exists. Overwrite it?')) return;
    files[name] = snapshotForSave();
    writeFiles(files);
    setCurrentName(name);
    flashStatus('Saved as "' + name + '".');
  }
  function loadFile(name) {
    const files = readFiles();
    const file = files[name];
    if (!file) return;
    state = normalizeState(file);
    setCurrentName(name);
    $('#fp-metrics-input').value = state.metrics.join('\n');
    $('#fp-decisions-input').value = state.decisions.join('\n');
    render();
    renderMatrix();
    autoSave();
    flashStatus('Loaded "' + name + '".');
  }
  function deleteFile(name) {
    const files = readFiles();
    if (!files[name]) return;
    delete files[name];
    writeFiles(files);
    if (currentName === name) setCurrentName(null);
    flashStatus('Deleted "' + name + '".');
  }
  function listFiles() {
    const files = readFiles();
    return Object.keys(files)
      .map(name => ({ name, savedAt: files[name].savedAt || null }))
      .sort((a, b) => (b.savedAt || '').localeCompare(a.savedAt || ''));
  }

  // ── Open modal ──────────────────────────────────────────────
  function fmtSavedAt(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2, '0');
      const mi = String(d.getMinutes()).padStart(2, '0');
      return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi;
    } catch (_) { return ''; }
  }
  function renderFileList() {
    const list = $('#fp-file-list');
    if (!list) return;
    list.innerHTML = '';
    const entries = listFiles();
    for (const { name, savedAt } of entries) {
      const row = document.createElement('div');
      row.className = 'fp-file-row';
      const nameEl = document.createElement('span');
      nameEl.className = 'fp-file-name';
      nameEl.textContent = name;
      if (savedAt) {
        const meta = document.createElement('span');
        meta.className = 'fp-file-meta';
        meta.textContent = fmtSavedAt(savedAt);
        nameEl.appendChild(meta);
      }
      const loadBtn = document.createElement('button');
      loadBtn.type = 'button';
      loadBtn.className = 'fp-file-load';
      loadBtn.textContent = 'Load';
      loadBtn.addEventListener('click', () => {
        loadFile(name);
        closeOpenModal();
      });
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'fp-file-delete';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        if (!window.confirm('Delete pyramid "' + name + '"? Cannot be undone.')) return;
        deleteFile(name);
        renderFileList();
      });
      row.appendChild(nameEl);
      row.appendChild(loadBtn);
      row.appendChild(delBtn);
      list.appendChild(row);
    }
  }
  function openOpenModal() {
    renderFileList();
    const m = $('#fp-open-modal');
    if (m) m.hidden = false;
  }
  function closeOpenModal() {
    const m = $('#fp-open-modal');
    if (m) m.hidden = true;
  }

  // Close the File dropdown after any menu-item click.
  function closeFileMenu() {
    const m = $('#fp-file-menu');
    if (m) m.open = false;
  }

  // ── Textarea → metrics sync ─────────────────────────────────
  function parseTextareaToMetrics() {
    const raw = $('#fp-metrics-input').value;
    const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
    // Dedupe preserving first occurrence.
    const seen = new Set(); const out = [];
    for (const s of lines) if (!seen.has(s)) { seen.add(s); out.push(s); }
    return out;
  }
  function syncMetricsFromTextarea() {
    const newMetrics = parseTextareaToMetrics();
    // Keep assignments for metrics still in the list; drop the rest.
    const kept = {};
    for (const m of newMetrics) {
      if (state.assignments[m] != null) kept[m] = state.assignments[m];
    }
    state.metrics = newMetrics;
    state.assignments = kept;
    // Also prune matrix values referencing metrics that no longer exist
    // (leaves matrix values under still-present metrics untouched).
    const metricSet = new Set(newMetrics);
    for (const d of Object.keys(state.matrix)) {
      for (const m of Object.keys(state.matrix[d])) {
        if (!metricSet.has(m)) delete state.matrix[d][m];
      }
      if (Object.keys(state.matrix[d]).length === 0) delete state.matrix[d];
    }
    render();
    renderMatrix();   // metric columns may have changed
    autoSave();
  }

  // ── Render ──────────────────────────────────────────────────
  function makeChip(metric) {
    const chip = document.createElement('span');
    chip.className = 'fp-chip';
    chip.textContent = metric;
    chip.draggable = true;
    chip.dataset.metric = metric;
    chip.title = 'Drag me into a tier';
    chip.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', metric);
      e.dataTransfer.effectAllowed = 'move';
      chip.classList.add('fp-dragging');
    });
    chip.addEventListener('dragend', () => {
      chip.classList.remove('fp-dragging');
    });
    return chip;
  }
  function render() {
    $$('.fp-drop-zone').forEach(z => { z.innerHTML = ''; });
    for (const m of state.metrics) {
      const tier = Number(state.assignments[m]) || 0;
      const zone = document.querySelector('.fp-drop-zone[data-tier="' + tier + '"]');
      if (zone) zone.appendChild(makeChip(m));
    }
  }

  // ── Drag/drop wiring ────────────────────────────────────────
  function wireDropZone(zone) {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('fp-drag-over');
    });
    zone.addEventListener('dragleave', (e) => {
      // Only clear the highlight when leaving the zone itself, not
      // when moving between its children.
      if (!zone.contains(e.relatedTarget)) {
        zone.classList.remove('fp-drag-over');
      }
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('fp-drag-over');
      const metric = e.dataTransfer.getData('text/plain');
      if (!metric) return;
      const tier = Number(zone.dataset.tier) || 0;
      if (tier === 0) delete state.assignments[metric];
      else state.assignments[metric] = tier;
      render();
      renderMatrix();   // moving a metric in/out of a tier changes matrix columns
      autoSave();
    });
  }

  // ── Decisions textarea → decisions list sync ────────────────
  function parseDecisionsTextarea() {
    const raw = $('#fp-decisions-input').value;
    const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
    const seen = new Set(); const out = [];
    for (const s of lines) if (!seen.has(s)) { seen.add(s); out.push(s); }
    return out;
  }
  function syncDecisionsFromTextarea() {
    const newList = parseDecisionsTextarea();
    // Preserve matrix values only for decisions still in the list.
    const kept = {};
    for (const d of newList) if (state.matrix[d]) kept[d] = state.matrix[d];
    state.decisions = newList;
    state.matrix = kept;
    renderMatrix();
    autoSave();
  }

  // ── Matrix: columns come from the pyramid ───────────────────
  function orderedMetrics() {
    // Group by tier (1..4), preserve textarea order within each tier.
    // Skip metrics that haven't been dropped into a tier — the matrix
    // is about *prioritized* metrics.
    const byTier = { 1: [], 2: [], 3: [], 4: [] };
    for (const m of state.metrics) {
      const t = Number(state.assignments[m]) || 0;
      if (t >= 1 && t <= 4) byTier[t].push(m);
    }
    const out = [];
    for (const t of [1, 2, 3, 4]) {
      for (const m of byTier[t]) out.push({ metric: m, tier: t });
    }
    return out;
  }
  function renderMatrix() {
    const wrap = $('#fp-matrix');
    if (!wrap) return;
    const metrics = orderedMetrics();
    const decisions = state.decisions;
    if (metrics.length === 0 && decisions.length === 0) {
      wrap.innerHTML = '<p class="fp-matrix-empty">' +
        "Add metrics (and drag them into pyramid tiers) above, and list decisions on the left, to start scoring impact." +
        '</p>';
      return;
    }
    if (metrics.length === 0) {
      wrap.innerHTML = '<p class="fp-matrix-empty">' +
        "No tier-assigned metrics yet — drag some metric chips into the pyramid above and this matrix's columns will fill in." +
        '</p>';
      return;
    }
    if (decisions.length === 0) {
      wrap.innerHTML = '<p class="fp-matrix-empty">' +
        "Add decisions on the left to start scoring." +
        '</p>';
      return;
    }
    const table = document.createElement('table');
    table.className = 'fp-matrix';

    const thead = document.createElement('thead');
    const hr = document.createElement('tr');
    hr.appendChild(document.createElement('th'));  // grip column
    const dh = document.createElement('th');
    dh.className = 'fp-matrix-decision-header';
    dh.textContent = 'Decision';
    hr.appendChild(dh);
    for (const { metric, tier } of metrics) {
      const th = document.createElement('th');
      th.className = 'fp-matrix-metric-header fp-matrix-tier-' + tier;
      th.textContent = metric;
      th.title = 'Tier ' + tier;
      hr.appendChild(th);
    }
    thead.appendChild(hr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const d of decisions) {
      const tr = document.createElement('tr');
      tr.dataset.decision = d;

      const grip = document.createElement('td');
      grip.className = 'fp-matrix-grip';
      grip.textContent = '☰';
      grip.draggable = true;
      grip.title = 'Drag to reorder this row';
      tr.appendChild(grip);

      const nameTd = document.createElement('td');
      nameTd.className = 'fp-matrix-decision';
      nameTd.textContent = d;
      tr.appendChild(nameTd);

      for (const { metric } of metrics) {
        const cell = document.createElement('td');
        cell.className = 'fp-matrix-cell';
        const v = (state.matrix[d] && state.matrix[d][metric]) || '';
        cell.dataset.value = v;
        cell.title = 'Click to cycle: H → M → L → N → blank';
        cell.addEventListener('click', () => cycleCell(d, metric, cell));
        tr.appendChild(cell);
      }
      tbody.appendChild(tr);
      wireMatrixRowDrag(tr);
    }
    table.appendChild(tbody);

    wrap.innerHTML = '';
    wrap.appendChild(table);
  }
  function cycleCell(decision, metric, cell) {
    const order = ['', 'H', 'M', 'L', 'N'];
    const cur = (state.matrix[decision] && state.matrix[decision][metric]) || '';
    const idx = order.indexOf(cur);
    const next = order[(idx + 1) % order.length];
    if (!state.matrix[decision]) state.matrix[decision] = {};
    if (next === '') {
      delete state.matrix[decision][metric];
      if (Object.keys(state.matrix[decision]).length === 0) delete state.matrix[decision];
    } else {
      state.matrix[decision][metric] = next;
    }
    cell.dataset.value = next;
    autoSave();
  }

  // ── Matrix row drag-to-reorder ──────────────────────────────
  function clearMatrixDropIndicators() {
    $$('.fp-matrix tbody tr').forEach(r => {
      r.classList.remove('fp-matrix-drop-above', 'fp-matrix-drop-below');
    });
  }
  function wireMatrixRowDrag(row) {
    const grip = row.querySelector('.fp-matrix-grip');
    if (!grip) return;
    grip.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', row.dataset.decision);
      e.dataTransfer.effectAllowed = 'move';
      row.classList.add('fp-matrix-dragging');
    });
    grip.addEventListener('dragend', () => {
      row.classList.remove('fp-matrix-dragging');
      clearMatrixDropIndicators();
    });
    row.addEventListener('dragover', (e) => {
      // preventDefault is required so 'drop' fires.
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const rect = row.getBoundingClientRect();
      const above = (e.clientY - rect.top) < rect.height / 2;
      // Only touch this row's indicator; leave others as-is (dragleave
      // on a neighbour will clean up that one).
      row.classList.toggle('fp-matrix-drop-above', above);
      row.classList.toggle('fp-matrix-drop-below', !above);
    });
    row.addEventListener('dragleave', (e) => {
      if (!row.contains(e.relatedTarget)) {
        row.classList.remove('fp-matrix-drop-above', 'fp-matrix-drop-below');
      }
    });
    row.addEventListener('drop', (e) => {
      e.preventDefault();
      const src = e.dataTransfer.getData('text/plain');
      const above = row.classList.contains('fp-matrix-drop-above');
      clearMatrixDropIndicators();
      if (!src || src === row.dataset.decision) return;
      const list = state.decisions.slice();
      const srcIdx = list.indexOf(src);
      if (srcIdx < 0) return;
      list.splice(srcIdx, 1);
      let dstIdx = list.indexOf(row.dataset.decision);
      if (dstIdx < 0) return;
      if (!above) dstIdx += 1;
      list.splice(dstIdx, 0, src);
      state.decisions = list;
      // Keep the textarea in sync with the new row order so what
      // the user sees on the left matches the matrix.
      $('#fp-decisions-input').value = state.decisions.join('\n');
      renderMatrix();
      autoSave();
    });
  }

  // ── Share URL ───────────────────────────────────────────────
  function toShareUrl() {
    const enc = btoa(JSON.stringify(state))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const url = new URL(window.location.href);
    url.searchParams.set(URL_PARAM, enc);
    return url.toString();
  }
  function flashStatus(msg) {
    const el = $('#fp-status');
    if (!el) return;
    el.textContent = msg;
    clearTimeout(flashStatus._t);
    flashStatus._t = setTimeout(() => { el.textContent = ''; }, 2500);
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    load();
    $('#fp-metrics-input').value   = state.metrics.join('\n');
    $('#fp-decisions-input').value = state.decisions.join('\n');
    renderCurrentFileLabel();
    $$('.fp-drop-zone').forEach(wireDropZone);
    $('#fp-metrics-input').addEventListener('input',   syncMetricsFromTextarea);
    $('#fp-decisions-input').addEventListener('input', syncDecisionsFromTextarea);
    // File menu
    $('#fp-menu-new').addEventListener('click', () => {
      closeFileMenu();
      if (!confirm('Start a new document? Anything on screen is discarded (Save first if you want to keep it).')) return;
      state = { metrics: [], assignments: {}, decisions: [], matrix: {} };
      setCurrentName(null);
      $('#fp-metrics-input').value = '';
      $('#fp-decisions-input').value = '';
      render(); renderMatrix(); autoSave();
    });
    $('#fp-menu-open').addEventListener('click', () => {
      closeFileMenu();
      openOpenModal();
    });
    $('#fp-menu-save').addEventListener('click', () => {
      closeFileMenu();
      saveFile();
    });
    $('#fp-menu-saveas').addEventListener('click', () => {
      closeFileMenu();
      saveAsFile();
    });
    // Open-modal wiring
    $('#fp-modal-close').addEventListener('click', closeOpenModal);
    $('#fp-modal-cancel').addEventListener('click', closeOpenModal);
    $('#fp-open-modal').addEventListener('click', (e) => {
      // Click on the backdrop (not the card itself) closes the modal.
      if (e.target === $('#fp-open-modal')) closeOpenModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !$('#fp-open-modal').hidden) closeOpenModal();
    });
    // Close the File dropdown if the user clicks anywhere outside it.
    document.addEventListener('click', (e) => {
      const m = $('#fp-file-menu');
      if (m && m.open && !m.contains(e.target)) m.open = false;
    });
    $('#fp-clear').addEventListener('click', () => {
      if (!confirm('Empty every tier? Chips return to Unassigned; the metric list, decisions, and matrix scores are not touched.')) return;
      state.assignments = {};
      render(); renderMatrix(); autoSave();
    });
    $('#fp-reset').addEventListener('click', () => {
      if (!confirm('Delete every metric AND every decision, and clear the pyramid and the matrix? Cannot be undone.')) return;
      state = { metrics: [], assignments: {}, decisions: [], matrix: {} };
      $('#fp-metrics-input').value = '';
      $('#fp-decisions-input').value = '';
      render(); renderMatrix(); autoSave();
    });
    $('#fp-share').addEventListener('click', async () => {
      const url = toShareUrl();
      try {
        await navigator.clipboard.writeText(url);
        flashStatus('Share URL copied to clipboard.');
      } catch (_) {
        window.prompt('Copy this URL to share your pyramid:', url);
      }
    });
    $('#fp-print').addEventListener('click', () => window.print());
    render();
    renderMatrix();
  });
})();
</script>
{% endraw %}
