---
layout: page
title: "Computational Stochastic Optimization"
permalink: /computational-stochastic-optimization/
date: 2017-09-07 09:55:42
---

{% raw %}
**Warren B. Powell** [http://www.castle.princeton.edu](http://www.castle.princeton.edu/)

Computational stochastic optimization represents an effort to create an umbrella over the many communities of stochastic optimization. This website is intended to introduce people to the different fields of stochastic optimization, while also identifying important bridges between communities.

The sole goal of this website is to highlight bridges, and no statement should be interpreted as favoring one modeling or algorithmic strategy over another. The range of problems that fall in the domain of CSO is fantastically diverse. My feeling is that every method has an application for which it is ideally suited, and I would encourage authors (even theoreticians) to try to highlight the problem class that motivated their work.

For additional information, see the topics below (and check back for regular updates). This is a rich field - please enter comments on the blog, or send me an email at powell@princeton.edu.

[The jungle of stochastic optimization](https://castle.princeton.edu/jungle/) - This is a discussion and series of articles that bridge the competing communities that work in the broad area of stochastic optimization.

[Communities](https://castle.princeton.edu/computational-stochastic-optimization/#communities) - This is a list of the communities of computational stochastic optimization

[Lectures](http://castle.princeton.edu/html/cso.htm#lectureshttps://castle.princeton.edu/html/computational-stochastic-optimization/#lectures) - This is a series of powerpoint presentations, adapted for reading, that address topics such as modeling, classes of policies, and notes on bridging communities such as dynamic programming and stochastic search, and dynamic programming and stochastic programming.

[Problem classes](https://castle.princeton.edu/computational-stochastic-optimization/#problemclasses) - This may be a fruitless attempt to characterize the complete domain of CSO problems, but we are going to try.

[Discussions](https://castle.princeton.edu/computational-stochastic-optimization/#discussions) - What is a policy? What is a state variable? How do we bridge communities? \... and other topics that seem relevant.

[Additional readings](https://castle.princeton.edu/computational-stochastic-optimization/#readings) - This is a growing selection of papers that are of a tutorial nature, or which help to bridge communities.

[Courses](https://castle.princeton.edu/computational-stochastic-optimization/#courses) - Links to course websites on stochastic optimization (please feel free to contribute links to your own courses)

### Communities of stochastic optimization

The communities of stochastic optimization are distinguished in part by differences in motivating applications. Perhaps the most important is the nature of the decision (discrete action spaces, continuous (but low dimensional) controls, and high-dimensional vectors), but other differences are important: the properties of the transition function, the type of uncertainty (Gaussian, heav-tails, rare events), and the properties of the objective function (expectations, min/max (robust), risk measures). Complicating the process is when different communities work on similar problems with different terminology and notation.

Below is a list of some of the distinct communities that are involved in computational stochastic optimization. Please email me (powell@princeton.edu) if you feel I have overlooked one.

- Dynamic programming (including Markov decision processes)
- Stochastic programming (two-stage, multistage, chance constrained)
- Stochastic search (including simulation optimization, infinitessimal perturbation analysis, and ranking and selection)
- Optimal control (primarily engineering, but also economics and finance)
- Approximate dynamic programming and reinforcement learning
- Decision analysis/decision trees (operations research) and Monte Carlo tree search (computer science)
- Robust optimization
- Stochastic equilibrium, stochastic variational inequalities, and stochastic nonlinear complementary problems.
- Sequential machine learning (esp. online learning of statistical models)
- Optimal learning, including multiarmed bandit problems (for online learning), and active learning methods (for offline learning problems).

Note that there is considerable overlap between some of these communities.

### Lectures

Below are a series of powerpoint presentations that were adapted from some recent talks I have been giving. I have broken up a single very long presentation into a series of smaller topics. I have also added slides that include discussion that I would normally include orally, so that the slides are readable.

[Overview and modeling](http://castle.princeton.edu/Presentations/CSO/CSO01-OverviewAndModeling.pptx) (posted October 25, 2012) - This includes a brief overview, and then a series of slides on the fundamental elements of a stochastic, dynamic model.

[Policies](http://castle.princeton.edu/Presentations/CSO/CSO02-Policies.pptx) (posted October 25, 2012) - I have found that various algorithmic strategies for sequential problems can be broken down into four fundamental classes of policies, which can then form the basis for a wide range of hybrids.

[Bridging communities](http://castle.princeton.edu/Presentations/CSO/CSO03-BridgingCommunities.pptx) (posted October 25, 2012) - There is a lot of confusion about the difference between dynamic programming and stochastic programming, which are often viewed as separate and competing fields. In addition, it is easy to overlook the relationship between stochastic search, dynamic programming (in the form of policy search), and simulation-optimization.

 

If you have a tutorial-style lecture that you would like to contribute, please email me at powell@princeton.edu.

 

### Problem classes

Below I am going to try to list dimensions along which the problem classes of computational stochastic optimization can be divided. If you can think of one that I have missed, let me know.

**Static/two-stage/sequential**

Static problems - Make a decision (alternatively, choose a deterministic parameter or fix a design), then observe a random outcome.

Static with observable state - Observe state, then make decision, then observe a random outcome)

Two-stage - Make a decision, observe a random outcome, and then make one more decision (also known as the recourse). This is very close to static problems, but I feel that it deserves its problem class. It has received considerable attention from the stochastic programming community where decisions are vectors.

Sequential decision problems - Also known as multistage stochastic optimization, this is where you make a decision, see a random outcome, make another decision, see a random outcome, and so on (over a finite or infinite horizon).

 

**States**

Our lack of an accepted definition of a state variable is one of my pet peeves in the field of sequential decision problems. See [my discussion of states](https://castle.princeton.edu/computational-stochastic-optimization/#state) for my views on a definition of the state of the system. For now, I will offer some variations of state variables:

- Physical state - Many people equate "state" with "physical state," which can be viewed as a snapshot of the system (how much product is in inventory, the price of a stock, the current estimate of the location/speed/acceleration of an aircraft).
- Information state - This includes everything we *need* to know about the system to make decisions and model the problem. For example, I might need the price of the stock over the last three time periods to model the price in the next time period.
- Belief state (or knowledge state) - This is a probability distribution giving our belief about parameters we cannot measure perfectly.

A "dynamic program" is often equated with a physical state that determines the available actions. But there are learning problems where the state of the system consists purely of a belief state (see, for example, the multiarmed bandit problem - for more, see my work on [optimal learning](http://optimallearning.princeton.edu/).

Side note: The computer science community makes a distinction between the *state* of a system, and state variables which might be the different components of a state. I don't think the operations research community makes this same distinction (and I have no idea about the controls community).

 

**Decisions**

Communities such as computer science (reinforcement learning), control theory and operations research/math programming can be divided roughly in terms of the nature of the decisions each field addresses:

Discrete action spaces - Universal notation is "a" - Discrete action spaces arise in a vast range of applications, often involving the management of a single entity (robots, games, people, animals, \...). Problems are nonconvex and discrete.

Continuous controls - Common notation is "u" - Engineers are often flying planes, controlling machines or chemical processes or moving robots. Controls are typically low-dimensional (10-20 dimensions is a lot), where they exploit continuity but not convexity.

Vector-valued actions - Common notation is "x" - The operations research community solves a wide range of problems using high-dimensional vectors x, often with thousands (and sometimes millions) of dimensions. Convexity is a powerful and widely used property.

 

**Exogenous (random) information**

Exogenous information comes in many different flavors, including:

- Well defined distributions with finite moments (normal, Poisson, uniform, etc. etc.) - These applications generally arise when a problem (which might be static/two-stage or sequential) repeatedly, allowing us to experience the full range of the distribution.
- Heavy-tailed distributions - Some problems (an example is electricity spot prices) exhibit very heavy-tailed behavior, with possibly infinite variance (see the Cauchy distribution as an example).
- Rare events - Imagine planning inventories for large, expensive equipment (say, a jet engine) that is simply not supposed to fail, but sometimes it does.
- Bursts - A hot day or storm can create a burst of activity spanning multiple time periods (e.g. hours).
- Shifts - A random event (e.g. the introduction of fracking for natural gas) moves us to an entirely new plateau.
- Subjective probabilities - Try planning for a new product for which there is simply no history to build a distribution of what might happen in the future.

 

**Transition functions**

Known as system models, state models, plant models, models, transfer functions, or laws of motion, the transition function describes how the state of the system evolves from one time period to the next. These come in different flavors:

- Systems of linear equations - Useful for certain classes of search algorithms
- Known functions (but without any specific structure)
- Unknown functions - Our system may be the climate, a complex chemical plant, or the behavior of an animal - We simply may not have equations that model the system from one period to the next. We can divide this class between problems where we assume we can estimate the equations (but acknowledge that the estimate is imperfect), or where we do not even have an estimate. In the last class, we assume only that we can obseve the next state.

 

**Objective functions**

Objective functions can be classified along several dimensions:

Handling uncertainty - For deterministic problems, we just add up costs and contributions. When we introduce uncertainty, we have to decide how to compute our objective. Some choices include:

- Expectations - By far the most popular, we can minimize or maximize an expectation (usually estimated as an average).
- Min/max - The community of robust optimization introduces the idea that if we are minimizing costs, we can minimize the maximum cost, thereby protecting us against the worst that might happen.
- Quantile optimization - Min/max the alpha-quantile of a function. For example, if we are maximizing profits, we might be worried about maximizing the 5th quantile.
- Risk measures - The finance community has a range of risk measures (Var, CVar, \...) which generalize the min/max approach of robust optimization.

Additivity - The vast majority of research articles assume that costs/contributions are additive over time, but this is not always the case. In some cases additivity can be restored by designing an appropriate state variable. The use of risk measures can be one source of complication.

Continuity - Objective functions may be Lipschitz continuous, continuously differentiable, upper/lower semicontinuous, and CADLAG (google it). If you have none of the above, I hope you are using discrete action spaces where this does not matter.

Convexity - Convexity is a powerful property for vector-valued applications, but there are many problems that cannot assume convexity. The reinforcement learning community works almost exclusively with discrete action spaces, where convexity is not an issue. The engineering controls community widely assumes continuity without convexity (which is how they are always producing those great 3-D Matlab plots!).

Differentiability - We can compute derivatives for some problems (often in the form of stochastic gradients), but there are many problems where derivatives are not available and we have to use derivative-free algorithms.

Computational complexity - Some functions can be evaluated in a fraction of a second, in others a single observation takes a year. This has a big impact on the design and testing of algorithms. A sample of different problem classes include:

- Complex analytic functions - Can be evaluated in a fraction of a second
- Numerical simulations - May take several seconds, several hours, or several days (sometimes even longer)
- Physical experiments - A single experiment might take a day, or a month (or longer)
- Field experiments - Estimating the market response to a change in price might take a month or several months.
- Admission policies for a university - You get one observation per year
- Impact of tax policy on climate change - Just so you know that some stochastic optimization problems are really hard.

 

### Discussions

I will use this space to carry on a series of discussions about topics in stochastic optimization.

[Observations](https://castle.princeton.edu/computational-stochastic-optimization/#observations) - These are a series of observations about stochastic optimization, some of which run against conventional thinking (at least in some communities).

[What is a policy?](https://castle.princeton.edu/computational-stochastic-optimization/#policy) - It is a rule for making decisons. Here I summarize four basic classes of policies that can be used as a foundadtion for building hybrids.

[What is a state?](https://castle.princeton.edu/computational-stochastic-optimization/#state) - One of my favorite topics. How did we get this far without agreeing on a definition?

[Bridging communities](https://castle.princeton.edu/computational-stochastic-optimization/#bridges) - Sometimes it can be tricky seeing the parallels between communities. Here I discuss:

- Bridging stochastic search to dynamic programming
- Bridging dynamic programming to stochastic programming

     

### Some observations

I am going to use this section to make a few observations about dynamic programming.

- A dynamic program is a sequential (and for us, stochastic) decision problem.
- Bellman's equation is a) a way of characterizing an optimal policy and b) the foundation for one of four classes of policies (see below). Dynamic programming is a *problem*; Bellman's equation provides the foundation for a class of *methods*.
- A state variable is a *minimally dimensioned function of history that is necessary and sufficient to compute the decision function, cost/reward/contribution function, and the transition function*. This implies that all processes are Markovian (by definition of the state variable). The state variable can be thought of as the state of information, not to be confused with the physical state. See [What is a state variable for a continued discussion.](https://castle.princeton.edu/computational-stochastic-optimization/#state)
- A policy is a mapping from state to action. While normally presented in terms of lookup tables or analytic functions, a policy might involve solving a linear program or computing a neural network. Note that the state variable has to contain all the information (this is the sufficiency requirement) to compute the policy.
- Dynamic programs can be solved using one of four fundamental classes of policies (along with a wide range of hybrids). These include:
  - Optimizing a myopic cost function approximation
  - Lookahead policies (includes tree search, rolling horizon procedures and stochastic programming)
  - Policy function approximations (an analytical mapping from state to action)
  - Policies based on value function approximations (which builds on Bellman's equation).
- Policy search can be used to tune almost any policy.
- Stochastic programming (whether using Benders cuts or direct solution over all scenarios and all time periods) is a lookahead policy which seeks to optimize a lookahead model. The optimal solution of a lookahead model is not an optimal policy for the full model.

   

### What is a policy?

A policy is any mapping from state S to a feasible action *a* (or *x*, or *u*). For all the differences of opinion about dynamic programs, I have not found anyone who disagrees with this basic statement.

The dynamic programming community sometimes equates a policy with a lookup table ("when in discrete state s, take the discrete action a"). But a policy is any mapping from state to action, which means it could involve solving a linear program (what is the best assignment of resources to tasks right now).

While there are a wide range of policies, I have found that they can be decomposed into four fundamental classes

1.  Optimizing a myopic cost function approximation
2.  Lookahead policies
3.  Policy function approximations (an analytical mapping from state to action)
4.  Policies based on value function approximations (which builds on Bellman's equation).

A myopic cost function approximation (CFA) might involve solving a linear program to assign resources (such as truck drivers) to tasks (such as loads). We might modify the function to include a bonus for covering late loads (this is the cost function approximation).

Lookahead policies are widely used under different names such as tree search, rolling/receding horizon procedures, model predictive control (popular in engineering), and stochastic programming (which is a rolling horizon procedure which explicitly accounts for uncertainty). Lookahead policies solve approximations of the real problem. This approximation typically involves optimizing over a shorter horizon (instead of optimizing the energy storage device over an entire year, we may feel it is enough to optimize over 24 hours). In addition, it is common to approximate the uncertainty in some way. The simplest approximation is to assume the future is deterministic, optimize this much easier problem, implement the solution, and then observe a random transition (in the real model). The stochastic programming community uses scenario trees, which are sampled versions of the true stochastic process. The same idea is used in the reinforcement learning community under the name Monte Carlo tree search.

Policy function approximations are analytic functions that return an action given a state, without solving an optimization problem.

Policies based on value function approximations look like

![](http://castle.princeton.edu/html/equations/Eqn004.jpg)

Here, we have replaced the value function (actually, the expected value function) with a linear regression. This is the policy most commonly associated with "dynamic programming" and Bellman's equation.

Policies 1, 3 and 4 all use some form of functional approximation. We can approximate functions in three ways: lookup table, parametric and nonparametric. We can also use a mixture known as semi-parametrics.

In addition, it is possible to create a wide range of problems by using mixtures of the four fundamental classes. A popular strategy, for example, is to use tree search (or a rolling horizon procedure) with value function approximations as a terminal reward. Another powerful strategy is to use policy function approximations, possibly as low dimensional patterns, combined with myopic or lookahead policies (possibly as linear programs).

The concept of a policy is particularly powerful whenever we are representing decisions in the future, with information that is not known now. If we are at time t, a decision at time t' \> t is a random variable. You can always represent this by replacing the decision with the policy that depends on the state at t' (which is also a random variable).

Additional readings:

A presentation of the four fundamental classes of policies is given in [Chapter 6 of my ADP book](http://castle.princeton.edu/Papers/Powell_ADP_2ndEdition_Chapter%206.pdf).

For an illustration of the four classes of policies in the context of problems in transportation and logistics, see

[W. B. Powell, H. Simao, B. Bouzaiene-Ayari, "Approximate Dynamic Programming in Transportation and Logistics: A Unified Framework," European J. on Transportation and Logistics, Vol. 1, No. 3, pp. 237-284 (2012). DOI 10.1007/s13676-012-0015-8.](http://castle.princeton.edu/Papers/Powell_EJTL_ADPTransportationLogisticsSept012012.pdf)

 

### Bridging communities

A real opportunity for a community for computational stochastic optimization is recognizing when the contributions of one community can be used to help solve the problems of another. Below I provide bridges between stochastic search and dynamic prograrmming, followed by a step-by-step roadmap from classical dynamic programming to stochastic programming. This is based on a recent newsletter article that appeared in the **[Informs Computing Society newsletter.](http://castle.princeton.edu/Papers/Powell_UnifiedFramework_ICSNewsletterFall2012.pdf)**

**From stochastic search to dynamic programming**

Stochastic search is itself an umbrella term that encompasses derivative-based search (stochastic gradient methods, stochastic approximation methods), and derivative-free search (which includes a lot of the work in the simulation-optimization community, and the black-box optimization community). Stochastic search is typically written in the generic form

![](http://castle.princeton.edu/html/equations/Eqn001.jpg)

where *x* is a deterministic parameter and *W* is a random variable.

Stochastic search is often viewed as being distinct from dynamic prograrmming because we are choosing a single decision that works well over different outcomes, while sequential problems allow you to adapt decisions over time as new information becomes available. However, a different way to think about sequential decision problems is that you are choosing a fixed *policy* that determines decisions over time. This would be written

![](http://castle.princeton.edu/html/equations/Eqn002x.jpg)

where the state variable evolves according to

![](http://castle.princeton.edu/html/equations/Eqn003.jpg)

where *W* is a random variable and *x* is determined by the policy ("decision function") ![](http://castle.princeton.edu/html/equations/Eqn004.gif). When we search over the policies, we mean that we are searching over classes of policies (this might be a lookahead policy, or one that depends on value function approximations), as well as any tunable parameters for the class of policy being considered. For example, we might represent our policy using an approximate value function, using

![](http://castle.princeton.edu/html/equations/Eqn004.jpg)

Here, we have written the dependence of the policy on the regression parameters theta. We might find the best set of parameters theta by solving

![](http://castle.princeton.edu/html/equations/Eqn005.jpg)

We easily see that this is identical to our stochastic search problem. To solve this, we might draw on the tools of infinitessimal perturbation analysis to estimate derivatives. If we cannot find a derivative, we could turn to various derivative-free techniques based on the field of ranking and selection, simulation-optimization and optimal learning.

**From dynamic programming to stochastic programming**

This is harder, and I cannot do the equations on a website. What is important to recognize, even without any math, is that stochastic programming solves an approximate model of the future to determine an action that is implemented now. Once this is done, you step forward in time using a real model (this could be a mathematical model, or an observation from a real physical system), after which you have to do it all over again. This is how you recognize a *lookahead policy*. The approximate model is called the *lookahead model*.

The stochastic programming community uses two fundamental approaches for solving the lookahead model:

- Explicitly solving the problem over a horizon from now (time t) to the end of a planning horizon (t+H) using an approximate model of the underlying stochastic process known as a scenario tree. Often, these problems are quite large.
- For convex optimization problems, a second strategy is to use Bender's cuts, indexed by the scenario tree. This can be viewed as a form of value function approximation. Although this results in a decision function at time t that uses a value function approximation, it is still a lookahead policy because the entire process has to be repeated once you implement a decision and step forward.

A detailed, step by step derivation which starts with Bellman's optimality equation and ending with the standard methods used in stochastic programming are given in a [6+ page article in the Informs Computing Society newsletter](http://castle.princeton.edu/Papers/Powell_UnifiedFramework_ICSNewsletterFall2012.pdf) (Fall, 2012). These equations cannot be replicated in a website.

A much longer article gives the same presentation, and then uses applications in transportation and logistics to illustrate the different classes of policies, is

[W. B. Powell, H. Simao, B. Bouzaiene-Ayari, "Approximate Dynamic Programming in Transportation and Logistics: A Unified Framework," European J. on Transportation and Logistics, Vol. 1, No. 3, pp. 237-284 (2012). DOI 10.1007/s13676-012-0015-8.](http://castle.princeton.edu/Papers/Powell_EJTL_ADPTransportationLogisticsSept012012.pdf)

**From dynamic programming to robust optimization**

Classical robust optimization is a *problem*, generally stated as

![Robust optimization](http://castle.princeton.edu/html/equations/robustobj.jpg)

where W(theta) is an uncertainty set parameterized by confidence level theta*.*

For sequential problems, robust optimization is a form of *lookahead policy* computed using

![Robust policy](http://castle.princeton.edu/html/equations/robustpolicy.jpg)

We have written this policy assuming we are at time *t*. Again, the uncertainty set is parameterized by a confidence level theta. The robust optimization community evaluates policies by simulating them and taking averages (this is how they might, for example, compare the policy to a deterministic lookahead). This means that they are solving the following stochastic optimization problem:

![Robust stochastic optimization](http://castle.princeton.edu/html/equations/stoch_opt_robust.jpg)

Here, we are searching over the class of robust policies parameterized by theta.

Robust optimization, then, is a lookahead policy that approximates the information model using the uncertainty set, and then replaces the expectation operator with the worst case over the uncertainty set. This is the only policy we have seen that uses an expectation in the objective, but uses a different operator (the max over w) in the lookahead model.

### What is a state? {#what-is-a-state align="left"}

It seems surprising that the dynamic programming community has not, in the past 60 years, adopted a standard definition of a state variable. This topic was discussed at an NSF workshop called a "Conversation between AI and OR on Stochastic Optimization." At this workshop, we posed the question to the attendees which produced 30 responses which can be [viewed here](http://castle.princeton.edu/Papers/StateVariableQuestionnaireMay302012.xlsx). Needless to say, there was quite a bit of variety in the responses.

Two ideas seemed to stand out from the responses. The first was that a state variable should be a *sufficient statistic*, which means it contains all the necessary information. The second was that it should be "efficient," "parsimonious," or "minimal."

Two objections were raised about the use of the term "sufficient statistic." First, it can be seen as replacing one piece of jargon ("state") with another, which then needs its own definition. The second is that the term "sufficient statistic" is widely used in statistic where it has its own meaning.

There also seems to be a feeling that a state should only contain necessary information. Most models do this implicitly, but not all. The stochastic programming community routinely uses the entire history, which is certainly a sufficient statistic, but not necessary.

With apologies, my favorite definition is from chapter 5 of my ADP book (you can download this from [http://adp.princeton.edu](http://adp.princeton.edu/)). It reads

A state is the minimally dimensioned function of history that is necessary and sufficient to compute the decision function, the transition function, and the cost/reward function.

This definition is consistent with the concept of a sufficient statistic, but requires that the information be necessary as well (and therefore minimally dimensioned, which is redundant). It also provides clear guidelines for necessary - it is the data needed to compute the decision function (for example, the set of feasible actions might depend on the state), the cost/reward function, and the transition function. We maintain that if information is only needed to compute the transition function, then it should be required to compute the contribution function or decision function at a later point in time.

Examples of information that need to be in the state variable:

- The price of a stock - If we sell a stock, we need to know its price in order to compute the contribution function.
- The feasible region - We need to now how much water is in a reservoir to know how much can be released. Alternatively, if we are assigning technicians to serve customers arriving randomly over time, we need to know the customers that are waiting to be served. This information appears in the feasible region (the characteristics of the customers might also appear in the contribution function).
- The transition function - The rate of evaporation from a water reservoir may depend on temperature, which would then have to be in the state variable. Alternatively, assume that the price of a stock p\_{t+1} at time t+1 depends on the price of the stock at times t, t-1 and t-2. The evolution of prices might be described by

![state](http://castle.princeton.edu/html/equations/StatePrice.jpg)

In this case, the state variable has to include p_t, p\_{t-1} and p\_{t-2}, because they are needed to compute the transition function.

 

### Additional readings

This section is intended as a repository of papers of a tutorial nature, or which help to bridge between communities. If you think you have something appropriate, send it to me at powell@princeton.edu.

**[A Unified Framework for Stochastic and Dynamic Programming, Informs Computing Society newsletter, November, 2012](http://castle.princeton.edu/Papers/Powell_UnifiedFramework_ICSNewsletterFall2012.pdf)** - This six page article provides a brief overview of how to model stochastic, dynamic systems. There is a section which gives a step by step bridge from classical dynamic programming to stochastic programming.

**[W. B. Powell, H. Simao, B. Bouzaiene-Ayari, "Approximate Dynamic Programming in Transportation and Logistics: A Unified Framework," European J. on Transportation and Logistics, Vol. 1, No. 3, pp. 237-284 (2012). DOI 10.1007/s13676-012-0015-8.](http://castle.princeton.edu/Papers/Powell_EJTL_ADPTransportationLogisticsSept012012.pdf)** - This is a much longer version of the ICS newsletter article above, illustrated with numerous examples drawn from transportation and logistics.

[**Yu-Li Chou, Stephen Pollock, H. Edwin, Romeijn, Robert L. Smith, "A Formalism for Dynamic Programming," Working paper, Department of Industrial and Information Engineering, University of Michigan, October, 2001**](http://castle.princeton.edu/Papers/Smith%20et%20al%20-%20Formalism%20for%20dynamic%20programming.pdf)," - A thoughtful perspective of dynamic programming by some of the top researchers in the field. Note the implicit definition of a state variable on page 2.

[**Jack Kleijnen - Simulation-Optimization via Kriging and Bootstrapping: A Survey**](http://castle.princeton.edu/Papers/Kleijnen%20-%20Simulation-optimization%20via%20Kriging%20and%20bootstrapping%20-%20a%20survey.pdf), November 2012 - A nice survey article on a stochastic search method known as kriging.

 

### Courses

I am trying to compile links to course websites on stochastic optimization. These may be regular courses or short courses. If you have a course you would like to add to the list, please send me the link.

[ORF 569 - Computational stochastic optimization](https://castle.princeton.edu/orf-544/) Princeton University - This is a graduate seminar I have been teaching at Princeton. It includes scribed lectures along with a lot of downloadable material.
{% endraw %}
