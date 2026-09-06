---
layout: page
title: "The decision framing tool"
permalink: /decision-framing-tool/
date: 2026-08-11
---

{% raw %}
<p>The decision framing tool has four parts:</p>
<ol>
  <li><a href="#scope-of-the-decision-frame"><strong>Scope of the decision frame</strong></a> — identify the perspective of who is making the decision.</li>
  <li><a href="#metrics-pyramid-tool"><strong>Metrics pyramid tool</strong></a> — prioritize your performance metrics into a four-level pyramid.</li>
  <li><a href="#decision-prioritization-tool"><strong>Decision prioritization tool</strong></a> — score each decision's impact on each pyramid-ordered metric (H / M / L / N), then reorder the decisions by their impact on the most important metrics. Decisions may be nested so that higher level decisions (choose supplier) can be broken into lower level decisions (list individual suppliers). Lower level decisions can be further divided into subclasses.</li>
  <li><a href="#uncertainty-prioritization-tool"><strong>Uncertainty prioritization tool</strong></a> — same idea, applied to the uncertainties that affect performance.</li>
</ol>
<p>When framing a problem, be sure to follow the guidelines given on <a href="/framingproblems/#the-framing-process">The Framing Process</a>.</p>
<p>All the information you provide remains private. The <em>File</em> menu below lets you save framings to your personal server library (accessible from any browser via a URL you keep), each containing the scope, the pyramid, and both matrices. If you would like to share a single framing as a snapshot, hit <em>Copy URL</em> and paste it in an email — anyone with the link can view that framing.</p>

<p style="background:#faf5e6; border-left: 4px solid #c9621e; padding: 10px 16px; border-radius: 3px;">
  <strong>New — <a href="#ask-professor-powell">Ask Professor Powell</a> to draft your framing.</strong>
  Skip to the bottom to describe your problem in a sentence or two (or drop in a case file, or a URL) and get all four parts filled in — you edit and refine from there.
</p>

<p style="background:#f2e6c9; border-left: 4px solid #5a3e1f; padding: 10px 16px; border-radius: 3px;">
  <strong><a href="/decision-framing-tool/?node=AJx6Ke2S3d" id="fp-public-examples-link">Browse public examples&nbsp;→</a></strong>
  A collection of framings to illustrate the tool; copy it into your own library for editing.
</p>

<!-- Admin bar — hidden unless the URL contains ?admin=1. Gives library-owner
     controls (publish / rename / delete public examples). See admin JS below. -->
<div id="fp-admin-bar" class="fp-admin-bar" hidden>
  <span class="fp-admin-badge" title="Admin mode is on for this browser tab because ?admin=1 is on the URL.">ADMIN</span>
  <span class="fp-admin-status" id="fp-admin-status">Checking token…</span>
  <button type="button" id="fp-admin-set-token">Set / change GitHub token…</button>
  <button type="button" id="fp-admin-clear-token">Clear token</button>
  <button type="button" id="fp-admin-help">How this works</button>
</div>

<div class="fp-toolbar">
  <details class="fp-menu" id="fp-file-menu">
    <summary>File ▾</summary>
    <div class="fp-menu-items">
      <button type="button" id="fp-menu-new">New framing</button>
      <button type="button" id="fp-menu-open">Open…</button>
      <button type="button" id="fp-menu-open-my-lib" title="Jump to your personal server library (published framings)" disabled>Open my library</button>
      <button type="button" id="fp-menu-publish" title="Save the current framing to the online library. Creates your personal library on the first save; adds to it on subsequent saves.">Save to my library…</button>
      <button type="button" id="fp-menu-export" title="Download the current framing as a JSON file (useful for sharing or archiving)">Export as JSON…</button>
      <button type="button" id="fp-menu-import" title="Load a decision from a .json file someone sent you (or one you exported earlier)">Import from JSON…</button>
    </div>
  </details>
  <span class="fp-toolbar-sep" aria-hidden="true"></span>
  <button type="button" id="fp-clear">Clear pyramid</button>
  <button type="button" id="fp-reset">Reset all</button>
  <button type="button" id="fp-share" title="Copy a URL that opens this framing as a fresh snapshot in someone else's browser (their edits don't affect your copy). NOT a library link — use Share URLs in the library bar for that.">Copy URL</button>
  <button type="button" id="fp-print">Print</button>
  <span id="fp-status" class="fp-status" role="status"></span>
</div>

<!-- Open-pyramid modal — populated at click time from localStorage. -->
<div id="fp-open-modal" class="fp-modal" hidden>
  <div class="fp-modal-card" role="dialog" aria-modal="true" aria-labelledby="fp-modal-title">
    <div class="fp-modal-header">
      <h3 id="fp-modal-title">Open framing</h3>
      <button type="button" class="fp-modal-close" id="fp-modal-close" aria-label="Close">×</button>
    </div>
    <div id="fp-legacy-section" hidden>
      <h4 class="fp-modal-subheader">Legacy local saves</h4>
      <p class="fp-muted" style="margin: 0 0 6px 0;">Framings saved to this browser before the switch to server libraries. Click one to load it, then use <b>File → Save to my library…</b> to move it into your server library. This section will disappear once it's empty.</p>
      <div id="fp-file-list" class="fp-file-list"></div>
    </div>

    <h4 class="fp-modal-subheader" style="margin-top: 16px;">My server libraries</h4>
    <p class="fp-muted" style="margin: 0 0 6px 0;">Server-backed libraries you've visited on this browser. Includes your own personal library and any public / shared library you've opened. Click to reopen.</p>
    <div class="fp-add-lib-row">
      <input type="url" id="fp-add-lib-input"
        placeholder="Paste a library View or Edit URL to add it to this list…"
        aria-label="Library URL to add" />
      <button type="button" id="fp-add-lib-btn">Add</button>
    </div>
    <div id="fp-server-lib-list" class="fp-file-list"></div>

    <h4 class="fp-modal-subheader" style="margin-top: 16px;">Public examples</h4>
    <p class="fp-muted" style="margin: 0 0 6px 0;">Curated framings. Loading one drops it into your workspace as an unnamed document — use <em>Save to my library…</em> to keep your own copy.</p>
    <div id="fp-example-list" class="fp-file-list"></div>

    <div class="fp-modal-actions">
      <button type="button" id="fp-modal-cancel">Cancel</button>
    </div>
  </div>
</div>

<!-- URL-display modal — shown after any server-side operation that
     produces or refreshes URLs: first publish (creates a node under
     Public users), sub-library creation, regenerate URLs. -->
<div id="fp-urls-modal" class="fp-modal" hidden>
  <div class="fp-modal-card" role="dialog" aria-modal="true" aria-labelledby="fp-urls-title">
    <div class="fp-modal-header">
      <h3 id="fp-urls-title">Your library URLs</h3>
      <button type="button" class="fp-modal-close" id="fp-urls-close" aria-label="Close" disabled title="Confirm below first">×</button>
    </div>
    <p id="fp-urls-lede" class="fp-urls-lede"></p>

    <div class="fp-url-row">
      <label class="fp-url-label" for="fp-urls-read">View URL <span class="fp-muted">(share to let others view; no editing)</span></label>
      <div class="fp-url-line">
        <input type="text" id="fp-urls-read" readonly />
        <button type="button" class="fp-url-copy" data-target="fp-urls-read">Copy</button>
      </div>
    </div>

    <div class="fp-url-row">
      <label class="fp-url-label" for="fp-urls-write">Edit URL <span class="fp-muted">(keep private — anyone with this can edit)</span></label>
      <div class="fp-url-line">
        <input type="text" id="fp-urls-write" readonly />
        <button type="button" class="fp-url-copy" data-target="fp-urls-write">Copy</button>
      </div>
    </div>

    <div class="fp-urls-warning" role="alert">
      <strong>Save both URLs now.</strong> Losing the Edit URL means nobody can rescue you — there is no admin console, no password reset, and no way to email you a fresh link. A password manager entry, an encrypted note, or an email to yourself all work. The View URL can be regenerated with the Edit URL later, so the Edit URL is the master key.
    </div>

    <div class="fp-urls-actions">
      <a id="fp-urls-email" class="fp-url-mail" href="#" target="_blank" rel="noopener">
        ✉ Email these to me
      </a>
      <label class="fp-urls-confirm">
        <input type="checkbox" id="fp-urls-confirm-cb" />
        I have saved both URLs
      </label>
      <button type="button" id="fp-urls-done" disabled>Done</button>
    </div>
  </div>
</div>

<!-- Library bar — only visible when the user loaded the page with a
     ?node= URL. Shows the ancestry breadcrumb + edit/view mode + a
     Browse button that opens the library modal. -->
<div id="fp-library-bar" class="fp-library-bar" hidden>
  <span id="fp-library-crumb" class="fp-library-crumb"></span>
  <span id="fp-library-mode" class="fp-library-mode"></span>
  <button type="button" id="fp-library-save-framing" class="fp-library-browse fp-library-primary" title="Save your edits to the currently-open framing" hidden>Save changes</button>
  <button type="button" id="fp-library-new-framing" class="fp-library-browse" title="Add a new empty framing to this library" hidden>+ New framing</button>
  <button type="button" id="fp-library-new-sublib" class="fp-library-browse" title="Create a new sub-library inside this library (for a class, team, or project)" hidden>+ New sub-library</button>
  <button type="button" id="fp-library-share" class="fp-library-browse" title="Show the View and Edit URLs for this library so you can copy or share them">Share URLs</button>
  <button type="button" id="fp-library-rename" class="fp-library-browse" title="Rename this library" hidden>Rename ✎</button>
  <button type="button" id="fp-library-browse" class="fp-library-browse">Browse ▾</button>
</div>

<!-- Library browse modal — lists sub-libraries + framings in the
     currently-loaded library node so the user can navigate the tree
     downward and jump between framings. Populated at open time from
     loadedNode.children and loadedNode.framings. -->
<div id="fp-library-modal" class="fp-modal" hidden>
  <div class="fp-modal-card">
    <div class="fp-modal-header">
      <h3>Library — <span id="fp-library-modal-name"></span></h3>
      <button type="button" class="fp-modal-close" id="fp-library-modal-close" aria-label="Close">×</button>
    </div>
    <p class="fp-muted" style="margin: 0 0 6px 0;">
      <span id="fp-library-modal-crumb"></span>
    </p>
    <h4 class="fp-modal-subheader">Sub-libraries</h4>
    <p class="fp-muted" style="margin: 0 0 6px 0;">Click one to navigate into it (view-only unless you have that library's Edit URL).</p>
    <div id="fp-library-sublib-list" class="fp-file-list"></div>

    <h4 class="fp-modal-subheader" style="margin-top: 16px;">Framings in this library</h4>
    <div id="fp-library-framing-list" class="fp-file-list"></div>
    <div class="fp-modal-actions">
      <button type="button" id="fp-library-modal-cancel">Close</button>
    </div>
  </div>
</div>

<div id="fp-doc-banner" class="fp-doc-banner">
  <h2 id="fp-doc-title" class="fp-doc-title" aria-live="polite"></h2>
  <p id="fp-doc-description" class="fp-doc-description" hidden></p>
</div>

<h2 id="scope-of-the-decision-frame" class="fp-section-h2">Scope of the decision frame</h2>
<p>A decision frame has to reflect the perspective of a decision maker, which can be a person, a team, a division of a company, or a piece of software. This perspective should help define (and limit) the set of decisions to those that are under control of the decision maker. Identify this perspective in the box below, which can be a name, a title, the name of a group, or the name of a software package. Or, simply provide a short summary that communicates the decision-maker's perspective.</p>
<input type="text" id="fp-scope-input" class="fp-scope-input" spellcheck="true"
  placeholder="e.g. Regional dispatch manager  ·  VP of operations, weekly planning cycle  ·  Autonomous routing engine" />

<h2 id="metrics-pyramid-tool" class="fp-section-h2">Metrics pyramid tool</h2>
<p>Metrics quantify what you want to achieve. They come in three flavors: metrics to be maximized or minimized, along with targets you want to hit, and limits where you specify a minimum or maximum for a metric. The top metric should be in the first category.</p>
<p>Type performance metrics on the left (one per line), then drag each chip into a tier — most important at the top, least important at the bottom. Drag between tiers to re-order, or back to <em>Unassigned</em> to remove.</p>

<div class="fp-grid">
  <div class="fp-panel fp-metrics-panel">
    <h3>Metrics</h3>
    <p class="fp-muted">One per line. Chips appear below and can be dragged into the pyramid on the right.</p>
    <textarea id="fp-metrics-input" spellcheck="true" placeholder="Revenue growth&#10;Customer satisfaction&#10;Employee retention&#10;On-time delivery&#10;Product quality"></textarea>
    <div class="fp-chip-legend" aria-hidden="true">
      <p class="fp-chip-legend-help">Click a chip to cycle its flavor:</p>
      <div class="fp-chip-legend-grid">
        <span class="fp-legend-swatch" data-color="max" title="Maximize — an objective you want more of (e.g. revenue, service)">Max</span>
        <span class="fp-legend-swatch" data-color="min" title="Minimize — an objective you want less of (e.g. cost, delay)">Min</span>
        <span class="fp-legend-swatch" data-color="target" title="Target — a specific value you want to hit">Target</span>
        <span class="fp-legend-swatch" data-color="limit-floor" title="Floor — a minimum this metric must stay above (e.g. demand covered)">Floor</span>
        <span class="fp-legend-swatch" data-color="limit-ceiling" title="Ceiling — a maximum this metric must stay below (e.g. lost demand)">Ceiling</span>
      </div>
    </div>
    <div class="fp-unassigned-label">Unassigned <span class="fp-tier-hint">(drag into a tier)</span></div>
    <div class="fp-drop-zone fp-unassigned" data-tier="0"></div>
  </div>

  <div class="fp-panel fp-pyramid-panel">
    <h3>Priority pyramid</h3>
    <p class="fp-muted">Tier 1 = most important. Drop chips onto any tier; drag between tiers to re-order.</p>
    <div class="fp-pyramid">
      <div class="fp-tier fp-tier-1">
        <div class="fp-tier-label">Tier 1 <span class="fp-tier-hint">(one metric)</span></div>
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
        <div class="fp-tier-label">Tier 4</div>
        <div class="fp-drop-zone" data-tier="4"></div>
      </div>
    </div>
  </div>
</div>

<h2 id="decision-prioritization-tool" class="fp-section-h2">Decision prioritization tool</h2>
<p>List the decisions you'd consider (one per line). The matrix below has one column per <em>tier-assigned</em> metric from the pyramid above, ordered top-to-bottom by tier (left-to-right within the same tier by the order the metrics appear in the metrics list). Click any cell to cycle through <b>H</b> (high impact) → <b>M</b> → <b>L</b> → <b>N</b> (none) → blank. When you're done scoring, drag any row up or down via the <span class="fp-grip-inline">☰</span> handle to prioritize decisions by their impact on the most important metrics.</p>
<p>To break a decision down into sub-decisions, click the <span class="fp-drill-inline">▸</span> button next to that decision (or right-click its row). You can nest sub-decisions to any depth; the metrics pyramid stays fixed.</p>

<div id="fp-decision-breadcrumb" class="fp-decision-breadcrumb" hidden></div>
<div id="fp-decision-subscope" class="fp-decision-subscope" hidden>
  <label for="fp-decision-subscope-input">Scope for this sub-decision <span class="fp-muted">(optional — blank inherits from the parent)</span></label>
  <textarea id="fp-decision-subscope-input" rows="2" spellcheck="true"
    placeholder="e.g. Model engineering team, monthly release cycle."></textarea>
</div>

<div class="fp-grid fp-grid-narrow">
  <div class="fp-panel fp-decisions-panel">
    <h3>Decisions</h3>
    <textarea id="fp-decisions-input" spellcheck="true" placeholder="Set the price&#10;Choose a supplier&#10;Approve the design&#10;Schedule production"></textarea>
  </div>
  <div class="fp-panel fp-matrix-panel">
    <h3>Decision impact matrix</h3>
    <div class="fp-matrix-controls">
      <button type="button" class="fp-matrix-draft" data-kind="decision"
        title="Use the AI to fill in H/M/L/N for every cell based on your current metrics and decisions. Review carefully.">
        First draft (AI)
      </button>
      <button type="button" class="fp-matrix-reset" data-kind="decision"
        title="Clear every H/M/L/N in this matrix. The decisions and metrics are not touched.">
        Reset scores
      </button>
      <span class="fp-matrix-ai-note" data-kind="decision" hidden>AI-generated — be sure to review carefully.</span>
    </div>
    <p class="fp-muted">Columns follow the pyramid order. Rows can be dragged by their <span class="fp-grip-inline">☰</span> handle.</p>
    <div class="fp-matrix-wrapper">
      <div id="fp-matrix"></div>
    </div>
  </div>
</div>

<h2 id="uncertainty-prioritization-tool" class="fp-section-h2">Uncertainty prioritization tool</h2>
<p>This tool works the same as the decision prioritization tool above. <a href="https://warrenpowell.org/modeling-uncertainty/#categories">See here for help with identifying sources of uncertainty.</a></p>

<div class="fp-grid fp-grid-narrow">
  <div class="fp-panel fp-uncertainties-panel">
    <h3>Uncertainties</h3>
    <textarea id="fp-uncertainties-input" spellcheck="true" placeholder="Demand volatility&#10;Supplier reliability&#10;Currency fluctuation&#10;Regulatory change"></textarea>
  </div>
  <div class="fp-panel fp-matrix-panel">
    <h3>Uncertainty impact matrix</h3>
    <div class="fp-matrix-controls">
      <button type="button" class="fp-matrix-draft" data-kind="uncertainty"
        title="Use the AI to fill in H/M/L/N for every cell based on your current metrics and uncertainties. Review carefully.">
        First draft (AI)
      </button>
      <button type="button" class="fp-matrix-reset" data-kind="uncertainty"
        title="Clear every H/M/L/N in this matrix. The uncertainties and metrics are not touched.">
        Reset scores
      </button>
      <span class="fp-matrix-ai-note" data-kind="uncertainty" hidden>AI-generated — be sure to review carefully.</span>
    </div>
    <p class="fp-muted">Columns follow the pyramid order. Rows can be dragged by their <span class="fp-grip-inline">☰</span> handle.</p>
    <div class="fp-matrix-wrapper">
      <div id="fp-umatrix"></div>
    </div>
  </div>
</div>

<h2 id="ask-professor-powell" class="fp-section-h2">Ask Professor Powell</h2>
<p>Describe your problem. This may be the only description, or it may supplement materials you provide from the other sources below.</p>

<div class="fp-bot-card">
  <div class="fp-bot-row">
    <label for="fp-bot-scope" class="fp-bot-label">Start by describing the decision maker so we know the scope of the problem:</label>
    <textarea id="fp-bot-scope" rows="2" spellcheck="true"
      placeholder="e.g. A regional dispatch manager at a mid-sized trucking company with a weekly planning horizon. Or: The head of operations, quarterly cycle. Or: An autonomous dispatch system routing trucks in real time."></textarea>
  </div>
  <div class="fp-bot-row">
    <label for="fp-bot-desc" class="fp-bot-label">Describe your problem</label>
    <textarea id="fp-bot-desc" rows="4" spellcheck="true"
      placeholder="e.g. A regional pharmacy chain has to decide, each week, how much of a slow-moving cold-and-flu medication to keep in each of 40 stores given uncertain seasonal demand, expiring inventory, and a shared central warehouse..."></textarea>
  </div>

  <div class="fp-bot-row-inline">
    <div class="fp-bot-inline">
      <label for="fp-bot-url" class="fp-bot-label">…or a URL to a case / description</label>
      <input type="url" id="fp-bot-url" placeholder="https://warrenpowell.org/assets/cases/Northstar_Living_Inventory_Case.docx" />
    </div>
    <div class="fp-bot-inline">
      <label for="fp-bot-file" class="fp-bot-label">…or upload a file (PDF, DOCX, TXT, MD)</label>
      <input type="file" id="fp-bot-file" accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown" />
    </div>
  </div>

  <div class="fp-bot-controls">
    <label class="fp-bot-size">
      <span>Framing size:</span>
      <select id="fp-bot-size">
        <option value="small">Small — 4 metrics, 3 decisions, 3 uncertainties</option>
        <option value="medium" selected>Medium — 6 metrics, 5 decisions, 5 uncertainties</option>
        <option value="large">Large — 10 metrics, 8 decisions, 8 uncertainties</option>
        <option value="max">Max — 20 metrics, 20 decisions, 20 uncertainties</option>
      </select>
    </label>
    <div class="fp-bot-actions">
      <button type="button" id="fp-bot-generate">Ask Professor Powell</button>
      <button type="button" id="fp-bot-clear" title="Clear the description, URL, and file inputs">Clear inputs</button>
    </div>
  </div>

  <p class="fp-bot-caveat"><strong>Anything the bot produces will replace your current workspace.</strong> If you want to keep what's on screen now, use <em>File → Save as…</em> first.</p>

  <div id="fp-bot-status" class="fp-bot-status" role="status" aria-live="polite"></div>
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
  /* Document banner — the currently loaded case's title (h2) and its
     one-line description, shown as a workspace-wide header directly
     below the toolbar. Always visible; when no named document is
     loaded the banner shows a muted placeholder pointing at File >
     Open. */
  .fp-doc-banner {
    margin: 16px 0 8px 0;
    padding: 10px 16px;
    background: #faf5e6;
    border-left: 4px solid #c9621e;
    border-radius: 3px;
  }
  .fp-doc-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #5a4a35;
  }
  .fp-doc-title.fp-doc-title-empty {
    color: #a79974;
    font-weight: 500;
    font-style: italic;
  }
  .fp-doc-description {
    margin: 4px 0 0 0;
    color: #7a6a55;
    font-size: 0.93rem;
    line-height: 1.4;
    font-style: italic;
  }

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
    max-width: 780px; width: 90%; max-height: 80vh;
    display: flex; flex-direction: column;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }
  .fp-modal-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px;
  }
  .fp-modal-header h3 { margin: 0; color: #5a4a35; }
  .fp-modal-subheader {
    margin: 0 0 2px 0; font-size: 0.95rem;
    color: #5a4a35; font-weight: 600;
  }
  .fp-modal-close {
    background: none; border: none; font-size: 1.6rem;
    line-height: 1; padding: 0 8px; cursor: pointer;
    color: #7a6a55;
  }
  .fp-modal-close:hover { color: #c9621e; }
  .fp-modal-close:disabled { color: #d6c4a3; cursor: not-allowed; }

  /* URL-display modal (first publish, sub-node creation, regenerate) */
  .fp-urls-lede { margin: 0 0 12px 0; color: #5a4a35; font-size: 0.95rem; }
  .fp-url-row { margin-bottom: 14px; }
  .fp-url-label { display: block; font-weight: 600; color: #5a4a35; margin-bottom: 4px; font-size: 0.95rem; }
  .fp-url-label .fp-muted { font-weight: 400; font-size: 0.85rem; color: #7a6a55; margin-left: 4px; }
  .fp-url-line { display: flex; gap: 6px; align-items: center; }
  .fp-url-line input {
    flex: 1;
    padding: 8px 10px;
    font-family: ui-monospace, Menlo, monospace;
    font-size: 0.85rem;
    color: #5a3e1f;
    background: #faf5e6;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
  }
  .fp-url-line input:focus { outline: 2px solid #c9a76a; outline-offset: -1px; }
  .fp-url-copy {
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #c9a76a;
    color: #5a3e1f;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    font-size: 0.9rem;
  }
  .fp-url-copy:hover { background: #f2e6c9; }
  .fp-urls-warning {
    margin-top: 12px;
    padding: 12px 16px;
    background: #fee2e2;
    color: #7a1c1c;
    border-left: 4px solid #dc2626;
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: 1.45;
  }
  .fp-urls-actions {
    display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
    margin-top: 16px;
  }
  .fp-url-mail {
    padding: 6px 12px;
    background: #fff;
    border: 1px solid #c9a76a;
    color: #5a3e1f;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9rem;
  }
  .fp-url-mail:hover { background: #f2e6c9; }
  .fp-urls-confirm {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.95rem; color: #5a4a35;
    margin-left: auto;
  }
  #fp-urls-done {
    padding: 8px 20px;
    background: #8a3a1a; color: #fff;
    border: none; border-radius: 4px;
    cursor: pointer; font: inherit; font-weight: 600;
  }
  #fp-urls-done:hover:not(:disabled) { background: #6a2a10; }
  #fp-urls-done:disabled { background: #d6c4a3; color: #fff; cursor: not-allowed; }

  /* Library bar — shown at the top of the page whenever a ?node= URL
     was used to open a server-backed library. */
  .fp-library-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 10px;
    padding: 10px 16px;
    margin-bottom: 12px;
    background: #f2e6c9;
    border: 1px solid #c9a76a;
    border-radius: 6px;
    font-size: 0.95rem;
  }
  .fp-library-bar[hidden] { display: none; }

  /* Add-library-by-URL row inside File → Open modal */
  .fp-add-lib-row {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }
  .fp-add-lib-row input {
    flex: 1;
    padding: 6px 8px;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    font: inherit;
    font-size: 0.9rem;
    color: #5a3e1f;
    background: #faf5e6;
  }
  .fp-add-lib-row input:focus { outline: 2px solid #c9a76a; outline-offset: -1px; }
  .fp-add-lib-row button {
    padding: 6px 14px;
    background: #fff;
    border: 1px solid #c9a76a;
    color: #5a3e1f;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
  }
  .fp-add-lib-row button:hover { background: #f2e6c9; }
  .fp-add-lib-row button:disabled { opacity: 0.5; cursor: not-allowed; }
  .fp-library-crumb {
    color: #5a3e1f;
    font-weight: 600;
    flex: 1 1 100%;
    min-width: 0;
    line-height: 1.35;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .fp-library-mode {
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .fp-library-mode.edit { background: #dcfce7; color: #14532d; }
  .fp-library-mode.view { background: #dbeafe; color: #1e3a8a; }
  .fp-library-browse {
    padding: 5px 12px;
    background: #fff;
    border: 1px solid #c9a76a;
    color: #5a3e1f;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    font-size: 0.9rem;
  }
  .fp-library-browse:hover { background: #f2e6c9; }
  .fp-library-primary {
    background: #8a3a1a;
    color: #fff;
    border-color: #6a2a10;
  }
  .fp-library-primary:hover { background: #6a2a10; color: #fff; }
  .fp-library-primary:disabled {
    background: #d6c4a3;
    border-color: #d6c4a3;
    color: #fff;
    cursor: not-allowed;
  }
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
    cursor: pointer;
  }
  .fp-file-row:last-child { border-bottom: none; }
  .fp-file-row:hover { background: #faf5e6; }
  .fp-file-row:focus {
    outline: 2px solid #c9621e;
    outline-offset: -2px;
    background: #faf5e6;
  }
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

  /* Decisions/Uncertainties textareas reuse the metrics textarea styling. */
  #fp-decisions-input,
  #fp-uncertainties-input {
    width: 100%; min-height: 180px;
    padding: 8px 10px;
    border: 1px solid #c9b891; border-radius: 4px;
    font-family: inherit; font-size: 0.95rem;
    resize: vertical;
    box-sizing: border-box;
    background: #fff;
    color: #333;
  }

  /* Impact matrix — table with clickable cells and draggable rows.
     Wrapper shrinks to the table's natural width so a small matrix
     (few metrics or few rows) doesn't leave a wide empty band next
     to the last column. If the natural width exceeds the panel's
     width, max-width: 100% caps it and overflow-x: auto scrolls. */
  .fp-matrix-wrapper {
    width: fit-content;
    max-width: 100%;
    overflow-x: auto;
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
    padding: 3px 6px;
    vertical-align: middle;
    line-height: 1.2;
  }
  table.fp-matrix thead th {
    background: #faf5e6;
    color: #5a4a35;
    font-weight: 600;
    font-size: 0.85rem;
    position: sticky; top: 0; z-index: 1;
  }
  .fp-matrix-decision-header { min-width: 120px; text-align: left; }
  .fp-matrix-metric-header {
    min-width: 52px; max-width: 100px;
    text-align: center;
    /* Prefer to break on <wbr> markers (which we insert after each
       "/" in headers via JS) rather than mid-word. If the header
       still overflows, overflow-wrap: break-word breaks anywhere
       as a fallback so nothing spills outside the cell. */
    word-break: normal;
    overflow-wrap: break-word;
    line-height: 1.05;
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
    min-width: 34px; height: 24px;
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
    max-width: 220px;
    /* Prefer breaks at spaces, hyphens, and the <wbr> markers we
       insert after slashes — only break mid-word as a last resort
       when a single word is too long to fit the column. */
    word-break: normal;
    overflow-wrap: break-word;
    line-height: 1.2;
  }

  /* Drag handle (grip) column */
  .fp-matrix-grip {
    text-align: center;
    color: #7a6a55;
    cursor: grab;
    user-select: none;
    width: 20px;
    background: #faf5e6;
    font-size: 0.95rem;
  }
  .fp-matrix-grip:active { cursor: grabbing; }
  tr.fp-matrix-dragging { opacity: 0.4; }
  tr.fp-matrix-drop-above > td { box-shadow: inset 0 3px 0 0 #c9621e; }
  tr.fp-matrix-drop-below > td { box-shadow: inset 0 -3px 0 0 #c9621e; }

  /* Drill-in button — appears on decision rows only, right after the
     decision name. Faded until the decision has sub-decisions, then
     highlighted so users can see which decisions have a sub-tree. */
  .fp-drill-btn {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 6px;
    font-size: 0.82rem;
    line-height: 1.3;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    background: #faf5e6;
    color: #8a6a3a;
    cursor: pointer;
    vertical-align: 1px;
    white-space: nowrap;
  }
  .fp-drill-btn:hover { background: #f2e6c9; color: #5a3e1f; }
  .fp-drill-btn-has {
    background: #f2e6c9;
    color: #5a3e1f;
    font-weight: 600;
    border-color: #c9a76a;
  }
  .fp-drill-inline {
    display: inline-block;
    padding: 0 5px;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    background: #faf5e6;
    color: #8a6a3a;
    font-size: 0.85em;
  }
  .fp-drill-hint { margin-top: -0.4rem; }

  /* Breadcrumb strip — visible only when drilled below the top level. */
  .fp-decision-breadcrumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 8px;
    margin: 6px 0 12px;
    padding: 8px 12px;
    background: #faf5e6;
    border: 1px solid #e6d8bf;
    border-radius: 6px;
    font-size: 0.95rem;
  }
  .fp-decision-breadcrumb[hidden] { display: none; }
  .fp-decision-breadcrumb .fp-crumb {
    background: transparent;
    border: none;
    padding: 2px 6px;
    color: #8a3a1a;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    border-radius: 3px;
  }
  .fp-decision-breadcrumb .fp-crumb:hover { background: #f2e6c9; }
  .fp-decision-breadcrumb .fp-crumb-current {
    padding: 2px 6px;
    color: #5a3e1f;
    font-weight: 700;
  }
  .fp-decision-breadcrumb .fp-crumb-sep {
    color: #a8926a;
    padding: 0 2px;
    font-weight: 700;
  }
  .fp-decision-breadcrumb .fp-crumb-back {
    margin-left: auto;
    background: #fff;
    border: 1px solid #c9a76a;
    color: #5a3e1f;
    padding: 3px 10px;
    font: inherit;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .fp-decision-breadcrumb .fp-crumb-back:hover { background: #f2e6c9; }

  /* Per-level scope field — only shown when drilled in. */
  .fp-decision-subscope {
    margin: 4px 0 14px;
    padding: 10px 12px;
    background: #fdf9ec;
    border: 1px dashed #d6c4a3;
    border-radius: 6px;
  }
  .fp-decision-subscope label {
    display: block;
    font-weight: 600;
    color: #5a3e1f;
    margin-bottom: 4px;
    font-size: 0.95rem;
  }
  .fp-decision-subscope textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 6px 8px;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    background: #fff;
    font: inherit;
    resize: vertical;
  }

  @media print {
    /* Keep the matrix on the printed page — it's a deliverable too. */
    .fp-matrix-grip { display: none; }
    .fp-drill-btn { display: none; }
    .fp-decisions-panel,
    .fp-uncertainties-panel { display: none !important; }
  }

  .fp-grid {
    display: grid;
    grid-template-columns: minmax(240px, 1fr) minmax(340px, 2fr);
    gap: 24px;
    align-items: start;
  }
  /* Decisions/matrix and Uncertainties/matrix sections stack the list
     panel above a full-width matrix. A side-by-side layout starved the
     matrix of horizontal room once you had many metrics; users need
     to see as many H/M/L/N columns as possible without scrolling. */
  .fp-grid-narrow {
    display: block;
  }
  .fp-grid-narrow > .fp-panel + .fp-panel {
    margin-top: 16px;
  }
  /* The list textareas don't need to be full-width in the stacked
     layout — a modest width keeps the section visually anchored on
     the left without wasting vertical space. */
  .fp-grid-narrow .fp-decisions-panel,
  .fp-grid-narrow .fp-uncertainties-panel {
    max-width: 480px;
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
  /* Only tint the background on hover for UNCOLORED chips. A colored
     chip keeps its flavor color and only gets a subtle brightness dip
     on hover — otherwise the tan hover would mask the new color the
     click just applied until the cursor left the chip. */
  .fp-chip:not([data-color]):hover { background: #faf5e6; }
  .fp-chip.fp-dragging { opacity: 0.4; cursor: grabbing; }

  /* Scope-of-the-decision-frame input — sits at the top of the tool,
     one-line text field that spans the content width. Long entries scroll
     horizontally inside the input (native input[type=text] behavior). */
  .fp-scope-input {
    width: 100%; box-sizing: border-box;
    padding: 8px 12px;
    font-family: inherit; font-size: 0.95rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #333;
    margin: 8px 0 24px 0;
  }
  .fp-scope-input:focus {
    outline: none; border-color: #c9621e;
    box-shadow: 0 0 0 2px rgba(201, 98, 30, 0.15);
  }

  /* Chip flavor colors — cycled by clicking a chip in the metrics list
     or pyramid. Legend swatches share these selectors so the legend and
     the live chips always stay in sync. */
  .fp-chip[data-color="max"],
  .fp-legend-swatch[data-color="max"] {
    background: #4d9d5f; color: #fff; border-color: #3d8a4e;
  }
  .fp-chip[data-color="min"],
  .fp-legend-swatch[data-color="min"] {
    background: #cf5a55; color: #fff; border-color: #b34842;
  }
  .fp-chip[data-color="target"],
  .fp-legend-swatch[data-color="target"] {
    background: #8b60a5; color: #fff; border-color: #74508b;
  }
  .fp-chip[data-color="limit-floor"],
  .fp-legend-swatch[data-color="limit-floor"] {
    background: #cae6ce; color: #2d5c3a; border-color: #a5cfab;
  }
  .fp-chip[data-color="limit-ceiling"],
  .fp-legend-swatch[data-color="limit-ceiling"] {
    background: #efcdca; color: #6c2e2a; border-color: #cfaba7;
  }
  .fp-chip[data-color]:hover { filter: brightness(0.95); }

  /* Legend for the chip colors — lives inside the Metrics panel, right
     below the textarea. Two rows: max / min / target on top, then
     limit-floor / limit-ceiling on the bottom (aligned so light green
     sits under dark green, light red sits under dark red). */
  .fp-chip-legend {
    margin: 10px 0;
    padding: 8px 10px;
    background: #fdfaf1;
    border: 1px solid #eae0c8;
    border-radius: 4px;
  }
  .fp-chip-legend-help {
    font-size: 0.82rem;
    color: #7a6a55;
    margin: 0 0 6px 0;
  }
  .fp-chip-legend-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
    row-gap: 6px;
  }
  .fp-legend-swatch {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 4px 8px;
    border: 1px solid transparent; border-radius: 20px;
    font-size: 0.82rem; font-weight: 500;
    text-align: center;
    cursor: help; user-select: none;
    min-width: 0;
  }

  @media print {
    .fp-toolbar, .fp-metrics-panel, .fp-muted { display: none !important; }
    .fp-drop-zone:empty::before { display: none; }
    .fp-grid { grid-template-columns: 1fr; }
    .fp-pyramid { max-width: 6in; margin: 0 auto; }
    .fp-drop-zone { border: 1px solid #999; background: transparent; }
    .fp-chip { border-color: #333; box-shadow: none; }
  }

  /* ── Admin bar (visible only when ?admin=1) ───────────────── */
  .fp-admin-bar {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    background: #2b2418; color: #f5e5b5;
    padding: 8px 14px; border-radius: 4px;
    margin: 12px 0; font-size: 0.9rem;
  }
  .fp-admin-badge {
    background: #c9621e; color: #fff; font-weight: 700; font-size: 0.75em;
    padding: 3px 8px; border-radius: 3px; letter-spacing: 0.5px;
  }
  .fp-admin-status { flex: 1; color: #e6d9b8; }
  .fp-admin-status.fp-admin-status-ok { color: #a0d99f; }
  .fp-admin-status.fp-admin-status-warn { color: #ffb84a; }
  .fp-admin-bar button {
    padding: 4px 10px; font-size: 0.85rem;
    background: #4a3f2c; color: #f5e5b5;
    border: 1px solid #6a5a3f; border-radius: 3px;
    cursor: pointer;
  }
  .fp-admin-bar button:hover { background: #5a4d35; }
  .fp-admin-actions {
    display: flex; gap: 4px; margin-left: 8px;
  }
  .fp-admin-actions button {
    padding: 3px 8px; font-size: 0.78rem; font-weight: 600;
    background: #c9621e; color: #fff; border: 1px solid #a24e15;
    border-radius: 3px; cursor: pointer;
  }
  .fp-admin-actions button:hover:not(:disabled) { background: #a24e15; }
  .fp-admin-actions button.fp-admin-danger {
    background: #fff; color: #a1250f; border-color: #d99f96;
  }
  .fp-admin-actions button.fp-admin-danger:hover:not(:disabled) { background: #ffe9e5; }
  .fp-admin-actions button:disabled { opacity: 0.55; cursor: not-allowed; }

  /* ── Per-matrix controls (First draft / Reset) ────────────── */
  .fp-matrix-controls {
    display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    margin: 4px 0 8px 0;
  }
  .fp-matrix-controls button {
    padding: 4px 12px; font-size: 0.85rem;
    background: #fff; border: 1px solid #c9b891; border-radius: 4px;
    cursor: pointer; color: #5a4a35;
  }
  .fp-matrix-controls button:hover:not(:disabled) { background: #faf5e6; }
  .fp-matrix-controls button:disabled { opacity: 0.55; cursor: not-allowed; }
  .fp-matrix-controls button.fp-matrix-draft {
    background: #f5e5b5; border-color: #c9621e; color: #5a4a35;
    font-weight: 600;
  }
  .fp-matrix-controls button.fp-matrix-draft:hover:not(:disabled) {
    background: #f0d890;
  }
  .fp-matrix-ai-note {
    font-size: 0.82rem; color: #8a8072; font-style: italic;
    padding: 2px 6px;
  }

  /* ── Ask Professor Powell card ─────────────────────────────── */
  .fp-bot-card {
    background: #faf5e6;
    border: 1px solid #c9b891;
    border-radius: 6px;
    padding: 16px;
    margin: 16px 0 32px 0;
  }
  .fp-bot-row { margin-bottom: 12px; }
  .fp-bot-row textarea {
    width: 100%; box-sizing: border-box;
    padding: 8px; font-family: inherit; font-size: 0.95rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #3a2f22;
    resize: vertical;
  }
  .fp-bot-row-inline {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
    margin-bottom: 12px;
  }
  @media (max-width: 640px) {
    .fp-bot-row-inline { grid-template-columns: 1fr; }
  }
  .fp-bot-inline { display: flex; flex-direction: column; }
  .fp-bot-label {
    font-size: 0.9rem; font-weight: 600; color: #5a4a35;
    margin-bottom: 4px;
  }
  .fp-bot-inline input[type="url"],
  .fp-bot-inline input[type="file"] {
    width: 100%; box-sizing: border-box;
    padding: 6px 8px; font-family: inherit; font-size: 0.9rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #3a2f22;
  }
  .fp-bot-controls {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; flex-wrap: wrap; margin: 8px 0;
  }
  .fp-bot-size {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.9rem; color: #5a4a35;
  }
  .fp-bot-size select {
    padding: 4px 6px; font-family: inherit; font-size: 0.9rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #3a2f22;
  }
  .fp-bot-actions { display: flex; gap: 8px; }
  .fp-bot-actions button {
    padding: 8px 16px; font-size: 0.95rem;
    background: #c9621e; color: #fff;
    border: 1px solid #a24e15; border-radius: 4px;
    cursor: pointer; font-weight: 600;
  }
  .fp-bot-actions button:hover:not(:disabled) { background: #a24e15; }
  .fp-bot-actions button:disabled { opacity: 0.55; cursor: not-allowed; }
  .fp-bot-actions button#fp-bot-clear {
    background: #fff; color: #5a4a35; border-color: #c9b891; font-weight: 500;
  }
  .fp-bot-actions button#fp-bot-clear:hover:not(:disabled) { background: #f0e5c8; }
  .fp-bot-caveat {
    margin: 6px 0 0 0; font-size: 0.85rem; color: #7a6a55;
  }
  .fp-bot-status {
    margin-top: 10px; min-height: 1.2em; font-size: 0.9rem; color: #5a4a35;
  }
  .fp-bot-status.fp-bot-status-working {
    color: #c9621e; font-weight: 600;
  }
  .fp-bot-status.fp-bot-status-error {
    color: #a1250f; font-weight: 600;
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
    title: '', scope: '', description: '',
    metrics: [], assignments: {}, chipColors: {},
    decisions: [], matrix: {}, subframes: {},
    uncertainties: [], uMatrix: {},
  };
  let currentName = null;   // which named file, if any, is currently loaded
  // Current position in the decision tree. Empty array = top level.
  // Each segment is a decision name within its parent frame.
  let currentPath = [];

  // Impact-matrix configs — same UI, two entities. Kind key ('decision'
  // or 'uncertainty') selects which state fields to read/write, which
  // DOM containers to render into, and which labels to show.
  const MATRIX = {
    decision: {
      listKey:   'decisions',
      matrixKey: 'matrix',
      wrapSel:   '#fp-matrix',
      textareaSel: '#fp-decisions-input',
      headerLabel:  'Decision',
      singularLower:'decision',
      pluralLower:  'decisions',
    },
    uncertainty: {
      listKey:   'uncertainties',
      matrixKey: 'uMatrix',
      wrapSel:   '#fp-umatrix',
      textareaSel: '#fp-uncertainties-input',
      headerLabel:  'Uncertainty',
      singularLower:'uncertainty',
      pluralLower:  'uncertainties',
    },
  };

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ── Persistence — autosaved working state ───────────────────
  function autoSave() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { /* private mode / quota — ignore */ }
  }
  // Fill in any missing fields on a partial state blob (URL-shared
  // links or files saved before newer fields existed).
  function normalizeState(s) {
    return {
      title:         (s && typeof s.title === 'string')       ? s.title        : '',
      scope:         (s && typeof s.scope === 'string')       ? s.scope        : '',
      description:   (s && typeof s.description === 'string') ? s.description  : '',
      metrics:       Array.isArray(s && s.metrics)            ? s.metrics      : [],
      assignments:   (s && s.assignments)                ? s.assignments   : {},
      chipColors:    (s && s.chipColors)                 ? s.chipColors    : {},
      decisions:     Array.isArray(s && s.decisions)     ? s.decisions     : [],
      matrix:        (s && s.matrix)                     ? s.matrix        : {},
      subframes:     normalizeSubframes(s && s.subframes),
      uncertainties: Array.isArray(s && s.uncertainties) ? s.uncertainties : [],
      uMatrix:       (s && s.uMatrix)                    ? s.uMatrix       : {},
    };
  }
  // A sub-frame tree — each key is a decision name at its parent
  // level, each value is another frame with its own decisions, matrix,
  // optional per-level scope, and (recursively) subframes.
  function normalizeSubframes(sf) {
    const out = {};
    if (!sf || typeof sf !== 'object') return out;
    for (const k of Object.keys(sf)) {
      const f = sf[k];
      if (!f || typeof f !== 'object') continue;
      out[k] = {
        scope:     (typeof f.scope === 'string') ? f.scope : '',
        decisions: Array.isArray(f.decisions)    ? f.decisions : [],
        matrix:    (f.matrix && typeof f.matrix === 'object') ? f.matrix : {},
        subframes: normalizeSubframes(f.subframes),
      };
    }
    return out;
  }
  // ── Decision-tree navigation ────────────────────────────────
  // The top-level state IS the root frame (it carries decisions,
  // matrix, and subframes at that level). Deeper frames live in
  // state.subframes[name] recursively; each carries the same shape
  // plus an optional per-level scope. Uncertainties are shared across
  // levels — they only exist at the top level for now.
  function getFrameAt(path) {
    let f = state;
    for (const name of path) {
      const next = f.subframes && f.subframes[name];
      if (!next) return null;
      f = next;
    }
    return f;
  }
  function currentFrame() {
    return getFrameAt(currentPath) || state;
  }
  function frameFor(kind) {
    return kind === 'decision' ? currentFrame() : state;
  }
  function atTopLevel() { return currentPath.length === 0; }
  function ensureSubframe(parentFrame, name) {
    if (!parentFrame.subframes) parentFrame.subframes = {};
    if (!parentFrame.subframes[name]) {
      parentFrame.subframes[name] = {
        scope: '', decisions: [], matrix: {}, subframes: {},
      };
    }
    return parentFrame.subframes[name];
  }
  function subDecisionCount(parentFrame, name) {
    const sf = parentFrame.subframes && parentFrame.subframes[name];
    return (sf && Array.isArray(sf.decisions)) ? sf.decisions.length : 0;
  }
  function drillInto(name) {
    const parent = currentFrame();
    if (!parent.decisions || parent.decisions.indexOf(name) < 0) return;
    ensureSubframe(parent, name);
    currentPath = currentPath.concat([name]);
    refreshDecisionUI();
    autoSave();
  }
  function navigateToPath(newPath) {
    currentPath = Array.isArray(newPath) ? newPath.slice() : [];
    refreshDecisionUI();
  }
  function goUpOneLevel() {
    if (atTopLevel()) return;
    navigateToPath(currentPath.slice(0, -1));
  }
  // When decisions at the current level are renamed or deleted via
  // the textarea, keep the subframes map keyed by the new names so
  // sub-trees survive a wording tweak (and drop cleanly on delete).
  function reconcileSubframes(parentFrame, renames, deletes) {
    if (!parentFrame.subframes) return;
    for (const [from, to] of renames) {
      if (from === to) continue;
      if (parentFrame.subframes[from]) {
        // If the target key already exists (rare — user typed over
        // an existing name), keep the target and drop the source
        // rather than silently clobbering.
        if (!parentFrame.subframes[to]) {
          parentFrame.subframes[to] = parentFrame.subframes[from];
        }
        delete parentFrame.subframes[from];
      }
    }
    for (const name of deletes) {
      delete parentFrame.subframes[name];
    }
  }
  // Refresh everything that depends on the currently-viewed frame:
  // decisions textarea, breadcrumb, per-level scope field, and the
  // decision impact matrix. Called on drill-in, drill-out, load, new,
  // reset, import, and applyFraming.
  function refreshDecisionUI() {
    const frame = currentFrame();
    const ta = $('#fp-decisions-input');
    if (ta) ta.value = (frame.decisions || []).join('\n');
    renderBreadcrumb();
    renderSubScopeField();
    renderImpactMatrix('decision');
  }
  function renderBreadcrumb() {
    const wrap = $('#fp-decision-breadcrumb');
    if (!wrap) return;
    wrap.innerHTML = '';
    if (atTopLevel()) { wrap.hidden = true; return; }
    wrap.hidden = false;
    const top = document.createElement('button');
    top.type = 'button';
    top.className = 'fp-crumb';
    top.textContent = 'Top';
    top.title = 'Back to the top-level decisions';
    top.addEventListener('click', () => navigateToPath([]));
    wrap.appendChild(top);
    for (let i = 0; i < currentPath.length; i++) {
      const sep = document.createElement('span');
      sep.className = 'fp-crumb-sep';
      sep.textContent = '›';
      wrap.appendChild(sep);
      const isLast = i === currentPath.length - 1;
      if (isLast) {
        const cur = document.createElement('span');
        cur.className = 'fp-crumb-current';
        cur.textContent = currentPath[i];
        wrap.appendChild(cur);
      } else {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'fp-crumb';
        btn.textContent = currentPath[i];
        const jumpTo = currentPath.slice(0, i + 1);
        btn.addEventListener('click', () => navigateToPath(jumpTo));
        wrap.appendChild(btn);
      }
    }
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'fp-crumb-back';
    back.textContent = '↑ Up one level';
    back.title = 'Go back to the parent decision list';
    back.addEventListener('click', goUpOneLevel);
    wrap.appendChild(back);
  }
  function renderSubScopeField() {
    const wrap = $('#fp-decision-subscope');
    const input = $('#fp-decision-subscope-input');
    if (!wrap || !input) return;
    if (atTopLevel()) { wrap.hidden = true; return; }
    wrap.hidden = false;
    input.value = currentFrame().scope || '';
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
      if (cur) {
        currentName = cur;
        // Keep the banner in sync with the restored save-target on
        // page reload; without this the doc-title stays empty until
        // the user re-opens something from File > Open.
        docTitle = cur;
      }
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
  // The banner's display title is decoupled from currentName so a
  // public example can show its title in the banner WITHOUT gaining
  // a save-target (Save on a public example should still prompt
  // Save as…, not silently overwrite the source in the repo).
  let docTitle = null;
  function setCurrentName(name) {
    currentName = name || null;
    try {
      if (currentName) localStorage.setItem(CURRENT_KEY, currentName);
      else localStorage.removeItem(CURRENT_KEY);
    } catch (_) { /* ignore */ }
    // A named save also becomes the display title (unless one was
    // set explicitly via setDocTitle beforehand — that survives).
    if (currentName) docTitle = currentName;
    renderCurrentFileLabel();
    // Duplicate only makes sense when a named document is loaded.
    const dupBtn = $('#fp-menu-duplicate');
    if (dupBtn) dupBtn.disabled = !currentName;
  }
  function setDocTitle(text) {
    docTitle = text || null;
    renderCurrentFileLabel();
  }
  function renderCurrentFileLabel() {
    const el = $('#fp-doc-title');
    if (!el) return;
    if (docTitle) {
      el.textContent = docTitle;
      el.classList.remove('fp-doc-title-empty');
    } else {
      el.textContent = 'No document loaded — use File > Open to load one, or File > Save to my library… to save the current work.';
      el.classList.add('fp-doc-title-empty');
    }
    // Description sits just below the title inside the same banner.
    // Hidden entirely when there's nothing to show (no doc, or a doc
    // that hasn't had a description written yet).
    const dEl = $('#fp-doc-description');
    if (dEl) {
      const showDesc = !!docTitle && !!state.description;
      dEl.textContent = showDesc ? state.description : '';
      dEl.hidden = !showDesc;
    }
  }
  function snapshotForSave() {
    return {
      title: state.title,
      scope: state.scope,
      description: state.description,
      metrics: state.metrics,
      assignments: state.assignments,
      chipColors: state.chipColors,
      decisions: state.decisions,
      matrix: state.matrix,
      subframes: state.subframes,
      uncertainties: state.uncertainties,
      uMatrix: state.uMatrix,
      savedAt: new Date().toISOString(),
    };
  }
  function saveFile() {
    if (!currentName) return saveAsFile();   // no current name → prompt
    // First-Save-of-a-freshly-named-doc — if there's no description yet,
    // prompt for a one-liner so the entry has an abstract in the library.
    // Subsequent Saves don't ask again (description is already set).
    if (!state.description) {
      const desc = window.prompt(
        'Short description for this decision (1–2 lines shown under the title in the library):',
        ''
      );
      if (desc == null) return;   // cancelled
      state.description = desc.trim();
    }
    const files = readFiles();
    files[currentName] = snapshotForSave();
    writeFiles(files);
    renderCurrentFileLabel();
    flashStatus('Saved to "' + currentName + '".');
  }
  // Best-effort short name when we have no explicit title/currentName
  // /banner. Used as the LAST-resort pre-fill for Save-as so the prompt
  // is never empty (an empty prompt lets Chrome autofill it with the
  // current page URL, which is confusing).
  function deriveSuggestedName() {
    // First non-empty decision, capped at ~5 words.
    if (Array.isArray(state.decisions) && state.decisions.length) {
      const first = String(state.decisions[0]).trim();
      if (first) return first.split(/\s+/).slice(0, 5).join(' ');
    }
    // Tier-1 metric name.
    if (state.assignments && Array.isArray(state.metrics)) {
      for (const m of state.metrics) {
        if (Number(state.assignments[m]) === 1) return String(m).trim();
      }
    }
    // Date-stamped placeholder — enough to defeat URL autofill.
    return 'New framing ' + new Date().toISOString().slice(0, 10);
  }
  function saveAsFile() {
    // Prompt pre-fill priority:
    //   1. currentName if the doc already has a save-target,
    //   2. otherwise state.title (the bot's compact case name),
    //   3. otherwise a cleaned-up version of the banner's docTitle so
    //      an AI draft ("AI draft — <source>") or JSON import
    //      ("Imported — <basename>") pre-fills as just <source> /
    //      <basename>,
    //   4. finally a smart fallback derived from state so the box is
    //      NEVER empty — an empty prompt lets some browsers autofill
    //      it with the current page URL, which is very confusing.
    const cleanedFromBanner = docTitle
      ? String(docTitle)
          .replace(/^\s*AI draft\s*[—-]\s*/i, '')
          .replace(/^\s*Imported\s*[—-]\s*/i, '')
          .replace(/\.(pdf|docx|txt|md|json)$/i, '')
          .trim()
      : '';
    // Never pre-fill with just the AskPP source-less default ("AI draft
    // — Ask Professor Powell (chatbot)" strips down to "Ask Professor
    // Powell (chatbot)", which isn't a case name).
    const cleanedFinal = /^ask professor powell/i.test(cleanedFromBanner)
      ? '' : cleanedFromBanner;
    const suggested = currentName
      || (state.title && state.title.trim())
      || cleanedFinal
      || deriveSuggestedName();
    const raw = window.prompt('Save this decision as:', suggested);
    if (raw == null) return;
    const name = raw.trim();
    if (!name) return;
    const files = readFiles();
    if (files[name] && !window.confirm('"' + name + '" already exists. Overwrite it?')) return;
    // Description prompt (pre-fills with whatever's on the current state
    // so a rename doesn't force re-typing the abstract).
    const descRaw = window.prompt(
      'Short description (1–2 lines shown under the title in the library):',
      state.description || ''
    );
    if (descRaw == null) return;
    state.description = descRaw.trim();
    files[name] = snapshotForSave();
    writeFiles(files);
    setCurrentName(name);
    renderCurrentFileLabel();
    flashStatus('Saved as "' + name + '".');
  }
  // Duplicate — copy the current document under a new name that
  // auto-appends " (N)". If the current name already ends with
  // " (N)", the next available N is used; otherwise it starts at
  // (2). Sets the current name to the new copy so subsequent Save
  // clicks write to the copy, not the original.
  function duplicateFile() {
    if (!currentName) {
      flashStatus('Nothing loaded — use Save as… first.');
      return;
    }
    const files = readFiles();
    // Strip trailing " (N)" so re-duplicating a copy walks the
    // counter forward instead of piling suffixes.
    const m = currentName.match(/^(.*?)\s*\((\d+)\)\s*$/);
    const baseName = m ? m[1] : currentName;
    let n = m ? parseInt(m[2], 10) + 1 : 2;
    while (files[baseName + ' (' + n + ')']) n++;
    const newName = baseName + ' (' + n + ')';
    files[newName] = snapshotForSave();
    writeFiles(files);
    setCurrentName(newName);
    flashStatus('Duplicated as "' + newName + '".');
  }

  function loadFile(name) {
    const files = readFiles();
    const file = files[name];
    if (!file) return;
    state = normalizeState(file);
    currentPath = [];                                       // fresh doc → top level
    setCurrentName(name);
    $('#fp-scope-input').value         = state.scope || '';
    $('#fp-metrics-input').value       = state.metrics.join('\n');
    $('#fp-decisions-input').value     = state.decisions.join('\n');
    $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
    render();
    renderAllMatrices();
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
      .map(name => ({
        name,
        savedAt:     files[name].savedAt || null,
        description: files[name].description || '',
      }))
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
    // Hide the whole "Legacy local saves" section (header + blurb +
    // list) once the user has cleared it. Reappears if somehow a
    // localStorage entry shows up again (e.g. imported .json under
    // an old flow — shouldn't happen, but robust either way).
    const section = $('#fp-legacy-section');
    if (section) section.hidden = entries.length === 0;
    for (const { name, savedAt, description } of entries) {
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
      if (description) {
        const desc = document.createElement('span');
        desc.className = 'fp-file-meta';
        desc.style.display = 'block';
        desc.style.marginLeft = '0';
        desc.textContent = description;
        nameEl.appendChild(desc);
      }
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'fp-file-delete';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', (e) => {
        // Prevent the row-click loader from firing after Delete.
        e.stopPropagation();
        if (!window.confirm('Delete pyramid "' + name + '"? Cannot be undone.')) return;
        deleteFile(name);
        renderFileList();
      });
      // Admin-only: publish this private decision to the public library.
      let pubBtn = null;
      if (adminMode) {
        pubBtn = document.createElement('button');
        pubBtn.type = 'button';
        pubBtn.className = 'fp-admin-publish';
        pubBtn.textContent = 'Publish…';
        pubBtn.title = 'Publish this decision to the public library (writes a commit to GitHub)';
        pubBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          adminPublish(name);
        });
      }
      // The whole row is clickable — matches the hover highlight the
      // user already sees. Keyboard access via role=button + Enter/Space.
      row.tabIndex = 0;
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', 'Load ' + name);
      row.addEventListener('click', () => {
        loadFile(name);
        closeOpenModal();
      });
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          loadFile(name);
          closeOpenModal();
        }
      });
      row.appendChild(nameEl);
      if (pubBtn) {
        const actions = document.createElement('span');
        actions.className = 'fp-admin-actions';
        actions.appendChild(pubBtn);
        row.appendChild(actions);
      }
      row.appendChild(delBtn);
      list.appendChild(row);
    }
  }
  function openOpenModal() {
    renderFileList();
    renderServerLibraryList();
    renderPublicExamples();   // fires an async fetch; list fills in when it lands
    const m = $('#fp-open-modal');
    if (m) m.hidden = false;
  }

  // ── Import from JSON ────────────────────────────────────────
  // Counterpart to Export. Reads a .json file the user picks from
  // disk, validates it, and drops it into the workspace with a
  // doc-title of "Imported — <basename>". Does NOT set a save-
  // target — the user hits Save as… to keep it, matching the
  // public-example load pattern.
  function importFromJsonFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || ''));
        if (!parsed || !Array.isArray(parsed.metrics)) {
          throw new Error('This file does not look like a framing (no metrics array).');
        }
        state = normalizeState(parsed);
        currentPath = [];                                    // fresh doc → top level
        setCurrentName(null);
        const base = (file.name || 'file').replace(/\.json$/i, '');
        setDocTitle('Imported — ' + base);
        $('#fp-scope-input').value         = state.scope || '';
        $('#fp-metrics-input').value       = state.metrics.join('\n');
        $('#fp-decisions-input').value     = state.decisions.join('\n');
        $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
        render(); renderAllMatrices(); autoSave();
        flashStatus('Imported "' + file.name + '". Use Save as… to keep a copy.');
      } catch (err) {
        alert('Could not import this file:\n\n' + (err && err.message ? err.message : String(err)));
      }
    };
    reader.onerror = () => alert('Failed to read the file.');
    reader.readAsText(file);
  }
  function openImportPicker() {
    // Build a fresh hidden input each time so the same file can be
    // re-picked after a mistake (browsers suppress change events
    // when re-selecting an already-picked file on a re-used input).
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.style.display = 'none';
    input.addEventListener('change', () => {
      const f = input.files && input.files[0];
      if (f) importFromJsonFile(f);
      // Detach so we don't leak input nodes.
      setTimeout(() => { if (input.parentNode) input.parentNode.removeChild(input); }, 100);
    });
    document.body.appendChild(input);
    input.click();
  }

  // ── Export as JSON ──────────────────────────────────────────
  // Downloads the current document as a .json file. Useful for
  // sharing, backing up, or contributing to the public examples
  // library (drop the file into /assets/framing-examples/ and
  // add it to /assets/framing-examples/index.json).
  function exportCurrentDocument() {
    const blob = new Blob(
      [JSON.stringify(snapshotForSave(), null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (currentName || 'decision-framing') + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
    flashStatus('Exported to ' + a.download);
  }

  // ── Public examples ─────────────────────────────────────────
  // Curated decision problems live in /assets/framing-examples/
  // as JSON files, with an index.json manifest listing them. The
  // Open modal fetches the manifest and renders a Load button per
  // entry. Loading an example populates the workspace without
  // setting a current name — user must Save as… to keep a copy,
  // so the public example isn't accidentally overwritten.
  const EXAMPLES_BASE = '/assets/framing-examples/';
  async function fetchExamplesManifest() {
    try {
      // Cache-bust: GitHub Pages sets Cache-Control: max-age=600 on
      // static assets, and cache:'no-cache' doesn't reliably force CDN
      // revalidation quickly enough after an admin Publish/Update. A
      // per-load query param makes every request unique.
      const bust = new Date().getTime();
      const resp = await fetch(EXAMPLES_BASE + 'index.json?t=' + bust, { cache: 'reload' });
      if (!resp.ok) return [];
      const parsed = await resp.json();
      return Array.isArray(parsed && parsed.examples) ? parsed.examples : [];
    } catch (_) { return []; }
  }
  async function renderPublicExamples() {
    const list = $('#fp-example-list');
    if (!list) return;
    list.innerHTML = '';
    // Loading placeholder while the fetch is in flight.
    const loading = document.createElement('div');
    loading.style.padding = '10px 12px';
    loading.style.fontSize = '0.9rem';
    loading.style.color = '#7a6a55';
    loading.style.fontStyle = 'italic';
    loading.textContent = 'Loading…';
    list.appendChild(loading);
    const examples = await fetchExamplesManifest();
    list.innerHTML = '';
    if (examples.length === 0) {
      const empty = document.createElement('div');
      empty.style.padding = '10px 12px';
      empty.style.fontSize = '0.9rem';
      empty.style.color = '#7a6a55';
      empty.style.fontStyle = 'italic';
      empty.textContent = 'No public examples yet.';
      list.appendChild(empty);
      return;
    }
    for (const ex of examples) {
      const row = document.createElement('div');
      row.className = 'fp-file-row';
      const nameEl = document.createElement('span');
      nameEl.className = 'fp-file-name';
      nameEl.textContent = ex.title || ex.file;
      if (ex.description) {
        const meta = document.createElement('span');
        meta.className = 'fp-file-meta';
        meta.style.display = 'block';
        meta.style.marginLeft = '0';
        meta.textContent = ex.description;
        nameEl.appendChild(meta);
      }
      // Whole-row click loads (no separate Load button needed).
      row.tabIndex = 0;
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', 'Load ' + (ex.title || ex.file));
      row.addEventListener('click', () => loadPublicExample(ex));
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          loadPublicExample(ex);
        }
      });
      row.appendChild(nameEl);
      if (adminMode) {
        const actions = document.createElement('span');
        actions.className = 'fp-admin-actions';
        const renameBtn = document.createElement('button');
        renameBtn.type = 'button';
        renameBtn.textContent = 'Rename…';
        renameBtn.title = 'Rename this public example (title + description)';
        renameBtn.addEventListener('click', (e) => { e.stopPropagation(); adminRename(ex); });
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'fp-admin-danger';
        delBtn.textContent = 'Delete';
        delBtn.title = 'Remove this public example from the library';
        delBtn.addEventListener('click', (e) => { e.stopPropagation(); adminDelete(ex); });
        actions.appendChild(renameBtn);
        actions.appendChild(delBtn);
        row.appendChild(actions);
      }
      list.appendChild(row);
    }
  }
  async function loadPublicExample(ex) {
    try {
      const bust = new Date().getTime();
      const resp = await fetch(EXAMPLES_BASE + ex.file + '?t=' + bust, { cache: 'reload' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const data = await resp.json();
      state = normalizeState(data);
      currentPath = [];                                     // fresh doc → top level
      // The manifest carries the authoritative description for public
      // examples — use it in preference to whatever the JSON blob may
      // (or may not) include, so a case that was published without a
      // description in its JSON still gets the manifest's one-liner.
      if (ex.description) state.description = ex.description;
      // Treat the loaded example as a named framing so that plain Save
      // (after the user edits) writes to the private library under the
      // example's title, rather than falling through to Save-as… and
      // forcing a rename. This creates a private copy on first Save —
      // the shared public JSON file in the repo is not touched. If a
      // private entry with the same title already exists, Save will
      // overwrite it silently (that's the standard Save contract).
      setCurrentName(ex.title || ex.file);
      // Remember the manifest's description so a later Publish of edits
      // can pre-fill it even if the public entry was deleted first.
      if (ex.description) rememberPublishDescription(ex.title || ex.file, ex.description);
      $('#fp-scope-input').value         = state.scope || '';
      $('#fp-metrics-input').value       = state.metrics.join('\n');
      $('#fp-decisions-input').value     = state.decisions.join('\n');
      $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
      render(); renderAllMatrices(); autoSave();
      closeOpenModal();
      flashStatus('Loaded example "' + (ex.title || ex.file) + '". Use Save as… to keep a copy.');
    } catch (e) {
      alert('Failed to load example: ' + String(e && e.message || e));
    }
  }
  function closeOpenModal() {
    const m = $('#fp-open-modal');
    if (m) m.hidden = true;
  }

  // ── Admin mode (?admin=1) — library management via GitHub API ─
  // Warren enters admin mode by loading the page with ?admin=1 in
  // the URL. He pastes a fine-grained GitHub PAT once (stored in
  // localStorage on his machine only), and can then Publish saved
  // decisions into /assets/framing-examples/, or Rename/Delete
  // existing public examples. Every write is a real commit through
  // the GitHub Contents API — GitHub Pages then rebuilds in ~90s.
  const ADMIN_TOKEN_KEY = 'framing_admin_gh_token_v1';
  const ADMIN_REPO_OWNER = 'wbpowell328';
  const ADMIN_REPO_NAME = 'sda-website';
  const ADMIN_MANIFEST_PATH = 'assets/framing-examples/index.json';
  const ADMIN_FILES_DIR = 'assets/framing-examples';
  // Remember one-line public-library descriptions across sessions/deletes so
  // the Publish prompt can pre-fill them. Keyed by the framing's title.
  // Populated when a public example is loaded (from its manifest entry) and
  // updated on every successful publish/update.
  const PUBLISH_DESC_KEY = 'framing_publish_desc_v1';
  function readPublishDescCache() {
    try { const raw = localStorage.getItem(PUBLISH_DESC_KEY); return raw ? (JSON.parse(raw) || {}) : {}; }
    catch (_) { return {}; }
  }
  function rememberPublishDescription(title, description) {
    if (!title) return;
    try {
      const map = readPublishDescCache();
      map[title] = description || '';
      localStorage.setItem(PUBLISH_DESC_KEY, JSON.stringify(map));
    } catch (_) { /* ignore */ }
  }
  function recallPublishDescription(title) {
    if (!title) return '';
    return readPublishDescCache()[title] || '';
  }
  const ADMIN_PAT_HELP_URL =
    'https://github.com/settings/personal-access-tokens/new';
  let adminMode = false;

  function isAdminOn() {
    try {
      const u = new URL(window.location.href);
      return u.searchParams.get('admin') === '1';
    } catch (_) { return false; }
  }
  function getAdminToken() {
    try { return localStorage.getItem(ADMIN_TOKEN_KEY) || ''; }
    catch (_) { return ''; }
  }
  function setAdminToken(tok) {
    try {
      if (tok) localStorage.setItem(ADMIN_TOKEN_KEY, tok);
      else localStorage.removeItem(ADMIN_TOKEN_KEY);
    } catch (_) { /* ignore */ }
  }
  function ghHeaders() {
    const tok = getAdminToken();
    if (!tok) throw new Error('No GitHub token set. Use "Set token" in the admin bar.');
    return {
      'Authorization': 'Bearer ' + tok,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }
  function ghError(resp, bodyText) {
    // Translate common GitHub responses into something actionable.
    if (resp.status === 401) return 'GitHub rejected the token (401). It may be expired or wrong — set a new one.';
    if (resp.status === 403) return 'GitHub returned 403 — the token is valid but lacks write access to this repo. Regenerate with Contents: Read and write on sda-website.';
    if (resp.status === 404) return 'GitHub returned 404 — the file was not found (possibly deleted or renamed).';
    if (resp.status === 409 || resp.status === 422) return 'GitHub returned ' + resp.status + ' — likely a stale SHA. Reload and try again. Details: ' + bodyText.slice(0, 200);
    return 'GitHub request failed (' + resp.status + '): ' + bodyText.slice(0, 300);
  }
  // Base64 helpers that survive non-ASCII characters (metric names may
  // contain UTF-8). atob/btoa alone break on multibyte chars.
  function b64EncodeUtf8(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function b64DecodeUtf8(b64) {
    return decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))));
  }
  async function ghGetFile(path) {
    const url = 'https://api.github.com/repos/' + ADMIN_REPO_OWNER + '/'
      + ADMIN_REPO_NAME + '/contents/' + path;
    const resp = await fetch(url, { headers: ghHeaders() });
    const text = await resp.text();
    if (!resp.ok) throw new Error(ghError(resp, text));
    const data = JSON.parse(text);
    return { sha: data.sha, content: b64DecodeUtf8(data.content || '') };
  }
  async function ghPutFile(path, content, message, sha) {
    const url = 'https://api.github.com/repos/' + ADMIN_REPO_OWNER + '/'
      + ADMIN_REPO_NAME + '/contents/' + path;
    const body = { message, content: b64EncodeUtf8(content) };
    if (sha) body.sha = sha;
    const resp = await fetch(url, {
      method: 'PUT',
      headers: Object.assign({ 'Content-Type': 'application/json' }, ghHeaders()),
      body: JSON.stringify(body),
    });
    const text = await resp.text();
    if (!resp.ok) throw new Error(ghError(resp, text));
    return JSON.parse(text);
  }
  async function ghDeleteFile(path, message, sha) {
    const url = 'https://api.github.com/repos/' + ADMIN_REPO_OWNER + '/'
      + ADMIN_REPO_NAME + '/contents/' + path;
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: Object.assign({ 'Content-Type': 'application/json' }, ghHeaders()),
      body: JSON.stringify({ message, sha }),
    });
    const text = await resp.text();
    if (!resp.ok) throw new Error(ghError(resp, text));
    return JSON.parse(text);
  }
  function slugify(text) {
    return String(text || '').toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'framing';
  }
  function updateAdminStatus() {
    const el = $('#fp-admin-status');
    if (!el) return;
    const tok = getAdminToken();
    if (!tok) {
      el.textContent = 'No GitHub token set — click "Set / change GitHub token…" to enable publish/rename/delete.';
      el.className = 'fp-admin-status fp-admin-status-warn';
    } else {
      // Show only a fingerprint of the token, never the token itself.
      const prefix = tok.slice(0, 7);
      el.textContent = 'Token set (' + prefix + '…). Publish / Rename / Delete are enabled in the Open dialog.';
      el.className = 'fp-admin-status fp-admin-status-ok';
    }
  }
  function initAdmin() {
    if (!isAdminOn()) return;
    adminMode = true;
    document.body.classList.add('fp-admin-on');
    const bar = $('#fp-admin-bar');
    if (bar) bar.hidden = false;
    updateAdminStatus();
  }
  function promptForToken() {
    const cur = getAdminToken();
    const shown = cur ? '(a token is already set; leave blank to keep it, or paste a new one)' : '';
    const tok = window.prompt(
      'Paste your GitHub fine-grained PAT with Contents: Read and write on sda-website. ' + shown,
      ''
    );
    if (tok == null) return;                // cancelled
    const trimmed = tok.trim();
    if (!trimmed) return;                   // empty = keep existing
    setAdminToken(trimmed);
    updateAdminStatus();
    flashStatus('GitHub token saved to this browser only.');
  }
  function clearToken() {
    if (!getAdminToken()) return;
    if (!confirm('Clear the stored GitHub token from this browser?')) return;
    setAdminToken('');
    updateAdminStatus();
    flashStatus('Token cleared.');
  }
  function showAdminHelp() {
    alert(
      'Admin mode is on because ?admin=1 is on the URL.\n\n' +
      'To enable publish / rename / delete you need a GitHub fine-grained PAT.\n\n' +
      '1. Open ' + ADMIN_PAT_HELP_URL + ' in a new tab.\n' +
      '2. Repository access: Only select repositories → sda-website.\n' +
      '3. Permissions: Repository permissions → Contents → Read and write.\n' +
      '4. Generate the token, copy it, click "Set / change GitHub token…" here and paste it.\n\n' +
      'The token is stored only in this browser\'s localStorage and only sent to api.github.com. ' +
      'Anyone with access to this browser can use it — clear it when you\'re done on shared machines.\n\n' +
      'Every Publish / Rename / Delete makes a real commit to sda-website; ' +
      'GitHub Pages rebuilds in ~90 seconds.'
    );
  }

  // Publish a private saved decision into /assets/framing-examples/
  // via two commits: (1) create the JSON file, (2) update index.json.
  async function adminPublish(privateName) {
    const files = readFiles();
    const file = files[privateName];
    if (!file) { alert('Not found.'); return; }
    if (!getAdminToken()) { promptForToken(); if (!getAdminToken()) return; }

    const title = window.prompt('Public title (shown in the library):', privateName);
    if (title == null) return;
    const trimmedTitle = title.trim();
    if (!trimmedTitle) { alert('Title cannot be empty.'); return; }

    try {
      flashStatus('Checking public library…');
      const manifest = await ghGetFile(ADMIN_MANIFEST_PATH);
      const manifestObj = JSON.parse(manifest.content);
      const examples = manifestObj.examples || [];

      // Upsert detection — if a public entry with the exact same title
      // already exists, offer to update it in place rather than forcing
      // a delete-then-publish dance. Cancel falls through to create a
      // suffix-numbered separate copy (old behavior).
      let existingEntry = examples.find(e => e.title === trimmedTitle);
      let filename;
      let existingFileSha = null;
      let isUpdate = false;

      if (existingEntry) {
        const useExisting = window.confirm(
          'A public example titled "' + trimmedTitle + '" already exists.\n\n' +
          'OK — Update it in place (replaces the existing framing).\n' +
          'Cancel — Publish as a separate copy under "' + trimmedTitle + ' (2)".'
        );
        if (useExisting) {
          isUpdate = true;
          filename = existingEntry.file;
          try {
            const existingFile = await ghGetFile(ADMIN_FILES_DIR + '/' + filename);
            existingFileSha = existingFile.sha;
          } catch (e) {
            alert('Could not read the existing public file:\n\n' + (e && e.message ? e.message : String(e)));
            flashStatus('');
            return;
          }
        }
        // NOTE: on Cancel we intentionally keep existingEntry set so its
        // description can still pre-fill the description prompt below —
        // the user chose a separate copy but likely still wants the same
        // description to seed from.
      }

      if (!isUpdate) {
        const existingFiles = new Set(examples.map(e => e.file));
        const baseSlug = slugify(trimmedTitle);
        let slug = baseSlug, n = 1;
        while (existingFiles.has(slug + '.json')) { n++; slug = baseSlug + '-' + n; }
        filename = slug + '.json';
      }

      // Description prompt — pre-fill priority:
      //   1. the matching manifest entry's current description (update path),
      //   2. a remembered description under the same title (survives deletes
      //      and cross-session use), or
      //   3. a remembered description under the private name (in case the
      //      title was tweaked in the title prompt above), or
      //   4. empty.
      const descriptionPrefill =
        (existingEntry && existingEntry.description) ||
        state.description ||
        recallPublishDescription(trimmedTitle) ||
        recallPublishDescription(privateName) ||
        '';
      const description = window.prompt(
        'One-line description (shown under the title in the library):',
        descriptionPrefill
      );
      if (description == null) return;

      const framing = {
        scope:         file.scope || '',
        metrics:       file.metrics || [],
        assignments:   file.assignments || {},
        chipColors:    file.chipColors || {},
        decisions:     file.decisions || [],
        matrix:        file.matrix || {},
        uncertainties: file.uncertainties || [],
        uMatrix:       file.uMatrix || {},
      };
      const framingJson = JSON.stringify(framing, null, 2) + '\n';

      flashStatus((isUpdate ? 'Updating' : 'Publishing') + ' "' + trimmedTitle + '"… (2 commits to GitHub)');

      // Commit 1: the framing JSON. Pass sha when updating so GitHub
      // treats it as an overwrite (not a duplicate-create failure).
      await ghPutFile(
        ADMIN_FILES_DIR + '/' + filename,
        framingJson,
        (isUpdate ? 'framing examples: update "' : 'framing examples: publish "') + trimmedTitle + '"',
        existingFileSha
      );

      // Commit 2: manifest — update the existing entry's description,
      // or append a new entry.
      if (isUpdate) {
        for (const e of manifestObj.examples) {
          if (e.file === filename) {
            e.title = trimmedTitle;
            e.description = description.trim();
          }
        }
      } else {
        manifestObj.examples = manifestObj.examples || [];
        manifestObj.examples.push({
          file: filename,
          title: trimmedTitle,
          description: description.trim(),
        });
      }
      await ghPutFile(
        ADMIN_MANIFEST_PATH,
        JSON.stringify(manifestObj, null, 2) + '\n',
        (isUpdate ? 'framing examples: refresh manifest for ' : 'framing examples: add ') + filename,
        manifest.sha
      );

      // Cache the description under the actual published title so the next
      // Publish of the same case can pre-fill it, even if the public entry
      // is later deleted and re-published from scratch.
      rememberPublishDescription(trimmedTitle, description.trim());

      flashStatus(
        (isUpdate ? 'Updated' : 'Published') +
        ' "' + trimmedTitle + '". Live on the site in ~1–2 min.'
      );
      renderPublicExamples();
    } catch (err) {
      console.error(err);
      alert('Publish/update failed:\n\n' + (err && err.message ? err.message : String(err)));
      flashStatus('Publish/update failed.');
    }
  }

  async function adminRename(ex) {
    if (!getAdminToken()) { promptForToken(); if (!getAdminToken()) return; }
    const newTitle = window.prompt('New title:', ex.title || ex.file);
    if (newTitle == null) return;
    const t = newTitle.trim();
    if (!t) { alert('Title cannot be empty.'); return; }
    const newDesc = window.prompt('New description:', ex.description || '');
    if (newDesc == null) return;

    try {
      flashStatus('Renaming… (1 commit to GitHub)');
      const manifest = await ghGetFile(ADMIN_MANIFEST_PATH);
      const manifestObj = JSON.parse(manifest.content);
      const entry = (manifestObj.examples || []).find(e => e.file === ex.file);
      if (!entry) { alert('Not found in manifest — reload and try again.'); return; }
      entry.title = t;
      entry.description = newDesc.trim();
      await ghPutFile(
        ADMIN_MANIFEST_PATH,
        JSON.stringify(manifestObj, null, 2) + '\n',
        'framing examples: rename ' + ex.file + ' → "' + t + '"',
        manifest.sha
      );
      flashStatus('Renamed. Live on the site in ~1–2 min.');
      renderPublicExamples();
    } catch (err) {
      console.error(err);
      alert('Rename failed:\n\n' + (err && err.message ? err.message : String(err)));
      flashStatus('Rename failed.');
    }
  }

  async function adminDelete(ex) {
    if (!getAdminToken()) { promptForToken(); if (!getAdminToken()) return; }
    if (!confirm('Delete public example "' + (ex.title || ex.file) + '"? Cannot be undone from here (a git revert would still work).')) return;
    try {
      flashStatus('Deleting… (2 commits to GitHub)');
      // Fetch the JSON file's SHA (Contents API DELETE needs it).
      const file = await ghGetFile(ADMIN_FILES_DIR + '/' + ex.file);
      await ghDeleteFile(
        ADMIN_FILES_DIR + '/' + ex.file,
        'framing examples: delete ' + ex.file,
        file.sha
      );
      // Then drop from the manifest.
      const manifest = await ghGetFile(ADMIN_MANIFEST_PATH);
      const manifestObj = JSON.parse(manifest.content);
      manifestObj.examples = (manifestObj.examples || []).filter(e => e.file !== ex.file);
      await ghPutFile(
        ADMIN_MANIFEST_PATH,
        JSON.stringify(manifestObj, null, 2) + '\n',
        'framing examples: remove ' + ex.file + ' from manifest',
        manifest.sha
      );
      flashStatus('Deleted. Live on the site in ~1–2 min.');
      renderPublicExamples();
    } catch (err) {
      console.error(err);
      alert('Delete failed:\n\n' + (err && err.message ? err.message : String(err)));
      flashStatus('Delete failed.');
    }
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
    const oldMetrics = state.metrics || [];
    const oldAssignments = state.assignments || {};
    const oldChipColors = state.chipColors || {};
    const oldSet = new Set(oldMetrics);
    const newSet = new Set(newMetrics);

    // Pass 1: exact-match preservation of tier assignments AND chip colors.
    const kept = {};
    const keptColors = {};
    for (const m of newMetrics) {
      if (oldAssignments[m] != null && oldSet.has(m)) kept[m] = oldAssignments[m];
      if (oldChipColors[m] && oldSet.has(m))          keptColors[m] = oldChipColors[m];
    }
    // Pass 2: rename detection. A "vanished" metric is in old but not
    // in new; an "appeared" metric is the reverse. Pair them positionally
    // (i-th vanished ↔ i-th appeared) and treat as a rename, transferring
    // the tier assignment AND rekeying every affected matrix column.
    // This lets Warren tweak the wording of a metric ("Operating margin"
    // → "Op margin") without losing its tier or any of its column scores
    // across both matrices. Only metrics that vanish with no counterpart
    // appearing are treated as deletions.
    const vanished = oldMetrics.filter(m => !newSet.has(m));
    const appeared = newMetrics.filter(m => !oldSet.has(m));
    const pairs = Math.min(vanished.length, appeared.length);
    const renameMap = {};
    for (let i = 0; i < pairs; i++) {
      const from = vanished[i];
      const to   = appeared[i];
      if (oldAssignments[from] != null && kept[to] == null) {
        kept[to] = oldAssignments[from];
      }
      if (oldChipColors[from] && keptColors[to] == null) {
        keptColors[to] = oldChipColors[from];
      }
      renameMap[from] = to;
    }
    // Collect every matrix in the document — top-level decision matrix,
    // top-level uncertainty matrix, and every sub-frame's decision
    // matrix. Metric renames/deletes have to touch all of them so a
    // rename at the pyramid propagates through the entire decision tree.
    const allMatrices = [state.matrix, state.uMatrix];
    (function walk(sf) {
      if (!sf) return;
      for (const k of Object.keys(sf)) {
        if (sf[k] && sf[k].matrix) allMatrices.push(sf[k].matrix);
        walk(sf[k] && sf[k].subframes);
      }
    })(state.subframes);

    // Apply renames to every collected matrix — for every row, move any
    // score stored under the old metric key onto the new metric key.
    if (Object.keys(renameMap).length) {
      for (const mx of allMatrices) {
        for (const row of Object.keys(mx)) {
          for (const from of Object.keys(renameMap)) {
            if (mx[row][from] !== undefined) {
              const to = renameMap[from];
              if (mx[row][to] === undefined) mx[row][to] = mx[row][from];
              delete mx[row][from];
            }
          }
        }
      }
    }

    state.metrics = newMetrics;
    state.assignments = kept;
    state.chipColors = keptColors;

    // Prune matrix cells that reference truly-deleted (not renamed) metrics.
    // A rename already moved its score onto the new name above, so the OLD
    // key is gone by the time this runs.
    const metricSet = new Set(newMetrics);
    for (const mx of allMatrices) {
      for (const row of Object.keys(mx)) {
        for (const m of Object.keys(mx[row])) {
          if (!metricSet.has(m)) delete mx[row][m];
        }
        if (Object.keys(mx[row]).length === 0) delete mx[row];
      }
    }
    render();
    renderAllMatrices();   // metric columns may have changed
    autoSave();
  }

  // ── Render ──────────────────────────────────────────────────
  // Chip color cycle — mirrors the H/M/L/N pattern in the impact matrix.
  // Blank → Max (dark green) → Min (dark red) → Target (purple) →
  // Floor (light green) → Ceiling (light red) → blank.
  const CHIP_COLOR_ORDER = ['', 'max', 'min', 'target', 'limit-floor', 'limit-ceiling'];
  function cycleChipColor(metric, chip) {
    const cur = state.chipColors[metric] || '';
    const idx = CHIP_COLOR_ORDER.indexOf(cur);
    const next = CHIP_COLOR_ORDER[(idx + 1) % CHIP_COLOR_ORDER.length];
    if (!next) {
      delete state.chipColors[metric];
      chip.removeAttribute('data-color');
    } else {
      state.chipColors[metric] = next;
      chip.dataset.color = next;
    }
    autoSave();
  }
  function makeChip(metric) {
    const chip = document.createElement('span');
    chip.className = 'fp-chip';
    chip.textContent = metric;
    chip.draggable = true;
    chip.dataset.metric = metric;
    // Restore any stored color for this metric.
    const storedColor = state.chipColors && state.chipColors[metric];
    if (storedColor) chip.dataset.color = storedColor;
    chip.title = 'Drag to a tier · Click to cycle color (Max → Min → Target → Floor → Ceiling → blank)';
    // Track whether the current pointer interaction started a drag so a
    // click that follows a drag operation doesn't ALSO fire a color cycle.
    let dragOccurred = false;
    chip.addEventListener('dragstart', (e) => {
      dragOccurred = true;
      e.dataTransfer.setData('text/plain', metric);
      e.dataTransfer.effectAllowed = 'move';
      chip.classList.add('fp-dragging');
    });
    chip.addEventListener('dragend', () => {
      chip.classList.remove('fp-dragging');
      // Reset the flag AFTER any trailing click event that browsers may
      // still fire in some drag-cancel scenarios.
      setTimeout(() => { dragOccurred = false; }, 0);
    });
    chip.addEventListener('click', () => {
      if (dragOccurred) return;
      cycleChipColor(metric, chip);
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
      renderAllMatrices();   // moving a metric in/out of a tier changes matrix columns
      autoSave();
    });
  }

  // ── Decisions / Uncertainties textarea sync (generic) ───────
  function parseTextareaList(textareaSel) {
    const raw = $(textareaSel).value;
    const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
    const seen = new Set(); const out = [];
    for (const s of lines) if (!seen.has(s)) { seen.add(s); out.push(s); }
    return out;
  }
  function syncListFromTextarea(kind) {
    const cfg = MATRIX[kind];
    const frame = frameFor(kind);
    const newList = parseTextareaList(cfg.textareaSel);
    const oldList = frame[cfg.listKey] || [];
    const oldMatrix = frame[cfg.matrixKey] || {};
    const oldSet = new Set(oldList);
    const newSet = new Set(newList);
    const kept = {};
    // Pass 1: exact-match preservation. A line that appears in both
    // old and new lists keeps its matrix entry unchanged.
    for (const name of newList) {
      if (oldMatrix[name] && oldSet.has(name)) kept[name] = oldMatrix[name];
    }
    // Pass 2: treat vanished-and-appeared lines as renames, so a
    // wording tweak on a decision (or uncertainty) preserves the row.
    // A "vanished" name is one in oldList but not in newList; an
    // "appeared" name is the reverse. We pair them positionally in
    // the order they show up in the textarea. Only deleting a line
    // outright (line disappears with no replacement appearing in
    // parallel) drops that row's matrix entry — which matches user
    // intent much better than "any wording change wipes the row."
    const vanished = oldList.filter(n => !newSet.has(n));
    const appeared = newList.filter(n => !oldSet.has(n));
    const pairs = Math.min(vanished.length, appeared.length);
    const renames = [];
    for (let i = 0; i < pairs; i++) {
      const from = vanished[i];
      const to   = appeared[i];
      if (oldMatrix[from] && !kept[to]) kept[to] = oldMatrix[from];
      renames.push([from, to]);
    }
    const deletes = vanished.slice(pairs);
    frame[cfg.listKey]   = newList;
    frame[cfg.matrixKey] = kept;
    // Decision-level renames/deletes propagate to the sub-frames map
    // so a renamed parent decision keeps its sub-tree and a deleted
    // one drops it.
    if (kind === 'decision') reconcileSubframes(frame, renames, deletes);
    renderImpactMatrix(kind);
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
  // Set a matrix cell's text with <wbr> markers after every "/" so
  // the browser prefers breaking at those spots. Text before and
  // after each slash stays intact — no more mid-word orphans like
  // "acquisition/dive\nsture" or "Rev/driver/w\nk". Used for both
  // metric-column headers AND decision/uncertainty row labels.
  function appendTextWithSlashBreaks(el, text) {
    el.textContent = '';
    const parts = String(text).split('/');
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        el.appendChild(document.createTextNode('/'));
        el.appendChild(document.createElement('wbr'));
      }
      el.appendChild(document.createTextNode(parts[i]));
    }
  }

  function renderImpactMatrix(kind) {
    const cfg = MATRIX[kind];
    const wrap = $(cfg.wrapSel);
    if (!wrap) return;
    if (kind === 'decision') { renderBreadcrumb(); renderSubScopeField(); }
    const frame = frameFor(kind);
    const metrics = orderedMetrics();
    const rows = frame[cfg.listKey];
    if (metrics.length === 0 && rows.length === 0) {
      wrap.innerHTML = '<p class="fp-matrix-empty">' +
        'Add metrics (and drag them into pyramid tiers) above, and list ' +
        cfg.pluralLower + ' on the left, to start scoring impact.' +
        '</p>';
      return;
    }
    if (metrics.length === 0) {
      wrap.innerHTML = '<p class="fp-matrix-empty">' +
        "No tier-assigned metrics yet — drag some metric chips into the pyramid above and this matrix's columns will fill in." +
        '</p>';
      return;
    }
    if (rows.length === 0) {
      wrap.innerHTML = '<p class="fp-matrix-empty">Add ' +
        cfg.pluralLower + ' on the left to start scoring.</p>';
      return;
    }
    const matrixObj = frame[cfg.matrixKey];

    const table = document.createElement('table');
    table.className = 'fp-matrix';
    table.dataset.kind = kind;

    const thead = document.createElement('thead');
    const hr = document.createElement('tr');
    hr.appendChild(document.createElement('th'));  // grip column
    const dh = document.createElement('th');
    dh.className = 'fp-matrix-decision-header';
    dh.textContent = cfg.headerLabel;
    hr.appendChild(dh);
    for (const { metric, tier } of metrics) {
      const th = document.createElement('th');
      th.className = 'fp-matrix-metric-header fp-matrix-tier-' + tier;
      // Header text with a preferred line-break opportunity (<wbr>)
      // after every "/". Metrics-per-something (e.g. Rev/driver/wk,
      // Operating margin/mile) then wrap cleanly at the slash
      // instead of dropping a random tail letter to the next line.
      appendTextWithSlashBreaks(th, metric);
      th.title = 'Tier ' + tier + ' — ' + metric;
      hr.appendChild(th);
    }
    thead.appendChild(hr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const name of rows) {
      const tr = document.createElement('tr');
      tr.dataset.name = name;

      const grip = document.createElement('td');
      grip.className = 'fp-matrix-grip';
      grip.textContent = '☰';
      grip.draggable = true;
      grip.title = 'Drag to reorder this row';
      tr.appendChild(grip);

      const nameTd = document.createElement('td');
      nameTd.className = 'fp-matrix-decision';
      appendTextWithSlashBreaks(nameTd, name);
      // Drill-in affordance — decisions only. Click (or right-click
      // anywhere on the row) descends into this decision's own
      // sub-decisions. The badge shows how many sub-decisions already
      // exist so users can see which parent decisions have a sub-tree.
      if (kind === 'decision') {
        const count = subDecisionCount(frame, name);
        const drill = document.createElement('button');
        drill.type = 'button';
        drill.className = 'fp-drill-btn' + (count > 0 ? ' fp-drill-btn-has' : '');
        drill.textContent = count > 0 ? ('▸ ' + count) : '▸';
        drill.title = count > 0
          ? ('Drill into ' + count + ' sub-decision' + (count === 1 ? '' : 's'))
          : 'Add sub-decisions for this decision';
        drill.addEventListener('click', (e) => {
          e.stopPropagation();
          drillInto(name);
        });
        nameTd.appendChild(document.createTextNode(' '));
        nameTd.appendChild(drill);
        tr.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          drillInto(name);
        });
      }
      tr.appendChild(nameTd);

      for (const { metric } of metrics) {
        const cell = document.createElement('td');
        cell.className = 'fp-matrix-cell';
        const v = (matrixObj[name] && matrixObj[name][metric]) || '';
        cell.dataset.value = v;
        cell.title = 'Click to cycle: H → M → L → N → blank';
        cell.addEventListener('click', () => cycleCell(kind, name, metric, cell));
        tr.appendChild(cell);
      }
      tbody.appendChild(tr);
      wireMatrixRowDrag(kind, tr);
    }
    table.appendChild(tbody);

    wrap.innerHTML = '';
    wrap.appendChild(table);
  }
  function renderAllMatrices() {
    renderImpactMatrix('decision');
    renderImpactMatrix('uncertainty');
    // Align each textarea's top with the first data row of its matrix
    // — measure AFTER render so column widths / header wrapping are
    // fully laid out.
    requestAnimationFrame(alignMatrixTextareas);
  }
  function alignMatrixTextareas() {
    // Historically pushed the textarea down so its top lined up with
    // the matrix's first data row in the SIDE-BY-SIDE layout. The
    // Decisions/Uncertainties sections are now stacked (list above,
    // matrix full-width below), so alignment is a no-op — we just
    // reset any lingering margin from an earlier layout.
    for (const kind of ['decision', 'uncertainty']) {
      const cfg = MATRIX[kind];
      const textarea = $(cfg.textareaSel);
      if (textarea) textarea.style.marginTop = '';
    }
  }
  function cycleCell(kind, name, metric, cell) {
    const cfg = MATRIX[kind];
    const matrixObj = frameFor(kind)[cfg.matrixKey];
    const order = ['', 'H', 'M', 'L', 'N'];
    const cur = (matrixObj[name] && matrixObj[name][metric]) || '';
    const idx = order.indexOf(cur);
    const next = order[(idx + 1) % order.length];
    if (!matrixObj[name]) matrixObj[name] = {};
    if (next === '') {
      delete matrixObj[name][metric];
      if (Object.keys(matrixObj[name]).length === 0) delete matrixObj[name];
    } else {
      matrixObj[name][metric] = next;
    }
    cell.dataset.value = next;
    // A manual edit means the user has started reviewing this matrix, so
    // the "AI-generated — review carefully" note has served its purpose.
    hideAiNote(kind);
    autoSave();
  }

  // ── Per-matrix First-draft (AI) + Reset ────────────────────
  // Note is session-only — not persisted across page reloads or saves.
  // It's a "you just clicked First draft" reminder, not a permanent tag.
  const MATRIX_ENDPOINT = 'https://castle-chatbot.onrender.com/framing/matrix';
  function showAiNote(kind) {
    const el = document.querySelector('.fp-matrix-ai-note[data-kind="' + kind + '"]');
    if (el) el.hidden = false;
  }
  function hideAiNote(kind) {
    const el = document.querySelector('.fp-matrix-ai-note[data-kind="' + kind + '"]');
    if (el) el.hidden = true;
  }
  function setMatrixButtonsBusy(kind, busy, label) {
    const draft = document.querySelector('.fp-matrix-draft[data-kind="' + kind + '"]');
    const reset = document.querySelector('.fp-matrix-reset[data-kind="' + kind + '"]');
    if (draft) {
      draft.disabled = busy;
      if (busy) { draft.dataset.origText = draft.textContent; draft.textContent = label || 'Working…'; }
      else if (draft.dataset.origText) { draft.textContent = draft.dataset.origText; delete draft.dataset.origText; }
    }
    if (reset) reset.disabled = busy;
  }
  async function runMatrixDraft(kind) {
    const cfg = MATRIX[kind];
    const frame = frameFor(kind);
    // Same column-source the table uses — only tier-assigned metrics count.
    const metrics = orderedMetrics().map(x => x.metric);
    const rows = (frame[cfg.listKey] || []).slice();
    if (metrics.length === 0) {
      alert('Add metrics and drop them into pyramid tiers first — the matrix needs columns to score.');
      return;
    }
    if (rows.length === 0) {
      alert('List some ' + cfg.pluralLower + ' on the left first — the matrix needs rows to score.');
      return;
    }
    setMatrixButtonsBusy(kind, true, 'Scoring…');
    try {
      const resp = await fetch(MATRIX_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, metrics, rows }),
      });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      if (!data.matrix || typeof data.matrix !== 'object') throw new Error('Server returned no matrix.');
      // Coerce again on the client side just to be safe — accept only known
      // (row, metric) pairs with H/M/L/N values.
      const metricSet = new Set(metrics);
      const rowSet = new Set(rows);
      const cleaned = {};
      for (const row of Object.keys(data.matrix)) {
        if (!rowSet.has(row)) continue;
        const src = data.matrix[row];
        if (!src || typeof src !== 'object') continue;
        const scored = {};
        for (const m of Object.keys(src)) {
          if (!metricSet.has(m)) continue;
          const v = String(src[m] || '').toUpperCase();
          if (v === 'H' || v === 'M' || v === 'L' || v === 'N') scored[m] = v;
        }
        if (Object.keys(scored).length) cleaned[row] = scored;
      }
      frame[cfg.matrixKey] = cleaned;
      renderImpactMatrix(kind);
      showAiNote(kind);
      autoSave();
    } catch (err) {
      console.error('First-draft (matrix) failed:', err);
      alert('Sorry — ' + (err && err.message ? err.message : 'request failed') +
        '\n(First request after idle can take ~30 s while the server wakes up. Try again in a moment.)');
    } finally {
      setMatrixButtonsBusy(kind, false);
    }
  }
  function resetMatrix(kind) {
    const cfg = MATRIX[kind];
    const frame = frameFor(kind);
    const rows = (frame[cfg.listKey] || []).length;
    if (rows === 0) return;                                  // nothing to clear
    if (!confirm('Clear every H/M/L/N in the ' + cfg.singularLower + ' impact matrix? The ' +
      cfg.pluralLower + ' and metrics are not touched.')) return;
    frame[cfg.matrixKey] = {};
    hideAiNote(kind);
    renderImpactMatrix(kind);
    autoSave();
  }

  // ── Matrix row drag-to-reorder ──────────────────────────────
  // Clear drop indicators inside a specific matrix (identified by
  // the wrap element) — never touches the other matrix.
  function clearMatrixDropIndicators(wrapEl) {
    if (!wrapEl) return;
    wrapEl.querySelectorAll('tbody tr').forEach(r => {
      r.classList.remove('fp-matrix-drop-above', 'fp-matrix-drop-below');
    });
  }
  function wireMatrixRowDrag(kind, row) {
    const cfg = MATRIX[kind];
    const wrap = $(cfg.wrapSel);
    const grip = row.querySelector('.fp-matrix-grip');
    if (!grip) return;
    grip.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', row.dataset.name);
      e.dataTransfer.effectAllowed = 'move';
      row.classList.add('fp-matrix-dragging');
    });
    grip.addEventListener('dragend', () => {
      row.classList.remove('fp-matrix-dragging');
      clearMatrixDropIndicators(wrap);
    });
    row.addEventListener('dragover', (e) => {
      // preventDefault is required so 'drop' fires.
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const rect = row.getBoundingClientRect();
      const above = (e.clientY - rect.top) < rect.height / 2;
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
      clearMatrixDropIndicators(wrap);
      if (!src || src === row.dataset.name) return;
      const frame = frameFor(kind);
      const list = frame[cfg.listKey].slice();
      const srcIdx = list.indexOf(src);
      if (srcIdx < 0) return;
      list.splice(srcIdx, 1);
      let dstIdx = list.indexOf(row.dataset.name);
      if (dstIdx < 0) return;
      if (!above) dstIdx += 1;
      list.splice(dstIdx, 0, src);
      frame[cfg.listKey] = list;
      // Keep the textarea in sync with the new row order so what
      // the user sees on the left matches the matrix.
      $(cfg.textareaSel).value = frame[cfg.listKey].join('\n');
      renderImpactMatrix(kind);
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

  // ── Ask Professor Powell ────────────────────────────────────
  // One-shot bridge to the /framing endpoint on castle-chatbot.onrender.com.
  // Sends description + optional URL + optional file, receives a full
  // framing JSON, drops it into the workspace. Doesn't set a save-target
  // (currentName stays null) so the user hits Save-as… if they want to keep
  // the AI's draft; the banner shows a soft "AI draft" label meanwhile.
  const FRAMING_URL = 'https://castle-chatbot.onrender.com/framing';
  function setBotStatus(msg, kind) {
    const el = $('#fp-bot-status');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.remove('fp-bot-status-working', 'fp-bot-status-error');
    if (kind === 'working') el.classList.add('fp-bot-status-working');
    if (kind === 'error')   el.classList.add('fp-bot-status-error');
  }
  // Some validation before we ship the framing into state. The endpoint uses
  // tool_use so the shape is enforced, but the model can still hand back a
  // metric key in `assignments` that isn't in `metrics` — normalize any drift
  // instead of showing an empty pyramid.
  function coerceFraming(f) {
    if (!f || typeof f !== 'object') throw new Error('Empty framing');
    const metrics       = Array.isArray(f.metrics)       ? f.metrics.filter(Boolean).map(String)       : [];
    const decisions     = Array.isArray(f.decisions)     ? f.decisions.filter(Boolean).map(String)     : [];
    const uncertainties = Array.isArray(f.uncertainties) ? f.uncertainties.filter(Boolean).map(String) : [];
    if (metrics.length === 0)   throw new Error('Framing has no metrics');
    if (decisions.length === 0) throw new Error('Framing has no decisions');

    // Rebuild assignments so only known metrics survive; clamp tier to 1..4.
    const rawAssign = (f.assignments && typeof f.assignments === 'object') ? f.assignments : {};
    const assignments = {};
    metrics.forEach((m) => {
      const t = Number(rawAssign[m]);
      if (Number.isFinite(t) && t >= 1 && t <= 4) assignments[m] = Math.round(t);
    });
    // If model forgot to place Tier 1, promote the first metric so the
    // pyramid at least has a top tier.
    if (!Object.values(assignments).includes(1) && metrics.length) {
      assignments[metrics[0]] = 1;
    }

    const norm = (mat, rows) => {
      const out = {};
      if (mat && typeof mat === 'object') {
        rows.forEach((rowName) => {
          const src = mat[rowName];
          if (src && typeof src === 'object') {
            const row = {};
            metrics.forEach((m) => {
              const v = String(src[m] || '').toUpperCase();
              if (v === 'H' || v === 'M' || v === 'L' || v === 'N') row[m] = v;
            });
            if (Object.keys(row).length) out[rowName] = row;
          }
        });
      }
      return out;
    };

    // Sub-decisions arrive from the bot as { <parentDecisionName>: string[] }.
    // Translate into the tool's subframes tree — one sub-frame per parent
    // that actually has options, keyed by the top-level decision name.
    // Only parents that appear in `decisions` produce a sub-frame; stray
    // keys the model may have hallucinated are dropped silently.
    const subframes = {};
    const rawSubs = (f.subDecisions && typeof f.subDecisions === 'object')
      ? f.subDecisions
      : ((f.subframes && typeof f.subframes === 'object') ? null : {});
    if (rawSubs) {
      const parentSet = new Set(decisions);
      for (const parent of Object.keys(rawSubs)) {
        if (!parentSet.has(parent)) continue;
        const subs = rawSubs[parent];
        if (!Array.isArray(subs)) continue;
        const clean = subs.filter(Boolean).map(String);
        if (clean.length) {
          subframes[parent] = {
            scope: '', decisions: clean, matrix: {}, subframes: {},
          };
        }
      }
    }
    // If the framing already carries a subframes tree (URL share, JSON
    // import, older bot output), let normalizeState pick it up rather
    // than overwriting it with an empty map.
    const outSubframes = (f.subframes && typeof f.subframes === 'object' && !f.subDecisions)
      ? f.subframes
      : subframes;

    return {
      title:       (typeof f.title === 'string')       ? f.title       : '',
      scope:       (typeof f.scope === 'string')       ? f.scope       : '',
      description: (typeof f.description === 'string') ? f.description : '',
      metrics,
      assignments,
      chipColors:  (f.chipColors && typeof f.chipColors === 'object') ? f.chipColors : {},
      decisions,
      matrix:      norm(f.matrix, decisions),
      subframes:   outSubframes,
      uncertainties,
      uMatrix:     norm(f.uMatrix, uncertainties),
    };
  }
  function applyFraming(framing, sourceLabel, scopeText) {
    state = normalizeState(coerceFraming(framing));
    currentPath = [];                                        // AI draft → top level
    // The bot's own scope input is the authoritative scope for the
    // generated framing — propagate it into the top-level scope box so
    // the user doesn't have to re-type it above.
    if (scopeText && !state.scope) state.scope = scopeText;
    setCurrentName(null);                                  // AI drafts have no save-target
    // Prefer the bot's `title` for the banner so Save-as pre-fills with a
    // useful short case name ("Aurora Motors") rather than the whole source
    // URL / filename / message the user pasted in.
    const draftLabel = (state.title && state.title.trim())
      ? state.title.trim()
      : (sourceLabel || 'Ask Professor Powell');
    setDocTitle('AI draft — ' + draftLabel);
    $('#fp-scope-input').value         = state.scope || '';
    $('#fp-metrics-input').value       = state.metrics.join('\n');
    $('#fp-decisions-input').value     = state.decisions.join('\n');
    $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
    render();
    renderAllMatrices();
    autoSave();
    // Scroll the user back up to the pyramid so they see the result.
    const anchor = document.getElementById('metrics-pyramid-tool');
    if (anchor && anchor.scrollIntoView) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  async function runFramingRequest() {
    const desc  = $('#fp-bot-desc').value.trim();
    const url   = $('#fp-bot-url').value.trim();
    const scope = $('#fp-bot-scope').value.trim();
    const file = $('#fp-bot-file').files && $('#fp-bot-file').files[0];
    const size = $('#fp-bot-size').value || 'medium';
    if (!desc && !url && !file) {
      setBotStatus('Add a description, a URL, or a file first.', 'error');
      return;
    }
    const btn = $('#fp-bot-generate');
    btn.disabled = true;
    const originalLabel = btn.textContent;
    btn.textContent = 'Working…';
    setBotStatus('Contacting Professor Powell… (first request after idle can take ~30 s while the server wakes up)', 'working');
    try {
      const form = new FormData();
      if (scope) form.append('scope', scope);
      if (desc)  form.append('description', desc);
      if (url)   form.append('url', url);
      if (file) form.append('file', file, file.name);
      form.append('size', size);

      const resp = await fetch(FRAMING_URL, { method: 'POST', body: form });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      if (!data.framing) throw new Error('Server returned no framing.');

      const sourceLabel = file ? file.name
                              : url ? url
                              : (desc.length > 60 ? desc.slice(0, 57) + '…' : desc);
      applyFraming(data.framing, sourceLabel, scope);
      setBotStatus('Draft ready — scroll up to review and edit. Use File → Save as… to keep it.', '');
    } catch (err) {
      console.error('Framing request failed:', err);
      setBotStatus('Sorry — ' + (err && err.message ? err.message : 'request failed') + '. Try again in a moment.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  }
  function clearBotInputs() {
    $('#fp-bot-scope').value = '';
    $('#fp-bot-desc').value  = '';
    $('#fp-bot-url').value   = '';
    $('#fp-bot-file').value = '';
    setBotStatus('');
  }

  // ── Server-backed library (framing tool v2) ─────────────────
  // Base URL for the framing-node backend (running on the chatbot Render
  // service). Every endpoint accepts a read_id in the URL and, for writes,
  // a write_token in ?w=.
  const NODES_BASE = 'https://castle-chatbot.onrender.com/api/framing-nodes';
  // The public examples library — a server-side node curated by Warren
  // and readable by anyone. Auto-added to every visitor's "My server
  // libraries" list on first visit so casual users can discover it.
  // Rename via the library bar's Rename button; if you REGENERATE its
  // URLs, update this constant and the /decision-framing-tool/?node=…
  // link at the top of the page to match.
  const PUBLIC_EXAMPLES_READ_ID = 'AJx6Ke2S3d';
  const PUBLIC_EXAMPLES_NAME    = 'Public examples';
  // LocalStorage map: read_id → { writeToken, framingId, name, publishedAt }.
  // Lets us hint "already published" in the UI later and skip re-creating a
  // node when the user hits Publish again after already publishing.
  const PUBLISHED_KEY = 'framing_published_v1';
  // LocalStorage key holding { readId, writeToken, name } for the user's ONE
  // personal library node. Set on first Publish; reused by every subsequent
  // Publish so new framings accumulate in the same library instead of
  // spawning a fresh one per click.
  const MY_LIBRARY_KEY = 'framing_my_library_v1';

  function readMyLibrary() {
    try {
      const raw = localStorage.getItem(MY_LIBRARY_KEY);
      const obj = raw ? JSON.parse(raw) : null;
      if (obj && obj.readId && obj.writeToken) return obj;
    } catch (_) { /* ignore */ }
    return null;
  }
  function writeMyLibrary(readId, writeToken, name) {
    try {
      localStorage.setItem(MY_LIBRARY_KEY, JSON.stringify({
        readId, writeToken, name, createdAt: new Date().toISOString(),
      }));
    } catch (_) { /* ignore */ }
    refreshMyLibraryMenuItem();
  }
  // Enable/disable File → "Open my library" based on whether a personal
  // library exists in localStorage. Also updates the tooltip so hovering
  // shows the library name.
  function refreshMyLibraryMenuItem() {
    const btn = $('#fp-menu-open-my-lib');
    if (!btn) return;
    const lib = readMyLibrary();
    if (!lib) {
      btn.disabled = true;
      btn.title = 'Save a framing to your library first to create it';
    } else {
      btn.disabled = false;
      btn.title = 'Open your personal server library: ' + (lib.name || 'My framings');
    }
  }
  function openMyLibrary() {
    const lib = readMyLibrary();
    if (!lib) return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('node', lib.readId);
    if (lib.writeToken) url.searchParams.set('w', lib.writeToken);
    window.location.href = url.toString();
  }

  // LocalStorage: history of server libraries the user has visited on
  // this browser. Keyed by readId. Includes their own personal library
  // and any public / shared library URL they've opened. Write token is
  // upgraded when the user later visits with ?w=; leaf name + full
  // ancestry breadcrumb are cached for the display.
  const VISITED_LIBS_KEY = 'framing_visited_libraries_v1';
  function readVisitedLibraries() {
    try {
      const raw = localStorage.getItem(VISITED_LIBS_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      return (obj && typeof obj === 'object') ? obj : {};
    } catch (_) { return {}; }
  }
  function writeVisitedLibraries(obj) {
    try { localStorage.setItem(VISITED_LIBS_KEY, JSON.stringify(obj)); }
    catch (_) { /* private mode / quota */ }
  }
  function rememberVisitedLibrary(readId, writeToken, name, ancestry) {
    if (!readId) return;
    const map = readVisitedLibraries();
    const existing = map[readId] || {};
    map[readId] = {
      readId,
      // Never downgrade: if we previously had a write token for this
      // node, keep it even if the current visit was read-only.
      writeToken: writeToken || existing.writeToken || null,
      name: name || existing.name || '(unnamed library)',
      ancestryLabel: Array.isArray(ancestry) ? ancestry.join(' › ') : (existing.ancestryLabel || ''),
      lastVisited: new Date().toISOString(),
    };
    writeVisitedLibraries(map);
  }
  function forgetVisitedLibrary(readId) {
    const map = readVisitedLibraries();
    if (map[readId]) {
      delete map[readId];
      writeVisitedLibraries(map);
    }
  }
  // Called from File → Open modal's "Add" button. Accepts a full library
  // URL (View or Edit) and adds it to the visited-libraries list without
  // navigating away. Fetches the node from the server first so the entry
  // gets a proper display name + ancestry breadcrumb.
  async function addServerLibraryByUrl(rawUrl) {
    const btn = $('#fp-add-lib-btn');
    const input = $('#fp-add-lib-input');
    let readId = null;
    let writeToken = null;
    try {
      const u = new URL(String(rawUrl || '').trim());
      readId     = u.searchParams.get('node');
      writeToken = u.searchParams.get('w');
    } catch (_) {
      alert('That does not look like a valid URL.');
      return;
    }
    if (!isReadIdString(readId)) {
      alert('URL must include a ?node=<readId> parameter (10 characters).');
      return;
    }
    if (writeToken && !isWriteTokenString(writeToken)) writeToken = null;
    if (btn) { btn.disabled = true; btn.textContent = 'Adding…'; }
    try {
      const resp = await apiFetch(NODES_BASE + '/nodes/' + encodeURIComponent(readId));
      rememberVisitedLibrary(readId, writeToken, resp.node.name, resp.ancestry);
      renderServerLibraryList();
      if (input) input.value = '';
      flashStatus('Added library "' + (resp.node.name || readId) + '".');
    } catch (err) {
      console.error('Add library failed:', err);
      alert('Could not fetch that library:\n\n' +
        ((err && err.message) ? err.message : String(err)) +
        '\n\n(First request after idle can take ~30 s while the server wakes up.)');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Add'; }
    }
  }

  function renderServerLibraryList() {
    const list = $('#fp-server-lib-list');
    if (!list) return;
    list.innerHTML = '';
    const map = readVisitedLibraries();
    const entries = Object.values(map).sort(
      (a, b) => (b.lastVisited || '').localeCompare(a.lastVisited || '')
    );
    if (!entries.length) {
      const empty = document.createElement('div');
      empty.style.padding = '16px';
      empty.style.textAlign = 'center';
      empty.style.color = '#7a6a55';
      empty.style.fontStyle = 'italic';
      empty.textContent = 'No server libraries visited yet — Save a framing to your library, or open a library URL someone shared with you.';
      list.appendChild(empty);
      return;
    }
    for (const lib of entries) {
      const row = document.createElement('div');
      row.className = 'fp-file-row';
      row.style.cursor = 'pointer';
      const nameEl = document.createElement('span');
      nameEl.style.flex = '1';
      nameEl.style.minWidth = '0';
      nameEl.style.overflow = 'hidden';
      nameEl.style.textOverflow = 'ellipsis';
      nameEl.style.whiteSpace = 'nowrap';
      const label = lib.ancestryLabel && lib.ancestryLabel.length
        ? lib.ancestryLabel
        : lib.name;
      nameEl.textContent = label;
      nameEl.title = label;
      row.appendChild(nameEl);
      const badge = document.createElement('span');
      badge.style.padding = '2px 8px';
      badge.style.borderRadius = '999px';
      badge.style.fontSize = '0.75rem';
      badge.style.fontWeight = '600';
      badge.style.marginRight = '6px';
      if (lib.writeToken) {
        badge.style.background = '#dcfce7';
        badge.style.color = '#14532d';
        badge.textContent = 'Edit';
      } else {
        badge.style.background = '#dbeafe';
        badge.style.color = '#1e3a8a';
        badge.textContent = 'View';
      }
      row.appendChild(badge);
      const meta = document.createElement('span');
      meta.className = 'fp-muted';
      meta.style.fontSize = '0.8rem';
      meta.style.marginRight = '6px';
      try {
        const d = new Date(lib.lastVisited);
        meta.textContent = d.toLocaleDateString();
      } catch (_) { meta.textContent = ''; }
      row.appendChild(meta);
      const forget = document.createElement('button');
      forget.type = 'button';
      forget.textContent = '×';
      forget.title = 'Remove from this list (does NOT delete the library on the server)';
      forget.style.background = 'transparent';
      forget.style.border = '1px solid #d6c4a3';
      forget.style.borderRadius = '4px';
      forget.style.padding = '2px 8px';
      forget.style.cursor = 'pointer';
      forget.style.fontSize = '0.9rem';
      forget.style.color = '#7a6a55';
      forget.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!confirm('Remove "' + label + '" from this list?\n\n(The library itself stays on the server — this only forgets it in your browser.)')) return;
        forgetVisitedLibrary(lib.readId);
        renderServerLibraryList();
      });
      row.appendChild(forget);
      row.addEventListener('click', () => {
        const url = new URL(window.location.origin + window.location.pathname);
        url.searchParams.set('node', lib.readId);
        if (lib.writeToken) url.searchParams.set('w', lib.writeToken);
        window.location.href = url.toString();
      });
      list.appendChild(row);
    }
  }

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
  function makeNodeUrl(readId, writeToken) {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('node', readId);
    if (writeToken) url.searchParams.set('w', writeToken);
    return url.toString();
  }
  function rememberPublishedNode(readId, writeToken, framingId, name) {
    try {
      const raw = localStorage.getItem(PUBLISHED_KEY);
      const map = raw ? JSON.parse(raw) : {};
      map[readId] = {
        writeToken, framingId, name,
        publishedAt: new Date().toISOString(),
      };
      localStorage.setItem(PUBLISHED_KEY, JSON.stringify(map));
    } catch (_) { /* private mode / quota — ignore */ }
  }
  function escapeHtmlForModal(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Reusable modal — called after any URL-producing operation (first
  // publish, sub-library create, regenerate). Locks the close/done
  // buttons until the user checks "I have saved both URLs".
  // Pass opts.alreadySaved = true when the caller is just SHOWING URLs
  // the user already has (Share button, review URLs) — the checkbox
  // gate is pre-checked and the warning is toned down since there's
  // no "you're about to lose your only view of this token" risk.
  // Pass opts.writeUrl = '' to hide the Edit URL row (view-only share).
  function showUrlsModal(opts) {
    const alreadySaved = !!opts.alreadySaved;
    const hasWrite = !!(opts.writeUrl && opts.writeUrl.length);
    $('#fp-urls-title').textContent = opts.title || 'Your library URLs';
    $('#fp-urls-lede').innerHTML    = opts.lede || '';
    $('#fp-urls-read').value        = opts.readUrl || '';
    $('#fp-urls-write').value       = opts.writeUrl || '';

    // Hide the Edit URL row when there's nothing to show (view-only user).
    const writeRow = $('#fp-urls-write').closest('.fp-url-row');
    if (writeRow) writeRow.hidden = !hasWrite;

    const emailBody =
      (opts.emailIntro ? opts.emailIntro + '\r\n\r\n' : '') +
      'View URL: ' + (opts.readUrl || '') +
      (hasWrite ? ('\r\nEdit URL (KEEP PRIVATE): ' + opts.writeUrl) : '');
    $('#fp-urls-email').href = 'mailto:?subject=' +
      encodeURIComponent(opts.emailSubject || 'My framing library URLs') +
      '&body=' + encodeURIComponent(emailBody);

    // Toggle the warning + confirmation gate based on context.
    const warning = document.querySelector('.fp-urls-warning');
    const confirmLabel = $('#fp-urls-confirm-cb').closest('.fp-urls-confirm');
    if (alreadySaved) {
      if (warning) {
        warning.innerHTML = hasWrite
          ? '<strong>Sharing tip:</strong> the View URL is safe to share (view-only). Keep the Edit URL private — anyone with it can edit or delete this library.'
          : '<strong>Sharing tip:</strong> this View URL is safe to share — recipients get view-only access.';
      }
      if (confirmLabel) confirmLabel.hidden = true;
      $('#fp-urls-confirm-cb').checked = true;
      $('#fp-urls-done').disabled  = false;
      $('#fp-urls-close').disabled = false;
    } else {
      if (warning) {
        warning.innerHTML =
          '<strong>Save both URLs now.</strong> Losing the Edit URL means nobody can rescue you — there is no admin console, no password reset, and no way to email you a fresh link. A password manager entry, an encrypted note, or an email to yourself all work. The View URL can be regenerated with the Edit URL later, so the Edit URL is the master key.';
      }
      if (confirmLabel) confirmLabel.hidden = false;
      $('#fp-urls-confirm-cb').checked = false;
      $('#fp-urls-done').disabled  = true;
      $('#fp-urls-close').disabled = true;
    }
    $('#fp-urls-modal').hidden = false;
  }

  function shareLoadedLibraryUrls() {
    if (!loadedNode) return;
    const readUrl  = makeNodeUrl(loadedNode.readId);
    const writeUrl = loadedNode.writeToken
      ? makeNodeUrl(loadedNode.readId, loadedNode.writeToken)
      : '';
    const name = loadedNode.name || 'this library';
    showUrlsModal({
      title: 'Share — ' + name,
      lede: 'URLs for <b>' + escapeHtmlForModal(name) + '</b>. ' +
        (writeUrl
          ? 'Share the View URL to give someone read-only access. Keep the Edit URL private.'
          : 'You have View-only access to this library. Share the URL below to give someone else the same access.'),
      readUrl,
      writeUrl,
      emailSubject: 'Framing library — ' + name,
      emailIntro: 'You can open this library from any browser using the URL' +
        (writeUrl ? 's' : '') + ' below.',
      alreadySaved: true,
    });
  }
  // Module-level state for the currently-loaded server library, if any.
  // Populated when the page opens with ?node=<readId> (and optionally
  // ?w=<writeToken>). Null if the user's just working locally.
  let loadedNode = null;

  function isReadIdString(s)     { return typeof s === 'string' && /^[A-Za-z0-9]{10}$/.test(s); }
  function isWriteTokenString(s) { return typeof s === 'string' && /^[A-Za-z0-9]{16}$/.test(s); }

  async function initFromNodeUrl() {
    const params = new URLSearchParams(window.location.search);
    const readId     = params.get('node');
    const writeToken = params.get('w');
    if (!isReadIdString(readId)) return;
    try {
      const resp = await apiFetch(NODES_BASE + '/nodes/' + encodeURIComponent(readId));
      loadedNode = {
        readId,
        writeToken: isWriteTokenString(writeToken) ? writeToken : null,
        name:       resp.node.name,
        ancestry:   Array.isArray(resp.ancestry) ? resp.ancestry : [],
        children:   Array.isArray(resp.children) ? resp.children : [],
        framings:   Array.isArray(resp.framings) ? resp.framings : [],
        currentFramingId: null,
      };
      rememberVisitedLibrary(loadedNode.readId, loadedNode.writeToken, loadedNode.name, loadedNode.ancestry);
      renderLibraryBar();
      // Pop the Browse modal on library load so the user sees the list
      // of sub-libraries + framings first — pick one explicitly rather
      // than getting one auto-loaded (which is confusing without a
      // persistent side pane). When the Phase 4 tree browser lands as
      // a side pane, we can go back to auto-opening the most-recent
      // framing without hiding what else is there.
      openLibraryModal();
      if (!loadedNode.framings.length && !(loadedNode.children || []).length) {
        flashStatus('Library is empty — use "+ New framing" to add one (edit mode required).');
      }
    } catch (err) {
      console.error('Failed to load node:', err);
      alert('Could not load library from URL:\n\n' +
        ((err && err.message) ? err.message : String(err)) +
        '\n\n(First request after idle can take ~30 s while the server wakes up.)');
    }
  }

  async function openFramingFromLoadedNode(framingId) {
    if (!loadedNode) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/framings/' + encodeURIComponent(framingId) +
          '?readId=' + encodeURIComponent(loadedNode.readId)
      );
      state = normalizeState(resp.framing.content);
      currentPath = [];
      loadedNode.currentFramingId = framingId;
      setCurrentName(null);
      setDocTitle(resp.framing.title || 'Untitled framing');
      $('#fp-scope-input').value         = state.scope || '';
      $('#fp-metrics-input').value       = state.metrics.join('\n');
      $('#fp-decisions-input').value     = state.decisions.join('\n');
      $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
      render();
      renderAllMatrices();
      autoSave();
    } catch (err) {
      console.error('Failed to open framing:', err);
      alert('Could not open framing:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  function renderLibraryBar() {
    const bar = $('#fp-library-bar');
    if (!bar) return;
    if (!loadedNode) { bar.hidden = true; return; }
    bar.hidden = false;
    const mode = loadedNode.writeToken ? 'edit' : 'view';
    // Ancestry breadcrumb — root → … → current node — labels only per
    // the locked design (users can see where they are but never click
    // upward past their access).
    const crumb = (loadedNode.ancestry || []).join(' › ') || loadedNode.name;
    $('#fp-library-crumb').textContent = '📁 ' + crumb;
    $('#fp-library-crumb').title = crumb;
    const modeEl = $('#fp-library-mode');
    modeEl.textContent = mode === 'edit' ? 'Edit mode' : 'View only';
    modeEl.className = 'fp-library-mode ' + mode;
    // Rename is a structural-admin action; content-write on this node
    // is sufficient, and a parent-owner also has structural admin
    // (server enforces flow-down). Show it whenever we have a write
    // token — server will reject if it's actually not authorized.
    const renameBtn = $('#fp-library-rename');
    if (renameBtn) renameBtn.hidden = !loadedNode.writeToken;
    // Save changes / New framing — content-write on this node only.
    const saveBtn = $('#fp-library-save-framing');
    if (saveBtn) saveBtn.hidden = !loadedNode.writeToken;
    const newBtn = $('#fp-library-new-framing');
    if (newBtn) newBtn.hidden = !loadedNode.writeToken;
    // + New sub-library — structural admin. Server also accepts ancestor
    // write tokens; we show the button whenever the current node has a
    // write token in the URL, which is the common case.
    const newSubBtn = $('#fp-library-new-sublib');
    if (newSubBtn) newSubBtn.hidden = !loadedNode.writeToken;
  }

  async function createSubLibrary() {
    if (!loadedNode || !loadedNode.writeToken) return;
    const raw = window.prompt(
      'Name for the new sub-library:\n\n' +
      '(For example: "ORF 411 Fall 2026", "Alice Chen", "Team Zeta", or "Q3 planning drafts".)',
      ''
    );
    if (raw == null) return;
    const name = raw.trim();
    if (!name) return;
    const btn = $('#fp-library-new-sublib');
    const prev = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Creating…'; }
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) + '/children' +
          '?w=' + encodeURIComponent(loadedNode.writeToken),
        { method: 'POST', body: { name: name.slice(0, 200) } }
      );
      // Local cache — child appears immediately in Browse ▾.
      loadedNode.children.unshift({
        read_id:        resp.node.read_id,
        name:           resp.node.name,
        owner_label:    resp.node.owner_label,
        updated_at:     resp.node.updated_at,
        first_write_at: resp.node.first_write_at,
      });
      // Remember it in "My server libraries" so File → Open shows it too.
      const childAncestry = (loadedNode.ancestry || []).slice();
      childAncestry.push(resp.node.name);
      rememberVisitedLibrary(resp.node.read_id, resp.node.write_token, resp.node.name, childAncestry);
      // Show URLs so the user can save them before doing anything else.
      showUrlsModal({
        title: 'Sub-library created — ' + resp.node.name,
        lede: '<b>' + escapeHtmlForModal(resp.node.name) + '</b> is now a sub-library of <b>' +
              escapeHtmlForModal(loadedNode.name) + '</b>. ' +
              'To hand it to someone else (a student, a teammate), send them the Edit URL. ' +
              'You still have structural admin over the sub-library via your parent Edit URL, ' +
              'but you do NOT have content-write on it unless you keep the Edit URL below.',
        readUrl:  makeNodeUrl(resp.node.read_id),
        writeUrl: makeNodeUrl(resp.node.read_id, resp.node.write_token),
        emailSubject: 'Framing library — ' + resp.node.name,
        emailIntro: 'A framing library has been created for you. ' +
                    'Keep the Edit URL private — anyone with it can edit or delete framings in this library.',
      });
      flashStatus('Sub-library "' + resp.node.name + '" created.');
    } catch (err) {
      console.error('Create sub-library failed:', err);
      alert('Could not create sub-library:\n\n' +
        ((err && err.message) ? err.message : String(err)));
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = prev; }
    }
  }

  // Persist the current in-memory framing to the server. Requires a
  // loaded node in edit mode; the framing must already exist on the
  // server (i.e. loadedNode.currentFramingId is set). For an empty
  // library or a freshly-created framing that hasn't been persisted,
  // fall through to addNewFramingToLoadedLibrary().
  async function saveCurrentFramingToServer() {
    if (!loadedNode || !loadedNode.writeToken) return;
    const btn = $('#fp-library-save-framing');
    const prevText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }
    try {
      const title = (docTitle || '').replace(/^\s*AI draft\s*[—-]\s*/i, '')
        .replace(/^\s*Imported\s*[—-]\s*/i, '')
        .trim() || 'Untitled framing';
      if (!loadedNode.currentFramingId) {
        // Nothing on the server yet — add as a fresh framing.
        return await addCurrentFramingToLoadedLibrary(title);
      }
      const resp = await apiFetch(
        NODES_BASE + '/framings/' + encodeURIComponent(loadedNode.currentFramingId) +
          '?w=' + encodeURIComponent(loadedNode.writeToken),
        {
          method: 'PUT',
          body: { title: title.slice(0, 200), content: snapshotForSave() },
        }
      );
      // Update the local framings-list cache so Browse framings shows
      // the fresh updated_at + title without a full re-fetch.
      updateFramingInCache(resp.framing);
      if (btn) { btn.textContent = 'Saved ✓'; setTimeout(() => { btn.textContent = prevText; btn.disabled = false; }, 1200); }
      else flashStatus('Saved to library.');
    } catch (err) {
      console.error('Save framing failed:', err);
      alert('Save failed:\n\n' + ((err && err.message) ? err.message : String(err)));
      if (btn) { btn.disabled = false; btn.textContent = prevText; }
    }
  }

  // Create a fresh framing (starting from the current in-memory state,
  // OR an empty one if requested) in the currently-loaded library.
  async function addNewFramingToLoadedLibrary() {
    if (!loadedNode || !loadedNode.writeToken) return;
    const useCurrent = window.confirm(
      'Add a NEW framing to "' + (loadedNode.name || 'this library') + '".\n\n' +
      'OK — start from the framing currently on screen (adds a copy alongside).\n' +
      'Cancel — start from a blank framing (clears the workspace).'
    );
    if (useCurrent) {
      const title = (docTitle || 'New framing').replace(/^\s*AI draft\s*[—-]\s*/i, '')
        .replace(/^\s*Imported\s*[—-]\s*/i, '')
        .trim() || 'New framing';
      const raw = window.prompt('Name this new framing:', title);
      if (raw == null) return;
      const finalTitle = raw.trim() || 'New framing';
      await addCurrentFramingToLoadedLibrary(finalTitle);
    } else {
      // Blank framing — reset state, prompt for a name, then save.
      const raw = window.prompt('Name for the new blank framing:', 'New framing');
      if (raw == null) return;
      const finalTitle = raw.trim() || 'New framing';
      state = {
        title: '', scope: '', description: '',
        metrics: [], assignments: {}, chipColors: {},
        decisions: [], matrix: {}, subframes: {},
        uncertainties: [], uMatrix: {},
      };
      currentPath = [];
      $('#fp-scope-input').value         = '';
      $('#fp-metrics-input').value       = '';
      $('#fp-decisions-input').value     = '';
      $('#fp-uncertainties-input').value = '';
      render();
      renderAllMatrices();
      setDocTitle(finalTitle);
      await addCurrentFramingToLoadedLibrary(finalTitle);
    }
  }

  async function addCurrentFramingToLoadedLibrary(title) {
    if (!loadedNode || !loadedNode.writeToken) return;
    const btn = $('#fp-library-new-framing');
    const prevText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Adding…'; }
    try {
      const resp = await apiFetch(
        NODES_BASE + '/framings?nodeReadId=' + encodeURIComponent(loadedNode.readId) +
          '&w=' + encodeURIComponent(loadedNode.writeToken),
        {
          method: 'POST',
          body: { title: title.slice(0, 200), content: snapshotForSave() },
        }
      );
      // Push into local cache and mark this new framing as the currently-open one.
      loadedNode.framings.unshift({
        id:         resp.framing.id,
        title:      resp.framing.title,
        size_bytes: resp.framing.size_bytes,
        created_at: resp.framing.created_at,
        updated_at: resp.framing.updated_at,
      });
      loadedNode.currentFramingId = resp.framing.id;
      setDocTitle(resp.framing.title);
      flashStatus('Added to library.');
    } catch (err) {
      console.error('Add framing failed:', err);
      alert('Add framing failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = prevText; }
    }
  }

  function updateFramingInCache(fresh) {
    if (!loadedNode || !Array.isArray(loadedNode.framings) || !fresh) return;
    const idx = loadedNode.framings.findIndex(f => f.id === fresh.id);
    if (idx >= 0) {
      loadedNode.framings[idx].title      = fresh.title;
      loadedNode.framings[idx].updated_at = fresh.updated_at;
      loadedNode.framings[idx].size_bytes = fresh.size_bytes;
      // Re-sort by updated_at DESC so the freshly-saved framing bubbles
      // to the top of the Browse list, matching the server's sort.
      loadedNode.framings.sort(
        (a, b) => (b.updated_at || '').localeCompare(a.updated_at || '')
      );
    }
  }

  async function renameLoadedLibrary() {
    if (!loadedNode || !loadedNode.writeToken) return;
    const current = loadedNode.name || '';
    const raw = window.prompt(
      'Rename this library:\n\n(This changes the display label only — your URLs stay the same.)',
      current
    );
    if (raw == null) return;
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (trimmed === current) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) +
          '?w=' + encodeURIComponent(loadedNode.writeToken),
        { method: 'PATCH', body: { name: trimmed } }
      );
      loadedNode.name = resp.node.name;
      // The ancestry breadcrumb ends with THIS node, so also update the
      // last element (a re-fetch would be more thorough but this is
      // cheaper and correct for the common case).
      if (Array.isArray(loadedNode.ancestry) && loadedNode.ancestry.length) {
        loadedNode.ancestry[loadedNode.ancestry.length - 1] = resp.node.name;
      }
      renderLibraryBar();
      // If this was the user's personal library, update localStorage
      // so the tooltip on "Open my library" stays fresh.
      const myLib = readMyLibrary();
      if (myLib && myLib.readId === loadedNode.readId) {
        writeMyLibrary(myLib.readId, myLib.writeToken, resp.node.name);
      }
      flashStatus('Library renamed.');
    } catch (err) {
      console.error('Rename failed:', err);
      alert('Rename failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  function openLibraryModal() {
    if (!loadedNode) return;
    $('#fp-library-modal-name').textContent = loadedNode.name;
    $('#fp-library-modal-crumb').textContent =
      (loadedNode.ancestry || []).join(' › ');

    // Sub-libraries section — direct children (child nodes). Clicking a
    // row navigates to that child's read URL (view mode). To open a
    // child in edit mode, the user needs that child's own write URL.
    const subs = $('#fp-library-sublib-list');
    subs.innerHTML = '';
    const children = loadedNode.children || [];
    if (!children.length) {
      const empty = document.createElement('div');
      empty.style.padding = '16px';
      empty.style.textAlign = 'center';
      empty.style.color = '#7a6a55';
      empty.style.fontStyle = 'italic';
      empty.textContent = 'No sub-libraries in this library.';
      subs.appendChild(empty);
    } else {
      for (const c of children) {
        const row = document.createElement('div');
        row.className = 'fp-file-row';
        row.style.cursor = 'pointer';
        const nameEl = document.createElement('span');
        nameEl.style.flex = '1';
        nameEl.style.minWidth = '0';
        nameEl.style.overflow = 'hidden';
        nameEl.style.textOverflow = 'ellipsis';
        nameEl.style.whiteSpace = 'nowrap';
        // Prefix an arrow so it visually reads as a folder to descend into.
        nameEl.textContent = '📂 ' + (c.name || 'Untitled library');
        nameEl.title = c.name || '';
        row.appendChild(nameEl);
        if (c.first_write_at == null) {
          const badge = document.createElement('span');
          badge.textContent = 'unclaimed';
          badge.style.padding = '2px 8px';
          badge.style.borderRadius = '999px';
          badge.style.background = '#fef3c7';
          badge.style.color = '#78350f';
          badge.style.fontSize = '0.75rem';
          badge.style.fontWeight = '600';
          badge.style.marginRight = '6px';
          badge.title = 'Nobody has opened this library\'s Edit URL yet';
          row.appendChild(badge);
        }
        const meta = document.createElement('span');
        meta.className = 'fp-muted';
        meta.style.fontSize = '0.85rem';
        try {
          meta.textContent = 'updated ' + new Date(c.updated_at).toLocaleDateString();
        } catch (_) { meta.textContent = ''; }
        row.appendChild(meta);
        row.addEventListener('click', () => {
          $('#fp-library-modal').hidden = true;
          const url = new URL(window.location.origin + window.location.pathname);
          url.searchParams.set('node', c.read_id);
          // Do NOT auto-forward the current write token — content-write
          // is per-node, not inherited. The child opens in view mode
          // unless the user has that specific library's Edit URL.
          window.location.href = url.toString();
        });
        subs.appendChild(row);
      }
    }

    // Framings section — documents in THIS node.
    const list = $('#fp-library-framing-list');
    list.innerHTML = '';
    if (!loadedNode.framings.length) {
      const empty = document.createElement('div');
      empty.style.padding = '16px';
      empty.style.textAlign = 'center';
      empty.style.color = '#7a6a55';
      empty.style.fontStyle = 'italic';
      empty.textContent = 'No framings in this library.';
      list.appendChild(empty);
    } else {
      for (const f of loadedNode.framings) {
        const row = document.createElement('div');
        row.className = 'fp-file-row';
        row.style.cursor = 'pointer';
        const nameEl = document.createElement('span');
        nameEl.style.flex = '1';
        nameEl.textContent = f.title || 'Untitled framing';
        row.appendChild(nameEl);
        const meta = document.createElement('span');
        meta.className = 'fp-muted';
        meta.style.fontSize = '0.85rem';
        try {
          meta.textContent = 'edited ' + new Date(f.updated_at).toLocaleString();
        } catch (_) { meta.textContent = ''; }
        row.appendChild(meta);
        if (loadedNode.currentFramingId === f.id) {
          const badge = document.createElement('span');
          badge.textContent = '★ open';
          badge.style.marginLeft = '8px';
          badge.style.color = '#8a3a1a';
          badge.style.fontWeight = '600';
          badge.style.fontSize = '0.85rem';
          row.appendChild(badge);
        }
        row.addEventListener('click', () => {
          $('#fp-library-modal').hidden = true;
          openFramingFromLoadedNode(f.id);
        });
        list.appendChild(row);
      }
    }
    $('#fp-library-modal').hidden = false;
  }

  async function publishToLibrary() {
    const btn = $('#fp-menu-publish');
    const prevText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }
    try {
      // The framing title is best derived from whatever meaningful label
      // we already have — bot title, current save name, banner-derived
      // suggestion, or a date-stamped placeholder as last resort.
      const framingTitle = (state.title && state.title.trim())
        || (currentName && currentName.trim())
        || deriveSuggestedName();

      // Do we already have a personal library on this browser? If so,
      // ADD this framing to it. If not, create the library first, then
      // add this framing as its first item.
      let lib = readMyLibrary();
      let isFirstPublish = false;
      if (!lib) {
        isFirstPublish = true;
        // Library name: use the first framing's title as the library
        // name for now — the user can rename later. Prefix "My framings —"
        // makes it obvious this is a personal container, not a single
        // case.
        const libName = 'My framings — ' + framingTitle;
        const nodeResp = await apiFetch(NODES_BASE + '/nodes', {
          method: 'POST',
          body: { name: libName.slice(0, 200) },
        });
        lib = {
          readId:     nodeResp.node.read_id,
          writeToken: nodeResp.node.write_token,
          name:       libName,
        };
        writeMyLibrary(lib.readId, lib.writeToken, lib.name);
      }

      // Save the current framing into the library.
      const framingResp = await apiFetch(
        NODES_BASE + '/framings?nodeReadId=' + encodeURIComponent(lib.readId) +
          '&w=' + encodeURIComponent(lib.writeToken),
        {
          method: 'POST',
          body: { title: framingTitle.slice(0, 200), content: snapshotForSave() },
        }
      );
      rememberPublishedNode(lib.readId, lib.writeToken, framingResp.framing.id, framingTitle);

      if (isFirstPublish) {
        // Show the URL modal — this is the ONE moment the user must
        // save these URLs. Subsequent publishes just flash a status.
        showUrlsModal({
          title: 'Your personal library is ready',
          lede: 'Your first saved framing — <b>' + escapeHtmlForModal(framingTitle) + '</b> — is on the server. ' +
                'Every future <em>Save to my library</em> will add to <b>the same library</b> at these URLs. ' +
                'You can revisit this library from any browser.',
          readUrl:  makeNodeUrl(lib.readId),
          writeUrl: makeNodeUrl(lib.readId, lib.writeToken),
          emailSubject: 'My framing library URLs',
          emailIntro: 'You can revisit your library from any browser using the URLs below. ' +
                      'Keep the Edit URL private — anyone with it can edit or delete your framings.',
        });
        flashStatus('Library created — first framing published.');
      } else {
        flashStatus('Added to your library.');
      }
    } catch (err) {
      console.error('Save to library failed:', err);
      alert('Sorry — save failed:\n\n' +
        ((err && err.message) ? err.message : String(err)) +
        '\n\n(First request after idle can take ~30 s while the server wakes up. Try again in a moment.)');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = prevText; }
      closeFileMenu();
    }
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initAdmin();                                         // reveals admin bar if ?admin=1
    load();
    // ?node= URL wins over localStorage — deferred (async) so it can
    // fetch the server-side node in parallel with the rest of init.
    // The initial paint uses whatever load() restored; if a node URL
    // is present, initFromNodeUrl overwrites state when the fetch
    // returns.
    initFromNodeUrl();
    // First-visit courtesy: auto-add the Public examples library to
    // every visitor's "My server libraries" list so File → Open shows
    // it. Guarded by presence — never overwrites an existing entry
    // (which would clobber the user's write token if they later
    // upgraded to Edit access).
    (function autoAddPublicExamples() {
      if (!PUBLIC_EXAMPLES_READ_ID) return;
      const existing = readVisitedLibraries()[PUBLIC_EXAMPLES_READ_ID];
      if (existing) return;
      rememberVisitedLibrary(
        PUBLIC_EXAMPLES_READ_ID,
        null,   // read-only for casual users
        PUBLIC_EXAMPLES_NAME,
        ['Root (Warren)', PUBLIC_EXAMPLES_NAME]
      );
    })();
    // If the URL came from the Ask Professor Powell chatbot (via the
    // create_framing_link tool), stamp the banner so users see this is
    // an AI draft — same treatment as drafts from the on-page bot.
    try {
      const src = new URLSearchParams(window.location.search).get('src');
      if (src === 'askpp' && state.metrics && state.metrics.length > 0) {
        // Prefer the case title the bot generated ("Aurora Motors") so the
        // banner AND the Save-as prefill are usefully specific. Fall through
        // to the generic label only when no title is present.
        const askppLabel = (state.title && state.title.trim())
          ? ('AI draft — ' + state.title.trim())
          : 'AI draft — Ask Professor Powell (chatbot)';
        setDocTitle(askppLabel);
      }
    } catch (_) { /* ignore malformed URLs */ }
    $('#fp-scope-input').value         = state.scope || '';
    $('#fp-metrics-input').value       = state.metrics.join('\n');
    $('#fp-decisions-input').value     = state.decisions.join('\n');
    $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
    renderCurrentFileLabel();
    $$('.fp-drop-zone').forEach(wireDropZone);
    $('#fp-scope-input').addEventListener('input', () => {
      state.scope = $('#fp-scope-input').value;
      autoSave();
    });
    $('#fp-metrics-input').addEventListener('input',       syncMetricsFromTextarea);
    $('#fp-decisions-input').addEventListener('input',     () => syncListFromTextarea('decision'));
    $('#fp-uncertainties-input').addEventListener('input', () => syncListFromTextarea('uncertainty'));
    // Per-level scope — only meaningful when drilled into a sub-decision;
    // wrapper is hidden at top level via renderSubScopeField.
    const subScopeInput = $('#fp-decision-subscope-input');
    if (subScopeInput) {
      subScopeInput.addEventListener('input', () => {
        if (atTopLevel()) return;
        currentFrame().scope = subScopeInput.value;
        autoSave();
      });
    }
    // File menu
    $('#fp-menu-new').addEventListener('click', () => {
      closeFileMenu();
      if (!confirm('Start a new framing? Anything on screen is discarded (Save to your library first if you want to keep it).')) return;
      state = {
        title: '', scope: '', description: '',
        metrics: [], assignments: {}, chipColors: {},
        decisions: [], matrix: {}, subframes: {},
        uncertainties: [], uMatrix: {},
      };
      currentPath = [];
      setCurrentName(null);
      setDocTitle(null);   // wipe the banner too
      $('#fp-scope-input').value         = '';
      $('#fp-metrics-input').value       = '';
      $('#fp-decisions-input').value     = '';
      $('#fp-uncertainties-input').value = '';
      render(); renderAllMatrices(); autoSave();
    });
    $('#fp-menu-open').addEventListener('click', () => {
      closeFileMenu();
      openOpenModal();
    });
    $('#fp-menu-open-my-lib').addEventListener('click', () => {
      closeFileMenu();
      openMyLibrary();
    });
    refreshMyLibraryMenuItem();
    $('#fp-menu-import').addEventListener('click', () => {
      closeFileMenu();
      openImportPicker();
    });
    $('#fp-menu-publish').addEventListener('click', publishToLibrary);
    $('#fp-menu-export').addEventListener('click', () => {
      closeFileMenu();
      exportCurrentDocument();
    });
    // Open-modal wiring
    $('#fp-modal-close').addEventListener('click', closeOpenModal);
    $('#fp-modal-cancel').addEventListener('click', closeOpenModal);
    // Add-library-by-URL wiring inside Open modal
    (function wireAddLibrary() {
      const btn   = $('#fp-add-lib-btn');
      const input = $('#fp-add-lib-input');
      if (!btn || !input) return;
      btn.addEventListener('click', () => {
        const val = input.value;
        if (val && val.trim()) addServerLibraryByUrl(val);
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (input.value.trim()) addServerLibraryByUrl(input.value);
        }
      });
    })();
    $('#fp-open-modal').addEventListener('click', (e) => {
      // Click on the backdrop (not the card itself) closes the modal.
      if (e.target === $('#fp-open-modal')) closeOpenModal();
    });
    // Library bar / browse-modal wiring.
    (function wireLibraryModal() {
      const openBtn  = $('#fp-library-browse');
      const modal    = $('#fp-library-modal');
      const closeBtn = $('#fp-library-modal-close');
      const cancel   = $('#fp-library-modal-cancel');
      if (openBtn) openBtn.addEventListener('click', openLibraryModal);
      const dismiss = () => { if (modal) modal.hidden = true; };
      if (closeBtn) closeBtn.addEventListener('click', dismiss);
      if (cancel)   cancel.addEventListener('click', dismiss);
      if (modal)    modal.addEventListener('click', (e) => {
        if (e.target === modal) dismiss();
      });
      const renameBtn = $('#fp-library-rename');
      if (renameBtn) renameBtn.addEventListener('click', renameLoadedLibrary);
      const shareBtn = $('#fp-library-share');
      if (shareBtn) shareBtn.addEventListener('click', shareLoadedLibraryUrls);
      const saveBtn = $('#fp-library-save-framing');
      if (saveBtn) saveBtn.addEventListener('click', saveCurrentFramingToServer);
      const newBtn  = $('#fp-library-new-framing');
      if (newBtn)  newBtn.addEventListener('click', addNewFramingToLoadedLibrary);
      const newSubBtn = $('#fp-library-new-sublib');
      if (newSubBtn) newSubBtn.addEventListener('click', createSubLibrary);
    })();
    // URL modal wiring — Done/close are locked until the user
    // confirms they've saved both URLs, so an accidental Enter can't
    // dismiss the only view of the write token.
    (function wireUrlsModal() {
      const cb    = $('#fp-urls-confirm-cb');
      const done  = $('#fp-urls-done');
      const close = $('#fp-urls-close');
      const modal = $('#fp-urls-modal');
      if (!cb || !done || !close || !modal) return;
      cb.addEventListener('change', () => {
        const on = !!cb.checked;
        done.disabled  = !on;
        close.disabled = !on;
        close.title    = on ? 'Close' : 'Confirm below first';
      });
      const dismiss = () => { if (cb.checked) modal.hidden = true; };
      done.addEventListener('click', dismiss);
      close.addEventListener('click', dismiss);
      // Backdrop click is a no-op (safer — no accidental loss).
    })();
    // Copy-button delegation for the URL modal's Copy buttons.
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.fp-url-copy');
      if (!btn) return;
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      try { target.select(); target.setSelectionRange(0, target.value.length); } catch (_) { /* ignore */ }
      const finish = () => {
        const orig = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(() => { btn.textContent = orig; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(target.value).then(finish, finish);
      } else {
        try { document.execCommand('copy'); } catch (_) { /* selection remains */ }
        finish();
      }
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
      render(); renderAllMatrices(); autoSave();
    });
    $('#fp-reset').addEventListener('click', () => {
      if (!confirm('Delete every metric, decision, and uncertainty, clear the pyramid and both matrices, and unload the current framing? (Framings saved to your library are not affected.) Cannot be undone.')) return;
      state = {
        title: '', scope: '', description: '',
        metrics: [], assignments: {}, chipColors: {},
        decisions: [], matrix: {}, subframes: {},
        uncertainties: [], uMatrix: {},
      };
      currentPath = [];
      setCurrentName(null);
      setDocTitle(null);   // also wipe the banner
      $('#fp-scope-input').value         = '';
      $('#fp-metrics-input').value       = '';
      $('#fp-decisions-input').value     = '';
      $('#fp-uncertainties-input').value = '';
      render(); renderAllMatrices(); autoSave();
    });
    $('#fp-share').addEventListener('click', async () => {
      const url = toShareUrl();
      try {
        await navigator.clipboard.writeText(url);
        flashStatus('URL copied to clipboard.');
      } catch (_) {
        window.prompt('Copy this URL to share your framing:', url);
      }
    });
    $('#fp-print').addEventListener('click', () => window.print());
    // Admin bar buttons (only meaningful when ?admin=1 unhid the bar).
    const adminSetBtn   = $('#fp-admin-set-token');
    const adminClearBtn = $('#fp-admin-clear-token');
    const adminHelpBtn  = $('#fp-admin-help');
    if (adminSetBtn)   adminSetBtn.addEventListener('click', promptForToken);
    if (adminClearBtn) adminClearBtn.addEventListener('click', clearToken);
    if (adminHelpBtn)  adminHelpBtn.addEventListener('click', showAdminHelp);
    // Per-matrix First-draft / Reset buttons (delegated: covers both matrices).
    document.addEventListener('click', (e) => {
      const draft = e.target.closest('.fp-matrix-draft');
      if (draft) {
        const k = draft.dataset.kind;
        if (k === 'decision' || k === 'uncertainty') runMatrixDraft(k);
        return;
      }
      const reset = e.target.closest('.fp-matrix-reset');
      if (reset) {
        const k = reset.dataset.kind;
        if (k === 'decision' || k === 'uncertainty') resetMatrix(k);
      }
    });
    // Ask Professor Powell (framing bot)
    const botBtn = $('#fp-bot-generate');
    if (botBtn) botBtn.addEventListener('click', runFramingRequest);
    const botClear = $('#fp-bot-clear');
    if (botClear) botClear.addEventListener('click', clearBotInputs);
    // Ctrl/Cmd-Enter inside the description box submits.
    const botDesc = $('#fp-bot-desc');
    if (botDesc) botDesc.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runFramingRequest();
      }
    });
    // Re-align textareas on window resize: header cells can wrap or
    // unwrap when the matrix column widths change, and that changes
    // the offset the textarea needs to match.
    let resizeT = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(alignMatrixTextareas, 100);
    });
    render();
    renderAllMatrices();
  });
})();
</script>
{% endraw %}
