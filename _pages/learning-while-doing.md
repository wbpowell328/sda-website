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

## The setup

As you see from the video (which you need to watch), there are two policies for setting how much cash to keep on hand for redemptions:

- The single-parameter version — This uses a fraction (say .07) of the total cash under management.
- The two-parameter version — Use one parameter for the individual investors, and a second parameter for the institutional investors.

We would like to determine which of these two policies are best, but both have parameters that need to be tuned. To do this, we have to choose a parameter adjustment policy from the pull-down list. Finally, there is a set of advanced parameters which can be ignored for now.

"Playing the game" involves picking a value for the policy parameters (whether it is one or two). The game then simulates a number of days and reports the total performance, which is the gains from the stock market minus transaction costs.

After one batch of observations, your chosen "parameter adjustment policy" will adjust the parameters, and run another batch. You can do this as often as you like. The game will report the performance for each batch, and the cumulative performance.

You can hit restart and start over at any time.

We recommend starting with the 1-parameter policy to get a feel for the game. Note that daily performance is very noisy, so you will learn virtually nothing from running 1 or even several weeks. Part of your challenge is to determine how long you should stay with a single parameter setting before updating it (we are not going to help you pick this). Don't be afraid to test intervals as long as 100 days, but remember — it takes 100 days to simulate 100 days in the field. This is the challenge of "learning while doing."

## To play the game

Pick a **cash-management policy**, then hit **Play the game**. Inside the game you'll choose the parameter-adjustment policy on the control bar.

<div style="background:#faf5e6; border-left:4px solid #c9621e; padding:1.25rem 1.5rem; margin:1.25rem 0; border-radius:6px;">
  <div style="display:flex; flex-wrap:wrap; gap:0.75rem 1rem; align-items:center;">
    <a id="lwd-play" href="#" target="_blank" rel="noopener"
       style="display:inline-block; background:#c9621e; color:#fff; padding:8px 20px;
              border-radius:4px; text-decoration:none; font-weight:600; font-size:0.95rem;">
      Play the game
    </a>
    <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; color:#5a4a35;">
      <span style="font-weight:600;">Cash-management policy:</span>
      <select id="lwd-app" style="padding:6px 8px; border:1px solid #c9b891; border-radius:4px; font-size:0.95rem; background:#fff;">
        <option value="cash_balance">Cash balance — 1 parameter (θ)</option>
        <option value="cash_balance_2d">Cash balance — 2 parameters (θ_ind, θ_inst)</option>
      </select>
    </label>
    <span style="flex:1;"></span>
    <a id="lwd-advanced" href="#" target="_blank" rel="noopener"
       style="display:inline-block; padding:8px 12px; text-decoration:none;
              color:#5a4a35; font-size:0.9rem; border-bottom:1px dashed #a08b6a;">
      Advanced parameters
    </a>
  </div>
  <p style="margin:0.9rem 0 0 0; font-size:0.85rem; color:#7a6a55;">
    The game is hosted separately from this site. The first load can take
    30–60 seconds while the free-tier server wakes up.
  </p>
</div>

<script>
(function () {
  const BASE   = 'https://learning-while-doing.onrender.com/';
  const appSel = document.getElementById('lwd-app');
  const play   = document.getElementById('lwd-play');
  const adv    = document.getElementById('lwd-advanced');

  function rebuild() {
    const qs = 'app=' + encodeURIComponent(appSel.value);
    play.href = BASE + '?' + qs + '&auto=1';
    adv.href  = BASE + '?' + qs;
  }

  appSel.addEventListener('change', rebuild);
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
