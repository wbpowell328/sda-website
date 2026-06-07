---
layout: page
title: "KnowledgeGradient"
permalink: /knowledgegradient-2/
date: 2026-02-15 14:24:10
---

{% raw %}
Warren B Powell
Professor Emeritus, Princeton University

In 2025, Peter Frazier, one of my former Ph.D. students, won the 2025 "Test of Time" award for his paper on the knowledge gradient for correlated beliefs that he performed while a Ph.D. student in my lab (2005-2008).  Much more than a best paper award, the "Test of Time" award represents the judgment of everyone who adopted this approach in the years since it first appeared (2008-2009).     

Peter's work opened up a decade of research performed by eight Ph.D. students and post-docs while in my lab.  This webpage is a summary of this work.![](https://castle.princeton.edu/wp-content/uploads/2026/02/KGTestofTimeAward-1.jpg)

**Test of Time Award Citation 2007--2011**

**The Knowledge-Gradient Policy for Correlated Normal Beliefs**

Peter Frazier, Warren Powell, Savas Dayanik
*INFORMS Journal on Computing *21(4):599--613, Fall 2009
https://pubsonline.informs.org/doi/10.1287/ijoc.1080.0314

This paper introduces the now well-known knowledge-gradient (KG) method for gathering information when faced with a black-box objective, where query measurements may be both costly and noisy. The focus of the paper is on ranking and selection, but the KG method can be used also to study multiarmed bandit problems and many other models in Bayesian information collection. This very broad applicability led to a lively KG research area that continues to this day, with new developments studied in modern machine learning. It is an excellent example of work that has stood the test of time.

#### Background

There is a vast range of sequential decision problems, but in my opinion, by far the most important falls under the broad umbrella of "derivative-free stochastic search" where we are trying to solve the problem 

$$min_x E_W F(x,W)$$

 

where $$x$$ may be a discrete scalar, or a continuous or discrete vector.  $$ represents random inputs, and [latex]F(x,W)$$ is some process or function where we cannot compute the expectation, but we can observe a noisy sample observation $${\hat F}(x,W)$$ for an $$x$$ that we choose, and inputs $$ that we do not control.  We assume in this work that we do not have access to derivatives of [latex]F(x,W)$$.

Examples of $$F(x,W)$$ include: the revenue from advertising a product, the performance of a drug or medical treatment, the performance of a scientific experiment to produce a new material, the outcome of a simulation of a business process, the performance of an athlete or salesperson, ... The list is endless.

Although $$x$$ may be discrete or continuous, scalar or vector, the most common version of this problem involves identifying the best of a set of discrete choices which have uncertain values, as depicted below:![](https://castle.princeton.edu/wp-content/uploads/2026/01/Discrete-choices-uncertainty-1024x438.jpg)

In chapter 7 of my 2022 book, *Reinforcement Learning and Stochastic Optimization,* I show how this problem can be solved with any of the four classes of policies.  However, two are the most widely used: 

- **Upper confidence bounding** -- These are policies that compute an index for each (discrete) choice x that consists of the current best estimate of its expected performance, plus an "uncertainty bonus" that can be calculated in any of a number of ways (this has kept computer scientists busy for years).  UCB policies are quite easy to compute, but the uncertainty bonus always includes a tunable parameter, and tuning this paper is hard (and widely overlooked).  However, the simplicity of the policy has made it very attractive in e-commerce for identifying (for example) the best product to display that will attract the most ad-clicks.
- **Stochastic lookahead policies** -- These are policies that compute an index based on an approximation of how the information gained from the experiment will improve future decisions in some way.  This is where the knowledge gradient falls, since at its heart, it computes the value of the information from an experiment in terms of how it improves decisions in the future.  Expected improvement is a related policy that is also quite popular.  Stochastic lookahead policies are harder to compute, but generally do not have tunable parameters.  If they do, the tuning is much easier because the problem is well-scaled.  

These policies are known in certain communities (such as Bayesian optimization) as *acquisition functions*.  I am not sure why this term has been adopted, since this term is unique to certain communities, which disguises its membership in the much more general problem class I refer to as *sequential decision problems. *

My experience is that the knowledge gradient policy is best suited for problems where experiments are expensive, which means we have to exploit as much as possible any prior knowledge.  A particularly important property is its ability to minimize the dependence on tunable parameters.

The knowledge gradient for correlated beliefs appears to be the first policy that explicitly captured correlations between the beliefs of different alternatives.  This laid the groundwork for the research of other students (sometimes with Peter's help) that used other belief models, including linear models; models with sampled, parametric beliefs; models where each alternative is described with a multidimensional attribute vector, leading to a belief model based on hierarchical aggregation; and a belief model using local parametric beliefs.  

#### Software

Peter Frazier has made his software library for the knowledge gradient, including the calculation of the knowledge gradient for correlated beliefs, [on GitHub here.](https://tinyurl.com/GitHubKG/)

#### Learning while doing video

A powerful strategy to achieve steady improvement of operations sometimes involves adjusting parameters in the field.  I prepared a video demonstrating this for a mutual fund struggling to find the right amount of cash to keep on hand to meet redemptions.  The video illustrates a UCB-style policy (called "Interval estimation") along with an application of the knowledge gradient, which is explained without mathematics.  The video brings out the challenge of tuning parameters in simpler policies such as those in the UCB class.  KG is somewhat more complex, but does a better job of exploiting prior knowledge, and does not have any tunable parameters.

[Access the video here.](https://tinyurl.com/LearningWhileDoing/)

#### Teaching materials

The "optimal learning" problems addressed by the knowledge gradient span an important class of sequential decision problems.  I would argue that this is by far the most common decision problem that people have to solve on a day-to-day basis.  I have prepared teaching materials on sequential decision problems:

[Teaching materials for sequential decision problems](https://tinyurl.com/TeachingSDA/)

Search on "Optimal/active learning" for the materials relevant to the knowledge gradient.

#### Students and papers related to the knowledge gradient

Below is a list of the students I supervised, starting with Peter Frazier, who did work developing and extending the knowledge gradient, often motivated by real applications, often in the hard sciences.  There was considerable joint work  -- I have listed the papers under the student who was the primary author on the paper. 

**Peter Frazier (Ph.D. student)**

- Frazier, P., W. B. Powell and S. Dayanik, "A Knowledge-Gradient Policy for Sequential Information Collection," *SIAM J. on Control and Optimization*, Vol. 47, No. 5, pp. 2410-2439 (2008). -- This was the first knowledge gradient paper, which used the more classical model of independent beliefs across the alternatives.
- Frazier, W. B. Powell, S. Dayanik, "The Knowledge-Gradient Policy for Correlated Normal Beliefs," Informs J. on Computing, Vol. 21, No. 4, pp. 585-598 (2009) -- This paper, which won the "Test of Time" award, extended the knowledge gradient to the much more important problem where beliefs across alternatives were correlated, a property that applies to the vast majority of learning problems. This paper broke the mold in the multiarmed bandit community dating to the 1950s of assuming independent beliefs.
- Frazier, P. I., and W. B. Powell, "Paradoxes in Learning and the Marginal Value of Information," *Decision Analysis*, Vol. 7, No. 4, pp. 378-403, 2010. -- This was the paper where we discovered that the value of information from an experiment might be nonconcave with respect to the number of times we repeat an experiment.  This happens whenever experiments are very noisy.
- Frazier, P.I., and W. B. Powell, "Consistency of Sequential Bayesian Sampling Policies" SIAM J. Control and Optimization, Vol. 49, No. 2, 712-731 (2011). -- In this paper, Peter outlined a new proof technique for proving asymptotic optimality of offline learning algorithms. He used this technique to prove that a highly popular policy known as "interval estimation" was \*not\* asymptotically optimal.
- Negoescu, P. Frazier and W. B. Powell, "The Knowledge Gradient Algorithm for Sequencing Experiments in Drug Discovery," Informs J. on Computing, Vol. 23, No. 3, pp. 346-363, 2011. -- This paper was derived from Diana Negoescu's undergraduate senior thesis (supervised by Peter Frazier) where she introduced the idea of using a linear belief model, which departed from the standard lookup table belief models for bandit problems.

**Ilya Ryzhov (Ph.D. student)**

- Ryzhov, I., W. B. Powell, P. I. Frazier, "The knowledge gradient algorithm for a general class of online learning problems," *Operations Research*, Vol. 60, No. 1, pp. 180-195 (2012). -- In this paper, Ilya extended the original knowledge gradient algorithm for offline learning (typical of most stochastic search problems) to the online setting (typical of most multiarmed bandit problems).  The extension required a trivial modification of the offline knowledge gradient, extending all the results for offline learning to online learning.
- Ilya Ryzhov, Martijn Mes, W.B. Powell, Gerald van den Berg, "Bayesian Exploration for Approximate Dynamic Programming," Operations Research, Vol. 67, No. 1, pp. 198-214 (2019) -- This paper adapted the principle of value of information for knowledge gradient to help solve the classical "exploration vs. exploitation" problem of approximate dynamic programming.  This is effectively an extension of the knowledge gradient from a pure learning problem to one involving a physical state.
- I. Ryzhov and W. B. Powell, "Optimal learning on a graph," *Operations Research*, Vol. 59, No. 1, pp. 188-201, 2011. -- Here, the knowledge gradient was derived for finding the shortest path over a graph with unknown coefficients.
- Ryzhov, I., W. B. Powell, "Information Collection for Linear Programs with Uncertain Objective Coefficients," SIAM J. Optimization, Vol. 22(4), pp. 1344--1368 (2012). -- This paper generalized the learning problem to the complex case of uncertainty about the cost coefficients in a linear program, generalizing his work in the previous paper.

**Martijn Mes (post doc)**

- Mes, M., P. I. Frazier and W. B. Powell, "Hierarchical Knowledge Gradient for Sequential Sampling," *J. Machine Learning Research*, Vol.12, pp. 2931-2974, 2011. -- This paper extended the knowledge gradient to a problem where beliefs were formed using hierarchically aggregated estimates.  This proved particularly valuable for problems where the alternatives (the "bandits") were described by vectors of attributes.

**Warren Scott (Ph.D. student)**

- Scott, Warren, P. I. Frazier, and W. B. Powell. "The Correlated Knowledge Gradient for Simulation Optimization of Continuous Parameters Using Gaussian Process Regression." *SIAM J. on Optimization* 21, No. 3 (2011): 996-1026. -- Warren Scott extended the general bandit framework to continuous alternatives, which means general continuous stochastic search problems.

**Xinyu He (Ph.D. student)**

- Xinyu He, Warren B. Powell, "Optimal Learning for Stochastic Optimization with Nonlinear Parametric Belief Models," SIAM J. Optimization, Vol. 28, No. 3, pp. 2327-2359, 2018. -- This paper applied the knowledge gradient to problems where the belief model was represented by a finite sample of parametric belief models.
- Xinyu He, Warren B. Powell, "Optimal Learning for Nonlinear Parametric Belief Models for Multidimensional Continuous Space," SIAM J. Optimization, Vol. 28, No. 4, 2945-2974, 2018. -- This paper extends the knowledge gradient to problems where the alternatives are continuous, and the belief model is a multidimensional parametric model.
- Xinyu He, Kristofer-Roy Reyes, W.B. Powell, "Optimal Learning with Local Nonlinear Parametric Belief Models over Continuous Designs," SIAM J. on Scientific Computing, Vol 42, No. 4, pp. A2134-2157. -- This paper relaxed the assumption that we could assume that the true belief was one of a sampled set of parametric models, and instead used locally nonlinear approximations.  The work was demonstrated on a real problem in materials science. 

**Yan Li (Ph.D. student)**

- Yan Li, Han Liu, W.B. Powell, "A Lasso-based Sparse Knowledge Gradient Policy for Sequential Optimal Learning," AISTATS, May, 2016. -- This paper extended the knowledge gradient policy to high-dimensional linear belief models estimated using LASSO.
- Yan Li, Kristopher G. Reyes, Jorge Vazquez-Anderson, Yingfei Wang, Lydia M Contreras, Warren B. Powell, "A Knowledge Gradient Policy for Sequencing Experiments to Identify the Structure of RNA Molecules Using a Sparse Additive Belief Model," Informs. J. on Computing, Vol. 30, No. 4, 750-767 (2018) -- Yan led the development of a knowledge gradient policy to identify the structure of RNA molecules using a sparse additive belief model. 

**Yingfei Wang (Ph.D. student)**

- Yingfei Wang, K. G. Reyes, K. A. Brown, C. A. Mirkin, W. B. Powell, "Nested Batch Mode Learning and Stochastic Optimization with an Application to Sequential Multi-Stage Testing in Materials Science," SIAM J. Scientific Computing, Vol. 37, No. 3, pp. B361-B381, 2015. -- This paper extended the knowledge gradient to experimental work where experiments could be run in batches.

**Si Chen (Ph.D. student)**

- Si Chen, K-R G. Reyes, M. Gupta, M. C. McAlpine, W. B. Powell, "Optimal Learning in Experimental Design Using the Knowledge Gradient Policy with Application to Characterizing Nanoemulsion Stability," SIAM J. Uncertainty Quantification, Vol. 3, pp. 320-345, 2015. -- Hidden in this paper was a major computational advance using the knowledge gradient with sampled parametric belief models. 

The experience of supervising all this research helped me develop a comfort level with recognizing that "belief states" are legitimate elements of any state variables for dynamic systems where learning is happening.  I supervised two papers that involved managing physical resources (vehicles) while learning was occurring.  Both are available here.  Brief summaries are:

- **Lina al-Kanj, Warren Powell, Belgacem Bouzaiene-Ayari, *The Information-Collecting Vehicle Routing Problem: Stochastic Optimization for Emergency Storm Response --* **This paper optimizes the movement of a utility truck after a storm, where the utility truck has to learn where trees have fallen down while also repairing places where a tree has damaged a power line.  This involves managing a physical resource (the utility truck) while also learning about the state of the network, producing a problem with both a physical state and a belief state.  The problem is solved using a stochastic lookahead policy solved using Monte Carlo tree search, which is robust to complex state variables (the belief state is high-dimensional and continuous).
- **Lawrence Thul, W.B. Powell, *An Information-Collecting Drone Management Problem for Wildfire Mitigation, Jan 18, 2023 --*** This project involved managing a drone that was collecting information about a fire.  Beliefs about the state of the fire were then used to guide the dispatching of a helicopter dropping fire retardant on the fire.  The physical state describes the location of the drone that has to be dynamically managed while in the air.  The belief state describes what we know about the fire.
{% endraw %}
