---
layout: page
title: "The universal modeling framework"
permalink: /universal-modeling-framework/
date: 2026-05-30
---

{% raw %}
Each of the communities that deal with making "optimal" decisions comes with its own way of representing problems. The most popular, and easily the most successful, is the approach used in deterministic optimization. Deterministic optimization overlooks the defining feature of sequential decision problems — the arrival of new information over time — which is what pulls us into the vast domain known as **stochastic optimization**.

The problem with the many communities of stochastic optimization is that they focus on coming up with *optimal* solutions. While this works for deterministic optimization, it focuses on the wrong problem when we address sequential decision problems. Stated succinctly:

1. Deterministic optimization focuses on finding the best *decision* (typically denoted $x$).
2. With sequential decision problems, the focus should be on finding the best *policy* (a method for choosing decisions).

We start by illustrating how deterministic optimization problems are modeled. We then show how we extend this approach to sequential decision problems by focusing on finding effective (but typically not optimal) policies.

## Deterministic optimization

Deterministic optimization models consist of three elements:

1. **The decision vector**, almost always represented by $x$ — which may be a single element, or have millions of elements (referred to as "variables"). The variables may be binary (0/1), discrete (1, 2, …), or continuous.
2. **The objective function**, which we might represent as a general function $C(x)$ that may be linear or nonlinear, smooth or with jumps.
3. **Constraints**, which is how we specify the values that $x$ is allowed to take. The most common form is typically written as a set of linear equations:

$$Ax = b$$

$$x \geq 0$$

This modeling framework has been very successful, but it fails to capture the dynamics of any problem that is evolving over time (which is true of the vast majority of problems), and it does not include modeling uncertainty.

Despite these limitations, the deterministic modeling framework follows a style that we strictly adhere to: **model first, then solve**. This means that before we determine the best value of $x$, you need to create a model, and *then* choose an algorithm to find the optimal solution.

## Modeling sequential decision problems

We apply the "model first, then solve" philosophy used in deterministic optimization — with the exception that we are searching for good **policies** $X^\pi(S_t)$, which are functions that determine the decisions $x_t$.

Instead of the three elements illustrated for deterministic optimization problems above, for sequential decision problems we use the following five elements:

1. **State variables** $S_t = (R_t, I_t, B_t)$ — physical state $R_t$, other information $I_t$, beliefs $B_t$.
2. **Decision variables** $x_t$ (or action $a_t$, or control $u_t$). Decisions $x_t$ are determined by a policy $X^\pi(S_t  \mid  \theta)$.
3. **Exogenous information** $W_{t+1,i}(S_t, x_t)$ for $i \in \mathcal{I}^{\inf}$ — new information that arrives between $t$ and $t+1$.
4. **State transition model** $S_{t+1} = S^M(S_t, x_t, W_{t+1})$ — how our state variable evolves given $x_t$ and $W_{t+1}$.
5. **Objective function** for finding the best policy:

$$\max_\pi F^\pi(S_0) = C(S_0, X^\pi(S_0)) + \cdots + C(S_T, X^\pi(S_T))$$

These five elements make up the **Universal Modeling Framework (UMF)**, and we claim that it can be used to model *any* sequential decision problem. Note that just as the deterministic optimization model above is the basis for searching for a good (ideally optimal) decision $x$, the UMF is the basis for searching for the best **policy** $X^\pi(S_t  \mid  \theta)$, which is rarely optimal and has to perform well according to multiple criteria.

The UMF lays the foundation for our entire approach for modeling and solving sequential decision problems, just as the prototypical framework for deterministic optimization lays the foundation for optimizing deterministic models.

## What remains to finish a model

1. **Framing** — this is where we answer three questions (in English):
   1. What are the performance metrics? This forms the basis for how we evaluate the performance of a policy.
   2. What types of decisions are being made? This is the starting point for designing the policy.
   3. What are the sources of uncertainty? This is literally the exogenous information classes $W_{t+1,i}(S_t, x_t)$ for $i \in \mathcal{I}^{\inf}$.
2. **Modeling** — now we have to build on the answers to the framing questions to create:
   1. The objective function — we have to quantify the performance metrics, which may enter the model through the objective function or constraints.
   2. A choice of policy $X^\pi(S_t  \mid  \theta)$, at least to get the process started.
   3. A way to create samples of the information processes $W_{t+1,i}(S_t, x_t)$ for $i \in \mathcal{I}^{\inf}$.
3. **Identify the state variables** — this is the information needed to compute:
   1. The performance metrics / objective function.
   2. The policy $X^\pi(S_t  \mid  \theta)$.
   3. Any information that might influence the exogenous information process $W_{t+1,i}(S_t, x_t)$ for $i \in \mathcal{I}^{\inf}$.
   4. Any information now that might be needed to compute (a), (b), and (c) in the future.
4. **Create the state transition model** $S^M(S_t, x_t, W_{t+1})$.

## What comes next?

While the universal modeling framework is quite general, it is just a model. To work in the real world, we have to address a few more issues:

1. Identifying how to pull the information needed to fill out the state variable $S_t$. This may mean using machine learning to estimate quantities and parameters that we do not know perfectly.
2. Implementing the solution — whether it is the decision $x_t$, the policy $X^\pi(S_t  \mid  \theta)$ (to make decisions continuously in the field), or the results of any analysis where the UMF is used to create a simulator.
{% endraw %}
