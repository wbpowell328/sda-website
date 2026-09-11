---
layout: page
title: "The decision modeling tool (BETA)"
permalink: /decision-modeling-tool-beta/
date: 2026-09-11
noindex: true
sitemap: false
---

{% raw %}
<!-- Beta banner — always visible on the beta page. This whole page is
     the testing version at /decision-framing-tool-beta/, hitting the
     beta chatbot service. New features land here before promotion. -->
<div id="fp-beta-banner" class="fp-beta-banner" hidden>
  🧪 <strong>Beta version</strong> — decision modeling companion to the framing tool. Testing playground for new features
  and prompt experiments. Not the production tool. AI calls route to
  <code>castle-chatbot-beta.onrender.com</code>. The production tool lives at
  <a href="/decision-framing-tool/"><code>warrenpowell.org/decision-framing-tool/</code></a>.
</div>

<p>The decision framing tool is designed to help people making decisions that improve performance. At this stage it is primarily an "ideating" tool. The process starts by asking you to identify who is making decisions, and then provides several ways to provide background information, from a sentence or two to complete documents in various forms.</p>

<p>The tool helps you frame a decision problem, which consists of identifying performance metrics, types of decisions, and sources of uncertainty that might affect performance. A specially trained AI agent is available to help throughout. You can ask it to provide a rough draft of an entire frame, but we recommend providing as much input as you can. The most important input from you is providing the context and the performance metrics that are most important to you.</p>

<p>After specifying the metrics, you can enter the types of decisions that affect performance. These can be quite broad, such as "Assign drivers to loads" to "Purchase parts from supplier X". You can ask the AI agent to suggest decisions which it considers to have a medium or high impact on at least one performance metric.</p>

<p>If you have any questions, just <button type="button" class="fp-section-help" title="Open the Ask Professor Powell chat panel">? Ask</button></p>

<p>The framing process is divided into four components, each with its own AI-assists. Once framing is complete, the <a href="#modeling"><strong>Modeling</strong></a> section at the bottom moves into building and running the model.</p>

<ol>
  <li><a href="#problem-scope"><strong>Problem scope</strong></a></li>
  <li><a href="#metrics-pyramid-tool"><strong>Metrics pyramid tool</strong></a></li>
  <li><a href="#decision-prioritization-tool"><strong>Decision prioritization tool</strong></a></li>
  <li><a href="#uncertainty-prioritization-tool"><strong>Uncertainty prioritization tool</strong></a></li>
  <li><a href="#modeling"><strong>Modeling</strong></a> <span class="fp-muted">(after framing)</span></li>
</ol>

<div class="fp-toolbar">
  <details class="fp-menu" id="fp-file-menu">
    <summary>File ▾</summary>
    <div class="fp-menu-items">
      <button type="button" id="fp-menu-new">New framing</button>
      <button type="button" id="fp-menu-open">Open…</button>
      <button type="button" id="fp-menu-open-my-lib" title="Jump to your personal server library (framings you have saved)" disabled>Open my library</button>
      <button type="button" id="fp-menu-save" title="Save changes to the currently-open framing (in-place update). If nothing has been saved yet, falls through to Save as…">Save</button>
      <button type="button" id="fp-menu-publish" title="Save the current framing as a new entry in your online library. Creates your personal library on the first save; adds a new framing to it on subsequent uses.">Save as…</button>
      <button type="button" id="fp-menu-export" title="Download the current framing as a JSON file (useful for sharing or archiving)">Export as JSON…</button>
      <button type="button" id="fp-menu-import" title="Load a decision from a .json file someone sent you (or one you exported earlier)">Import from JSON…</button>
    </div>
  </details>
  <span class="fp-toolbar-sep" aria-hidden="true"></span>
  <button type="button" id="fp-clear">Clear pyramid</button>
  <button type="button" id="fp-reset">Reset all</button>
  <button type="button" id="fp-print">Print</button>
  <button type="button" id="fp-help" class="fp-section-help" title="Open the Ask Professor Powell chat panel (save, share, rename, sub-libraries, ideas, etc.). Same panel every other ? Ask button opens.">? Ask</button>
  <span id="fp-status" class="fp-status" role="status"></span>
</div>

<!-- Open-pyramid modal — populated at click time from localStorage. -->
<div id="fp-open-modal" class="fp-modal" hidden>
  <div class="fp-modal-card" role="dialog" aria-modal="true" aria-labelledby="fp-modal-title">
    <div class="fp-modal-header">
      <h3 id="fp-modal-title">Open framing</h3>
      <button type="button" class="fp-modal-close" id="fp-modal-close" aria-label="Close">×</button>
    </div>
    <h4 class="fp-modal-subheader">Public examples</h4>
    <p class="fp-muted" style="margin: 0 0 6px 0;">A curated collection of framings that illustrate the tool. Open one to browse or copy it into your own library for editing.</p>
    <div class="fp-file-list">
      <div id="fp-public-examples-row" class="fp-file-row" role="button" tabindex="0" style="cursor: pointer;"></div>
    </div>

    <div id="fp-legacy-section" hidden>
      <h4 class="fp-modal-subheader" style="margin-top: 16px;">Legacy local saves</h4>
      <p class="fp-muted" style="margin: 0 0 6px 0;">Framings saved to this browser before the switch to server libraries. Click one to load it, then use <b>File → Save as…</b> to move it into your server library. This section will disappear once it's empty.</p>
      <div id="fp-file-list" class="fp-file-list"></div>
    </div>

    <h4 class="fp-modal-subheader" style="margin-top: 16px;">My server libraries</h4>
    <p class="fp-muted" style="margin: 0 0 6px 0;">Server-backed libraries you've visited on this browser. Includes your own personal library and any shared library you've opened. Click to reopen.</p>
    <div class="fp-add-lib-row">
      <input type="url" id="fp-add-lib-input"
        placeholder="Paste a library View or Edit URL to add it to this list…"
        aria-label="Library URL to add" />
      <button type="button" id="fp-add-lib-btn">Add</button>
    </div>
    <div id="fp-server-lib-list" class="fp-file-list"></div>

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
<!-- Persistent tree side pane — visible on wide screens whenever a
     library is loaded. Same content as the Browse modal, but always
     on-screen: no click-through required to switch framings or sub-
     libraries. Below ~1100px the pane hides; the Browse ▾ modal is
     the fallback. -->
<aside id="fp-tree-pane" class="fp-tree-pane" hidden>
  <div class="fp-tree-header">
    <span class="fp-tree-name" id="fp-tree-name" title=""></span>
    <button type="button" id="fp-tree-refresh" class="fp-tree-refresh" title="Reload the tree from the server">↻</button>
  </div>
  <div class="fp-tree-crumb" id="fp-tree-crumb"></div>
  <div class="fp-tree-content" id="fp-tree-content"></div>
</aside>

<!-- Lease banner — shown in Edit mode when someone ELSE is currently
     holding the 5-min soft-lock on this library. Sits above the library
     bar to draw the eye. Take-over button is prominent; write actions
     in the library bar are disabled until the user takes over. -->
<div id="fp-lease-banner" class="fp-lease-banner" hidden>
  <span class="fp-lease-icon">🔒</span>
  <span class="fp-lease-msg" id="fp-lease-msg"></span>
  <button type="button" id="fp-lease-take-over" class="fp-lease-take-over">Take over</button>
</div>

<div id="fp-library-bar" class="fp-library-bar" hidden>
  <span id="fp-library-crumb" class="fp-library-crumb"></span>
  <span id="fp-library-mode" class="fp-library-mode"></span>
  <button type="button" id="fp-library-save-framing" class="fp-library-browse fp-library-primary" title="Save your edits to the currently-open framing (in-place update)" hidden>Save</button>
  <button type="button" id="fp-library-new-framing" class="fp-library-browse" title="Add a new empty framing to this library" hidden>+ New framing</button>
  <button type="button" id="fp-library-new-sublib" class="fp-library-browse" title="Create a new sub-library inside this library (for a class, team, or project)" hidden>+ New sub-library</button>
  <button type="button" id="fp-library-share" class="fp-library-browse" title="Show the View and Edit URLs for this library so you can copy or share them">Share URLs</button>
  <button type="button" id="fp-library-rename" class="fp-library-browse" title="Rename this library" hidden>Rename ✎</button>
  <button type="button" id="fp-library-regenerate" class="fp-library-browse" title="Mint fresh View and Edit URLs. Anyone with the OLD URLs (including you) loses access immediately." hidden>Regenerate URLs</button>
  <button type="button" id="fp-library-delete" class="fp-library-browse fp-library-danger" title="Delete this library and everything inside it. Cannot be undone." hidden>Delete library</button>
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

<!-- Idea box — modal spawned by the "Generate ideas" buttons on the
     Decisions and Uncertainties panels. Shows the AI's proposed list
     as checkboxes; user picks which ones to append to the underlying
     textarea. -->
<!-- Decision-types filter modal — spawned by the "Types…" button on the
     Decisions header. Checkboxes for the 10 types from
     https://warrenpowell.org/decisionsdecisions/#types-of-decision-settings.
     When any are checked, Generate ideas sends the numbers to the server,
     and the server injects the FULL type explanations into the prompt so
     the AI restricts its proposals to those types. If none are checked,
     the generator runs with no type filter (current behavior). Session-
     only — reset on page reload. -->
<div id="fp-decision-types-modal" class="fp-modal" hidden>
  <div class="fp-modal-card">
    <div class="fp-modal-header">
      <h3>Filter generated decisions by type</h3>
      <button type="button" class="fp-modal-close" id="fp-decision-types-modal-close" aria-label="Close">×</button>
    </div>
    <p class="fp-muted" style="margin: 0 0 8px 0;">
      Check any of the 10 <a href="/decisionsdecisions/#types-of-decision-settings" target="_blank" rel="noopener">decision types</a>
      to constrain what the AI proposes when you click Generate ideas. Leave all
      unchecked to let the AI decide (current behavior).
    </p>
    <div id="fp-decision-types-list" class="fp-decision-types-list">
      <label><input type="checkbox" value="1"> <b>1.</b> Physical and financial decisions</label>
      <label><input type="checkbox" value="2"> <b>2.</b> Complex / strategic decisions</label>
      <label><input type="checkbox" value="3"> <b>3.</b> Information acquisition / observation</label>
      <label><input type="checkbox" value="4"> <b>4.</b> Information sharing / communication</label>
      <label class="is-disabled"><input type="checkbox" value="5" disabled> <b>5.</b> Performance metrics / objectives <span class="fp-type-inactive">— set separately via the metrics pyramid</span></label>
      <label><input type="checkbox" value="6"> <b>6.</b> Choosing functions</label>
      <label><input type="checkbox" value="7"> <b>7.</b> Setting parameters</label>
      <label><input type="checkbox" value="8"> <b>8.</b> Labeling / identification / estimation</label>
      <label><input type="checkbox" value="9"> <b>9.</b> Features and behaviors</label>
      <label class="is-disabled"><input type="checkbox" value="10" disabled> <b>10.</b> Deciding what to decide <span class="fp-type-inactive">— that's what this whole tool is for</span></label>
    </div>
    <div id="fp-decision-types-status" class="fp-bot-status" role="status" aria-live="polite" style="min-height: 1.2em;"></div>
    <div class="fp-modal-actions" style="justify-content: space-between; gap: 8px; flex-wrap: wrap;">
      <div style="display: flex; gap: 6px;">
        <button type="button" id="fp-decision-types-all" class="fp-modal-mini">All</button>
        <button type="button" id="fp-decision-types-none" class="fp-modal-mini">None</button>
        <button type="button" id="fp-decision-types-suggest" class="fp-modal-mini"
                title="Ask the AI to read your scope / description / notes / metrics / existing decisions and check the types most relevant to your setting.">✦ Suggest</button>
      </div>
      <div>
        <button type="button" id="fp-decision-types-ok" class="fp-modal-primary">Done</button>
      </div>
    </div>
  </div>
</div>

<!-- Uncertainty-types filter modal — spawned by the "Types…" button on
     the Uncertainties header. Checkboxes for the 12 categories from
     https://warrenpowell.org/modeling-uncertainty/#categories.
     Same UX as the decision-types picker. -->
<div id="fp-uncertainty-types-modal" class="fp-modal" hidden>
  <div class="fp-modal-card">
    <div class="fp-modal-header">
      <h3>Filter generated uncertainties by category</h3>
      <button type="button" class="fp-modal-close" id="fp-uncertainty-types-modal-close" aria-label="Close">×</button>
    </div>
    <p class="fp-muted" style="margin: 0 0 8px 0;">
      Check any of the 12 <a href="/modeling-uncertainty/#categories" target="_blank" rel="noopener">categories of uncertainty</a>
      to constrain what the AI proposes when you click Generate ideas. Leave all
      unchecked to let the AI decide (current behavior).
    </p>
    <div id="fp-uncertainty-types-list" class="fp-decision-types-list">
      <label><input type="checkbox" value="1"> <b>1.</b> Observational uncertainty</label>
      <label><input type="checkbox" value="2"> <b>2.</b> Exogenous uncertainty</label>
      <label><input type="checkbox" value="3"> <b>3.</b> Prognostic uncertainty</label>
      <label><input type="checkbox" value="4"> <b>4.</b> Inferential uncertainty</label>
      <label><input type="checkbox" value="5"> <b>5.</b> Experimental variability</label>
      <label><input type="checkbox" value="6"> <b>6.</b> Model uncertainty</label>
      <label><input type="checkbox" value="7"> <b>7.</b> Transitional uncertainty</label>
      <label><input type="checkbox" value="8"> <b>8.</b> Implementation errors</label>
      <label><input type="checkbox" value="9"> <b>9.</b> Communication errors</label>
      <label><input type="checkbox" value="10"> <b>10.</b> Algorithmic instability</label>
      <label><input type="checkbox" value="11"> <b>11.</b> Goal uncertainty</label>
      <label><input type="checkbox" value="12"> <b>12.</b> Environmental uncertainty</label>
    </div>
    <div id="fp-uncertainty-types-status" class="fp-bot-status" role="status" aria-live="polite" style="min-height: 1.2em;"></div>
    <div class="fp-modal-actions" style="justify-content: space-between; gap: 8px; flex-wrap: wrap;">
      <div style="display: flex; gap: 6px;">
        <button type="button" id="fp-uncertainty-types-all" class="fp-modal-mini">All</button>
        <button type="button" id="fp-uncertainty-types-none" class="fp-modal-mini">None</button>
        <button type="button" id="fp-uncertainty-types-suggest" class="fp-modal-mini"
                title="Ask the AI to read your scope / description / notes / metrics / existing decisions and check the categories most relevant to your setting.">✦ Suggest</button>
      </div>
      <div>
        <button type="button" id="fp-uncertainty-types-ok" class="fp-modal-primary">Done</button>
      </div>
    </div>
  </div>
</div>

<div id="fp-ideas-modal" class="fp-modal" hidden>
  <div class="fp-modal-card">
    <div class="fp-modal-header">
      <h3 id="fp-ideas-modal-title">Idea box</h3>
      <button type="button" class="fp-modal-close" id="fp-ideas-modal-close" aria-label="Close">×</button>
    </div>
    <p id="fp-ideas-modal-lede" class="fp-muted" style="margin: 0 0 6px 0;"></p>
    <div id="fp-ideas-list" class="fp-ideas-list"></div>
    <div id="fp-ideas-status" class="fp-bot-status" role="status" aria-live="polite"></div>
    <div class="fp-modal-actions" style="justify-content: space-between; gap: 8px; flex-wrap: wrap;">
      <div style="display: flex; gap: 6px;">
        <button type="button" id="fp-ideas-select-all" class="fp-modal-mini">Select all</button>
        <button type="button" id="fp-ideas-select-none" class="fp-modal-mini">None</button>
        <button type="button" id="fp-ideas-regenerate" class="fp-modal-mini" title="Ask the AI for a fresh set of ideas">Regenerate</button>
      </div>
      <div style="display: flex; gap: 6px;">
        <button type="button" id="fp-ideas-cancel">Cancel</button>
        <button type="button" id="fp-ideas-add" class="fp-modal-primary">Add checked</button>
      </div>
    </div>
  </div>
</div>

<!-- Play modal — human-in-the-loop discrete-choice simulator. Opened by
     the ▶ Play button on any (disc) decision row. Setup section: list
     alternatives + fill p10/p50/p90 spreads per (alternative, metric).
     Play section: bar chart with asymmetric whiskers per alternative;
     click a bar to sample W_{t+1,i} from the fitted distribution and
     advance the round (repeated mode) or end (one-shot).

     Notation reminder: this problem class is x ∈ 𝒳^{choices},
     realized performance W_{t+1,i} per information class i (one per
     metric here), scored by C_m(S_t, x_t, W_{t+1}). All (t+1)-flavored. -->
<div id="fp-play-modal" class="fp-modal" hidden>
  <div class="fp-modal-card fp-play-card">
    <div class="fp-modal-header">
      <h3 id="fp-play-title">Play decision</h3>
      <button type="button" class="fp-modal-close" id="fp-play-close" aria-label="Close">×</button>
    </div>
    <p class="fp-muted fp-play-lede">
      Human-in-the-loop simulator for a discrete choice with uncertain performance.
      Fill in alternatives and a low / median / high spread per metric, then click
      a bar in <em>Play</em> to sample a realized outcome.
    </p>

    <!-- ─── Setup section ─────────────────────────────────────── -->
    <div class="fp-play-section">
      <h4 class="fp-play-h4">Setup</h4>

      <div class="fp-play-row">
        <label class="fp-play-label" for="fp-play-mode">Mode</label>
        <select id="fp-play-mode" class="fp-play-select">
          <option value="repeated">Repeated (pick, observe, advance to t+1)</option>
          <option value="one-shot">One-shot (single pick, single reveal)</option>
        </select>
      </div>

      <div class="fp-play-row">
        <label class="fp-play-label">Alternatives</label>
        <div id="fp-play-alts" class="fp-play-alts"></div>
        <div class="fp-play-add-row">
          <input type="text" id="fp-play-alt-new" class="fp-play-alt-new" placeholder="Add an alternative, then press Enter" />
          <button type="button" id="fp-play-alt-add" class="fp-modal-mini">Add</button>
        </div>
      </div>

      <div class="fp-play-row">
        <label class="fp-play-label">Uncertainty spreads <span class="fp-muted">(per metric; p10 / p50 / p90; asymmetric allowed)</span></label>
        <div id="fp-play-spreads-wrap" class="fp-play-spreads-wrap">
          <p class="fp-muted" id="fp-play-spreads-empty">Add at least one alternative and one metric to begin.</p>
        </div>
        <div class="fp-play-actions-row">
          <button type="button" id="fp-play-suggest" class="fp-modal-mini" title="Ask the AI to propose plausible p10 / p50 / p90 per alternative from the framing context">✦ Suggest spreads</button>
          <button type="button" id="fp-play-clear-spreads" class="fp-modal-mini" title="Clear every spread cell (keeps alternatives)">Clear all spreads</button>
        </div>
      </div>
    </div>

    <!-- ─── Play section ──────────────────────────────────────── -->
    <div class="fp-play-section">
      <h4 class="fp-play-h4">Play <span id="fp-play-round-badge" class="fp-play-round-badge"></span></h4>
      <p id="fp-play-instruction" class="fp-muted fp-play-instruction">Fill in the spreads above, then click a bar to pick an alternative.</p>
      <div id="fp-play-charts" class="fp-play-charts"></div>
      <div class="fp-play-actions-row">
        <button type="button" id="fp-play-reset" class="fp-modal-mini" title="Clear the pick history and restart at t = 1">Reset play</button>
      </div>
    </div>

    <!-- ─── History section ───────────────────────────────────── -->
    <div class="fp-play-section">
      <h4 class="fp-play-h4">History</h4>
      <div id="fp-play-history" class="fp-play-history">
        <p class="fp-muted" id="fp-play-history-empty">No picks yet.</p>
      </div>
    </div>

    <div id="fp-play-status" class="fp-bot-status" role="status" aria-live="polite"></div>

    <div class="fp-modal-actions" style="justify-content: flex-end;">
      <button type="button" id="fp-play-done" class="fp-modal-primary">Close</button>
    </div>
  </div>
</div>

<div id="fp-doc-banner" class="fp-doc-banner">
  <div class="fp-doc-banner-head">
    <h2 id="fp-doc-title" class="fp-doc-title" aria-live="polite"></h2>
    <button type="button" id="fp-doc-rename-btn" class="fp-doc-rename-btn" title="Rename this framing" hidden>✎ Rename</button>
  </div>
  <p id="fp-doc-description" class="fp-doc-description" hidden></p>
</div>

<p>This tool builds on a framing you already saved on the <a href="/decision-framing-tool/">framing tool page</a>. Use <b>File &rarr; Open&hellip;</b> to load it, then work through the sections below to add the model.</p>

<h2 id="problem-characteristics" class="fp-section-h2">Problem characteristics<button type="button" class="fp-section-help" title="Ask Professor Powell a question about this section — the chat opens in a floating panel, no scrolling.">? Ask</button></h2>
<p>Time cadence of the model and the problem-level parameters that describe it (costs, capacities, rates, distributions, …). More structured fields will land here as the modeling flow matures.</p>
<div class="fp-bot-card fp-modeling-card">
  <div class="fp-bot-row-inline">
    <div class="fp-bot-inline">
      <label class="fp-bot-label">Time step <span class="fp-muted">(one period of the model)</span></label>
      <div class="fp-time-input-row">
        <input type="number" id="fp-time-step-value" min="0" step="any"
               class="fp-time-input-num" placeholder="1" />
        <select id="fp-time-step-unit" class="fp-time-input-unit">
          <option value=""></option>
          <option value="seconds">seconds</option>
          <option value="minutes">minutes</option>
          <option value="hours">hours</option>
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
          <option value="quarters">quarters</option>
          <option value="years">years</option>
        </select>
      </div>
    </div>
    <div class="fp-bot-inline">
      <label class="fp-bot-label">Horizon <span class="fp-muted">(planning horizon; "periods" counts time steps)</span></label>
      <div class="fp-time-input-row">
        <input type="number" id="fp-horizon-value" min="0" step="any"
               class="fp-time-input-num" placeholder="1" />
        <select id="fp-horizon-unit" class="fp-time-input-unit">
          <option value=""></option>
          <option value="seconds">seconds</option>
          <option value="minutes">minutes</option>
          <option value="hours">hours</option>
          <option value="days">days</option>
          <option value="weeks">weeks</option>
          <option value="months">months</option>
          <option value="quarters">quarters</option>
          <option value="years">years</option>
          <option value="periods">periods (of time step)</option>
        </select>
        <span id="fp-horizon-derived" class="fp-muted fp-time-derived"></span>
      </div>
    </div>
  </div>
  <label class="fp-bot-label" style="margin-top: 12px; display: block;">Problem parameters <span class="fp-muted">(costs, capacities, arrival distributions, whatever the model needs — freeform for now)</span></label>
  <textarea id="fp-problem-parameters" rows="6" spellcheck="true"
    placeholder="e.g.&#10;  Holding cost per unit: $0.50/day&#10;  Order lead time: 3–5 days (uniform)&#10;  Weekly demand: Normal(mean=250, sd=40)&#10;  Max capacity per store: 800 units"
    style="width: 100%; box-sizing: border-box; padding: 8px 12px; font-family: inherit; font-size: 0.95rem; border: 1px solid #c9b891; border-radius: 4px; background: #fff; color: #333; resize: vertical;"></textarea>
</div>

<h2 id="performance-metrics-at-t" class="fp-section-h2">Performance metrics at <em>t</em><button type="button" class="fp-section-help" title="Ask Professor Powell a question about this section — the chat opens in a floating panel, no scrolling.">? Ask</button></h2>
<p>For each performance metric, write the contribution at a <b>single point in time <em>t</em></b> (no sum over time — accumulation over the horizon comes later). Give each metric a short math label, then the LaTeX form of <em>C<sub>m</sub></em>(<em>S<sub>t</sub></em>, <em>x<sub>t</sub></em>) or <em>C<sub>m</sub></em>(<em>S<sub>t</sub></em>, <em>x<sub>t</sub></em>, <em>W<sub>t+1</sub></em>).</p>
<div class="fp-bot-card fp-modeling-card">
  <div class="fp-metric-eq-row">
    <label>
      <span class="fp-metric-eq-lbl">Metric</span>
      <select id="fp-metric-eq-select">
        <option value="">— pick a metric —</option>
      </select>
    </label>
    <label>
      <span class="fp-metric-eq-lbl">Short label <span class="fp-muted">(for math)</span></span>
      <input type="text" id="fp-metric-eq-label" placeholder="e.g. C_{cost}" autocomplete="off" />
    </label>
  </div>
  <label class="fp-metric-eq-lbl">Equation at <em>t</em> <span class="fp-muted">(LaTeX; wrap with <code>$&hellip;$</code> to preview)</span></label>
  <textarea id="fp-metric-eq-formula" rows="3" spellcheck="false"
    placeholder="e.g.  c_{t}\, x_{t,d}"></textarea>
  <div class="fp-metric-eq-preview" id="fp-metric-eq-preview">
    <span class="fp-muted">Preview appears here once you type an equation.</span>
  </div>
  <ul id="fp-metric-eq-list" class="fp-metric-eq-list"></ul>
</div>

<h2 id="constraints-at-t" class="fp-section-h2">Constraints at <em>t</em><button type="button" class="fp-section-help" title="Ask Professor Powell a question about this section — the chat opens in a floating panel, no scrolling.">? Ask</button></h2>
<p>Problem constraints as they apply at time <em>t</em> (capacity, non-negativity, budget, physical limits, &hellip;). Give each a short name plus its LaTeX form.</p>
<div class="fp-bot-card fp-modeling-card">
  <div class="fp-metric-eq-row">
    <label>
      <span class="fp-metric-eq-lbl">Name</span>
      <input type="text" id="fp-constraint-name" placeholder="e.g. Capacity" autocomplete="off" />
    </label>
  </div>
  <label class="fp-metric-eq-lbl">Constraint at <em>t</em> <span class="fp-muted">(LaTeX)</span></label>
  <textarea id="fp-constraint-formula" rows="2" spellcheck="false"
    placeholder="e.g.  \sum_{d} x_{t,d} \le M"></textarea>
  <div class="fp-metric-eq-preview" id="fp-constraint-preview">
    <span class="fp-muted">Preview appears here once you type an equation.</span>
  </div>
  <div style="display:flex; gap:8px; margin-top:8px;">
    <button type="button" id="fp-constraint-add" class="fp-modal-primary">+ Add constraint</button>
    <button type="button" id="fp-constraint-clear" class="fp-modal-mini">Clear inputs</button>
  </div>
  <ul id="fp-constraint-list" class="fp-metric-eq-list"></ul>
</div>

<h2 id="transition-function" class="fp-section-h2">Transition function<button type="button" class="fp-section-help" title="Ask Professor Powell a question about this section — the chat opens in a floating panel, no scrolling.">? Ask</button></h2>
<p>One equation per state variable showing how it updates from time <em>t</em> to <em>t</em>+1 (e.g. inventory, cash, position). The left-hand side is usually the "primed" state at <em>t</em>+1.</p>
<div class="fp-bot-card fp-modeling-card">
  <div class="fp-metric-eq-row">
    <label>
      <span class="fp-metric-eq-lbl">State variable</span>
      <input type="text" id="fp-transition-name" placeholder="e.g. R_{t+1}" autocomplete="off" />
    </label>
  </div>
  <label class="fp-metric-eq-lbl">Update equation <span class="fp-muted">(LaTeX)</span></label>
  <textarea id="fp-transition-formula" rows="2" spellcheck="false"
    placeholder="e.g.  R_{t+1} = R_t + x_t - D_{t+1}"></textarea>
  <div class="fp-metric-eq-preview" id="fp-transition-preview">
    <span class="fp-muted">Preview appears here once you type an equation.</span>
  </div>
  <div style="display:flex; gap:8px; margin-top:8px;">
    <button type="button" id="fp-transition-add" class="fp-modal-primary">+ Add transition</button>
    <button type="button" id="fp-transition-clear" class="fp-modal-mini">Clear inputs</button>
  </div>
  <ul id="fp-transition-list" class="fp-metric-eq-list"></ul>
</div>

<h2 id="discrete-choices" class="fp-section-h2">Discrete choices<button type="button" class="fp-section-help" title="Ask Professor Powell a question about this section — the chat opens in a floating panel, no scrolling.">? Ask</button></h2>
<p>Decisions marked <strong>(disc)</strong> in your framing show up here. Tap &#9654; to simulate — the play modal opens with alternatives, spreads, and history.</p>
<div class="fp-bot-card fp-modeling-card">
  <ul id="fp-modeling-decisions" class="fp-modeling-decisions"></ul>
</div>


<!-- Floating "?" launcher — always visible at bottom-right when the
     chat panel is closed. One click opens the panel without scrolling
     the page, so users can keep the section they're reading in view
     while asking. Backup entry points: toolbar "? Help" button and a
     per-section "? Ask" button on every h2. -->
<button type="button" id="fp-chat-launcher" class="fp-chat-launcher"
        title="Ask Professor Powell — questions about the tool, framing, or Warren's materials"
        aria-label="Open Ask Professor Powell chat">
  <span class="fp-chat-launcher-icon">?</span>
  <span class="fp-chat-launcher-text">Ask</span>
</button>

<!-- Floating chat panel — fixed position (bottom-right on desktop,
     full-screen on mobile). The Ask Professor Powell widget mounts
     into #castle-chat-inline inside the body; state persists across
     open/close because the mount stays in the DOM. -->
<div id="fp-chat-panel" class="fp-chat-panel" hidden aria-labelledby="fp-chat-panel-title">
  <div class="fp-chat-panel-header">
    <span class="fp-chat-panel-title" id="fp-chat-panel-title">Ask Professor Powell</span>
    <button type="button" class="fp-chat-panel-close" id="fp-chat-panel-close" aria-label="Close chat" title="Close (chat state is preserved — reopen from the ? button)">×</button>
  </div>
  <div class="fp-chat-panel-body">
    <div id="castle-chat-inline"
         data-title="How can I help?"
         data-suggestions='[{"label":"File management","prompt":"How do I save, rename, share, or delete my framings and libraries?"},{"label":"Scoping","prompt":"How do I set up the Problem scope section, and what does the Read introductory materials button do?"},{"label":"Metrics","prompt":"How do I build the metrics pyramid, and what does First draft (AI) on the pyramid do?"},{"label":"Decisions","prompt":"How do I add decisions, use Generate ideas, drill into sub-decisions, and what do the (gen) and (spec) chips mean?"},{"label":"Uncertainties","prompt":"How do I add uncertainties, and what does the green for-chip mean when I drill into a decision?"}]'></div>
  </div>
  <p class="fp-chat-panel-footer"><em>Trained on Professor Powell's books, 1,000+ pages of LinkedIn posts, and the contents of this website. Conversations are logged for feedback. Don't share anything private; don't cite the chatbot as a source.</em></p>
</div>

<style>
  /* Floating chat launcher — a small round "?" bubble fixed at the
     bottom-right corner of the viewport. Always visible unless the
     chat panel itself is open. Opens the chat without scrolling the
     page. */
  .fp-chat-launcher {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 9998;
    width: 60px; height: 60px;
    border-radius: 50%;
    background: #c9621e;
    color: #fff;
    border: 2px solid #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.28);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column;
    font-family: inherit;
    transition: transform 120ms ease, background 120ms ease;
  }
  .fp-chat-launcher:hover { background: #a24e15; transform: scale(1.06); }
  .fp-chat-launcher[hidden] { display: none; }
  .fp-chat-launcher-icon { font-size: 1.4rem; font-weight: 700; line-height: 1; }
  .fp-chat-launcher-text { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.05em; margin-top: 2px; }

  /* Floating chat panel — fixed at bottom-right so the page stays put
     when the chat is open. Full-screen on mobile so the widget is
     usable on small viewports. */
  .fp-chat-panel {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 9999;
    width: 420px;
    height: 620px;
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
    background: #fff;
    border: 1px solid #c9b891;
    border-radius: 8px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.28);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .fp-chat-panel[hidden] { display: none; }
  .fp-chat-panel-header {
    padding: 8px 12px;
    background: #c9621e;
    color: #fff;
    display: flex; align-items: center; justify-content: space-between;
    font-weight: 600;
    flex-shrink: 0;
  }
  .fp-chat-panel-title { font-size: 0.95rem; }
  .fp-chat-panel-close {
    background: transparent; border: none; color: #fff;
    font-size: 1.4rem; line-height: 1;
    cursor: pointer; padding: 0 8px;
    border-radius: 3px;
  }
  .fp-chat-panel-close:hover { background: rgba(255,255,255,0.2); }
  .fp-chat-panel-body {
    flex: 1 1 auto; overflow: auto; min-height: 0;
    padding: 6px;
  }
  .fp-chat-panel-body #castle-chat-inline {
    height: 100%; display: flex; flex-direction: column;
  }
  .fp-chat-panel-footer {
    padding: 6px 12px;
    font-size: 0.72rem; color: #7a6a55;
    border-top: 1px solid #eae0c8;
    margin: 0;
    flex-shrink: 0;
    background: #faf5e6;
  }
  @media (max-width: 640px) {
    .fp-chat-panel {
      right: 0; bottom: 0; top: 0; left: 0;
      width: 100vw; height: 100vh;
      max-width: 100vw; max-height: 100vh;
      border-radius: 0; border: none;
    }
    .fp-chat-launcher { right: 12px; bottom: 12px; width: 52px; height: 52px; }
  }
  /* Per-section "? Ask" button — small green pill inline with each
     fp-section-h2 heading. Opens the same floating chat panel. */
  .fp-section-help {
    display: inline-block;
    margin-left: 10px;
    padding: 2px 10px;
    font-size: 0.72rem;
    font-weight: 500;
    vertical-align: middle;
    background: #eaf1e6;
    color: #345c48;
    border: 1px solid #b8d6c4;
    border-radius: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  .fp-section-help:hover { background: #d8e8d1; }
  /* The toolbar's Ask button is the same visual as a section Ask button;
     ID selector (specificity 1,0,0) wins over the .fp-toolbar button
     defaults (0,1,1) so the green pill styling comes through. */
  #fp-help {
    background: #eaf1e6;
    color: #345c48;
    border: 1px solid #b8d6c4;
    border-radius: 12px;
    font-weight: 500;
    padding: 2px 10px;
    font-size: 0.72rem;
  }
  #fp-help:hover { background: #d8e8d1; }

  /* Beta backend banner — only rendered when ?backend=beta is in the URL.
     Sits above everything else on the page so it's impossible to miss. */
  .fp-beta-banner {
    margin: 12px 0 16px 0;
    padding: 10px 16px;
    background: #fff4d6;
    border: 2px dashed #c9821e;
    border-radius: 4px;
    color: #5a3a15;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  .fp-beta-banner code {
    background: #fff; padding: 1px 5px; border-radius: 3px;
    font-size: 0.88em; color: #6a4a20;
  }

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
  .fp-doc-banner-head {
    display: flex;
    align-items: baseline;
    gap: 12px;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .fp-doc-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #5a4a35;
  }
  .fp-doc-rename-btn {
    font-size: 0.85rem;
    padding: 3px 10px;
    border: 1px solid #c9a76a;
    background: #f9ecd0;
    color: #5a3e1f;
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .fp-doc-rename-btn:hover { background: #f2e6c9; }
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
  /* "Contextual background" launcher — replaces the 5 question cards on
     the page. Click to open the fp-context-modal. */
  .fp-context-launcher {
    display: flex; align-items: center; gap: 16px;
    padding: 12px 14px;
    background: #faf5e6;
    border: 1px solid #d6c4a3;
    border-radius: 6px;
    margin: 0 0 12px 0;
    flex-wrap: wrap;
  }
  .fp-context-open-btn {
    padding: 10px 18px;
    background: #8a3a1a;
    color: #fff;
    border: none; border-radius: 4px;
    font-size: 1rem; font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }
  .fp-context-open-btn:hover { background: #a04a24; }
  .fp-context-counter {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 8px;
    background: rgba(255,255,255,0.28);
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 500;
  }
  .fp-context-lede {
    flex: 1 1 300px;
    margin: 0;
    color: #5a3e1f;
    font-size: 0.95rem;
  }
  .fp-context-modal-card {
    max-width: 720px;
    max-height: 88vh;
    overflow-y: auto;
  }
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

  /* Decisions / Uncertainties header rows — headline + 'Generate ideas' button */
  .fp-list-header {
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: 6px;
  }
  .fp-list-header h3 { margin: 0; }
  .fp-ideas-btn {
    padding: 4px 12px;
    font-size: 0.85rem;
    background: #fff;
    border: 1px solid #c9a76a;
    color: #5a3e1f;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
  }
  .fp-ideas-btn:hover:not(:disabled) { background: #f2e6c9; }
  .fp-ideas-btn:disabled { opacity: 0.55; cursor: not-allowed; }
  /* Generation-mode toggle — small (gen)/(spec) chip pair next to the
     Generate ideas button. Pressed state = which mode fires on next click.
     (gen) proposes broad categories; (spec) enumerates concrete members
     (discrete choices or numeric parameters) and skips the categorical
     layer. */
  .fp-ideas-mode {
    display: inline-flex; align-items: center; margin-left: 6px;
  }
  .fp-ideas-mode-btn {
    font-size: 0.72rem; padding: 2px 8px; line-height: 1.4;
    background: #fff; color: #7a6a55;
    border: 1px solid #c9b891;
    cursor: pointer; font-family: inherit;
  }
  .fp-ideas-mode-btn:first-child { border-radius: 12px 0 0 12px; }
  .fp-ideas-mode-btn:last-child  { border-radius: 0 12px 12px 0; border-left: none; }
  .fp-ideas-mode-btn:hover:not(.is-active) { background: #f0e5c8; }
  .fp-ideas-mode-btn.is-active {
    background: #c9621e; color: #fff; border-color: #c9621e; font-weight: 600;
  }
  /* Count override — small numeric input next to the mode toggle.
     Blank = auto (uses the First-draft size default). Set a number
     to override, useful for long (spec) lists (e.g. 50 suppliers). */
  .fp-ideas-count {
    margin-left: 6px;
    width: 6em;
    padding: 2px 6px;
    font-size: 0.72rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #5a4a35;
    font-family: inherit;
  }
  .fp-ideas-count::placeholder { color: #b8ac93; font-style: italic; }
  .fp-ideas-count:focus { outline: 1px solid #c9621e; border-color: #c9621e; }
  /* Types… button — opens the decision-type filter modal. Shows a small
     count in parens when any types are checked (e.g. "Types… (3)"). */
  .fp-decision-types-btn {
    margin-left: 6px;
    padding: 2px 10px;
    font-size: 0.72rem;
    background: #fff; color: #7a6a55;
    border: 1px solid #c9b891; border-radius: 12px;
    cursor: pointer; font-family: inherit;
  }
  .fp-decision-types-btn:hover { background: #f0e5c8; }
  .fp-decision-types-btn.is-active {
    background: #eaf1e6; color: #345c48; border-color: #b8d6c4; font-weight: 600;
  }
  .fp-decision-types-list {
    display: grid; grid-template-columns: 1fr; gap: 4px;
    padding: 10px 12px;
    background: #fdfaf1;
    border: 1px solid #eae0c8;
    border-radius: 4px;
    max-height: 55vh; overflow-y: auto;
    margin-bottom: 8px;
  }
  .fp-decision-types-list label {
    display: flex; align-items: baseline; gap: 8px;
    padding: 4px 6px; cursor: pointer;
    border-radius: 3px;
    font-size: 0.95rem;
  }
  .fp-decision-types-list label:hover { background: #f2ead4; }
  .fp-decision-types-list input[type="checkbox"] {
    flex-shrink: 0; margin: 0;
  }
  /* Inactive types (5 and 10) — surface them so users see the full
     taxonomy, but grey them out and disable the checkbox: Type 5
     (metrics) is set via the metrics pyramid; Type 10 (deciding
     what to decide) is what this whole tool is for. */
  .fp-decision-types-list label.is-disabled {
    color: #a8a08c; cursor: not-allowed;
  }
  .fp-decision-types-list label.is-disabled:hover { background: transparent; }
  .fp-decision-types-list label.is-disabled input[type="checkbox"] {
    cursor: not-allowed;
  }
  .fp-decision-types-list .fp-type-inactive {
    font-size: 0.85em; font-style: italic; color: #a8a08c;
  }

  /* Idea box modal */
  .fp-ideas-list {
    max-height: 40vh; overflow-y: auto;
    border: 1px solid #eae0c8; border-radius: 4px;
    background: #fdfaf1;
    margin: 8px 0;
  }
  .fp-ideas-row {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px;
    border-bottom: 1px solid #eae0c8;
    cursor: pointer;
  }
  .fp-ideas-row:last-child { border-bottom: none; }
  .fp-ideas-row:hover { background: #faf5e6; }
  .fp-ideas-row input[type="checkbox"] { flex-shrink: 0; }
  .fp-ideas-row label {
    flex: 1; cursor: pointer; color: #5a3e1f;
  }
  .fp-ideas-empty {
    padding: 16px; text-align: center; color: #7a6a55; font-style: italic;
    font-size: 0.9rem;
  }
  .fp-modal-mini {
    padding: 4px 10px;
    font-size: 0.85rem;
    background: #fff;
    border: 1px solid #d6c4a3;
    color: #5a3e1f;
    border-radius: 4px;
    cursor: pointer;
  }
  .fp-modal-mini:hover:not(:disabled) { background: #f2e6c9; }
  .fp-modal-mini:disabled { opacity: 0.55; cursor: not-allowed; }
  .fp-modal-primary {
    padding: 6px 16px;
    font-size: 0.9rem;
    background: #8a3a1a; color: #fff;
    border: 1px solid #6a2a10;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
  }
  .fp-modal-primary:hover:not(:disabled) { background: #6a2a10; }
  .fp-modal-primary:disabled {
    background: #d6c4a3; border-color: #d6c4a3; color: #fff;
    cursor: not-allowed;
  }

  /* Play modal — discrete-choice simulator (▶ Play on disc rows) */
  .fp-play-card { max-width: 880px; overflow-y: auto; }
  .fp-play-lede { margin: 0 0 14px 0; }
  .fp-play-section {
    border-top: 1px solid #ede0bd;
    padding-top: 12px;
    margin-top: 14px;
  }
  .fp-play-section:first-of-type { border-top: none; padding-top: 4px; margin-top: 0; }
  .fp-play-h4 {
    margin: 0 0 8px 0;
    color: #5a4a35;
    font-size: 1.02rem;
  }
  .fp-play-round-badge {
    display: inline-block;
    margin-left: 8px;
    padding: 1px 8px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #5a3e1f;
    background: #faf0d5;
    border: 1px solid #d6c4a3;
    border-radius: 10px;
  }
  .fp-play-round-badge:empty { display: none; }
  .fp-play-row { margin-bottom: 12px; }
  .fp-play-label {
    display: block;
    font-weight: 600;
    color: #5a4a35;
    margin-bottom: 4px;
    font-size: 0.92rem;
  }
  .fp-play-select {
    padding: 5px 8px;
    font-size: 0.9rem;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    background: #fff;
    color: #5a3e1f;
  }
  .fp-play-alts {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 6px;
    min-height: 22px;
  }
  .fp-play-alt-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 4px 3px 10px;
    background: #ede0bd;
    border: 1px solid #c9a86b;
    border-radius: 12px;
    font-size: 0.86rem;
    color: #3d2914;
  }
  .fp-play-alt-chip button {
    border: none;
    background: transparent;
    color: #8a3a1a;
    font-size: 1rem;
    line-height: 1;
    padding: 0 4px;
    cursor: pointer;
  }
  .fp-play-alt-chip button:hover { color: #c9621e; }
  .fp-play-add-row { display: flex; gap: 6px; align-items: center; }
  .fp-play-alt-new {
    flex: 1;
    padding: 5px 8px;
    font-size: 0.9rem;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    background: #fff;
    color: #5a3e1f;
  }
  .fp-play-spreads-wrap { margin: 4px 0 6px 0; }
  .fp-play-spread-block { margin-bottom: 14px; }
  .fp-play-spread-block:last-child { margin-bottom: 4px; }
  .fp-play-spread-metric {
    font-weight: 600;
    color: #5a3e1f;
    font-size: 0.94rem;
    margin: 0 0 4px 0;
  }
  table.fp-play-spread-table {
    border-collapse: collapse;
    font-size: 0.88rem;
    width: 100%;
    max-width: 560px;
  }
  .fp-play-spread-table th,
  .fp-play-spread-table td {
    border: 1px solid #d6c4a3;
    padding: 3px 5px;
    text-align: left;
  }
  .fp-play-spread-table thead th {
    background: #faf0d5;
    color: #3d2914;
    font-weight: 600;
    text-align: center;
  }
  .fp-play-spread-table tbody th {
    background: #faf5e6;
    color: #3d2914;
    font-weight: 500;
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .fp-play-spread-table input {
    width: 68px;
    padding: 3px 5px;
    font-size: 0.88rem;
    border: 1px solid #d6c4a3;
    border-radius: 3px;
    background: #fff;
    color: #5a3e1f;
    text-align: right;
  }
  .fp-play-spread-table input:invalid { border-color: #c9621e; background: #fff5ee; }
  .fp-play-actions-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 4px;
  }
  .fp-play-instruction { margin: 0 0 8px 0; font-size: 0.88rem; }
  .fp-play-charts {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .fp-play-chart {
    background: #fbf9f4;
    border: 1px solid #ede0bd;
    border-radius: 5px;
    padding: 8px 10px;
  }
  .fp-play-chart-title {
    font-weight: 600;
    color: #5a3e1f;
    font-size: 0.92rem;
    margin: 0 0 4px 0;
  }
  .fp-play-chart svg { width: 100%; height: auto; display: block; }
  .fp-play-bar { fill: #c9a86b; stroke: #8a6a2f; stroke-width: 1; cursor: pointer; transition: fill 120ms; }
  .fp-play-bar:hover { fill: #8a3a1a; }
  .fp-play-bar-disabled { fill: #d6c4a3; stroke: #a89273; cursor: not-allowed; }
  .fp-play-bar-disabled:hover { fill: #d6c4a3; }
  .fp-play-whisker { stroke: #5a3e1f; stroke-width: 1.4; fill: none; }
  .fp-play-median { stroke: #3d2914; stroke-width: 2; }
  .fp-play-realized {
    fill: #8a3a1a;
    stroke: #3d2914;
    stroke-width: 1;
  }
  .fp-play-axis { stroke: #5a4a35; stroke-width: 1; }
  .fp-play-axis-label { fill: #5a4a35; font-size: 10px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
  .fp-play-alt-label { fill: #3d2914; font-size: 11px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-anchor: middle; }
  .fp-play-history {
    max-height: 180px;
    overflow-y: auto;
    background: #fbf9f4;
    border: 1px solid #ede0bd;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 0.87rem;
    color: #3d2914;
  }
  .fp-play-history-row { padding: 2px 0; border-bottom: 1px dashed #ede0bd; }
  .fp-play-history-row:last-child { border-bottom: none; }
  .fp-play-history-t { display: inline-block; min-width: 42px; font-weight: 600; color: #5a3e1f; }
  .fp-play-history-alt { color: #8a3a1a; font-weight: 500; }
  .fp-play-history-sample { color: #5a4a35; }

  /* ▶ Play button on (disc) decision rows */
  .fp-play-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    min-width: 22px;
    height: 22px;
    font-size: 0.78rem;
    line-height: 20px;
    color: #8a3a1a;
    background: #faf0d5;
    border: 1px solid #c9a86b;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    margin-left: 4px;
    vertical-align: middle;
  }
  .fp-play-btn:hover { background: #ede0bd; color: #6a2a10; }

  /* ══════════════════════════════════════════════════════════
     Modeling section — two-column grid: modeling inputs on the
     left, decision list (with ▶ Play buttons) on the right so
     the play modal has room to spawn without covering the list.
     Collapses to one column on narrow screens.
     ══════════════════════════════════════════════════════════ */
  .fp-modeling-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 16px;
    margin: 12px 0 20px;
  }
  @media (max-width: 900px) {
    .fp-modeling-grid { grid-template-columns: 1fr; }
  }
  .fp-modeling-card { margin: 0 0 12px 0; }
  .fp-modeling-h3 {
    font-size: 1.05rem;
    color: #5a4a35;
    margin: 0 0 8px 0;
  }
  .fp-modeling-decisions {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex; flex-direction: column; gap: 6px;
  }
  .fp-modeling-decisions .fp-modeling-decision {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 10px;
    background: #fff;
    border: 1px solid #d6c4a3;
    border-radius: 5px;
  }
  .fp-modeling-decisions .fp-modeling-decision-name {
    flex: 1; overflow-wrap: anywhere;
    color: #3d2914;
  }
  .fp-modeling-decisions .fp-modeling-decision-play {
    background: #faf0d5;
    border: 1px solid #c9a86b;
    color: #8a3a1a;
    font-weight: 600;
    padding: 4px 12px; min-height: 32px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .fp-modeling-decisions .fp-modeling-decision-play:hover {
    background: #ede0bd; color: #6a2a10;
  }
  .fp-modeling-decisions-empty {
    color: #7a6a55;
    font-style: italic;
    padding: 12px 4px;
  }

  /* ── Performance metric equations (Modeling section) ─────── */
  .fp-metric-eq-row {
    display: flex; gap: 12px; flex-wrap: wrap;
    margin: 6px 0 10px;
  }
  .fp-metric-eq-row label { flex: 1; min-width: 180px; display: block; }
  .fp-metric-eq-lbl {
    display: block;
    font-size: 0.85rem; font-weight: 600; color: #5a4a35;
    margin: 6px 0 4px;
  }
  .fp-metric-eq-lbl .fp-muted { font-weight: 400; }
  #fp-metric-eq-select,
  #fp-metric-eq-label,
  #fp-metric-eq-formula {
    width: 100%; box-sizing: border-box;
    padding: 8px 12px;
    font-family: inherit; font-size: 0.95rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #333;
  }
  #fp-metric-eq-formula {
    font-family: ui-monospace, Menlo, Consolas, monospace;
    resize: vertical; min-height: 60px;
  }
  #fp-metric-eq-select:focus,
  #fp-metric-eq-label:focus,
  #fp-metric-eq-formula:focus {
    outline: none; border-color: #c9621e;
    box-shadow: 0 0 0 2px rgba(201, 98, 30, 0.15);
  }
  .fp-metric-eq-preview {
    margin: 10px 0;
    padding: 10px 14px;
    background: #faf6ea;
    border: 1px dashed #d6c4a3;
    border-radius: 4px;
    min-height: 40px;
    font-size: 1rem;
    color: #3d2914;
    overflow-x: auto;
  }
  .fp-metric-eq-list {
    list-style: none; padding: 0; margin: 8px 0 0;
    display: flex; flex-direction: column; gap: 4px;
  }
  .fp-metric-eq-list li {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 10px;
    background: #fff;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    font-size: 0.92rem;
  }
  .fp-metric-eq-list-name { color: #3d2914; font-weight: 500; min-width: 140px; }
  .fp-metric-eq-list-label { color: #8a3a1a; font-family: ui-monospace, Menlo, Consolas, monospace; }
  .fp-metric-eq-list-formula { flex: 1; color: #5a4a35; font-family: ui-monospace, Menlo, Consolas, monospace; overflow-x: auto; white-space: nowrap; }
  .fp-metric-eq-list button {
    background: transparent; border: none; color: #7a6a55;
    font-size: 0.9rem; cursor: pointer; padding: 2px 6px;
  }
  .fp-metric-eq-list button:hover { color: #8a3a1a; }

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

  /* Soft-lock banner — shown when someone else holds the write lease. */
  .fp-lease-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    margin-bottom: 8px;
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-left: 4px solid #d97706;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #78350f;
  }
  .fp-lease-banner[hidden] { display: none; }
  .fp-lease-icon { font-size: 1.15rem; flex-shrink: 0; }
  .fp-lease-msg  { flex: 1; }
  .fp-lease-take-over {
    padding: 6px 14px;
    background: #d97706;
    color: #fff;
    border: 1px solid #b45309;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .fp-lease-take-over:hover { background: #b45309; }
  .fp-lease-take-over:disabled {
    background: #d6c4a3;
    border-color: #d6c4a3;
    cursor: not-allowed;
  }

  /* Persistent tree side pane — right side, fixed position. Only
     renders on wide screens; the Browse modal is the fallback below
     ~1100px viewport. */
  .fp-tree-pane {
    position: fixed;
    top: 20px;
    right: 20px;
    bottom: 20px;
    width: 320px;
    background: #fdf9ec;
    border: 1px solid #d6c4a3;
    border-radius: 6px;
    padding: 12px;
    box-shadow: -2px 2px 8px rgba(0,0,0,0.08);
    overflow-y: auto;
    z-index: 100;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .fp-tree-pane[hidden] { display: none; }
  @media (max-width: 1099px) {
    .fp-tree-pane { display: none !important; }
  }
  .fp-tree-header {
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e6d8bf;
  }
  .fp-tree-name {
    font-weight: 700;
    color: #5a3e1f;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fp-tree-refresh {
    background: transparent;
    border: none;
    color: #7a6a55;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
  }
  .fp-tree-refresh:hover { color: #c9621e; }
  .fp-tree-crumb {
    font-size: 0.8rem;
    color: #7a6a55;
    line-height: 1.4;
    padding-bottom: 4px;
    border-bottom: 1px dashed #e6d8bf;
  }
  .fp-tree-section {
    font-weight: 700;
    color: #5a3e1f;
    text-transform: uppercase;
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    padding: 8px 0 2px;
  }
  .fp-tree-item {
    padding: 5px 6px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #5a3e1f;
    line-height: 1.25;
  }
  .fp-tree-item:hover { background: #f2e6c9; }
  .fp-tree-item.fp-tree-current {
    background: #f2e6c9;
    font-weight: 700;
    color: #8a3a1a;
  }
  .fp-tree-item-icon {
    flex-shrink: 0;
    font-size: 0.95rem;
  }
  .fp-tree-item-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fp-tree-empty {
    font-style: italic;
    color: #7a6a55;
    padding: 4px 6px;
    font-size: 0.85rem;
  }
  /* When the tree pane is on-screen, shift the main content left so
     it doesn't hide behind the pane. Applied via a body class from JS. */
  /* Shift the main content just enough to keep the tree pane from
     overlapping. On wide viewports (Warren's ~1920px) the Jekyll
     layout is already centered inside a max-width column with
     whitespace on the right, so only a small shift is needed. On
     narrower viewports the shift is larger. Formula: assume the tree
     pane sits at viewport-right 20 wide 320, and back off from the
     max-width layout by (360 - viewport slack / 2), clamped to 20 min. */
  @media (min-width: 1100px) {
    body.fp-tree-open .page-container,
    body.fp-tree-open .content,
    body.fp-tree-open main {
      padding-right: max(20px, calc(360px - (100vw - 1360px) / 2));
    }
  }

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

  /* Small per-row action buttons (rename ✎ / delete ×) inside the
     Browse modal's sub-library and framing lists. */
  .fp-row-action {
    padding: 2px 8px;
    background: #fff;
    border: 1px solid #d6c4a3;
    color: #5a3e1f;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    font-size: 0.9rem;
    line-height: 1.2;
    margin-left: 4px;
  }
  .fp-row-action:hover { background: #f2e6c9; }
  .fp-row-danger { color: #9a1c1c; border-color: #d6a3a3; }
  .fp-row-danger:hover { background: #fee2e2; color: #7a1c1c; }
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
  .fp-library-mode.edit  { background: #dcfce7; color: #14532d; }
  .fp-library-mode.admin { background: #fef3c7; color: #78350f; }
  .fp-library-mode.view  { background: #dbeafe; color: #1e3a8a; }
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
  .fp-library-danger {
    background: #fff;
    color: #9a1c1c;
    border-color: #d6a3a3;
  }
  .fp-library-danger:hover { background: #fee2e2; color: #7a1c1c; }
  .fp-file-list {
    flex: 1 1 auto;
    min-height: 60px; max-height: 50vh;
    overflow-y: auto;
    border: 1px solid #eae0c8; border-radius: 4px;
    background: #fdfaf1;
  }
  .fp-file-list:empty::before {
    content: 'No saved framings yet — use Save as… to create one.';
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

  /* Decisions/Uncertainties textareas — locked line-height so each entry
     lines up with one attribute row on the right. wrap="off" (HTML attr)
     keeps long lines on a single line. */
  #fp-decisions-input,
  #fp-uncertainties-input {
    width: 100%; min-height: 210px;
    padding: 6px 10px;
    border: 1px solid #c9b891; border-radius: 4px;
    font-family: inherit; font-size: 0.95rem;
    line-height: 30px;
    resize: vertical;
    box-sizing: border-box;
    background: #fff;
    color: #333;
    white-space: pre;
    overflow-x: auto;
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
  /* Labeled "Sub-decisions" button in the Attributes side column —
     replaces the bare ▸ triangle so the affordance is obvious. */
  .fp-subdec-btn {
    display: inline-block;
    margin-left: 6px;
    padding: 2px 8px;
    font-size: 0.8rem;
    line-height: 1.4;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    background: #faf5e6;
    color: #5a3e1f;
    cursor: pointer;
    white-space: nowrap;
    font-family: inherit;
  }
  .fp-subdec-btn:hover { background: #f2e6c9; }
  .fp-subdec-btn-has {
    background: #f2e6c9;
    font-weight: 600;
    border-color: #c9a76a;
  }
  .fp-subdec-btn-has:hover { background: #ecdcb4; }
  .fp-drill-inline {
    display: inline-block;
    padding: 0 5px;
    border: 1px solid #d6c4a3;
    border-radius: 4px;
    background: #faf5e6;
    color: #8a6a3a;
    font-size: 0.85em;
  }
  /* Decision-kind chip: (gen) vs (spec) — appears after the decision
     name in the matrix row. Click to toggle. Default gen (blue-gray:
     "still-drillable category"); spec is amber to signal "concrete
     action ready to implement". Purely informational for now. */
  .fp-decision-kind-chip {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 6px;
    font-size: 0.78rem;
    line-height: 1.3;
    border-radius: 4px;
    border: 1px solid;
    cursor: pointer;
    vertical-align: 1px;
    white-space: nowrap;
    font-family: inherit;
  }
  .fp-decision-kind-gen {
    border-color: #b6c0cf; background: #eef2f7; color: #3a4a63;
  }
  .fp-decision-kind-gen:hover { background: #dee5ee; }
  .fp-decision-kind-disc {
    border-color: #c9a76a; background: #f9ecd0; color: #5a3e1f; font-weight: 600;
  }
  .fp-decision-kind-disc:hover { background: #f2e6c9; }
  .fp-decision-kind-num {
    border-color: #7ba7c9; background: #dfeaf3; color: #1e3a52; font-weight: 600;
    font-family: "Cambria", "Times New Roman", serif;   /* mathy feel */
  }
  .fp-decision-kind-num:hover { background: #cbdcea; }
  /* Timing chip — (stat) vs (dyn) — applied to decisions and uncertainties.
     Sits next to the kind chip. Cycle: (stat) ↔ (dyn), toggle on click.
     Default is (dyn) (implicit; only 'stat' is stored). */
  .fp-timing-chip {
    display: inline-block;
    margin-left: 4px;
    padding: 1px 6px;
    font-size: 0.78rem;
    line-height: 1.3;
    border-radius: 4px;
    border: 1px solid;
    cursor: pointer;
    vertical-align: 1px;
    white-space: nowrap;
    font-family: inherit;
    font-weight: 600;
  }
  .fp-timing-dyn {
    border-color: #b57ec9; background: #efe4f3; color: #52226a;
  }
  .fp-timing-dyn:hover { background: #e2cde9; }
  .fp-timing-stat {
    border-color: #a89988; background: #f0ebe1; color: #4a3f30;
  }
  .fp-timing-stat:hover { background: #e2dbcd; }

  /* Per-decision (and per-uncertainty) attributes list — sits to the
     RIGHT of the textarea inside the same panel. One row per entry
     carrying the (gen)/(disc)/(num) kind chip, (stat)/(dyn) timing chip,
     and (decisions only) ▸ drill-in button, so the matrix cell can stay
     uncluttered (drag handle + name only). On narrow screens the pair
     stacks vertically. */
  .fp-decisions-body {
    display: flex;
    gap: 12px;
    align-items: stretch;
  }
  .fp-decisions-body > textarea {
    flex: 1 1 auto;
    min-width: 0;
  }
  .fp-decision-attrs-side {
    /* Wide enough for two chips + a labeled "Sub-decisions ›" button. */
    flex: 0 0 260px;
    min-width: 0;
    display: flex; flex-direction: column;
  }
  @media (max-width: 700px) {
    .fp-decisions-body { flex-direction: column; }
    .fp-decisions-body > textarea,
    .fp-decision-attrs-side { flex: 1 1 auto; }
  }
  .fp-decision-attrs-header {
    margin: 0 0 4px 0;
    font-size: 0.85rem;
    color: #5a3e1f;
    display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap;
  }
  .fp-decision-attrs-header .fp-muted { font-size: 0.78rem; }
  .fp-decision-attrs {
    flex: 1 1 auto;
    display: flex; flex-direction: column; gap: 0;
    padding: 6px 0 0 0;   /* match textarea's 6px top padding */
    max-height: 480px;
    overflow-y: auto;
    /* Match textarea's border height so both start at the same y */
    border-top: 1px solid transparent;
  }
  .fp-decision-attr-row {
    display: flex; align-items: center; gap: 4px;
    height: 30px;                 /* exactly one textarea line-height */
    padding: 0 8px;
    background: #f7efd8;
    border-bottom: 1px solid #e2d4b0;
    font-size: 0.92rem;
  }
  .fp-decision-attr-row:nth-child(even) { background: #f2e6c3; }
  /* Spacer for blank / in-progress lines in the textarea — one per line,
     30px tall, so the attribute rows on the right stay line-aligned with
     the textarea on the left. */
  .fp-decision-attr-spacer {
    height: 30px;
    background: transparent;
  }
  .fp-decision-attr-name {
    flex: 1; min-width: 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    color: #3a2d18;
  }
  .fp-decision-attrs-empty {
    padding: 6px 8px;
    color: #7a6a4a;
    font-size: 0.85rem;
    font-style: italic;
  }

  /* Time step + horizon inputs at the top of the Problem scope card. */
  .fp-time-input-row {
    display: flex; align-items: center; gap: 6px;
  }
  .fp-time-input-num {
    width: 5em; padding: 4px 6px;
    border: 1px solid #c9b891; border-radius: 4px;
    font-family: inherit; font-size: 0.9rem;
  }
  .fp-time-input-num:focus { outline: 1px solid #c9621e; border-color: #c9621e; }
  .fp-time-input-unit {
    padding: 4px 6px;
    border: 1px solid #c9b891; border-radius: 4px;
    font-family: inherit; font-size: 0.9rem;
    background: #fff;
  }
  .fp-time-derived {
    font-size: 0.85em; margin-left: 6px;
  }
  /* Uncertainty scope chip — appears after the uncertainty name in the
     matrix row when the uncertainty was generated while drilled into a
     specific sub-decision. Distinguishes "for: X" scope-tagged rows
     from unscoped, everything-applies rows. */
  .fp-u-scope-chip {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 6px;
    font-size: 0.78rem;
    line-height: 1.3;
    border: 1px solid #b8d6c4;
    border-radius: 4px;
    background: #eaf5ee;
    color: #345c48;
    vertical-align: 1px;
    white-space: nowrap;
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

  /* Decision-maker scope — now a 2-row textarea inside the Problem
     scope card. Same visual language as the other bot-row textareas. */
  .fp-scope-input {
    width: 100%; box-sizing: border-box;
    padding: 8px 12px;
    font-family: inherit; font-size: 0.95rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #333;
    resize: vertical;
    min-height: 60px;
  }
  .fp-scope-input:focus {
    outline: none; border-color: #c9621e;
    box-shadow: 0 0 0 2px rgba(201, 98, 30, 0.15);
  }

  /* ── Guided-prompt question cards (Problem scope) ────────── */
  .fp-qcard {
    background: #fff;
    border: 1px solid #d6c4a3;
    border-radius: 6px;
    padding: 10px 12px;
    margin: 8px 0;
  }
  .fp-qcard-q {
    display: block; font-weight: 600; color: #3d2914;
    font-size: 0.98rem; margin: 0 0 6px 0;
  }
  .fp-qcard-q .fp-muted { font-weight: 400; color: #7a6a55; font-size: 0.85rem; }
  .fp-qcard textarea {
    width: 100%; box-sizing: border-box;
    padding: 8px 12px;
    font-family: inherit; font-size: 0.95rem;
    border: 1px solid #c9b891; border-radius: 4px;
    background: #fff; color: #333;
    resize: vertical; min-height: 60px; margin-bottom: 8px;
  }
  .fp-qcard textarea:focus {
    outline: none; border-color: #c9621e;
    box-shadow: 0 0 0 2px rgba(201, 98, 30, 0.15);
  }
  .fp-speak-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 8px 16px; min-height: 40px;
    border: 1px solid #6a2a10; border-radius: 5px;
    background: #8a3a1a; color: #fff;
    font-family: inherit; font-size: 0.9rem; font-weight: 600;
    cursor: pointer;
  }
  .fp-speak-btn:hover:not(:disabled) { background: #6a2a10; }
  .fp-speak-btn:disabled { background: #d6c4a3; border-color: #d6c4a3; cursor: not-allowed; }
  .fp-speak-btn.is-recording {
    background: #c92525; border-color: #a01a1a;
    animation: fp-speak-pulse 1.2s ease-in-out infinite;
  }
  .fp-speak-btn .fp-mic-glyph { font-size: 1.1rem; line-height: 1; }
  @keyframes fp-speak-pulse {
    0%, 100% { box-shadow: 0 1px 3px rgba(201,37,37,0.4); }
    50%      { box-shadow: 0 2px 16px rgba(201,37,37,0.75); }
  }
  .fp-voice-hint {
    font-size: 0.82rem; color: #7a6a55;
    margin: 6px 0 0 2px;
  }
  .fp-voice-hint.is-err { color: #a72020; }

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
  .fp-matrix-controls button.fp-matrix-up {
    background: #f2e6c9;
    border-color: #c9a76a;
    color: #5a3e1f;
    font-weight: 600;
  }
  .fp-matrix-controls button.fp-matrix-up:hover:not(:disabled) { background: #e6d4a5; }
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
  .fp-bot-actions button#fp-bot-ingest {
    background: #eaf1e6; color: #345c48; border-color: #b8d6c4; font-weight: 500;
  }
  .fp-bot-actions button#fp-bot-ingest:hover:not(:disabled) { background: #d8e8d1; }
  /* Ingested-notes chip: shows up under the action row when the AI has
     "read" the introductory materials once. Persists across reloads
     via state.problemNotes. Green to distinguish from the amber
     framing-related UI. */
  .fp-notes-chip-wrap {
    display: flex; align-items: center; gap: 6px; margin-top: 8px; flex-wrap: wrap;
  }
  .fp-notes-chip {
    display: inline-block;
    padding: 3px 10px;
    font-size: 0.85rem;
    border: 1px solid #b8d6c4;
    border-radius: 12px;
    background: #eaf5ee;
    color: #345c48;
    white-space: nowrap;
  }
  .fp-notes-chip-clear, .fp-notes-chip-view {
    font-size: 0.8rem; padding: 2px 8px;
    border: 1px solid #d6c4a3; background: #faf5e6; color: #5a3e1f;
    border-radius: 4px; cursor: pointer;
  }
  .fp-notes-chip-clear:hover, .fp-notes-chip-view:hover { background: #f2e6c9; }
  .fp-notes-body {
    max-height: 60vh; overflow: auto;
    padding: 10px 14px;
    background: #fdfaf1;
    border: 1px solid #eae0c8;
    border-radius: 4px;
    white-space: pre-wrap;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 0.92rem;
    line-height: 1.45;
    color: #3a3020;
  }
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
    title: '', scope: '', description: '', problemDescription: '', problemUrl: '', problemNotes: '', problemNotesSource: '', problemParameters: '', metricLabels: {}, metricEquations: {}, constraints: [], transitionEquations: [], timeStep: { value: '', unit: '' }, horizon: { value: '', unit: '' },
    problemParameters: '',
    metricLabels: {},     // metric name → short math label (e.g. "C_{cost}")
    metricEquations: {},  // metric name → LaTeX formula string
    constraints: [],           // [{name, formula}]
    transitionEquations: [],   // [{name, formula}]
    promptAnswers: { decisionMaker: '', setting: '', history: '', goals: '', other: '' },
    metrics: [], assignments: {}, chipColors: {},
    decisions: [], matrix: {}, decisionKinds: {}, decisionTimings: {}, subframes: {}, playConfigs: {},
    uncertainties: [], uMatrix: {}, uncertaintyScopes: {}, uncertaintyKinds: {}, uncertaintyTimings: {},
  };
  // Guided-prompt questions (same 5 as production + mobile).
  const PROMPT_QUESTIONS = [
    { key: 'decisionMaker', inputId: 'fp-scope-input', label: 'DECISION MAKER',   heading: 'Who is making the decision?' },
    { key: 'setting',       inputId: 'fp-q-setting',   label: 'PROBLEM SETTING',  heading: 'What is the problem setting?' },
    { key: 'history',       inputId: 'fp-q-history',   label: 'RELEVANT HISTORY', heading: 'Is there relevant history?' },
    { key: 'goals',         inputId: 'fp-q-goals',     label: 'GOALS',            heading: 'What are you trying to achieve?' },
    { key: 'other',         inputId: 'fp-q-other',     label: 'OTHER',            heading: 'Any other information that might be relevant?' },
  ];
  function hydratePromptAnswers() {
    if (!state.promptAnswers || typeof state.promptAnswers !== 'object') {
      state.promptAnswers = { decisionMaker: '', setting: '', history: '', goals: '', other: '' };
    }
    for (const q of PROMPT_QUESTIONS) {
      if (typeof state.promptAnswers[q.key] !== 'string') state.promptAnswers[q.key] = '';
    }
    const anyAnswered = PROMPT_QUESTIONS.some(q => state.promptAnswers[q.key].trim());
    if (!anyAnswered) {
      if (state.scope && state.scope.trim()) state.promptAnswers.decisionMaker = state.scope.trim();
      if (state.problemDescription && state.problemDescription.trim()) state.promptAnswers.other = state.problemDescription.trim();
    }
  }
  function buildDerivedDesc() {
    hydratePromptAnswers();
    state.scope = (state.promptAnswers.decisionMaker || '').trim();
    const parts = [];
    for (const q of PROMPT_QUESTIONS) {
      if (q.key === 'decisionMaker') continue;
      const val = (state.promptAnswers[q.key] || '').trim();
      if (val) parts.push(q.label + ': ' + val);
    }
    state.problemDescription = parts.join('\n\n');
    const desc = document.getElementById('fp-bot-desc');
    if (desc) desc.value = state.problemDescription;
  }
  // Updates the "N of 5 answered" chip on the Contextual background
  // launcher so the user can see at a glance how much they've filled in
  // without opening the modal.
  function updateContextCounter() {
    const el = document.getElementById('fp-context-counter');
    if (!el) return;
    let filled = 0;
    for (const q of PROMPT_QUESTIONS) {
      if ((state.promptAnswers[q.key] || '').trim()) filled++;
    }
    if (filled === 0) {
      el.hidden = true;
    } else {
      el.hidden = false;
      el.textContent = filled + ' of ' + PROMPT_QUESTIONS.length + ' answered';
    }
  }
  function renderPromptCards() {
    hydratePromptAnswers();
    for (const q of PROMPT_QUESTIONS) {
      const el = document.getElementById(q.inputId);
      if (el) el.value = state.promptAnswers[q.key] || '';
    }
    buildDerivedDesc();
    updateContextCounter();
    // Also refresh Modeling-section inputs so they follow the same
    // load/reset paths as the prompt cards.
    const pp = document.getElementById('fp-problem-parameters');
    if (pp) pp.value = state.problemParameters || '';
    renderModelingDecisions();
    renderMetricEquationsCard();
    // Refresh constraint + transition lists too.
    if (document.getElementById('fp-constraint-list')) {
      renderNamedEqList('fp-constraint-list', 'constraints',
                        'fp-constraint-name', 'fp-constraint-formula', 'fp-constraint-preview');
    }
    if (document.getElementById('fp-transition-list')) {
      renderNamedEqList('fp-transition-list', 'transitionEquations',
                        'fp-transition-name', 'fp-transition-formula', 'fp-transition-preview');
    }
  }
  // Voice input — shared SpeechRecognition instance across all 🎤
  // buttons. Silent fallback when the browser has no Web Speech API.
  let fpVoiceState = { R: null, rec: null, targetEl: null, btnEl: null, baseText: '' };
  function initFpVoiceInputs() {
    fpVoiceState.R = window.SpeechRecognition || window.webkitSpeechRecognition;
    const buttons = document.querySelectorAll('.fp-speak-btn');
    if (!fpVoiceState.R) { buttons.forEach(b => { b.style.display = 'none'; }); return; }
    buttons.forEach(btn => btn.addEventListener('click', () => onFpSpeakClick(btn)));
  }
  function fpSpeakLabel(recording) { return recording ? '<span class="fp-mic-glyph">■</span>Stop' : '<span class="fp-mic-glyph">🎤</span>Speak'; }
  function fpStopVoice() { if (fpVoiceState.rec) { try { fpVoiceState.rec.stop(); } catch (_) {} } }
  function fpResetVoiceBtn() {
    if (fpVoiceState.btnEl) {
      fpVoiceState.btnEl.classList.remove('is-recording');
      fpVoiceState.btnEl.innerHTML = fpSpeakLabel(false);
    }
  }
  function fpSetHint(targetId, msg, isErr) {
    const hint = document.querySelector('.fp-voice-hint[data-hint-for="' + targetId + '"]');
    if (!hint) return;
    hint.textContent = msg || '';
    hint.hidden = !msg;
    hint.classList.toggle('is-err', !!isErr);
  }
  function onFpSpeakClick(btn) {
    if (fpVoiceState.btnEl === btn && fpVoiceState.rec) { fpStopVoice(); return; }
    if (fpVoiceState.rec) fpStopVoice();
    fpResetVoiceBtn();
    const targetId = btn.dataset.target;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    const rec = new fpVoiceState.R();
    rec.lang = navigator.language || 'en-US';
    rec.continuous = true; rec.interimResults = true;
    fpVoiceState.rec = rec; fpVoiceState.btnEl = btn;
    fpVoiceState.targetEl = targetEl; fpVoiceState.baseText = targetEl.value || '';
    rec.onresult = (e) => {
      let final = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript; else interim += r[0].transcript;
      }
      const sep = fpVoiceState.baseText && !/[\s]$/.test(fpVoiceState.baseText) ? ' ' : '';
      targetEl.value = fpVoiceState.baseText + sep + final + interim;
      targetEl.dispatchEvent(new Event('input', { bubbles: true }));
    };
    rec.onend = () => { fpVoiceState.rec = null; fpResetVoiceBtn(); fpSetHint(targetId, ''); };
    rec.onerror = (e) => { fpVoiceState.rec = null; fpResetVoiceBtn(); fpSetHint(targetId, 'Voice: ' + (e.error || 'unknown') + '. Type instead.', true); };
    try {
      rec.start(); btn.classList.add('is-recording'); btn.innerHTML = fpSpeakLabel(true);
      fpSetHint(targetId, 'Listening…');
    } catch (err) {
      fpVoiceState.rec = null; fpResetVoiceBtn();
      fpSetHint(targetId, 'Voice failed: ' + (err.message || err), true);
    }
  }
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
      problemDescription: (s && typeof s.problemDescription === 'string') ? s.problemDescription : '',
      problemUrl:         (s && typeof s.problemUrl === 'string')         ? s.problemUrl         : '',
      problemNotes:       (s && typeof s.problemNotes === 'string')       ? s.problemNotes       : '',
      problemNotesSource: (s && typeof s.problemNotesSource === 'string') ? s.problemNotesSource : '',
      timeStep:           normalizeTimeSpec(s && s.timeStep),
      horizon:            normalizeTimeSpec(s && s.horizon, /* allowPeriods */ true),
      problemParameters:  (s && typeof s.problemParameters === 'string') ? s.problemParameters : '',
      metricLabels:       (s && s.metricLabels    && typeof s.metricLabels    === 'object') ? s.metricLabels    : {},
      metricEquations:    (s && s.metricEquations && typeof s.metricEquations === 'object') ? s.metricEquations : {},
      constraints:        Array.isArray(s && s.constraints)         ? s.constraints         : [],
      transitionEquations:Array.isArray(s && s.transitionEquations) ? s.transitionEquations : [],
      promptAnswers:      (s && s.promptAnswers && typeof s.promptAnswers === 'object') ? s.promptAnswers : { decisionMaker: '', setting: '', history: '', goals: '', other: '' },
      metrics:       Array.isArray(s && s.metrics)            ? s.metrics      : [],
      assignments:   (s && s.assignments)                ? s.assignments   : {},
      chipColors:    (s && s.chipColors)                 ? s.chipColors    : {},
      decisions:     Array.isArray(s && s.decisions)     ? s.decisions     : [],
      matrix:        (s && s.matrix)                     ? s.matrix        : {},
      decisionKinds: normalizeDecisionKinds(s && s.decisionKinds),
      decisionTimings: normalizeTimings(s && s.decisionTimings),
      subframes:     normalizeSubframes(s && s.subframes),
      playConfigs:   normalizePlayConfigs(s && s.playConfigs),
      uncertainties: Array.isArray(s && s.uncertainties) ? s.uncertainties : [],
      uMatrix:       (s && s.uMatrix)                    ? s.uMatrix       : {},
      uncertaintyScopes:   normalizeUncertaintyScopes(s && s.uncertaintyScopes),
      uncertaintyKinds:    normalizeDecisionKinds(s && s.uncertaintyKinds),   // reuse gen/disc/num validator
      uncertaintyTimings:  normalizeTimings(s && s.uncertaintyTimings),
    };
  }
  // Per-uncertainty scope map: uncertainty name → parentPath (array of
  // decision names, root → leaf) at the time the uncertainty was generated.
  // An empty array (or a missing entry) means the uncertainty applies at
  // the root — i.e. to every decision and sub-decision.
  // Per-decision kind map (per-frame — sub-frames get their own): decision
  // name → 'gen' (general / broad category), 'disc' (a discrete choice from
  // a specific list), or 'num' (a numeric value — discrete integer OR
  // continuous). Missing entries mean 'gen' (the default). Purely
  // informational for now — later phases (tree collapsing, matrix roll-up,
  // suggesting solver types) will use this to distinguish still-drillable
  // categories from concrete choices or numeric parameters.
  // Legacy: 'spec' from earlier snapshots is silently migrated to 'disc'.
  function normalizeDecisionKinds(dk) {
    const out = {};
    if (!dk || typeof dk !== 'object') return out;
    for (const k of Object.keys(dk)) {
      if (typeof k !== 'string' || !k) continue;
      let v = String(dk[k] || '').toLowerCase();
      if (v === 'spec') v = 'disc';         // legacy alias
      if (v === 'disc' || v === 'num') out[k] = v;
      // 'gen' is the default — we only need to record non-default kinds.
    }
    return out;
  }
  // Per-item timing map (decision or uncertainty name → 'stat' or 'dyn').
  // Missing entries mean 'dyn' (the default — most sequential decision
  // analytics deals with dynamic decisions/uncertainties). Sparse: we
  // only record 'stat' explicitly.
  function normalizeTimings(tm) {
    const out = {};
    if (!tm || typeof tm !== 'object') return out;
    for (const k of Object.keys(tm)) {
      if (typeof k !== 'string' || !k) continue;
      const v = String(tm[k] || '').toLowerCase();
      if (v === 'stat') out[k] = 'stat';
      // 'dyn' is the default — no need to store.
    }
    return out;
  }
  // Time step / horizon spec: { value: '' | number, unit: '' | wall-clock }.
  // Wall-clock units: seconds | minutes | hours | days | weeks | months |
  // quarters | years. Horizon may additionally carry unit = 'periods' to
  // count against the time-step unit directly. Empty when the user hasn't
  // filled it in — no default (forces the choice).
  const WALL_UNITS = ['seconds','minutes','hours','days','weeks','months','quarters','years'];
  function normalizeTimeSpec(ts, allowPeriods) {
    if (!ts || typeof ts !== 'object') return { value: '', unit: '' };
    const rawVal = ts.value;
    const value = (rawVal === '' || rawVal == null) ? '' : (Number.isFinite(Number(rawVal)) ? String(rawVal) : '');
    const unitRaw = String(ts.unit || '').toLowerCase();
    const allowed = allowPeriods ? WALL_UNITS.concat(['periods']) : WALL_UNITS;
    const unit = allowed.indexOf(unitRaw) >= 0 ? unitRaw : '';
    return { value, unit };
  }
  // Per-decision play configuration (per-frame; sub-frames get their own).
  // Keyed by decision name → { alternatives, mode, spreads, history }.
  //   alternatives : ordered list of strings (choice names).
  //   mode         : 'repeated' (default) | 'one-shot'.
  //   spreads      : { metricName: { altName: [p10, p50, p90] } }.
  //                  Numbers only; missing → cell blank, missing whole
  //                  metric row → no spread specified yet.
  //   history      : [{ t, alt, samples: { metricName: value } }, …] —
  //                  the record of picks + realized draws in play mode.
  //                  t starts at 1 (round number).
  // Only decisions that the user has actually opened in the Play modal
  // appear here; other decisions leave the map sparse.
  function normalizePlayConfigs(pc) {
    const out = {};
    if (!pc || typeof pc !== 'object') return out;
    for (const decName of Object.keys(pc)) {
      if (typeof decName !== 'string' || !decName) continue;
      const raw = pc[decName];
      if (!raw || typeof raw !== 'object') continue;
      const alts = Array.isArray(raw.alternatives)
        ? raw.alternatives.filter(a => typeof a === 'string' && a.trim()).map(a => a.trim())
        : [];
      const mode = raw.mode === 'one-shot' ? 'one-shot' : 'repeated';
      const spreads = {};
      if (raw.spreads && typeof raw.spreads === 'object') {
        for (const m of Object.keys(raw.spreads)) {
          if (typeof m !== 'string' || !m) continue;
          const row = raw.spreads[m];
          if (!row || typeof row !== 'object') continue;
          const cleanedRow = {};
          for (const a of Object.keys(row)) {
            const cell = row[a];
            if (Array.isArray(cell) && cell.length === 3) {
              const nums = cell.map(v => (v === '' || v == null || !Number.isFinite(Number(v))) ? '' : Number(v));
              cleanedRow[a] = nums;
            }
          }
          if (Object.keys(cleanedRow).length) spreads[m] = cleanedRow;
        }
      }
      const history = [];
      if (Array.isArray(raw.history)) {
        for (const h of raw.history) {
          if (!h || typeof h !== 'object') continue;
          const t = Number(h.t);
          if (!Number.isFinite(t) || t < 1) continue;
          const alt = typeof h.alt === 'string' ? h.alt : '';
          if (!alt) continue;
          const samples = {};
          if (h.samples && typeof h.samples === 'object') {
            for (const m of Object.keys(h.samples)) {
              const v = Number(h.samples[m]);
              if (Number.isFinite(v)) samples[m] = v;
            }
          }
          history.push({ t: Math.floor(t), alt, samples });
        }
        history.sort((a, b) => a.t - b.t);
      }
      out[decName] = { alternatives: alts, mode, spreads, history };
    }
    return out;
  }
  function normalizeUncertaintyScopes(sc) {
    const out = {};
    if (!sc || typeof sc !== 'object') return out;
    for (const k of Object.keys(sc)) {
      if (typeof k !== 'string' || !k) continue;
      const v = sc[k];
      if (Array.isArray(v)) {
        const path = v.filter(x => typeof x === 'string' && x).map(String);
        if (path.length) out[k] = path;
      }
    }
    return out;
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
        decisionKinds:   normalizeDecisionKinds(f.decisionKinds),
        decisionTimings: normalizeTimings(f.decisionTimings),
        subframes: normalizeSubframes(f.subframes),
        playConfigs: normalizePlayConfigs(f.playConfigs),
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
        scope: '', decisions: [], matrix: {}, decisionKinds: {}, decisionTimings: {}, subframes: {}, playConfigs: {},
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
    // The compact "↑ Up one level" button lives in the matrix controls
    // strip so it's within reach when scoring — visible whenever we're
    // drilled below the top level.
    const upBtn = $('#fp-decision-up-level');
    if (upBtn) upBtn.hidden = atTopLevel();
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
      el.textContent = 'No document loaded — use File > Open to load one, or File > Save as… to save the current work as a new framing in your library.';
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
    // Inline rename button — only meaningful for a server-backed framing
    // the user can edit. Hidden for empty banner, local imports, AI drafts.
    const renameBtn = $('#fp-doc-rename-btn');
    if (renameBtn) {
      const canRename = !!(docTitle && loadedNode && loadedNode.writeToken && loadedNode.currentFramingId);
      renameBtn.hidden = !canRename;
    }
  }
  function snapshotForSave() {
    buildDerivedDesc();
    return {
      title: state.title,
      scope: state.scope,
      description: state.description,
      problemDescription: state.problemDescription,
      problemUrl: state.problemUrl,
      problemNotes: state.problemNotes,
      problemNotesSource: state.problemNotesSource,
      promptAnswers: state.promptAnswers,
      timeStep: state.timeStep,
      horizon: state.horizon,
      problemParameters: state.problemParameters,
      metricLabels: state.metricLabels,
      metricEquations: state.metricEquations,
      constraints: state.constraints,
      transitionEquations: state.transitionEquations,
      metrics: state.metrics,
      assignments: state.assignments,
      chipColors: state.chipColors,
      decisions: state.decisions,
      matrix: state.matrix,
      decisionKinds: state.decisionKinds,
      decisionTimings: state.decisionTimings,
      subframes: state.subframes,
      playConfigs: state.playConfigs,
      uncertainties: state.uncertainties,
      uMatrix: state.uMatrix,
      uncertaintyScopes: state.uncertaintyScopes,
      uncertaintyKinds: state.uncertaintyKinds,
      uncertaintyTimings: state.uncertaintyTimings,
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
    renderPromptCards();
    $('#fp-bot-url').value             = state.problemUrl || '';
    renderNotesChip(); syncTimeSpecDom();
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
      row.appendChild(delBtn);
      list.appendChild(row);
    }
  }
  function openOpenModal() {
    renderPublicExamplesRow();
    renderFileList();
    renderServerLibraryList();
    const m = $('#fp-open-modal');
    if (m) m.hidden = false;
  }
  // Dedicated top-of-modal entry for the curated Public examples
  // library. Always visible in the Open modal regardless of the user's
  // localStorage state, so casual first-time visitors can discover it
  // even before they've opened it.
  function renderPublicExamplesRow() {
    const row = $('#fp-public-examples-row');
    if (!row || !PUBLIC_EXAMPLES_READ_ID) return;
    row.innerHTML = '';
    const nameEl = document.createElement('span');
    nameEl.style.flex = '1';
    nameEl.style.fontWeight = '600';
    nameEl.textContent = '📂 ' + PUBLIC_EXAMPLES_NAME;
    row.appendChild(nameEl);
    const badge = document.createElement('span');
    badge.textContent = 'View';
    badge.style.padding = '2px 8px';
    badge.style.borderRadius = '999px';
    badge.style.fontSize = '0.75rem';
    badge.style.fontWeight = '600';
    badge.style.background = '#dbeafe';
    badge.style.color = '#1e3a8a';
    row.appendChild(badge);
    row.onclick = () => {
      const url = new URL(window.location.origin + window.location.pathname);
      url.searchParams.set('node', PUBLIC_EXAMPLES_READ_ID);
      window.location.href = url.toString();
    };
    row.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); }
    };
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
        renderPromptCards();
        $('#fp-bot-url').value             = state.problemUrl || '';
        renderNotesChip(); syncTimeSpecDom();
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
    renderMetricEquationsCard();  // dropdown reflects the new metrics list
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
    // one drops it. Same treatment for the per-frame decisionKinds
    // (gen/spec label) map — rename migrates the label, delete drops it.
    if (kind === 'decision') {
      reconcileSubframes(frame, renames, deletes);
      reconcileDecisionKinds(frame, renames, deletes);
      reconcileTimings(frame, 'decisionTimings', renames, deletes);
    }
    // Uncertainty-level renames/deletes propagate to all three uncertainty
    // sidecar maps so labels follow the renamed item and drop on delete.
    if (kind === 'uncertainty') {
      reconcileUncertaintyScopes(renames, deletes);
      reconcileUncertaintyKinds(renames, deletes);
      reconcileTimings(state, 'uncertaintyTimings', renames, deletes);
    }
    renderImpactMatrix(kind);
    autoSave();
  }
  function toggleDecisionKind(frame, name) {
    if (!frame) return;
    if (!frame.decisionKinds || typeof frame.decisionKinds !== 'object') {
      frame.decisionKinds = {};
    }
    let stored = frame.decisionKinds[name];
    if (stored === 'spec') stored = 'disc';   // legacy alias
    const cur = (stored === 'disc' || stored === 'num') ? stored : 'gen';
    // Cycle: gen -> disc -> num -> gen
    const cycle = { gen: 'disc', disc: 'num', num: 'gen' };
    const next = cycle[cur];
    if (next === 'gen') {
      delete frame.decisionKinds[name];   // 'gen' is the default; keep the map sparse
    } else {
      frame.decisionKinds[name] = next;
    }
    renderImpactMatrix('decision');
    autoSave();
  }
  // Timing toggle — parallels toggleDecisionKind. Applies to any item
  // (decision on a frame, or uncertainty on the root). Pass the map
  // that holds the timing entries (frame.decisionTimings or
  // state.uncertaintyTimings) and the item name.
  function toggleTiming(mapHolder, mapKey, name) {
    if (!mapHolder) return;
    if (!mapHolder[mapKey] || typeof mapHolder[mapKey] !== 'object') mapHolder[mapKey] = {};
    const cur = mapHolder[mapKey][name] === 'stat' ? 'stat' : 'dyn';
    const next = cur === 'stat' ? 'dyn' : 'stat';
    if (next === 'dyn') {
      delete mapHolder[mapKey][name];      // 'dyn' is the default; keep the map sparse
    } else {
      mapHolder[mapKey][name] = next;
    }
    autoSave();
  }
  // Uncertainty-kind toggle (gen -> disc -> num -> gen). Parallel to
  // toggleDecisionKind but stored on state.uncertaintyKinds.
  function toggleUncertaintyKind(name) {
    if (!state.uncertaintyKinds || typeof state.uncertaintyKinds !== 'object') {
      state.uncertaintyKinds = {};
    }
    const stored = state.uncertaintyKinds[name];
    const cur = (stored === 'disc' || stored === 'num') ? stored : 'gen';
    const cycle = { gen: 'disc', disc: 'num', num: 'gen' };
    const next = cycle[cur];
    if (next === 'gen') {
      delete state.uncertaintyKinds[name];
    } else {
      state.uncertaintyKinds[name] = next;
    }
    renderImpactMatrix('uncertainty');
    autoSave();
  }
  // Reconcile helpers for the new sidecar maps — parallel to
  // reconcileDecisionKinds. Called from syncListFromTextarea on
  // rename / delete so labels follow their item.
  function reconcileTimings(mapHolder, mapKey, renames, deletes) {
    if (!mapHolder || !mapHolder[mapKey] || typeof mapHolder[mapKey] !== 'object') return;
    const m = mapHolder[mapKey];
    for (const [from, to] of renames) {
      if (from === to) continue;
      if (m[from]) {
        if (!m[to]) m[to] = m[from];
        delete m[from];
      }
    }
    for (const gone of deletes) {
      if (m[gone]) delete m[gone];
    }
  }
  function reconcileUncertaintyKinds(renames, deletes) {
    if (!state.uncertaintyKinds) return;
    for (const [from, to] of renames) {
      if (from === to) continue;
      if (state.uncertaintyKinds[from]) {
        if (!state.uncertaintyKinds[to]) state.uncertaintyKinds[to] = state.uncertaintyKinds[from];
        delete state.uncertaintyKinds[from];
      }
    }
    for (const gone of deletes) {
      if (state.uncertaintyKinds[gone]) delete state.uncertaintyKinds[gone];
    }
  }
  function reconcileDecisionKinds(frame, renames, deletes) {
    if (!frame || !frame.decisionKinds || typeof frame.decisionKinds !== 'object') return;
    for (const [from, to] of renames) {
      if (from === to) continue;
      if (frame.decisionKinds[from]) {
        // Do not silently clobber an existing target key (rare — the user
        // typed a name that already exists at this level).
        if (!frame.decisionKinds[to]) {
          frame.decisionKinds[to] = frame.decisionKinds[from];
        }
        delete frame.decisionKinds[from];
      }
    }
    for (const gone of deletes) {
      if (frame.decisionKinds[gone]) delete frame.decisionKinds[gone];
    }
  }
  function reconcileUncertaintyScopes(renames, deletes) {
    if (!state.uncertaintyScopes) return;
    for (const [from, to] of renames) {
      if (state.uncertaintyScopes[from]) {
        state.uncertaintyScopes[to] = state.uncertaintyScopes[from];
        delete state.uncertaintyScopes[from];
      }
    }
    for (const gone of deletes) {
      if (state.uncertaintyScopes[gone]) delete state.uncertaintyScopes[gone];
    }
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
    // Attributes panel mirrors the list regardless of matrix state.
    if (kind === 'decision')    renderDecisionAttrs();
    if (kind === 'uncertainty') renderUncertaintyAttrs();
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
      // Uncertainty chips (kind, timing, and any "for: X" scope tag) now
      // live in the Attributes list under the Uncertainties textarea, so
      // the matrix cell stays clean (drag handle + name only).
      // Right-click anywhere on a decision row still drills in — the
      // (gen)/(disc)/(num), (stat)/(dyn) chips and ▸ drill button now
      // live in the Attributes list under the textarea, so the matrix
      // cell stays clean (drag handle + decision name only).
      if (kind === 'decision') {
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
  // Per-decision attributes list — one row per line in the Decisions
  // textarea, carrying the (gen)/(disc)/(num) kind chip, the (stat)/(dyn)
  // timing chip, and the ▸ drill-in button. Blank / in-progress lines
  // render as spacer rows so the attribute list stays aligned line-for-
  // line with the textarea on the left.
  function renderDecisionAttrs() {
    const wrap = document.getElementById('fp-decision-attrs');
    if (!wrap) return;
    const frame = frameFor('decision');
    const known = Array.isArray(frame.decisions) ? frame.decisions : [];
    const knownMap = new Map();  // lower-cased name → canonical name in frame
    for (const d of known) knownMap.set(d.trim().toLowerCase(), d);
    const ta = document.getElementById('fp-decisions-input');
    const raw = ta ? ta.value : known.join('\n');
    const lines = raw.split('\n');
    wrap.innerHTML = '';
    if (known.length === 0 && raw.trim() === '') {
      const empty = document.createElement('div');
      empty.className = 'fp-decision-attrs-empty';
      empty.textContent = 'Enter decisions on the left — attribute chips (gen/disc/num, stat/dyn) and the ▸ drill-in button will appear here on the same row.';
      wrap.appendChild(empty);
      return;
    }
    for (const line of lines) {
      const trimmed = line.trim();
      const canonical = trimmed ? knownMap.get(trimmed.toLowerCase()) : null;
      if (!canonical) {
        // Blank or in-progress line — render a spacer so alignment holds
        const spacer = document.createElement('div');
        spacer.className = 'fp-decision-attr-spacer';
        wrap.appendChild(spacer);
        continue;
      }
      const name = canonical;
      const row = document.createElement('div');
      row.className = 'fp-decision-attr-row';
      row.dataset.name = name;

      // Name is not repeated here — it appears on the same visual line
      // in the textarea to the left. The row tooltip still carries it.
      row.title = name;

      // (gen) / (disc) / (num) kind chip
      const kindMap = frame.decisionKinds || {};
      let stored = kindMap[name];
      if (stored === 'spec') stored = 'disc';   // legacy alias
      const dk = (stored === 'disc' || stored === 'num') ? stored : 'gen';
      const kchip = document.createElement('button');
      kchip.type = 'button';
      kchip.className = 'fp-decision-kind-chip fp-decision-kind-' + dk;
      kchip.textContent = '(' + dk + ')';
      const kTitles = {
        gen:  'General — a broad category of decision that can be refined into sub-decisions ("Choose supplier"). Click to switch to (disc).',
        disc: 'Discrete — a specific choice from a discrete list ("Buy from ContractCo", "Prescribe metformin"). Click to switch to (num).',
        num:  'Numeric — a discrete integer or continuous value ("Safety stock = 42", "Price in [0, 100]"). Click to switch to (gen).',
      };
      kchip.title = kTitles[dk];
      kchip.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDecisionKind(frame, name);
      });
      row.appendChild(kchip);

      // (stat) / (dyn) timing chip
      const timingMap = frame.decisionTimings || {};
      const dt = timingMap[name] === 'stat' ? 'stat' : 'dyn';
      const tchip = document.createElement('button');
      tchip.type = 'button';
      tchip.className = 'fp-timing-chip fp-timing-' + dt;
      tchip.textContent = '(' + dt + ')';
      tchip.title = dt === 'stat'
        ? 'Static — fixed once at t=0 (design/capacity/one-time choice). Click to switch to (dyn).'
        : 'Dynamic — can change per period starting at t=0. Click to switch to (stat).';
      tchip.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTiming(frame, 'decisionTimings', name);
        renderImpactMatrix('decision');
      });
      row.appendChild(tchip);

      // Sub-decisions button — replaces the old bare ▸ triangle so the
      // affordance is obvious. Shows the count when > 0.
      const count = subDecisionCount(frame, name);
      const drill = document.createElement('button');
      drill.type = 'button';
      drill.className = 'fp-subdec-btn' + (count > 0 ? ' fp-subdec-btn-has' : '');
      drill.textContent = count > 0
        ? (count + ' sub-decision' + (count === 1 ? '' : 's') + ' ›')
        : '+ sub-decisions';
      drill.title = count > 0
        ? ('Drill into ' + count + ' sub-decision' + (count === 1 ? '' : 's'))
        : 'Break this decision down into sub-decisions';
      drill.addEventListener('click', (e) => {
        e.stopPropagation();
        drillInto(name);
      });
      row.appendChild(drill);

      wrap.appendChild(row);
    }
  }

  // Per-uncertainty attributes list — mirrors renderDecisionAttrs but
  // for uncertainties. Kind chip + timing chip + optional "for: X"
  // scope tag (when the uncertainty was generated under a drill-in).
  // Uncertainties are flat at the root, so no drill button.
  function renderUncertaintyAttrs() {
    const wrap = document.getElementById('fp-uncertainty-attrs');
    if (!wrap) return;
    const known = Array.isArray(state.uncertainties) ? state.uncertainties : [];
    const knownMap = new Map();
    for (const u of known) knownMap.set(u.trim().toLowerCase(), u);
    const ta = document.getElementById('fp-uncertainties-input');
    const raw = ta ? ta.value : known.join('\n');
    const lines = raw.split('\n');
    wrap.innerHTML = '';
    if (known.length === 0 && raw.trim() === '') {
      const empty = document.createElement('div');
      empty.className = 'fp-decision-attrs-empty';
      empty.textContent = 'Enter uncertainties on the left — attribute chips (gen/disc/num, stat/dyn) will appear here on the same row.';
      wrap.appendChild(empty);
      return;
    }
    for (const line of lines) {
      const trimmed = line.trim();
      const canonical = trimmed ? knownMap.get(trimmed.toLowerCase()) : null;
      if (!canonical) {
        const spacer = document.createElement('div');
        spacer.className = 'fp-decision-attr-spacer';
        wrap.appendChild(spacer);
        continue;
      }
      const name = canonical;
      const row = document.createElement('div');
      row.className = 'fp-decision-attr-row';
      row.dataset.name = name;

      // Name is not repeated here — it appears on the same visual line
      // in the textarea to the left. The row tooltip still carries it.
      row.title = name;

      // (gen) / (disc) / (num) kind chip
      const ukMap = state.uncertaintyKinds || {};
      const uk = (ukMap[name] === 'disc' || ukMap[name] === 'num') ? ukMap[name] : 'gen';
      const kchip = document.createElement('button');
      kchip.type = 'button';
      kchip.className = 'fp-decision-kind-chip fp-decision-kind-' + uk;
      kchip.textContent = '(' + uk + ')';
      const ukTitles = {
        gen:  'General uncertainty — a broad category ("Weather", "Interest rates"). Click to switch to (disc).',
        disc: 'Discrete uncertainty — a specific realization from a discrete set ("Recession scenario", "Fed rate = 5.25%"). Click to switch to (num).',
        num:  'Numeric uncertainty — a random variable with a distribution ("Demand ~ Normal(100, 15)"). Click to switch to (gen).',
      };
      kchip.title = ukTitles[uk];
      kchip.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleUncertaintyKind(name);
      });
      row.appendChild(kchip);

      // (stat) / (dyn) timing chip
      const utMap = state.uncertaintyTimings || {};
      const ut = utMap[name] === 'stat' ? 'stat' : 'dyn';
      const tchip = document.createElement('button');
      tchip.type = 'button';
      tchip.className = 'fp-timing-chip fp-timing-' + ut;
      tchip.textContent = '(' + ut + ')';
      tchip.title = ut === 'stat'
        ? 'Static — a fixed but uncertain parameter, drawn once at t=0 from a distribution (unknown model parameter, one-time draw). Click to switch to (dyn).'
        : 'Dynamic — arrives / evolves per period (demand, weather, prices over time). Click to switch to (stat).';
      tchip.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTiming(state, 'uncertaintyTimings', name);
        renderImpactMatrix('uncertainty');
      });
      row.appendChild(tchip);

      // "for: X" scope tag — shown only for uncertainties generated
      // while drilled into a sub-decision.
      const scopePath = (state.uncertaintyScopes && state.uncertaintyScopes[name]) || null;
      if (Array.isArray(scopePath) && scopePath.length) {
        const chip = document.createElement('span');
        chip.className = 'fp-u-scope-chip';
        const leaf = scopePath[scopePath.length - 1];
        chip.textContent = 'for: ' + leaf;
        chip.title = 'Generated while drilled into: ' + scopePath.join(' → ') +
          '. This uncertainty is in the root list but was suggested for that sub-decision context.';
        row.appendChild(chip);
      }

      wrap.appendChild(row);
    }
  }

  function renderAllMatrices() {
    renderImpactMatrix('decision');
    renderImpactMatrix('uncertainty');
    renderModelingDecisions();
    // Align each textarea's top with the first data row of its matrix
    // — measure AFTER render so column widths / header wrapping are
    // fully laid out.
    requestAnimationFrame(alignMatrixTextareas);
  }
  // Populate the metric dropdown + list of already-defined equations.
  // Called from renderPromptCards() (which is called on every load /
  // reset) and after any edit to state.metrics.
  function renderMetricEquationsCard() {
    const sel = document.getElementById('fp-metric-eq-select');
    const lbl = document.getElementById('fp-metric-eq-label');
    const form = document.getElementById('fp-metric-eq-formula');
    const list = document.getElementById('fp-metric-eq-list');
    if (!sel || !lbl || !form || !list) return;
    // Rebuild dropdown from current top-level metrics
    const prev = sel.value;
    sel.innerHTML = '<option value="">— pick a metric —</option>';
    for (const m of (state.metrics || [])) {
      const opt = document.createElement('option');
      opt.value = m; opt.textContent = m;
      sel.appendChild(opt);
    }
    // Restore prior selection if the metric still exists
    if (prev && (state.metrics || []).indexOf(prev) >= 0) sel.value = prev;
    // Populate label + formula from the selected metric
    const cur = sel.value;
    lbl.value  = cur ? (state.metricLabels[cur]    || '') : '';
    form.value = cur ? (state.metricEquations[cur] || '') : '';
    // Rebuild the list of already-defined equations
    list.innerHTML = '';
    for (const m of (state.metrics || [])) {
      const eq = state.metricEquations[m];
      if (!eq || !eq.trim()) continue;
      const li = document.createElement('li');
      const nameEl = document.createElement('span');
      nameEl.className = 'fp-metric-eq-list-name';
      nameEl.textContent = m;
      li.appendChild(nameEl);
      const labelEl = document.createElement('span');
      labelEl.className = 'fp-metric-eq-list-label';
      labelEl.textContent = state.metricLabels[m] ? '[' + state.metricLabels[m] + ']' : '';
      li.appendChild(labelEl);
      const formEl = document.createElement('span');
      formEl.className = 'fp-metric-eq-list-formula';
      formEl.textContent = eq;
      li.appendChild(formEl);
      const editBtn = document.createElement('button');
      editBtn.type = 'button'; editBtn.title = 'Edit'; editBtn.textContent = '✎';
      editBtn.addEventListener('click', () => {
        sel.value = m;
        renderMetricEquationsCard();
        form.focus();
      });
      li.appendChild(editBtn);
      const delBtn = document.createElement('button');
      delBtn.type = 'button'; delBtn.title = 'Delete equation'; delBtn.textContent = '×';
      delBtn.addEventListener('click', () => {
        if (!confirm('Delete the equation for "' + m + '"? (Short label is kept.)')) return;
        delete state.metricEquations[m];
        autoSave();
        renderMetricEquationsCard();
        renderMetricEquationPreview();
      });
      li.appendChild(delBtn);
      list.appendChild(li);
    }
    renderMetricEquationPreview();
  }
  function renderMetricEquationPreview() {
    renderEqPreview('fp-metric-eq-formula', 'fp-metric-eq-preview');
  }
  // Generic preview helper — reads a formula textarea's value, wraps
  // it in $$…$$ if not already delimited, dumps into the preview
  // container, and re-runs MathJax on that container.
  function renderEqPreview(formulaId, previewId) {
    const form = document.getElementById(formulaId);
    const preview = document.getElementById(previewId);
    if (!form || !preview) return;
    const raw = (form.value || '').trim();
    if (!raw) {
      preview.innerHTML = '<span class="fp-muted">Preview appears here once you type an equation.</span>';
      return;
    }
    const wrapped = /^\$\$?|^\\\(|^\\\[/.test(raw) ? raw : '$$' + raw + '$$';
    preview.innerHTML = wrapped;
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      window.MathJax.typesetPromise([preview]).catch(() => { /* ignore render errors */ });
    }
  }
  // Render the list of named LaTeX entries for a given array
  // (constraints, transitionEquations, …). Uses the same .fp-metric-eq-list
  // markup — name + LaTeX + edit / delete buttons.
  function renderNamedEqList(listId, stateArrayName, nameInputId, formulaInputId, previewId) {
    const list = document.getElementById(listId);
    const arr = state[stateArrayName] || [];
    if (!list) return;
    list.innerHTML = '';
    if (!arr.length) {
      const li = document.createElement('li');
      li.style.color = '#7a6a55'; li.style.fontStyle = 'italic';
      li.textContent = 'None yet.';
      list.appendChild(li);
      return;
    }
    arr.forEach((entry, idx) => {
      const li = document.createElement('li');
      const nameEl = document.createElement('span');
      nameEl.className = 'fp-metric-eq-list-name';
      nameEl.textContent = entry.name || '(unnamed)';
      li.appendChild(nameEl);
      const formEl = document.createElement('span');
      formEl.className = 'fp-metric-eq-list-formula';
      formEl.textContent = entry.formula || '';
      li.appendChild(formEl);
      const editBtn = document.createElement('button');
      editBtn.type = 'button'; editBtn.title = 'Edit'; editBtn.textContent = '✎';
      editBtn.addEventListener('click', () => {
        document.getElementById(nameInputId).value = entry.name || '';
        document.getElementById(formulaInputId).value = entry.formula || '';
        // Remove the entry from the list so the next Add re-inserts the
        // edited version rather than duplicating.
        arr.splice(idx, 1);
        autoSave();
        renderNamedEqList(listId, stateArrayName, nameInputId, formulaInputId, previewId);
        renderEqPreview(formulaInputId, previewId);
        document.getElementById(formulaInputId).focus();
      });
      li.appendChild(editBtn);
      const delBtn = document.createElement('button');
      delBtn.type = 'button'; delBtn.title = 'Delete'; delBtn.textContent = '×';
      delBtn.addEventListener('click', () => {
        if (!confirm('Delete "' + (entry.name || 'unnamed') + '"?')) return;
        arr.splice(idx, 1);
        autoSave();
        renderNamedEqList(listId, stateArrayName, nameInputId, formulaInputId, previewId);
      });
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  // Populate the Modeling section's decision list — every (disc)-kind
  // decision in the CURRENT frame gets a row with a ▶ Play button that
  // opens the play modal (same modal the old row-level button used).
  function renderModelingDecisions() {
    const ul = document.getElementById('fp-modeling-decisions');
    if (!ul) return;
    const frame = currentFrame();
    const kinds = frame.decisionKinds || {};
    const discs = (frame.decisions || []).filter(name => kinds[name] === 'disc');
    ul.innerHTML = '';
    if (!discs.length) {
      const li = document.createElement('li');
      li.className = 'fp-modeling-decisions-empty';
      li.textContent = 'No discrete decisions in this frame yet. Mark any decision as (disc) in the impact matrix above and it will appear here.';
      ul.appendChild(li);
      return;
    }
    for (const name of discs) {
      const li = document.createElement('li');
      li.className = 'fp-modeling-decision';
      const nameEl = document.createElement('span');
      nameEl.className = 'fp-modeling-decision-name';
      nameEl.textContent = name;
      li.appendChild(nameEl);
      const play = document.createElement('button');
      play.type = 'button';
      play.className = 'fp-modeling-decision-play';
      play.textContent = '▶ Play';
      play.title = 'Human-in-the-loop simulator for this discrete choice';
      play.addEventListener('click', () => openPlayModal(name));
      li.appendChild(play);
      ul.appendChild(li);
    }
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
  // BETA FRONTEND — hardcoded to talk to the beta chatbot always,
  // regardless of URL query params. Companion file to
  // _pages/decision-framing-tool.md (production).
  const IS_BETA_BACKEND = true;
  const CHATBOT_BASE = 'https://castle-chatbot-beta.onrender.com';
  {
    const b = document.getElementById('fp-beta-banner');
    if (b) b.hidden = false;
  }
  const MATRIX_ENDPOINT = CHATBOT_BASE + '/framing/matrix';
  const PYRAMID_ENDPOINT = CHATBOT_BASE + '/framing/pyramid';
  const IDEAS_ENDPOINT   = CHATBOT_BASE + '/framing/ideas';
  const INGEST_ENDPOINT  = CHATBOT_BASE + '/framing/ingest';
  const SUGGEST_TYPES_ENDPOINT = CHATBOT_BASE + '/framing/decision-types';
  const SUGGEST_UNCERTAINTY_TYPES_ENDPOINT = CHATBOT_BASE + '/framing/uncertainty-types';
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
      const body = { kind, metrics, rows };
      const notes = (state.problemNotes || '').trim();
      if (notes) body.priorNotes = notes;
      // Also send lightweight text context (scope + description) so the
      // matrix scoring can reflect them even when the user hasn't
      // ingested. Matches the auto-context behavior of Generate ideas.
      const mScope = $('#fp-scope-input').value.trim();
      const mDesc  = $('#fp-bot-desc').value.trim();
      if (mScope) body.scope = mScope;
      if (mDesc)  body.description = mDesc;
      const resp = await fetch(MATRIX_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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

  // ── Metrics pyramid: First draft (AI) + Reset ─────────────
  // Parallels the per-matrix AI buttons. Pulls scope/description/URL/file
  // from the Problem scope section at the top of the page and asks the
  // model to invent a metrics pyramid. Existing decisions/uncertainties
  // (if any) are sent as context so the generated metrics align with
  // what the user already has on screen. Does NOT touch decisions,
  // uncertainties, or matrices.
  function showPyramidAiNote() {
    const el = $('#fp-pyramid-ai-note');
    if (el) el.hidden = false;
  }
  function hidePyramidAiNote() {
    const el = $('#fp-pyramid-ai-note');
    if (el) el.hidden = true;
  }
  function setPyramidButtonsBusy(busy, label) {
    const draft = $('#fp-pyramid-draft');
    const reset = $('#fp-pyramid-reset');
    if (draft) {
      draft.disabled = busy;
      if (busy) { draft.dataset.origText = draft.textContent; draft.textContent = label || 'Working…'; }
      else if (draft.dataset.origText) { draft.textContent = draft.dataset.origText; delete draft.dataset.origText; }
    }
    if (reset) reset.disabled = busy;
  }
  async function runPyramidDraft() {
    // Pull the same inputs the whole-framing draft uses (Problem scope
    // section at the top of the page). Any of them is enough.
    const scope = $('#fp-scope-input').value.trim();
    const desc  = $('#fp-bot-desc').value.trim();
    const url   = $('#fp-bot-url').value.trim();
    const file  = $('#fp-bot-file').files && $('#fp-bot-file').files[0];
    const size  = $('#fp-bot-size').value || 'medium';
    const notes = (state.problemNotes || '').trim();
    if (!scope && !desc && !url && !file && !notes) {
      alert('Fill in a decision-maker scope, description, URL, or file in the Problem scope section above first — the AI needs something to work from. (Or click "Read introductory materials" to ingest them once.)');
      return;
    }
    setPyramidButtonsBusy(true, 'Working…');
    try {
      const form = new FormData();
      if (scope) form.append('scope', scope);
      if (desc)  form.append('description', desc);
      // Ingested notes take the place of the raw url/file for downstream
      // calls (server would just re-fetch and re-parse them otherwise).
      if (notes) {
        form.append('priorNotes', notes);
      } else {
        if (url)  form.append('url', url);
        if (file) form.append('file', file, file.name);
      }
      form.append('size', size);
      // Optional context — align generated metrics with existing content.
      if (Array.isArray(state.decisions) && state.decisions.length) {
        form.append('existingDecisions', JSON.stringify(state.decisions));
      }
      if (Array.isArray(state.uncertainties) && state.uncertainties.length) {
        form.append('existingUncertainties', JSON.stringify(state.uncertainties));
      }
      const resp = await fetch(PYRAMID_ENDPOINT, { method: 'POST', body: form });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      if (!Array.isArray(data.metrics) || data.metrics.length === 0) {
        throw new Error('Server returned no metrics.');
      }
      // Apply metrics + assignments. Any existing matrix cells whose row
      // was scored against a metric that got renamed are cleaned by the
      // syncMetricsFromTextarea path — but here we're overwriting the
      // whole metric list, so run that pipeline via the textarea to keep
      // downstream state consistent (drops matrix cells that reference
      // metrics that no longer exist).
      $('#fp-metrics-input').value = data.metrics.join('\n');
      syncMetricsFromTextarea();
      // Now overlay tier assignments on top of the freshly-parsed metrics.
      const assign = (data.assignments && typeof data.assignments === 'object') ? data.assignments : {};
      state.assignments = {};
      for (const m of state.metrics) {
        const t = Number(assign[m]);
        if (Number.isFinite(t) && t >= 1 && t <= 4) state.assignments[m] = Math.round(t);
      }
      render();                    // re-render pyramid drop zones
      renderAllMatrices();         // matrix column headers may have changed
      showPyramidAiNote();
      autoSave();
    } catch (err) {
      console.error('Pyramid draft failed:', err);
      alert('Sorry — pyramid draft failed:\n\n' +
        ((err && err.message) ? err.message : String(err)) +
        '\n\n(First request after idle can take ~30 s while the server wakes up. Try again in a moment.)');
    } finally {
      setPyramidButtonsBusy(false);
    }
  }
  // ── Idea box (Generate ideas) ─────────────────────────────
  // Modal that fetches AI-proposed decisions or uncertainties, lets
  // the user check the ones they like, and appends them to the
  // underlying textarea. State kept module-scope so the Regenerate
  // button knows which kind was requested.
  let ideasCurrentKind = null;
  // Which generation MODE fires on the next Generate-ideas click, per kind.
  // 'gen' = broad categories (current default). 'spec' = enumerate concrete
  // members (industry names, brand names, etc.) or numeric parameters,
  // skipping the categorical layer. Reset per page load.
  const ideasMode = { decision: 'gen', uncertainty: 'gen' };
  // Session-only filter: which of the 10 decision types (from the taxonomy
  // at /decisionsdecisions/#types-of-decision-settings) constrain the
  // AI's decision-idea generation. Empty = no filter (current behavior).
  // Numbers 1..10. Uncertainties don't use this taxonomy.
  const decisionTypesFilter = new Set();
  // Session-only filter for uncertainties, from the 12 categories at
  // /modeling-uncertainty/#categories. Empty = no filter.
  const uncertaintyTypesFilter = new Set();
  function updateDecisionTypesBtn() {
    const btn = document.getElementById('fp-decision-types-btn');
    if (!btn) return;
    const n = decisionTypesFilter.size;
    btn.textContent = n > 0 ? 'Types… (' + n + ')' : 'Types…';
    btn.classList.toggle('is-active', n > 0);
  }
  function openDecisionTypesModal() {
    const modal = document.getElementById('fp-decision-types-modal');
    if (!modal) return;
    // Sync checkboxes to state before showing.
    modal.querySelectorAll('.fp-decision-types-list input[type="checkbox"]').forEach(cb => {
      cb.checked = decisionTypesFilter.has(Number(cb.value));
    });
    const status = document.getElementById('fp-decision-types-status');
    if (status) { status.textContent = ''; status.style.color = ''; }
    modal.hidden = false;
  }
  function closeDecisionTypesModal() {
    const modal = document.getElementById('fp-decision-types-modal');
    if (modal) modal.hidden = true;
  }
  // Types 5 (metrics) and 10 (deciding what to decide) are inactive —
  // metrics live in the pyramid tool, and 10 is what this whole framing
  // tool is about. They're shown in the modal for taxonomy completeness
  // but disabled, and stripped anywhere they might sneak in.
  const INACTIVE_DECISION_TYPES = new Set([5, 10]);
  function commitDecisionTypesModal() {
    // Read checkboxes into state, close, refresh button label.
    decisionTypesFilter.clear();
    const modal = document.getElementById('fp-decision-types-modal');
    if (modal) {
      modal.querySelectorAll('.fp-decision-types-list input[type="checkbox"]:checked').forEach(cb => {
        const n = Number(cb.value);
        if (Number.isInteger(n) && n >= 1 && n <= 10 && !INACTIVE_DECISION_TYPES.has(n)) {
          decisionTypesFilter.add(n);
        }
      });
    }
    updateDecisionTypesBtn();
    closeDecisionTypesModal();
  }
  async function suggestDecisionTypes() {
    const btn = document.getElementById('fp-decision-types-suggest');
    const status = document.getElementById('fp-decision-types-status');
    const scope = $('#fp-scope-input').value.trim();
    const desc  = $('#fp-bot-desc').value.trim();
    const url   = $('#fp-bot-url').value.trim();
    const file  = $('#fp-bot-file').files && $('#fp-bot-file').files[0];
    const notes = (state.problemNotes || '').trim();
    if (!scope && !desc && !url && !file && !notes) {
      if (status) {
        status.textContent = 'Fill in a scope, description, URL, or file in the Problem scope section above first — the AI needs something to reason about.';
        status.style.color = '#7a1c1c';
      }
      return;
    }
    const prev = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Thinking…'; }
    if (status) {
      status.textContent = 'Asking Professor Powell to review your context…';
      status.style.color = '#c9621e';
    }
    try {
      const form = new FormData();
      if (scope) form.append('scope', scope);
      if (desc)  form.append('description', desc);
      if (notes) {
        form.append('priorNotes', notes);
      } else {
        if (url)  form.append('url', url);
        if (file) form.append('file', file, file.name);
      }
      if (Array.isArray(state.metrics) && state.metrics.length) {
        form.append('existingMetrics', JSON.stringify(state.metrics));
      }
      if (Array.isArray(state.decisions) && state.decisions.length) {
        form.append('existingDecisions', JSON.stringify(state.decisions));
      }
      const resp = await fetch(SUGGEST_TYPES_ENDPOINT, { method: 'POST', body: form });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      const types = (Array.isArray(data.types) ? data.types : [])
        .map(Number)
        .filter(n => Number.isInteger(n) && n >= 1 && n <= 10 && !INACTIVE_DECISION_TYPES.has(n));
      // Tick the boxes in the modal to match the recommendation. Disabled
      // rows (5, 10) can't be checked programmatically anyway, but skip
      // them explicitly for clarity.
      const modal = document.getElementById('fp-decision-types-modal');
      if (modal) {
        modal.querySelectorAll('.fp-decision-types-list input[type="checkbox"]:not([disabled])').forEach(cb => {
          cb.checked = types.includes(Number(cb.value));
        });
      }
      if (status) {
        const reasoning = String(data.reasoning || '').trim();
        status.textContent = reasoning
          ? 'AI: ' + reasoning + ' — review and adjust if needed.'
          : 'Types checked based on your context — review and adjust if needed.';
        status.style.color = '#345c48';
      }
    } catch (err) {
      console.error('Suggest types failed:', err);
      if (status) {
        status.textContent = 'Sorry — ' + (err && err.message ? err.message : 'request failed') + '. (First request after idle can take ~30 s while the server wakes up.)';
        status.style.color = '#7a1c1c';
      }
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = prev; }
    }
  }
  function decisionTypesSetAll(on) {
    const modal = document.getElementById('fp-decision-types-modal');
    if (!modal) return;
    // Skip disabled types (5 and 10) so "All" doesn't accidentally
    // include them.
    modal.querySelectorAll('.fp-decision-types-list input[type="checkbox"]:not([disabled])').forEach(cb => {
      cb.checked = on;
    });
  }
  // ── Uncertainty-types filter — parallel to the decision one ──
  function updateUncertaintyTypesBtn() {
    const btn = document.getElementById('fp-uncertainty-types-btn');
    if (!btn) return;
    const n = uncertaintyTypesFilter.size;
    btn.textContent = n > 0 ? 'Types… (' + n + ')' : 'Types…';
    btn.classList.toggle('is-active', n > 0);
  }
  function openUncertaintyTypesModal() {
    const modal = document.getElementById('fp-uncertainty-types-modal');
    if (!modal) return;
    modal.querySelectorAll('#fp-uncertainty-types-list input[type="checkbox"]').forEach(cb => {
      cb.checked = uncertaintyTypesFilter.has(Number(cb.value));
    });
    const status = document.getElementById('fp-uncertainty-types-status');
    if (status) { status.textContent = ''; status.style.color = ''; }
    modal.hidden = false;
  }
  function closeUncertaintyTypesModal() {
    const modal = document.getElementById('fp-uncertainty-types-modal');
    if (modal) modal.hidden = true;
  }
  function commitUncertaintyTypesModal() {
    uncertaintyTypesFilter.clear();
    const modal = document.getElementById('fp-uncertainty-types-modal');
    if (modal) {
      modal.querySelectorAll('#fp-uncertainty-types-list input[type="checkbox"]:checked').forEach(cb => {
        const n = Number(cb.value);
        if (Number.isInteger(n) && n >= 1 && n <= 12) uncertaintyTypesFilter.add(n);
      });
    }
    updateUncertaintyTypesBtn();
    closeUncertaintyTypesModal();
  }
  function uncertaintyTypesSetAll(on) {
    const modal = document.getElementById('fp-uncertainty-types-modal');
    if (!modal) return;
    modal.querySelectorAll('#fp-uncertainty-types-list input[type="checkbox"]').forEach(cb => {
      cb.checked = on;
    });
  }
  async function suggestUncertaintyTypes() {
    const btn = document.getElementById('fp-uncertainty-types-suggest');
    const status = document.getElementById('fp-uncertainty-types-status');
    const scope = $('#fp-scope-input').value.trim();
    const desc  = $('#fp-bot-desc').value.trim();
    const url   = $('#fp-bot-url').value.trim();
    const file  = $('#fp-bot-file').files && $('#fp-bot-file').files[0];
    const notes = (state.problemNotes || '').trim();
    if (!scope && !desc && !url && !file && !notes) {
      if (status) {
        status.textContent = 'Fill in a scope, description, URL, or file in the Problem scope section above first — the AI needs something to reason about.';
        status.style.color = '#7a1c1c';
      }
      return;
    }
    const prev = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Thinking…'; }
    if (status) {
      status.textContent = 'Asking Professor Powell to review your context…';
      status.style.color = '#c9621e';
    }
    try {
      const form = new FormData();
      if (scope) form.append('scope', scope);
      if (desc)  form.append('description', desc);
      if (notes) {
        form.append('priorNotes', notes);
      } else {
        if (url)  form.append('url', url);
        if (file) form.append('file', file, file.name);
      }
      if (Array.isArray(state.metrics) && state.metrics.length) {
        form.append('existingMetrics', JSON.stringify(state.metrics));
      }
      if (Array.isArray(state.decisions) && state.decisions.length) {
        form.append('existingDecisions', JSON.stringify(state.decisions));
      }
      if (Array.isArray(state.uncertainties) && state.uncertainties.length) {
        form.append('existingUncertainties', JSON.stringify(state.uncertainties));
      }
      const resp = await fetch(SUGGEST_UNCERTAINTY_TYPES_ENDPOINT, { method: 'POST', body: form });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      const types = (Array.isArray(data.types) ? data.types : [])
        .map(Number)
        .filter(n => Number.isInteger(n) && n >= 1 && n <= 12);
      const modal = document.getElementById('fp-uncertainty-types-modal');
      if (modal) {
        modal.querySelectorAll('#fp-uncertainty-types-list input[type="checkbox"]').forEach(cb => {
          cb.checked = types.includes(Number(cb.value));
        });
      }
      if (status) {
        const reasoning = String(data.reasoning || '').trim();
        status.textContent = reasoning
          ? 'AI: ' + reasoning + ' — review and adjust if needed.'
          : 'Categories checked based on your context — review and adjust if needed.';
        status.style.color = '#345c48';
      }
    } catch (err) {
      console.error('Suggest uncertainty types failed:', err);
      if (status) {
        status.textContent = 'Sorry — ' + (err && err.message ? err.message : 'request failed') + '. (First request after idle can take ~30 s while the server wakes up.)';
        status.style.color = '#7a1c1c';
      }
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = prev; }
    }
  }
  async function openIdeaBox(kind) {
    if (kind !== 'decision' && kind !== 'uncertainty' && kind !== 'metric') return;
    ideasCurrentKind = kind;
    const modal = $('#fp-ideas-modal');
    // Drill-in aware: when the user is inside a sub-decision, both kinds
    // narrow their scope to that context.
    //   - Decisions: propose sub-decisions of the leaf parent (they land in
    //     the leaf sub-frame's decision list).
    //   - Uncertainties: propose uncertainties whose outcomes matter for
    //     the leaf parent's context — but they still land in the ROOT
    //     uncertainty list (uncertainties live once at the top).
    const drilledIn = currentPath.length > 0;
    const mode = ideasMode[kind] || 'gen';
    const modeLabel = mode === 'spec'
      ? '<b>SPECIFIC</b> (concrete members — discrete choices or numeric parameters)'
      : '<b>general</b> (broad categories)';
    if (drilledIn && kind === 'decision') {
      const parent = currentPath[currentPath.length - 1];
      const trail = currentPath.map(p => '"' + p + '"').join(' → ');
      $('#fp-ideas-modal-title').textContent =
        'Idea box — sub-decisions of "' + parent + '"' + (mode === 'spec' ? '  (specific)' : '');
      $('#fp-ideas-modal-lede').innerHTML =
        'AI-proposed <b>sub-decisions</b> of ' + trail +
        ', in ' + modeLabel + ' mode. Check the ones you like, then ' +
        '<b>Add checked</b> to append them to your existing sub-decision list. ' +
        'Re-generate for a fresh set.';
    } else if (drilledIn && kind === 'uncertainty') {
      const parent = currentPath[currentPath.length - 1];
      const trail = currentPath.map(p => '"' + p + '"').join(' → ');
      $('#fp-ideas-modal-title').textContent =
        'Idea box — uncertainties affecting "' + parent + '"' + (mode === 'spec' ? '  (specific)' : '');
      $('#fp-ideas-modal-lede').innerHTML =
        'AI-proposed <b>uncertainties</b> whose outcomes matter for ' + trail +
        ', in ' + modeLabel + ' mode. Uncertainties live once at the root — ' +
        'checked items are appended to your <b>root</b> uncertainty list. ' +
        'Re-generate for a fresh set.';
    } else if (kind === 'metric') {
      $('#fp-ideas-modal-title').textContent = 'Idea box — metrics';
      $('#fp-ideas-modal-lede').innerHTML =
        'AI-proposed <b>metrics</b> from your <b>Problem scope</b> above. ' +
        'Metrics are measurable outcomes (not decisions or policies). ' +
        'Check the ones you like, then <b>Add checked</b> to append them to ' +
        'your metrics list. Re-generate for a fresh set.';
    } else {
      $('#fp-ideas-modal-title').textContent = 'Idea box — ' +
        (kind === 'decision' ? 'decisions' : 'uncertainties') +
        (mode === 'spec' ? '  (specific)' : '');
      $('#fp-ideas-modal-lede').innerHTML =
        'AI-proposed ' + (kind === 'decision' ? 'decisions' : 'uncertainties') +
        ' from your <b>Problem scope</b> above, in ' + modeLabel + ' mode. ' +
        'Check the ones you like, then <b>Add checked</b> to append them to ' +
        'your existing list. Re-generate for a fresh set.';
    }
    $('#fp-ideas-list').innerHTML = '';
    $('#fp-ideas-status').textContent = '';
    modal.hidden = false;
    await runIdeasFetch();
  }
  async function runIdeasFetch() {
    if (!ideasCurrentKind) return;
    const scope = $('#fp-scope-input').value.trim();
    const desc  = $('#fp-bot-desc').value.trim();
    const url   = $('#fp-bot-url').value.trim();
    const file  = $('#fp-bot-file').files && $('#fp-bot-file').files[0];
    const size  = $('#fp-bot-size').value || 'medium';
    const notes = (state.problemNotes || '').trim();
    if (!scope && !desc && !url && !file && !notes) {
      $('#fp-ideas-status').textContent =
        'Fill in a scope, description, URL, or file in the Problem scope section above first — the AI needs something to work from. (Or click "Read introductory materials" to ingest them once.)';
      $('#fp-ideas-status').style.color = '#7a1c1c';
      return;
    }
    $('#fp-ideas-list').innerHTML =
      '<div class="fp-ideas-empty">Generating ideas… (first request after idle can take ~30 s while the server wakes up)</div>';
    // Nudge the user if there are no metrics yet — decisions and uncertainties
    // are supposed to be evaluated against metrics, so the ideas will be
    // sharper if metrics are on screen first. Non-blocking. Skip for
    // kind='metric' — the whole point of that call is to fill metrics.
    if (ideasCurrentKind !== 'metric' &&
        (!Array.isArray(state.metrics) || state.metrics.length === 0)) {
      $('#fp-ideas-status').textContent =
        'Tip: no metrics on screen. Ideas are usually sharper if you add metrics (or use "First draft (AI)" on the Priority pyramid) first.';
      $('#fp-ideas-status').style.color = '#7a5a1c';
    } else {
      $('#fp-ideas-status').textContent = '';
    }
    $('#fp-ideas-add').disabled = true;
    $('#fp-ideas-regenerate').disabled = true;
    try {
      const form = new FormData();
      form.append('kind', ideasCurrentKind);
      // Generation mode: 'gen' (broad categories, default) or 'spec'
      // (enumerate concrete members / numeric parameters, skip the
      // categorical layer). Server branches the closing prompt on this.
      form.append('mode', ideasMode[ideasCurrentKind] || 'gen');
      // Optional per-header count override — user typed a number in the
      // small "count" box next to the mode toggle. Blank = server uses
      // the size-based default. Range 1..200 to keep output tokens sane.
      const countInput = document.querySelector('.fp-ideas-count[data-kind="' + ideasCurrentKind + '"]');
      const rawCount = countInput ? parseInt(countInput.value, 10) : NaN;
      if (Number.isFinite(rawCount) && rawCount >= 1 && rawCount <= 200) {
        form.append('countOverride', String(rawCount));
      }
      // Decision-type filter (decisions only) — session-only picker.
      if (ideasCurrentKind === 'decision' && decisionTypesFilter.size > 0) {
        const nums = Array.from(decisionTypesFilter).sort((a, b) => a - b);
        form.append('decisionTypes', JSON.stringify(nums));
      }
      // Uncertainty-category filter (uncertainties only) — session-only.
      if (ideasCurrentKind === 'uncertainty' && uncertaintyTypesFilter.size > 0) {
        const nums = Array.from(uncertaintyTypesFilter).sort((a, b) => a - b);
        form.append('uncertaintyTypes', JSON.stringify(nums));
      }
      // Time step + horizon — sent so the AI can classify stat/dyn per idea
      // in the right temporal frame (weekly time step vs annual horizon
      // yields different stat/dyn recommendations than daily/lifetime).
      const ts = state.timeStep || {};
      const hz = state.horizon  || {};
      if (ts.value && ts.unit) {
        form.append('timeStep', ts.value + ' ' + ts.unit);
      }
      if (hz.value && hz.unit) {
        form.append('horizon', hz.value + ' ' + hz.unit);
      }
      if (scope) form.append('scope', scope);
      if (desc)  form.append('description', desc);
      // Ingested notes replace the raw url/file for downstream calls.
      if (notes) {
        form.append('priorNotes', notes);
      } else {
        if (url)  form.append('url', url);
        if (file) form.append('file', file, file.name);
      }
      form.append('size', size);
      // Drill-in ancestry — both kinds narrow to the current sub-decision
      // context when drilled in. Decisions land in the leaf sub-frame's
      // list; uncertainties land in the ROOT list but are biased toward
      // the leaf parent's context.
      const drilledIn = currentPath.length > 0;
      const leafFrame = drilledIn ? currentFrame() : null;
      if (drilledIn) {
        form.append('parentPath', JSON.stringify(currentPath));
        const subScope = (leafFrame && typeof leafFrame.scope === 'string')
          ? leafFrame.scope.trim() : '';
        if (subScope) form.append('subScope', subScope);
      }
      if (Array.isArray(state.metrics) && state.metrics.length) {
        form.append('existingMetrics', JSON.stringify(state.metrics));
      }
      // For decisions: send THIS level's decision list (root or sub-frame)
      // as anti-dup. For uncertainties: always send ROOT decisions for
      // context, and if drilled in also send the sub-frame's decisions as
      // extra context (they concretely describe what "leaf parent" contains).
      if (ideasCurrentKind === 'decision') {
        const decisionSourceFrame = leafFrame || state;
        if (Array.isArray(decisionSourceFrame.decisions) && decisionSourceFrame.decisions.length) {
          form.append('existingDecisions', JSON.stringify(decisionSourceFrame.decisions));
        }
      } else {
        if (Array.isArray(state.decisions) && state.decisions.length) {
          form.append('existingDecisions', JSON.stringify(state.decisions));
        }
        if (drilledIn && leafFrame && Array.isArray(leafFrame.decisions) && leafFrame.decisions.length) {
          form.append('subDecisions', JSON.stringify(leafFrame.decisions));
        }
      }
      if (Array.isArray(state.uncertainties) && state.uncertainties.length) {
        form.append('existingUncertainties', JSON.stringify(state.uncertainties));
      }
      const resp = await fetch(IDEAS_ENDPOINT, { method: 'POST', body: form });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      if (!Array.isArray(data.ideas)) throw new Error('Server returned no ideas.');
      renderIdeasList(data.ideas);
    } catch (err) {
      console.error('Ideas fetch failed:', err);
      $('#fp-ideas-list').innerHTML = '';
      $('#fp-ideas-status').textContent = 'Sorry — ' +
        ((err && err.message) ? err.message : 'request failed') + '. Try Regenerate.';
      $('#fp-ideas-status').style.color = '#7a1c1c';
    } finally {
      $('#fp-ideas-regenerate').disabled = false;
    }
  }
  // Normalize a server-returned idea into { name, kind } — accepts either
  // a plain string (legacy) or a {name, kind} object. Kind is only set
  // for decision ideas (gen/spec/num); uncertainties come back kindless.
  function normalizeIdea(raw) {
    if (typeof raw === 'string') return { name: raw.trim(), kind: null, timing: null };
    if (raw && typeof raw === 'object') {
      const name = String(raw.name || '').trim();
      let k = String(raw.kind || '').toLowerCase();
      if (k === 'spec') k = 'disc';   // legacy alias
      const kind = (k === 'gen' || k === 'disc' || k === 'num') ? k : null;
      const t = String(raw.timing || '').toLowerCase();
      const timing = (t === 'stat' || t === 'dyn') ? t : null;
      return { name, kind, timing };
    }
    return { name: '', kind: null, timing: null };
  }
  function renderIdeasList(ideas) {
    const list = $('#fp-ideas-list');
    list.innerHTML = '';
    if (!ideas.length) {
      list.innerHTML = '<div class="fp-ideas-empty">No new ideas came back. Try Regenerate.</div>';
      $('#fp-ideas-add').disabled = true;
      return;
    }
    ideas.forEach((raw, i) => {
      const idea = normalizeIdea(raw);
      if (!idea.name) return;
      const row = document.createElement('div');
      row.className = 'fp-ideas-row';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = 'fp-idea-cb-' + i;
      cb.checked = true;
      cb.value = idea.name;
      // Stash the AI's classification on the checkbox so ideasApply()
      // can pick it up without re-parsing. Both decisions AND
      // uncertainties can carry these now.
      if (idea.kind)   cb.dataset.ideaKind   = idea.kind;
      if (idea.timing) cb.dataset.ideaTiming = idea.timing;
      const label = document.createElement('label');
      label.htmlFor = cb.id;
      label.textContent = idea.name;
      row.appendChild(cb);
      row.appendChild(label);
      // Read-only chips next to the row so the user sees the AI's
      // classification before checking. Matches the matrix chips.
      if (idea.kind) {
        const chip = document.createElement('span');
        chip.className = 'fp-decision-kind-chip fp-decision-kind-' + idea.kind;
        chip.textContent = '(' + idea.kind + ')';
        chip.style.cursor = 'default';
        row.appendChild(chip);
      }
      if (idea.timing) {
        const chip = document.createElement('span');
        chip.className = 'fp-timing-chip fp-timing-' + idea.timing;
        chip.textContent = '(' + idea.timing + ')';
        chip.style.cursor = 'default';
        row.appendChild(chip);
      }
      // Clicking the row (not just the checkbox) toggles the checkbox.
      row.addEventListener('click', (e) => {
        if (e.target === cb || e.target === label) return;
        cb.checked = !cb.checked;
      });
      list.appendChild(row);
    });
    $('#fp-ideas-add').disabled = false;
  }
  function ideasSelectAll(on) {
    const list = $('#fp-ideas-list');
    list.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = on; });
  }
  function ideasApply() {
    if (!ideasCurrentKind) return;
    const list = $('#fp-ideas-list');
    // Collect picked ideas along with their AI-tagged kind (if any).
    const picked = [];
    list.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
      const v = String(cb.value || '').trim();
      if (!v) return;
      const k = cb.dataset.ideaKind || null;
      const t = cb.dataset.ideaTiming || null;
      picked.push({ name: v, kind: k, timing: t });
    });
    if (!picked.length) {
      $('#fp-ideas-status').textContent = 'Nothing checked — pick at least one, or Cancel.';
      $('#fp-ideas-status').style.color = '#7a1c1c';
      return;
    }
    // Metrics: no matrix, no decisionKinds map — route straight into
    // state.metrics via the standard textarea path so the pyramid picks
    // them up the same way as if the user typed the lines themselves.
    if (ideasCurrentKind === 'metric') {
      const existing = Array.isArray(state.metrics) ? state.metrics.slice() : [];
      const existingSet = new Set(existing.map(s => s.trim().toLowerCase()));
      let added = 0;
      for (const p of picked) {
        if (!existingSet.has(p.name.toLowerCase())) {
          existing.push(p.name);
          existingSet.add(p.name.toLowerCase());
          added++;
        }
      }
      $('#fp-metrics-input').value = existing.join('\n');
      syncMetricsFromTextarea();
      $('#fp-ideas-modal').hidden = true;
      flashStatus('Added ' + added + ' metric' + (added === 1 ? '' : 's') + '.');
      return;
    }
    const cfg = MATRIX[ideasCurrentKind];
    const frame = frameFor(ideasCurrentKind);
    // Union with the existing list to avoid duplicates (case-insensitive).
    const existing = (frame[cfg.listKey] || []).slice();
    const existingSet = new Set(existing.map(s => s.trim().toLowerCase()));
    const newlyAdded = [];
    for (const p of picked) {
      if (!existingSet.has(p.name.toLowerCase())) {
        existing.push(p.name);
        newlyAdded.push(p);
      }
    }
    // Uncertainties are flat at the root, but each carries a scope tag
    // recording the drill path at generation time so users can see
    // whether a given uncertainty was proposed for the whole framing or
    // for a specific sub-decision. Root-generated ones stay unscoped.
    if (ideasCurrentKind === 'uncertainty' && currentPath.length > 0 && newlyAdded.length) {
      if (!state.uncertaintyScopes) state.uncertaintyScopes = {};
      const scopePath = currentPath.slice();
      for (const p of newlyAdded) state.uncertaintyScopes[p.name] = scopePath;
    }
    // Route through the textarea so the standard sync logic (rename
    // detection, matrix pruning) fires the same as if the user typed
    // the new lines themselves.
    $(cfg.textareaSel).value = existing.join('\n');
    syncListFromTextarea(ideasCurrentKind);
    // Persist the AI's classification (kind + timing) on the freshly-added
    // items. Do this AFTER the sync so the target maps are in known state.
    if (newlyAdded.length) {
      if (ideasCurrentKind === 'decision') {
        if (!frame.decisionKinds || typeof frame.decisionKinds !== 'object') frame.decisionKinds = {};
        if (!frame.decisionTimings || typeof frame.decisionTimings !== 'object') frame.decisionTimings = {};
        for (const p of newlyAdded) {
          if (p.kind === 'disc' || p.kind === 'num') frame.decisionKinds[p.name] = p.kind;
          else delete frame.decisionKinds[p.name];    // 'gen' is default, keep sparse
          if (p.timing === 'stat') frame.decisionTimings[p.name] = 'stat';
          else delete frame.decisionTimings[p.name];  // 'dyn' is default
        }
        renderImpactMatrix('decision');
      } else {
        // Uncertainty: kind + timing go on state.uncertaintyKinds /
        // state.uncertaintyTimings (uncertainties are root-only).
        if (!state.uncertaintyKinds || typeof state.uncertaintyKinds !== 'object') state.uncertaintyKinds = {};
        if (!state.uncertaintyTimings || typeof state.uncertaintyTimings !== 'object') state.uncertaintyTimings = {};
        for (const p of newlyAdded) {
          if (p.kind === 'disc' || p.kind === 'num') state.uncertaintyKinds[p.name] = p.kind;
          else delete state.uncertaintyKinds[p.name];
          if (p.timing === 'stat') state.uncertaintyTimings[p.name] = 'stat';
          else delete state.uncertaintyTimings[p.name];
        }
        renderImpactMatrix('uncertainty');
      }
    }
    $('#fp-ideas-modal').hidden = true;
    flashStatus('Added ' + picked.length + ' idea' + (picked.length === 1 ? '' : 's') + '.');
  }

  // ── Play modal — discrete-choice simulator ─────────────────────
  // First problem class: a (disc) decision whose realized performance
  // W_{t+1,i} is uncertain; the human plays policy by clicking a bar
  // in the chart. In our notation:
  //   x ∈ 𝒳^{choices}, W_{t+1,i} per information class i (one per
  //   metric here), scored by C_m(S_t, x_t, W_{t+1}).
  // Config lives in the CURRENT frame's playConfigs[decisionName].
  // Persistence rides with the frame — save/load/URL-share all carry
  // it along.
  let playCurrentDecision = null;   // decision name currently open in the modal

  function playFrame() { return currentFrame(); }
  function playEnsureConfig(name) {
    const frame = playFrame();
    if (!frame.playConfigs) frame.playConfigs = {};
    if (!frame.playConfigs[name]) {
      frame.playConfigs[name] = { alternatives: [], mode: 'repeated', spreads: {}, history: [] };
    }
    return frame.playConfigs[name];
  }
  function openPlayModal(decisionName) {
    playCurrentDecision = decisionName;
    playEnsureConfig(decisionName);
    $('#fp-play-title').textContent = 'Play decision: ' + decisionName;
    $('#fp-play-status').textContent = '';
    playRender();
    $('#fp-play-modal').hidden = false;
  }
  function closePlayModal() {
    $('#fp-play-modal').hidden = true;
    playCurrentDecision = null;
  }
  // Pull the metrics list from the top-level state — the metrics live
  // on the root frame regardless of drill depth.
  function playMetrics() {
    return Array.isArray(state.metrics) ? state.metrics.filter(m => typeof m === 'string' && m.trim()) : [];
  }
  function playRender() {
    if (!playCurrentDecision) return;
    const cfg = playEnsureConfig(playCurrentDecision);
    // Mode selector
    $('#fp-play-mode').value = cfg.mode === 'one-shot' ? 'one-shot' : 'repeated';
    playRenderAlts(cfg);
    playRenderSpreads(cfg);
    playRenderCharts(cfg);
    playRenderHistory(cfg);
    playRenderRoundBadge(cfg);
  }
  function playRenderAlts(cfg) {
    const wrap = $('#fp-play-alts');
    wrap.innerHTML = '';
    if (!cfg.alternatives.length) {
      const em = document.createElement('span');
      em.className = 'fp-muted';
      em.textContent = 'No alternatives yet — add some below.';
      wrap.appendChild(em);
      return;
    }
    cfg.alternatives.forEach((alt, idx) => {
      const chip = document.createElement('span');
      chip.className = 'fp-play-alt-chip';
      chip.appendChild(document.createTextNode(alt));
      const x = document.createElement('button');
      x.type = 'button';
      x.textContent = '×';
      x.title = 'Remove ' + alt;
      x.addEventListener('click', () => {
        cfg.alternatives.splice(idx, 1);
        // Prune spreads + history rows referring to this alt
        for (const m of Object.keys(cfg.spreads || {})) {
          if (cfg.spreads[m] && cfg.spreads[m][alt]) delete cfg.spreads[m][alt];
        }
        cfg.history = cfg.history.filter(h => h.alt !== alt);
        autoSave();
        playRender();
      });
      chip.appendChild(x);
      wrap.appendChild(chip);
    });
  }
  function playAddAlt() {
    const input = $('#fp-play-alt-new');
    const raw = (input.value || '').trim();
    if (!raw) return;
    const cfg = playEnsureConfig(playCurrentDecision);
    if (cfg.alternatives.indexOf(raw) >= 0) {
      $('#fp-play-status').textContent = 'Duplicate alternative: "' + raw + '"';
      return;
    }
    cfg.alternatives.push(raw);
    input.value = '';
    $('#fp-play-status').textContent = '';
    autoSave();
    playRender();
    input.focus();
  }
  function playRenderSpreads(cfg) {
    const wrap = $('#fp-play-spreads-wrap');
    wrap.innerHTML = '';
    const metrics = playMetrics();
    if (!cfg.alternatives.length || !metrics.length) {
      const p = document.createElement('p');
      p.className = 'fp-muted';
      p.textContent = !cfg.alternatives.length
        ? 'Add at least one alternative to begin filling in spreads.'
        : 'Add at least one metric to the pyramid so the play can score outcomes.';
      wrap.appendChild(p);
      return;
    }
    for (const metric of metrics) {
      const block = document.createElement('div');
      block.className = 'fp-play-spread-block';
      const h = document.createElement('div');
      h.className = 'fp-play-spread-metric';
      h.textContent = metric;
      block.appendChild(h);
      const table = document.createElement('table');
      table.className = 'fp-play-spread-table';
      const thead = document.createElement('thead');
      thead.innerHTML = '<tr><th>Alternative</th><th>p10</th><th>p50</th><th>p90</th></tr>';
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      cfg.alternatives.forEach(alt => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = alt;
        th.title = alt;
        tr.appendChild(th);
        const stored = (cfg.spreads[metric] || {})[alt] || ['', '', ''];
        for (let i = 0; i < 3; i++) {
          const td = document.createElement('td');
          const inp = document.createElement('input');
          inp.type = 'number';
          inp.step = 'any';
          inp.value = stored[i] === '' || stored[i] == null ? '' : String(stored[i]);
          inp.addEventListener('input', () => {
            playSetSpread(metric, alt, i, inp.value);
          });
          inp.addEventListener('change', () => {
            // On blur, validate monotone p10 <= p50 <= p90 and hint via :invalid
            playValidateSpread(metric, alt, inp);
            playRenderCharts(cfg);
          });
          td.appendChild(inp);
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      block.appendChild(table);
      wrap.appendChild(block);
    }
  }
  function playSetSpread(metric, alt, idx, value) {
    const cfg = playEnsureConfig(playCurrentDecision);
    if (!cfg.spreads[metric]) cfg.spreads[metric] = {};
    if (!cfg.spreads[metric][alt]) cfg.spreads[metric][alt] = ['', '', ''];
    cfg.spreads[metric][alt][idx] = (value === '' || value == null) ? '' : Number(value);
    autoSave();
    // Skip full re-render on every keystroke — charts update on 'change'.
  }
  function playValidateSpread(metric, alt, inputEl) {
    const cfg = playEnsureConfig(playCurrentDecision);
    const row = (cfg.spreads[metric] || {})[alt];
    if (!row) return;
    const [p10, p50, p90] = row;
    // Only mark invalid if we have all three AND they're out of order.
    const allSet = [p10, p50, p90].every(v => v !== '' && Number.isFinite(Number(v)));
    if (!allSet) { inputEl.setCustomValidity(''); return; }
    if (!(Number(p10) <= Number(p50) && Number(p50) <= Number(p90))) {
      inputEl.setCustomValidity('p10 ≤ p50 ≤ p90');
    } else {
      inputEl.setCustomValidity('');
    }
  }
  // Piecewise-linear CDF through the three quantiles, with symmetric-width
  // tails extended below p10 and above p90 (so samples are bounded but can
  // exceed the given percentiles). Draws u ~ U[0,1] and inverts.
  function sampleFromQuantiles(p10, p50, p90) {
    const u = Math.random();
    const lower = Math.max(p50 - p10, 1e-9);
    const upper = Math.max(p90 - p50, 1e-9);
    if (u < 0.1) return p10 - lower + (u / 0.1) * lower;
    if (u < 0.5) return p10 + ((u - 0.1) / 0.4) * (p50 - p10);
    if (u < 0.9) return p50 + ((u - 0.5) / 0.4) * (p90 - p50);
    return p90 + ((u - 0.9) / 0.1) * upper;
  }
  function playSpreadComplete(cfg) {
    // A metric is playable iff every alternative has a complete, monotone spread.
    const metrics = playMetrics();
    const usable = [];
    for (const m of metrics) {
      const row = cfg.spreads[m] || {};
      let ok = cfg.alternatives.length > 0;
      for (const alt of cfg.alternatives) {
        const q = row[alt];
        if (!q || q.length !== 3) { ok = false; break; }
        const [a, b, c] = q.map(Number);
        if (![a, b, c].every(Number.isFinite)) { ok = false; break; }
        if (!(a <= b && b <= c)) { ok = false; break; }
      }
      if (ok) usable.push(m);
    }
    return usable;
  }
  function playRenderRoundBadge(cfg) {
    const badge = $('#fp-play-round-badge');
    if (cfg.mode === 'one-shot') {
      badge.textContent = cfg.history.length ? 'one-shot: done' : 'one-shot';
    } else {
      const nextT = cfg.history.length + 1;
      badge.textContent = 't = ' + nextT;
    }
  }
  function playRenderCharts(cfg) {
    const wrap = $('#fp-play-charts');
    wrap.innerHTML = '';
    const usable = playSpreadComplete(cfg);
    const oneShotDone = (cfg.mode === 'one-shot' && cfg.history.length > 0);
    if (!usable.length) {
      $('#fp-play-instruction').textContent = 'Fill in p10 / p50 / p90 for every alternative in at least one metric to see the chart.';
      return;
    }
    $('#fp-play-instruction').textContent = oneShotDone
      ? 'One-shot done. Click Reset play to start over, or switch to Repeated mode.'
      : 'Click a bar to pick that alternative and reveal a random draw.';
    for (const metric of usable) {
      const block = document.createElement('div');
      block.className = 'fp-play-chart';
      const title = document.createElement('div');
      title.className = 'fp-play-chart-title';
      title.textContent = metric;
      block.appendChild(title);
      block.appendChild(playBuildChartSvg(cfg, metric, oneShotDone));
      wrap.appendChild(block);
    }
  }
  function playBuildChartSvg(cfg, metric, disabled) {
    const alts = cfg.alternatives;
    const row = cfg.spreads[metric];
    // Collect the extended [p10 - lower, p90 + upper] range for auto-scaling
    let lo = Infinity, hi = -Infinity;
    for (const alt of alts) {
      const [p10, p50, p90] = row[alt].map(Number);
      const lower = p50 - p10, upper = p90 - p50;
      lo = Math.min(lo, p10 - lower);
      hi = Math.max(hi, p90 + upper);
    }
    // Pad slightly; anchor baseline at zero if the range crosses it, else at lo.
    const rangePad = Math.max((hi - lo) * 0.06, 1e-6);
    let yMin = lo - rangePad;
    let yMax = hi + rangePad;
    if (yMin > 0 && yMin < (yMax - yMin) * 0.25) yMin = 0;  // baseline at 0 when close
    const W = 560, H = 220;
    const padL = 44, padR = 12, padT = 10, padB = 44;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    function y(v) { return padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH; }
    // Y axis
    const axisLine = document.createElementNS(svgNS, 'line');
    axisLine.setAttribute('x1', padL); axisLine.setAttribute('x2', padL);
    axisLine.setAttribute('y1', padT); axisLine.setAttribute('y2', padT + plotH);
    axisLine.setAttribute('class', 'fp-play-axis');
    svg.appendChild(axisLine);
    // Y ticks: 5 evenly spaced values
    for (let i = 0; i <= 4; i++) {
      const v = yMin + (yMax - yMin) * (i / 4);
      const yy = y(v);
      const tick = document.createElementNS(svgNS, 'line');
      tick.setAttribute('x1', padL - 4); tick.setAttribute('x2', padL);
      tick.setAttribute('y1', yy); tick.setAttribute('y2', yy);
      tick.setAttribute('class', 'fp-play-axis');
      svg.appendChild(tick);
      const lbl = document.createElementNS(svgNS, 'text');
      lbl.setAttribute('x', padL - 6); lbl.setAttribute('y', yy + 3);
      lbl.setAttribute('text-anchor', 'end');
      lbl.setAttribute('class', 'fp-play-axis-label');
      lbl.textContent = playFormatNum(v);
      svg.appendChild(lbl);
    }
    // X axis (baseline)
    const baselineV = Math.max(yMin, Math.min(0, yMax));  // if range crosses 0, put axis at 0, else at yMin
    const baselineY = y(yMin);
    const xAxisLine = document.createElementNS(svgNS, 'line');
    xAxisLine.setAttribute('x1', padL); xAxisLine.setAttribute('x2', padL + plotW);
    xAxisLine.setAttribute('y1', baselineY); xAxisLine.setAttribute('y2', baselineY);
    xAxisLine.setAttribute('class', 'fp-play-axis');
    svg.appendChild(xAxisLine);
    // Bars — one per alternative
    const nAlts = alts.length;
    const slotW = plotW / nAlts;
    const barW = Math.min(slotW * 0.55, 60);
    alts.forEach((alt, idx) => {
      const cx = padL + slotW * (idx + 0.5);
      const [p10, p50, p90] = row[alt].map(Number);
      const barTopY = y(p50);
      const bar = document.createElementNS(svgNS, 'rect');
      bar.setAttribute('x', cx - barW / 2);
      bar.setAttribute('y', barTopY);
      bar.setAttribute('width', barW);
      bar.setAttribute('height', Math.max(0, baselineY - barTopY));
      bar.setAttribute('class', 'fp-play-bar' + (disabled ? ' fp-play-bar-disabled' : ''));
      bar.setAttribute('data-alt', alt);
      if (!disabled) {
        bar.addEventListener('click', () => playPick(alt));
      }
      const t = document.createElementNS(svgNS, 'title');
      t.textContent = alt + '  •  p10 ' + playFormatNum(p10) + ' / p50 ' + playFormatNum(p50) + ' / p90 ' + playFormatNum(p90);
      bar.appendChild(t);
      svg.appendChild(bar);
      // Whisker (p10 → p90) centered on cx
      const wh = document.createElementNS(svgNS, 'line');
      wh.setAttribute('x1', cx); wh.setAttribute('x2', cx);
      wh.setAttribute('y1', y(p10)); wh.setAttribute('y2', y(p90));
      wh.setAttribute('class', 'fp-play-whisker');
      svg.appendChild(wh);
      // Whisker caps
      const capW = 8;
      for (const q of [p10, p90]) {
        const cap = document.createElementNS(svgNS, 'line');
        cap.setAttribute('x1', cx - capW / 2); cap.setAttribute('x2', cx + capW / 2);
        cap.setAttribute('y1', y(q)); cap.setAttribute('y2', y(q));
        cap.setAttribute('class', 'fp-play-whisker');
        svg.appendChild(cap);
      }
      // Median tick across the top of the bar
      const med = document.createElementNS(svgNS, 'line');
      med.setAttribute('x1', cx - barW / 2 - 2); med.setAttribute('x2', cx + barW / 2 + 2);
      med.setAttribute('y1', barTopY); med.setAttribute('y2', barTopY);
      med.setAttribute('class', 'fp-play-median');
      svg.appendChild(med);
      // Realized-draw marker(s) from history for this alt + metric
      const draws = cfg.history.filter(h => h.alt === alt && Number.isFinite(h.samples[metric]));
      for (const h of draws) {
        const yy = y(h.samples[metric]);
        const dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('cx', cx);
        dot.setAttribute('cy', yy);
        dot.setAttribute('r', 3.5);
        dot.setAttribute('class', 'fp-play-realized');
        const tt = document.createElementNS(svgNS, 'title');
        tt.textContent = 't=' + h.t + ' realized: ' + playFormatNum(h.samples[metric]);
        dot.appendChild(tt);
        svg.appendChild(dot);
      }
      // Alt label
      const lbl = document.createElementNS(svgNS, 'text');
      lbl.setAttribute('x', cx);
      lbl.setAttribute('y', H - 22);
      lbl.setAttribute('class', 'fp-play-alt-label');
      lbl.textContent = alt.length > 14 ? (alt.slice(0, 12) + '…') : alt;
      const lblTitle = document.createElementNS(svgNS, 'title');
      lblTitle.textContent = alt;
      lbl.appendChild(lblTitle);
      svg.appendChild(lbl);
    });
    return svg;
  }
  function playFormatNum(v) {
    if (!Number.isFinite(v)) return '';
    const av = Math.abs(v);
    if (av >= 1000) return v.toFixed(0);
    if (av >= 100)  return v.toFixed(1);
    if (av >= 1)    return v.toFixed(2);
    return v.toPrecision(3);
  }
  function playPick(alt) {
    const cfg = playEnsureConfig(playCurrentDecision);
    if (cfg.mode === 'one-shot' && cfg.history.length > 0) return;
    const usable = playSpreadComplete(cfg);
    const samples = {};
    for (const m of usable) {
      const [p10, p50, p90] = cfg.spreads[m][alt].map(Number);
      samples[m] = sampleFromQuantiles(p10, p50, p90);
    }
    const nextT = cfg.history.length + 1;
    cfg.history.push({ t: nextT, alt, samples });
    autoSave();
    playRender();
    // Small callout
    const pretty = usable.map(m => m + ': ' + playFormatNum(samples[m])).join('  •  ');
    $('#fp-play-status').textContent = 't = ' + nextT + ' — picked "' + alt + '"' + (pretty ? '  →  ' + pretty : '');
  }
  function playReset() {
    const cfg = playEnsureConfig(playCurrentDecision);
    if (!cfg.history.length) return;
    if (!confirm('Clear the pick history and restart at t = 1?')) return;
    cfg.history = [];
    autoSave();
    playRender();
    $('#fp-play-status').textContent = 'Play reset.';
  }
  function playRenderHistory(cfg) {
    const wrap = $('#fp-play-history');
    wrap.innerHTML = '';
    if (!cfg.history.length) {
      const p = document.createElement('p');
      p.className = 'fp-muted';
      p.textContent = 'No picks yet.';
      wrap.appendChild(p);
      return;
    }
    for (const h of cfg.history) {
      const row = document.createElement('div');
      row.className = 'fp-play-history-row';
      const tSpan = document.createElement('span');
      tSpan.className = 'fp-play-history-t';
      tSpan.textContent = 't = ' + h.t;
      row.appendChild(tSpan);
      const altSpan = document.createElement('span');
      altSpan.className = 'fp-play-history-alt';
      altSpan.textContent = h.alt;
      row.appendChild(altSpan);
      const parts = Object.keys(h.samples).map(m => m + ': ' + playFormatNum(h.samples[m]));
      if (parts.length) {
        const sep = document.createTextNode('  →  ');
        row.appendChild(sep);
        const s = document.createElement('span');
        s.className = 'fp-play-history-sample';
        s.textContent = parts.join('  •  ');
        row.appendChild(s);
      }
      wrap.appendChild(row);
    }
  }
  function playClearSpreads() {
    const cfg = playEnsureConfig(playCurrentDecision);
    if (!Object.keys(cfg.spreads).length) return;
    if (!confirm('Clear every p10 / p50 / p90 value for this decision?')) return;
    cfg.spreads = {};
    autoSave();
    playRender();
    $('#fp-play-status').textContent = 'Spreads cleared.';
  }
  async function playSuggestSpreads() {
    const cfg = playEnsureConfig(playCurrentDecision);
    const metrics = playMetrics();
    if (!cfg.alternatives.length) {
      $('#fp-play-status').textContent = 'Add alternatives first.';
      return;
    }
    if (!metrics.length) {
      $('#fp-play-status').textContent = 'Add metrics to the pyramid first.';
      return;
    }
    const btn = $('#fp-play-suggest');
    btn.disabled = true;
    $('#fp-play-status').textContent = 'Asking the AI for plausible spreads…';
    try {
      const res = await fetch(CHATBOT_BASE + '/framing/play-spreads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision: playCurrentDecision,
          alternatives: cfg.alternatives,
          metrics,
          scope: state.scope || '',
          problemDescription: state.problemDescription || '',
          problemNotes: state.problemNotes || '',
        }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const proposed = data && data.spreads;
      if (!proposed || typeof proposed !== 'object') throw new Error('malformed response');
      let filled = 0;
      for (const m of Object.keys(proposed)) {
        if (metrics.indexOf(m) < 0) continue;
        const rowIn = proposed[m];
        if (!rowIn || typeof rowIn !== 'object') continue;
        if (!cfg.spreads[m]) cfg.spreads[m] = {};
        for (const alt of Object.keys(rowIn)) {
          if (cfg.alternatives.indexOf(alt) < 0) continue;
          const q = rowIn[alt];
          if (!Array.isArray(q) || q.length !== 3) continue;
          const nums = q.map(Number);
          if (!nums.every(Number.isFinite)) continue;
          if (!(nums[0] <= nums[1] && nums[1] <= nums[2])) continue;
          cfg.spreads[m][alt] = nums;
          filled++;
        }
      }
      autoSave();
      playRender();
      $('#fp-play-status').textContent = filled
        ? ('Filled ' + filled + ' spread' + (filled === 1 ? '' : 's') + '.')
        : 'AI returned no usable spreads — check monotone p10 ≤ p50 ≤ p90.';
    } catch (err) {
      $('#fp-play-status').textContent = 'Suggest failed: ' + (err && err.message ? err.message : err);
    } finally {
      btn.disabled = false;
    }
  }

  function resetPyramid() {
    if (!state.metrics || state.metrics.length === 0) return;
    if (!confirm('Clear every metric and empty the pyramid? Decisions, uncertainties, and both matrices are not touched (but matrix column headers will disappear until you add metrics again).')) return;
    state.metrics = [];
    state.assignments = {};
    state.chipColors = {};
    $('#fp-metrics-input').value = '';
    // Matrix cells referencing gone-metrics get pruned by syncMetricsFromTextarea's
    // downstream logic — but easier to just clear the metric columns here
    // and let renderAllMatrices show the empty-columns state.
    render();
    renderAllMatrices();
    hidePyramidAiNote();
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

  // The Copy URL button (snapshot-encoded ?p= URL) was retired 2026-09-08
  // in favor of the server-backed library's clean Share URLs. The URL_PARAM
  // decoder in load() is kept so any snapshot URLs already in the wild
  // (emailed to colleagues before the retirement) still open correctly.
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
  const FRAMING_URL = CHATBOT_BASE + '/framing';
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
      problemDescription: (typeof f.problemDescription === 'string') ? f.problemDescription : '',
      problemUrl:         (typeof f.problemUrl === 'string')         ? f.problemUrl         : '',
      timeStep:           normalizeTimeSpec(f.timeStep),
      horizon:            normalizeTimeSpec(f.horizon, true),
      problemNotes:       (typeof f.problemNotes === 'string')       ? f.problemNotes       : '',
      problemNotesSource: (typeof f.problemNotesSource === 'string') ? f.problemNotesSource : '',
      metrics,
      assignments,
      chipColors:  (f.chipColors && typeof f.chipColors === 'object') ? f.chipColors : {},
      decisions,
      matrix:      norm(f.matrix, decisions),
      decisionKinds:   normalizeDecisionKinds(f.decisionKinds),
      decisionTimings: normalizeTimings(f.decisionTimings),
      subframes:   outSubframes,
      playConfigs: normalizePlayConfigs(f.playConfigs),
      uncertainties,
      uMatrix:     norm(f.uMatrix, uncertainties),
      uncertaintyScopes:  normalizeUncertaintyScopes(f.uncertaintyScopes),
      uncertaintyKinds:   normalizeDecisionKinds(f.uncertaintyKinds),
      uncertaintyTimings: normalizeTimings(f.uncertaintyTimings),
    };
  }
  function applyFraming(framing, sourceLabel, scopeText, descText, urlText) {
    state = normalizeState(coerceFraming(framing));
    currentPath = [];                                        // AI draft → top level
    // The bot's own scope input is the authoritative scope for the
    // generated framing — propagate it into the top-level scope box so
    // the user doesn't have to re-type it above.
    if (scopeText && !state.scope) state.scope = scopeText;
    // Same for the "Describe your problem" text — carry it into the new
    // state so a Save + reload leaves the user's description in the box
    // that generated the draft.
    if (descText && !state.problemDescription) state.problemDescription = descText;
    if (urlText && !state.problemUrl) state.problemUrl = urlText;
    setCurrentName(null);                                  // AI drafts have no save-target
    // Prefer the bot's `title` for the banner so Save-as pre-fills with a
    // useful short case name ("Aurora Motors") rather than the whole source
    // URL / filename / message the user pasted in.
    const draftLabel = (state.title && state.title.trim())
      ? state.title.trim()
      : (sourceLabel || 'Ask Professor Powell');
    setDocTitle('AI draft — ' + draftLabel);
    renderPromptCards();
    $('#fp-bot-url').value             = state.problemUrl || '';
    renderNotesChip(); syncTimeSpecDom();
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
    // Scope is now the top-of-section decision-maker field; the old
    // separate fp-bot-scope textarea was merged into fp-scope-input.
    const scope = $('#fp-scope-input').value.trim();
    const file = $('#fp-bot-file').files && $('#fp-bot-file').files[0];
    const size = $('#fp-bot-size').value || 'medium';
    const notes = (state.problemNotes || '').trim();
    if (!desc && !url && !file && !notes) {
      setBotStatus('Add a description, a URL, or a file first — or click "Read introductory materials" to ingest them once.', 'error');
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
      // When we already have distilled notes, skip re-sending the URL/file
      // (the server would just re-fetch and re-parse them — wasteful).
      if (notes) {
        form.append('priorNotes', notes);
      } else {
        if (url)  form.append('url', url);
        if (file) form.append('file', file, file.name);
      }
      form.append('size', size);

      const resp = await fetch(FRAMING_URL, { method: 'POST', body: form });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      if (!data.framing) throw new Error('Server returned no framing.');

      const sourceLabel = state.problemNotesSource
                       || (file ? file.name
                              : url ? url
                              : (desc.length > 60 ? desc.slice(0, 57) + '…' : desc));
      applyFraming(data.framing, sourceLabel, scope, desc, url);
      setBotStatus('Draft ready — scroll up to review and edit. Use File → Save as… to keep it.', '');
    } catch (err) {
      console.error('Framing request failed:', err);
      setBotStatus('Sorry — ' + (err && err.message ? err.message : 'request failed') + '. Try again in a moment.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  }
  // Read the Problem-scope inputs ONCE, ask the server to distill them
  // into neutral problem-setting notes, and store the notes in state.
  // Downstream AI calls (pyramid, ideas, matrix, framing) then send
  // those notes as `priorNotes` instead of re-fetching the URL or
  // re-parsing the file. Uploads become durable across page reloads
  // (the file input itself is one-shot).
  async function runIngest() {
    const desc  = $('#fp-bot-desc').value.trim();
    const url   = $('#fp-bot-url').value.trim();
    const scope = $('#fp-scope-input').value.trim();
    const file  = $('#fp-bot-file').files && $('#fp-bot-file').files[0];
    if (!desc && !url && !file) {
      setBotStatus('Add a description, a URL, or a file above first — the AI needs something to read.', 'error');
      return;
    }
    const btn = $('#fp-bot-ingest');
    const prev = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Reading…'; }
    setBotStatus('Reading introductory materials… (first request after idle can take ~30 s while the server wakes up)', 'working');
    try {
      const form = new FormData();
      if (scope) form.append('scope', scope);
      if (desc)  form.append('description', desc);
      if (url)   form.append('url', url);
      if (file)  form.append('file', file, file.name);
      const resp = await fetch(INGEST_ENDPOINT, { method: 'POST', body: form });
      const data = await resp.json().catch(() => ({ error: 'Bad response from server.' }));
      if (!resp.ok) throw new Error(data.error || ('Request failed (' + resp.status + ')'));
      const notes = String(data.notes || '').trim();
      if (!notes) throw new Error('Server returned no notes.');
      state.problemNotes = notes;
      state.problemNotesSource = String(data.sourceLabel || '').trim();
      renderNotesChip(); syncTimeSpecDom();
      autoSave();
      const chars = notes.length;
      const src = state.problemNotesSource ? '"' + state.problemNotesSource + '"' : 'your material';
      setBotStatus('Ingested ' + src + ' (' + chars.toLocaleString() + ' chars of notes). Future AI calls will use this as background — enter your metrics, decisions, and uncertainties as usual.', '');
    } catch (err) {
      console.error('Ingest failed:', err);
      setBotStatus('Sorry — ' + (err && err.message ? err.message : 'request failed') + '. Try again in a moment.', 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = prev; }
    }
  }
  // Time-step / horizon: DOM population + derived-period display.
  // Wall-clock unit → seconds for cross-unit conversion.
  const UNIT_SECONDS = {
    seconds: 1, minutes: 60, hours: 3600, days: 86400,
    weeks: 604800, months: 2629746, quarters: 7889238, years: 31556952,
  };
  function updateHorizonDerived() {
    const el = document.getElementById('fp-horizon-derived');
    if (!el) return;
    const ts = state.timeStep || { value: '', unit: '' };
    const hz = state.horizon  || { value: '', unit: '' };
    // Only compute when both fully specified and horizon isn't already
    // expressed in periods.
    const tsVal = Number(ts.value), hzVal = Number(hz.value);
    if (!Number.isFinite(tsVal) || tsVal <= 0 || !ts.unit) { el.textContent = ''; return; }
    if (!Number.isFinite(hzVal) || hzVal <= 0 || !hz.unit) { el.textContent = ''; return; }
    if (hz.unit === 'periods') { el.textContent = ''; return; }
    const tsSec = tsVal * (UNIT_SECONDS[ts.unit] || 0);
    const hzSec = hzVal * (UNIT_SECONDS[hz.unit] || 0);
    if (tsSec <= 0 || hzSec <= 0) { el.textContent = ''; return; }
    const nPeriods = hzSec / tsSec;
    // Show integer if it comes out whole, else 1 decimal.
    const shown = Math.abs(nPeriods - Math.round(nPeriods)) < 1e-9
      ? String(Math.round(nPeriods))
      : nPeriods.toFixed(1);
    el.textContent = '= ' + shown + ' periods';
  }
  function syncTimeSpecDom() {
    const ts = state.timeStep || { value: '', unit: '' };
    const hz = state.horizon  || { value: '', unit: '' };
    const setIf = (id, v) => { const e = document.getElementById(id); if (e) e.value = (v || v === 0) ? v : ''; };
    setIf('fp-time-step-value', ts.value);
    setIf('fp-time-step-unit',  ts.unit);
    setIf('fp-horizon-value',   hz.value);
    setIf('fp-horizon-unit',    hz.unit);
    updateHorizonDerived();
  }
  function renderNotesChip() {
    const wrap = $('#fp-notes-chip-wrap');
    const chip = $('#fp-notes-chip');
    if (!wrap || !chip) return;
    const notes = (state.problemNotes || '').trim();
    if (!notes) {
      wrap.hidden = true;
      return;
    }
    const src = (state.problemNotesSource || '').trim();
    const chars = notes.length.toLocaleString();
    chip.textContent = '📄 Notes loaded' + (src ? ' — ' + src : '') + ' (' + chars + ' chars)';
    wrap.hidden = false;
  }
  function clearIngestedNotes() {
    if (!(state.problemNotes || '').trim()) return;
    if (!confirm('Forget the ingested notes? The URL / file / description in the boxes stay put — click "Read introductory materials" again to re-ingest.')) return;
    state.problemNotes = '';
    state.problemNotesSource = '';
    renderNotesChip(); syncTimeSpecDom();
    autoSave();
    setBotStatus('Ingested notes cleared.', '');
  }
  function showNotesModal() {
    const body = $('#fp-notes-body');
    const notes = (state.problemNotes || '').trim();
    if (!notes) return;
    if (body) body.textContent = notes;
    const m = $('#fp-notes-modal');
    if (m) m.hidden = false;
  }
  function hideNotesModal() {
    const m = $('#fp-notes-modal');
    if (m) m.hidden = true;
  }
  function clearBotInputs() {
    // Don't clear fp-scope-input — the decision-maker scope is the
    // user's own identifying context, valuable to keep across
    // multiple first-draft attempts.
    $('#fp-bot-desc').value  = '';
    $('#fp-bot-url').value   = '';
    $('#fp-bot-file').value = '';
    state.problemDescription = '';
    state.problemUrl = '';
    state.problemNotes = '';
    state.problemNotesSource = '';
    renderNotesChip(); syncTimeSpecDom();
    autoSave();
    setBotStatus('');
  }

  // ── Server-backed library (framing tool v2) ─────────────────
  // Base URL for the framing-node backend (running on the chatbot Render
  // service). Every endpoint accepts a read_id in the URL and, for writes,
  // a write_token in ?w=.
  const NODES_BASE = CHATBOT_BASE + '/api/framing-nodes';
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

  // Admin credentials — map of readId → writeToken belonging to any
  // ancestor whose write URL the user has proven access to. The backend
  // accepts an ancestor's write token for structural-admin ops (rename,
  // delete, regenerate, create sub-node) on any descendant, so we
  // stash tokens here and use them as a fallback when the current
  // node's own write token isn't available. NEVER sent in the visible
  // browser URL — passed only in API requests.
  const ADMIN_CREDS_KEY = 'framing_admin_creds_v1';
  function readAdminCreds() {
    try {
      const raw = localStorage.getItem(ADMIN_CREDS_KEY);
      const obj = raw ? JSON.parse(raw) : {};
      return (obj && typeof obj === 'object') ? obj : {};
    } catch (_) { return {}; }
  }
  function rememberAdminCred(readId, token) {
    if (!readId || !token) return;
    const map = readAdminCreds();
    if (map[readId] === token) return;
    map[readId] = token;
    try { localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(map)); }
    catch (_) { /* ignore */ }
  }
  function forgetAdminCred(readId) {
    const map = readAdminCreds();
    if (!map[readId]) return;
    delete map[readId];
    try { localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(map)); }
    catch (_) { /* ignore */ }
  }
  // Effective admin token for the currently-loaded node — content
  // write token wins if we have it (it's a strict superset of admin),
  // otherwise fall back to the inherited admin credential.
  function nodeAdminToken() {
    if (!loadedNode) return null;
    return loadedNode.writeToken || loadedNode.adminToken || null;
  }
  // Effective content-write token — write token ONLY. Admin credentials
  // do NOT grant content-write.
  function nodeContentWriteToken() {
    return (loadedNode && loadedNode.writeToken) || null;
  }

  async function initFromNodeUrl() {
    const params = new URLSearchParams(window.location.search);
    const readId     = params.get('node');
    const writeToken = params.get('w');
    const adminInUrl = params.get('admin');
    if (!isReadIdString(readId)) return;
    // If an ancestor's admin token was forwarded via the URL (from
    // a Browse-modal navigation in a parent's edit mode), stash it
    // in localStorage and rewrite the URL bar to hide it — a user
    // copying the address bar shouldn't inadvertently share admin.
    if (isWriteTokenString(adminInUrl)) {
      rememberAdminCred(readId, adminInUrl);
      try {
        const cleanUrl = makeNodeUrl(readId, isWriteTokenString(writeToken) ? writeToken : null);
        history.replaceState(null, '', cleanUrl);
      } catch (_) { /* ignore */ }
    }
    try {
      const resp = await apiFetch(NODES_BASE + '/nodes/' + encodeURIComponent(readId));
      const validWriteToken = isWriteTokenString(writeToken) ? writeToken : null;
      // Own write token is a strict superset of admin — remember it as
      // an admin credential too, so a page reload without ?w= still
      // has admin access (from an earlier visit in edit mode).
      if (validWriteToken) rememberAdminCred(readId, validWriteToken);
      const adminCred = readAdminCreds()[readId] || null;
      loadedNode = {
        readId,
        writeToken: validWriteToken,
        adminToken: (adminCred && adminCred !== validWriteToken) ? adminCred : null,
        name:       resp.node.name,
        ancestry:   Array.isArray(resp.ancestry) ? resp.ancestry : [],
        children:   Array.isArray(resp.children) ? resp.children : [],
        framings:   Array.isArray(resp.framings) ? resp.framings : [],
        currentFramingId: null,
      };
      rememberVisitedLibrary(loadedNode.readId, loadedNode.writeToken, loadedNode.name, loadedNode.ancestry);
      renderLibraryBar();
      renderTreePane();
      // Claim the write lease when we open a library in edit mode.
      // If someone else holds it, the lease banner surfaces the conflict.
      if (loadedNode.writeToken) claimOrRefreshLease(false);
      // The side pane always shows the sub-libraries + framings list,
      // so auto-open the most-recent framing (element 0, since the
      // server sorts DESC by updated_at). On narrow screens the pane
      // is hidden — the Browse ▾ button and modal are the fallback.
      if (loadedNode.framings.length > 0) {
        await openFramingFromLoadedNode(loadedNode.framings[0].id);
        renderTreePane();   // highlight the now-open framing
      } else if (!(loadedNode.children || []).length) {
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
      renderPromptCards();
      $('#fp-bot-url').value             = state.problemUrl || '';
      renderNotesChip(); syncTimeSpecDom();
      $('#fp-metrics-input').value       = state.metrics.join('\n');
      $('#fp-decisions-input').value     = state.decisions.join('\n');
      $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
      render();
      renderAllMatrices();
      autoSave();
      renderTreePane();   // update the highlighted-current-framing row
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
    // Three modes, in decreasing power:
    //   edit  — user has this node's own write token (content + admin)
    //   admin — user only has an ancestor's write token (structural admin only,
    //           no content-write on framings here)
    //   view  — read only
    const hasContent = !!loadedNode.writeToken;
    const hasAdmin   = !!(loadedNode.writeToken || loadedNode.adminToken);
    const mode = hasContent ? 'edit' : (hasAdmin ? 'admin' : 'view');
    // Ancestry breadcrumb — root → … → current node — labels only per
    // the locked design (users can see where they are but never click
    // upward past their access).
    const crumb = (loadedNode.ancestry || []).join(' › ') || loadedNode.name;
    $('#fp-library-crumb').textContent = '📁 ' + crumb;
    $('#fp-library-crumb').title = crumb;
    const modeEl = $('#fp-library-mode');
    modeEl.textContent =
      mode === 'edit' ? 'Edit mode' :
      mode === 'admin' ? 'Admin mode' :
                         'View only';
    modeEl.className = 'fp-library-mode ' + mode;
    modeEl.title = mode === 'admin'
      ? 'You have structural admin (rename, delete, regenerate URLs, new sub-library) via an ancestor\'s Edit URL. To edit framings inside this library, use its OWN Edit URL.'
      : '';

    // Structural-admin buttons — visible whenever the user has admin
    // (own write token OR an ancestor's).
    const renameBtn = $('#fp-library-rename');
    if (renameBtn) renameBtn.hidden = !hasAdmin;
    const newSubBtn = $('#fp-library-new-sublib');
    if (newSubBtn) newSubBtn.hidden = !hasAdmin;
    const regenBtn = $('#fp-library-regenerate');
    if (regenBtn) regenBtn.hidden = !hasAdmin;
    const delBtn = $('#fp-library-delete');
    // Never expose Delete on the root node — server rejects it, and the
    // client should never even offer it.
    const isRootByName = loadedNode.name && /^Root/i.test(loadedNode.name);
    if (delBtn) delBtn.hidden = !hasAdmin || isRootByName;

    // Content-write buttons — visible ONLY when we have this node's
    // own write token. Admin credentials do not grant content-write.
    const saveBtn = $('#fp-library-save-framing');
    if (saveBtn) saveBtn.hidden = !hasContent;
    const newBtn = $('#fp-library-new-framing');
    if (newBtn) newBtn.hidden = !hasContent;
  }

  async function regenerateLoadedLibraryUrls() {
    const adminTok = nodeAdminToken();
    if (!loadedNode || !adminTok) return;
    if (!confirm(
      'Regenerate the URLs for "' + (loadedNode.name || 'this library') + '"?\n\n' +
      'The current View and Edit URLs stop working immediately. Anyone with the OLD URLs — including your own bookmarks and any URL you have shared — loses access. You will need to update your bookmarks with the new URL shown next.\n\n' +
      'This cannot be undone.'
    )) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) + '/regenerate' +
          '?w=' + encodeURIComponent(adminTok),
        { method: 'POST' }
      );
      const oldReadId = loadedNode.readId;
      // Update in-memory tokens so the current session keeps working.
      loadedNode.readId     = resp.node.read_id;
      loadedNode.writeToken = resp.node.write_token;
      loadedNode.adminToken = null;   // own token is now a strict superset
      // Persist the swap wherever the old ID was cached.
      forgetVisitedLibrary(oldReadId);
      forgetAdminCred(oldReadId);
      rememberVisitedLibrary(resp.node.read_id, resp.node.write_token, resp.node.name, loadedNode.ancestry);
      rememberAdminCred(resp.node.read_id, resp.node.write_token);
      const myLib = readMyLibrary();
      if (myLib && myLib.readId === oldReadId) {
        writeMyLibrary(resp.node.read_id, resp.node.write_token, resp.node.name);
      }
      // Update the browser's URL bar so a reload lands on the fresh
      // URL instead of the dead one — no navigation, no lost state.
      try {
        const newUrl = makeNodeUrl(resp.node.read_id, resp.node.write_token);
        history.replaceState(null, '', newUrl);
      } catch (_) { /* older browsers — ignore */ }
      // Fresh URLs — user MUST save these, so use the gated modal.
      showUrlsModal({
        title: 'URLs regenerated — ' + (loadedNode.name || 'this library'),
        lede: 'The <b>old</b> URLs no longer work. Copy the <b>new</b> URLs below and update your bookmarks. Any shared links (email, chat, docs) must be resent — the old links now return "Node not found".',
        readUrl:  makeNodeUrl(resp.node.read_id),
        writeUrl: makeNodeUrl(resp.node.read_id, resp.node.write_token),
        emailSubject: 'Framing library URLs updated — ' + (loadedNode.name || ''),
        emailIntro: 'The URLs for this library have been regenerated. The old URLs no longer work; use these instead.',
      });
      flashStatus('URLs regenerated.');
    } catch (err) {
      console.error('Regenerate URLs failed:', err);
      alert('Regenerate failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  async function deleteLoadedLibrary() {
    const adminTok = nodeAdminToken();
    if (!loadedNode || !adminTok) return;
    if (loadedNode.name && /^Root/i.test(loadedNode.name)) {
      // Server also rejects delete on the root node; guard on the client
      // for a nicer message.
      alert('You cannot delete the root library.');
      return;
    }
    const childCount   = (loadedNode.children || []).length;
    const framingCount = (loadedNode.framings || []).length;
    const parts = [];
    if (childCount) {
      parts.push(childCount + ' direct sub-librar' + (childCount === 1 ? 'y' : 'ies') +
        ' (and everything inside them recursively)');
    }
    if (framingCount) {
      parts.push(framingCount + ' framing' + (framingCount === 1 ? '' : 's') + ' in it');
    }
    const detail = parts.length ? '\n\nAlso deleted: ' + parts.join(' and ') + '.' : ' (currently empty).';
    if (!confirm(
      'DELETE the library "' + (loadedNode.name || 'this library') + '"?' + detail +
      '\n\nCannot be undone. All URLs (yours and anyone else\'s) stop working immediately.'
    )) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) +
          '?w=' + encodeURIComponent(adminTok),
        { method: 'DELETE' }
      );
      // Clean up localStorage.
      forgetVisitedLibrary(loadedNode.readId);
      forgetAdminCred(loadedNode.readId);
      const myLib = readMyLibrary();
      if (myLib && myLib.readId === loadedNode.readId) {
        localStorage.removeItem(MY_LIBRARY_KEY);
        refreshMyLibraryMenuItem();
      }
      const dn = resp.descendant_nodes || 0;
      const fr = resp.framings || 0;
      // Navigate to the bare tool page — the current URL is now dead.
      const bare = window.location.origin + window.location.pathname;
      alert('Deleted "' + (loadedNode.name || 'library') + '"' +
        (dn || fr ? ' (' + dn + ' sub-nodes, ' + fr + ' framings)' : '') +
        '.\n\nRedirecting to the tool home page.');
      window.location.href = bare;
    } catch (err) {
      console.error('Delete library failed:', err);
      alert('Delete failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  async function createSubLibrary() {
    const adminTok = nodeAdminToken();
    if (!loadedNode || !adminTok) return;
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
          '?w=' + encodeURIComponent(adminTok),
        { method: 'POST', body: { name: name.slice(0, 200) } }
      );
      // Local cache — child appears immediately in Browse ▾ and tree pane.
      loadedNode.children.unshift({
        read_id:        resp.node.read_id,
        name:           resp.node.name,
        owner_label:    resp.node.owner_label,
        updated_at:     resp.node.updated_at,
        first_write_at: resp.node.first_write_at,
      });
      renderTreePane();
      // Remember it in "My server libraries" so File → Open shows it too.
      const childAncestry = (loadedNode.ancestry || []).slice();
      childAncestry.push(resp.node.name);
      rememberVisitedLibrary(resp.node.read_id, resp.node.write_token, resp.node.name, childAncestry);
      // Show URLs without the "must save" gate — as the parent-owner
      // you have structural admin over this child forever (via your
      // own Edit URL), so you can regenerate its URLs anytime. Copy
      // the URLs if you need to hand them to someone (a student, a
      // teammate); otherwise just close the modal and keep working.
      showUrlsModal({
        title: 'Sub-library created — ' + resp.node.name,
        lede: '<b>' + escapeHtmlForModal(resp.node.name) + '</b> is now a sub-library of <b>' +
              escapeHtmlForModal(loadedNode.name) + '</b>. ' +
              'Send the <b>Edit URL</b> to whoever should own this library (a student, a teammate). ' +
              'You keep structural admin (rename, delete, regenerate URLs) via your parent Edit URL — no need to save the URLs for yourself.',
        readUrl:  makeNodeUrl(resp.node.read_id),
        writeUrl: makeNodeUrl(resp.node.read_id, resp.node.write_token),
        emailSubject: 'Framing library — ' + resp.node.name,
        emailIntro: 'A framing library has been created for you. ' +
                    'Keep the Edit URL private — anyone with it can edit or delete framings in this library.',
        alreadySaved: true,
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
      claimOrRefreshLease(false);   // extend lease
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
        title: '', scope: '', description: '', problemDescription: '', problemUrl: '', problemNotes: '', problemNotesSource: '', problemParameters: '', metricLabels: {}, metricEquations: {}, constraints: [], transitionEquations: [], timeStep: { value: '', unit: '' }, horizon: { value: '', unit: '' },
        metrics: [], assignments: {}, chipColors: {},
        decisions: [], matrix: {}, decisionKinds: {}, decisionTimings: {}, subframes: {}, playConfigs: {},
        uncertainties: [], uMatrix: {}, uncertaintyScopes: {}, uncertaintyKinds: {}, uncertaintyTimings: {},
      };
      currentPath = [];
      renderPromptCards();
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
      renderTreePane();
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
      renderTreePane();   // reflect renamed / re-sorted framing
    }
  }

  async function renameLoadedLibrary() {
    const adminTok = nodeAdminToken();
    if (!loadedNode || !adminTok) return;
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
          '?w=' + encodeURIComponent(adminTok),
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
      renderTreePane();
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

  function makeRowActionBtn(label, title, cls, handler) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.title = title;
    b.className = 'fp-row-action ' + (cls || '');
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      handler();
    });
    return b;
  }

  // ── Write lease (soft-lock) ─────────────────────────────────
  // Browser-scoped holder id. Same for every tab on this browser so
  // multiple tabs don't fight each other. Persisted in localStorage.
  const HOLDER_ID_KEY = 'framing_holder_id_v1';
  function getHolderId() {
    try {
      let id = localStorage.getItem(HOLDER_ID_KEY);
      if (id) return id;
      id = (crypto.randomUUID ? crypto.randomUUID() :
        (Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)));
      localStorage.setItem(HOLDER_ID_KEY, id);
      return id;
    } catch (_) {
      // Private-mode / storage disabled — fall back to a per-tab id.
      return 'ephemeral-' + Math.random().toString(36).slice(2);
    }
  }

  // Lease state for the currently-loaded node.
  let leaseState = null;   // null | { holdsIt: bool, holderId?, holderLabel?, refreshedAt?, expiresAt? }
  let leasePollTimer = null;

  async function claimOrRefreshLease(takeOver) {
    if (!loadedNode || !loadedNode.writeToken) return;
    const holderId = getHolderId();
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) + '/lease' +
          '?w=' + encodeURIComponent(loadedNode.writeToken),
        {
          method: 'POST',
          body: { holder_id: holderId, take_over: !!takeOver },
        }
      );
      leaseState = {
        holdsIt: true,
        holderId: resp.lease.holder_id,
        holderLabel: resp.lease.holder_label,
        refreshedAt: resp.lease.refreshed_at,
        expiresAt: resp.lease.expires_at,
      };
    } catch (err) {
      if (err && err.status === 409 && err.message === 'Lease held by another editor') {
        // Server sends lease info in the body; extract via a re-poll.
        await pollLease();
      } else {
        console.warn('Lease claim failed:', err && err.message);
      }
    }
    renderLeaseBanner();
    startLeasePoll();
  }

  async function pollLease() {
    if (!loadedNode || !loadedNode.writeToken) { stopLeasePoll(); return; }
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) + '/lease'
      );
      const holderId = getHolderId();
      const lease = resp.lease;
      const prevHeldByUs = !!(leaseState && leaseState.holdsIt);
      if (!lease) {
        // No active lease — we may have expired. Try to re-claim.
        if (prevHeldByUs) {
          // Was ours; expired quietly. Re-claim silently.
          await claimOrRefreshLease(false);
          return;
        }
        leaseState = null;
      } else if (lease.holder_id === holderId) {
        leaseState = {
          holdsIt: true,
          holderId: lease.holder_id,
          holderLabel: lease.holder_label,
          refreshedAt: lease.refreshed_at,
          expiresAt: lease.expires_at,
        };
      } else {
        // Someone else holds it. If we thought WE had it, they took over.
        if (prevHeldByUs) {
          alert('Another editor has taken over this library. Your unsaved changes remain in the browser but new saves will fail until you take control back.');
        }
        leaseState = {
          holdsIt: false,
          holderId: lease.holder_id,
          holderLabel: lease.holder_label,
          refreshedAt: lease.refreshed_at,
          expiresAt: lease.expires_at,
        };
      }
    } catch (err) {
      console.warn('Lease poll failed:', err && err.message);
    }
    renderLeaseBanner();
  }

  function startLeasePoll() {
    stopLeasePoll();
    // Poll every 60 seconds — cheap, and matches lease refresh cadence.
    leasePollTimer = setInterval(pollLease, 60_000);
  }
  function stopLeasePoll() {
    if (leasePollTimer) { clearInterval(leasePollTimer); leasePollTimer = null; }
  }

  function releaseLeaseOnUnload() {
    if (!loadedNode || !loadedNode.writeToken || !leaseState || !leaseState.holdsIt) return;
    // sendBeacon is best-effort and doesn't block the unload. If it
    // fails, the lease expires on its own in ≤5 min.
    try {
      const url = NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) + '/lease' +
        '?w=' + encodeURIComponent(loadedNode.writeToken) +
        '&holder_id=' + encodeURIComponent(getHolderId()) +
        '&_method=DELETE';
      // sendBeacon only supports POST — fake DELETE via _method param, but
      // our server doesn't handle that. Use fetch with keepalive instead.
      fetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId) + '/lease' +
          '?w=' + encodeURIComponent(loadedNode.writeToken) +
          '&holder_id=' + encodeURIComponent(getHolderId()),
        { method: 'DELETE', keepalive: true }
      );
    } catch (_) { /* best-effort */ }
  }

  function renderLeaseBanner() {
    const banner = $('#fp-lease-banner');
    if (!banner) return;
    const showBanner = leaseState && !leaseState.holdsIt;
    banner.hidden = !showBanner;
    if (showBanner) {
      const when = leaseState.refreshedAt
        ? new Date(leaseState.refreshedAt).toLocaleTimeString()
        : 'just now';
      $('#fp-lease-msg').textContent =
        'Another editor is working on this library (last active ' + when + '). ' +
        'Your write buttons are disabled to prevent conflicting saves.';
    }
    // Disable write buttons when someone else holds the lease.
    const lockWrites = !!(leaseState && !leaseState.holdsIt);
    const writeBtnIds = ['fp-library-save-framing', 'fp-library-new-framing',
      'fp-library-new-sublib', 'fp-library-rename', 'fp-library-regenerate',
      'fp-library-delete'];
    for (const id of writeBtnIds) {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = lockWrites;
    }
  }

  // ── Persistent tree side pane ────────────────────────────────
  // Shown on wide screens whenever a library is loaded. Same content
  // as the Browse modal (sub-libraries + framings) but always visible
  // so switching framings is one click, not two.
  function renderTreePane() {
    const pane = $('#fp-tree-pane');
    if (!pane) return;
    if (!loadedNode) {
      pane.hidden = true;
      document.body.classList.remove('fp-tree-open');
      return;
    }
    pane.hidden = false;
    document.body.classList.add('fp-tree-open');

    $('#fp-tree-name').textContent = loadedNode.name || 'Library';
    $('#fp-tree-name').title       = loadedNode.name || '';
    $('#fp-tree-crumb').textContent = (loadedNode.ancestry || []).join(' › ');

    const content = $('#fp-tree-content');
    content.innerHTML = '';

    // Sub-libraries section
    if ((loadedNode.children || []).length) {
      const h = document.createElement('div');
      h.className = 'fp-tree-section';
      h.textContent = 'Sub-libraries';
      content.appendChild(h);
      for (const c of loadedNode.children) {
        const row = document.createElement('div');
        row.className = 'fp-tree-item';
        row.title = c.name || '';
        const icon = document.createElement('span');
        icon.className = 'fp-tree-item-icon';
        icon.textContent = '📂';
        const label = document.createElement('span');
        label.className = 'fp-tree-item-label';
        label.textContent = c.name || 'Untitled library';
        row.appendChild(icon);
        row.appendChild(label);
        row.addEventListener('click', () => {
          const url = new URL(window.location.origin + window.location.pathname);
          url.searchParams.set('node', c.read_id);
          const parentAdmin = loadedNode.writeToken || loadedNode.adminToken;
          if (parentAdmin) url.searchParams.set('admin', parentAdmin);
          window.location.href = url.toString();
        });
        content.appendChild(row);
      }
    }

    // Framings section
    const h2 = document.createElement('div');
    h2.className = 'fp-tree-section';
    h2.textContent = 'Framings';
    content.appendChild(h2);
    if (!(loadedNode.framings || []).length) {
      const empty = document.createElement('div');
      empty.className = 'fp-tree-empty';
      empty.textContent = '(none)';
      content.appendChild(empty);
    } else {
      for (const f of loadedNode.framings) {
        const row = document.createElement('div');
        row.className = 'fp-tree-item';
        if (loadedNode.currentFramingId === f.id) row.classList.add('fp-tree-current');
        row.title = f.title || '';
        const icon = document.createElement('span');
        icon.className = 'fp-tree-item-icon';
        icon.textContent = '📄';
        const label = document.createElement('span');
        label.className = 'fp-tree-item-label';
        label.textContent = f.title || 'Untitled framing';
        row.appendChild(icon);
        row.appendChild(label);
        row.addEventListener('click', () => openFramingFromLoadedNode(f.id));
        content.appendChild(row);
      }
    }
  }

  // Re-fetch this node from the server and re-render the tree pane.
  // Used by the refresh button and after any create/rename/delete
  // that changes the local cache.
  async function reloadCurrentNodeTree() {
    if (!loadedNode) return;
    try {
      const resp = await apiFetch(NODES_BASE + '/nodes/' + encodeURIComponent(loadedNode.readId));
      loadedNode.name     = resp.node.name;
      loadedNode.ancestry = Array.isArray(resp.ancestry) ? resp.ancestry : [];
      loadedNode.children = Array.isArray(resp.children) ? resp.children : [];
      loadedNode.framings = Array.isArray(resp.framings) ? resp.framings : [];
      renderTreePane();
      renderLibraryBar();
    } catch (err) {
      console.error('Tree refresh failed:', err);
    }
  }

  function openLibraryModal() {
    if (!loadedNode) return;
    $('#fp-library-modal-name').textContent = loadedNode.name;
    $('#fp-library-modal-crumb').textContent =
      (loadedNode.ancestry || []).join(' › ');
    // canEdit is used for framing content-write actions (need own write token).
    // canAdmin covers structural ops on children (own OR ancestor token).
    const canEdit  = !!loadedNode.writeToken;
    const canAdmin = !!(loadedNode.writeToken || loadedNode.adminToken);

    // Sub-libraries section — direct children (child nodes). Clicking a
    // row navigates to that child's read URL (view mode). To open a
    // child in edit mode, the user needs that child's own write URL.
    // Rename ✎ / delete × per row when the CURRENT node is in edit
    // mode — the server accepts the parent's write token for structural
    // admin on children (flow-down), so no need for the child's own
    // write token to manage its metadata.
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
        if (canAdmin) {
          row.appendChild(makeRowActionBtn('✎', 'Rename this sub-library', '',
            () => renameChildNode(c)));
          row.appendChild(makeRowActionBtn('×', 'Delete this sub-library and everything in it', 'fp-row-danger',
            () => deleteChildNode(c)));
        }
        row.addEventListener('click', () => {
          $('#fp-library-modal').hidden = true;
          const url = new URL(window.location.origin + window.location.pathname);
          url.searchParams.set('node', c.read_id);
          // Do NOT auto-forward the current write token as ?w= — content
          // write is per-node, not inherited. But DO forward it as ?admin
          // so structural admin (rename, delete, regenerate, new sub-lib)
          // still works on the child without needing its own Edit URL.
          const parentAdmin = loadedNode.writeToken || loadedNode.adminToken;
          if (parentAdmin) url.searchParams.set('admin', parentAdmin);
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
        if (canEdit) {
          row.appendChild(makeRowActionBtn('✎', 'Rename this framing', '',
            () => renameFramingRow(f)));
          row.appendChild(makeRowActionBtn('×', 'Delete this framing', 'fp-row-danger',
            () => deleteFramingRow(f)));
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

  // Inline rename for the currently-loaded framing. Same server call as
  // renameFramingRow, but sourced from the banner button on the workspace
  // so the user doesn't have to open Browse to rename what they're editing.
  // Does NOT save or overwrite the framing's content — title only.
  async function renameCurrentFraming() {
    if (!loadedNode || !loadedNode.writeToken || !loadedNode.currentFramingId) return;
    const currentTitle = docTitle || '';
    const raw = window.prompt('Rename this framing:', currentTitle);
    if (raw == null) return;
    const newTitle = raw.trim();
    if (!newTitle || newTitle === currentTitle) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/framings/' + encodeURIComponent(loadedNode.currentFramingId) +
          '?w=' + encodeURIComponent(loadedNode.writeToken),
        { method: 'PUT', body: { title: newTitle } }
      );
      updateFramingInCache(resp.framing);
      setDocTitle(resp.framing.title);
      renderTreePane();     // pick up the new title in the side pane
      flashStatus('Framing renamed.');
    } catch (err) {
      console.error('Rename current framing failed:', err);
      alert('Rename failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  async function renameFramingRow(f) {
    if (!loadedNode || !loadedNode.writeToken) return;
    const raw = window.prompt('Rename framing:', f.title || '');
    if (raw == null) return;
    const newTitle = raw.trim();
    if (!newTitle || newTitle === f.title) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/framings/' + encodeURIComponent(f.id) +
          '?w=' + encodeURIComponent(loadedNode.writeToken),
        { method: 'PUT', body: { title: newTitle } }
      );
      updateFramingInCache(resp.framing);
      if (loadedNode.currentFramingId === f.id) setDocTitle(resp.framing.title);
      openLibraryModal();
      flashStatus('Framing renamed.');
    } catch (err) {
      console.error('Rename framing failed:', err);
      alert('Rename failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  async function deleteFramingRow(f) {
    if (!loadedNode || !loadedNode.writeToken) return;
    if (!confirm('Delete framing "' + (f.title || 'Untitled') + '"?\n\nThis cannot be undone.')) return;
    try {
      await apiFetch(
        NODES_BASE + '/framings/' + encodeURIComponent(f.id) +
          '?w=' + encodeURIComponent(loadedNode.writeToken),
        { method: 'DELETE' }
      );
      loadedNode.framings = (loadedNode.framings || []).filter(x => x.id !== f.id);
      if (loadedNode.currentFramingId === f.id) {
        loadedNode.currentFramingId = null;
        // Blank the workspace since the framing on-screen no longer exists.
        state = {
          title: '', scope: '', description: '', problemDescription: '', problemUrl: '', problemNotes: '', problemNotesSource: '', problemParameters: '', metricLabels: {}, metricEquations: {}, constraints: [], transitionEquations: [], timeStep: { value: '', unit: '' }, horizon: { value: '', unit: '' },
          metrics: [], assignments: {}, chipColors: {},
          decisions: [], matrix: {}, decisionKinds: {}, decisionTimings: {}, subframes: {}, playConfigs: {},
          uncertainties: [], uMatrix: {}, uncertaintyScopes: {}, uncertaintyKinds: {}, uncertaintyTimings: {},
        };
        currentPath = [];
        setDocTitle(null);
        renderPromptCards();
        $('#fp-metrics-input').value       = '';
        $('#fp-decisions-input').value     = '';
        $('#fp-uncertainties-input').value = '';
        render();
        renderAllMatrices();
      }
      openLibraryModal();
      renderTreePane();
      flashStatus('Framing deleted.');
    } catch (err) {
      console.error('Delete framing failed:', err);
      alert('Delete failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  async function renameChildNode(child) {
    const adminTok = nodeAdminToken();
    if (!loadedNode || !adminTok) return;
    const raw = window.prompt('Rename sub-library:', child.name || '');
    if (raw == null) return;
    const newName = raw.trim();
    if (!newName || newName === child.name) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(child.read_id) +
          '?w=' + encodeURIComponent(adminTok),
        { method: 'PATCH', body: { name: newName } }
      );
      child.name = resp.node.name;
      // If it's in the visited-libraries list, refresh its ancestry cache too.
      const map = readVisitedLibraries();
      if (map[child.read_id]) {
        const ancestry = (loadedNode.ancestry || []).slice();
        ancestry.push(resp.node.name);
        map[child.read_id].name = resp.node.name;
        map[child.read_id].ancestryLabel = ancestry.join(' › ');
        writeVisitedLibraries(map);
      }
      openLibraryModal();
      renderTreePane();
      flashStatus('Sub-library renamed.');
    } catch (err) {
      console.error('Rename sub-library failed:', err);
      alert('Rename failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  async function deleteChildNode(child) {
    const adminTok = nodeAdminToken();
    if (!loadedNode || !adminTok) return;
    if (!confirm('DELETE the sub-library "' + (child.name || 'Untitled') + '" and every framing / sub-library inside it?\n\nThis cannot be undone. Anyone with URLs to this sub-library (or anything inside it) loses access.')) return;
    try {
      const resp = await apiFetch(
        NODES_BASE + '/nodes/' + encodeURIComponent(child.read_id) +
          '?w=' + encodeURIComponent(adminTok),
        { method: 'DELETE' }
      );
      loadedNode.children = (loadedNode.children || []).filter(c => c.read_id !== child.read_id);
      // Clean up any localStorage reference to this sub-library.
      forgetVisitedLibrary(child.read_id);
      forgetAdminCred(child.read_id);
      const myLib = readMyLibrary();
      if (myLib && myLib.readId === child.read_id) {
        localStorage.removeItem(MY_LIBRARY_KEY);
        refreshMyLibraryMenuItem();
      }
      openLibraryModal();
      renderTreePane();
      const dn = resp.descendant_nodes || 0;
      const fr = resp.framings || 0;
      flashStatus('Deleted "' + (child.name || 'Untitled') + '"' +
        (dn || fr ? ' (' + dn + ' sub-nodes, ' + fr + ' framings)' : '') + '.');
    } catch (err) {
      console.error('Delete sub-library failed:', err);
      alert('Delete failed:\n\n' + ((err && err.message) ? err.message : String(err)));
    }
  }

  async function publishToLibrary() {
    // Save as… always prompts for a name — this matches the convention
    // in every desktop app (Word, Sheets, etc.) and prevents surprises
    // where the tool auto-picks the first-decision text or the bot's
    // compact case name. The pre-fill priority is the same as the
    // silent derivation used to be — bot title, current save name,
    // banner-derived name, then a date-stamped fallback so the box is
    // never empty.
    const suggested = (state.title && state.title.trim())
      || (currentName && currentName.trim())
      || deriveSuggestedName();
    const raw = window.prompt('Save as (name for this framing):', suggested);
    if (raw == null) return;                          // user cancelled
    const framingTitle = raw.trim().slice(0, 200);
    if (!framingTitle) return;                        // empty → no-op

    const btn = $('#fp-menu-publish');
    const prevText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }
    try {

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
                'Every future <em>Save as…</em> will add a new framing to <b>the same library</b> at these URLs. ' +
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
  // Expose the current framing to the inline Ask Professor Powell chat
  // widget. widget.js calls this before each user message and includes
  // whatever we return as `context` in the /chat request. Server-side
  // handler (formatPageContextForPrompt) formats it into a compact
  // system-prompt block so the assistant can answer "this framing"
  // questions with concrete references. Returns null if there's nothing
  // meaningful on-screen (blank state or nothing loaded), so the chat
  // stays a general-purpose assistant when there's no framing context.
  window.CASTLE_CHAT_CONTEXT_PROVIDER = function () {
    try {
      // Always send a page hint so the server can inject a tool-usage
      // reference into the system prompt (users can ask "how do I save?"
      // even on a blank framing). Framing content is added on top when
      // present so the bot can also answer "how do I score X against Y"
      // style questions with concrete references.
      const hasContent =
        (Array.isArray(state.metrics)      && state.metrics.length      > 0) ||
        (Array.isArray(state.decisions)    && state.decisions.length    > 0) ||
        (Array.isArray(state.uncertainties) && state.uncertainties.length > 0) ||
        (typeof state.scope === 'string' && state.scope.trim().length > 0);
      const payload = {
        kind: 'framing',
        page: 'framing-tool',
      };
      if (!hasContent) return payload;
      payload.framing = {
        title:         state.title || '',
        scope:         state.scope || '',
        description:   state.description || '',
        problemDescription: state.problemDescription || '',
        problemUrl:         state.problemUrl || '',
        problemNotes:       state.problemNotes || '',
        problemNotesSource: state.problemNotesSource || '',
        timeStep:      state.timeStep || { value: '', unit: '' },
        horizon:       state.horizon  || { value: '', unit: '' },
        metrics:       state.metrics || [],
        assignments:   state.assignments || {},
        decisions:     state.decisions || [],
        matrix:        state.matrix || {},
        decisionKinds:   state.decisionKinds   || {},
        decisionTimings: state.decisionTimings || {},
        uncertainties: state.uncertainties || [],
        uMatrix:       state.uMatrix || {},
        uncertaintyScopes:  state.uncertaintyScopes  || {},
        uncertaintyKinds:   state.uncertaintyKinds   || {},
        uncertaintyTimings: state.uncertaintyTimings || {},
        subframes:     state.subframes || {},
      };
      if (loadedNode) {
        payload.library = {
          name:     loadedNode.name || '',
          ancestry: loadedNode.ancestry || [],
        };
        // If a specific framing from the loaded library is open, name it.
        if (loadedNode.currentFramingId && Array.isArray(loadedNode.framings)) {
          const f = loadedNode.framings.find(x => x.id === loadedNode.currentFramingId);
          if (f && f.title) payload.framingTitle = f.title;
        }
      }
      return payload;
    } catch (_) { return null; }
  };

  document.addEventListener('DOMContentLoaded', () => {
    load();
    // Pre-set the tree-open body class if the URL will trigger a tree
    // pane — the padding-right shift runs synchronously so the layout
    // lands in its final position on first paint. Prevents the flash
    // of wide content followed by a collapse when the tree fetch
    // returns. Removed later if the fetch fails or the URL lacked a
    // valid node param.
    try {
      const nodeParam = new URLSearchParams(window.location.search).get('node');
      if (nodeParam && /^[A-Za-z0-9]{10}$/.test(nodeParam)) {
        document.body.classList.add('fp-tree-open');
      }
    } catch (_) { /* ignore */ }
    // ?node= URL wins over localStorage — deferred (async) so it can
    // fetch the server-side node in parallel with the rest of init.
    // The initial paint uses whatever load() restored; if a node URL
    // is present, initFromNodeUrl overwrites state when the fetch
    // returns.
    initFromNodeUrl();
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
    renderPromptCards();
    $('#fp-bot-url').value             = state.problemUrl || '';
    renderNotesChip(); syncTimeSpecDom();
    $('#fp-metrics-input').value       = state.metrics.join('\n');
    $('#fp-decisions-input').value     = state.decisions.join('\n');
    $('#fp-uncertainties-input').value = state.uncertainties.join('\n');
    renderCurrentFileLabel();
    $$('.fp-drop-zone').forEach(wireDropZone);
    // Guided-prompt textareas — Q1 (id=fp-scope-input) maps to
    // state.promptAnswers.decisionMaker + state.scope; Q2-Q5 map to
    // state.promptAnswers and get concatenated (LABEL: prefixed) into
    // state.problemDescription + the hidden #fp-bot-desc.
    for (const q of PROMPT_QUESTIONS) {
      const el = document.getElementById(q.inputId);
      if (!el) continue;
      el.addEventListener('input', () => {
        state.promptAnswers[q.key] = el.value;
        buildDerivedDesc();
        updateContextCounter();
        autoSave();
      });
    }
    initFpVoiceInputs();
    // Contextual-background modal — open/close wiring.
    const cxOpen  = document.getElementById('fp-context-open');
    const cxDone  = document.getElementById('fp-context-done');
    const cxClose = document.getElementById('fp-context-close');
    const cxModal = document.getElementById('fp-context-modal');
    if (cxOpen && cxModal) {
      cxOpen.addEventListener('click', () => { cxModal.hidden = false; });
      const closeIt = () => { cxModal.hidden = true; };
      if (cxDone)  cxDone.addEventListener('click', closeIt);
      if (cxClose) cxClose.addEventListener('click', closeIt);
      cxModal.addEventListener('click', (e) => {
        if (e.target === cxModal) closeIt();     // click the backdrop
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !cxModal.hidden) closeIt();
      });
    }
    renderPromptCards();
    // Same for the URL-to-a-case field.
    $('#fp-bot-url').addEventListener('input', () => {
      state.problemUrl = $('#fp-bot-url').value;
      autoSave();
    });
    // Problem parameters textarea (Modeling section)
    const pp = document.getElementById('fp-problem-parameters');
    if (pp) {
      pp.value = state.problemParameters || '';
      pp.addEventListener('input', () => {
        state.problemParameters = pp.value;
        autoSave();
      });
    }
    // Constraints + Transition function cards — same shape, reuse
    // renderNamedEqList / renderEqPreview.
    function wireNamedEqCard(nameId, formId, previewId, addBtnId, clearBtnId, listId, stateArrayName) {
      const nm  = document.getElementById(nameId);
      const fm  = document.getElementById(formId);
      const add = document.getElementById(addBtnId);
      const clr = document.getElementById(clearBtnId);
      if (!nm || !fm || !add) return;
      fm.addEventListener('input', () => renderEqPreview(formId, previewId));
      add.addEventListener('click', () => {
        const name = (nm.value || '').trim();
        const formula = (fm.value || '').trim();
        if (!name && !formula) return;
        if (!state[stateArrayName]) state[stateArrayName] = [];
        state[stateArrayName].push({ name, formula });
        nm.value = ''; fm.value = '';
        autoSave();
        renderNamedEqList(listId, stateArrayName, nameId, formId, previewId);
        renderEqPreview(formId, previewId);
        nm.focus();
      });
      if (clr) clr.addEventListener('click', () => {
        nm.value = ''; fm.value = '';
        renderEqPreview(formId, previewId);
      });
      renderNamedEqList(listId, stateArrayName, nameId, formId, previewId);
    }
    wireNamedEqCard('fp-constraint-name', 'fp-constraint-formula', 'fp-constraint-preview',
                    'fp-constraint-add',  'fp-constraint-clear',   'fp-constraint-list',
                    'constraints');
    wireNamedEqCard('fp-transition-name', 'fp-transition-formula', 'fp-transition-preview',
                    'fp-transition-add',  'fp-transition-clear',   'fp-transition-list',
                    'transitionEquations');

    // Performance metric equations card (Modeling section)
    const eqSel  = document.getElementById('fp-metric-eq-select');
    const eqLbl  = document.getElementById('fp-metric-eq-label');
    const eqForm = document.getElementById('fp-metric-eq-formula');
    if (eqSel && eqLbl && eqForm) {
      eqSel.addEventListener('change', () => {
        // Switching metric — repaint label + formula fields, and preview.
        renderMetricEquationsCard();
      });
      eqLbl.addEventListener('input', () => {
        const m = eqSel.value;
        if (!m) return;
        const v = eqLbl.value.trim();
        if (v) state.metricLabels[m] = v;
        else delete state.metricLabels[m];
        autoSave();
      });
      eqForm.addEventListener('input', () => {
        const m = eqSel.value;
        if (!m) return;
        const v = eqForm.value;
        if (v.trim()) state.metricEquations[m] = v;
        else delete state.metricEquations[m];
        autoSave();
        renderMetricEquationPreview();
      });
      // On blur of formula, also refresh the list — a newly-added
      // equation should show up in the summary immediately.
      eqForm.addEventListener('blur', () => renderMetricEquationsCard());
    }
    // Time step + horizon inputs — 4 total controls. Any change writes
    // state, autosaves, and re-runs the derived "= N periods" hint.
    function pushTimeSpec(kind) {
      const v = $('#fp-' + kind + '-value').value;
      const u = $('#fp-' + kind + '-unit').value;
      const key = kind === 'time-step' ? 'timeStep' : 'horizon';
      state[key] = { value: v, unit: u };
      autoSave();
      updateHorizonDerived();
    }
    $('#fp-time-step-value').addEventListener('input', () => pushTimeSpec('time-step'));
    $('#fp-time-step-unit').addEventListener('change', () => pushTimeSpec('time-step'));
    $('#fp-horizon-value').addEventListener('input', () => pushTimeSpec('horizon'));
    $('#fp-horizon-unit').addEventListener('change', () => pushTimeSpec('horizon'));
    $('#fp-metrics-input').addEventListener('input',       syncMetricsFromTextarea);
    $('#fp-decisions-input').addEventListener('input',     () => syncListFromTextarea('decision'));
    $('#fp-uncertainties-input').addEventListener('input', () => syncListFromTextarea('uncertainty'));
    const upLevelBtn = $('#fp-decision-up-level');
    if (upLevelBtn) upLevelBtn.addEventListener('click', goUpOneLevel);
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
        title: '', scope: '', description: '', problemDescription: '', problemUrl: '', problemNotes: '', problemNotesSource: '', problemParameters: '', metricLabels: {}, metricEquations: {}, constraints: [], transitionEquations: [], timeStep: { value: '', unit: '' }, horizon: { value: '', unit: '' },
        metrics: [], assignments: {}, chipColors: {},
        decisions: [], matrix: {}, decisionKinds: {}, decisionTimings: {}, subframes: {}, playConfigs: {},
        uncertainties: [], uMatrix: {}, uncertaintyScopes: {}, uncertaintyKinds: {}, uncertaintyTimings: {},
      };
      currentPath = [];
      setCurrentName(null);
      setDocTitle(null);   // wipe the banner too
      renderPromptCards();
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
    // File → Save: mirrors the library-bar green Save button. If the
    // current framing is already server-backed, saves in place; if
    // nothing exists on the server yet (blank workspace, AI draft,
    // imported JSON) falls through to Save as… — matching the standard
    // Word convention where hitting Save on a never-saved doc opens
    // the Save-as dialog.
    $('#fp-menu-save').addEventListener('click', () => {
      closeFileMenu();
      if (loadedNode && loadedNode.writeToken && loadedNode.currentFramingId) {
        saveCurrentFramingToServer();
      } else {
        publishToLibrary();
      }
    });
    $('#fp-menu-publish').addEventListener('click', () => {
      closeFileMenu();
      publishToLibrary();
    });
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
      const regenBtn = $('#fp-library-regenerate');
      if (regenBtn) regenBtn.addEventListener('click', regenerateLoadedLibraryUrls);
      const delBtn = $('#fp-library-delete');
      if (delBtn) delBtn.addEventListener('click', deleteLoadedLibrary);
      const treeRefreshBtn = $('#fp-tree-refresh');
      if (treeRefreshBtn) treeRefreshBtn.addEventListener('click', reloadCurrentNodeTree);
      const takeOverBtn = $('#fp-lease-take-over');
      if (takeOverBtn) takeOverBtn.addEventListener('click', () => {
        if (!confirm('Take control of this library from the current editor?\n\nTheir next save will fail; they can take control back if they need to.')) return;
        claimOrRefreshLease(true);
      });
    })();
    // Best-effort lease release on tab close / navigation away.
    window.addEventListener('pagehide', releaseLeaseOnUnload);
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
        title: '', scope: '', description: '', problemDescription: '', problemUrl: '', problemNotes: '', problemNotesSource: '', problemParameters: '', metricLabels: {}, metricEquations: {}, constraints: [], transitionEquations: [], timeStep: { value: '', unit: '' }, horizon: { value: '', unit: '' },
        metrics: [], assignments: {}, chipColors: {},
        decisions: [], matrix: {}, decisionKinds: {}, decisionTimings: {}, subframes: {}, playConfigs: {},
        uncertainties: [], uMatrix: {}, uncertaintyScopes: {}, uncertaintyKinds: {}, uncertaintyTimings: {},
      };
      currentPath = [];
      setCurrentName(null);
      setDocTitle(null);   // also wipe the banner
      renderPromptCards();
      $('#fp-metrics-input').value       = '';
      $('#fp-decisions-input').value     = '';
      $('#fp-uncertainties-input').value = '';
      render(); renderAllMatrices(); autoSave();
    });
    $('#fp-print').addEventListener('click', () => window.print());
    // Help — open the floating Ask Professor Powell panel WITHOUT
    // scrolling the page. Multiple entry points (toolbar "? Help",
    // per-section "? Ask" buttons, always-visible "?" launcher bubble)
    // all funnel through openChatPanel so users can invoke help from
    // wherever they are on the page.
    function openChatPanel() {
      const p = document.getElementById('fp-chat-panel');
      const l = document.getElementById('fp-chat-launcher');
      if (p) p.hidden = false;
      if (l) l.hidden = true;
      // Prod the widget to re-measure now that its container is visible
      // (chat widgets typically measure dimensions on mount and don't
      // re-check when a display:none ancestor becomes visible).
      try { window.dispatchEvent(new Event('resize')); } catch (_) {}
      // Focus the chat input after a brief settle so the widget has
      // rendered its input (it may render lazily inside a hidden div).
      setTimeout(() => {
        const chatEl = document.querySelector(
          '#castle-chat-inline textarea, #castle-chat-inline input[type="text"]'
        );
        if (chatEl && typeof chatEl.focus === 'function') chatEl.focus();
      }, 250);
    }
    function closeChatPanel() {
      const p = document.getElementById('fp-chat-panel');
      const l = document.getElementById('fp-chat-launcher');
      if (p) p.hidden = true;
      if (l) l.hidden = false;
    }
    $('#fp-help').addEventListener('click', openChatPanel);
    const chatLauncher = $('#fp-chat-launcher');
    if (chatLauncher) chatLauncher.addEventListener('click', openChatPanel);
    const chatClose = $('#fp-chat-panel-close');
    if (chatClose) chatClose.addEventListener('click', closeChatPanel);
    // Delegated: every per-section "? Ask" button opens the same panel.
    document.addEventListener('click', (e) => {
      if (e.target && e.target.matches && e.target.matches('.fp-section-help')) {
        openChatPanel();
      }
    });
    // Per-matrix First-draft / Reset buttons (delegated: covers both matrices).
    document.addEventListener('click', (e) => {
      const draft = e.target.closest('.fp-matrix-draft');
      if (draft) {
        if (draft.id === 'fp-pyramid-draft') { runPyramidDraft(); return; }
        const k = draft.dataset.kind;
        if (k === 'decision' || k === 'uncertainty') runMatrixDraft(k);
        return;
      }
      const reset = e.target.closest('.fp-matrix-reset');
      if (reset) {
        if (reset.id === 'fp-pyramid-reset') { resetPyramid(); return; }
        const k = reset.dataset.kind;
        if (k === 'decision' || k === 'uncertainty') resetMatrix(k);
        return;
      }
      const ideas = e.target.closest('.fp-ideas-btn');
      if (ideas) {
        const k = ideas.dataset.kind;
        if (k === 'decision' || k === 'uncertainty' || k === 'metric') openIdeaBox(k);
        return;
      }
      // (gen)/(spec) mode toggle next to Generate ideas — flips which
      // mode the next click fires, and updates the pair's active state.
      const modeBtn = e.target.closest('.fp-ideas-mode-btn');
      if (modeBtn) {
        const k = modeBtn.dataset.kind;
        const m = modeBtn.dataset.mode;
        if ((k === 'decision' || k === 'uncertainty') && (m === 'gen' || m === 'spec')) {
          ideasMode[k] = m;
          const group = modeBtn.parentElement;
          if (group) {
            group.querySelectorAll('.fp-ideas-mode-btn').forEach(b => {
              b.classList.toggle('is-active', b === modeBtn);
            });
          }
        }
      }
    });
    // Decision-types filter modal wiring.
    (function wireDecisionTypesModal() {
      const openBtn = $('#fp-decision-types-btn');
      if (openBtn) openBtn.addEventListener('click', openDecisionTypesModal);
      const closeBtn = $('#fp-decision-types-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', closeDecisionTypesModal);
      const okBtn = $('#fp-decision-types-ok');
      if (okBtn) okBtn.addEventListener('click', commitDecisionTypesModal);
      const allBtn = $('#fp-decision-types-all');
      if (allBtn) allBtn.addEventListener('click', () => decisionTypesSetAll(true));
      const noneBtn = $('#fp-decision-types-none');
      if (noneBtn) noneBtn.addEventListener('click', () => decisionTypesSetAll(false));
      const suggestBtn = $('#fp-decision-types-suggest');
      if (suggestBtn) suggestBtn.addEventListener('click', suggestDecisionTypes);
      const modal = $('#fp-decision-types-modal');
      if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) commitDecisionTypesModal(); });
      updateDecisionTypesBtn();
    })();
    // Uncertainty-types filter modal wiring (parallel to decisions).
    (function wireUncertaintyTypesModal() {
      const openBtn = $('#fp-uncertainty-types-btn');
      if (openBtn) openBtn.addEventListener('click', openUncertaintyTypesModal);
      const closeBtn = $('#fp-uncertainty-types-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', closeUncertaintyTypesModal);
      const okBtn = $('#fp-uncertainty-types-ok');
      if (okBtn) okBtn.addEventListener('click', commitUncertaintyTypesModal);
      const allBtn = $('#fp-uncertainty-types-all');
      if (allBtn) allBtn.addEventListener('click', () => uncertaintyTypesSetAll(true));
      const noneBtn = $('#fp-uncertainty-types-none');
      if (noneBtn) noneBtn.addEventListener('click', () => uncertaintyTypesSetAll(false));
      const suggestBtn = $('#fp-uncertainty-types-suggest');
      if (suggestBtn) suggestBtn.addEventListener('click', suggestUncertaintyTypes);
      const modal = $('#fp-uncertainty-types-modal');
      if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) commitUncertaintyTypesModal(); });
      updateUncertaintyTypesBtn();
    })();
    // Idea-box modal wiring.
    (function wireIdeaBox() {
      const modal = $('#fp-ideas-modal');
      if (!modal) return;
      const dismiss = () => { modal.hidden = true; };
      $('#fp-ideas-modal-close').addEventListener('click', dismiss);
      $('#fp-ideas-cancel').addEventListener('click', dismiss);
      modal.addEventListener('click', (e) => { if (e.target === modal) dismiss(); });
      $('#fp-ideas-select-all').addEventListener('click', () => ideasSelectAll(true));
      $('#fp-ideas-select-none').addEventListener('click', () => ideasSelectAll(false));
      $('#fp-ideas-regenerate').addEventListener('click', runIdeasFetch);
      $('#fp-ideas-add').addEventListener('click', ideasApply);
    })();
    // Play modal wiring — discrete-choice human-in-the-loop simulator.
    (function wirePlayModal() {
      const modal = $('#fp-play-modal');
      if (!modal) return;
      $('#fp-play-close').addEventListener('click', closePlayModal);
      $('#fp-play-done').addEventListener('click', closePlayModal);
      modal.addEventListener('click', (e) => { if (e.target === modal) closePlayModal(); });
      $('#fp-play-mode').addEventListener('change', (e) => {
        const cfg = playEnsureConfig(playCurrentDecision);
        cfg.mode = e.target.value === 'one-shot' ? 'one-shot' : 'repeated';
        autoSave();
        playRender();
      });
      $('#fp-play-alt-add').addEventListener('click', playAddAlt);
      $('#fp-play-alt-new').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); playAddAlt(); }
      });
      $('#fp-play-suggest').addEventListener('click', playSuggestSpreads);
      $('#fp-play-clear-spreads').addEventListener('click', playClearSpreads);
      $('#fp-play-reset').addEventListener('click', playReset);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closePlayModal();
      });
    })();
    // Inline rename for the current framing (banner button).
    const renameBtn = $('#fp-doc-rename-btn');
    if (renameBtn) renameBtn.addEventListener('click', renameCurrentFraming);
    // Ask Professor Powell (framing bot)
    const botBtn = $('#fp-bot-generate');
    if (botBtn) botBtn.addEventListener('click', runFramingRequest);
    const botIngest = $('#fp-bot-ingest');
    if (botIngest) botIngest.addEventListener('click', runIngest);
    const botClear = $('#fp-bot-clear');
    if (botClear) botClear.addEventListener('click', clearBotInputs);
    // Ingested-notes chip: clear button + view-notes modal.
    const notesClearBtn = $('#fp-notes-clear');
    if (notesClearBtn) notesClearBtn.addEventListener('click', clearIngestedNotes);
    const notesViewBtn = $('#fp-notes-view');
    if (notesViewBtn) notesViewBtn.addEventListener('click', showNotesModal);
    const notesModalClose = $('#fp-notes-modal-close');
    if (notesModalClose) notesModalClose.addEventListener('click', hideNotesModal);
    const notesModalOk = $('#fp-notes-modal-ok');
    if (notesModalOk) notesModalOk.addEventListener('click', hideNotesModal);
    const notesModal = $('#fp-notes-modal');
    if (notesModal) notesModal.addEventListener('click', (e) => { if (e.target === notesModal) hideNotesModal(); });
    // Show the notes chip on initial load if the loaded state has notes.
    renderNotesChip(); syncTimeSpecDom();
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
