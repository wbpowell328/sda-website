---
layout: page
title: "Learning while doing — the cash buffer game"
permalink: /learning-while-doing/
date: 2026-08-02
---

## Introduction to the cash buffer game

A mutual-fund manager has to decide how much of the portfolio to hold in cash. Hold too little and a burst of investor redemptions forces expensive fire-sales; hold too much and you sacrifice returns on the cash cushion. There is a single control — the target cash-buffer ratio, $\theta$, expressed as a fraction of assets under management.

This is an exercise in tuning a simple policy under real-world conditions, a process we call "Learning while doing."

For an introduction to the problem, watch the [short video here](https://tinyurl.com/LearningWhileDoing/).

## To play the game

Choose the **cash-management policy** you want to tune, then the **parameter-adjustment policy** that will do the tuning. Hit **Play the game** to launch.

<div style="background:#faf5e6; border-left:4px solid #c9621e; padding:1.25rem 1.5rem; margin:1.25rem 0; border-radius:6px;">
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem 1.25rem; margin-bottom:1rem;">
    <label style="display:flex; flex-direction:column; font-size:0.9rem; color:#5a4a35;">
      <span style="font-weight:600; margin-bottom:0.35rem;">Cash-management policy</span>
      <select id="lwd-app" style="padding:6px 8px; border:1px solid #c9b891; border-radius:4px; font-size:0.95rem; background:#fff;">
        <option value="cash_balance">Cash balance — 1 parameter (θ)</option>
        <option value="cash_balance_2d">Cash balance — 2 parameters (θ_ind, θ_inst)</option>
      </select>
    </label>
    <label style="display:flex; flex-direction:column; font-size:0.9rem; color:#5a4a35;">
      <span style="font-weight:600; margin-bottom:0.35rem;">Parameter-adjustment policy</span>
      <select id="lwd-policy" style="padding:6px 8px; border:1px solid #c9b891; border-radius:4px; font-size:0.95rem; background:#fff;">
        <option value="kg">KG — offline correlated (analytic)</option>
        <option value="kg_indep">KG — offline independent</option>
        <option value="okg">KG — online correlated</option>
        <option value="okg_indep">KG — online independent</option>
        <option value="ie">IE — LCB (upper-confidence exploration)</option>
        <option value="random">Random — baseline</option>
        <option value="human">Human — I pick θ each round</option>
      </select>
    </label>
  </div>
  <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center;">
    <a id="lwd-play" href="#" target="_blank" rel="noopener"
       style="display:inline-block; background:#c9621e; color:#fff; padding:8px 20px;
              border-radius:4px; text-decoration:none; font-weight:600; font-size:0.95rem;">
      Play the game →
    </a>
    <a id="lwd-advanced" href="#" target="_blank" rel="noopener"
       style="display:inline-block; padding:8px 12px; text-decoration:none;
              color:#5a4a35; font-size:0.9rem; border-bottom:1px dashed #a08b6a;">
      Set advanced parameters first
    </a>
  </div>
  <p style="margin:0.9rem 0 0 0; font-size:0.85rem; color:#7a6a55;">
    The game is hosted separately from this site. The first load can take
    30–60 seconds while the free-tier server wakes up. Human mode requires
    the 1-parameter cash-balance app.
  </p>
</div>

<script>
(function () {
  const BASE   = 'https://learning-while-doing.onrender.com/';
  const appSel = document.getElementById('lwd-app');
  const polSel = document.getElementById('lwd-policy');
  const play   = document.getElementById('lwd-play');
  const adv    = document.getElementById('lwd-advanced');
  const humanOpt = polSel.querySelector('option[value="human"]');

  function rebuild() {
    // Human is 1-D only. If the user picks the 2-D app, disable
    // Human and swap the selection over to KG.
    const is2D = appSel.value === 'cash_balance_2d';
    humanOpt.disabled = is2D;
    if (is2D && polSel.value === 'human') polSel.value = 'kg';

    const qs = 'app=' + encodeURIComponent(appSel.value) +
               '&policy=' + encodeURIComponent(polSel.value);
    play.href = BASE + '?' + qs + '&auto=1';
    adv.href  = BASE + '?' + qs;
  }

  appSel.addEventListener('change', rebuild);
  polSel.addEventListener('change', rebuild);
  rebuild();
})();
</script>

## What you will see

The parameter-adjustment policies you can pick from:

| Policy | What it does |
| --- | --- |
| **Human** | You pick each value of $\theta$ yourself. Between rounds, a posterior-belief plot updates so you can see where the model thinks the minimum lies. |
| **KG (Knowledge Gradient)** | An automated policy that picks the $\theta$ whose next observation is expected to move the estimated best decision the most. Four variants (offline/online × correlated/independent) let you compare the closed-form KG against its sequential and independent siblings. |
| **IE (Interval Estimation)** | An uncertainty-driven exploration policy — picks the $\theta$ whose upper (optimistic) confidence bound is best. |
| **Random** | A baseline that samples $\theta$ uniformly. Useful as a sanity check against the two informed policies. |

Once inside the game, the top control bar sets the starting $\theta$, the run length (days), and how many policy-driven iterations to repeat before stopping. Each iteration shows the cost you incurred, the day-by-day cash balance, and the log of large-flow jump events. After a run you can click **Reveal truth** to plot the estimated underlying cost curve and see how far the policy's best guess sits from the true minimum.

## Why it illustrates optimal learning

This is a small, transparent instance of the core sequential-learning problem: you have a limited budget of experiments to reduce your uncertainty about an unknown function, and you have to choose *where* to experiment next. Pin the seed, run each mode in turn, and you can see — in one afternoon — the difference between exploring blindly, exploring informatively, and letting a Bayesian model tell you where the next dollar of experimentation buys the most information.

The four policy modes correspond directly to the classes discussed on the [Optimal learning](/optimal-learning/) page.

## Credits

Based on code written by Jonathan Wong.
