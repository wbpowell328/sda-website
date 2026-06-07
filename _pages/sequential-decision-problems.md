---
layout: page
title: "Sequential decision problems"
permalink: /sequential-decision-problems/
date: 2026-05-30
---

{% raw %}
Human processes (in fact the evolution of all living things) evolve through an alternation of decisions and information that can be depicted using:

<img src="/sda-website/assets/images/sequential-decision-problems/decisions-info-arrows.png" alt="A sequence of arrows alternating between Decisions and Information" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

We can write this mathematically as

$$S_{0},\, x_{0},\, W_{1},\, \ldots,\, S_{t},\, x_{t},\, W_{t+1},\, \ldots,\, S_{T},\, x_{T}$$

where

- $S_t =$ what we know at time $t$ when we need to make a decision.
- $x_t =$ the decision we make (which can be different types of decisions).
- $W_{t+1} =$ information that becomes available from outside our control, after we make decision $x_t$.

This view is from the perspective of a single decision-making agent; if there is more than one decision-maker, we model each one separately, along with the interactions between them.

<img src="/sda-website/assets/images/sequential-decision-problems/applications-collage.jpg" alt="A collage of application areas: trucking, financial markets, robotics, healthcare, energy, e-commerce, aviation, manufacturing" width="468" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />
We are typically evaluating our performance using one or more metrics. Decisions are made with some method we call a *policy*, which depends on the information in the state variable $S_t$. This leads to the final challenge of designing a policy that works well over time, according to the relevant performance metrics.

These simple elements form the foundation of a vast range of application settings. Our ultimate goal is to provide a general framework for improving the performance of any system, according to any metric — guided by the core observation:

<br clear="right" />

<p style="font-style: italic; font-size: 1.25rem; text-align: center; line-height: 1.6; margin: 1.5rem auto 2rem; max-width: 720px; color: #5a3e1f; white-space: nowrap;">
If you want to run a better {anything} you have to make better decisions.
</p>

<img src="/sda-website/assets/images/sequential-decision-problems/modeling-books-mosaic.jpg" alt="A mosaic of book covers spanning reinforcement learning, optimal control, stochastic programming, decision analysis, approximate dynamic programming, and related fields" width="468" align="left" style="max-width: 100%; height: auto; margin-right: 1rem; margin-bottom: 0.5rem;" />
The academic research literature has historically approached these problems using a wide range of modeling and algorithmic approaches. The books shown here use eight different notational systems, many with fundamentally different modeling approaches leading to different algorithmic strategies, often motivated by the problem settings from different fields.

In this webpage we approach sequential decision problems using a single universal modeling framework that can be used to model *any* sequential decision problem. We use a **"model first, then solve"** philosophy, which contrasts with almost all books dealing with making decisions under uncertainty.

We further divide modeling into two steps:

1. **Framing**, where we describe a problem purely in English drawing from the knowledge of domain experts. Framing answers the questions that would be needed by any mathematical model, recognizing that the vast majority of decision problems never progress to a mathematical model.
2. **Mathematical modeling**, which builds on the framing, and does not pre-suppose any particular solution strategy.

We continue this discussion under the headings:

- [Application settings](/sda-website/application-settings/)
- [The communities of sequential decision problems](/sda-website/sdp-communities/)
- [Optimal learning](/sda-website/optimal-learning/)
{% endraw %}
