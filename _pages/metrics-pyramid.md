---
layout: page
title: "Metrics pyramid tool"
permalink: /metrics-pyramid/
date: 2026-08-11
---

{% raw %}
<p>Prioritize a set of performance metrics into a four-level pyramid — most important at the top, least important at the bottom. Type metrics on the left (one per line), then drag each chip into a tier. Drag between tiers to re-order, or back to <em>Unassigned</em> to remove. Your work saves in the browser automatically. Print for handouts, or share as a URL.</p>

<div class="fp-toolbar">
  <button type="button" id="fp-clear">Clear pyramid</button>
  <button type="button" id="fp-reset">Reset all</button>
  <button type="button" id="fp-share">Copy share URL</button>
  <button type="button" id="fp-print">Print</button>
  <span id="fp-status" class="fp-status" role="status"></span>
</div>

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

  .fp-grid {
    display: grid;
    grid-template-columns: minmax(240px, 1fr) minmax(340px, 2fr);
    gap: 24px;
    align-items: start;
  }
  @media (max-width: 800px) {
    .fp-grid { grid-template-columns: 1fr; }
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
  const STORAGE_KEY = 'framing_pyramid_v1';
  const URL_PARAM = 'p';

  // State: metrics is an ordered list of strings (source-of-truth
  // from the textarea); assignments maps each metric → tier 1-4.
  // Missing entry or 0 means the metric is Unassigned.
  let state = { metrics: [], assignments: {} };

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ── Persistence ─────────────────────────────────────────────
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { /* private mode / quota — ignore */ }
  }
  function load() {
    // URL param wins — someone shared a pyramid link.
    try {
      const enc = new URLSearchParams(window.location.search).get(URL_PARAM);
      if (enc) {
        const decoded = JSON.parse(atob(
          enc.replace(/-/g, '+').replace(/_/g, '/')
        ));
        if (decoded && Array.isArray(decoded.metrics) && decoded.assignments) {
          state = { metrics: decoded.metrics, assignments: decoded.assignments };
          return;
        }
      }
    } catch (_) { /* fall through to localStorage */ }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.metrics)) {
          state = {
            metrics: parsed.metrics,
            assignments: parsed.assignments || {},
          };
        }
      }
    } catch (_) { /* ignore */ }
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
    render();
    save();
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
      save();
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
    $('#fp-metrics-input').value = state.metrics.join('\n');
    $$('.fp-drop-zone').forEach(wireDropZone);
    $('#fp-metrics-input').addEventListener('input', syncMetricsFromTextarea);
    $('#fp-clear').addEventListener('click', () => {
      if (!confirm('Empty every tier? Chips return to Unassigned; the metric list is not touched.')) return;
      state.assignments = {};
      render(); save();
    });
    $('#fp-reset').addEventListener('click', () => {
      if (!confirm('Delete every metric and clear the pyramid? Cannot be undone.')) return;
      state = { metrics: [], assignments: {} };
      $('#fp-metrics-input').value = '';
      render(); save();
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
  });
})();
</script>
{% endraw %}
