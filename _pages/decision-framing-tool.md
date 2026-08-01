---
title: Decision framing tool
permalink: /decision-framing-tool/
---

{% raw %}
An interactive tool for working through the decision framing process described in [Framing decision problems](/framingproblems/) and used in the [decision framing cases](/decision-framing-cases/). Create a free account, start a project (e.g. "Improving dispatch model acceptance"), and work through three steps:

1. **Build a priority pyramid of metrics** — arrange metrics into levels by importance, with left-to-right priority within each level.
2. **List the relevant decisions** — using [the 10 types of decisions](/decisionsdecisions/#types-of-decision-settings) as an optional reference.
3. **Fill in the impact matrix** — mark each decision's anticipated impact (H/M/L/N) on each metric, color-coded automatically.

<p style="font-size: 0.85rem; color: #7a6240;"><em>The first load may take up to 30 seconds while the tool wakes up.</em></p>

<p style="text-align: center; margin-top: 1.5rem;">
  <a href="https://castle-framing-app.onrender.com" target="_blank" rel="noopener" style="display: inline-block; background: #c9621e; color: #fff; font-weight: 600; padding: 0.7rem 1.4rem; border-radius: 5px; text-decoration: none;">Open the decision framing tool &rarr;</a>
</p>

<script>
  // Pre-warm the Render-hosted framing app when someone loads this page, so
  // clicking the button above doesn't hit the ~30s cold-start on Render's
  // free tier. Scoped to this page only (unlike the sitewide chatbot
  // pre-warm in _layouts/default.html) since most visitors won't need it.
  (function () {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;
    window.addEventListener("load", function () {
      setTimeout(function () {
        try {
          fetch("https://castle-framing-app.onrender.com/health", {
            method: "GET",
            mode: "no-cors",
            cache: "no-store",
            keepalive: true
          }).catch(function () { /* swallow — best-effort wake-up */ });
        } catch (e) { /* ignore */ }
      }, 500);
    });
  })();
</script>
{% endraw %}
