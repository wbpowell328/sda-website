---
layout: page
title: "Warren Powell's energy storage research"
permalink: /energystorage/
date: 2020-11-21 15:07:28
---

<!-- wp:paragraph -->
<p>Energy storage is both disarmingly simple and astonishing rich.  This page summarizes my research into models and algorithms for controlling a wide array of energy storage problems.  "Energy storage" is a form of inventory problem, and has taught me quite a bit about complex supply chain problems.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Primary emphasis is on the control strategy, where I have found that, depending on the specific characteristics of the problem, you will need all <a href="http://castle.princeton.edu/jungle/">four classes of policies</a>:   </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Policy function approximations (PFAs) - These are analytical functions that map state to action.  Examples include: buy at low grid prices, sell at high prices; linear or nonlinear functions; or neural networks (a high dimensional nonlinear function).</li><li>Cost function approximations (CFAs) - These are parameterized optimization models, largely overlooked in the academic literature.</li><li>Policies based on value function approximations (VFAs) - These are the policies based on Bellman's equation that are very popular in the literature on approximate dynamic programming/reinforcement learning.</li><li>Policies based on direct lookahead models (DLAs) - Here we solve an optimization problem over some planning horizon to determine what to do now.  DLAs can use deterministic or stochastic lookaheads.</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>In some applications we put considerable effort into the modeling of the underlying stochastic processes: prices, supplies from wind and solar, and loads (demands).  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Below I provide brief summaries of each problem class, the solution approach, along with a link to a paper (and occasionally software).  The idea is that you can learn about the range of problems and solution approaches without having to read all (or any) of the papers.  Let me just say: if you have your favorite solution technique, I have a variation of the problem where it will not work.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This page focuses only on my work in energy storage.  I also supervised a wide range of energy-related senior theses.  Most of these can be accessed at <a href="http://energysystems.princeton.edu">http://energysystems.princeton.edu</a> (click on the "Research" link on the left).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The first paper below is a tutorial article on the universal framework with an introduction to the four classes of policies (see the video at the top of <a href="http://castle.princeton.edu/jungle/">jungle.princeton.edu</a> for a quick introduction).  More important is that it describes how to properly model a variety of energy storage problems as sequential decision problems, with care given to the representation of the state variable (something that is often overlooked in the literature).  I recommend this paper as a starting point.  </p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Tutorial: Modeling energy storage problems</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This paper is ostensibly on bridging optimal control and reinforcement learning, but it uses a series of energy storage problems to illustrate proper modeling.  It illustrates my universal modeling framework for sequential decision problems, and puts special emphasis on modeling state variables.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: The paper is an introduction to the universal framework and describes all four classes of policies.  However, the emphasis of this paper is on the modeling of a variety of energy storage problems.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="http://arxiv.org/abs/1912.03513">Warren B Powell, “From Reinforcement Learning to Optimal Control: A unified framework for sequential decisions” Book chapter for edited volume: Handbook for Reinforcement Learning and Control (Kyriakos Vamvoudakis, Frank Lewis, eds). http://arxiv.org/abs/1912.03513</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Time-dependent demands, nonstationary wind with rolling forecasts</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This paper considers an energy storage problem with energy from a large wind farm, time-dependent loads and transmission capacities.  An important feature of the model is the presence of rolling forecasts, where we fit a stochastic model to data from PJM.  Standard approaches to these problems is to use a deterministic lookahead that is updated as we step forward in time.  Stochastic models captures the errors in these forecasts, but do not properly model the stochastic process of the rolling forecast in the lookahead model.  This behavior would require a dynamic program that includes the forecast in the state variable.  Stochastic models typically fix the forecast (which make the forecast a latent variable) and model the error in the forecast, without modeling the evolution of the forecasts themselves.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Parametric CFAs are widely used in practice in an ad hoc manner, which means any tunable parameters are not being formally tuned (this is typically done in a simulator, but may have to be done in the field).  Deterministic lookaheads are typically dismissed as "industry heuristics" or "deterministic models."  If you tune the coefficients using a proper simulator, this is true stochastic optimization with every chance of outperforming stochastic lookahead models that ignore the proper modeling of the rolling forecast in the lookahead model.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: Parametric CFA/DLA - Deterministic lookahead, where uncertain forecasts are multiplied by tunable coefficients.  The key idea is that the tunable coefficients are tuned in a simulator that captures the full dynamics of the rolling forecasts (and stochastic prices).  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://arxiv.org/abs/2001.00831">Saeed Ghadimi, Raymond Perkins, W.B. Powell, “Reinforcement Learning via Parametric Cost Function Approximation for Multistage Stochastic Programming,” https://arxiv.org/abs/2001.00831</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The same idea was applied to the paper below, but using a different parameterization.  This work was motivated by a real application in Brazil:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Pinheiro-2020-Reinforcement-learning-for-electric.pdf">Vinicius Pinheiro, W.B. Powell, “Reinforcement learning for electricity dispatch in grids with high intermittent generation and energy storage systems: a case study for the Brazilian grid,” International Journal of Energy Research (to appear)</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Stationary storage with stochastic grid prices</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This work uses a more accurate model of stochastic processes (wind, solar, prices) that replicates <em>crossing times</em>, which is the amount of time that the process stays above or below a forecast.  This property is important in energy storage research since the size of the storage device will be sensitive to the length of time that the various stochastic processes (energy from wind or solar, or grid prices) stay above or below a forecast.  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Stochastic model</strong>: This paper uses a hidden state semi-Markov model to more accurately capture <em>crossing times</em>, which is the amount of time that the wind is higher or lower than a forecast.  Crossing times have been largely overlooked in the wind modeling literature.  The backward ADP approach is complicated when using a hidden state model.  This work is reported in</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Durante-Scenario-generation-methods-that-replicate-crossing-times-SIAM-JUQ.pdf">J. Durante, Raj Patel, W.B. Powell, “A Two-Level Markov Model for Replicating Crossing Time Distributions for Simulations of Renewables in Power Systems,” SIAM J. Uncertainty Quantification, Vol 6, No. 2, pp. 595-626.  DOI: 10.1137/17M1120555, 2018.</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: Backward approximate dynamic programming, which is a process of randomly choosing a set of states at a time t (stepping backward in time), observing the value of being in the state, and using this set of sampled states and values to fit an updated value function approximation (around the post-decision state), before stepping to time t-1.  I only started using this strategy recently, and have been surprised at how well it has worked across a number of problem settings, spanning energy storage, clinical trials, and allocation of aid to African countries.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The use of the hidden state variable complicated the estimate of value functions (represented by Benders cuts).  The work was done for grid-level storage using Benders cuts (SDDP) to approximate the value function.  This is a paper that addresses risk, but without using risk measures.  Instead, it shows that training the Benders cuts using an accurate stochastic model that captures crossing times reduces risk, without needing the complexity of nonlinear risk measures.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://arxiv.org/abs/2001.06026">Joseph Durante, Juliana Nascimento, Tsvetan Asamov, W.B. Powell, “Risk Directed Importance Sampling in Stochastic Dual Dynamic Programming with Hidden Markov Models for Grid Level Energy Storage,” https://arxiv.org/abs/2001.06026,</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A link to a python library, including a modest users manual, <a href="https://github.com/wbpowell328/durante-energy-storage">is available here</a>. A number of undergraduates at Princeton have used this in their senior theses.  It includes the stochastic model above for modeling errors in wind, solar and prices.  A spreadsheet interface allows the user to design a variety of energy configurations, but limited to one storage device.  It is best to view this as a starting point for developing your own models and algorithms, rather than a black box package.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A related paper developed the idea of using regularization for SDDP algorithms (this is approximate dynamic programming using Benders cuts), tested in the context of energy storage, is:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Asamov-Regularized-decomposition-of-high-dimensional-multistage-stochastic-programs-with-Markov-uncertainty.pdf">Tsvetan Asamov, W. B. Powell, “Regularized Decomposition of High-Dimensional Multistage Stochastic Programs with Markov Uncertainty,” SIAM J. Optimization, Vol. 28, No. 1, pp. 575-595, 2018.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Benchmarking ADP-based policies for grid-level storage with many devices</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This paper optimizes grid-level storage using approximate dynamic programming with piecewise, separable VFAs.  The approximation was benchmarked against optimal solutions for deterministic problems.  The use of separable VFAs, a method that has worked well in physical resource allocation problems, was less obvious for grid storage since batteries are highly substitutable over a grid, limited simply by the presence of congestion.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: Approximate dynamic programming (VFA) - Th separable, piecewise linear approximations makes it possible to optimize across dozens (or hundreds) of battery storage devices at the same time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Salas-Benchmarking-a-Scalable-Approximate-Dynamic-JOC-2018.pdf">Daniel Salas, W. B. Powell, “Benchmarking a Scalable Approximation Dynamic Programming Algorithm for Stochastic Control of Grid Level Storage,” Informs J. on Computing, Vol. 30, No. 1, pp.. 106-123, 2018.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Co-optimization of storage for frequency regulation and battery arbitrage</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This project involve optimizing a battery storage device for two revenue streams.  The first is classical frequency regulation, where the grid operator sends a "RegD signal" telling the battery when to charge or discharge.  These signals come every two seconds, and are used to stabilize fluctuations in power across the grid. Battery operators can be paid approximately $30 per megawatt of power when they are called to push or store power. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The idea was to introduce the dimension of occasionally disobeying the RegD signal (for which we are penalized) in order to take advantage of price spikes.  For example, the RegD signal may tell us to buy from the grid at a time when electricity prices are very high, and make it profitable to sell into the grid.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is one of the hardest storage problems I have ever worked on.  There are 43,200 2-second intervals each day.  Reacting to the RegD signal does not take any sophistication - you just do what you are told.  But if you want to look for arbitrage opportunities, you have to optimize over time, which means using a fundamentally different class of policy.  The value of doing this is not large (we obtained about a 10 percent increase in revenue), but the policy still has to work well enough to outperform a pure RegD-following policy.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: Backward approximate dynamic programming - This was our first time using backward ADP, and I went down this path since I had little confidence in forward ADP algorithms for a problem with this many time periods.  Note that the underlying policy is highly nonstationary, since the demand and price patterns depend very much on daily congestion patterns.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Cheng-MultiscaleOptimization_IEEE_final.pdf">Bolong (Harvey) Cheng, W.B. Powell, “Co-optimizing Battery Storage for Frequency Regulation and Energy Arbitrage using Multiscale Dynamic Programming,” IEEE Transactions on the Smart Grid,” Vol. 9, No. 3, pp. 1997-2005, 2018.</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Cheng-Low-rank-value-function-approximation-for-co-optimization-of-battery-storage.pdf">Bolong (Harvey) Cheng, Tsvetan Asamov, W.B. Powell, “Low Rank Value Function Approximation for Co-Optimization of Battery Storage,” IEEE Transactions on Power Systems, Vol. 9, No. 6, pp. 6590-6598, 2018.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Tuning a parameterized policy for energy storage in a time-dependent environment</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: A popular strategy is to design some sort of parameterized policy to control a system.  The problem is that if you have a parameter vector \theta, the standard assumption is to assume that it does not depend on time.  This will not work in a nonstationary application, which means we would have to fit a parameter vector \theta_t for each point in time.  For a battery storage problem, it is common t make decisions every five minutes (electricity prices are typically updated every five minutes).  If \theta has 10 dimensions, then this means estimating 2,880 parameters.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In this work, we represented each element of \theta_t using a spline with five knots.  This reduces the problem from 2,880 parameters down to 50 parameters.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: Policy function approximation, using coefficients that are represented using a low-dimensional spline.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Moazeni-Parallel-Nonstationary-direct-policy-search-for-risk-averse-stochastic-optimization-JOC-April-2017.pdf">S. Moazeni, W.B. Powell, B. Defourny, B. Bouzaiene-Ayari, “Parallel Non-Stationary Direct Policy Search for Risk Averse Stochastic Optimization,” Informs J. on Computing, Vol. 29, No. 2, pp. 332-349, 2017.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Bidding battery storage in an hour-ahead market</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This was a battery bidding problem where at 1pm, you had to pick the buy/sell points for the battery as it was operated between 2 and 3pm.  We tried a variety of approximation strategies for the value function approximations (notably a family of locally linear approximations), but they simply did not work when compared against a slightly simplified benchmark that we could solve optimally (and very slowly).  We could see that the value function had the behavior of increasing in a series of plateaus, which also meant that it was monotone in the bids.  We implemented a lookup table but imposed monotonicity, and this worked surprisingly well.  In a separate paper we were able to provide a formal convergence proof (based on ideas from Bertsekas' Neuro-DP book).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We have since used this idea in other settings with considerable success.  It makes it possible to use lookup tables with up to around 7 dimensions (which is pretty large for lookup table)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: VFA using monotone value functions.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-OptimalHourAheadBidding_JOC_Oct2015.pdf">D. Jiang, W. B. Powell, “Optimal Hour-ahead Bidding in the Real-Time Electricity Market with Battery Storage Using Approximate Dynamic Programming” Informs J. on Computing, Vol. 27, No. 3, pp. 525-543 (2015)</a>.  <a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-OptimalHourAheadBidding_JOC_OnlineSupplement_Oct2015.pdf">Online supplement</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Convergence proof:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-ADPforMonotoneValueFunctions_OR_Nov042015.pdf">Daniel Jiang, W. B. Powell, “An Approximate Dynamic Programming Algorithm for Monotone Value Functions,” Operations Research, appeared online Nov 4, 2015. http://dx.doi.org/10.1287/opre.2015.1425</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Exploring different approximation strategies for basic energy storage problems</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: While approximate dynamic programming is a powerful algorithmic strategy, classical ADP methods (based, for example, on lookup tables or linear models) can work very poorly.  This paper summarizes a range of experiments we have accumulated over the years reporting on <strong><em>unsuccessful </em></strong>uses of ADP for energy storage.  Where we have had real success is when we can exploit structure in the VFA, such as convexity or monotonicity.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>:  Approximate dynamic programming (VFAs)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Jiang-ComparisonofADP_DoesAnythingWorkADPRLSept2014.pdf">Daniel Jiang, Thuy Pham, Warren B. Powell, Daniel Salas, Warren Scott, “A Comparison of Approximate Dynamic Programming Techniques on Benchmark Energy Storage Problems: Does Anything Work?,” IEEE Symposium Series on Computational Intelligence, Workshop on Approximate Dynamic Programming and Reinforcement Learning, Orlando, FL, December, 2014.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Managing a high-dimensional grid using a single storage device</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This paper offers a formal convergence proof for managing a high-dimensional grid using a single (or aggregated) energy storage device.  The paper proves asymptotic convergence for an algorithm that approximates the value of energy in storage using a piecewise linear function.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: Approximate dynamic programming</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="http://dx.doi.org/10.1109/TAC.2013.2272973">J. Nascimento, W. B. Powell, “An Optimal Approximate Dynamic Programming Algorithm for Concave, Scalar Storage Problems with Vector-Valued Controls,” IEEE Transactions on Automatic Control, Vol. 58, No. 12, pp. 2995-3010. http://dx.doi.org/10.1109/TAC.2013.2272973  (2013).</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Managing risk in energy storage</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: Since energy storage problems are typically solved in the presence of highly stochastic prices (prices from the grid can jump by factors of 10 to 100, far greater than stock price variations).  This paper explores the use of conditional value at risk in the operation of an energy storage problem.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>:  The paper compares myopic policies (risk neural and with CVaR) to optimal policies.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Moazeni-Mean-conditional-value-at-risk-optimal-energy-storage-operation-IEEE-July-20-2014.pdf">Moazeni, Somayeh, W.B. Powell, A. H. Hajimiragha, “Mean-Conditional Value-at-Risk Optimal Energy Storage Operation in the Presence of Transaction Costs,” IEEE Transactions on Power Systems, Vol. 30, No. 3, pp. 1222-1232, 2015.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Approximate dynamic programming for a hydro-electric storage problem</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This was my first ADP-based paper in energy.  At the time I started the project, there was  (and still is) a substantial community solving energy resource management problems over multi-year horizons as deterministic linear programs (this dates back to the early 1970s).  Typical time increments might be a month or a week, but there was interest in modeling wind while capturing hourly variations.  This paper used ADP to optimize a high-dimensional resource allocation problem in energy with a single hydro-electric reservoir over multiple years, but in hourly increments.  The model captured the highly seasonal rainfall, and a finite capacity reservoir.  We showed that when applied to deterministic data, ADP could exactly match the optimal solution from a deterministic LP.  When we introduced stochastic rainfall patterns, the model displayed robust behavior where the reservoir would be filled up early enough that we could ensure filling the reservoir (to be used in late summer) given the uncertainty in rainfall patterns.  The yearly model had 8,760 time periods.  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: Forward ADP using value function approximations.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Powell-SMART_JOC_April2011.pdf">Powell, W. B., George, A., A. Lamont and J. Stewart, “SMART: A Stochastic Multiscale Model for the Analysis of Energy Resources, Technology and Policy,” Informs J. on Computing, Vol. 24, No. 4, pp. 665-682 (2012).</a> <a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Powell-SMART_JOC_April2011_online_supplement.pdf">Online supplement</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Optimal hour-ahead commitments using energy storage</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This paper addressed a simple problem of making hour-ahead commitments in the context of a mean-reverting price process.  The problem is structured where energy stored in one time period is always used in the next time period.  We exploit this structure to design an optimal policy that can be computed analytically.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: The optimal policy falls in the PFA class, since it is an analytical function.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Kim-Powell-Optimal-Energy-Commitments-with-Storage-and-Intermittent-Supply.pdf">Jae Ho Kim, W. B. Powell, “Optimal Energy Commitments with Storage and Intermittent Supply,” <em>Operations Research</em>, Vol. 59, No. 6, pp. 1347-1360 (2011).</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Modeling off-shore wind investments on the PJM grid</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This was a multiyear study that created a large model of the PJM grid, which we used to study the impact of off-shore wind on the operation of the PJM grid.  PJM operates a grid with several large reservoirs (the energy storage), but the model also captured individual generators and the grid itself.  The model was carefully calibrated against actual operations.  <a href="http://energysystems.princeton.edu/smartiso.htm">The project is described here</a>.  Working with Willett Kempton at the University of Delaware, we modeled five levels of investment in offshore wind, with the highest investment providing 70 gigawatts of generation capacity (the PJM grid runs 80 to 120 GW of actual generation, depending on the season).  At the highest level, we could serve around 20 percent of the total load with wind, but outages would occur.  We could get up to around 40 GW of generation capacity without outages when using sufficient reserves (from natural gas).  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Simao-The-challenge-of-integrating-offshore-wind-Part-II-Simulation-of-electricity-market-operations.pdf">Hugo P. Simao, W.B. Powell, C. Archer, W. Kempton, “The challenge of integrating offshore wind power in the US electric grid. Part II: Simulation of electricity market operations,” Renewable Energy, Vol. 103, pp. 418-431, 2017.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Comparison of least squares policy iteration (LSPI) to policy search</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This paper was a simple exercise comparing the performance of a popular strategy called "least squares policy iteration" (LSPI), and policy search.  Both policies consist of maximizing a one-period contribution plus a linear function using the same terms.  The only difference is that LSPI attempts to fit the linear function to the value of being in a state (this is a steady state problem), while policy search optimizes the parameters to achieve the maximum performance.  Policy search significantly outperformed LSPI.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The policy was very low dimensional, simplifying the policy search problem.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: VFA and CFA.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Moazeni-Least-squares-policy-iteration-with-instrumental-variables-vs-direct-policy-search-comparison-against-optimal-benchmarks-using-energy-storage.pdf">S. Moazeni, W. R. Scott, W. B. Powell,  “Least Squares Policy Iteration with Instrumental Variables vs. Direct Policy Search: Comparison Against Optimal Benchmarks Using Energy Storage,” INFOR: Information Systems and Operational Research, Vol. 58, No. 1, pp. 141-166, 2020.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Optimal energy investments including storage</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: This paper describes a strategic planning model that operations an energy system using a parameterized policy.  There are design decisions (how much capacity for wind, solar and storage) and control decisions (how much to store/withdraw into/out of the storage device).  The paper explores different algorithms for doing the policy search.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>: CFA</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Link to paper:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/Khazaei-SMART-Invest-Stochastic-dynamic-planning-model.pdf">J. Khazaei, W. B. Powell, “SMART-Invest -A stochastic, dynamic planning for optimizing investments in wind, solar, and storage in the presence of fossil fuels: The Case of the PJM Electricity Market,” Energy Systems, Vol. 9, No. 2, pp. 277-303, 2018.</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Demonstrating that all four classes of policies may work best for energy storage</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Narrative</strong>: The two papers cited below are exercises in showing that all four classes of policies may be useful.  The first paper to do this was the work with Stephan Meisel who created five different energy storage problems, where the first four were tuned for each of the four classes of policies.  The fifth used a hybrid (a parameterized direct lookahead).  The senior thesis by <a href="https://castle.princeton.edu/wp-content/uploads/2020/11/shridharan_madhumitha_thesis-May-5-2020.pdf">Madhumitha Shridharan</a> included work with backward ADP, a strategy we only discovered more recently.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Policy class</strong>:  All four classes of policies, plus a hybrid, were used in this work.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Links to papers:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/Papers/Powell%20Meisel%20-%20Tutorial%20on%20stochastic%20optimization%20in%20energy%20Part%20II%20Energy%20storage%20illustration%20March%202016.pdf">W. B. Powell and S. Meisel, “Tutorial on Stochastic Optimization in Energy Part II: An Energy Storage Illustration,” IEEE Trans. on Power Systems, Vol. 31, No. 2, pp. 1468-1475, 2016.</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://castle.princeton.edu/wp-content/uploads/2020/11/shridharan_madhumitha_thesis-May-5-2020.pdf">Madhumitha Shridharan “The Little Wind Farm that Could: A Comparative Analysis of Lookahead Policies for Energy Storage Problems,” Undergraduate senior thesis (supervised by Warren Powell), Department of Operations Research and Financial Engineering, Princeton University, May, 2020.</a></p>
<!-- /wp:paragraph -->
