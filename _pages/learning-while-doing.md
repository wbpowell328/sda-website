---
layout: page
title: "Learning while doing — the cash buffer game"
permalink: /learning-while-doing/
date: 2026-08-02
---

<div style="background:#faf5e6; border-left:4px solid #c9621e; padding:1rem 1.25rem; margin:1.25rem 0;">
  <p style="margin:0 0 0.5rem 0;"><strong>Play the game →</strong> <a href="https://learning-while-doing.onrender.com/" target="_blank" rel="noopener">learning-while-doing.onrender.com</a></p>
  <p style="margin:0; font-size:0.9rem; color:#5a4a35;">The game is hosted separately from this site. The first load can take 30–60 seconds while the free-tier server wakes up.</p>
</div>

## What the game is

A mutual-fund manager has to decide how much of the portfolio to hold in cash. Hold too little and a burst of investor redemptions forces expensive fire-sales; hold too much and you sacrifice returns on the cash cushion. There is a single control — the target cash-buffer ratio, **C\***, expressed as a fraction of assets under management.

You do not know the true cost curve as a function of **C\***. You have to *learn* it by trying values and watching the cost you observe (a noisy, path-dependent signal from the simulated fund's flow and jump history).

## What you'll see

The dashboard lets you pick a random seed, a simulation length (weeks), and one of four modes:

| Mode | What it does |
| --- | --- |
| **Human** | You pick each value of **C\*** yourself over a 10-round budget. Between rounds, a posterior-belief plot updates so you can see where the model thinks the minimum lies. |
| **KG (Knowledge Gradient)** | An automated policy that picks the **C\*** whose next observation is expected to move the estimated best decision the most. |
| **IE (Interval Estimation)** | An uncertainty-driven exploration policy — picks the **C\*** whose upper (optimistic) confidence bound is best. |
| **Random** | A baseline that samples **C\*** uniformly. Useful as a sanity check against the two informed policies. |

Each round shows the cost you incurred, the cost breakdown (opportunity cost vs. shortfall cost from forced liquidation), the day-by-day cash balance, and the log of large-flow jump events. After a run you can click **Reveal truth** to plot the estimated underlying cost curve and see how far the policy's best guess sits from the true minimum.

## Why it illustrates optimal learning

This is a small, transparent instance of the core sequential-learning problem: you have a limited budget of experiments to reduce your uncertainty about an unknown function, and you have to choose *where* to experiment next. Pin the seed, run each mode in turn, and you can see — in one afternoon — the difference between exploring blindly, exploring informatively, and letting a Bayesian model tell you where the next dollar of experimentation buys the most information.

The four policy modes correspond directly to the classes discussed on the [Optimal learning](/optimal-learning/) page.

## Credits

Written by Jonathan Wong. Source code and documentation: [github.com/jwong3927/learning-while-doing](https://github.com/jwong3927/learning-while-doing).
