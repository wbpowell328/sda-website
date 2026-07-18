---
layout: book
book_data: sdam_toc
book_home: /sdam/
title: "Chapter 2: An asset selling problem"
permalink: /sdam/chapter-2/
date: 2026-07-17
---

{% raw %}
## Chapter overview

The asset selling problem is the simplest of our sequential decision problems, consisting purely of a stochastic price process where we have to make a decision of when to sell an asset we are holding. The problem is to determine when to sell the asset so as to maximize the expected price we receive.

This problem is widely known as an *optimal stopping problem* which is normally expressed using fairly sophisticated mathematics. We use it to illustrate some basic policies that fall in the first of our four classes, policy function approximations (PFAs). We introduce several PFAs, each of which requires tuning parameters to get the best results.

This exercise serves as a simple and elegant illustration of all five elements of the universal modeling framework.

## Narrative

We are holding a block of shares of stock, looking for an opportune time to sell. We start by assuming that we are a small player which means it does not matter how many shares we sell, so we are going to assume that we have just one share. If we sell at time $t$, we receive a price that varies according to some random process over time, although we do not believe prices are trending up or down. Once we sell the stock, the process stops.

## Framing the problem

The answers to our three framing questions are:

- **Metrics:** Maximizing the expected price that we receive when we sell the asset.
- **Decisions:** Whether to hold or sell the asset.
- **Uncertainties:** The selling price in future time periods.

## Basic model

### State variables

Our process has two state variables: the "physical state," which captures whether or not we are still holding the asset, and an "informational state" which for this problem is the price of the stock.

Our "physical state" is given by

$$
R^{asset}_t = \begin{cases} 1 & \text{if we are holding the stock at time } t,\\ 0 & \text{if we are no longer holding the stock at time } t.\end{cases}
$$

If we sell the stock, we receive the price per share of $p_t$. This means our state variable is

$$
S_t = (R^{asset}_t, p_t).
$$

### Decision variables

The decision variable is whether to hold or sell the stock. We write this using

$$
x_t = \begin{cases} 1 & \text{if we sell the stock at time } t,\\ 0 & \text{if we do not sell the stock at time } t.\end{cases}
$$

We are only allowed to sell stock in this problem, so we have to obey the constraint

$$
x_t \leq R^{asset}_t.
$$

We are going to define our policy $X^\pi(S_t)$ which is going to define how we make decisions. At this stage, we introduce the notation for the policy, but defer designing the policy until later. This is what we mean when we say that we "model first, then solve."

### Exogenous information

The only random process in our basic model is the change in price. There are two ways to write this. One is to assume that the exogenous information is the change in price. We can write this as

$$
\phat_{t+1} = p_{t+1} - p_t.
$$

This means that our price process is evolving according to

$$
p_{t+1} = p_t + \phat_{t+1}.
$$

We would then write our exogenous information $W_{t+1}$ as

$$
W_{t+1} = \phat_{t+1}.
$$

The second way is to assume that we simply observe the next price, in which case we would write

$$
W_{t+1} = p_{t+1}.
$$

### Transition function

The transition function consists of the equations that describe how the state evolves over time. The transition equation for $R_t$ is given by

$$
\begin{align}
R^{asset}_{t+1} = R^{asset}_t - x_t,  \label{eq:assetsellingR}
\end{align}
$$

where we have the constraint that $x_t \leq R^{asset}_t$ to ensure that we do not sell the asset when we no longer own it.

Next we have to write how the price process evolves over time. If we use the $\phat_t$ notation, the transition function for the price $p_t$ would be given by

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1}.\label{eq:assetsellingP}
\end{align}
$$

Equations $\eqref{eq:assetsellingR}$ and $\eqref{eq:assetsellingP}$ make up what we call our *transition function* that we write as

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

If we use our policy $X^\pi(S_t)$ to make decisions, and if we choose sample path $\omega$ that determines the sequence $W_1, W_2, \ldots, W_T$, then we can write a simulation of our process as

$$
(S_0, x_0 = X^\pi(S_0), W_1(\omega), S_1, x_1=X^\pi(S_1), W_2(\omega), \ldots, x_{T-1}, W_T(\omega), S_T).
$$

Note that as we write the sequence, we index variables by their information content. For example, $S_0$ is an initial state, and $x_0$ depends only on $S_0$. By contrast, any variable indexed by $t$ is allowed to "see" any of the outcomes of our exogenous process $W_1, \ldots, W_t$, but is not allowed to see $W_{t+1}$.

### Objective function

We finish our model with a statement of our objective function, which then becomes the basis for evaluating policies. To start, we have to have some performance metric, which for this problem would be how much we earn from selling our stock. We can define a generic contribution function that we write as $C(S_t,x_t)$, which would be given by

$$
C(S_t,x_t) = p_tx_t.
$$

In our problem, $x_t =0$ until we choose to sell. For now, assume that we are selling a single discrete asset (we could think of this as selling all of our shares at once). In this case, when we sell we would let $x_t = 1$, which is going to happen just once over our horizon. We write the dependence of $C(S_t,x_t)$ to capture the dependence on the state, which is because of the presence of the price $p_t$.

We now want to formulate our optimization problem. If the prices were given to us in advance, we would write

$$
\begin{align}
\max_{x_0, \ldots, x_{T-1}} \sum_{t=0}^{T-1} p_tx_t, \label{eq:deterministicobjassetselling}
\end{align}
$$

where we would impose the constraints

$$
\sum_{t=0}^{T-1} x_t = 1, \quad x_t \leq 1, \quad x_t \geq 0.
$$

This is fine when the problem is deterministic, but how do we model the problem to handle the uncertainty in the prices? What we do is to imagine that we are simulating a policy following a sample path $\omega$ of prices $p_1(\omega), p_2(\omega), \ldots$. Using a policy $\pi$, we would then generate a series of states using

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi(S_t(\omega)), W_{t+1}(\omega)).
$$

We write $S_t(\omega)$ to express the dependence on the sample path. We could also have written $S^\pi_t(\omega)$ to express the dependence on the policy $\pi$, but we tend to suppress the dependence on the policy for simplicity.

If we follow policy $\pi$ along this sample path, we can compute the performance using

$$
\Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)).
$$

This is for one sample path. Note that we get a set of decisions $x_t(\omega)$ for each sample path from the policy $x_t(\omega) = X^\pi(S_t(\omega))$. This notation communicates that $x_t$ is a random variable that depends on the sample path $\omega$. For each sample path, we still get $\sum_{t=0}^{T-1} x_t(\omega) =1$, which parallels our constraint above for the deterministic version of the problem. There is a time $\tau(\omega)$ which is the time where $x_t(\omega)=1$ for $t=\tau(\omega)$. This time is known as a *stopping time* for this asset selling problem.

We can simulate over a sample of $N$ samples $\omega^1, \ldots, \omega^n, \ldots, \omega^N$ and take an average using

$$
\begin{align}
\Fbar^\pi(S_0) = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n\vert S_0). \label{eq:assetsellingfbarpi}
\end{align}
$$

Finally, we write out the optimization problem in terms of finding the best policy, which we can write

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0). \label{eq:maxpifbarasset}
\end{align}
$$

We will see that the optimization problem stated by $\eqref{eq:maxpifbarasset}$ where we would like to find the optimal policy is primarily aspirational. While we would certainly like the optimal policy, we will typically settle for the best policy that we can find (and can compute).

In practice we are typically using averages such as in equation $\eqref{eq:assetsellingfbarpi}$ for our optimization problem. However, this is just an approximation of taking an actual expectation, which we will write as

$$
\begin{align}
F^\pi(S_0) = \E \Fhat^\pi(S_0) \approx \Fbar^\pi(S_0). \label{eq:assetsellingfpiexpectation}
\end{align}
$$

By convention, when we write the expectation, we drop the indexing on $\omega$ and instead view $\Fhat^\pi$ as a random variable, whereas $\Fhat^\pi(\omega)$ is treated as a sample realization (this is standard notation in the stochastic modeling community, so just get used to it).

Using our expectation operator, we would write our objective function as

$$
\begin{align}
\max_\pi  \E \Fhat^\pi(S_0). \label{eq:assetsellingobjective}
\end{align}
$$

Often, we are going to write our objective function as

$$
\begin{align}
\max_\pi \E \left\{\sum_{t=0}^{T-1} p_tX^\pi(S_t)\vert S_0 \right\}. \label{eq:assetsellingexpectedsum}
\end{align}
$$

The form in equation $\eqref{eq:assetsellingobjective}$ (or $\eqref{eq:assetsellingfpiexpectation}$ or $\eqref{eq:assetsellingexpectedsum}$) is nice and compact. You just have to remember that it is almost never the case that we can actually compute the expectation, so we generally depend on running simulations and taking an average as we do in equation $\eqref{eq:assetsellingfbarpi}$.

Now we are left with the problem of searching over policies. We will always create our model first, and then turn to the problem of designing policies. Before we do this, we have to think about how we are going to model any uncertainties in $S_0$ and the exogenous information process $W_1, \ldots, W_T$.

## Modeling uncertainty

We are going to need some way to sample observations of $W_t$ which, for this problem, means modeling the evolution of prices $p_t$ over time. One way is to draw samples from history. Imagine that we are interested in running our simulation over a period of a year. We can use the previous year's history, but this is just one sample path.

The second strategy, which we will often use, is to estimate a statistical model. For our basic model, we might assume

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1},\label{eq:assetsellingpricemodel1}
\end{align}
$$

where $\phat_{t+1}$ is described by some probability distribution. A simple model would be to assume that $\phat_{t+1}$ is normally distributed with mean 0 and variance $\sigma^2$. We might also start by assuming that the changes in prices $\phat_t$ and $\phat_{t+1}$ are independent, and that $\phat_{t+1}$ is independent of the current price $p_t$ (the latter assumption is a bit strong, but it will help us get started).

Most computer languages have functions for simulating observations from a normal distribution. For example, Excel provides the function `Norm.inv`$(p,\mu,\sigma)$, which returns the value $w$ of a random variable $W$ with mean $\mu$ and standard deviation $\sigma$ where $P[W \leq w] = p$. A standard trick is to set $p=Rand()$, where $Rand()$ is an Excel function that returns a random variable that is uniformly distributed between $0$ and $1$. We can then write

$$
\phat_{t+1} = \text{Norm.inv}(Rand(),0,\sigma),
$$

which will give us a random observation of $\phat_{t+1}$ that is normally distributed with mean $0$ and standard deviation $\sigma$.

Table 2.1 illustrates ten observations of random variables $U$ that are uniformly distributed between 0 and 1, and the corresponding samples of normally distributed price changes $\phat$ with mean 0 and variance 1.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>$U$</th><th>$\phat$</th></tr></thead>
<tbody>
<tr><td>0.8287</td><td>0.9491</td></tr>
<tr><td>0.6257</td><td>0.3206</td></tr>
<tr><td>0.9343</td><td>1.5086</td></tr>
<tr><td>0.4879</td><td>-0.0303</td></tr>
<tr><td>0.3736</td><td>-0.3223</td></tr>
<tr><td>0.8145</td><td>0.8947</td></tr>
<tr><td>0.0385</td><td>-1.7685</td></tr>
<tr><td>0.0089</td><td>-2.3698</td></tr>
<tr><td>0.9430</td><td>1.5808</td></tr>
<tr><td>0.3693</td><td>-0.3336</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Table 2.1.</span> Ten uniform random variables $U$, and ten corresponding samples of normally distributed price changes $\phat$ with mean 0 and variance 1.</p>
</div>

Equation $\eqref{eq:assetsellingpricemodel1}$ is a pretty basic price model, but it will help illustrate our modeling framework. Below, we are going to introduce some extensions which include a richer model.

## Designing policies

We can envision several different policies for this problem. For example, a simple policy might be to sell if the price drops below some limit point that we think suggests that it is starting a big decline. Thus, we could write this policy as

$$
\begin{align}
X^{sell-low}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy1}
\end{align}
$$

Another policy might be a "high-low" selling policy, where we want to sell if the price jumps too high or too low. Let $\theta^{high-low} = (\theta^{low}, \theta^{high})$. This might be written

$$
\begin{align}
X^{high-low}(S_t\vert \theta^{high-low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy2}
\end{align}
$$

A possible objection to this policy could be that it prematurely sells a rising stock. Perhaps we just want to sell when the stock rises above a tracking signal. To handle this issue, first create a smoothed estimate of the price using

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Now consider a tracking policy that we might write as

$$
\begin{align}
X^{track}(S_t\vert \theta^{track}) &= \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:trackingpolicy}
\end{align}
$$

In all the cases, we can only sell the asset (that is, $X^{track}(S_t\vert \theta^{track}) =1$) if we are still holding the asset (which means $R^{asset}_t = 1$).

For this policy, we are going to need to tweak our model because we now need $\pbar_t$ in order to make a decision. This means we would now write our state as

$$
S_t = (R^{asset}_t, p_t, \pbar_t).
$$

We can write our classes of policies as the set $\Fcal = \lbrace $"sell-low," "high-low," "track"$\rbrace $. For each of these classes, we have a set of parameters that we can write as $\theta^f$ for $f\in\Fcal$. For the "sell-low" and "track" policies there is a single parameter, while $\theta^{high-low}$ has two parameters.

Now we can write our search over policies $\pi$ in a more practical way as searching over function classes $f\in\Fcal$, and then searching over parameters $\theta^f \in \Theta^f$, where $\Theta^f$ tells us the range of possible values (capturing at the same time the dimensionality of $\theta^f$).

The way that we designed the policies in this section may seem somewhat ad hoc, but this in fact is precisely how many policies are designed (including buy-sell strategies used by major hedge funds). Many types of policies are possible, some of which will perform better than others; we focus on these as illustrative examples. There is an art to designing policies which parallels the art of designing statistical models for estimation.

## Policy evaluation

We indicated above that we can evaluate a policy by simulating it using

$$
\Fhat^\pi(\omega) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)),
$$

where $\omega$ is used to represent a sample path of realizations of whatever exogenous random variables are used in the model. Table 2.2 illustrates a series of sample paths of prices. For example, imagine that we are using the "sell-low" policy with $\theta^{sell-low} = \Doll 42$. Now consider testing it on sample path $\omega^5$. The result would be

$$
\Fhat^{sell-low}(\omega^5) = \$41.53,
$$

since $\Doll 41.53$ is the first price that falls below $\Doll 42$. If none of the prices fall below our sell point, then all of our policies are designed to sell at the end.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th></th><th>$t=1$</th><th>$t=2$</th><th>$t=3$</th><th>$t=4$</th><th>$t=5$</th><th>$t=6$</th><th>$t=7$</th><th>$t=8$</th></tr></thead>
<tbody>
<tr><td>$\omega^n$</td><td>$p_1$</td><td>$p_2$</td><td>$p_3$</td><td>$p_4$</td><td>$p_5$</td><td>$p_6$</td><td>$p_7$</td><td>$p_8$</td></tr>
<tr><td>$\omega^1$</td><td>42.67</td><td>45.53</td><td>47.07</td><td>47.56</td><td>47.80</td><td>48.43</td><td>46.93</td><td>46.57</td></tr>
<tr><td>$\omega^2$</td><td>46.35</td><td>43.15</td><td>42.51</td><td>40.51</td><td>41.50</td><td>41.00</td><td>39.16</td><td>41.11</td></tr>
<tr><td>$\omega^3$</td><td>43.17</td><td>45.16</td><td>45.37</td><td>44.30</td><td>45.35</td><td>47.23</td><td>47.35</td><td>46.30</td></tr>
<tr><td>$\omega^4$</td><td>45.24</td><td>45.67</td><td>46.18</td><td>46.22</td><td>45.69</td><td>44.24</td><td>43.77</td><td>43.57</td></tr>
<tr><td>$\omega^5$</td><td>47.68</td><td>46.32</td><td>46.14</td><td>41.53</td><td>44.84</td><td>45.17</td><td>44.92</td><td>46.09</td></tr>
<tr><td>$\omega^6$</td><td>47.83</td><td>44.70</td><td>43.05</td><td>43.77</td><td>42.61</td><td>44.32</td><td>44.16</td><td>45.29</td></tr>
<tr><td>$\omega^7$</td><td>45.11</td><td>43.67</td><td>43.14</td><td>44.78</td><td>43.12</td><td>42.36</td><td>41.60</td><td>40.83</td></tr>
<tr><td>$\omega^8$</td><td>46.78</td><td>44.98</td><td>44.53</td><td>45.42</td><td>46.43</td><td>47.67</td><td>43.68</td><td>49.03</td></tr>
<tr><td>$\omega^9$</td><td>43.16</td><td>44.57</td><td>45.99</td><td>47.38</td><td>45.51</td><td>46.27</td><td>46.02</td><td>45.09</td></tr>
<tr><td>$\omega^{10}$</td><td>46.57</td><td>45.01</td><td>46.73</td><td>42.08</td><td>47.40</td><td>49.14</td><td>49.03</td><td>48.74</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Table 2.2.</span> Illustration of a set of price paths.</p>
</div>

We can then evaluate each policy (both the class of policy, and the parameters for that class) by doing repeated simulations and taking an average. We write this as

$$
\Fbar^\pi = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n).
$$

Sometimes we need to express a confidence interval, since $\Fbar^\pi$ is nothing more than a statistical estimate. We would first compute an estimate of the variance of our random variable $\Fhat^\pi$, which we do using

$$
(\sigmahat^\pi)^2 = \frac{1}{N-1} \sum_{n=1}^N (\Fhat^\pi(\omega^n)-\Fbar^\pi)^2.
$$

We then get our estimate of the variance of our average $\Fbar^\pi$ using

$$
(\sigmabar^\pi)^2 = \frac{1}{N} (\sigmahat^\pi)^2.
$$

From this, we can construct a confidence interval to compare two policies which we might call $\pi^A$ and $\pi^B$. Let $\mu^\pi$ be the true performance of policy $\pi$, where $\Fbar^\pi$ is our statistical estimate of $\mu^\pi$. We would like to get a confidence interval for the difference $\mu^{\pi^A} - \mu^{\pi^B}$. Our best estimate of this difference is $(\Fbar^{\pi^A} - \Fbar^{\pi^B})$. The variance of this difference is

$$
\Var(\Fbar^{\pi^A} - \Fbar^{\pi^B}) = (\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2,
$$

where we assume that the estimates $\Fbar^{\pi^A}$ and $\Fbar^{\pi^B}$ are independent, which means that each policy is being tested on a different random sample of prices. When this is the case, we would compute our confidence interval using

$$
\mu^{\pi^A} - \mu^{\pi^B} \in \left(\Fbar^{\pi^A} - \Fbar^{\pi^B} + z_\alpha \sqrt{(\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2}\right),
$$

where $z_\alpha$ is the value of $z$ such that a normally distributed random variable $Z$ is greater than $z$ with probability $\alpha$. For example, $z_{.05} = 1.645$, which means $Prob[Z \geq 1.645] = .05$.

A better approach is to use the same samples to evaluate each policy. For example, we could test each policy on the same sample path $\omega$ chosen from Table 2.2. Testing our policies this way, we would get $\Fhat^{\pi^A}(\omega)$ and $\Fhat^{\pi^B}(\omega)$ (using the same set of prices $p_t(\omega)$), and then compute the difference

$$
\delta \Fhat^{A-B}(\omega) = \Fhat^{\pi^A}(\omega) - \Fhat^{\pi^B}(\omega).
$$

Now we compute the average difference

$$
\delta \Fbar^{A-B} = \frac{1}{N} \sum_{n=1}^N \delta \Fhat^{A-B}(\omega^n),
$$

and the variance

$$
(\delta \sigmabar^{A-B})^2 = \frac{1}{N} \left(\frac{1}{N-1} \sum_{n=1}^N (\delta \Fhat^{A-B}(\omega^n)-\delta \Fbar^{A-B})^2\right).
$$

Note that the variance $(\delta \sigmabar^{A-B})^2$ will be smaller than the variance when independent samples are used. The confidence interval for the difference would then be

$$
\delta \mu^{A-B}\in \big(\delta \Fbar^{A-B} - z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}, \delta \Fbar^{A-B}+ z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}\big).
$$

Computing confidence intervals may be useful when comparing different classes of policies. Alternatively, we may be comparing the performance of two physical designs (e.g. the speed of two machines or the locations of a facility). The choice of policy closely parallels any design decision for a system.

## Extensions

### Time series price processes

Imagine that we want a somewhat more realistic price process that captures autocorrelation over time. We might propose that

$$
\begin{align}
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1}, \label{eq:assetsellingpricetimeseries}
\end{align}
$$

where we still assume that the random noise $\varepsilon_t$ is independent (and identically distributed) over time. We are also going to assume for the moment that we know the coefficients $\eta = (\eta_0, \eta_1, \eta_2)$.

This price model requires a subtle change in our model, specifically the state variable. We are going to replace our old transition equation for prices, $\eqref{eq:assetsellingP}$, with our new time series model given in $\eqref{eq:assetsellingpricetimeseries}$. To compute $p_{t+1}$, it is no longer enough to know $p_t$, we now also need to know $p_{t-1}$ and $p_{t-2}$. Our state variable would now be given by

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

For the policies we have considered above, this does not complicate our model very much. Later, we are going to introduce policies where the additional variables represent a major complication.

### Time series price process with learning

Now assume that our time series price process is given by

$$
p_{t+1} = \etabar_{t0} p_t + \etabar_{t1} p_{t-1} + \varepsilon_{t+1},
$$

where $\varepsilon \sim N(0, 4^2)$ and where $\etabar_t = (\etabar_{t0}, \etabar_{t1})$ is our *estimate* of $\eta$ given what we know at time $t$ (in the previous section, we assumed $\theta$ was known).

There are simple formulas that govern the updating of $\etabar_t$ to $\etabar_{t+1}$ given our estimates $\etabar_t$ and the observation of the next price $p_{t+1}$.

We first let

$$
\pbar_t(p_t\vert \etabar_t) = \etabar_{t0} p_t + \etabar_{t1} p_{t-1}
$$

be our estimate of $p_{t+1}$ given what we know at time $t$. The error in this estimate is given by

$$
\hat{\varepsilon}_{t+1} = \pbar(p_t\vert \etabar_t) - p_{t+1}.
$$

Now let the vector $\phi_t$ be the vector of explanatory variables in our price process which is given by

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \end{pmatrix}.
$$

Next we define the $2 \times 2$ matrix $M_t$ which is updated recursively using

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}),
$$

where $\gamma_t$ is a scalar computed using

$$
\gamma_t = 1+(\phi_t)^TM_{t-1}\phi_t.
$$

We can now update $\etabar_t$ using

$$
\etabar_{t+1} = \etabar_t - \frac{1}{\gamma_t}M_t \phi_t \hat{\varepsilon}_t.
$$

Exercise 6 will dive into these equations further.

### Basket of assets

Another twist arises when we are considering a basket of assets. Let $p_{ti}$ be the price of asset $i$. Assume for the moment that each price evolves according to the basic process

$$
p_{t+1,i} = p_{ti}  + \varepsilon_{t+1,i}.
$$

We could assume that the noise terms $\varepsilon_{t+1,i}$ are independent across the assets $i\in\Ical$, but a more realistic model would be to assume that the prices of different assets are correlated. Let $\sigma_{ij} = Cov_t(p_{t+1,i},p_{t+1,j})$ be the covariance of the random prices $p_{t+1,i}$ and $p_{t+1,j}$ for assets $i$ and $j$ given what we know at time $t$. Assume for the moment that we know the covariance matrix $\Sigma$, perhaps by using a historical dataset to estimate it (but holding it fixed once it is estimated).

We can use the covariance matrix to generate sample realizations of correlated prices using a technique called Cholesky decomposition. It proceeds by creating what we call the "square root" of the covariance matrix $\Sigma$ which we store in a lower triangular matrix $L$. In python, using the NumPy package, we would use the python command

```
L = scipy.linalg.cholesky(Sigma, lower=True)
```

The matrix $L$ allows us to obtain the matrix $\Sigma$ using $\Sigma = L^T L$.

Now let $Z$ be a vector of random variables, one for each asset, where $Z_i \sim N(0,1)$ (virtually every programming language has routines for creating random samples from normal distributions with mean 0, variance 1). Let $p_t$, $p_{t+1}$ and $Z$ be column vectors (dimensioned by the number of assets). We first create a sample $\hat Z$ by sampling from $N(0,1)$ $\vert \Ical\vert $ times. Our sample of prices $p_{t+1}$ is then given by

$$
p_{t+1} = p_t + L \hat{Z}.
$$

For this problem, our state variable is given by $S_t = (R_t,p_t)$ where $R_t = (R_{ti})_{i\in\Ical}$ captures how many shares of each asset we own, while $p_t$ is our current vector of prices. The covariance matrix $\Sigma$ is not in the state variable because we assume it is static (which means we put it in $S_0$). The answer changes if we were to update the covariance matrix with each new observation, in which case we would write the covariance matrix as $\Sigma_t$ to capture its dependence on time. Since it now varies dynamically, the state variable would be $S_t = (R_t, p_t, \Sigma_t)$.

## What did we learn?

We used this problem to illustrate different types of PFA policies:

- We used a simple asset selling problem to illustrate a sequential decision problem with both a physical state (whether we are holding an asset, or how much), and the price we could sell it at time $t$.
- We showed how to model uncertainty and introduce the notion of a sample path $\omega$ for the exogenous information process $W_1, \ldots, W_T$.
- We illustrated several simple policies in the PFA class.
- We showed how to simulate a policy.
- We introduced some complexity in the price process (where the price $p_{t+1}$ depends on recent history of prices), and the situation where the selling price depends on a basket of assets, which is a more complex, multidimensional information process. Note that this does not introduce any significant complexity other than modeling the process. It creates a much higher dimensional state variable, but that does not represent a significant form of complexity for the problem of designing or evaluating policies (this is not true of all classes of policies).
- We showed how to update a linear model of the price process.

## Exercises

**Review questions**

<ol class="book-exercises">
<li>We write the transition function as $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.
  <ol type="a">
    <li>Why do we write the exogenous information as $W_{t+1}$ rather than $W_t$?</li>
    <li>At what point in time would we be computing $S_{t+1}$ using this equation?</li>
  </ol>
</li>
<li>What is the difference between $p_t$ and $p_t(\omega)$?</li>
<li>As you test out different policies, does the structure of the transition function change?</li>
<li>The objective function in equation $\eqref{eq:deterministicobjassetselling}$ is written for a deterministic version of the problem. If we solve this optimization problem, does the decision $x_t$ at time $t$ depend on the prices $p_{t'}$ for $t' > t$?</li>
</ol>

**Problem solving questions**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Using the prices in Table 2.2, use the policy that you will sell when the price falls below ＄44.00. Compute the objective function $\Fhat(\omega^n)$ for $n=1,\ldots, 10$. Compute the average selling price and its variance.</li>
<li>The questions below walk you through the steps of modeling the selling of an asset (say, a single share of a stock).
  <ol type="a">
    <li>Assume that you are simulating your prices using data from a mathematical model given by $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \varepsilon_{t+1}$, where $\varepsilon \sim N(0, 6^2)$.

    We do not know the value of $\eta = (\eta_0, \eta_1)$, but our belief about the true value of $\eta$ is that it is multivariate normal, with $\eta \sim MVN({\bar \eta}, \Sigma)$ where

    $$
    \etabar_t = \begin{bmatrix} .7 \\ .3 \end{bmatrix}.
    $$

    Assume that the covariance matrix $\Sigma_t$ is given by

    $$
    \Sigma_t = \begin{bmatrix} (.2)^2 & (.05)^2 \\ (.05)^2 & (.1)^2 \end{bmatrix}
    $$

    where $\Sigma_{tij} = Cov(\eta_i,\eta_j)$ for $i,j \in (0,1)$. Assume that at time $t$, $p_t = 20$, $p_{t-1} = 24$ and we observe $p_{t+1} = 18.2$.

    Using the equations in the section on the time series price process with learning, what is the updated estimates of $\etabar_{t+1}$ and $\Sigma_{t+1}$? Give the updating equation and compute $\etabar_{t+1}$ and $\Sigma_{t+1}$ numerically.</li>
    <li>What is the state variable for this problem? Give the list of variables. Note that you may have to add variables as you progress through the exercise (you do not have all the information at this point). Make sure you include all the information you need to update $\etabar_{t+1}$ from $\etabar_t$. How many dimensions does your state variable have (this is the same as asking how many variables are in $S_t$).</li>
    <li>Our trader makes trading decisions based on a 7-day moving average of prices. Assume we are on day $t$, and the 7-day moving average is computed using

    $$
    \pbar_t = \frac{1}{7}\sum_{t'=t-7+1}^{t} p_{t'}.
    $$

    The trader will sell an asset if $p_t < \pbar_t - \theta^{sell}$. Write out the decision rule as a policy $X^\pi(S_t\vert \theta^{sell})$ that returns 1 if we sell the asset and 0 otherwise.</li>
    <li>What is the exogenous information?</li>
    <li>Write out the transition equations. You need an equation for each element of $S_t$.</li>
    <li>Write out the objective function (and remember to use an expectation operator for each random variable as described in the instructions). Be sure to specify what you are optimizing over given the class of policy specified in part (c). Assume that you are training your policy on historical data in an offline setting.</li>
  </ol>
</li>
<li>You need to run a simulation of electricity prices, which are notoriously heavy-tailed. You collect the data shown in the table below.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Time</th><th>Price</th></tr></thead>
<tbody>
<tr><td>1</td><td>20</td></tr>
<tr><td>2</td><td>32</td></tr>
<tr><td>3</td><td>26</td></tr>
<tr><td>4</td><td>180</td></tr>
<tr><td>5</td><td>30</td></tr>
<tr><td>6</td><td>45</td></tr>
<tr><td>7</td><td>18</td></tr>
<tr><td>8</td><td>120</td></tr>
<tr><td>9</td><td>57</td></tr>
<tr><td>10</td><td>15</td></tr>
</tbody>
</table>
</div>

  <ol type="a">
    <li>Use the data in the table to produce a cumulative distribution function. You will need to plot the cdf, which looks like a step function with five steps.</li>
    <li>You now observe three realizations of prices: 25, 18, 160. Use the cumulative distribution function from (a) to create three realizations of a random variable that is uniformly distributed between 0 and 1 (call this random variable $U$).</li>
    <li>Now use these observations of $U$ to create three observations of a random variable $Z$ that is normally distributed with mean 0, variance 1. Be sure that your method for generating these random variables is clear. [Hint: use the cumulative distribution for a normal (0,1) random variable just as you used the cdf you created in part (a) to create uniform random variables in part (b).]</li>
    <li>Assume that you used this method for creating a sequence of normal (0,1) random variables to fit a linear model of the form $Z_{t+1} = .7 Z_t + .3 Z_{t-1} + \varepsilon_{t+1}$ where $\varepsilon_{t+1}$ is normally distributed with mean 0 and variance 1 (we know this because we are simulating normal (0,1) random variables). Starting with $t=1$ and $Z_0 = 0.5$ and $Z_1 = -0.3$, generate $Z_2, Z_3, Z_4$ assuming that $\varepsilon_2 = -.6, \varepsilon_3 = 2.2, \varepsilon_4 = 1.4$. Then, use your cumulative distribution from part (a) to generate observations of $P_2, P_3$ and $P_4$.</li>
  </ol>
</li>
</ol>

**Programming questions**

These exercises use the Python module *AssetSelling* on [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Our basic "high-low" selling policy was given by

$$
X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

In addition to the module *AssetSelling*, you will also need to download the spreadsheet "Chapter2_asset_selling_policy" from [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements) which provides parameters to be used by the python module.
  <ol type="a">
    <li>Simulate the policy for 200 time periods using the parameters:

    $$
    \theta^{min} = 6, \quad \theta^{max} = 13, \quad T = 20.
    $$</li>
    <li>Perform a search for the best value of $\theta^{min}$ and $\theta^{max}$ by fixing $\theta^{max} = 13$, and then searching in increments of 1 for the best $\theta^{min}$. Then fix at that value of $\theta^{min}$ and perform a similar search for $\theta^{max}$ (enforce the constraint that $\theta^{max} = \theta^{min}+2$).</li>
  </ol>
</li>
<li>Consider a policy that understands that the price of the asset might be rising, which means that static buy-sell limits might not be effective. Assume that we forecast the price for time $t+1$ using the fitted time series model

$$
\pbar_t = 0.7 p_t + 0.2 p_{t-1} + 0.1 p_{t-2}.
$$

We are going to use $\pbar_t$ as a forecast of $p_{t+1}$ given what we know at time $t$.
  <ol type="a">
    <li>What is the state variable for this problem? If prices are discretized to the nearest 0.1, and prices are assumed to range between 0 and 100, what is the size of the state space?</li>
    <li>Assume we introduce the policy

    $$
    \begin{align}
    X^{time-series}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \pbar_t - \theta \text{ or } p_t > \pbar_t + \theta, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicytimeseries}
    \end{align}
    $$

    In this version of the policy, we are looking for sudden deviations from the expected price. Plot the graph of the objective function (contribution) vs. $\theta$. Comment on your plot. Note that while the state space is quite large, there is no change in the complexity of finding the best policy in this class.

    (Hint: You would need to change the state variable, change the high-low policy, and create an outer loop over different values of $\theta$ in the module *DriverScript*. You are encouraged to play around with your code and choose your own ranges of values. Include how long it took you to run your code with your choice of values.)</li>
  </ol>
</li>
<li>(Continuing from exercise 9) Imagine that our stock follows a seasonal pattern, suggesting that our buy-sell signals should be time-dependent. This means that we need to replace $\theta$ with $\theta_t$. Discuss how this would complicate our policy search process.</li>
<li>(Continuing from exercise 9) We might next feel that our buy-sell signal should depend on the price. For example, if prices are higher, we might feel that we look for a larger deviation from $\pbar_t$ in equation $\eqref{eq:assetsellingpolicytimeseries}$ than if the prices were smaller. This means that we would replace the constant vector $\theta$ with a function $\theta(\pbar_t)$.
  <ol type="a">
    <li>Describe a lookup table representation of $\theta(\pbar_t)$, and draw a graph depicting how you think this function might look. This would require discretizing $\pbar_t$ into, say, 10 ranges. How does this complicate the problem of searching for policies?</li>
    <li>Suggest a parametric form for $\theta(\pbar_t)$ that captures your intuition that $\theta$ should be larger if $\pbar_t$ is larger? What parameters do you now have to search over?</li>
  </ol>
</li>
</ol>
{% endraw %}
