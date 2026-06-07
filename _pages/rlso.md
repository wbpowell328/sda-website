---
layout: page
title: "Reinforcement Learning and Stochastic Optimization"
permalink: /rlso/
date: 2026-06-04
---

{% raw %}
Warren B. Powell, Professor Emeritus, Princeton University

**Citation:** Warren B. Powell, *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*, John Wiley and Sons, Hoboken, 2022 (1,100 pages).

<img src="/sda-website/assets/images/rlso/rlso-cover.jpg" alt="Cover of Warren B. Powell's book 'Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions,' John Wiley and Sons, 2022" width="240" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />
*Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* is the first textbook to offer a comprehensive, unified framework of the rich field of sequential decisions under uncertainty. Up to now, this rich problem class has been fragmented into at least 15 distinct fields that have been studied under names such as dynamic programming, stochastic programming, optimal control, simulation optimization, optimal learning, and multiarmed bandit problems. Recently these have been primarily associated with "reinforcement learning" and "stochastic optimization."

This page is organized as follows:

- [**Purchasing**](#purchasing)
- [**Audience**](#audience)
- [**Tutorial**](#tutorial) — a four-part video introduction
- [**Major book themes and features**](#themes)
- [**Chapter summaries**](#chapters)
- [**The roots of the book**](#roots)

<br clear="all" />

## Purchasing {#purchasing}

The book is available from [Amazon](https://tinyurl.com/RLSOAmazon) (at a continually varying price) or [Wiley](https://tinyurl.com/RLSOWiley). Both have their own e-book formats.

## Audience {#audience}

The book requires little more than a good course in probability and statistics / machine learning (and supporting linear algebra). There are occasional forays that draw on linear programming. The presentation is designed for people who want to plan sequential decision problems, with an emphasis on modeling and computation. Applications are drawn from numerous topics in engineering (electrical, civil, mechanical, chemical), physical sciences, computer science, social sciences, economics and finance, operations research and industrial engineering, business applications, and statistics / machine learning.

## Tutorial {#tutorial}

A four-part video tutorial (recorded March 13, 2022, based on my presentation at the Informs Optimization Society conference):

- [**Part I:** Introduction and the universal framework](https://tinyurl.com/SDAPartI)
- [**Part II:** An energy storage example, bridging machine learning to sequential decisions, and an introduction to the four classes of policies](https://tinyurl.com/SDAPartII)
- [**Part III:** The first three classes of policies — Policy function approximations (PFAs), cost function approximations (CFAs), and value function approximations (VFAs)](https://tinyurl.com/SDAPartIII)
- [**Part IV:** The fourth class, direct lookahead approximations (DLAs), followed by a discussion of how different communities in the "jungle of stochastic optimization" have been evolving to adopt all four classes of policies, ending with a pitch for courses (and even a new academic field) on sequential decision analytics](https://tinyurl.com/SDAPartIV)

## Major book themes and features {#themes}

1. Central to the book is that we are addressing sequential decision problems: *decision, information, decision, information, …* which combines making decisions over time (or iterations / experiments) under uncertainty. Every problem addressed in the dramatically growing literature on reinforcement learning can be described in this way.
2. We use a universal modeling framework with five parts (state variables, decision variables, exogenous information, transition function, and objective function) that applies to *any* sequential decision problem (the framework draws heavily from the optimal control literature). Central to the framework is optimizing over policies.
3. We introduce four (meta)classes of policies (PFAs, CFAs, VFAs, and DLAs) that we claim are universal — they include any method proposed in the literature, or used in practice. The policies are distinguished by their computational characteristics. Each of the four classes can produce an optimal policy for special problem classes, but this is rare.
4. The book is written for people who want to write software for real-world problems, using methods that scale not just in terms of size, but also complexity. Mathematical notation is designed to be translated directly into software (there is a one-to-one relationship between software and our mathematical modeling framework).
5. To help first-time readers, many sections are marked with `*` indicating they can be skipped the first time through the book. Sections marked with `**` indicate more advanced mathematics (we do not use measure-theoretic terminology, but we have a section that introduces the interested reader who would like to learn it).
6. There are over 370 exercises, organized into seven categories at the end of each chapter. These consist of review questions, modeling, computation, theory, problem solving, problems drawn from the companion volume *[Sequential Decision Analytics and Modeling](/sda-website/sdamodeling/)* (with supporting [Python modules](http://tinyurl.com/sdagithub)), and finally a "diary" problem that the reader chooses in chapter 1, and then uses to answer a question at the end of each chapter. This allows readers to work on an application familiar to them.
7. There is a [supplementary materials webpage here](http://tinyurl.com/RLSOsupplement).

## Chapter summaries {#chapters}

Below I briefly summarize each chapter. Individual chapters can be downloaded by clicking on the link for that chapter. These are pre-publication versions of chapter 1 (Introduction), chapter 9 (on modeling), and chapter 11 (which summarizes the four classes of policies). The page numbers do not agree with the published version.

[Table of contents](https://castle.princeton.edu/wp-content/uploads/2022/04/RLSO-Table-of-Contents-WIley-format.pdf)

- [**Chapter 1 — Introduction**](http://tinyurl.com/RLSOchapter1). The book presents a new universal framework for sequential decisions under uncertainty, where the focus is designing *policies* (methods for making decisions). We present four classes of policies that cover all possible methods. Chapter 1 provides a one-chapter overview of this entire framework.
- **Chapter 2 — Canonical models and applications.** This chapter provides very brief summaries of 14 different fields that all deal with sequential decisions. We give the five-part universal framework in a bit more detail, and a series of examples.
- **Chapter 3 — Online learning.** This is a single-chapter tutorial of all the major methods for online (that is, adaptive) learning, spanning lookup tables (with independent and correlated beliefs) and parametric and nonparametric models (including neural networks).
- **Chapter 4 — Introduction to stochastic search.** This chapter talks about three strategies for solving different types of sequential decision problems: methods using deterministic mathematics (where you can compute expectations), sampled methods (where we approximate expectations with samples), and adaptive methods, which dominates the rest of the book.
- **Chapter 5 — Derivative-based stochastic optimization.** This is classic material on stochastic gradient methods, but includes a description of how to model a stochastic gradient algorithm as a sequential decision problem (the decision is the stepsize).
- **Chapter 6 — Stepsize policies.** An entire chapter dedicated to stepsize policies. We cover deterministic policies, adaptive (stochastic) policies, and then some results on *optimal* policies.
- **Chapter 7 — Derivative-free stochastic optimization.** We describe derivative-free stochastic search (also known as a multi-armed bandit problem) using our universal framework (since it is a sequential decision problem), and then outline examples of all four classes of policies that have been applied to this broad problem class.
- **Chapter 8 — State-dependent problems.** This chapter provides a tour of a wide range of general dynamic problems which we call "state-dependent" problems, to distinguish them from "state-independent" problems which are the pure learning problems of chapters 5 and 7.
- [**Chapter 9 — Modeling sequential decision problems**](https://tinyurl.com/RLSOchapter9/). This chapter presents the five-part universal modeling framework, first in the context of simple problems, and then a much more detailed presentation that provides the foundation for modeling much more complex problems (think of energy systems, transportation systems, health applications, supply chains).
- **Chapter 10 — Uncertainty modeling.** We describe 12 sources of uncertainty, and then provide a brief tutorial into Monte Carlo sampling and uncertainty quantification.
- [**Chapter 11 — Designing policies**](http://tinyurl.com/RLSOchapter11). This is a much more in-depth presentation of the four classes of policies, and includes guidance on how to choose a policy class for a problem you might be working on. Chapters 12–19 cover each of the four classes in depth (chapters 14–18 are dedicated to value function approximations).
- **Chapter 12 — Policy function approximations and policy search.** We discuss the idea of PFAs in much greater depth (PFAs consist of any function class covered in chapter 3 for online learning), and describe four methods for performing a search over tunable parameters spanning derivative-free stochastic search, and three types of derivative-based methods: numerical derivatives, backpropagation (for control problems), and the policy-gradient method.
- **Chapter 13 — Cost function approximations.** Cost function approximations are parameterized optimization models. Widely used in industry on an ad-hoc basis, they have been largely overlooked by the research literature. This book is the first to deal with them as a fundamental class of policy. CFAs feature much simpler scaling issues than the simpler PFAs.
- **Chapter 14 — Exact Dynamic Programming.** This is classic material on Markov decision processes, as well as some other examples of dynamic programs that can be solved exactly, including linear quadratic regulation from optimal control.
- **Chapter 15 — Backward approximate dynamic programming.** Backward approximate dynamic programming is a relatively recent methodology (it parallels fitted value iteration for infinite horizon problems), but we have had considerable success with it. It overcomes problems with high-dimensional and/or continuous states and uncertainties and, for some problems, high-dimensional and/or continuous decisions.
- **Chapter 16 — Forward ADP I: The value of a policy.** This is from my 2011 ADP book, and introduces, for finite and infinite horizon problems, classical TD($\lambda$), approximate value iteration (single pass and double pass), LSTD and LSPE, projected Bellman minimization for linear architectures, Bayesian learning for value functions, and designing stepsizes for approximate value iteration.
- **Chapter 17 — Forward ADP II: Policy optimization.** Also from my 2011 ADP book, here we describe the rich methods for approximating value functions while simultaneously searching for policies. This, with chapter 16, is the material that was the original heart of reinforcement learning before the introduction (in this book) of the four classes of policies.
- **Chapter 18 — Forward ADP III: Convex functions.** This is methods for approximate dynamic programming where we exploit convexity (concavity for maximizing), which arises frequently with high-dimensional resource allocation problems. We show how to use Benders cuts and piecewise-linear separable and linear (in the resource variable) value function approximations that have been applied to real resource allocation problems.
- **Chapter 19 — Direct lookahead policies.** We cover both deterministic lookahead policies (most often associated with "model predictive control") and policies based on stochastic lookahead models. We describe six classes of approximation strategies, and then illustrate all four classes of policies in the context of policies to solve a lookahead model (the "policy-within-a-policy").
- **Chapter 20 — Multiagent modeling and learning.** Here we adopt our universal framework and illustrate it in the context of the rich domain of multiagent problems, beginning with two-agent problems for learning where we present our perspective on POMDPs.

<img src="/sda-website/assets/images/rlso/rlso-index-applications.jpg" alt="A scan of the 'Applications' section of the RLSO book index, showing a long alphabetical list of applications referenced in the book" width="440" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />
[**Index**](https://castle.princeton.edu/wp-content/uploads/2022/04/RLSO-Index-Wiley-format.pdf) — check out the entry "Applications." Shown to the right is a peek at the list of applications listed in the Index. These range from sketches of models to mentions of contexts where a method might apply.

<br clear="all" />

## The roots of the book {#roots}

This book used my 2011 book, [*Approximate Dynamic Programming: Solving the Curses of Dimensionality*](http://adp.princeton.edu), as a starting point. Chapter 3 on online learning evolved from chapter 8 in ADP on approximating value functions. The modeling chapter 5 from ADP is now chapter 9 (with major modifications) in RLSO. Chapter 14 in RLSO is based on the old chapter 3 on Markov decision processes, but now includes a section on optimal control and examples of dynamic programs that can be solved exactly. Chapter 15 is an entirely new chapter on backward approximate dynamic programming. Chapters 16–18 are based directly on the chapters in the ADP book for approximating value functions (they are now labeled as "Forward approximate dynamic programming"). Everything else is completely new.

Warren Powell — wbpowell328@gmail.com
{% endraw %}
