---
layout: page
title: "Optimal Learning"
permalink: /optimal-learning-2/
date: 2023-11-14 11:25:50
---

{% raw %}
<a href="http://www.amazon.com/Optimal-Learning-Wiley-Probability-Statistics/dp/0470596694/ref=sr_1_3?ie=UTF8&qid=1328538977&sr=8-3"><img src="http://optimallearning.princeton.edu/images/frontcover.jpg" alt="Optimal Learning book cover" width="220" align="right" /></a>
Optimal learning addresses the challenge of how to collect information as efficiently as possible, primarily for settings where collecting information is time consuming and expensive. Some sample applications include:

- How do you discover the best drug to treat a disease, out of the thousands of potential combinations?
- What is the best price to charge for a product on the internet?
- What the best set of parameters (diameter of a tube, size of a plate, length of a component, pressure, temperature, concentration) to make a particular device or chemical process work the best?
- What is the highest concentration of a disease in the population?
- What are the best labor rules or terms in a customer contract to maximize profits in a time-consuming business simulator?
- Where should we collect information about the links of a graph so we get can find the best path to respond to an emergency?

Each of these problems require making observations (measurements) to determine which choice works the best. The challenge is that measurements take time and/or cost money, which means we have to collect this information carefully.

Optimal Learning is a rich field that includes contributions from different communities. At the moment, this website focuses on our work on the knowledge gradient, a simple, elegant concept for collecting information. As the website evolves, we will provide a more complete representation of the different frameworks and methods that have evolved for solving this important problem class.

Clicking on the book cover takes you to Amazon. Course instructors may order an examination copy directly from Wiley. [Click here.](http://www.wiley.com/WileyCDA/WileyTitle/productCd-0470596694.html)A review of the book by Steve Chick appeared in the November 2012 issue of Informs Journal on Computing. A short article on optimal learning that appeared in OR/MS Today is available [here](http://optimallearning.princeton.edu/Papers/Powell-Optimal%20Learning-ORMS%20TodayMay2012.pdf).

> ### [The knowledge gradient](#KG)
>
> ### [Additional readings](/sda-website/additional-readings-optimal-learning/)
>
> ### [An optimal learning video tutorial (by Warren Powell)](http://techtalks.tv/talks/the-knowledge-gradient-for-optimal-learning/57612/)

## The knowledge gradient {#KG}

Below we provide an overview of our current research in the knowledge gradient, organized as follows:

- [**A brief introduction**](http://optimallearning.princeton.edu/#KG_intro)
- [**The knowledge gradient for different belief models**](http://optimallearning.princeton.edu/#beliefmodels)
- [The knowledge gradient for online and offline learning](http://optimallearning.princeton.edu/#onlineoffline)
- [Learning with continuous alternatives (parameter tuning)](http://optimallearning.princeton.edu/#continuous)
- [Learning on graphs and linear programs](http://optimallearning.princeton.edu/#graphs)
- [Learning in the presence of a physical state](http://optimallearning.princeton.edu/#physicalstate)
- [Learning with a robust objective function](http://optimallearning.princeton.edu/#robust)

A brief introduction

Our research has focused on the idea of the *knowledge gradient*, which measures the marginal value of a measurement in terms of the value of the information gained by the measurement. The measurement may require field experimentation or running a time consuming simulation (some business simulators take days to run). We model the economic decision we are trying to make, and then identify the information that has the highest impact on the economic problem.

![](http://optimallearning.princeton.edu/images/KGmeasuring5.jpg)The knowledge gradient does not identify the best choice - it identifies the measurement which will do the most to identify the best choice. If we have five alternatives (as shown to the right) with different levels of uncertainty about each alternative, we want to evaluate the alternative that offers the greatest chance of improving the final solution. So alternative 2 may be much more attractive to evaluate than alternatives 3 and 4.

The power of the knowledge gradient is the ease with which it can be applied to a wide range of settings. We use a Bayesian model that captures expert belief, making it possible to provide meaningful guidance right from the beginning. We have found that most applications exhibit *correlated beliefs*, which is to say that trying one alternative can teach us something about other alternatives. This makes it possible to provide meaningful guidance to find the best out of 10,000 molecular compounds after just 100 experiments.

We are developing methods to handle problems where the number of potential alternatives might number in the tens of thousands (of molecules), hundreds of thousands (of features for a car or computer) or infinite (setting the continuous parameters to optimize a device). Applying the knowledge gradient to find the best of five or ten alternatives with independent beliefs can be done in a spreadsheet. For larger problems, we need specialized algorithms. For example, if we are trying to find the hot spot (in red) of the surface to the left (below), we have to find the maximum of the knowledge gradient surface shown on the right.

![](http://optimallearning.princeton.edu/images/ContinuousSurfaceAndKG.jpg)

The knowledge gradient for different belief models

To formulate an optimal learning problem, we have to first create a *belief model*. It is useful to divide these models into three fundamental classes:

- Lookup table
- Parametric models - We can further divide these according to:
  - Linear
    - Low-dimensional (small number of parameters)
    - High-dimensional - Here we use a sparse-additive belief model
  - Nonlinear
    - In addition to general nonlinear models, we study special cases such as logistics regression.
- Nonparametric models - Our work as of this writing has addressed:
  - General nonlinear models using a sampled belief model
  - Logistics regression for classification

### **The knowledge gradient for online and offline learning** {#the-knowledge-gradient-for-online-and-offline-learning}

Offline learning arises when we have a budget for finding the best possible solution, after which have to use the solution in a production setting. Online learning arises when we are in a production setting, and we have to live with the costs or rewards, but we want to learn as we go. In this setting, we have to make a tradeoff between the costs or rewards we receive, and the value of information that we acquire that we can use for future decisions.

It turns out that there is a very simple, elegant relationship between the knowledge gradient for offline learning, and the knowledge gradient for online learning. Imagine that we have a finite-horizon online learning problem where we have a total of *N* measurements, and we have already learned *n*. If *v*\^{off}\_x is the offline knowledge gradient for alternative *x*, then the online knowledge gradient is given by

> *v*\^{online}\_x = \\theta\^n_x + (*N-n*) *v*\^{offline}\_x

where \\theta\^n_x is our current estimate of the value of alternative *x* after *n* measurements. This makes it possible to compute the knowledge gradient for problems with correlated beliefs.

For more, see

> [I. Ryzhov, W. B. Powell, P. I. Frazier, "The knowledge gradient algorithm for a general class of online learning problems," *Operations Research*, Vol. 60, No. 1, pp. 180-195 (2012).  ](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell%20Frazier%20-%20KG%20for%20oneline%20learning_OR_March2012.pdf)

### Learning with continuous alternatives {#learning-with-continuous-alternatives}

A common problem arises when we have to tune a set of continuous set of parameters. This often arises when we have to find the set of parameters that will produce the best results for a model. You may want to minimize costs, minimize delays or find the best match between a model and historical metrics.

> [W. Scott, P. Frazier, W. B. Powell -- "The Correlated Knowledge Gradient for Maximizing Expensive Continuous Functions with Noisy Observations using Gaussian Process Regression," SIAM J. on Optimization (to appear)](http://optimallearning.princeton.edu/Papers/Scott%20Powell%20-%20Knowledge%20gradient%20for%20continuous%20parameters%20February2011.pdf)

### **Learning on graphs and linear programs** {#learning-on-graphs-and-linear-programs}

![graph](http://optimallearning.princeton.edu/images/graph.jpg)Imagine that you want to find the shortest path between two points, but you do not know the times on the links. You have a way of collecting information, but it is expensive, and you have a limited amount of time to learn the best path. Which links should you learn about to have the greatest impact on your ability to find the shortest path?

The knowledge gradient can be computed for each link in the network using at most two shortest path calculations (and often one).

For more information, see

[I. Ryzhov, W.B. Powell, "Information collection on a graph," *Operations Research*, Vol 59, No. 1, pp. 188-201, 2011. (c) Informs](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell%20-%20InformationCollectionOngraph_OR_May292011.pdf)

For a more theoretical treatment of learning the coefficients of linear programs, see

[Ryzhov, I., W. B. Powell, "Information Collection for Linear Programs with Uncertain Objective Coefficients," SIAM J. Optimization, Vol. 22(4), pp. 1344--1368 http://epubs.siam.org/doi/abs/10.1137/12086279X. (2012).](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell%20-%20Information%20collection%20for%20Linear%20Programs_SIAM_October2012.pdf)

### Learning in the presence of a physical state {#learning-in-the-presence-of-a-physical-state}

[Ryzhov, I. O., W. B. Powell, "Approximate Dynamic Programming with Correlated Bayesian Beliefs," Forty-Eighth Annual Allerton Conference on Communication, Control, and Computing, September 29 -- October 1, 2010, Allerton Retreat Center, Monticello, Illinois., IEEE Press, pp. 1360-1367.](http://optimallearning.princeton.edu/Papers/RyzhovPowell-kgdp_AllertonconferenceJune142010.pdf) This paper introduces the idea of using the knowledge gradient within a dyamic program, which effectively means in the presence of a physical state. This paper uses a discrete, lookup table representation of the belief model.

[Ryzhov, I. O. and W. B. Powell, "Bayesian Active Learning With Basis Functions," SSCI 2011 ADPRL - 2011 IEEE Symposium on Adaptive Dynamic Programming and Reinforcement Learning, Paris, April, 2011.](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell-Bayesian%20active%20learning%20with%20basis%20functionsJan2011.pdf) - This paper uses the knowledge gradient for dynamic programs where the value function is now approximated using a linear model.

### Learning with a robust objective {#learning-with-a-robust-objective}

A fresh perspective of learning is to introduce a mini-max objective. Instead of maximizing the expected value of a measurement, we can adapt the knowledge gradient to maximize the worst outcome. An initial investigation of this idea is

[Ilya Ryzhov, Boris Defourny, Warren Powell, "Ranking and Selection Meets Robust Optimization," Winter Simulation Conference, 2012.](http://optimallearning.princeton.edu/Papers/Ryzhov%20Defourny%20Powell-Ranking%20and%20selection%20meets%20robust%20optimization_final.pdf)

{% endraw %}
