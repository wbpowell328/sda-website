---
layout: page
title: "Modeling"
permalink: /modeling/
date: 2026-05-30
---

{% raw %}
A common mistake when "solving" a problem with the computer is to start with an analytics expert who talks to domain experts, using their expertise to ask the right questions to formulate a model. This produces the process depicted below — transitioning from a real application to a mathematical model which is then implemented on a computer.

<img src="/sda-website/assets/images/modeling/problem-to-software-flow.png" alt="A flow diagram: 'From problem...' (trucks, vaccines, phones, boxes) → '...to mathematical model...' (a mathematical modeler with notation Min E[cx] subject to Ax=b, x≥0) → '...to software' (a developer at a computer)" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

This process suffers from a fundamental flaw which might be called **expertise filtering**: an analytics expert (the "mathematical modeler") tends to look at problems through the lens of their own training, which might be any of the following fields:

<img src="/sda-website/assets/images/modeling/blind-men-elephant.png" alt="The classic 'blind men and the elephant' cartoon — six experts touching different parts of an elephant and each calling it a fan, a wall, a rope, a spear, a snake, or a tree" width="480" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

- Machine learning
- Math programming
- Simulation
- Decision analysis
- Bayesian optimization

This is a classic example of the blind men and the elephant, where experts interpret a complex problem using the language of their training.

Instead of going directly from a real problem to a mathematical model followed by computer implementation, we recognize four steps to the process:

1. **The narrative** — stating the problem in the language of the problem domain.
2. **The framing step** — here we ask questions in English that capture important elements that would be needed regardless of how we would approach the problem, including whether or not we would use a computer.
3. **Mathematical modeling** — for problems which warrant the use of a model, we turn to the universal modeling framework.
4. **Computer implementation**.

These four steps are illustrated in the figure below, including the possibility of returning to the problem domain after the framing step has been completed.

<img src="/sda-website/assets/images/skill-cycle.png" alt="A four-step cycle: Describing the problem → Framing the problem (metrics, decisions, uncertainties) → The Universal Modeling Framework (state variables, decision variables, exogenous information, transition function, objective function) → Software, and back to the problem" width="600" style="display: block; margin: 1.5rem auto; max-width: 100%; height: auto; mix-blend-mode: multiply;" />

Note that these four steps do not cover all dimensions of real projects, especially those implemented in complex settings such as companies. We still need to address issues such as finding and ingesting the data, and then implementing recommendations and tracking performance.

## What this section covers

This part of the website will take you through the following steps:

- [**What is a decision?**](/sda-website/whatisadecision/) — we address the problem of identifying decisions, starting by defining what we mean by "decisions."
- [**Framing decision problems**](/sda-website/framingproblems/) — we identify the problem of choosing metrics, decisions, and uncertainties.
- [**The universal modeling framework**](/sda-website/universal-modeling-framework/) — we introduce the universal modeling framework that is the basis for how we think about sequential decision problems.
- [**State variables**](/sda-website/statevariables/) — "state variables" capture all the information we need to model our system. We show how to identify this information from the components of the model.
- [**Modeling uncertainty**](/sda-website/modeling-uncertainty/) — a major dimension of any sequential decision problem is modeling the flow of information from outside our system, which is always uncertain.

After covering this material, we then turn to the challenge of designing **policies** which determine how we make decisions.
{% endraw %}
