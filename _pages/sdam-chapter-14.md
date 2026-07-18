---
layout: book
book_data: sdam_toc
book_home: /sdam/
title: "Chapter 14: Optimizing clinical trials"
permalink: /sdam/chapter-14/
date: 2026-07-17
---

{% raw %}
## Chapter overview

To move a drug to market, drug companies have to go through a three phase testing process, ending with the most expensive, Phase III, where the drug is given to hundreds or thousands of patients. Each week, the drug company looks at the results of experiments and has to make the decision of whether to continue testing, stop and go to market, or stop and cancel the drug.

There are several sources of uncertainty. The first of course is the performance of the drug itself. However, to test the drug we have to sign up patients who are willing to take the drug (or a placebo), and this introduces another source of uncertainty. There is then the uncertainty about the probability a drug will work on a particular patient, which is distinct from the actual outcome when a patient is administered the drug.

We use this problem setting to illustrate three different direct lookahead policies by proposing different ways of approximating the problem, from a simple model that would never work to more sophisticated models that offer better accuracy at a cost of complexity.

## Narrative

At any point in time, pharmaceutical companies may be running hundreds of thousands of clinical trials testing new medications (see [clinicaltrials.gov](https://clinicaltrials.gov)). Drug testing occurs in three phases:

**Phase I** – These are tests run using 20 to 100 volunteers over a few months to determine the dose, identify side effects and perform an initial assessment of drug response and side effects.

**Phase II** – These are larger trials with several hundred patients spanning two years. The goal is to determine if the disease responds to the treatment.

**Phase III** – These are trials involving hundreds to thousands of patients, often spanning multiple years, to assess effectiveness and safety. This is where they determine if the treatment is better than existing treatments.

Both Phase II and Phase III trials require identifying patients with the proper characteristics to enter the trial, at which point they are randomly assigned to one of the groups for comparison.

In our exercise, we assume that we enroll a set of hospitals and clinics each week to achieve a *potential* population, from which patients will be identified as candidates for the trial based on paper records. There is an up-front administrative cost to enroll a hospital or clinic in the trial. The administrative cost reflects the pool of patients that the facility might have for the study. For example, it might cost ＄250,000 to sign up a group of hospitals and clinics with a total potential population of 500 patients. In our model, we will simply set a ＄500 per patient signup cost, keeping in mind that this is for a total potential population, from which we draw actual signups.

Once we have signed up a facility, we then advertise the clinical trial from which patients (or their physicians) step forward. At that point, a patient is then subjected to a more detailed evaluation, which determines who is accepted into the trial. Ineligible patients are then dropped.

For the purpose of this exercise, we are going to assume that each patient is given a medication at the beginning of the week. By the end of the week, we know if the patient is responding or not. Patients that respond are designated as successes, the rest as failures. Each week, then, requires an entirely new set of patients, but these are drawn from the base population that we have signed up. We can only increase this population by entering more capacity into the trial, and paying the up-front administrative cost.

## Framing the problem

The answers to our three framing questions are:

- **Metrics:** Maximize the expected revenue received when a drug is approved for use, minus the weekly cost of running a trial, minus the cost of administering the drug to each patient in the study.
- **Decisions:** There are three types of decisions that are made while running a clinical trial: whether to continue to run the trial another week, or stop; if the decision is made to stop, we have to decide whether to cancel the drug or proceed to market; and if we continue the trial, we also have to decide how many new patients to enroll.
- **Uncertainties:** There are two sources of uncertainty: how many patients enroll in the trial each week, and the outcomes of each patient in the trial, whether they received the drug or a placebo.

## Basic model

We assume that we make decisions at the end of each week $t$, to be implemented during week $t+1$. We let time $t$ denote the end of week $t$.

### State variables

We have the following state variables: $R_t$, the potential population of patients that are in the hospitals and clinics that have been signed up; $\alpha_t$, the number of successes for the treatment by week $t$ over the course of the clinical trial; $\beta_t$, the number of failures for the treatment by week $t$; and $\bar\lambda^{response}\_t$, the estimated fraction of potential patients who elect to join the trial given what we know at time $t$.

Using this information, we can estimate the probability that our treatment is successful using $\rho_t$, the probability that the treatment is successful given what we know by the end of week $t$, so that

$$
\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

This means that our state variable would be

$$
S^n = (R_t, (\alpha_t, \beta_t), \bar\lambda^{response}_t).
$$

It is reasonable to use $R_0 = 0$ as the initial value of $R_t$, but it helps to use initial estimates of the probability of success based on prior clinical trials.

### Decision variables

We model the number of potential patients that are signed up using $x^{enroll}\_t$, the increase in the potential population of patients that are acquired by adding new hospital facilities. The number of patients that actually join the clinical trial will be drawn from this population during week $t+1$.

We also have the decision of when to stop the trial represented by

$$
x^{trial}_t = \begin{cases} 1 & \text{continue the trial,}\\ 0 & \text{stop the trial.} \end{cases}
$$

If $x^{trial}\_t = 0$, then we are going to set $R_{t+1} = 0$, which shuts down the trial. We assume that once we have stopped the trial, we cannot restart it, which means we will require that $x^{trial}\_t = 0$ if $R_t = 0$.

If we stop the trial, we have to declare whether the drug is a success or a failure,

$$
x^{drug}_t = \begin{cases} 1 & \text{if the drug is declared a success,}\\ 0 & \text{if the drug is declared a failure.} \end{cases}
$$

We will create policies $X^{\pi^{enroll}}(S_t)$, $X^{\pi^{trial}}(S_t)$, and $X^{\pi^{drug}}(S_t)$ which determine $x^{enroll}\_t$, $x^{trial}\_t$ and $x^{drug}\_t$. We can then write

$$
X^\pi(S_t) = (X^{\pi^{enroll}}(S_t), X^{\pi^{trial}}(S_t), X^{\pi^{drug}}(S_t)).
$$

As always, we design the policies later.

### Exogenous information

We first identify new patients and patient withdrawals to and from the trial using $\Rhat_{t+1}$, the number of new patients joining the trial during week $t+1$, which depends on the potential population of patients that were signed up, given by $R_{t+1} = R_t + x^{enroll}\_t$. We might, for example, assume that each patient in the population $R_{t+1}$ might sign up for the clinical trial with some probability $\lambda^{response}$ which has to be estimated from data.

We next track our successes with $\Xhat_{t+1}$, the number of successes during week $t+1$, and $\Yhat_{t+1}$, the number of failures during week $t+1$. The number of failures during week $t$ can be calculated as

$$
\Yhat_{t+1} = \Rhat_{t+1} - \Xhat_{t+1}.
$$

These variables depend on the number of patients $R_t$ in the system at the end of week $t$. As always, we defer to the section on uncertainty modeling the development of the underlying probability models for these random variables.

Our exogenous information process is then

$$
W_{t+1} = (\Rhat_{t+1},  \Xhat_{t+1}),
$$

where we exclude $\Yhat_{t+1}$ because it can be computed from the other variables.

### Transition function

The transition equation for the number of enrolled patients is given by

$$
\begin{align}
R_{t+1}        = x^{trial}_t (R_t + x^{enroll}_t).  \label{eq:clinicaltransition1}
\end{align}
$$

We update the probability the drug is a success by counting the number of successes and failures using

$$
\begin{align}
\alpha_{t+1} &= \alpha_t + \Xhat_{t+1}, \label{eq:clinicaltransition2}\\
\beta_{t+1}  &= \beta_t + (\Rhat_{t+1} - \Xhat_{t+1}). \label{eq:clinicaltransition3}
\end{align}
$$

Finally, we update our estimate of the number of patients who enroll in the trial by smoothing the current estimate $\bar\lambda^{response}\_t$ with the latest ratio of the number who enrolled during week $t+1$, $\Rhat_{t+1}$, and the number who are currently signed up, $R_t + x^{enroll}\_t$.

$$
\begin{align}
\bar\lambda^{response}_{t+1} = (1-\eta) \bar\lambda^{response}_t + \eta \frac{\Rhat_{t+1}}{R_t + x^{enroll}_t}. \label{eq:clinicaltransition4}
\end{align}
$$

Equations $\eqref{eq:clinicaltransition1}$–$\eqref{eq:clinicaltransition4}$ make up the transition function that we represent generically using

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Objective function

We have to consider the following costs: $c^{enroll}$, the cost of maintaining a patient in the trial per time period; $c^{trial}$, the ongoing administrative overhead costs of keeping the trial going (this stops when we stop testing); and $p^{success}$, the (large) revenue gained if we stop and declare success, which typically means selling the patent to a manufacturer.

The profit (contribution) in a time period would then be given by

$$
\begin{align}
C(S_t,x_t) = (1-x^{trial}_t)x^{drug}_t p^{success} - x^{trial}_t(c^{trial} + c^{enroll}x^{enroll}_t). \label{eq:clinicaltrialprofit}
\end{align}
$$

Our objective function, then, would be our canonical objective which we state as

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t, X^\pi(S_t))\vert S_0\right\},
$$

where we recognize that our policy is a composition of the patient enrollment policy $X^{\pi^{enroll}}(S_t)$, the trial continuation policy $X^{\pi^{trial}}(S_t)$, and the drug success/failure policy $X^{\pi^{drug}}(S_t)$.

## Modeling uncertainty

There are two potential reasons to develop a formal uncertainty model. The first is for the base model, which we can use both to design policies as well as to run studies. The second is that we may want to model uncertainty in a stochastic lookahead policy.

We begin by developing a probabilistic base model, which means we are going to make a best effort to model the real problem, recognizing that all mathematical models are approximations of the real world.

We need to model three random variables:

- The number of customers $\Rhat_{t+1}$ that sign up for the trial.
- The (unobservable) success rate $\rho^{true}$.
- The number of successes $\Xhat_{t+1}$, which we do observe.

We address each of these below.

### The patient enrollment process

We are going to use the simple model that we make choices (e.g. by signing up hospitals and clinics) that allow us to expect to sign up $x^{enroll}\_t$ patients for week $t+1$, giving us a total population of $R_{t+1} = R_t + x^{enroll}\_t$. The reality will be different. We propose to model the actual number of arrivals by assuming that they are Poisson with a mean of $\bar\lambda^{response} (R_t + x^{enroll}\_t)$ where $0 < \bar\lambda^{response} < 1$ is the fraction of potential patients who elect to join the trial (which is unknown). This means that we can write

$$
\begin{align}
Prob[\Rhat_{t+1}(R_t)=r] = \frac{(\bar\lambda^{response}_t(R_t + x^{enroll}_t))^r e^{-\bar\lambda^{response}_t(R_t + x^{enroll}_t)}}{r!}. \label{eq:clinicaltrialpoisson}
\end{align}
$$

We can use a truncated Poisson distribution for $\Rhat_{t+1}$, where we have to recognize that the number of patients that join the trial is limited by the number of potential patients given by $R_{t+1} = R_t + x^{enroll}\_t$. Let

$$
\Rbar_t = \bar\lambda^{response}_t (R_t+x^{enroll}_t)
$$

be the expected number of patients that will volunteer for the trial (given $R_t$) and

$$
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = Prob[\Rhat_{t+1}(x^{enroll}_t)=r\vert \Rbar_t].
$$

We write $P_{\Rhat_{t+1}}(r\vert x^{enroll}\_t, \Rbar_t)$ as a function of $x^{enroll}\_t$ and $\Rbar_t$ to reflect its dependence on the decision and on the number $R_{t+1} = R_t + x^{enroll}\_t$.

The truncated Poisson distribution is then given by

$$
\begin{align}
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = \begin{cases} \dfrac{(\Rbar_t)^r e^{-\Rbar_t}}{r!}, & r=0, \ldots, x^{enroll}_t -1 \\[6pt] 1-\displaystyle\sum_{r=0}^{x^{enroll}_t -1} P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) & r=R_t+x^{enroll}_t \end{cases} \label{eq:clinicaltrialpoisson2}
\end{align}
$$

For a population process such as this, a Poisson process is a good starting point. It enjoys the property that the mean equals the variance which equals $\Rbar_t$.

### The success probability

The successes are driven by the underlying, but unobservable, probability that the treatment will create a success in a patient during a week. We use the Bayesian style of assigning a probability distribution to $\rho^{true}$. There are three ways to represent the distribution of our belief about $\rho^{true}$:

- A uniform prior, where we would assume that $\rho^{true}$ is uniformly distributed between $0$ and $1$.
- A beta distribution with parameters $(\alpha_0,\beta_0)$.
- A sampled distribution, where we assume that $\rho^{true}$ takes on one of the set of values $(\rho_1, \ldots, \rho_K)$, where we let our initial distribution be $p^\rho_{0k} = Prob[\rho^{true} = \rho_k]$. We might let $p_{0k} = 1/K$ (this would be comparable to using the uniform prior). Alternatively, we could estimate these from the beta distribution.

For now, we are going to use our sampled distribution since it is the easiest to work with.

### The success process

The random number of successes $\Xhat_{t+1}$, given what we know at time $t$, depends first on the random variable $\Rhat_{t+1}$ giving the number of patients who entered the trial, and the unknown probability $\rho^{true}$ of success in the trial. The way to create the distribution of $\Xhat_{t+1}$ is to use the power of conditioning. We assume that $\Rhat_{t+1} = r$ and that $\rho^{true} = \rho_k$.

Given that $r$ patients enter the trial and assuming that the probability of success is $\rho_k$, the number of successes $\Xhat_{t+1}$ is the sum of $r$ Bernoulli (that is, 0/1) random variables. The sum of $r$ Bernoulli random variables is given by a binomial distribution, which means

$$
Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true} = \rho_k] = \binom{r}{s} \rho^s_k (1-\rho_k)^{r-s}.
$$

We can find the unconditional distribution of $\Xhat_{t+1}$ by just summing over $r$ and $k$ and multiplying by the appropriate probabilities, giving us

$$
\begin{align}
Prob[\Xhat_{t+1} = s\vert \Rbar_t] = \sum_{k=1}^K \left(\sum_{r=0}^{R_t} Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true}=\rho_k] P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t)\right) p^\rho_{tk}. \label{eq:clinicaltrialsuccessdist}
\end{align}
$$

Using explicit probability distributions such as the one for $\Xhat_{t+1}$ in equation $\eqref{eq:clinicaltrialsuccessdist}$ is nice when we can find (and compute) them, but there are many complex problems where this is not possible. For example, even equation $\eqref{eq:clinicaltrialsuccessdist}$ required that we use the trick of using a sampled representation of the continuous random variable $\rho^{true}$. Without this, we would have had to introduce an integral over the density for $\rho^{true}$.

Another approach, which is much easier and extends to even more complicated situations, uses Monte Carlo sampling to generate $\Rhat_{t+1}$ and $\Xhat_{t+1}$. This process is outlined below, which produces a sample $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$ (and corresponding $\Rhat^1\_{t+1}, \ldots, \Rhat^N_{t+1}$). We can now approximate the random variable $\Xhat_{t+1}$ with the set of outcomes $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$, each of which may occur with equal probability.

<div class="book-algorithm">
<p><strong>A Monte Carlo-based model of the clinical trial process</strong></p>
<p><strong>Step 1.</strong> Loop over iterations $n=1, \ldots, N$:</p>
<p style="margin-left: 1.5rem;"><strong>Step 2a.</strong> Generate a Monte Carlo sample $r^n \sim \Rhat_{t+1}(x^{enroll})$ from the Poisson distribution given by equation $\eqref{eq:clinicaltrialpoisson2}$.</p>
<p style="margin-left: 1.5rem;"><strong>Step 2b.</strong> Generate a Monte Carlo sample of the true success probability $\rho^n \sim \rho^{true}$.</p>
<p style="margin-left: 1.5rem;"><strong>Step 2c.</strong> Given $r^n$ and $\rho^n$, loop over our $r^n$ patients and generate a 0/1 random variable which is 1 (that is, the drug was a success) with probability $\rho^n$.</p>
<p style="margin-left: 1.5rem;"><strong>Step 2d.</strong> Sum the successes and let this be a sample realization of $\Xhat^n_{t+1}$.</p>
<p><strong>Step 3.</strong> Output the sample $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$.</p>
</div>

## Designing policies

We are going to use this problem to really understand our full stochastic lookahead policy which we first introduced in [Chapter 7](/sdam/chapter-7/), given by

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials}
\end{align}
$$

We are going to focus on what is meant by that maximization over policies $\pi$ embedded within the policy (this might be called the "policy-within-the-policy").

For our clinical trials application, we have to design policies for the three different decisions: the number of patients to enroll, whether or not to continue the trial, and whether or not the drug is declared a success when the trial is stopped. We are going to begin by designing simple policy function approximations for the decisions of whether to stop or continue, and if we stop, whether we declare the drug a success or a failure. We then address the more difficult decision of how many patients to enroll in the trial.

### Stopping the trial

We begin by using our belief about $\rho^{true}$ given by the beta distribution with parameters $(\alpha_t,\beta_t)$, which gives us an estimate of

$$
\bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Now introduce the parameters $\theta^{stop-low}$ and $\theta^{stop-high}$, where we are going to stop the trial and declare success if $\bar\rho_t > \theta^{stop-high}$, while we will stop the trial and declare failure if $\bar\rho_t < \theta^{stop-low}$. Let $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$. We use these rules to define the policy for stopping the trial as

$$
X^{trial}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \theta^{stop-low} \leq \bar\rho_t \leq \theta^{stop-high}, \\ 0 & \text{otherwise.} \end{cases}
$$

If we stop the trial, then the policy for declaring success (1) or failure (0) is given by

$$
X^{drug}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \bar\rho_t > \theta^{stop-high}, \\ 0 & \text{if } \bar\rho_t < \theta^{stop-low}. \end{cases}
$$

### The patient enrollment policy

It is often the case that problems with a physical state (such as $R_t$) need a lookahead policy, just as we used with our stochastic shortest path problem. But, as we saw with the stochastic shortest path problem, we get to choose what to put in our stochastic lookahead model.

One choice we have to make is the stopping policy $X^{trial}(S_t\vert \theta^{stop})$ and the success/failure policy $X^{drug}(S_t\vert \theta^{stop})$, where we propose to use the same parameter vector $\theta^{stop}$ in our lookahead model as we do in our base model. We can refer to these as $\Xtilde^{trial}(\Stilde_t\vert \theta^{stop})$ and $\Xtilde^{drug}(\Stilde_t\vert \theta^{stop})$, since these now apply only to the lookahead model.

The problem of determining how many new potential patients to enroll is somewhat more difficult, since it is necessary to pay an upfront cost to acquire more potential patients, and we have to do this under uncertainty about the willingness of patients to join the trial (given by the unknown parameter $\lambda^{response}$).

To create a full lookahead model as we described above, we would create variables such as $\tilde\lambda_{tt'}$ for the lookahead version of $\bar\lambda^{response}\_t$, $\tilde\rho_{tt'}$ for $\bar\rho_t$, and $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ for $(\alpha_t, \beta_t)$. Otherwise, all the logic would be the same as the original uncertainty model.

While we can use the full uncertainty model, we can choose to simplify the model in different ways. These choices include:

- The enrollment rate $\bar\lambda^{response}\_t$ – We have two options: we can continue to estimate $\bar\lambda^{response}\_t$, where we would introduce the notation $\tilde\lambda^{response}\_{tt'}$ as the estimate at time $t'$ in the lookahead model of the enrollment rate $\lambda$; or we could fix $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, which is our estimate at time $t$ in the base model.
- The drug success rate $\rho^{true}$ – We again have two options: we can continue to estimate the success rate, for which we would define the variables $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ for accumulating successes and failures in the lookahead model; or alternatively we could fix $(\tilde\alpha_{tt'}, \tilde\beta_{tt'}) = (\alpha_t, \beta_t)$ within the lookahead model.

Using our choices for modeling uncertainty, we can suggest three different strategies for designing a lookahead model:

**Model A** – Deterministic lookahead model. Here, we are going to assume that the enrollment rate $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, which means that the enrollment rate is fixed at the estimate at time $t$ when we create the lookahead model. We then assume that the true drug success probability is fixed at

$$
\tilde\rho_{tt'} = \bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t},
$$

which is our estimate at time $t$ in the base model.

**Model B** – We fix our estimate of the enrollment rate at $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$, but assume that we continue learning about the effectiveness of the drug.

**Model C** – We model the process of learning the enrollment rate $\tilde\lambda_{tt'}$ and the drug effectiveness $\tilde\rho_{tt'}$.

Note that we did not include the potential fourth model where we fix the drug effectiveness but continue learning the patient enrollment rate (we will see in a minute how silly this model would be).

We are going to use these three models to illustrate the process of designing a lookahead model.

### Model A

Model A is a deterministic problem, since we are fixing both the estimated enrollment rate $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$, and $\tilde\rho_{tt'} = \bar\rho_t$. The good news is that this is basically a deterministic shortest path problem, where the number of patients we have signed up (in the lookahead model), given by $\Rtilde_{tt'}$, is like a node in a network, and the decision $\xtilde^{enroll}\_{tt'}$ is a link that takes us to node $\Rtilde_{t,t'+1} = \Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$.

To see this, recall equation $\eqref{eq:shortestpathbellman1}$ for our deterministic shortest path problem, which we repeat here

$$
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j).
$$

Now we just replace $v_i$ for the value at node $i$, with $\Vtilde_{tt'}(\Rtilde_{tt'})$ which is the value of having $\Rtilde_{tt'}$ patients signed up (remember we are in our lookahead model). The decision to go to node $j$ is replaced with the decision to sign up $\xtilde^{enroll}\_{tt'}$ patients. Instead of this taking us to node $j$, it takes us to node $\Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$. So Bellman's equation becomes

$$
\begin{align}
\Vtilde_{tt'}(\Rtilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \big(\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}_{tt'}) + \Vtilde_{t,t'+1}(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\big). \label{eq:clinicaltrialbellmanModelA}
\end{align}
$$

The one-period profit function $\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}\_{tt'})$ is adapted from the same function for our base model (see equation $\eqref{eq:clinicaltrialprofit}$).

There is only one problem with our deterministic lookahead model: we would never stop, because our policy for stopping requires that our estimate of $\tilde\rho_{tt'}$ moves into the "success" or "fail" regions (it would have to start in the "continue" region, since otherwise we would have stopped the base model). However, this does not mean that we cannot use the deterministic lookahead model: we just have to fix a horizon $H$ and stop when $t' = t+H$.

Using this strategy, we solve our deterministic shortest path problem over the horizon $t'=t, \ldots, t+H$, and then from this find $\xtilde^\ast \_{tt}$. Our enrollment policy is then

$$
X^{\pi^{enroll}}(S_t) = \xtilde^\ast _{tt}.
$$

We are not claiming that this will be an effective policy. We are primarily illustrating the types of modeling approximations that can be made in a lookahead model.

### Model B

Now we are going to fix our estimate of the response rate $\tilde\lambda_{tt'}$ at our estimate $\bar\lambda^{response}\_t$ at time $t$ in the base model. To simplify our model, we are going to assume that the number of enrollments $\tilde\Rhat_{t,t'+1}$ equals the expected number of patients that will volunteer $\tilde\Rbar_{tt'}$. The enrollments $\tilde\Rhat_{t,t'+1}$ are generated deterministically from

$$
\tilde\Rhat_{t,t'+1} = \lfloor \bar\lambda^{response}_t (\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\rfloor,
$$

where $\lfloor x \rfloor$ means to round $x$ down to the nearest integer. We then compute the distribution of $\tilde\Xhat_{t,t'+1}$ using $Prob[\Xhat_{t+1} = s\vert \Rbar_t]$ but where we replace $\Rbar_t$ with $\tilde\Rbar_{tt'}$.

We still have to generate the number of successes $\tilde\Xhat_{t,t'+1}$ from a simulated truth $\tilde\rho_{tt'}$, from which we will update $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ which we do using

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'}+ \tilde\Xhat_{t,t'+1}, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + \tilde\Rbar_{tt'}-\tilde\Xhat_{t,t'+1}.
$$

We model the distribution of $\tilde\Xhat_{t,t'+1}$ using $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ in equation $\eqref{eq:clinicaltrialsuccessdist}$ but conditioning on $\tilde\Rbar_{tt'}$ instead of $\Rbar_t$ (remember that we can also use the sampled distribution using the Monte Carlo method above instead of the Poisson distribution).

We can solve the lookahead model by adapting Bellman's equation for Model A in equation $\eqref{eq:clinicaltrialbellmanModelA}$ for $t'=t, \ldots, t+H$:

$$
\begin{align}
\Vtilde_{tt'}(\Stilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \left(\Ctilde(\Stilde_{tt'},\xtilde^{enroll}_{tt'}) + \sum_{s=0}^{\tilde\Rbar_{tt'}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}] \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}\vert \tilde\Xhat_{t,t'+1} = s)\right),   \label{eq:clinicaltrialbellmanModelB}
\end{align}
$$

where $\Stilde_{t,t'+1} = (\Rtilde_{t,t'+1},\tilde\alpha_{t,t'+1})$ is conditioned on the number of successes $\tilde\Xhat_{t,t'+1} = s$, and where $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ comes from equation $\eqref{eq:clinicaltrialsuccessdist}$. We have to keep in mind that the evolution of $\Rtilde_{tt'}$ has to reflect if we have decided to stop or continue the trial within the lookahead model.

Our physical state variable (total potential patients) $\Rtilde_{t,t'+1}$ is given by

$$
\Rtilde_{t,t'+1}  = \begin{cases} \Rtilde_{tt'} + \xtilde^{enroll}_{tt'} & \text{if } \Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 1, \\ 0 & \text{otherwise.} \end{cases}
$$

Note that as with our base model, the number of potential patients drops to zero if we stop the trial in the lookahead model.

Our current estimate of the success of the drug (in the lookahead model) is computed using

$$
\tilde{\bar\rho}_{tt'} = \frac{\tilde\alpha_{tt'}}{\tilde\alpha_{tt'} + \tilde\beta_{tt'}}.
$$

In the expectation, if we condition on the number of successes being $\tilde\Xhat_{t,t'+1} = s$, then the updated belief state $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ is

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'} + s, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + (\tilde\Rbar_{tt'} - s).
$$

We now have to solve the lookahead model using Bellman's equation in equation $\eqref{eq:clinicaltrialbellmanModelB}$. For this problem, it makes sense to use a large-enough horizon $H$ so that we can confidently assume that we would have stopped the trial by then (that is $\Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 0$). This means we can assume that $\Vtilde_{t,t+H}(\Stilde_{t,t+H}) = 0$, and work backward from there to time $t$. Once we have solved the dynamic program, we can pull out our enrollment decision using

$$
X^{enroll}_{t}(S_t) = \argmin_{\xtilde^{enroll}_{tt}} \left(\Ctilde(\Stilde_{tt},\xtilde^{enroll}_{tt}) + \sum_{s=0}^{\tilde\Rhat_{t,t+1}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt}] \Vtilde_{t,t+1}(\Stilde_{t,t+1}\vert \tilde\Xhat_{t,t'+1} = s)\right).
$$

### Model C

Model C models the process of learning the enrollment rate $\tilde\lambda_{tt'}$ and the drug effectiveness $\tilde\rho_{tt'}$.

Model C is almost the same as the base model, since we are modeling all the different forms of uncertainty. The only way that it is a lookahead model would be our introduction of the simplified policy (our "policy function approximation") for stopping the trial, and for determining if the drug is a success. However, we could ignore these policies and formulate the entire problem as a dynamic program, using the full state variable.

## What did we learn?

- We introduce the clinical trial problem to illustrate the challenges of a problem that involves active learning (there are belief state variables) while also managing a finite resource (the budget for testing patients).
- We illustrate three types of uncertainty: the patient enrollment process, the probability that the drug is successful, and the process of successes for individual patients.
- We identify two decisions: whether to stop the trial and declare success or failure, and the admission of patients into the trial.
- We then design three types of lookahead policies that are distinguished by how we approximate the lookahead model, and how we approximate policies in the lookahead model.

## Exercises

**Review questions**

<ol class="book-exercises">
<li>The state variable $S^n$ includes beliefs about two uncertain quantities. What are these uncertain quantities, and how are beliefs about them captured in the state variable?</li>
<li>Explain the three decisions that have to be made during the clinical trial.</li>
<li>Explain the types of exogenous information, and how they are affected by decisions and the state of the system.</li>
<li>Explain the logic of the lookahead policy called Model A, and discuss its strengths and weaknesses.</li>
<li>Explain the logic of the lookahead policy called Model B, and discuss its strengths and weaknesses.</li>
<li>Explain the logic of the lookahead policy called Model C, and discuss its strengths and weaknesses.</li>
</ol>

**Problem solving questions**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li>Above, we wrote the full direct lookahead policy as

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials2}
\end{align}
$$

If we could actually compute this, we would have an optimal policy. We are going to explore this policy, and then apply it to our clinical trial problem.
  <ol type="a">
    <li>Assume that each random variable $W_{t+1}, \ldots, W_T$ can only take outcomes 0 or 1. Next assume that the decision $x_t, \ldots, x_T$ can also take on just the values 0 or 1. The policy in equation $\eqref{eq:optDLAclinicaltrials2}$ can be illustrated as a decision tree. Draw the tree for the horizon $t, t + 1, t + 2$.</li>
    <li>What is the structure of the policy $X^\pi_{t'}(S_{t'})$ represented by the decision tree in part (a)? Said differently, what type of function is $X^\pi_{t'}(S_{t'})$ when given by a decision tree?</li>
  </ol>
</li>
<li>Since we generally cannot compute equation $\eqref{eq:optDLAclinicaltrials2}$, we have to replace the full lookahead model with an approximate lookahead model that we write as

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA3}
\end{align}
$$

where the dynamics of our approximate lookahead model are governed by

$$
\begin{align}
\Stilde_{t,t'+1} = S^M(\Stilde_{tt'}, X^{\tilde \pi}_{t'}(\Stilde_{tt'}), \Wtilde_{t,t'+1}). \label{eq:policiesapproximateDLA4}
\end{align}
$$

  <ol type="a">
    <li>Imagine that our policy in the lookahead model is a parametric function such as "stop enrolling patients when $\rhobar_t$ falls outside of the range $[\thetatilde^{stop-low},\thetatilde^{stop-high}]$." For the purpose of this question, we can also replace the enrollment policy with a simple "enroll $\thetatilde^{enroll}$ patients" (this would be a static parameter). We can write this function as $X^{\tilde \pi}(\Stilde_{tt'})$ where $\thetatilde = (\thetatilde^{stop-low}, \thetatilde^{stop-high}, \thetatilde^{enroll})$. How would you rewrite equation $\eqref{eq:policiesapproximateDLA3}$ to reflect that the policy in the lookahead model is a parametric function?</li>
    <li>Part (a) implies that we have to find the best $\thetatilde$ for a given state $\Stilde_{t,t+1}$ at time $t$. This means that the optimal solution is actually a function $\thetatilde_{t+1}(\Stilde_{t,t+1})$. This would have to be computed given that we are in the simulated state $\Stilde_{t,t+1}$ in the approximate lookahead model.

    In practice, finding the optimal policy each time we step forward seems complicated (and expensive), since we would have to stop and tune $\thetatilde$ for any state $\Stilde_{t,t+1}$ that we land in.

    Imagine now that we would like to simplify the process by finding just one $\theta$ that we use for all times $t$, and any state $\Stilde_{t,t+1}$. Write the optimization problem that you would have to solve to find this value of $\theta$.</li>
    <li>What changes in equations $\eqref{eq:policiesapproximateDLA3}$ and $\eqref{eq:policiesapproximateDLA4}$ if we replace the random variable $\Wtilde_{t,t'+1}$ in the lookahead model with a point forecast $f^W_{tt'}$? Continue to assume that the policy is the parametric function we introduced in part (a).</li>
    <li>Describe the approximations made in lookahead Model B for the clinical trial problem.</li>
  </ol>
</li>
</ol>

**Programming questions**

These exercises use the Python module *ClinicalTrialsDriverScript.py* on [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Set the trial size to $T = 50$, the lookahead horizon to $H = 5$ and run a simulation of Model A. Record the stopping time and explain why the deterministic lookahead model yields the same number of new potential patients $x^{enroll}\_{t}$ at each time $t$.</li>
<li>Now set the lookahead horizon to $H = 50$. Modify the module *ClinicalTrialsDriverScript.py* to include a for-loop and run 10 simulations (testing iterations) of Model B. Compute the average revenue over all simulations.</li>
<li>When choosing $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$ for our PFA for determining when to stop, we usually choose a large enough $\theta^{stop-high}$ to make sure the drug is successful. Conversely, we choose a large $\theta^{stop-low}$ so that, if the true success rate of the drug is low, we stop the trial early before we lose too much money. However, we cannot make $\theta^{stop-low}$ too high, or else we risk stopping the trial before we have enough information about the drug's true success rate.

Fix $\theta^{stop-high} = 0.8$ and vary $\theta^{stop-low}$ in the interval $[0.77, 0.79]$, in increments of 0.005. For each resulting $(\theta^{stop-low}, \theta^{stop-high})$, run 5 simulations of Model B and compute the average revenue. Plot the resulting revenues against the values of $\theta^{stop-low}$.</li>
<li>Models A and B each solve a lookahead problem in which at least one of the estimates $\lambdabar_{tt'}$ and $\rhobar_{tt'}$ is fixed at time $t$ in the base model. Model C uses only the base model in the form of a hybrid policy search-VFA policy to model the process of learning both the enrollment rate $\lambdabar_{tt'}$ and $\rhobar_{tt'}$. However, we can create a lookahead version of Model C (called Model C Extension) in which the enrollments $\tilde\Rhat_{t,t'+1}$ are generated from the truncated Poisson distribution with mean

$$
\tilde\Rhat_{t,t'+1} = [\lambdabar^{response}_t(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})]
$$

and the distribution of $\tilde\Xhat_{t,t'+1}$ is the same as in Model B.

Your task is to implement the Model C Extension by adding the method *model_C_extension_value_fn* to the Python module *ClinicalTrialsPolicy.py*. The method uses the model_C_extension_policy (which is already in the code) calls the *model_C_extension_value_fn* to compute the value function for the Bellman equation. To write the method *model_C_extension_value_fn*, copy the code from *model_B_value_fn* and add an additional for-loop for the new enrollments in $[0, x^{enroll})$ in steps of $x^{enroll}/10$. Modify the step value and Bellman cost to account for the Model C Extension (hint: use the *trunc_probs* method).

Set the trial size to $T = 50$, the lookahead horizon to $H = 5$ and run one simulation of Model C Extension. Report the stopping time and the revenue.</li>
</ol>
{% endraw %}
