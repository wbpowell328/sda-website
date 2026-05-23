---
layout: page
title: "Computational Stochastic Optimization"
permalink: /computational-stochastic-optimization/
date: 2017-09-07 09:55:42
---

<p align="center"><strong>Warren B. Powell</strong>
<a href="http://www.castle.princeton.edu/" target="_blank" rel="noopener">http://www.castle.princeton.edu </a></p>
<p class="large" align="left">Computational stochastic optimization represents an effort to create an umbrella over the many communities of stochastic optimization. This website is intended to introduce people to the different fields of stochastic optimization, while also identifying important bridges between communities.</p>
<p class="large">The sole goal of this website is to highlight bridges, and no statement should be interpreted as favoring one modeling or algorithmic strategy over another. The range of problems that fall in the domain of CSO is fantastically diverse. My feeling is that every method has an application for which it is ideally suited, and I would encourage authors (even theoreticians) to try to highlight the problem class that motivated their work.</p>
<p class="large">For additional information, see the topics below (and check back for regular updates). This is a rich field - please enter comments on the blog, or send me an email at powell@princeton.edu.</p>
<p class="large"><a href="https://castle.princeton.edu/jungle/">The jungle of stochastic optimization</a> - This is a discussion and series of articles that bridge the competing communities that work in the broad area of stochastic optimization.</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#communities">Communities</a> - This is a list of the communities of computational stochastic optimization</p>
<p class="large"><a href="http://castle.princeton.edu/html/cso.htm#lectureshttps://castle.princeton.edu/html/computational-stochastic-optimization/#lectures">Lectures</a> - This is a series of powerpoint presentations, adapted for reading, that address topics such as modeling, classes of policies, and notes on bridging communities such as dynamic programming and stochastic search, and dynamic programming and stochastic programming.</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#problemclasses">Problem classes</a> - This may be a fruitless attempt to characterize the complete domain of CSO problems, but we are going to try.</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#discussions">Discussions</a> - What is a policy? What is a state variable? How do we bridge communities? ... and other topics that seem relevant.</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#readings">Additional readings</a> - This is a growing selection of papers that are of a tutorial nature, or which help to bridge communities.</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#courses">Courses</a> - Links to course websites on stochastic optimization (please feel free to contribute links to your own courses)</p>

<h3><a id="communities"></a>Communities of stochastic optimization</h3>
<p class="large">The communities of stochastic optimization are distinguished in part by differences in motivating applications. Perhaps the most important is the nature of the decision (discrete action spaces, continuous (but low dimensional) controls, and high-dimensional vectors), but other differences are important: the properties of the transition function, the type of uncertainty (Gaussian, heav-tails, rare events), and the properties of the objective function (expectations, min/max (robust), risk measures). Complicating the process is when different communities work on similar problems with different terminology and notation.</p>
<p class="large">Below is a list of some of the distinct communities that are involved in computational stochastic optimization. Please email me (powell@princeton.edu) if you feel I have overlooked one.</p>

<ul>
 	<li class="large">Dynamic programming (including Markov decision processes)</li>
 	<li class="large">Stochastic programming (two-stage, multistage, chance constrained)</li>
 	<li class="large">Stochastic search (including simulation optimization, infinitessimal perturbation analysis, and ranking and selection)</li>
 	<li class="large">Optimal control (primarily engineering, but also economics and finance)</li>
 	<li class="large">Approximate dynamic programming and reinforcement learning</li>
 	<li class="large">Decision analysis/decision trees (operations research) and Monte Carlo tree search (computer science)</li>
 	<li class="large">Robust optimization</li>
 	<li class="large">Stochastic equilibrium, stochastic variational inequalities, and stochastic nonlinear complementary problems.</li>
 	<li class="large">Sequential machine learning (esp. online learning of statistical models)</li>
 	<li class="large">Optimal learning, including multiarmed bandit problems (for online learning), and active learning methods (for offline learning problems).</li>
</ul>
<p class="large">Note that there is considerable overlap between some of these communities.</p>

<h3><a id="lectures"></a>Lectures</h3>
<p class="large">Below are a series of powerpoint presentations that were adapted from some recent talks I have been giving. I have broken up a single very long presentation into a series of smaller topics. I have also added slides that include discussion that I would normally include orally, so that the slides are readable.</p>
<p class="large"><a href="http://castle.princeton.edu/Presentations/CSO/CSO01-OverviewAndModeling.pptx" target="_blank" rel="noopener">Overview and modeling</a> (posted October 25, 2012) - This includes a brief overview, and then a series of slides on the fundamental elements of a stochastic, dynamic model.</p>
<p class="large"><a href="http://castle.princeton.edu/Presentations/CSO/CSO02-Policies.pptx" target="_blank" rel="noopener">Policies</a> (posted October 25, 2012) - I have found that various algorithmic strategies for sequential problems can be broken down into four fundamental classes of policies, which can then form the basis for a wide range of hybrids.</p>
<p class="large"><a href="http://castle.princeton.edu/Presentations/CSO/CSO03-BridgingCommunities.pptx" target="_blank" rel="noopener">Bridging communities</a> (posted October 25, 2012) - There is a lot of confusion about the difference between dynamic programming and stochastic programming, which are often viewed as separate and competing fields. In addition, it is easy to overlook the relationship between stochastic search, dynamic programming (in the form of policy search), and simulation-optimization.</p>
&nbsp;
<p class="large">If you have a tutorial-style lecture that you would like to contribute, please email me at powell@princeton.edu.</p>
&nbsp;
<h3><a id="problemclasses"></a>Problem classes</h3>
<p class="large">Below I am going to try to list dimensions along which the problem classes of computational stochastic optimization can be divided. If you can think of one that I have missed, let me know.</p>
<p class="large"><strong>Static/two-stage/sequential</strong></p>
<p class="large">Static problems - Make a decision (alternatively, choose a deterministic parameter or fix a design), then observe a random outcome.</p>
<p class="large">Static with observable state - Observe state, then make decision, then observe a random outcome)</p>
<p class="large">Two-stage - Make a decision, observe a random outcome, and then make one more decision (also known as the recourse). This is very close to static problems, but I feel that it deserves its problem class. It has received considerable attention from the stochastic programming community where decisions are vectors.</p>
<p class="large">Sequential decision problems - Also known as multistage stochastic optimization, this is where you make a decision, see a random outcome, make another decision, see a random outcome, and so on (over a finite or infinite horizon).</p>
&nbsp;
<p class="large"><strong>States</strong></p>
<p class="large">Our lack of an accepted definition of a state variable is one of my pet peeves in the field of sequential decision problems. See <a href="https://castle.princeton.edu/computational-stochastic-optimization/#state">my discussion of states </a>for my views on a definition of the state of the system. For now, I will offer some variations of state variables:</p>

<ul>
 	<li class="large">Physical state - Many people equate "state" with "physical state," which can be viewed as a snapshot of the system (how much product is in inventory, the price of a stock, the current estimate of the location/speed/acceleration of an aircraft).</li>
 	<li class="large">Information state - This includes everything we <em>need</em> to know about the system to make decisions and model the problem. For example, I might need the price of the stock over the last three time periods to model the price in the next time period.</li>
 	<li class="large">Belief state (or knowledge state) - This is a probability distribution giving our belief about parameters we cannot measure perfectly.</li>
</ul>
<p class="large">A "dynamic program" is often equated with a physical state that determines the available actions. But there are learning problems where the state of the system consists purely of a belief state (see, for example, the multiarmed bandit problem - for more, see my work on <a href="http://optimallearning.princeton.edu/" target="_blank" rel="noopener">optimal learning</a>.</p>
<p class="large">Side note: The computer science community makes a distinction between the <em>state</em> of a system, and state variables which might be the different components of a state. I don't think the operations research community makes this same distinction (and I have no idea about the controls community).</p>
&nbsp;
<p class="large"><strong>Decisions</strong></p>
<p class="large">Communities such as computer science (reinforcement learning), control theory and operations research/math programming can be divided roughly in terms of the nature of the decisions each field addresses:</p>
<p class="large">Discrete action spaces - Universal notation is "a" - Discrete action spaces arise in a vast range of applications, often involving the management of a single entity (robots, games, people, animals, ...). Problems are nonconvex and discrete.</p>
<p class="large">Continuous controls - Common notation is "u" - Engineers are often flying planes, controlling machines or chemical processes or moving robots. Controls are typically low-dimensional (10-20 dimensions is a lot), where they exploit continuity but not convexity.</p>
<p class="large">Vector-valued actions - Common notation is "x" - The operations research community solves a wide range of problems using high-dimensional vectors x, often with thousands (and sometimes millions) of dimensions. Convexity is a powerful and widely used property.</p>
&nbsp;
<p class="large"><strong>Exogenous (random) information</strong></p>
<p class="large">Exogenous information comes in many different flavors, including:</p>

<ul>
 	<li class="large">Well defined distributions with finite moments (normal, Poisson, uniform, etc. etc.) - These applications generally arise when a problem (which might be static/two-stage or sequential) repeatedly, allowing us to experience the full range of the distribution.</li>
 	<li class="large">Heavy-tailed distributions - Some problems (an example is electricity spot prices) exhibit very heavy-tailed behavior, with possibly infinite variance (see the Cauchy distribution as an example).</li>
 	<li class="large">Rare events - Imagine planning inventories for large, expensive equipment (say, a jet engine) that is simply not supposed to fail, but sometimes it does.</li>
 	<li class="large">Bursts - A hot day or storm can create a burst of activity spanning multiple time periods (e.g. hours).</li>
 	<li class="large">Shifts - A random event (e.g. the introduction of fracking for natural gas) moves us to an entirely new plateau.</li>
 	<li class="large">Subjective probabilities - Try planning for a new product for which there is simply no history to build a distribution of what might happen in the future.</li>
</ul>
&nbsp;
<p class="large"><strong>Transition functions</strong></p>
<p class="large">Known as system models, state models, plant models, models, transfer functions, or laws of motion, the transition function describes how the state of the system evolves from one time period to the next. These come in different flavors:</p>

<ul>
 	<li class="large">Systems of linear equations - Useful for certain classes of search algorithms</li>
 	<li class="large">Known functions (but without any specific structure)</li>
 	<li class="large">Unknown functions - Our system may be the climate, a complex chemical plant, or the behavior of an animal - We simply may not have equations that model the system from one period to the next. We can divide this class between problems where we assume we can estimate the equations (but acknowledge that the estimate is imperfect), or where we do not even have an estimate. In the last class, we assume only that we can obseve the next state.</li>
</ul>
&nbsp;
<p class="large"><strong>Objective functions</strong></p>
<p class="large">Objective functions can be classified along several dimensions:</p>
<p class="large">Handling uncertainty - For deterministic problems, we just add up costs and contributions. When we introduce uncertainty, we have to decide how to compute our objective. Some choices include:</p>

<ul>
 	<li class="large">Expectations - By far the most popular, we can minimize or maximize an expectation (usually estimated as an average).</li>
 	<li class="large">Min/max - The community of robust optimization introduces the idea that if we are minimizing costs, we can minimize the maximum cost, thereby protecting us against the worst that might happen.</li>
 	<li class="large">Quantile optimization - Min/max the alpha-quantile of a function. For example, if we are maximizing profits, we might be worried about maximizing the 5th quantile.</li>
 	<li class="large">Risk measures - The finance community has a range of risk measures (Var, CVar, ...) which generalize the min/max approach of robust optimization.</li>
</ul>
<p class="large">Additivity - The vast majority of research articles assume that costs/contributions are additive over time, but this is not always the case. In some cases additivity can be restored by designing an appropriate state variable. The use of risk measures can be one source of complication.</p>
<p class="large">Continuity - Objective functions may be Lipschitz continuous, continuously differentiable, upper/lower semicontinuous, and CADLAG (google it). If you have none of the above, I hope you are using discrete action spaces where this does not matter.</p>
<p class="large">Convexity - Convexity is a powerful property for vector-valued applications, but there are many problems that cannot assume convexity. The reinforcement learning community works almost exclusively with discrete action spaces, where convexity is not an issue. The engineering controls community widely assumes continuity without convexity (which is how they are always producing those great 3-D Matlab plots!).</p>
<p class="large">Differentiability - We can compute derivatives for some problems (often in the form of stochastic gradients), but there are many problems where derivatives are not available and we have to use derivative-free algorithms.</p>
<p class="large">Computational complexity - Some functions can be evaluated in a fraction of a second, in others a single observation takes a year. This has a big impact on the design and testing of algorithms. A sample of different problem classes include:</p>

<ul>
 	<li class="large">Complex analytic functions - Can be evaluated in a fraction of a second</li>
 	<li class="large">Numerical simulations - May take several seconds, several hours, or several days (sometimes even longer)</li>
 	<li class="large">Physical experiments - A single experiment might take a day, or a month (or longer)</li>
 	<li class="large">Field experiments - Estimating the market response to a change in price might take a month or several months.</li>
 	<li class="large">Admission policies for a university - You get one observation per year</li>
 	<li class="large">Impact of tax policy on climate change - Just so you know that some stochastic optimization problems are really hard.</li>
</ul>
&nbsp;
<h3><a id="discussions"></a>Discussions</h3>
<p class="large">I will use this space to carry on a series of discussions about topics in stochastic optimization.</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#observations">Observations</a> - These are a series of observations about stochastic optimization, some of which run against conventional thinking (at least in some communities).</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#policy">What is a policy?</a> - It is a rule for making decisons. Here I summarize four basic classes of policies that can be used as a foundadtion for building hybrids.</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#state">What is a state?</a> - One of my favorite topics. How did we get this far without agreeing on a definition?</p>
<p class="large"><a href="https://castle.princeton.edu/computational-stochastic-optimization/#bridges">Bridging communities</a> - Sometimes it can be tricky seeing the parallels between communities. Here I discuss:</p>

<ul>
 	<li class="large">Bridging stochastic search to dynamic programming</li>
 	<li class="large">Bridging dynamic programming to stochastic programming</li>
</ul>
&nbsp;

&nbsp;

&nbsp;
<h3><a id="observations"></a>Some observations</h3>
<p class="large">I am going to use this section to make a few observations about dynamic programming.</p>

<ul>
 	<li class="large">A dynamic program is a sequential (and for us, stochastic) decision problem.</li>
 	<li class="large">Bellman's equation is a) a way of characterizing an optimal policy and b) the foundation for one of four classes of policies (see below). Dynamic programming is a <em>problem</em>; Bellman's equation provides the foundation for a class of <em>methods</em>.</li>
 	<li class="large">A state variable is a <em>minimally dimensioned function of history that is necessary and sufficient to compute the decision function, cost/reward/contribution function, and the transition function</em>. This implies that all processes are Markovian (by definition of the state variable). The state variable can be thought of as the state of information, not to be confused with the physical state. See <a href="https://castle.princeton.edu/computational-stochastic-optimization/#state">What is a state variable for a continued discussion.</a></li>
 	<li class="large">A policy is a mapping from state to action. While normally presented in terms of lookup tables or analytic functions, a policy might involve solving a linear program or computing a neural network. Note that the state variable has to contain all the information (this is the sufficiency requirement) to compute the policy.</li>
 	<li><span class="large">Dynamic programs can be solved using one of four fundamental classes of policies (along with a wide range of hybrids). These include:</span>
<ul>
 	<li class="large">Optimizing a myopic cost function approximation</li>
 	<li class="large">Lookahead policies (includes tree search, rolling horizon procedures and stochastic programming)</li>
 	<li class="large">Policy function approximations (an analytical mapping from state to action)</li>
 	<li class="large">Policies based on value function approximations (which builds on Bellman's equation).</li>
</ul>
</li>
 	<li class="large">Policy search can be used to tune almost any policy.</li>
 	<li class="large">Stochastic programming (whether using Benders cuts or direct solution over all scenarios and all time periods) is a lookahead policy which seeks to optimize a lookahead model. The optimal solution of a lookahead model is not an optimal policy for the full model.</li>
</ul>
&nbsp;

&nbsp;
<h3><a id="policy"></a>What is a policy?</h3>
<p class="large">A policy is any mapping from state S to a feasible action <em>a</em> (or <em>x</em>, or <em>u</em>). For all the differences of opinion about dynamic programs, I have not found anyone who disagrees with this basic statement.</p>
<p class="large">The dynamic programming community sometimes equates a policy with a lookup table ("when in discrete state s, take the discrete action a"). But a policy is any mapping from state to action, which means it could involve solving a linear program (what is the best assignment of resources to tasks right now).</p>
<p class="large">While there are a wide range of policies, I have found that they can be decomposed into four fundamental classes</p>

<ol>
 	<li class="large">Optimizing a myopic cost function approximation</li>
 	<li class="large">Lookahead policies</li>
 	<li class="large">Policy function approximations (an analytical mapping from state to action)</li>
 	<li class="large">Policies based on value function approximations (which builds on Bellman's equation).</li>
</ol>
<p class="large">A myopic cost function approximation (CFA) might involve solving a linear program to assign resources (such as truck drivers) to tasks (such as loads). We might modify the function to include a bonus for covering late loads (this is the cost function approximation).</p>
<p class="large">Lookahead policies are widely used under different names such as tree search, rolling/receding horizon procedures, model predictive control (popular in engineering), and stochastic programming (which is a rolling horizon procedure which explicitly accounts for uncertainty). Lookahead policies solve approximations of the real problem. This approximation typically involves optimizing over a shorter horizon (instead of optimizing the energy storage device over an entire year, we may feel it is enough to optimize over 24 hours). In addition, it is common to approximate the uncertainty in some way. The simplest approximation is to assume the future is deterministic, optimize this much easier problem, implement the solution, and then observe a random transition (in the real model). The stochastic programming community uses scenario trees, which are sampled versions of the true stochastic process. The same idea is used in the reinforcement learning community under the name Monte Carlo tree search.</p>
<p class="large">Policy function approximations are analytic functions that return an action given a state, without solving an optimization problem.</p>
<p class="large">Policies based on value function approximations look like</p>
<p class="large"><img src="http://castle.princeton.edu/html/equations/Eqn004.jpg" alt="" width="455" height="84" /></p>
<p class="large">Here, we have replaced the value function (actually, the expected value function) with a linear regression. This is the policy most commonly associated with "dynamic programming" and Bellman's equation.</p>
<p class="large">Policies 1, 3 and 4 all use some form of functional approximation. We can approximate functions in three ways: lookup table, parametric and nonparametric. We can also use a mixture known as semi-parametrics.</p>
<p class="large">In addition, it is possible to create a wide range of problems by using mixtures of the four fundamental classes. A popular strategy, for example, is to use tree search (or a rolling horizon procedure) with value function approximations as a terminal reward. Another powerful strategy is to use policy function approximations, possibly as low dimensional patterns, combined with myopic or lookahead policies (possibly as linear programs).</p>
<p class="large">The concept of a policy is particularly powerful whenever we are representing decisions in the future, with information that is not known now. If we are at time t, a decision at time t' &gt; t is a random variable. You can always represent this by replacing the decision with the policy that depends on the state at t' (which is also a random variable).</p>
<p class="large">Additional readings:</p>
<p class="large">A presentation of the four fundamental classes of policies is given in <a href="http://castle.princeton.edu/Papers/Powell_ADP_2ndEdition_Chapter%206.pdf" target="_blank" rel="noopener">Chapter 6 of my ADP book</a>.</p>
<p class="large">For an illustration of the four classes of policies in the context of problems in transportation and logistics, see</p>
<p class="large"><a href="http://castle.princeton.edu/Papers/Powell_EJTL_ADPTransportationLogisticsSept012012.pdf" target="_blank" rel="noopener">W. B. Powell, H. Simao, B. Bouzaiene-Ayari, “Approximate Dynamic Programming in Transportation and Logistics: A Unified Framework,” European J. on Transportation and Logistics, Vol. 1, No. 3, pp. 237-284 (2012). DOI 10.1007/s13676-012-0015-8. </a></p>
&nbsp;
<h3><a id="bridges"></a>Bridging communities</h3>
<p class="large" align="left">A real opportunity for a community for computational stochastic optimization is recognizing when the contributions of one community can be used to help solve the problems of another. Below I provide bridges between stochastic search and dynamic prograrmming, followed by a step-by-step roadmap from classical dynamic programming to stochastic programming. This is based on a recent newsletter article that appeared in the <strong><a href="http://castle.princeton.edu/Papers/Powell_UnifiedFramework_ICSNewsletterFall2012.pdf" target="_blank" rel="noopener">Informs Computing Society newsletter.</a></strong></p>
<p class="large" align="left"><strong>From stochastic search to dynamic programming</strong></p>
<p class="large" align="left">Stochastic search is itself an umbrella term that encompasses derivative-based search (stochastic gradient methods, stochastic approximation methods), and derivative-free search (which includes a lot of the work in the simulation-optimization community, and the black-box optimization community). Stochastic search is typically written in the generic form</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/Eqn001.jpg" alt="" width="151" height="46" /></p>
<p class="large" align="left">where <em>x</em> is a deterministic parameter and <em>W</em> is a random variable.</p>
<p class="large" align="left">Stochastic search is often viewed as being distinct from dynamic prograrmming because we are choosing a single decision that works well over different outcomes, while sequential problems allow you to adapt decisions over time as new information becomes available. However, a different way to think about sequential decision problems is that you are choosing a fixed <em>policy</em> that determines decisions over time. This would be written</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/Eqn002x.jpg" alt="" width="230" height="66" /></p>
<p class="large" align="left">where the state variable evolves according to</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/Eqn003.jpg" alt="" width="195" height="41" /></p>
<p class="large" align="left">where <em>W</em> is a random variable and <em>x</em> is determined by the policy ("decision function") <img src="http://castle.princeton.edu/html/equations/Eqn004.gif" width="74" height="36" />. When we search over the policies, we mean that we are searching over classes of policies (this might be a lookahead policy, or one that depends on value function approximations), as well as any tunable parameters for the class of policy being considered. For example, we might represent our policy using an approximate value function, using</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/Eqn004.jpg" alt="" width="455" height="84" /></p>
<p class="large" align="left">Here, we have written the dependence of the policy on the regression parameters theta. We might find the best set of parameters theta by solving</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/Eqn005.jpg" alt="" width="252" height="68" /></p>
<p class="large" align="left">We easily see that this is identical to our stochastic search problem. To solve this, we might draw on the tools of infinitessimal perturbation analysis to estimate derivatives. If we cannot find a derivative, we could turn to various derivative-free techniques based on the field of ranking and selection, simulation-optimization and optimal learning.</p>
<p class="large" align="left"><strong>From dynamic programming to stochastic programming</strong></p>
<p class="large" align="left">This is harder, and I cannot do the equations on a website. What is important to recognize, even without any math, is that stochastic programming solves an approximate model of the future to determine an action that is implemented now. Once this is done, you step forward in time using a real model (this could be a mathematical model, or an observation from a real physical system), after which you have to do it all over again. This is how you recognize a <em>lookahead policy</em>. The approximate model is called the <em>lookahead model</em>.</p>
<p class="large" align="left">The stochastic programming community uses two fundamental approaches for solving the lookahead model:</p>

<ul>
 	<li class="large">Explicitly solving the problem over a horizon from now (time t) to the end of a planning horizon (t+H) using an approximate model of the underlying stochastic process known as a scenario tree. Often, these problems are quite large.</li>
 	<li class="large">For convex optimization problems, a second strategy is to use Bender's cuts, indexed by the scenario tree. This can be viewed as a form of value function approximation. Although this results in a decision function at time t that uses a value function approximation, it is still a lookahead policy because the entire process has to be repeated once you implement a decision and step forward.</li>
</ul>
<p class="large">A detailed, step by step derivation which starts with Bellman's optimality equation and ending with the standard methods used in stochastic programming are given in a <a href="http://castle.princeton.edu/Papers/Powell_UnifiedFramework_ICSNewsletterFall2012.pdf" target="_blank" rel="noopener">6+ page article in the Informs Computing Society newsletter</a> (Fall, 2012). These equations cannot be replicated in a website.</p>
<p class="large" align="left">A much longer article gives the same presentation, and then uses applications in transportation and logistics to illustrate the different classes of policies, is</p>
<p class="large" align="left"><a href="http://castle.princeton.edu/Papers/Powell_EJTL_ADPTransportationLogisticsSept012012.pdf" target="_blank" rel="noopener">W. B. Powell, H. Simao, B. Bouzaiene-Ayari, “Approximate Dynamic Programming in Transportation and Logistics: A Unified Framework,” European J. on Transportation and Logistics, Vol. 1, No. 3, pp. 237-284 (2012). DOI 10.1007/s13676-012-0015-8. </a></p>
<p class="large" align="left"><strong>From dynamic programming to robust optimization</strong></p>
<p class="large" align="left">Classical robust optimization is a <em>problem</em>, generally stated as</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/robustobj.jpg" alt="Robust optimization" width="248" height="49" /></p>
<p class="large" align="left">where W(theta) is an uncertainty set parameterized by confidence level theta<em>. </em></p>
<p class="large" align="left">For sequential problems, robust optimization is a form of <em>lookahead policy</em> computed using</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/robustpolicy.jpg" alt="Robust policy" width="629" height="82" /></p>
<p class="large" align="left">We have written this policy assuming we are at time <em>t</em>. Again, the uncertainty set is parameterized by a confidence level theta. The robust optimization community evaluates policies by simulating them and taking averages (this is how they might, for example, compare the policy to a deterministic lookahead). This means that they are solving the following stochastic optimization problem:</p>
<p class="large" align="left"><img src="http://castle.princeton.edu/html/equations/stoch_opt_robust.jpg" alt="Robust stochastic optimization" width="369" height="74" /></p>
<p class="large" align="left">Here, we are searching over the class of robust policies parameterized by theta.</p>
<p class="large" align="left">Robust optimization, then, is a lookahead policy that approximates the information model using the uncertainty set, and then replaces the expectation operator with the worst case over the uncertainty set. This is the only policy we have seen that uses an expectation in the objective, but uses a different operator (the max over w) in the lookahead model.</p>

<h3 align="left"><a id="state"></a>What is a state?</h3>
<p class="large" align="left">It seems surprising that the dynamic programming community has not, in the past 60 years, adopted a standard definition of a state variable. This topic was discussed at an NSF workshop called a "Conversation between AI and OR on Stochastic Optimization." At this workshop, we posed the question to the attendees which produced 30 responses which can be <a href="http://castle.princeton.edu/Papers/StateVariableQuestionnaireMay302012.xlsx">viewed here</a>. Needless to say, there was quite a bit of variety in the responses.</p>
<p class="large" align="left">Two ideas seemed to stand out from the responses. The first was that a state variable should be a <em>sufficient statistic</em>, which means it contains all the necessary information. The second was that it should be "efficient," "parsimonious," or "minimal."</p>
<p class="large" align="left">Two objections were raised about the use of the term "sufficient statistic." First, it can be seen as replacing one piece of jargon ("state") with another, which then needs its own definition. The second is that the term "sufficient statistic" is widely used in statistic where it has its own meaning.</p>
<p class="large" align="left">There also seems to be a feeling that a state should only contain necessary information. Most models do this implicitly, but not all. The stochastic programming community routinely uses the entire history, which is certainly a sufficient statistic, but not necessary.</p>
<p class="large" align="left">With apologies, my favorite definition is from chapter 5 of my ADP book (you can download this from <a href="http://adp.princeton.edu/" target="_blank" rel="noopener">http://adp.princeton.edu</a>). It reads</p>
<p class="large" align="left">A state is the minimally dimensioned function of history that is necessary and sufficient to compute the decision function, the transition function, and the cost/reward function.</p>
<p class="large" align="left">This definition is consistent with the concept of a sufficient statistic, but requires that the information be necessary as well (and therefore minimally dimensioned, which is redundant). It also provides clear guidelines for necessary - it is the data needed to compute the decision function (for example, the set of feasible actions might depend on the state), the cost/reward function, and the transition function. We maintain that if information is only needed to compute the transition function, then it should be required to compute the contribution function or decision function at a later point in time.</p>
<p class="large" align="left">Examples of information that need to be in the state variable:</p>

<ul>
 	<li class="large">The price of a stock - If we sell a stock, we need to know its price in order to compute the contribution function.</li>
 	<li class="large">The feasible region - We need to now how much water is in a reservoir to know how much can be released. Alternatively, if we are assigning technicians to serve customers arriving randomly over time, we need to know the customers that are waiting to be served. This information appears in the feasible region (the characteristics of the customers might also appear in the contribution function).</li>
 	<li class="large">The transition function - The rate of evaporation from a water reservoir may depend on temperature, which would then have to be in the state variable. Alternatively, assume that the price of a stock p_{t+1} at time t+1 depends on the price of the stock at times t, t-1 and t-2. The evolution of prices might be described by</li>
</ul>
<span class="large"><img src="http://castle.princeton.edu/html/equations/StatePrice.jpg" alt="state" width="413" height="47" /></span>
<p class="large">In this case, the state variable has to include p_t, p_{t-1} and p_{t-2}, because they are needed to compute the transition function.</p>
&nbsp;
<h3>Additional readings</h3>
<p class="large">This section is intended as a repository of papers of a tutorial nature, or which help to bridge between communities. If you think you have something appropriate, send it to me at powell@princeton.edu.</p>
<p class="large"><strong><a href="http://castle.princeton.edu/Papers/Powell_UnifiedFramework_ICSNewsletterFall2012.pdf" target="_blank" rel="noopener">A Unified Framework for Stochastic and Dynamic Programming, Informs Computing Society newsletter, November, 2012</a></strong> - This six page article provides a brief overview of how to model stochastic, dynamic systems. There is a section which gives a step by step bridge from classical dynamic programming to stochastic programming.</p>
<p class="large"><strong><a href="http://castle.princeton.edu/Papers/Powell_EJTL_ADPTransportationLogisticsSept012012.pdf">W. B. Powell, H. Simao, B. Bouzaiene-Ayari, “Approximate Dynamic Programming in Transportation and Logistics: A Unified Framework,” European J. on Transportation and Logistics, Vol. 1, No. 3, pp. 237-284 (2012). DOI 10.1007/s13676-012-0015-8.</a> </strong>- This is a much longer version of the ICS newsletter article above, illustrated with numerous examples drawn from transportation and logistics.</p>
<p class="large"><a href="http://castle.princeton.edu/Papers/Smith%20et%20al%20-%20Formalism%20for%20dynamic%20programming.pdf" target="_blank" rel="noopener"><strong>Yu-Li Chou, Stephen Pollock, H. Edwin, Romeijn, Robert L. Smith, "A Formalism for Dynamic Programming," Working paper, Department of Industrial and Information Engineering, University of Michigan, October, 2001</strong></a>," - A thoughtful perspective of dynamic programming by some of the top researchers in the field. Note the implicit definition of a state variable on page 2.</p>
<p class="large"><a href="http://castle.princeton.edu/Papers/Kleijnen%20-%20Simulation-optimization%20via%20Kriging%20and%20bootstrapping%20-%20a%20survey.pdf" target="_blank" rel="noopener"><strong>Jack Kleijnen - Simulation-Optimization via Kriging and Bootstrapping: A Survey</strong></a>, November 2012 - A nice survey article on a stochastic search method known as kriging.</p>
&nbsp;
<h3>Courses</h3>
<p class="large">I am trying to compile links to course websites on stochastic optimization. These may be regular courses or short courses. If you have a course you would like to add to the list, please send me the link.</p>
<p class="large"><a href="https://castle.princeton.edu/orf-544/" target="_blank" rel="noopener">ORF 569 - Computational stochastic optimization</a> Princeton University - This is a graduate seminar I have been teaching at Princeton. It includes scribed lectures along with a lot of downloadable material.</p>
&nbsp;
