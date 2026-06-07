---
layout: page
title: "State variables"
permalink: /statevariables/
date: 2026-05-30
---

{% raw %}
The dynamic programming community (specifically Markov decision processes) has avoided coming up with a proper definition of a state variable dating back to Bellman. The renowned probabilist Erhan Cinlar — a colleague of mine at Princeton — answered my question "What is a state variable?" with the response: *"Ahhh… that which cannot be defined."*

This webpage provides some background on a topic that has long been overlooked: defining a state variable. This discussion is organized under the following:

- [**Some attempts at definitions**](#some-attempts-at-definitions) — three of the most-cited attempts, none of which actually pin the concept down.
- [**Defining state variables**](#defining-state-variables) — a workable definition built around the three functions that any model of a sequential decision problem needs to evaluate.
- [**Flavors of state variables**](#flavors-of-state-variables) — three categories of information that any state variable may carry: physical, informational, and belief.
- [**A history of state variables**](#a-history-of-state-variables) — how the MDP, RL, theoretical, and optimal-control communities have (and have not) defined the concept over the past two centuries.

State variables are important because they describe what information is needed to solve a problem.

## Some attempts at definitions

- **Bellman's classic text on dynamic programming (1957)** describes the state variable with:
  > "… we have a physical system characterized at any stage by a small set of parameters, the *state variables.*"
- **The most popular book on dynamic programming (Puterman, 1994, p. 18)** "defines" a state variable with the following sentence:
  > "At each decision epoch, the system occupies a *state*."
- **Wikipedia**:
  > "A state variable is one of the set of variables that are used to describe the mathematical 'state' of a dynamical system."

## Defining state variables

The lack of a proper definition is not universal. Two books on optimal control — Kirk (2004) and Cassandras and Lafortune (2008) — both use:

> "A state variable is all the information you need at time $t$ to model the system from time $t$ onward."

This definition is absolutely true; all that is missing is a description of *what* information is needed.

For that, I offer the following definition (RLSO, Chapter 9):

> **State variable (policy-dependent version)** — a function of history that is necessary and sufficient to compute:
>
> 1. The cost / contribution function $C(S_t, x_t)$.
> 2. The decision function (the policy) $X^\pi(S_t)$.
> 3. Any information required by the transition function to model the information needed for the cost/contribution and decision functions in the future,
>
> $$S_{t+1} = S^M(S_t,\, x_t,\, W_{t+1}(S_t, x_t)).$$

There is a slightly different definition if a policy is not specified.

What is key is that we just have to look at three functions (and possibly a fourth) to identify the information that is needed:

- The performance metric $C(S_t, x_t)$.
- The policy $X^\pi(S_t)$.
- The transition function $S^M(S_t, x_t, W_{t+1})$.
- The exogenous information process $W_{t+1}(S_t, x_t)$ if it depends on the state $S_t$ and/or the decision $x_t$.

An example of information needed by the transition function can be illustrated by modeling prices using a time-series model given by

$$p_{t+1} = \theta_0 p_t + \theta_1 p_{t-1} + \theta_2 p_{t-2} + \varepsilon_{t+1}.$$

A common mistake is to assume that the "state" of this dynamic system is $p_t$, while $p_{t-1}$ and $p_{t-2}$ represent the history. This is not true. The state of the price process is given by

$$S_t^{\text{price}} = (p_t,\, p_{t-1},\, p_{t-2}).$$

The prices $p_{t-1}$ and $p_{t-2}$ are only needed to create estimates of $p_{t+1}$ and $p_{t+2}$, both of which will be needed in the performance metric.

## Flavors of state variables

In our work it has been helpful to classify state variables into three categories:

- **The resource state variable** $R_t$ — contains quantities of different types of resources: people, machines, inventory, equipment, water, chemicals, and money.
- **The information state variable** $I_t$ — carries information about values and parameters (and possibly functions).
- **Belief state variables** $B_t$ — contain the necessary statistics of estimates for any quantity or value that we do not know perfectly.

A state variable may consist purely of any one of these three, or any combination of two or more, or all three. Examples of all of these can be found in *Sequential Decision Analytics and Modeling* (see in particular the discussion of state variables in chapter 7).

It is important to distinguish between the **initial state variable** $S_0$ and the **dynamic state variables** $S_t$ for $t \geq 0$:

- The **initial state variable** $S_0$ includes:
  - Initial values of any information that evolves over time.
  - Static parameters that never change over time.
- The **dynamic state variables** $S_t$ consist of all information that may change over time, either as a result of decisions and/or exogenous information.

State variables can be as simple as a node in a network, but for most applications they can be complex vectors of discrete and continuous values. When the state information includes statistical estimates (beliefs), it may be necessary to carry large matrices carrying information about correlations.

It is important to *stop* thinking of state variables as a node in a network, or the state of a game board. **State variables are information, and information can be complicated.**

## A history of state variables

The concept of state variables goes back 200 years, yet the mathematical communities that use this concept have avoided offering a definition. The presentation below captures some of this colorful and surprising history.

### Definitions from the MDP community

Some "definitions" of state variables:

- Bellman's seminal text [Bellman (1957), p. 81] says "… we have a physical system characterized at any stage by a small set of parameters, the *state variables*." (Italics are from the original text.)
- Puterman first introduces a state variable by saying [Puterman (2005), p. 18] "At each decision epoch, the system occupies a *state*." (Italics are from the original text.)
- From Wikipedia: "A **state variable** is one of the set of variables that are used to describe the mathematical 'state' of a dynamical system." (The next sentence says: "Intuitively, the state of a system describes enough about the system to determine its future behavior in the absence of any external forces affecting the system." But we can still define state variables in the presence of exogenous information flows, so this statement is not accurate either.)

Let me first start by asking: didn't we all learn in grade school that we do not use the word we are defining in its definition??!!

### A definition from the RL community

The reinforcement learning literature inherited the style of not defining state variables from the literature on Markov decision processes, but a notable exception is the second edition of Sutton and Barto's *Reinforcement Learning: An Introduction*. While they never explicitly define a state variable, they offer descriptions:

- On p. 7, under section 1.4 *Limitations and Scope*, the authors note: "…we encourage the reader to follow the informal meaning and think of the state as whatever information is available about its environment."
- In chapter 3 they then say [p. 49] "The state must include information about all aspects of the past agent–environment interaction that make a difference for the future."

The first bullet seems to suggest that all available information (about the environment) is in the state variable, but does not define "environment." The second bullet includes the condition "that make(s) a difference for the future." Keep reading.

### From some theoreticians

I have spoken to numerous mathematicians (in stochastic control/optimization) who will insist "but I know what a state variable is." Consider the following anecdotes of statements made by some of the best known names in the field:

- From *Probability and Stochastics* by Erhan Cinlar (2011) — a former colleague at Princeton and one of the best known probabilists in the field: "The definitions of 'time' and 'state' depend on the application at hand and on the demands of mathematical tractability. Otherwise, if such practical considerations are ignored, every stochastic process can be made Markovian by enhancing its state space sufficiently."
- From Bertsekas' *Dynamic Programming and Optimal Control: Approximate Dynamic Programming* (4th edition, 2012): "…we assume that at each time *k*, the control is applied with knowledge of the current state $x_k$. Such policies are called *Markov* because they do not involve dependence on states beyond the current. However, what if the control were allowed to depend on the entire past history $h_k = \{x_0, u_0, \ldots, x_{k-1}, u_{k-1}, x_k\}$ which ordinarily would be available at time *k*. Is it possible that better performance can be achieved in this way?" (WBP: if this were the case, then there is information from "history" that is needed to make decisions, so why isn't this included in the state variable?)
- In Puterman's wonderful book *Markov Decision Processes*, on p. 97 he presents a graph problem that involves finding the path through a network that minimizes the *second highest* cost on the path (rather than the sum of the costs). He then goes on to argue that Bellman's optimality equation no longer works! This is because he changes how costs are calculated, but still assumes the state of the system is the node where a traveler is located. The problem is that with the revised cost metric, you also have to keep track of the two highest costs on the path the traveler has traversed, because this is what is needed to determine whether a cost on the next arc is one of the top two.
- From Sean Meyn's *Control Systems and Reinforcement Learning*, Sean states (p. 12): "In statistics, the term *sufficient statistic* is used to denote a quantity that summarizes all past observations. The *state* plays an analogous role in control theory." It is popular for theoreticians to "define" a state variable as a sufficient statistic, but this is just replacing one piece of terminology with another, that still needs to be defined.
- Two mathematical books on optimal control, one by René Carmona, and one by Fleming and Soner, while using very sophisticated mathematics never actually define a state variable.

<img src="/sda-website/assets/images/statevariables/soner-carmona-theorem.png" alt="Side-by-side images: the covers of Fleming and Soner's 'Controlled Markov Processes and Viscosity Solutions' and René Carmona's 'Lectures on BSDEs, Stochastic Control, and Stochastic Differential Games with Financial Applications,' next to a scan of the section 'The Optimization Problem' that defines a cost functional without defining a state variable" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

If we agree that a state is all the information you need to model the system from time *t* onward, then the system is, by definition (and by construction) Markovian. Further, you would never need information from history since again, by definition (and by construction), the state variable already has any information that may have arrived before time *t* (or "time" *k*). So there is no need to "expand the state space sufficiently," nor any need to depend on history.

> *Side note:* a talented post-doc in my lab posed the question: what if we simply do not know all the information we need? This raises subtle issues that are more than I can cover on a webpage. See note (vii) on page 483 of [RLSO](https://tinyurl.com/RLandSO/) (following the definition of states), and section 20.2 in [RLSO](https://tinyurl.com/RLandSO/) which uses a two-agent model of flu mitigation to illustrate the setting of when a controlling agent does not know the environment.

### Definitions from optimal control

Now look at some definitions in books on optimal control:

- From Kalman's 1963 paper ["Mathematical Description of Linear Dynamical Systems" (SIAM J. on Control)](https://castle.princeton.edu/wp-content/uploads/2025/01/Kalman-Mathematical-description-of-linear-dynamical-systems-1963-1.pdf), he has the statement below. Note that he correctly describes a state variable as "the minimal amount of information about the past history," which is quite general, but illustrates it using the position and momentum of particles, which reflects the common tendency to equate "state" with "physical state."

<img src="/sda-website/assets/images/statevariables/kalman-state-variable.jpg" alt="Scan of a paragraph from Kalman's 1963 paper: 'In modern terminology, we say that the numbers which specify the instantaneous position and momentum of each particle represent the state of the system. The state is to be regarded always as an abstract quantity. Intuitively speaking, the state is the minimal amount of information about the past history of the system which suffices to predict the effect of the past upon the future. Further, we say that the forces acting on the particles are the inputs of the system. Any variable in the system which can be directly observed is an output.'" style="display: block; margin: 1rem auto; max-width: 68%; height: auto;" />

- From Kirk (2004): "A state variable is a set of quantities $x_1(t), x_2(t), \ldots$, which if known at time *t*, are determined for $t \geq t_0$ by specifying the inputs for the system for $t \geq t_0$."
- From Cassandras and Lafortune (2008): "The *state* of a system at time $t_0$ is the information required at time $t_0$ such that the output [cost] $y(t)$ for all $t \geq t_0$ is uniquely determined from this information and from $u(t)$."

Each of these definitions can be restated simply as:

> The state is all the information you need at time *t* to model the system from time *t* onward.

This definition is also consistent with Sean Meyn's characterization of state variables (given above) as "sufficient statistics" which is just another way of saying the definition above.

Both of the definitions above understand that to model the system moving forward, you need the controls $u(t)$ (presumably determined by a "control law" or "policy") as well as any exogenous (random) information. These definitions appear to be standard in optimal control.

I like the characterization, widely used in books on optimal control, that the state variable is all the information you need to model the system from time *t* onward, regardless of *when* the information arrived! My only complaint is that it needs to be more explicit.

### But what if there is missing information?

In a mathematical statement of a problem, we can design a state variable that includes all the information needed to meet the three requirements I outlined above. But what if we simply do not have access to some information?

Some examples of missing information are:

- An electrical power transformer ages with the number of times voltage surges (e.g. from lightning) pass through the device. However, we are not able to directly observe either the number of lightning strikes, or the deterioration of the materials within the transformer.
- One way to optimize inventories is to discount the price, but we don't know how the market responds to these price changes.

Missing the information about the age of materials within the transformer, or how the market responds to prices, makes it impossible to model the forward trajectory of the system. How do we construct a state variable that meets the requirements in all the above definitions to include *all* the information needed to model the system forward in time?

What we do is to replace the information with a probabilistic belief. This may be based on frequentist or Bayesian modeling, which means it has to be more than just a point estimate — it has to include a probability distribution of the missing information.
{% endraw %}
