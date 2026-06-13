---
layout: page
title: "Framing decision problems"
permalink: /framingproblems/
date: 2026-05-30
---

{% raw %}
## Jump to a section

- [The framing process](#the-framing-process)
- [Performance metrics](#performance-metrics)
- [Handling risk](#handling-risk)
- [Decisions](#decisions)
- [Uncertainties](#uncertainties)

## The framing process {#the-framing-process}

The framing step starts with answering three questions, in English:

1. What are the **performance metrics**?
2. What are the **types of decisions** (and who makes them)?
3. What are the **sources and styles of uncertainty**?

These three questions do not answer all the questions that will come up, but they are an important start. Most important is that they do not bias a problem toward any form of analytics, since typically all forms are required for complex problems.

## Performance metrics {#performance-metrics}

Decisions are evaluated using performance metrics, which come in many flavors, such as:

- **Financial metrics** — cost per unit, earnings per share.
- **Productivity metrics** — these may be measured per unit time (patients seen, units produced, miles traveled) and per unit of a resource (per person, per machine, per facility).
- **Effectiveness metrics** — strength of a material, performance of a drug, yield from a manufacturing process, mean time between failures of a machine.
- **Service performance** — how well we are serving markets or external agents, such as demand covered, performance ratings by customers, placement of students.
- **External performance ratings** — the ranking of a school, reliability of products made by a company, sales ranking, rating of hospitals.
- **Behavior metrics** — deviation between actual decisions from predetermined directions or guidelines.
- **Estimation metrics** — how well do we estimate or predict quantities (future demand, rainfall, amount in inventory) or parameters (patient diagnostics, cost of production).

Metrics need to be prioritized. An effective way to do this is to sort them into a pyramid, where metrics at the same level are comparable in priority (but perhaps prioritized left to right).

<img src="/sda-website/assets/images/framing-decision-problems/metrics-pyramid.png" alt="A pyramid of performance metrics: Unit cost at the top; Labor hours per unit, Inventory, and Downtime at the middle level; and Equipment (productivity / yield / maintenance expense / downtime), Personnel (cost per hour / training expense / turnover), and Facility (depreciation / maintenance / utilization) at the base" style="display: block; margin: 1.5rem auto; max-width: 80%; height: auto;" />

## Handling risk {#handling-risk}

There are two ways we can evaluate any performance metric:

- **On average** — this can mean total profits, cost per item, or average production per day.
- **Risk metrics** — averages account for uncertainty by smoothing variations into an average or total, but some events impact the system in such a way that it is not captured by an average. These events have to be first identified in English, and then quantified in the form of metrics that are likely in different units than the average performance.

Risk metrics can be included in the objective function (usually with a scaling factor) or handled as a constraint.

## Decisions {#decisions}

Decisions are how we change a process — whether it is an initial design decision, or operational decisions that are made over time. Decisions can be obvious (routing trucks, ordering inventory, prescribing a medication), but often they are not.

In the 1970s, a popular set of commercials promoting V8 tomato juice focused on the realization that consumers did not realize that drinking a can of soda represented a decision. The commercials were designed around the theme of people realizing after drinking their soda that "I could have had a V8!"

There are many settings in practice where we behave as if we were on autopilot, and do not realize that we could have made different choices.

A complete discussion of decisions is on the [What is a decision?](/sda-website/whatisadecision/) page.

## Uncertainties {#uncertainties}

*Uncertainty* is a word we use to describe information that will arrive to the system in the future that affects its performance in some way. Since the information has not arrived yet, we don't know what the information will contain — which means it is uncertain.

The academic community studies the process of making decisions in the presence of dynamic information processes under the broad umbrella of **stochastic optimization**.

We have identified 12 different ways that information can impact the behavior of a model or its implementation, including observational errors (does the patient have cancer?), exogenous uncertainty (weather, customer demands), prognostic uncertainty (forecasting errors), and implementation errors (people not following instructions).

A complete discussion is on the [Modeling uncertainty](/sda-website/modeling-uncertainty/) page.
{% endraw %}
