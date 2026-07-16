---
layout: page
title: "Modeling uncertainty"
permalink: /modeling-uncertainty/
date: 2026-05-30
---

{% raw %}
The literature on sequential decision problems (also known as dynamic programs, reinforcement learning, optimal control, stochastic search, and decision analysis) tends to focus primarily — sometimes exclusively — on making decisions. However, sequential problems are always subject to changing conditions which can be varied and complex.

In most real applications, a good policy for making decisions that works well under realistic conditions (which means accurately capturing uncertainty) is widely preferred over an optimal policy for a problem using a stylized model of uncertainty.

## Jump to a section

- [The 12 categories of uncertainty](#categories)
- [Modeling uncertainty](#modeling)
- [Simulating the information process](#simulating)
- [The flavors of uncertainty](#flavors)

## The 12 categories of uncertainty {#categories}

Chapter 10 of *Reinforcement Learning and Stochastic Optimization* identifies 12 ways that exogenous information can affect the behavior of a sequential decision problem:

1. **Observational uncertainty** — did we detect breast cancer in an X-ray? Do we know the exact location of a driver?
2. **Exogenous uncertainty** — covers the wide range of external inputs to a model, including customer demands, equipment failures, weather delays, and human behavior.
3. **Prognostic uncertainty** — errors in forecasts of future events.
4. **Inferential uncertainty** — errors in estimates of how a market responds to price changes or the condition of a piece of equipment.
5. **Experimental variability** — if we run experiments in a lab, a computer simulation, or the field, there is always variability in the results of an experiment.
6. **Model uncertainty** — we may not know how disease is being transmitted in a population, or how information about a new product is being spread among consumers.
7. **Transitional uncertainty** — a form of exogenous input affecting how the system evolves over time. A classic example is wind buffeting a drone, theft from inventory, or the evolution of the value of an investment.
8. **Implementation errors** — arise when decisions from the model are not implemented properly in the field, either from a field operative overriding an instruction (due to local information) or equipment failures (the generator failed to come on).
9. **Communication errors** — a different cause of implementation errors, arising from errors in communication, which may come from verbal communication or perhaps international interpretation.
10. **Algorithmic instability** — multiple runs of the same algorithm, even for deterministic optimization, can produce different answers for a variety of technical reasons.
11. **Goal uncertainty** — different people solving the same problem may produce different answers because they do not share the same goals.
12. **Environmental uncertainty** — "environment" spans the entire range from climate, the political climate, the state of the economy, to the emphasis of a management team.

The way to use these 12 categories is as a *guide* to identifying the forms of uncertainty that might apply to a particular problem. Below, the same checklist is applied to the game of chess, a problem of managing cash for a mutual fund, and a complex public health problem.

<div style="overflow-x: auto; margin: 1rem 0;">
<table class="uncertainty-examples">
  <thead>
    <tr>
      <th>12 Classes of uncertainty</th>
      <th>Chess</th>
      <th>Mutual fund cash management</th>
      <th>Public health</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1. Observational uncertainty</th>
      <td></td>
      <td></td>
      <td>What are infection rates</td>
    </tr>
    <tr>
      <th>2. Exogenous uncertainty</th>
      <td>Opponent behavior</td>
      <td>Deposits, redemptions, markets</td>
      <td>Mutations of the virus</td>
    </tr>
    <tr>
      <th>3. Prognostic uncertainty</th>
      <td></td>
      <td>Forecasts of deposits, redempt.</td>
      <td>Forecasting prevalent flu this fall</td>
    </tr>
    <tr>
      <th>4. Inferential uncertainty</th>
      <td></td>
      <td>Testing different policies</td>
      <td>Estimating transmission rates</td>
    </tr>
    <tr>
      <th>5. Experimental variability</th>
      <td></td>
      <td></td>
      <td>Testing dosages</td>
    </tr>
    <tr>
      <th>6. Model uncertainty</th>
      <td></td>
      <td>Updating cash on hand</td>
      <td>Modeling spread of disease</td>
    </tr>
    <tr>
      <th>7. Transitional uncertainty</th>
      <td></td>
      <td></td>
      <td>Actual disease transitions</td>
    </tr>
    <tr>
      <th>8. Implementation uncertainty</th>
      <td></td>
      <td></td>
      <td>Failure to get vaccinated</td>
    </tr>
    <tr>
      <th>9. Communication errors</th>
      <td></td>
      <td></td>
      <td>Lack of clarity in instructions</td>
    </tr>
    <tr>
      <th>10. Algorithmic instability</th>
      <td></td>
      <td></td>
      <td>Variations in algorithmic results</td>
    </tr>
    <tr>
      <th>11. Goal uncertainty</th>
      <td></td>
      <td>Max. returns, min. stock sales</td>
      <td>Minimize infections? Costs?</td>
    </tr>
    <tr>
      <th>12. Environmental uncertainty</th>
      <td></td>
      <td>Changes in interest rates</td>
      <td>Changing policies on vaccinations</td>
    </tr>
  </tbody>
</table>
</div>

<style>
.uncertainty-examples { border-collapse: collapse; font-size: 0.85rem; line-height: 1.35; width: 100%; }
.uncertainty-examples th, .uncertainty-examples td { border: 1px solid #c9a86b; padding: 0.4rem 0.55rem; vertical-align: top; }
.uncertainty-examples thead th { background: #ede0bd; color: #3d2914; font-weight: 600; text-align: left; }
.uncertainty-examples tbody th { background: #faf5e6; color: #3d2914; text-align: left; font-weight: 600; white-space: nowrap; }
.uncertainty-examples tbody tr:nth-child(even) td { background: #fbf9f4; }
</style>

A simple problem such as playing chess would have only one of these, while complex problems such as supply chain management or public health would have one or more sources in all 12 categories.

## Modeling uncertainty {#modeling}

There is considerable confusion about how to capture the effect of uncertainty on a sequential decision problem. The biggest problem is that people often focus on how to make decisions. We are going to insist on our **"model first, then solve"** philosophy — which means we focus first on modeling how the system evolves over time, leaving to later the design of the policy.

Systems evolve from the effect of decisions (that we return to later), and exogenous information that we represent using $W_{t+1}$ after making decision $x_t$ at time $t$. The exogenous information $W_{t+1}$ is best represented as a function:

$$W_{t+1,i}(S_t, x_t) = \text{the information from class } i \in \mathcal{I}^{\inf} \text{ that may depend on the current state } S_t \text{ and/or the decision } x_t.$$

(The classes $i \in \mathcal{I}^{\inf}$ are identified from the framing exercise covered earlier.)

The information $W_{t+1,i}(S_t, x_t)$ may change performance metrics, any of the parameters in our policy $X^\pi(S_t  \mid  \theta)$, or any other parameters that affect the system in the future (these enter through the state transition model).

## Simulating the information process {#simulating}

If we wish to evaluate a policy $X^\pi(S_t \mid \theta_t)$ we need to be able to simulate the system, which means we need to be able to simulate the exogenous information process $(W_1, \ldots, W_t, \ldots, W_T)$. There are three ways to do this:

1. Use historical data, which is a process known as backtesting. This is popular in finance where it is possible to use historical prices. However, you have to have a problem where decisions do not affect the exogenous information process.
2. Test a policy in the field, which is a process we call "Learning While Doing." This is the most precise way to test a policy, but it is slow (it takes a day to simulate a day) and you have to live with your mistakes.
3. When neither of the above works, you need to simulate the information process from a mathematical model. This can easily be the most difficult part of the modeling process. While generating random variables is not in itself difficult, what is hard is accurately recreating the behaviors that can happen in the field. The most difficult characteristic of a stochastic process is replicating correlations, whether it is across time (which is very common), across space, or between different information processes.

## The flavors of uncertainty {#flavors}

The evolution of the information processes $W_{t+1,i}(S_t, x_t)$ for the different information classes $i \in \mathcal{I}^{\inf}$ can come in a range of styles, such as:

- Hourly / daily variations in demands, prices, etc.
- Bursts, spikes, intermittent demands.
- Periodic changes from market shifts, competitive behavior, etc.
- Regional events (political, regulatory, weather, earthquakes, disease).
- Systemic events (cyber attacks, public perception, tariffs).
- Black swan events.
- Contingencies — events that might happen, but have not happened in the past.
- Correlations over time, space, and attributes.

The last item — correlations — is arguably the most difficult and subtle dimension of modeling information processes.
{% endraw %}
