---
layout: framing-mobile
title: "Decision framing — mobile"
permalink: /decision-framing-tool-mobile/
noindex: true
---
{% raw %}
<style>
:root {
  --bg: #fbf6e7;
  --card: #fff;
  --ink: #3d2914;
  --ink-soft: #5a4a35;
  --muted: #7a6a55;
  --accent: #8a3a1a;
  --accent-hover: #6a2a10;
  --tan: #ede0bd;
  --tan-deep: #c9a86b;
  --line: #d6c4a3;
  --ok: #2e7a3a;
  --warn: #c9621e;
}
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body {
  margin: 0; padding: 0;
  background: var(--bg); color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px; line-height: 1.4;
  overscroll-behavior-y: contain;
}
html, body { height: 100%; }
body { display: flex; flex-direction: column; }

/* ── Header (fixed) ────────────────────────────────────── */
.mfa-topbar {
  background: #2b2419; color: #f5ecd6;
  padding: env(safe-area-inset-top) 0 0 0;
  border-bottom: 2px solid var(--accent);
  flex: 0 0 auto;
}
.mfa-topbar-inner {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
}
.mfa-brand {
  font-weight: 700; font-size: 0.95rem;
  color: #f5ecd6;
  flex: 1;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.mfa-menu-btn {
  background: transparent; border: 1px solid #6b5a3f;
  color: #f5ecd6; padding: 6px 10px; border-radius: 4px;
  font-size: 0.85rem; cursor: pointer;
  min-height: 36px;
}
.mfa-stepper {
  display: flex; padding: 0 6px 8px;
  gap: 4px;
}
.mfa-step-pill {
  flex: 1;
  height: 6px; border-radius: 3px;
  background: rgba(245,236,214,0.2);
  transition: background 200ms;
}
.mfa-step-pill.is-done   { background: rgba(245,236,214,0.55); }
.mfa-step-pill.is-current { background: var(--warn); }
.mfa-step-label {
  color: #d4b88a; font-size: 0.78rem;
  padding: 2px 12px 8px;
  text-align: center;
  letter-spacing: 0.03em;
}
.mfa-step-label .num { color: #f5ecd6; font-weight: 700; margin-right: 4px; }

/* ── Content area (scrollable) ────────────────────────── */
.mfa-content {
  flex: 1 1 auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 14px 96px;
}
.mfa-step { display: none; }
.mfa-step.is-active { display: block; }
.mfa-step h1 {
  margin: 0 0 6px 0;
  font-size: 1.3rem; line-height: 1.25;
  color: var(--ink);
}
.mfa-step .mfa-lede {
  margin: 0 0 18px 0; color: var(--muted);
  font-size: 0.92rem;
}

/* ── Fields ─────────────────────────────────────────── */
label.mfa-label {
  display: block;
  font-size: 0.85rem; font-weight: 600;
  color: var(--ink-soft);
  margin: 14px 0 4px;
}
.mfa-label .mfa-muted { font-weight: 400; color: var(--muted); font-size: 0.8rem; margin-left: 4px; }
input[type="text"].mfa-input,
input[type="url"].mfa-input,
textarea.mfa-input {
  width: 100%;
  font-family: inherit; font-size: 1rem;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--card);
  color: var(--ink);
  min-height: 44px;
}
textarea.mfa-input { min-height: 120px; resize: vertical; }
input:focus, textarea:focus, button:focus { outline: 2px solid var(--warn); outline-offset: 1px; }

/* ── Voice input row ────────────────────────────────── */
.mfa-voice-wrap { position: relative; }
.mfa-voice-btn {
  position: absolute; right: 10px; bottom: 10px;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--accent); color: #fff;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  display: flex; align-items: center; justify-content: center;
}
.mfa-voice-btn:disabled { background: var(--line); cursor: not-allowed; }
.mfa-voice-btn.is-recording { background: #c92525; animation: mfa-pulse 1.2s ease-in-out infinite; }
@keyframes mfa-pulse {
  0%, 100% { box-shadow: 0 2px 6px rgba(201,37,37,0.4); }
  50%      { box-shadow: 0 2px 20px rgba(201,37,37,0.9); }
}
.mfa-voice-hint {
  font-size: 0.78rem; color: var(--muted);
  margin: 4px 12px 0 0;
}

/* ── Buttons ────────────────────────────────────────── */
.mfa-btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: inherit; font-size: 1rem; font-weight: 500;
  padding: 12px 18px; min-height: 48px;
  border-radius: 6px; cursor: pointer;
  transition: background 120ms, border 120ms;
}
.mfa-btn-primary {
  background: var(--accent); color: #fff; border: 1px solid var(--accent-hover);
}
.mfa-btn-primary:hover:not(:disabled) { background: var(--accent-hover); }
.mfa-btn-secondary {
  background: var(--card); color: var(--ink); border: 1px solid var(--line);
}
.mfa-btn-secondary:hover:not(:disabled) { background: var(--tan); }
.mfa-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.mfa-btn-block { display: flex; width: 100%; }

/* ── Chip lists ────────────────────────────────────── */
.mfa-item-list {
  list-style: none; padding: 0; margin: 8px 0 0;
  display: flex; flex-direction: column; gap: 6px;
}
.mfa-item {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px 10px 12px 14px;
  display: flex; align-items: center; gap: 6px;
}
.mfa-item-name { flex: 1; font-size: 0.98rem; overflow-wrap: anywhere; }
.mfa-tier {
  min-width: 32px; text-align: center;
  padding: 4px 8px; border-radius: 4px;
  font-weight: 700; font-size: 0.85rem; color: #fff;
  border: none; cursor: pointer;
  background: var(--tan-deep);
}
.mfa-tier[data-tier="H"] { background: #8a3a1a; }
.mfa-tier[data-tier="M"] { background: #c9621e; }
.mfa-tier[data-tier="L"] { background: #d6a06b; color: var(--ink); }
.mfa-tier[data-tier=""], .mfa-tier[data-tier="N"] { background: #e8e0d0; color: var(--muted); }
.mfa-arrow-btn, .mfa-x-btn {
  background: transparent; border: none; color: var(--muted);
  font-size: 1.1rem; padding: 6px 8px; cursor: pointer;
  min-width: 36px; min-height: 36px;
  display: inline-flex; align-items: center; justify-content: center;
}
.mfa-arrow-btn:hover, .mfa-x-btn:hover { color: var(--accent); }
.mfa-x-btn:hover { color: #c92525; }

.mfa-item-expand {
  border: none; background: transparent;
  color: var(--accent); font-size: 1.2rem;
  min-width: 36px; min-height: 36px; cursor: pointer;
}
.mfa-item-drawer {
  background: var(--tan); border-radius: 0 0 8px 8px;
  padding: 8px 12px 12px;
  margin-top: -4px;
  border: 1px solid var(--line); border-top: none;
}
.mfa-item-drawer[hidden] { display: none; }
.mfa-drawer-row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 0;
  border-bottom: 1px dashed var(--line);
  font-size: 0.9rem;
}
.mfa-drawer-row:last-child { border-bottom: none; }
.mfa-drawer-row .mfa-drawer-metric { flex: 1; color: var(--ink-soft); }
.mfa-hml-group {
  display: inline-flex; gap: 2px;
  border: 1px solid var(--line); border-radius: 4px; overflow: hidden;
}
.mfa-hml-btn {
  border: none; background: var(--card); color: var(--muted);
  min-width: 32px; min-height: 32px; font-weight: 700; cursor: pointer;
  padding: 4px 8px; font-size: 0.85rem;
}
.mfa-hml-btn.is-active[data-tier="H"] { background: #8a3a1a; color: #fff; }
.mfa-hml-btn.is-active[data-tier="M"] { background: #c9621e; color: #fff; }
.mfa-hml-btn.is-active[data-tier="L"] { background: #d6a06b; color: var(--ink); }

/* ── Add row (input + button) ─────────────────────── */
.mfa-add-row {
  display: flex; gap: 6px; margin-top: 8px;
}
.mfa-add-row input {
  flex: 1;
}
.mfa-add-row button {
  padding: 0 18px; min-height: 44px;
}

/* ── Suggest / status ─────────────────────────────── */
.mfa-suggest-row {
  margin-top: 12px;
  display: flex; gap: 6px; flex-wrap: wrap;
}
.mfa-status {
  margin-top: 10px;
  font-size: 0.88rem;
  color: var(--muted);
  min-height: 1.2em;
}
.mfa-status.is-err { color: #a72020; }

/* ── Suggest modal ────────────────────────────────── */
.mfa-modal {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: flex-end;
  z-index: 100;
  padding: env(safe-area-inset-top) 0 0;
}
.mfa-modal[hidden] { display: none; }
.mfa-modal-card {
  background: var(--card);
  width: 100%; max-height: 85vh;
  border-radius: 12px 12px 0 0;
  display: flex; flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom);
}
.mfa-modal-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between;
}
.mfa-modal-header h3 { margin: 0; font-size: 1.05rem; color: var(--ink); }
.mfa-modal-close {
  background: transparent; border: none; color: var(--ink-soft);
  font-size: 1.4rem; cursor: pointer; padding: 4px 8px;
  min-width: 40px; min-height: 40px;
}
.mfa-modal-body {
  flex: 1; overflow-y: auto; padding: 12px 16px;
}
.mfa-modal-actions {
  padding: 12px 16px;
  border-top: 1px solid var(--line);
  display: flex; gap: 8px;
}
.mfa-modal-actions .mfa-btn { flex: 1; }
.mfa-suggest-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 4px;
  border-bottom: 1px solid var(--tan);
  font-size: 0.95rem;
}
.mfa-suggest-item:last-child { border-bottom: none; }
.mfa-suggest-item input[type="checkbox"] { width: 22px; height: 22px; }
.mfa-suggest-item label { flex: 1; cursor: pointer; }

/* ── Footer nav (fixed) ───────────────────────────── */
.mfa-nav {
  position: fixed; left: 0; right: 0; bottom: 0;
  background: var(--card);
  border-top: 1px solid var(--line);
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
  display: flex; gap: 8px;
  z-index: 50;
}
.mfa-nav .mfa-btn { flex: 1; }

/* ── Review step ──────────────────────────────────── */
.mfa-review-block {
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}
.mfa-review-block h3 {
  font-size: 0.95rem; margin: 0 0 6px 0; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.04em;
}
.mfa-review-block .mfa-review-empty { color: var(--muted); font-style: italic; }
.mfa-review-list { padding-left: 18px; margin: 4px 0; }
.mfa-review-list li { margin: 2px 0; }

.mfa-share-line {
  margin: 12px 0;
  display: flex; gap: 6px; align-items: center;
}
.mfa-share-line input {
  flex: 1; font-family: ui-monospace, Menlo, monospace; font-size: 0.85rem;
  padding: 8px 10px; border: 1px solid var(--line); border-radius: 4px;
  background: var(--tan);
}
.mfa-share-copy {
  min-height: 40px; padding: 0 14px;
}
.mfa-qr-wrap {
  display: flex; justify-content: center;
  margin: 16px 0;
}
.mfa-qr-wrap canvas { max-width: 240px; }

.mfa-escape {
  display: block; text-align: center;
  margin: 20px 0 8px;
  color: var(--muted);
  font-size: 0.85rem;
  text-decoration: underline;
}

/* ── Small screens fine-tuning ────────────────────── */
@media (max-width: 380px) {
  .mfa-step h1 { font-size: 1.15rem; }
  .mfa-content { padding: 12px 10px 96px; }
}
</style>

<div class="mfa-topbar">
  <div class="mfa-topbar-inner">
    <div class="mfa-brand" id="mfa-brand">Decision Framing</div>
    <button type="button" class="mfa-menu-btn" id="mfa-menu-btn" aria-label="Menu">☰</button>
  </div>
  <div class="mfa-stepper" role="tablist">
    <div class="mfa-step-pill" data-step="0"></div>
    <div class="mfa-step-pill" data-step="1"></div>
    <div class="mfa-step-pill" data-step="2"></div>
    <div class="mfa-step-pill" data-step="3"></div>
    <div class="mfa-step-pill" data-step="4"></div>
  </div>
  <div class="mfa-step-label" id="mfa-step-label"><span class="num">1</span>Frame</div>
</div>

<main class="mfa-content" id="mfa-content">

  <!-- ── Step 1: Frame ── -->
  <section class="mfa-step" data-step="0" id="mfa-step-frame">
    <h1>Frame the problem</h1>

    <label class="mfa-label" for="mfa-role">Decision maker</label>
    <input type="text" class="mfa-input" id="mfa-role" placeholder="e.g. Regional sales manager, weekly cycle" autocomplete="off">

    <label class="mfa-label" for="mfa-desc">Problem</label>
    <div class="mfa-voice-wrap">
      <textarea class="mfa-input" id="mfa-desc" rows="6" placeholder="What's the decision? Why does it matter? What's uncertain?"></textarea>
      <button type="button" class="mfa-voice-btn" id="mfa-voice-btn" aria-label="Tap to speak">🎤</button>
    </div>
    <p class="mfa-voice-hint" id="mfa-voice-hint" hidden></p>

    <label class="mfa-label" for="mfa-url">URL <span class="mfa-muted">(optional)</span></label>
    <input type="url" class="mfa-input" id="mfa-url" placeholder="https://..." autocomplete="off">
  </section>

  <!-- ── Step 2: Metrics ── -->
  <section class="mfa-step" data-step="1" id="mfa-step-metrics">
    <h1>Metrics</h1>
    <ul class="mfa-item-list" id="mfa-metrics-list"></ul>
    <div class="mfa-add-row">
      <input type="text" class="mfa-input" id="mfa-metric-new" placeholder="Add a metric" autocomplete="off">
      <button type="button" class="mfa-btn mfa-btn-primary" id="mfa-metric-add">+ Add</button>
    </div>
    <div class="mfa-suggest-row">
      <button type="button" class="mfa-btn mfa-btn-secondary" id="mfa-metric-suggest">✦ Suggest</button>
    </div>
    <div class="mfa-status" id="mfa-metric-status"></div>
  </section>

  <!-- ── Step 3: Decisions ── -->
  <section class="mfa-step" data-step="2" id="mfa-step-decisions">
    <h1>Decisions</h1>
    <ul class="mfa-item-list" id="mfa-decisions-list"></ul>
    <div class="mfa-add-row">
      <input type="text" class="mfa-input" id="mfa-decision-new" placeholder="Add a decision" autocomplete="off">
      <button type="button" class="mfa-btn mfa-btn-primary" id="mfa-decision-add">+ Add</button>
    </div>
    <div class="mfa-suggest-row">
      <button type="button" class="mfa-btn mfa-btn-secondary" id="mfa-decision-suggest">✦ Suggest</button>
      <button type="button" class="mfa-btn mfa-btn-secondary" id="mfa-decision-suggest-impact">✦ Score impact</button>
    </div>
    <div class="mfa-status" id="mfa-decision-status"></div>
  </section>

  <!-- ── Step 4: Uncertainties ── -->
  <section class="mfa-step" data-step="3" id="mfa-step-uncertainties">
    <h1>Uncertainties</h1>
    <ul class="mfa-item-list" id="mfa-uncerts-list"></ul>
    <div class="mfa-add-row">
      <input type="text" class="mfa-input" id="mfa-uncert-new" placeholder="Add an uncertainty" autocomplete="off">
      <button type="button" class="mfa-btn mfa-btn-primary" id="mfa-uncert-add">+ Add</button>
    </div>
    <div class="mfa-suggest-row">
      <button type="button" class="mfa-btn mfa-btn-secondary" id="mfa-uncert-suggest">✦ Suggest</button>
    </div>
    <div class="mfa-status" id="mfa-uncert-status"></div>
  </section>

  <!-- ── Step 5: Review & Share ── -->
  <section class="mfa-step" data-step="4" id="mfa-step-review">
    <h1>Review</h1>

    <div class="mfa-review-block">
      <h3>Scope</h3>
      <div id="mfa-review-scope" class="mfa-review-empty">No scope yet.</div>
    </div>
    <div class="mfa-review-block">
      <h3>Metrics</h3>
      <div id="mfa-review-metrics" class="mfa-review-empty">No metrics yet.</div>
    </div>
    <div class="mfa-review-block">
      <h3>Decisions</h3>
      <div id="mfa-review-decisions" class="mfa-review-empty">No decisions yet.</div>
    </div>
    <div class="mfa-review-block">
      <h3>Uncertainties</h3>
      <div id="mfa-review-uncerts" class="mfa-review-empty">No uncertainties yet.</div>
    </div>

    <button type="button" class="mfa-btn mfa-btn-primary mfa-btn-block" id="mfa-save-btn">Save to my library</button>
    <div class="mfa-status" id="mfa-save-status"></div>

    <div id="mfa-share-block" hidden>
      <label class="mfa-label">Read-only link</label>
      <div class="mfa-share-line">
        <input type="text" id="mfa-share-url" readonly>
        <button type="button" class="mfa-btn mfa-btn-secondary mfa-share-copy" id="mfa-share-copy">Copy</button>
      </div>
      <div class="mfa-qr-wrap" id="mfa-qr-wrap" hidden></div>
    </div>

    <a href="/decision-framing-tool/?forceDesktop=1" class="mfa-escape">Switch to desktop view →</a>
  </section>

</main>

<!-- ── Suggest modal (single instance, reused) ── -->
<div class="mfa-modal" id="mfa-suggest-modal" hidden>
  <div class="mfa-modal-card">
    <div class="mfa-modal-header">
      <h3 id="mfa-suggest-title">Suggestions</h3>
      <button type="button" class="mfa-modal-close" id="mfa-suggest-close" aria-label="Close">×</button>
    </div>
    <div class="mfa-modal-body" id="mfa-suggest-body"></div>
    <div class="mfa-modal-actions">
      <button type="button" class="mfa-btn mfa-btn-secondary" id="mfa-suggest-cancel">Cancel</button>
      <button type="button" class="mfa-btn mfa-btn-primary" id="mfa-suggest-add">Add checked</button>
    </div>
  </div>
</div>

<!-- ── Menu modal (Open / Save / New) ── -->
<div class="mfa-modal" id="mfa-menu-modal" hidden>
  <div class="mfa-modal-card">
    <div class="mfa-modal-header">
      <h3>Menu</h3>
      <button type="button" class="mfa-modal-close" id="mfa-menu-close" aria-label="Close">×</button>
    </div>
    <div class="mfa-modal-body">
      <button type="button" class="mfa-btn mfa-btn-secondary mfa-btn-block" id="mfa-menu-open" style="margin-bottom:8px;">Open from my library</button>
      <button type="button" class="mfa-btn mfa-btn-secondary mfa-btn-block" id="mfa-menu-new" style="margin-bottom:8px;">New framing (start over)</button>
      <button type="button" class="mfa-btn mfa-btn-secondary mfa-btn-block" id="mfa-menu-save" style="margin-bottom:8px;">Save changes to server</button>
      <a href="/decision-framing-tool/?forceDesktop=1" class="mfa-btn mfa-btn-secondary mfa-btn-block" style="text-decoration:none;">Open on desktop for full features</a>
    </div>
  </div>
</div>

<!-- ── Library modal — lists framings so a returning user can reopen one ── -->
<div class="mfa-modal" id="mfa-library-modal" hidden>
  <div class="mfa-modal-card">
    <div class="mfa-modal-header">
      <h3 id="mfa-library-title">My library</h3>
      <button type="button" class="mfa-modal-close" id="mfa-library-close" aria-label="Close">×</button>
    </div>
    <div class="mfa-modal-body" id="mfa-library-body">
      <p class="mfa-status" id="mfa-library-status" style="margin:0 0 8px 0;">Loading…</p>
      <ul class="mfa-item-list" id="mfa-library-list"></ul>
    </div>
    <div class="mfa-modal-actions">
      <button type="button" class="mfa-btn mfa-btn-secondary" id="mfa-library-refresh">Refresh</button>
    </div>
  </div>
</div>

<nav class="mfa-nav">
  <button type="button" class="mfa-btn mfa-btn-secondary" id="mfa-back-btn">← Back</button>
  <button type="button" class="mfa-btn mfa-btn-primary" id="mfa-next-btn">Next →</button>
</nav>

<script>
(function () {
  'use strict';

  // ── Config ─────────────────────────────────────────
  const CHATBOT_BASE = (function () {
    const h = window.location.hostname;
    if (h === 'localhost' || h === '127.0.0.1') return 'http://localhost:3000';
    try {
      const beta = new URLSearchParams(window.location.search).get('backend') === 'beta';
      if (beta) return 'https://castle-chatbot-beta.onrender.com';
    } catch (_) {}
    return 'https://castle-chatbot.onrender.com';
  })();
  const NODES_BASE = CHATBOT_BASE + '/api/framing-nodes';
  const STORAGE_KEY   = 'mfa-state-v1';
  const LIBRARY_KEY   = 'mfa-my-library-v1';   // { readId, writeToken, name }
  const PUBLISHED_KEY = 'mfa-published-v1';    // { <readId>: { writeToken, framingId, name } }

  const STEP_LABELS = ['Frame', 'Metrics', 'Decisions', 'Uncertainties', 'Review'];
  const STEP_COUNT = 5;
  const TIER_CYCLE = ['H', 'M', 'L', ''];
  const CELL_CYCLE = ['', 'H', 'M', 'L', 'N'];

  // ── State ──────────────────────────────────────────
  let state = defaultState();
  let step = 0;
  let currentFramingId = null;      // set once first save happens; used for in-place PUT
  let recognition = null;           // Web Speech API instance (lazy)

  function defaultState() {
    return {
      title: '',
      scope: '',
      description: '',
      problemDescription: '',
      problemUrl: '',
      problemNotes: '',
      metrics: [],
      assignments: {},             // metric -> 'H'|'M'|'L'
      decisions: [],
      matrix: {},                  // { decision: { metric: 'H'|'M'|'L'|'N' } }
      uncertainties: [],
      uMatrix: {},                 // same shape for uncertainties
    };
  }

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function autoSave() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }
  function loadAutoSave() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      state = Object.assign(defaultState(), s || {});
    } catch (_) {}
  }
  function myLibrary() {
    // Prefer the mobile-tool's own saved library. Fall back to the desktop
    // tool's storage key so anyone who's using the same browser origin
    // for both (Chrome sync, same laptop) gets seamless access without
    // having to bootstrap via the shared-URL path.
    try {
      const raw = localStorage.getItem(LIBRARY_KEY);
      if (raw) return JSON.parse(raw);
      const rawDesk = localStorage.getItem('framing_my_library_v1');
      if (rawDesk) return JSON.parse(rawDesk);
    } catch (_) {}
    return null;
  }
  function saveMyLibrary(lib) {
    try { localStorage.setItem(LIBRARY_KEY, JSON.stringify(lib)); } catch (_) {}
  }

  // ── API ────────────────────────────────────────────
  async function apiFetch(url, opts) {
    const o = opts || {};
    const resp = await fetch(url, {
      method: o.method || 'GET',
      headers: o.body ? { 'Content-Type': 'application/json' } : {},
      body: o.body ? JSON.stringify(o.body) : undefined,
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      const err = new Error((data && data.error) || ('Request failed (' + resp.status + ')'));
      err.status = resp.status;
      throw err;
    }
    return data;
  }
  function snapshotForSave() {
    return {
      title: state.title,
      scope: state.scope,
      description: state.description,
      problemDescription: state.problemDescription,
      problemUrl: state.problemUrl,
      metrics: state.metrics,
      assignments: state.assignments,
      decisions: state.decisions,
      matrix: state.matrix,
      uncertainties: state.uncertainties,
      uMatrix: state.uMatrix,
      savedAt: new Date().toISOString(),
      savedFrom: 'mobile',
    };
  }

  // ── Wizard nav ─────────────────────────────────────
  function goToStep(n) {
    step = Math.max(0, Math.min(STEP_COUNT - 1, n));
    $$('.mfa-step').forEach(el => {
      el.classList.toggle('is-active', Number(el.dataset.step) === step);
    });
    $$('.mfa-step-pill').forEach((el, i) => {
      el.classList.remove('is-done', 'is-current');
      if (i < step) el.classList.add('is-done');
      if (i === step) el.classList.add('is-current');
    });
    $('#mfa-step-label').innerHTML =
      '<span class="num">' + (step + 1) + '</span>' + STEP_LABELS[step];
    $('#mfa-back-btn').textContent = step === 0 ? '' : '← Back';
    $('#mfa-back-btn').disabled = step === 0;
    if (step === STEP_COUNT - 1) {
      $('#mfa-next-btn').textContent = 'Done';
      renderReview();
    } else {
      $('#mfa-next-btn').textContent = 'Next →';
    }
    // Reset scroll to top on step change.
    $('#mfa-content').scrollTop = 0;
    autoSave();
  }
  function nextStep() { goToStep(step + 1); }
  function prevStep() { goToStep(step - 1); }

  // ── Render ────────────────────────────────────────
  function render() {
    $('#mfa-role').value = state.scope || '';
    $('#mfa-desc').value = state.description || '';
    $('#mfa-url').value  = state.problemUrl || '';
    renderMetrics();
    renderDecisions();
    renderUncertainties();
  }
  function renderMetrics() {
    const ul = $('#mfa-metrics-list');
    ul.innerHTML = '';
    for (let i = 0; i < state.metrics.length; i++) {
      const m = state.metrics[i];
      const li = document.createElement('li');
      li.className = 'mfa-item';
      const name = document.createElement('div');
      name.className = 'mfa-item-name';
      name.textContent = m;
      li.appendChild(name);
      const tier = state.assignments[m] || '';
      const tierBtn = document.createElement('button');
      tierBtn.type = 'button';
      tierBtn.className = 'mfa-tier';
      tierBtn.dataset.tier = tier;
      tierBtn.textContent = tier || '—';
      tierBtn.title = 'Tap to cycle H → M → L → blank';
      tierBtn.addEventListener('click', () => {
        const cur = state.assignments[m] || '';
        const idx = TIER_CYCLE.indexOf(cur);
        const nxt = TIER_CYCLE[(idx + 1) % TIER_CYCLE.length];
        if (nxt) state.assignments[m] = nxt;
        else delete state.assignments[m];
        autoSave(); renderMetrics();
      });
      li.appendChild(tierBtn);
      li.appendChild(makeArrow('↑', () => moveItem(state.metrics, i, -1, renderMetrics)));
      li.appendChild(makeArrow('↓', () => moveItem(state.metrics, i, +1, renderMetrics)));
      li.appendChild(makeX(() => {
        state.metrics.splice(i, 1);
        delete state.assignments[m];
        for (const d of Object.keys(state.matrix))  if (state.matrix[d])  delete state.matrix[d][m];
        for (const u of Object.keys(state.uMatrix)) if (state.uMatrix[u]) delete state.uMatrix[u][m];
        autoSave(); renderMetrics(); renderDecisions(); renderUncertainties();
      }));
      ul.appendChild(li);
    }
  }
  function renderDecisions() { renderScoredList('decision'); }
  function renderUncertainties() { renderScoredList('uncertainty'); }
  function renderScoredList(kind) {
    const isD = kind === 'decision';
    const ul = $(isD ? '#mfa-decisions-list' : '#mfa-uncerts-list');
    const items = isD ? state.decisions : state.uncertainties;
    const matrix = isD ? state.matrix : state.uMatrix;
    ul.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
      const name = items[i];
      const li = document.createElement('li');
      li.className = 'mfa-item';
      const nameEl = document.createElement('div');
      nameEl.className = 'mfa-item-name';
      nameEl.textContent = name;
      li.appendChild(nameEl);
      const expand = document.createElement('button');
      expand.type = 'button';
      expand.className = 'mfa-item-expand';
      expand.textContent = '▸';
      expand.setAttribute('aria-expanded', 'false');
      const drawer = buildScoreDrawer(kind, name, matrix);
      drawer.hidden = true;
      expand.addEventListener('click', () => {
        const open = expand.getAttribute('aria-expanded') === 'true';
        expand.setAttribute('aria-expanded', open ? 'false' : 'true');
        expand.textContent = open ? '▸' : '▾';
        drawer.hidden = open;
      });
      li.appendChild(expand);
      li.appendChild(makeArrow('↑', () => moveItem(items, i, -1, isD ? renderDecisions : renderUncertainties)));
      li.appendChild(makeArrow('↓', () => moveItem(items, i, +1, isD ? renderDecisions : renderUncertainties)));
      li.appendChild(makeX(() => {
        items.splice(i, 1);
        delete matrix[name];
        autoSave(); (isD ? renderDecisions : renderUncertainties)();
      }));
      const wrap = document.createDocumentFragment();
      wrap.appendChild(li);
      wrap.appendChild(drawer);
      ul.appendChild(wrap);
    }
  }
  function buildScoreDrawer(kind, name, matrix) {
    const drawer = document.createElement('div');
    drawer.className = 'mfa-item-drawer';
    if (state.metrics.length === 0) {
      const p = document.createElement('p');
      p.style.margin = '4px 0 0';
      p.style.color = 'var(--muted)';
      p.style.fontSize = '0.9rem';
      p.textContent = 'Add metrics first, then come back to score.';
      drawer.appendChild(p);
      return drawer;
    }
    if (!matrix[name]) matrix[name] = {};
    for (const metric of state.metrics) {
      const row = document.createElement('div');
      row.className = 'mfa-drawer-row';
      const label = document.createElement('div');
      label.className = 'mfa-drawer-metric';
      label.textContent = metric;
      row.appendChild(label);
      const group = document.createElement('div');
      group.className = 'mfa-hml-group';
      for (const t of ['H', 'M', 'L', 'N']) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mfa-hml-btn';
        btn.dataset.tier = t;
        btn.textContent = t;
        const active = (matrix[name][metric] || '') === t;
        if (active) btn.classList.add('is-active');
        btn.addEventListener('click', () => {
          const cur = matrix[name][metric] || '';
          if (cur === t) delete matrix[name][metric];
          else matrix[name][metric] = t;
          autoSave();
          // Re-render just this row's active states
          group.querySelectorAll('.mfa-hml-btn').forEach(b => b.classList.remove('is-active'));
          const now = matrix[name][metric];
          if (now) group.querySelector('.mfa-hml-btn[data-tier="' + now + '"]').classList.add('is-active');
        });
        group.appendChild(btn);
      }
      row.appendChild(group);
      drawer.appendChild(row);
    }
    return drawer;
  }
  function makeArrow(glyph, onClick) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mfa-arrow-btn';
    b.textContent = glyph;
    b.addEventListener('click', onClick);
    return b;
  }
  function makeX(onClick) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'mfa-x-btn';
    b.textContent = '×';
    b.setAttribute('aria-label', 'Remove');
    b.addEventListener('click', onClick);
    return b;
  }
  function moveItem(arr, i, delta, rerender) {
    const j = i + delta;
    if (j < 0 || j >= arr.length) return;
    const [it] = arr.splice(i, 1);
    arr.splice(j, 0, it);
    autoSave(); rerender();
  }

  function renderReview() {
    const scopeEl = $('#mfa-review-scope');
    if (state.scope || state.description) {
      scopeEl.className = '';
      scopeEl.innerHTML = '';
      if (state.scope) {
        const p1 = document.createElement('p');
        p1.style.margin = '0 0 6px';
        p1.style.fontWeight = '600';
        p1.textContent = state.scope;
        scopeEl.appendChild(p1);
      }
      if (state.description) {
        const p2 = document.createElement('p');
        p2.style.margin = '0'; p2.style.color = 'var(--ink-soft)';
        p2.textContent = state.description;
        scopeEl.appendChild(p2);
      }
    } else {
      scopeEl.className = 'mfa-review-empty';
      scopeEl.textContent = 'No scope yet.';
    }
    fillReviewList('mfa-review-metrics', state.metrics, (m) => {
      const t = state.assignments[m]; return m + (t ? '  ('+ t +')' : '');
    });
    fillReviewList('mfa-review-decisions', state.decisions, (d) => {
      const scores = state.matrix[d] || {};
      const hits = Object.keys(scores).filter(k => scores[k] && scores[k] !== 'N');
      return d + (hits.length ? '  ('+ hits.length +' metric'+(hits.length===1?'':'s')+' scored)' : '');
    });
    fillReviewList('mfa-review-uncerts', state.uncertainties, (u) => {
      const scores = state.uMatrix[u] || {};
      const hits = Object.keys(scores).filter(k => scores[k] && scores[k] !== 'N');
      return u + (hits.length ? '  ('+ hits.length +' metric'+(hits.length===1?'':'s')+' scored)' : '');
    });
  }
  function fillReviewList(id, items, fmt) {
    const el = $('#' + id);
    if (!items.length) {
      el.className = 'mfa-review-empty';
      el.textContent = 'None yet.';
      return;
    }
    el.className = '';
    const ul = document.createElement('ul');
    ul.className = 'mfa-review-list';
    for (const it of items) {
      const li = document.createElement('li');
      li.textContent = fmt(it);
      ul.appendChild(li);
    }
    el.innerHTML = '';
    el.appendChild(ul);
  }

  // ── Add-item handlers ─────────────────────────────
  function addItemFromInput(inputSel, list, rerender) {
    const inp = $(inputSel);
    const raw = (inp.value || '').trim();
    if (!raw) return;
    if (list.indexOf(raw) >= 0) { inp.value = ''; return; }
    list.push(raw);
    inp.value = '';
    autoSave(); rerender();
    inp.focus();
  }

  // ── Voice input (Web Speech API) ──────────────────
  function initVoice() {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    const btn = $('#mfa-voice-btn');
    const hint = $('#mfa-voice-hint');
    function showHint(msg) { hint.textContent = msg; hint.hidden = !msg; }
    if (!R) {
      btn.style.display = 'none';
      // Silent fallback — the keyboard's own mic covers this case.
      return;
    }
    let baseText = '';
    let listening = false;
    recognition = new R();
    recognition.lang = navigator.language || 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (e) => {
      let final = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      const sep = baseText && !/[\s]$/.test(baseText) ? ' ' : '';
      $('#mfa-desc').value = baseText + sep + final + interim;
      state.description = $('#mfa-desc').value;
      autoSave();
    };
    recognition.onend = () => {
      listening = false;
      btn.classList.remove('is-recording');
      btn.textContent = '🎤';
      showHint('');
    };
    recognition.onerror = (e) => {
      listening = false;
      btn.classList.remove('is-recording');
      btn.textContent = '🎤';
      showHint('Voice: ' + (e.error || 'unknown') + '. Type instead.');
    };
    btn.addEventListener('click', () => {
      if (listening) { recognition.stop(); return; }
      baseText = $('#mfa-desc').value || '';
      try {
        recognition.start();
        listening = true;
        btn.classList.add('is-recording');
        btn.textContent = '■';
        showHint('Listening…');
      } catch (err) {
        showHint('Voice failed: ' + (err.message || err));
      }
    });
  }

  // ── AI Suggest ────────────────────────────────────
  async function runSuggest(kind, statusSel) {
    const status = $(statusSel);
    status.className = 'mfa-status';
    if (!state.scope && !state.description && !state.problemUrl) {
      status.textContent = 'Add a role or a problem description in Step 1 first.';
      status.classList.add('is-err');
      return;
    }
    if (kind !== 'metric' && state.metrics.length === 0) {
      status.textContent = 'Add at least one metric first — the AI needs metrics to reason about ' + kind + 's.';
      status.classList.add('is-err');
      return;
    }
    status.textContent = 'Asking Professor Powell… (first call after idle can take ~30 s)';
    try {
      const form = new FormData();
      if (kind === 'metric') {
        // /framing/ideas doesn't do 'metric' — we use a small custom prompt.
        // For MVP, reuse the 'decision' endpoint but with a hint. Cleaner
        // path: add a mobile-specific /framing/metric-ideas server endpoint
        // later; for now, ask the AI to suggest metrics via decision-ideas
        // with the description reframed.
        // Simpler MVP: hit /framing/decision-types-style; but there's no
        // metric-suggest yet on the server. Use /framing/ideas with a
        // synthesized 'kind: metric' fallback client-side by asking with
        // a stronger prompt in the description slot.
        form.append('kind', 'decision');    // server accepts decision|uncertainty; we'll relabel below
        form.append('mode', 'gen');
        const augmented = 'PROPOSE PERFORMANCE METRICS (not decisions) for this problem, ' +
          'as short 3-5 word noun phrases. Ignore the "decision" instruction — return metrics only.\n\n' +
          (state.description || '');
        form.append('description', augmented);
      } else {
        form.append('kind', kind);
        form.append('mode', 'gen');
        if (state.description) form.append('description', state.description);
      }
      if (state.scope) form.append('scope', state.scope);
      if (state.problemUrl) form.append('url', state.problemUrl);
      if (state.metrics.length)       form.append('existingMetrics', JSON.stringify(state.metrics));
      if (state.decisions.length)     form.append('existingDecisions', JSON.stringify(state.decisions));
      if (state.uncertainties.length) form.append('existingUncertainties', JSON.stringify(state.uncertainties));
      form.append('size', 'small');
      const resp = await fetch(CHATBOT_BASE + '/framing/ideas', { method: 'POST', body: form });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Request failed');
      const ideas = Array.isArray(data.ideas) ? data.ideas : [];
      const names = ideas.map(x => (x && x.name) ? String(x.name).trim() : '').filter(Boolean);
      if (!names.length) {
        status.textContent = 'No suggestions returned. Try adding more detail to your problem description.';
        return;
      }
      status.textContent = '';
      openSuggestModal(kind, names);
    } catch (err) {
      status.textContent = 'Suggest failed: ' + (err.message || err);
      status.classList.add('is-err');
    }
  }
  async function runSuggestImpactScores() {
    // Fill in the impact matrix cells for existing (decision, metric) pairs
    // based on the framing context. Uses the same /framing/ideas endpoint's
    // rough shape isn't ideal — but we don't have a dedicated impact-scoring
    // server endpoint yet. For MVP: prompt the user to score by hand for now.
    const status = $('#mfa-decision-status');
    status.className = 'mfa-status';
    if (!state.decisions.length || !state.metrics.length) {
      status.textContent = 'Add decisions and metrics first.';
      status.classList.add('is-err');
      return;
    }
    // Placeholder — full impact-scoring endpoint is a follow-up. For now,
    // guide the user to tap into each decision and score by hand.
    status.textContent = 'Tip: tap ▸ next to a decision to score it. (AI impact-scoring is coming soon.)';
  }

  let suggestSelected = { kind: null, names: [] };
  function openSuggestModal(kind, names) {
    suggestSelected.kind = kind;
    suggestSelected.names = names;
    const title = kind === 'metric' ? 'Suggested metrics'
                : kind === 'decision' ? 'Suggested decisions'
                : 'Suggested uncertainties';
    $('#mfa-suggest-title').textContent = title;
    const body = $('#mfa-suggest-body');
    body.innerHTML = '';
    names.forEach((n, i) => {
      const row = document.createElement('div');
      row.className = 'mfa-suggest-item';
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.id = 'mfa-sugg-' + i; cb.checked = true;
      const lb = document.createElement('label');
      lb.htmlFor = 'mfa-sugg-' + i;
      lb.textContent = n;
      row.appendChild(cb); row.appendChild(lb);
      body.appendChild(row);
    });
    $('#mfa-suggest-modal').hidden = false;
  }
  function applySuggest() {
    const body = $('#mfa-suggest-body');
    const checked = [];
    body.querySelectorAll('input[type="checkbox"]').forEach((cb, i) => {
      if (cb.checked) checked.push(suggestSelected.names[i]);
    });
    if (!checked.length) { $('#mfa-suggest-modal').hidden = true; return; }
    const target = suggestSelected.kind === 'metric' ? state.metrics
                 : suggestSelected.kind === 'decision' ? state.decisions
                 : state.uncertainties;
    for (const n of checked) if (target.indexOf(n) < 0) target.push(n);
    autoSave();
    if (suggestSelected.kind === 'metric') renderMetrics();
    else if (suggestSelected.kind === 'decision') renderDecisions();
    else renderUncertainties();
    $('#mfa-suggest-modal').hidden = true;
  }

  // ── Open library / load a framing ────────────────
  async function openLibraryModal() {
    const modal = $('#mfa-library-modal');
    const status = $('#mfa-library-status');
    const list = $('#mfa-library-list');
    list.innerHTML = '';
    modal.hidden = false;
    // Prefer the library the user has previously saved into on this device.
    // If none, fall back to any ?node= param on the URL (someone shared
    // their library with them). If neither, tell the user to save first.
    let lib = myLibrary();
    let readId, writeToken;
    if (lib && lib.readId) {
      readId = lib.readId; writeToken = lib.writeToken;
    } else {
      try {
        const p = new URLSearchParams(window.location.search);
        readId = p.get('node');
        writeToken = p.get('w') || p.get('admin');
      } catch (_) {}
    }
    if (!readId) {
      status.textContent = 'No library yet on this device. Save a framing once and it will appear here.';
      return;
    }
    status.textContent = 'Loading…';
    try {
      const resp = await apiFetch(NODES_BASE + '/nodes/' + encodeURIComponent(readId));
      const name = resp.node && resp.node.name;
      $('#mfa-library-title').textContent = name ? ('Library: ' + name) : 'My library';
      const framings = Array.isArray(resp.framings) ? resp.framings : [];
      if (!framings.length) {
        status.textContent = 'This library has no framings yet.';
        return;
      }
      status.textContent = '';
      for (const f of framings) {
        const li = document.createElement('li');
        li.className = 'mfa-item';
        const nameEl = document.createElement('div');
        nameEl.className = 'mfa-item-name';
        nameEl.textContent = f.title || 'Untitled framing';
        try {
          const meta = document.createElement('div');
          meta.style.fontSize = '0.78rem'; meta.style.color = 'var(--muted)'; meta.style.marginTop = '2px';
          meta.textContent = 'edited ' + new Date(f.updated_at).toLocaleString();
          nameEl.appendChild(meta);
        } catch (_) {}
        li.appendChild(nameEl);
        const openBtn = document.createElement('button');
        openBtn.type = 'button'; openBtn.className = 'mfa-btn mfa-btn-primary';
        openBtn.style.padding = '6px 12px'; openBtn.style.minHeight = '36px';
        openBtn.textContent = 'Open';
        openBtn.addEventListener('click', () => openFraming(f.id, readId, writeToken, f.title));
        li.appendChild(openBtn);
        list.appendChild(li);
      }
    } catch (err) {
      status.textContent = 'Failed to load library: ' + (err.message || err) +
        '  (First request after idle can take ~30 s while the server wakes up.)';
    }
  }
  async function openFraming(framingId, readId, writeToken, title) {
    const status = $('#mfa-library-status');
    status.textContent = 'Opening…';
    try {
      const resp = await apiFetch(NODES_BASE + '/framings/' + encodeURIComponent(framingId));
      const content = (resp && resp.framing && resp.framing.content) || {};
      // Merge server content into local state, keeping defaults for missing fields.
      state = Object.assign(defaultState(), content);
      state.title = title || state.title || '';
      currentFramingId = framingId;
      // Also remember which library this framing belongs to, so subsequent
      // saves go back to the same place — even if the user opened via a
      // shared URL rather than their own saved library.
      if (readId && writeToken) {
        saveMyLibrary({ readId, writeToken, name: state.title });
      }
      autoSave();
      render();
      $('#mfa-library-modal').hidden = true;
      $('#mfa-menu-modal').hidden = true;
      // Land on the review step so the user sees what they just loaded.
      goToStep(STEP_COUNT - 1);
      flashBanner('Loaded "' + (title || 'framing') + '".');
    } catch (err) {
      status.textContent = 'Open failed: ' + (err.message || err);
    }
  }
  // Small transient status message pinned briefly under the topbar.
  let flashTimer = null;
  function flashBanner(msg) {
    let el = document.getElementById('mfa-flash');
    if (!el) {
      el = document.createElement('div');
      el.id = 'mfa-flash';
      el.style.cssText = 'position:fixed;left:0;right:0;top:calc(env(safe-area-inset-top) + 88px);' +
        'margin:0 12px;padding:10px 14px;background:var(--tan);color:var(--ink);border:1px solid var(--tan-deep);' +
        'border-radius:6px;font-size:0.9rem;text-align:center;z-index:80;box-shadow:0 2px 8px rgba(0,0,0,0.08);';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.hidden = false;
    if (flashTimer) clearTimeout(flashTimer);
    flashTimer = setTimeout(() => { el.hidden = true; }, 3200);
  }

  // ── Save / share ─────────────────────────────────
  async function saveToServer() {
    const status = $('#mfa-save-status');
    const btn = $('#mfa-save-btn');
    btn.disabled = true;
    status.className = 'mfa-status';
    status.textContent = 'Saving to your library…';
    try {
      // Prompt for a framing title if we don't have one yet.
      let title = state.title;
      if (!title) {
        title = window.prompt('Name this framing (a short label for your library):',
          state.scope || state.decisions[0] || 'Untitled framing');
        if (title == null) { status.textContent = ''; btn.disabled = false; return; }
        title = title.trim().slice(0, 200);
        if (!title) title = 'Untitled framing';
        state.title = title;
        autoSave();
      }
      let lib = myLibrary();
      let isFirstPublish = false;
      if (!lib) {
        isFirstPublish = true;
        const libName = 'My framings — ' + title;
        const nodeResp = await apiFetch(NODES_BASE + '/nodes', {
          method: 'POST', body: { name: libName.slice(0, 200) },
        });
        lib = {
          readId: nodeResp.node.read_id,
          writeToken: nodeResp.node.write_token,
          name: libName,
        };
        saveMyLibrary(lib);
      }
      // Update in place if this frame already lives in the library, else POST.
      let framingId = currentFramingId;
      if (framingId) {
        await apiFetch(
          NODES_BASE + '/framings/' + encodeURIComponent(framingId) +
            '?nodeReadId=' + encodeURIComponent(lib.readId) +
            '&w=' + encodeURIComponent(lib.writeToken),
          { method: 'PUT', body: { title: title.slice(0, 200), content: snapshotForSave() } }
        );
      } else {
        const framingResp = await apiFetch(
          NODES_BASE + '/framings?nodeReadId=' + encodeURIComponent(lib.readId) +
            '&w=' + encodeURIComponent(lib.writeToken),
          { method: 'POST', body: { title: title.slice(0, 200), content: snapshotForSave() } }
        );
        currentFramingId = framingResp.framing.id;
      }
      status.textContent = isFirstPublish
        ? 'Saved. Your library is now on the server.'
        : 'Saved.';
      const shareUrl = window.location.origin + '/decision-framing-tool/?node=' + encodeURIComponent(lib.readId);
      $('#mfa-share-url').value = shareUrl;
      $('#mfa-share-block').hidden = false;
      // Render QR client-side if the library is available (deferred).
    } catch (err) {
      status.textContent = 'Save failed: ' + (err.message || err) +
        '  (First request after idle can take ~30 s while the server wakes up.)';
      status.classList.add('is-err');
    } finally {
      btn.disabled = false;
    }
  }

  function copyShareUrl() {
    const inp = $('#mfa-share-url');
    inp.select(); inp.setSelectionRange(0, inp.value.length);
    const done = () => {
      const b = $('#mfa-share-copy');
      const orig = b.textContent; b.textContent = 'Copied ✓';
      setTimeout(() => { b.textContent = orig; }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(inp.value).then(done, done);
    } else {
      try { document.execCommand('copy'); } catch (_) {}
      done();
    }
  }

  // ── Wire ─────────────────────────────────────────
  function wire() {
    // Text field → state
    $('#mfa-role').addEventListener('input', (e) => { state.scope = e.target.value; autoSave(); });
    $('#mfa-desc').addEventListener('input', (e) => { state.description = e.target.value; autoSave(); });
    $('#mfa-url').addEventListener('input', (e) => { state.problemUrl = e.target.value; autoSave(); });

    // Add-item buttons + Enter
    $('#mfa-metric-add').addEventListener('click', () => addItemFromInput('#mfa-metric-new', state.metrics, renderMetrics));
    $('#mfa-metric-new').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); addItemFromInput('#mfa-metric-new', state.metrics, renderMetrics); }
    });
    $('#mfa-decision-add').addEventListener('click', () => addItemFromInput('#mfa-decision-new', state.decisions, renderDecisions));
    $('#mfa-decision-new').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); addItemFromInput('#mfa-decision-new', state.decisions, renderDecisions); }
    });
    $('#mfa-uncert-add').addEventListener('click', () => addItemFromInput('#mfa-uncert-new', state.uncertainties, renderUncertainties));
    $('#mfa-uncert-new').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); addItemFromInput('#mfa-uncert-new', state.uncertainties, renderUncertainties); }
    });

    // Suggest buttons
    $('#mfa-metric-suggest').addEventListener('click', () => runSuggest('metric', '#mfa-metric-status'));
    $('#mfa-decision-suggest').addEventListener('click', () => runSuggest('decision', '#mfa-decision-status'));
    $('#mfa-decision-suggest-impact').addEventListener('click', runSuggestImpactScores);
    $('#mfa-uncert-suggest').addEventListener('click', () => runSuggest('uncertainty', '#mfa-uncert-status'));

    // Suggest modal
    $('#mfa-suggest-close').addEventListener('click', () => { $('#mfa-suggest-modal').hidden = true; });
    $('#mfa-suggest-cancel').addEventListener('click', () => { $('#mfa-suggest-modal').hidden = true; });
    $('#mfa-suggest-add').addEventListener('click', applySuggest);

    // Menu modal
    $('#mfa-menu-btn').addEventListener('click', () => { $('#mfa-menu-modal').hidden = false; });
    $('#mfa-menu-close').addEventListener('click', () => { $('#mfa-menu-modal').hidden = true; });
    $('#mfa-menu-open').addEventListener('click', () => {
      $('#mfa-menu-modal').hidden = true;
      openLibraryModal();
    });
    // Library modal
    $('#mfa-library-close').addEventListener('click', () => { $('#mfa-library-modal').hidden = true; });
    $('#mfa-library-refresh').addEventListener('click', openLibraryModal);
    $('#mfa-menu-new').addEventListener('click', () => {
      if (!confirm('Start a new framing? Your current work will be cleared from this device (server-saved framings are not touched).')) return;
      state = defaultState(); currentFramingId = null;
      autoSave(); render(); goToStep(0);
      $('#mfa-menu-modal').hidden = true;
    });
    $('#mfa-menu-save').addEventListener('click', () => {
      $('#mfa-menu-modal').hidden = true;
      goToStep(STEP_COUNT - 1);
      setTimeout(saveToServer, 100);
    });

    // Nav
    $('#mfa-back-btn').addEventListener('click', prevStep);
    $('#mfa-next-btn').addEventListener('click', () => {
      if (step === STEP_COUNT - 1) {
        // Done on last step: save if we haven't yet, else close.
        if (!currentFramingId) saveToServer();
        return;
      }
      nextStep();
    });

    // Save + copy on review step
    $('#mfa-save-btn').addEventListener('click', saveToServer);
    $('#mfa-share-copy').addEventListener('click', copyShareUrl);
  }

  // ── Init ─────────────────────────────────────────
  loadAutoSave();
  render();
  wire();
  initVoice();
  goToStep(0);
  // If someone opened this page with ?node=X (a shared library URL,
  // or a redirect from the desktop tool that carried its params over),
  // pop the library modal so they can pick a framing to open.
  try {
    const p = new URLSearchParams(window.location.search);
    if (p.get('node')) {
      setTimeout(openLibraryModal, 200);
    }
  } catch (_) {}
})();
</script>
{% endraw %}
