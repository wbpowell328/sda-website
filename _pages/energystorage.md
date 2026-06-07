---
layout: page
title: "Energy storage research"
permalink: /energystorage/
date: 2026-06-04
---

{% raw %}
Energy storage is both disarmingly simple and astonishingly rich. This page summarizes my research into models and algorithms for controlling a wide array of energy storage problems. "Energy storage" is a form of inventory problem, and has taught me quite a bit about complex supply chain problems.

Primary emphasis is on the control strategy, where I have found that, depending on the specific characteristics of the problem, you will need all [four classes of policies](/sda-website/jungle/):

- **Policy function approximations (PFAs)** — analytical functions that map state to action. Examples include: buy at low grid prices, sell at high prices; linear or nonlinear functions; or neural networks (a high-dimensional nonlinear function).
- **Cost function approximations (CFAs)** — parameterized optimization models, largely overlooked in the academic literature.
- **Policies based on value function approximations (VFAs)** — the policies based on Bellman's equation that are very popular in the literature on approximate dynamic programming / reinforcement learning.
- **Policies based on direct lookahead models (DLAs)** — here we solve an optimization problem over some planning horizon to determine what to do now. DLAs can use deterministic or stochastic lookaheads.

In some applications we put considerable effort into the modeling of the underlying stochastic processes: prices, supplies from wind and solar, and loads (demands).

Below I provide brief summaries of each problem class, the solution approach, along with a link to a paper (and occasionally software). The idea is that you can learn about the range of problems and solution approaches without having to read all (or any) of the papers. Let me just say: if you have your favorite solution technique, I have a variation of the problem where it will not work.

This page focuses only on my work in energy storage. I also supervised a wide range of energy-related senior theses. Most of these can be accessed at <http://energysystems.princeton.edu> (click on the "Research" link on the left).

This page is organized under the following headings:

- [**Tutorial: modeling energy storage problems**](#tutorial-modeling) — a foundational paper on proper modeling of energy storage as sequential decision problems.
- [**Time-dependent demands, nonstationary wind with rolling forecasts**](#rolling-forecasts) — parametric CFA / DLA hybrids tuned in a realistic simulator.
- [**Stationary storage with stochastic grid prices**](#stationary-storage) — hidden-state semi-Markov models for crossing times; backward ADP with Benders cuts; Python library.
- [**Benchmarking ADP-based policies for grid-level storage with many devices**](#benchmarking-adp) — separable piecewise-linear VFAs across many batteries.
- [**Co-optimization of storage for frequency regulation and battery arbitrage**](#frequency-regulation) — backward ADP over 43,200 two-second intervals per day.
- [**Tuning a parameterized policy in a time-dependent environment**](#parameterized-policy-tuning) — splines reduce the time-indexed parameter vector from 2,880 to 50.
- [**Bidding battery storage in an hour-ahead market**](#hour-ahead-bidding) — monotone-value-function lookup tables with a convergence proof.
- [**Exploring different approximation strategies for basic energy storage problems**](#approximation-strategies) — when classical ADP works, and (more often) when it does not.
- [**Managing a high-dimensional grid using a single storage device**](#high-dim-grid) — convergence proof for piecewise-linear value-function approximations.
- [**Managing risk in energy storage**](#risk) — mean–conditional-value-at-risk approaches under extreme price volatility.
- [**Approximate dynamic programming for a hydro-electric storage problem**](#hydro-electric) — my first ADP energy paper, with 8,760 hourly periods.
- [**Optimal hour-ahead commitments using energy storage**](#hour-ahead-commitments) — closed-form optimal PFA for a mean-reverting price process.
- [**Modeling off-shore wind investments on the PJM grid**](#offshore-wind) — five buildout levels evaluated using the SMART-ISO simulator.
- [**Comparison of least squares policy iteration (LSPI) to policy search**](#lspi-vs-policy-search) — head-to-head benchmark; policy search wins.
- [**Optimal energy investments including storage**](#energy-investments) — strategic planning with parameterized policy search.
- [**Demonstrating that all four classes of policies may work best for energy storage**](#four-classes-demonstrated) — five storage problems, each best solved by a different class.

The first paper below is a tutorial article on the universal framework with an introduction to the four classes of policies (see the video at the top of [the jungle page](/sda-website/jungle/) for a quick introduction). More important is that it describes how to properly model a variety of energy storage problems as sequential decision problems, with care given to the representation of the state variable (something that is often overlooked in the literature). I recommend this paper as a starting point.

## Tutorial: modeling energy storage problems {#tutorial-modeling}

**Narrative**: This paper is ostensibly on bridging optimal control and reinforcement learning, but it uses a series of energy storage problems to illustrate proper modeling. It illustrates my universal modeling framework for sequential decision problems, and puts special emphasis on modeling state variables.

**Policy class**: The paper is an introduction to the universal framework and describes all four classes of policies. However, the emphasis of this paper is on the modeling of a variety of energy storage problems.

Link to paper:

[Warren B. Powell, "From Reinforcement Learning to Optimal Control: A unified framework for sequential decisions" — book chapter for edited volume *Handbook for Reinforcement Learning and Control* (Kyriakos Vamvoudakis, Frank Lewis, eds.). arxiv.org/abs/1912.03513](http://arxiv.org/abs/1912.03513)

## Time-dependent demands, nonstationary wind with rolling forecasts {#rolling-forecasts}

**Narrative**: This paper considers an energy storage problem with energy from a large wind farm, time-dependent loads and transmission capacities. An important feature of the model is the presence of rolling forecasts, where we fit a stochastic model to data from PJM. Standard approaches to these problems use a deterministic lookahead that is updated as we step forward in time. Stochastic models capture the errors in these forecasts, but do not properly model the stochastic process of the rolling forecast in the lookahead model. This behavior would require a dynamic program that includes the forecast in the state variable. Stochastic models typically fix the forecast (which makes the forecast a latent variable) and model the error in the forecast, without modeling the evolution of the forecasts themselves.

Parametric CFAs are widely used in practice in an ad hoc manner, which means any tunable parameters are not being formally tuned (this is typically done in a simulator, but may have to be done in the field). Deterministic lookaheads are typically dismissed as "industry heuristics" or "deterministic models." If you tune the coefficients using a proper simulator, this is true stochastic optimization with every chance of outperforming stochastic lookahead models that ignore the proper modeling of the rolling forecast in the lookahead model.

**Policy class**: Parametric CFA / DLA — deterministic lookahead, where uncertain forecasts are multiplied by tunable coefficients. The key idea is that the tunable coefficients are tuned in a simulator that captures the full dynamics of the rolling forecasts (and stochastic prices).

Link to paper:

[Saeed Ghadimi, Raymond Perkins, W. B. Powell, "Reinforcement Learning via Parametric Cost Function Approximation for Multistage Stochastic Programming," arxiv.org/abs/2001.00831](https://arxiv.org/abs/2001.00831)

The same idea was applied to the paper below, but using a different parameterization. This work was motivated by a real application in Brazil:

[Vinicius Pinheiro, W. B. Powell, "Reinforcement learning for electricity dispatch in grids with high intermittent generation and energy storage systems: a case study for the Brazilian grid," *International Journal of Energy Research*](https://castle.princeton.edu/wp-content/uploads/2020/11/Pinheiro-2020-Reinforcement-learning-for-electric.pdf)

## Stationary storage with stochastic grid prices {#stationary-storage}

**Narrative**: This work uses a more accurate model of stochastic processes (wind, solar, prices) that replicates *crossing times*, which is the amount of time that the process stays above or below a forecast. This property is important in energy storage research since the size of the storage device will be sensitive to the length of time that the various stochastic processes (energy from wind or solar, or grid prices) stay above or below a forecast.

**Stochastic model**: This paper uses a hidden state semi-Markov model to more accurately capture *crossing times*. Crossing times have been largely overlooked in the wind modeling literature. The backward ADP approach is complicated when using a hidden-state model. This work is reported in

[J. Durante, Raj Patel, W. B. Powell, "A Two-Level Markov Model for Replicating Crossing Time Distributions for Simulations of Renewables in Power Systems," *SIAM J. Uncertainty Quantification*, Vol 6, No. 2, pp. 595–626, 2018. DOI: 10.1137/17M1120555](https://castle.princeton.edu/wp-content/uploads/2020/11/Durante-Scenario-generation-methods-that-replicate-crossing-times-SIAM-JUQ.pdf)

**Policy class**: Backward approximate dynamic programming, which is a process of randomly choosing a set of states at a time $t$ (stepping backward in time), observing the value of being in the state, and using this set of sampled states and values to fit an updated value function approximation (around the post-decision state), before stepping to time $t-1$. I only started using this strategy recently, and have been surprised at how well it has worked across a number of problem settings, spanning energy storage, clinical trials, and allocation of aid to African countries.

The use of the hidden state variable complicated the estimate of value functions (represented by Benders cuts). The work was done for grid-level storage using Benders cuts (SDDP) to approximate the value function. This is a paper that addresses risk, but without using risk measures. Instead, it shows that training the Benders cuts using an accurate stochastic model that captures crossing times reduces risk, without needing the complexity of nonlinear risk measures.

[Joseph Durante, Juliana Nascimento, Tsvetan Asamov, W. B. Powell, "Risk-Directed Importance Sampling in Stochastic Dual Dynamic Programming with Hidden Markov Models for Grid-Level Energy Storage," arxiv.org/abs/2001.06026](https://arxiv.org/abs/2001.06026)

A link to a Python library, including a modest user's manual, [is available on GitHub](https://github.com/wbpowell328/durante-energy-storage). A number of undergraduates at Princeton have used this in their senior theses. It includes the stochastic model above for modeling errors in wind, solar and prices. A spreadsheet interface allows the user to design a variety of energy configurations, but limited to one storage device. It is best to view this as a starting point for developing your own models and algorithms, rather than a black box package.

A related paper developed the idea of using regularization for SDDP algorithms (this is approximate dynamic programming using Benders cuts), tested in the context of energy storage, is:

[Tsvetan Asamov, W. B. Powell, "Regularized Decomposition of High-Dimensional Multistage Stochastic Programs with Markov Uncertainty," *SIAM J. Optimization*, Vol. 28, No. 1, pp. 575–595, 2018.](https://castle.princeton.edu/wp-content/uploads/2020/11/Asamov-Regularized-decomposition-of-high-dimensional-multistage-stochastic-programs-with-Markov-uncertainty.pdf)

## Benchmarking ADP-based policies for grid-level storage with many devices {#benchmarking-adp}

**Narrative**: This paper optimizes grid-level storage using approximate dynamic programming with piecewise, separable VFAs. The approximation was benchmarked against optimal solutions for deterministic problems. The use of separable VFAs, a method that has worked well in physical resource allocation problems, was less obvious for grid storage since batteries are highly substitutable over a grid, limited simply by the presence of congestion.

**Policy class**: Approximate dynamic programming (VFA) — the separable, piecewise-linear approximations make it possible to optimize across dozens (or hundreds) of battery storage devices at the same time.

Link to paper:

[Daniel Salas, W. B. Powell, "Benchmarking a Scalable Approximate Dynamic Programming Algorithm for Stochastic Control of Grid-Level Storage," *Informs J. on Computing*, Vol. 30, No. 1, pp. 106–123, 2018.](https://castle.princeton.edu/wp-content/uploads/2020/11/Salas-Benchmarking-a-Scalable-Approximate-Dynamic-JOC-2018.pdf)

## Co-optimization of storage for frequency regulation and battery arbitrage {#frequency-regulation}

**Narrative**: This project involved optimizing a battery storage device for two revenue streams. The first is classical frequency regulation, where the grid operator sends a "RegD signal" telling the battery when to charge or discharge. These signals come every two seconds, and are used to stabilize fluctuations in power across the grid. Battery operators can be paid approximately \$30 per megawatt of power when they are called to push or store power.

The idea was to introduce the dimension of occasionally disobeying the RegD signal (for which we are penalized) in order to take advantage of price spikes. For example, the RegD signal may tell us to buy from the grid at a time when electricity prices are very high, and make it profitable to sell into the grid.

This is one of the hardest storage problems I have ever worked on. There are 43,200 two-second intervals each day. Reacting to the RegD signal does not take any sophistication — you just do what you are told. But if you want to look for arbitrage opportunities, you have to optimize over time, which means using a fundamentally different class of policy. The value of doing this is not large (we obtained about a 10 percent increase in revenue), but the policy still has to work well enough to outperform a pure RegD-following policy.

**Policy class**: Backward approximate dynamic programming — this was our first time using backward ADP, and I went down this path since I had little confidence in forward ADP algorithms for a problem with this many time periods. Note that the underlying policy is highly nonstationary, since the demand and price patterns depend very much on daily congestion patterns.

Link to papers:

[Bolong (Harvey) Cheng, W. B. Powell, "Co-optimizing Battery Storage for Frequency Regulation and Energy Arbitrage using Multiscale Dynamic Programming," *IEEE Transactions on the Smart Grid*, Vol. 9, No. 3, pp. 1997–2005, 2018.](https://castle.princeton.edu/wp-content/uploads/2020/11/Cheng-MultiscaleOptimization_IEEE_final.pdf)

[Bolong (Harvey) Cheng, Tsvetan Asamov, W. B. Powell, "Low-Rank Value Function Approximation for Co-Optimization of Battery Storage," *IEEE Transactions on Power Systems*, Vol. 9, No. 6, pp. 6590–6598, 2018.](https://castle.princeton.edu/wp-content/uploads/2020/11/Cheng-Low-rank-value-function-approximation-for-co-optimization-of-battery-storage.pdf)

## Tuning a parameterized policy for energy storage in a time-dependent environment {#parameterized-policy-tuning}

**Narrative**: A popular strategy is to design some sort of parameterized policy to control a system. The problem is that if you have a parameter vector $\theta$, the standard assumption is to assume that it does not depend on time. This will not work in a nonstationary application, which means we would have to fit a parameter vector $\theta_t$ for each point in time. For a battery storage problem, it is common to make decisions every five minutes (electricity prices are typically updated every five minutes). If $\theta$ has 10 dimensions, then this means estimating 2,880 parameters.

In this work, we represented each element of $\theta_t$ using a spline with five knots. This reduces the problem from 2,880 parameters down to 50 parameters.

**Policy class**: Policy function approximation, using coefficients that are represented using a low-dimensional spline.

Link to paper:

[S. Moazeni, W. B. Powell, B. Defourny, B. Bouzaiene-Ayari, "Parallel Non-Stationary Direct Policy Search for Risk-Averse Stochastic Optimization," *Informs J. on Computing*, Vol. 29, No. 2, pp. 332–349, 2017.](https://castle.princeton.edu/wp-content/uploads/2020/11/Moazeni-Parallel-Nonstationary-direct-policy-search-for-risk-averse-stochastic-optimization-JOC-April-2017.pdf)

## Bidding battery storage in an hour-ahead market {#hour-ahead-bidding}

**Narrative**: This was a battery bidding problem where at 1 pm, you had to pick the buy/sell points for the battery as it was operated between 2 and 3 pm. We tried a variety of approximation strategies for the value function approximations (notably a family of locally linear approximations), but they simply did not work when compared against a slightly simplified benchmark that we could solve optimally (and very slowly). We could see that the value function had the behavior of increasing in a series of plateaus, which also meant that it was monotone in the bids. We implemented a lookup table but imposed monotonicity, and this worked surprisingly well. In a separate paper we were able to provide a formal convergence proof (based on ideas from Bertsekas' Neuro-DP book).

We have since used this idea in other settings with considerable success. It makes it possible to use lookup tables with up to around 7 dimensions (which is pretty large for a lookup table).

**Policy class**: VFA using monotone value functions.

Link to paper:

[D. Jiang, W. B. Powell, "Optimal Hour-Ahead Bidding in the Real-Time Electricity Market with Battery Storage Using Approximate Dynamic Programming," *Informs J. on Computing*, Vol. 27, No. 3, pp. 525–543, 2015.](https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-OptimalHourAheadBidding_JOC_Oct2015.pdf) [Online supplement](https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-OptimalHourAheadBidding_JOC_OnlineSupplement_Oct2015.pdf)

Convergence proof:

[Daniel Jiang, W. B. Powell, "An Approximate Dynamic Programming Algorithm for Monotone Value Functions," *Operations Research*, Nov 2015. DOI: 10.1287/opre.2015.1425](https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-ADPforMonotoneValueFunctions_OR_Nov042015.pdf)

## Exploring different approximation strategies for basic energy storage problems {#approximation-strategies}

**Narrative**: While approximate dynamic programming is a powerful algorithmic strategy, classical ADP methods (based, for example, on lookup tables or linear models) can work very poorly. This paper summarizes a range of experiments we have accumulated over the years reporting on ***unsuccessful*** uses of ADP for energy storage. Where we have had real success is when we can exploit structure in the VFA, such as convexity or monotonicity.

**Policy class**: Approximate dynamic programming (VFAs).

Link to paper:

[Daniel Jiang, Thuy Pham, Warren B. Powell, Daniel Salas, Warren Scott, "A Comparison of Approximate Dynamic Programming Techniques on Benchmark Energy Storage Problems: Does Anything Work?," IEEE Symposium Series on Computational Intelligence, Workshop on Approximate Dynamic Programming and Reinforcement Learning, Orlando, FL, December 2014.](https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-ComparisonofADP_DoesAnythingWorkADPRLSept2014.pdf)

## Managing a high-dimensional grid using a single storage device {#high-dim-grid}

**Narrative**: This paper offers a formal convergence proof for managing a high-dimensional grid using a single (or aggregated) energy storage device. The paper proves asymptotic convergence for an algorithm that approximates the value of energy in storage using a piecewise linear function.

**Policy class**: Approximate dynamic programming.

Link to paper:

[J. Nascimento, W. B. Powell, "An Optimal Approximate Dynamic Programming Algorithm for Concave, Scalar Storage Problems with Vector-Valued Controls," *IEEE Transactions on Automatic Control*, Vol. 58, No. 12, pp. 2995–3010, 2013. DOI: 10.1109/TAC.2013.2272973](http://dx.doi.org/10.1109/TAC.2013.2272973)

## Managing risk in energy storage {#risk}

**Narrative**: Since energy storage problems are typically solved in the presence of highly stochastic prices (prices from the grid can jump by factors of 10 to 100, far greater than stock price variations), this paper explores the use of conditional value at risk in the operation of an energy storage problem.

**Policy class**: The paper compares myopic policies (risk neutral and with CVaR) to optimal policies.

Link to paper:

[Moazeni, Somayeh, W. B. Powell, A. H. Hajimiragha, "Mean-Conditional Value-at-Risk Optimal Energy Storage Operation in the Presence of Transaction Costs," *IEEE Transactions on Power Systems*, Vol. 30, No. 3, pp. 1222–1232, 2015.](https://castle.princeton.edu/wp-content/uploads/2020/11/Moazeni-Mean-conditional-value-at-risk-optimal-energy-storage-operation-IEEE-July-20-2014.pdf)

## Approximate dynamic programming for a hydro-electric storage problem {#hydro-electric}

**Narrative**: This was my first ADP-based paper in energy. At the time I started the project, there was (and still is) a substantial community solving energy resource management problems over multi-year horizons as deterministic linear programs (this dates back to the early 1970s). Typical time increments might be a month or a week, but there was interest in modeling wind while capturing hourly variations. This paper used ADP to optimize a high-dimensional resource allocation problem in energy with a single hydro-electric reservoir over multiple years, but in hourly increments. The model captured the highly seasonal rainfall, and a finite-capacity reservoir. We showed that when applied to deterministic data, ADP could exactly match the optimal solution from a deterministic LP. When we introduced stochastic rainfall patterns, the model displayed robust behavior where the reservoir would be filled up early enough that we could ensure filling the reservoir (to be used in late summer) given the uncertainty in rainfall patterns. The yearly model had 8,760 time periods.

**Policy class**: Forward ADP using value function approximations.

Link to paper:

[Powell, W. B., George, A., A. Lamont, J. Stewart, "SMART: A Stochastic Multiscale Model for the Analysis of Energy Resources, Technology and Policy," *Informs J. on Computing*, Vol. 24, No. 4, pp. 665–682, 2012.](https://castle.princeton.edu/wp-content/uploads/2020/11/Powell-SMART_JOC_April2011.pdf) [Online supplement](https://castle.princeton.edu/wp-content/uploads/2020/11/Powell-SMART_JOC_April2011_online_supplement.pdf)

## Optimal hour-ahead commitments using energy storage {#hour-ahead-commitments}

**Narrative**: This paper addressed a simple problem of making hour-ahead commitments in the context of a mean-reverting price process. The problem is structured so that energy stored in one time period is always used in the next time period. We exploit this structure to design an optimal policy that can be computed analytically.

**Policy class**: The optimal policy falls in the PFA class, since it is an analytical function.

Link to paper:

[Jae Ho Kim, W. B. Powell, "Optimal Energy Commitments with Storage and Intermittent Supply," *Operations Research*, Vol. 59, No. 6, pp. 1347–1360, 2011.](https://castle.princeton.edu/wp-content/uploads/2020/11/Kim-Powell-Optimal-Energy-Commitments-with-Storage-and-Intermittent-Supply.pdf)

## Modeling off-shore wind investments on the PJM grid {#offshore-wind}

**Narrative**: This was a multi-year study that created a large model of the PJM grid, which we used to study the impact of off-shore wind on the operation of the PJM grid. PJM operates a grid with several large reservoirs (the energy storage), but the model also captured individual generators and the grid itself. The model was carefully calibrated against actual operations. [The SMART-ISO simulator behind this study is described here](/sda-website/smartiso/). Working with Willett Kempton at the University of Delaware, we modeled five levels of investment in offshore wind, with the highest investment providing 70 gigawatts of generation capacity (the PJM grid runs 80 to 120 GW of actual generation, depending on the season). At the highest level, we could serve around 20 percent of the total load with wind, but outages would occur. We could get up to around 40 GW of generation capacity without outages when using sufficient reserves (from natural gas).

**Policy class**: Lookahead simulator with parameterized reserve policies; the SMART-ISO simulator handles day-ahead, hour-ahead, and real-time dispatch decisions.

Link to paper:

[Hugo P. Simao, W. B. Powell, C. Archer, W. Kempton, "The challenge of integrating offshore wind power in the US electric grid. Part II: Simulation of electricity market operations," *Renewable Energy*, Vol. 103, pp. 418–431, 2017.](https://castle.princeton.edu/wp-content/uploads/2020/11/Simao-The-challenge-of-integrating-offshore-wind-Part-II-Simulation-of-electricity-market-operations.pdf)

## Comparison of least squares policy iteration (LSPI) to policy search {#lspi-vs-policy-search}

**Narrative**: This paper was a simple exercise comparing the performance of a popular strategy called "least squares policy iteration" (LSPI), and policy search. Both policies consist of maximizing a one-period contribution plus a linear function using the same terms. The only difference is that LSPI attempts to fit the linear function to the value of being in a state (this is a steady-state problem), while policy search optimizes the parameters to achieve the maximum performance. Policy search significantly outperformed LSPI.

The policy was very low-dimensional, simplifying the policy search problem.

**Policy class**: VFA and CFA.

Link to paper:

[S. Moazeni, W. R. Scott, W. B. Powell, "Least Squares Policy Iteration with Instrumental Variables vs. Direct Policy Search: Comparison Against Optimal Benchmarks Using Energy Storage," *INFOR: Information Systems and Operational Research*, Vol. 58, No. 1, pp. 141–166, 2020.](https://castle.princeton.edu/wp-content/uploads/2020/11/Moazeni-Least-squares-policy-iteration-with-instrumental-variables-vs-direct-policy-search-comparison-against-optimal-benchmarks-using-energy-storage.pdf)

## Optimal energy investments including storage {#energy-investments}

**Narrative**: This paper describes a strategic planning model that operates an energy system using a parameterized policy. There are design decisions (how much capacity for wind, solar and storage) and control decisions (how much to store / withdraw into / out of the storage device). The paper explores different algorithms for doing the policy search.

**Policy class**: CFA.

Link to paper:

[J. Khazaei, W. B. Powell, "SMART-Invest — A stochastic, dynamic planning model for optimizing investments in wind, solar, and storage in the presence of fossil fuels: The case of the PJM Electricity Market," *Energy Systems*, Vol. 9, No. 2, pp. 277–303, 2018.](https://castle.princeton.edu/wp-content/uploads/2020/11/Khazaei-SMART-Invest-Stochastic-dynamic-planning-model.pdf)

## Demonstrating that all four classes of policies may work best for energy storage {#four-classes-demonstrated}

**Narrative**: The two papers cited below are exercises in showing that all four classes of policies may be useful. The first paper to do this was the work with Stephan Meisel who created five different energy storage problems, where the first four were tuned for each of the four classes of policies. The fifth used a hybrid (a parameterized direct lookahead). The senior thesis by [Madhumitha Shridharan](https://castle.princeton.edu/wp-content/uploads/2020/11/shridharan_madhumitha_thesis-May-5-2020.pdf) included work with backward ADP, a strategy we only discovered more recently.

**Policy class**: All four classes of policies, plus a hybrid, were used in this work.

Links to papers:

[W. B. Powell, S. Meisel, "Tutorial on Stochastic Optimization in Energy Part II: An Energy Storage Illustration," *IEEE Trans. on Power Systems*, Vol. 31, No. 2, pp. 1468–1475, 2016.](https://castle.princeton.edu/Papers/Powell%20Meisel%20-%20Tutorial%20on%20stochastic%20optimization%20in%20energy%20Part%20II%20Energy%20storage%20illustration%20March%202016.pdf)

[Madhumitha Shridharan, "The Little Wind Farm that Could: A Comparative Analysis of Lookahead Policies for Energy Storage Problems," Undergraduate senior thesis (supervised by Warren Powell), Department of Operations Research and Financial Engineering, Princeton University, May 2020.](https://castle.princeton.edu/wp-content/uploads/2020/11/shridharan_madhumitha_thesis-May-5-2020.pdf)
{% endraw %}
