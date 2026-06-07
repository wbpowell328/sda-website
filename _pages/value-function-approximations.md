---
layout: page
title: "Value function approximations (VFAs)"
permalink: /value-function-approximations/
date: 2026-05-30
---

{% raw %}
The class of policies that have received the most attention in the research literature, but are one of the least used in practice, are those based on Bellman's equation — which depend on the use of **value function approximations** to capture the impact of a decision now on the future.

Let's back up. It all starts by deriving Bellman's equation.

## Bellman's optimality equation

We start by writing our objective function to maximize total contributions (we could minimize total costs) over all policies:

$$\max_\pi \mathbb{E}_W \Big\{ \sum_{t=0}^T C\big(S_t,\, X_t^\pi(S_t)\big) \,\Big|\, S_0 \Big\}$$

We can write an optimal policy by assuming we are in state $S_t$ at time $t$, and finding the decision $x_t$ and policy $\pi$ that optimize the objective from time $t$ onward:

$$X_t^*(S_t) = \arg\max_{x_t} \Big( C(S_t, x_t) + \mathbb{E}_{W_{t+1}} \Big\{ \max_\pi \Big\{ \mathbb{E}_{W_{t+2}, \ldots, W_T} \sum_{t'=t+1}^T C\big(S_{t'},\, X_{t'}^\pi(S_{t'})\big) \,\Big|\, S_{t+1} \Big\} \,\Big|\, S_t,\, x_t \Big\} \Big)$$

We capture the optimal value of starting at time $t+1$ in state $S_{t+1}$ in a single **value function**:

$$V_{t+1}(S_{t+1}) = \max_\pi \Big\{ \mathbb{E}_{W_{t+1}, \ldots, W_T} \sum_{t'=t+1}^T C\big(S_{t'},\, X_{t'}^\pi(S_{t'})\big) \,\Big|\, S_{t+1} \Big\}$$

We can now write our optimal policy using

$$X_t^*(S_t) = \arg\max_{x_t} \Big( C(S_t, x_t) + \mathbb{E}_{W_{t+1}} \{ V_{t+1}(S_{t+1}) \mid S_t \} \Big)$$

This equation then leads to the recursive equations for computing the value functions $V_t(S_t)$:

$$V_t(S_t) = \max_{x_t} \Big( C(S_t, x_t) + \mathbb{E}_{W_{t+1}} \{ V_{t+1}(S_{t+1}) \mid S_t \} \Big)$$

This is known as **Bellman's equation**, where the expectation is typically written using the one-step probability transition matrix:

$$p(s' \mid s, x) = \text{Prob}[\, S_{t+1} = s' \mid S_t = s,\, x_t = x \,]$$

which allows us to write Bellman's equation as

$$V_t(S_t) = \max_{x_t} \Big( C(S_t, x_t) + \sum_{s' \in \mathcal{S}} p(s' \mid S_t, x_t) V_{t+1}(s') \Big)$$

The use of the summation rests on Bellman's assumption that the state $S_t$ is discrete, where the state space is $\mathcal{S} = \{1, 2, \ldots, |\mathcal{S}|\}$.

If the state variable $S_t$ is a discrete scalar — such as the number of items in inventory — then this equation may be computable. But this requires that the random variable $W_{t+1}$ be "simple" (a discrete scalar would be nice), and also that the decision $x_t$ be simple (such as a discrete scalar).

In practice, the state $S_t$, decision $x_t$, and exogenous information $W_{t+1}$ may all be **vectors**, possibly with some (or all) elements continuous. This is what I called the **three curses of dimensionality**, which describes the vast majority of real applications.

Even Bellman realized this problem in the 1950s, and subsequently launched a career doing theory, which formed the basis of decades of research by many who followed his lead.

## A brief history of approximating Bellman's equation

The elegance of Bellman's equation, and its computational challenges, provided the basis for generations of researchers interested in solving problems. This motivated several lines of research:

- **Optimal control** — Starting with Paul Werbos's 1974 Ph.D. dissertation on backpropagation, there has been a steady line of research using neural networks to approximate the value function for problems with continuous states and actions (typically for deterministic problems).
- **Reinforcement learning** — Initiated in the 1980s by Rich Sutton and his adviser Andy Barto, reinforcement learning exploded in computer science as a set of algorithms for problems with discrete states and actions. This work produced their foundational book *Reinforcement Learning: An Introduction* in 1998, followed by a second edition in 2018.
- **Approximate dynamic programming** — "Approximate dynamic programming" traces its origins to Bellman in a 1959 paper, but seemed to emerge with the work of Tsitsiklis and his student Ben Van Roy, who proposed the idea of replacing a value function with a linear model (comparable to linear regression). Warren Powell adopted this term for his work on high-dimensional resource allocation problems, where he used separable piecewise-linear functions to capture the marginal value of resources in the future. Powell's work was summarized in his book *Approximate Dynamic Programming: Solving the Curses of Dimensionality* in 2007, followed by a second edition in 2011.

By now there is a substantial body of research that has evolved primarily under the headings of *reinforcement learning* and *approximate dynamic programming*. A good reference is chapters 14 through 18 of *Reinforcement Learning and Stochastic Optimization*.

## Approximating value functions

There is by now an extensive literature on methods for approximating value functions. We provide here just a brief peek into one of the most popular classes of algorithms presented in textbooks.

The core idea starts by assuming that we have an iterative algorithm, and that at iteration $n$ we have a value function approximation $\bar V_t^{n-1}(S_t)$. This might be a lookup table for a discrete state $S_t = s$, or a linear or nonlinear model — even a neural network (which has become the "go-to" approximation strategy in machine learning).

Assume we are executing iteration $n$, and that we are in state $S_t^n$. We choose a decision $x_t^n$ according to some rule (known under various names: a *learning policy*, a *behavior policy*, an *exploration policy*). Often these are based on the policy

$$x_t^n = \arg\max_{x_t} \Big( C(S_t^n, x_t) + \bar V_{t+1}^{n-1}\big( S^M(S_t^n, x_t, \widehat W_{t+1}^n) \big) \Big)$$

where $\widehat W_{t+1}^n$ is a random sample of the random variable $W_{t+1}^n$. Normally, the policy above is modified by some sort of randomization to encourage exploration of states that we might not otherwise visit. The use of exploration strategies that deviate from the policy based on the value function approximation is known as **off-policy learning**.

Now get a sampled estimate $\hat v_t^n$ of the value of being in state $S_t^n$:

$$\hat v_t^n = \max_{x_t} \Big( C(S_t^n, x_t) + \bar V_{t+1}^{n-1}\big( S^M(S_t^n, x_t, \widehat W_{t+1}^n) \big) \Big).$$

This estimate uses a method known in statistics as **bootstrapping** — we are using a statistical approximation $\bar V_{t+1}^{n-1}(S_{t+1}^n)$, which means not only is it not an exact estimate; it is not even an unbiased estimate.

We then update our value function approximation $\bar V_t^{n-1}(S_t^n)$ using a stochastic gradient update (known in computer science as *temporal-difference learning*):

$$\bar V_t^n(S_t^n) = (1 - \alpha_n)\, \bar V_t^{n-1}(S_t^n) + \alpha_n\, \hat v_t^n.$$

This is one of a number of updating strategies. We may be just updating the value at a single discrete state $S_t^n$, or we may be updating some parametric approximation that affects values across the entire state space.

## How well does it work?

Despite the vast number of papers demonstrating successful applications, the consensus that emerged in the post-2010 period could be best described as:

> *Policies based on approximating Bellman's equation are a powerful strategy that works on a small number of specialized problems.*

Sutton and Barto summarized the problems with the approximation strategy outlined above under the heading of the **deadly triad**, which captures the effect of three algorithmic strategies:

1. The use of **value function approximations**, which introduces a source of error.
2. **Bootstrapping**, where $\hat v_t^n$ is based on a value function approximation that introduces both biases and sampling errors.
3. **Off-policy learning**, which is often used to ensure proper exploration of the state space.

The state variables for real problems are rich and varied — multidimensional (often high-dimensional), typically with a mixture of discrete and continuous elements. It is not just that we cannot use Bellman's core equation (which depends on discrete states); we have found that approximating the value function $V_t(S_t)$ can be exceptionally difficult. See [State variables](/sda-website/statevariables/) for a discussion of the richness of state variables.

Our experience is that Bellman's equation can be quite useful for problems that exhibit special structure. This is not limited to small problems. In fact, our most prominent successes have been with **high-dimensional spatial resource allocation problems**. We have successfully implemented models based on value function approximations at a major railroad, and throughout the truckload trucking industry.

## Let the reader beware

While there are many papers with successful numerical experiments demonstrating various flavors of approximating Bellman's equation, it is important to be aware of the following:

- Authors are allowed to pick the problems they test their methods on, and this can introduce significant biases.
- Even a successful application may require considerable computational testing and tuning, which does not always emerge from the presentation of the results.
- Even if an ADP algorithm works, it has to be easier to use and more effective in the field than the other classes of policies.

The only real test of a method is when teams other than the one who developed a method choose it over competing methods, and implement it under real-world conditions.

## For more information

We are not going to attempt to communicate the richness and complexities of approximate value functions on this website. If you think you have a problem that is particularly well suited to using Bellman's equation, we recommend Chapters 14–18 of *Reinforcement Learning and Stochastic Optimization*:

- **Chapter 14 — Exact dynamic programming** — presents classical results for problems, using discrete states or continuous optimal-control problems, that can be solved exactly using Bellman's equation.
- **Chapter 15 — Backward approximate dynamic programming** — describes the technique of stepping backward in time, using linear models to approximate the value functions. Encouraging numerical results are reported.
- **Chapter 16 — Forward ADP I: The value of a policy** — describes how to estimate value functions for a fixed policy.
- **Chapter 17 — Forward ADP II: Policy optimization** — search over policies by changing the value function approximations in the policy.
- **Chapter 18 — Forward ADP III: Convex resource allocation** — focuses on the large problem class of optimizing the management of physical resources over space and time. This class allows us to exploit the convexity of the value function.
{% endraw %}
