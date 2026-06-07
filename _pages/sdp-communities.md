---
layout: page
title: "The communities of sequential decision problems"
permalink: /sdp-communities/
date: 2026-05-30
---

{% raw %}
The first community to address making decisions over time was in the context of optimal control problems in the 1800s, but these problems were deterministic — meaning they ignored the arrival of what we call *exogenous information*. The first serious work for true sequential decision problems (decision, information, decision, information, ...) was the work of Bellman in the 1950s. This research grew under the name of "Markov decision processes."

Below we list a series of communities roughly in the order that they emerged. Some grew out of Bellman's original work, while the others trace their roots to other fields.

## Jump to a community

- [Markov decision processes](#mdp)
- [Reinforcement learning](#rl)
- [Optimal control](#optimal-control)
- [Operations research / math programming / stochastic programming](#or-mp-sp)
- [Decision analysis](#decision-analysis)
- [Stochastic search](#stochastic-search)
- [Monte Carlo simulation](#monte-carlo)

## Markov decision processes {#mdp}

Bellman was the first to address true sequential decision problems, which we model as (using our notation):

$$S_0,\, x_0,\, W_1,\, \ldots,\, S_t,\, x_t,\, W_{t+1},\, \ldots,\, S_T,\, x_T.$$

We measure performance after we make a decision using $C(S_t, x_t)$ (some applications evaluate performance after the exogenous information has arrived, which would be written $C(S_t, x_t, W_{t+1})$). Decisions are made with a policy $X^\pi(S_t)$ — the more classical notation was $\pi(S_t)$. The goal is to find the optimal policy:

$$\max_\pi\; \mathbb{E}\Big\{ \sum_{t=0}^T C(S_t,\, X^\pi(S_t)) \,\Big|\, S_0 \Big\}.$$

Bellman modeled the dynamics of the system using a one-step transition matrix given by

$$p(s' \,|\, s, x) = \text{Prob}[\, S_{t+1} = s' \,|\, S_t = s,\, x_t = x \,].$$

The one-step transition matrix was typically written as $P^\pi(x)$, with row $S_t = s$ and column $S_{t+1} = s'$. Bellman always assumed that $x_t$ was a discrete action he denoted by $a$ — which set his work off from Dantzig's research into linear programming where a decision $x$ was always a high-dimensional vector, or the optimal control community where a decision $u$ was also a continuous vector, although typically in much lower dimension than $x$.

The problem with the one-step transition matrix is that it is almost never computable, making it virtually useless as a computational tool. State variables for real applications are almost always vectors, usually with continuous elements. And while there are many problems with discrete actions, $x$ may be a vector, as it is in virtually every math programming application.

## Reinforcement learning {#rl}

Reinforcement learning was a term that grew out of the early work (circa 1900) of Pavlov in psychology, but was adopted starting in the 1950s by computer scientists as artificial intelligence started to emerge. The field exploded in interest with the work of Sutton and Barto, started in the 1980s, and especially with the publication of their first book *Reinforcement Learning: An Introduction* in 1998.

Reinforcement learning was developed by Sutton and Barto as a set of algorithmic techniques for approximating Bellman's equation, initially for problems with discrete states and actions. Over time the RL community started to appreciate the serious limitations of these methods and started to branch out into other approaches which we would classify as coming from each of the four classes of policies. This work is documented in the second edition of Sutton and Barto's book that appeared in 2018, where they acknowledged that not all methods had to be based on approximating value functions.

In the first edition of Sutton and Barto's book, "reinforcement learning" referred to a class of algorithms. In the second edition, the field had expanded to embrace a much wider variety of methods, and as a result "reinforcement learning" started to be associated with the problem class *sequential decision problems*.

A more in-depth discussion of the evolution of reinforcement learning is in development.

## Optimal control {#optimal-control}

The field of optimal control traces its roots to the 1800s, especially with the work of Hamilton and Jacobi who first introduced the same recursive equation later developed by Bellman. The difference was that the controls community focused primarily on deterministic problems, often in continuous time, with continuous states and controls.

In the late 1950s, Bellman and Kalman recognized that a special case — one where the objective function was quadratic in the state and control variables — could be solved analytically, but these conditions limit applicability. In 1974 Paul Werbos developed the ideas of backpropagation that served as the basis for learning general nonlinear functions (such as neural networks) by differentiating the objective function. This work would emerge under the name *approximate / adaptive dynamic programming*.

By the 1990s, the controls community (doing "ADP") started to blend with computer scientists (doing "RL"). IEEE launched a series of workshops on "ADPRL." Computer scientists began to use a series of simple control problems (typically deterministic) to test their algorithms.

## Operations research / math programming / stochastic programming {#or-mp-sp}

The math programming community (within operations research) first became involved with making decisions under uncertainty motivated by uncertainty in linear / integer programs. The work emerged in 1955 with Dantzig, who named the area *stochastic programming*. Unlike the work of Bellman or the controls community, this was not a true sequential decision problem. Rather, the problem was posed as making a single (vector-valued) decision now that recognized that decisions now impact an uncertain future.

A separate line of research evolved using the methods of Benders decomposition, specifically in the context of dynamic resource allocation problems. The impact of decisions now on the future could be approximated as a series of cuts, exploiting the property that the future was a convex (or concave if maximizing) function — cuts that could be used to create a modified linear program at time $t$. This work evolved without recognizing any relationship to Bellman's work.

In the 1990s, Professor Powell used Bellman's framework of Markov decision processes, but adapted for high-dimensional resource allocation problems. He exploited the natural concavity (he was maximizing) of the value of resources in the future from decisions made now. This allowed him to develop practical algorithms for solving real-world stochastic resource allocation problems, using the mathematical framework of Bellman's equation.

## Decision analysis {#decision-analysis}

The field of decision analysis typically assumes that there is a set of two or more discrete decisions — such as whether to launch a production or the choice of drug to send to clinical trials. After the decision there are uncertain outcomes that can be quite complex.

There are many problems that consist of a single decision, followed by uncertain outcomes, after which the problem stops. The analysis of each decision involves the various forms of uncertainty, often associated with high-impact results (large financial impacts, the risk of illness or death).

In other settings, there may be a sequence of decision, information, decision, information, ... — although these problems are typically defined over just a few time periods.

The most popular tool in decision analysis is **decision trees**. Decision trees have a close relationship to stochastic programs (developed by Dantzig):

- Both make a decision now while modeling uncertainty in the future.
- Both are policies for making a decision at a point in time. The true performance of the policy has to be evaluated in terms of how it performs over time (this is often overlooked by both communities).

However, there are significant differences:

- Decision trees always assume a small number of discrete decisions.
- Stochastic programming assumes vector-valued decisions.
- Decision trees may consist of a single decision followed by the realization of an uncertain event, but the idea can be extended to a fully sequential problem (decision, information, decision, information, ...) — although the number of time periods is typically small. Stochastic programs typically use a *two-stage* model: a (vector-valued) decision $x_0$, realization of uncertainties called *scenarios* (possibly over multiple time periods), followed by one or more decisions $x_1, \ldots, x_T$ that are allowed to see a particular scenario.

## Stochastic search {#stochastic-search}

A very common problem can be written as

$$\min_x\; \mathbb{E}_W\, F(x, W)$$

where we cannot compute the expectation exactly. Instead, we depend on our ability to simulate the objective by drawing samples of the (possibly high-dimensional) random variable $W$.

This problem class arises in many problem settings. Common variations include:

- $x$ may be discrete or continuous, scalar or vector.
- The function $F(x, W)$ may represent experiments being run in a lab or computer simulation, or trial-and-error in the field where we have to live with what we experience.
- A single experiment may be run very quickly (such as observing how many clicks a URL will receive) or slowly (testing a new price for a product; running a physical experiment in a lab; testing a new drug on a patient).

This is a sequential decision problem because we choose $x$, then observe $F(x, \widehat W)$ where $\widehat W$ represents a sample realization of whatever is random. In a pure version of the problem, the only state variable is our belief about the true function $F(x) = \mathbb{E}_W F(x, W)$. Variations can introduce physical state variables, such as setups of machines or the availability of resources needed to evaluate $F(x, \widehat W)$.

These problems are so rich that a number of different communities have evolved to address variations of this problem class:

- **Derivative-based stochastic search** (assumes we can compute gradients of $F(x, W)$ with respect to $x$).
- **Derivative-free stochastic search** (we can just test specific values of $x$).
- **Multiarmed bandit problems** (probability community).
- **Bayesian optimization**.
- **Ranking and selection** (the term used in the simulation community).
- **Optimal learning**.
- **Active learning** (used in machine learning).
- **Intelligent trial-and-error** (plain English).

## Monte Carlo simulation {#monte-carlo}

The most powerful tool that cuts across all the communities that study sequential decision problems is the Monte Carlo simulation community. So it should not be surprising that the simulation community would have its own variation of sequential decision problem.

This problem arose in the 1960s when people would use simulation to evaluate the performance of a complex system such as a manufacturing process. Not surprisingly, people would create simulation models to test out different designs, which required a certain amount of trial-and-error. This problem became known as the *ranking and selection* problem. As computers matured, people began testing multiple designs in parallel, which bypassed the original challenge when simulations had to be run in sequence.
{% endraw %}
