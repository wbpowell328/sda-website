---
layout: page
title: "Additional readings on optimal learning and the knowledge gradient"
permalink: /additional-readings-optimal-learning/
date: 2026-05-31
---

{% raw %}
## Additional readings for different belief models

Brief discussions of each are given below.

> Lookup table belief models
>
> Let an alternative *x* be a discrete number 1, \..., M where M is not too large (say less than 1000). We may have a belief *mu_x* about each *x*. If we have independent beliefs, the knowledge gradient is particularly easy to apply. An easy tutorial is contained in the article
>
> > [Powell, W. B. "The Knowledge Gradient for Optimal Learning," Encyclopedia for Operations Research and Management Science, 2011 (c) John Wiley and Sons.](http://optimallearning.princeton.edu/Papers/Powell%20-%20OptimalLearning_EORMS%20March%202011.pdf)
>
> If you are interested in the real theory, see
>
> > [Frazier, P., W. B. Powell and S. Dayanik, "A Knowledge Gradient Policy for Sequential Information Collection," SIAM J. on Control and Optimization, Vol. 47, No. 5, pp. 2410-2439 (2008).](http://optimallearning.princeton.edu/Papers/FrazierPowellDayanik_KnowledgeGradientSICON.pdf)
>
> In most applications, our belief about *mu_x* may be correlated with our belief about another alternative, *x'*. We consider this one of the most powerful advantages of the knowledge gradient over other methods, including the classical bandit theory. This idea is described in the tutorial above, but the original paper on this topic is
>
> > [P. Frazier, W. B. Powell, S. Dayanik, "The Knowledge-Gradient Policy for Correlated Normal Beliefs," Informs Journal on Computing, Vol. 21, No. 4, pp. 585-598 (2009) (c) Informs](http://optimallearning.princeton.edu/Papers/Frazier%20Powell%20Dayanik%20CorrelatedKnowledgeGradientJOC.pdf) *[(Click here for online supplement)](http://optimallearning.princeton.edu/Papers/FrazierPowell_CorrelatedKnowledgeGradientOnlineSupplement.10232008.pdf)*

> Parametric belief models
>
> There are many problems where there may be a huge number of alternatives. For example, imagine we are trying to determine the best ad to put on a website. We would like to predict how many ad clicks an ad will receive based on attributes of the ad (the topic, number of words, graphics, \...). We may pose a regression model (let's assume a linear regression), but we do not know the values of the regression parameters. The goal is to try different ads to learn these parameters as quickly as possible. Once we know the parameters, we can estimate the value of thousands of different ads to determine the ones that are best to put on the website.
>
> The knowledge gradient can be adopted to the problem of making choices to learn a regression model. This work was first done in the context of finding the best molecular compound to cure cancer (see [Drug Discovery](http://www.castlelab.princeton.edu/DrugDiscovery.htm)). The work is described in
>
> [D. Negoescu, P. Frazier and W. B. Powell, "The Knowledge Gradient Algorithm for Sequencing Experiments in Drug Discovery", *Informs Journal on Computing*, Vol. 23, No. 3, pp. 346-363, 2011.](http://optimallearning.princeton.edu/Papers/Negoescu%20Frazier%20Powell_drug_discovery_JOC_August2_2011.pdf) *[(Click here for online supplement)](http://optimallearning.princeton.edu/Papers/Negoescu%20Frazier%20Powell_drug_discovery_JOC_August10_2010_online_supplement.pdf)*
>
> We have generalized this work to high-dimensional models where we use sparse-additive linear models. Here, we combine the frequentist Lasso regularization methodology to identify the most important parameters:
>
> [Yan Li, Han Liu, W.B. Powell, "The Knowledge Gradient Policy using a Sparse Additive Belief Model," Working paper, Department of Operations Research and Financial Engineering, Princeton University, 2015.](http://optimallearning.princeton.edu/Papers/Li-Sparse%20additive%20models%20Dec022014.pdf)
>
> There are many applications that require models that are nonlinear in the parameters. Our work here includes:
>
> [Si Chen, K-R G. Reyes, M. Gupta, M. C. McAlpine, W. B. Powell, "Optimal Learning in Experimental Design Using the Knowledge Gradient Policy with Application to Characterizing Nanoemulsion Stability," SIAM J. Uncertainty Quantification (to appear)](http://optimallearning.princeton.edu/Papers/Chen_KGDP_JUQ_020615.pdf)

> Nonparametric belief models
>
> We have extended the knowledge gradient to two classes of nonparametric belief models. Our first effort used an approximation method based on estimating a function at different levels of aggregation. If we want an estimate of the function at an arbitrary query point *x*, we compute a set of weights *w\^g_x* for each level of aggregation *g* for each query point *x* based on the total sum of squares error (variance plus bias).
>
> We can use this belief model to estimate a function that we are trying to maximize. The knowledge gradient has to compute the *expected value of an observation*, taking into account the possible change in the estimate of the function at each level of aggregation, as well as the possible change in the weights *w\^g_x* which have to be recomputed after each observation. This work is summarized in
>
> > [Mes, M., P. I. Frazier and W. B. Powell, "Hierarchical Knowledge Gradient for Sequential Sampling," *J. Machine Learning Research*, Vol.12, pp. 2931-2974, 2011.](http://optimallearning.princeton.edu/Papers/Mes%20Powell%20Frazier%20-%20Hierarchical%20knowledge%20gradient_JMLR_Nov32011.pdf)
>
> We also computed the knowledge gradient when we are using kernel regression to estimate a function. This work is based on the paper above (Mes et al.), and is summarized in
>
> > [E. Barut, W. B. Powell, "Optimal Learning for Sequential Sampling with Non-Parametric Belief Models," J. Global Optimization (to appear)](http://optimallearning.princeton.edu/Papers/Barut%20Powell%20-%20Optimal%20learning%20for%20sequential%20sampling%20with%20non-parametric%20beliefs.pdf)
>
> We recently derived the knowledge gradient when using a local parametric approximation called [DC-RBF (Dirichlet Clouds with Radial Basis Functions)](http://optimallearning.princeton.edu/Papers/Jamshidi%20Powell%20-%20Recursive%20local%20polynomial%20approximation%20method%20using%20DC-RBF%20Feb162013.pdf):
>
> > [B. Cheng, A. Jamshidi, W. B. Powell, The Knowledge Gradient using Locally Parametric Approximations, Winter Simulation Conference, 2013.](http://optimallearning.princeton.edu/Papers/Cheng%20Jamshidi%20Powell%20-%20KG%20for%20DC-RBF%20Belief%20Models%20August52013.pdf)

## Additional readings

Below is a summary of research papers that we have produced while pursuing this work.

Tutorials

> Powell, W.B."Optimal Learning: Optimization in the Information Age," article in OR/MS Today (2012)
>
> > *This is a short, equation-free article introducing the basic concept of optimal learning, which appeared in the Informs news magazine, OR/MS Today.*
> >
> > *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Powell-Optimal%20Learning-ORMS%20TodayMay2012.pdf)*
>
> Powell, W. B. "The Knowledge Gradient for Optimal Learning," Encyclopedia for Operations Research and Management Science, 2011 (c) John Wiley and Sons.
>
> > *This is a shorter but more up-to-date tutorial on optimal learning than the tutorial listed next. The presentation focuses more on the knowledge gradient.*
> >
> > *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Powell%20-%20OptimalLearning_EORMS%20March%202011.pdf)*
>
> Powell, W. B. and P. Frazier, "Optimal Learning," TutORials in Operations Research, Chapter 10, pp. 213-246, Informs (2008). (c) Informs

> *This was an invited tutorial on the topic of optimal learning, and represents a fairly easy introduction to the general field of information collection. Although the page constraints limited the scope, it covers the central dimensions of information collection, along with an overview of a number of the most popular heuristic policies. Of course, we include an introduction to the knowledge gradient concept.*
>
> *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Powell-Frazier%20Optimal%20learning%20-%20Tutorials%202008-CD-chapter10.pdf)*

The knowledge gradient with independent beliefs

> Frazier, P., W. B. Powell and S. Dayanik, "A Knowledge Gradient Policy for Sequential Information Collection," SIAM J. on Control and Optimization, Vol. 47, No. 5, pp. 2410-2439 (2008).

> *The knowledge gradient policy is introduced here as a method for solving the ranking and selection problem, which is an off-line version of the multiarmed bandit problem. Imagine that you have M choices (M is not too large) where you have a normally distributed belief about the value of each choice. You have a budget of N measurements to evaluate each choice to refine your distribution of belief. After your N measurements, you have to choose what appears to be the best based on your current belief. The knowledge gradient policy guides this search by always choosing to measure the choice which would produce the highest value if you only have one more measurement (the knowledge gradient can be viewed as a method of steepest ascent). The paper shows that this policy is myopically optimal (by construction), but is also asymptotically optimal, making it the only stationary policy that is both myopically and asymptotically optimal. The paper provides bounds for finite measurement budgets, and provides experimental work that shows that it works as well as, and often better, than other standard learning policies.*
>
> *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Frazier%20Powell%20-%20Knowledge%20gradient%20policy.pdf)*

The knowledge gradient with correlated beliefs (offline learning, discrete alternatives)

> P. Frazier, W. B. Powell, S. Dayanik, "The Knowledge-Gradient Policy for Correlated Normal Beliefs," Informs Journal on Computing, Vol. 21, No. 4, pp. 585-598 (2009) (c) Informs

> *The knowledge gradient policy is a method for determining which of a discrete set of measurements we should make to determine which of a discrete set of choices we should make. Most of the applications that we have considered introduce the dimension of correlated beliefs. If we evaluate the level of contamination in one location and it measures high, we are likely to raise our belief about the level of toxin in nearby locations. If we test a machine for airport security that can sense explosives and it works poorly, we might lower our evaluation of other devices that might use similar technologies (e.g. a particular material or sensor within the device). This article shows how to compute the knowledge gradient for problems with correlated beliefs. The paper shows that just as with problems with independent beliefs, the knowledge gradient is both myopically and asymptotically optimal. Experimental work shows that it can produce a much higher rate of convergence than the knowledge gradient with independent beliefs, in addition to outperforming other more classical information collection mechanisms.*
>
> *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Frazier%20Powell%20Dayanik%20CorrelatedKnowledgeGradientJOC.pdf) [(Click here for online supplement)](http://optimallearning.princeton.edu/Papers/FrazierPowell_CorrelatedKnowledgeGradientOnlineSupplement.10232008.pdf)*

The S-curve effect - Handling the nonconcavity of information

> Frazier, P. I., and W. B. Powell, "Paradoxes in Learning: The Marginal Value of Information and the Problem of Too Many Choices," Decision Analysis, Vol. 7, No. 4, pp. 378-403, 2010.
>
> > *The value of information can be a concave function in the number of measurements, but for many problems it is not, and instead follows an S-curve. A little bit of information may teach you nothing, and you may have to make an investment in information beyond a certain threshold to actually have an impact. We investigate the economic implications of the S-curve effect, showing that it is possible to have too many choices. We then revisit the knowledge gradient algorithm, which allocates measurements based on the marginal value of information. The knowledge gradient can produce poor learning results in the presence of an S-curve. We propose the KG(\*) algorithm, which maximizes the average value of information, and show that it produces good results when there is a significant S-curve effect.*
> >
> > *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Frazier%20Powell%20-%20Paradoxes%20in%20learning%20and%20the%20marginal%20value%20of%20information.pdf)*
>
> 
From offline learning to online learning:

> I. Ryzhov, W. B. Powell, P. I. Frazier, "The knowledge gradient algorithm for a general class of online learning problems," *Operations Research*, Vol. 60, No. 1, pp. 180-195 (2012).  
>
> > *The knowledge-gradient policy was originally derived for off-line learning problems such as ranking and selection. Considerable attention has been given to the on-line version of this problem, known popularly as the multiarmed bandit problem, for which Gittins indices are known to be optimal for discounted, infinite-horizon versions of the problem. In this paper, we derive a knowledge gradient policy for on-line problems, and show that it very closely matches the performance of Gittins indices for discounted infinite horizon problems. It actually slightly outperforms the best available approximation of Gittins indices (by Gans and Chick) on problems for which Gittins indices should be optimal. The KG policy is also effective on finite horizon problems. The only policy which is competitive with KG seems to be interval estimation, but this requires careful tuning of a parameter. The KG policy also works on problems where the beliefs about different alternatives are correlated. The KG policy with independent beliefs is extremely easy to compute (we provide closed-form expressions for the case with normal rewards), and requires a simple numerical algorithm for the case with correlated beliefs.*
> >
> > *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell%20Frazier%20-%20KG%20for%20oneline%20learning_OR_March2012.pdf)*
>
> >   

The knowledge gradient using a linear belief model

> D. Negoescu, P. Frazier and W. B. Powell, "The Knowledge Gradient Algorithm for Sequencing Experiments in Drug Discovery", Informs Journal on Computing, Vol. 23, No. 3, pp. 346-363, 2011. (c) Informs
>
> > *This paper describes a method for applying the knowledge gradient to a problem with a very large number of alternatives. Instead of creating a belief about each alternative (known as a "lookup table belief model"), we represent our belief about an alternative using linear regression (known as a "parametric belief model"). The method is motivated by the need to find the best molecular compound to solve a particular problem (e.g. killing cancer cells). There is a base compound with a series of sites (indexed by j) and a series of small sequences of atoms ("substituents") indexed by i. Let X\_{ij} = 1 if we put substituent i at site j, and let theta\_{ij} be the impact of this combination on the performance of the compound. The goal is to choose compounds to test that allow us to estimate the parameters theta as quickly as possible.*
> >
> > *[(click here to download main paper)](http://optimallearning.princeton.edu/Papers/Negoescu%20Frazier%20Powell_drug_discovery_JOC_August2_2011.pdf) [(Click here for online supplement)](http://optimallearning.princeton.edu/Papers/Negoescu%20Frazier%20Powell_drug_discovery_JOC_August10_2010_online_supplement.pdf)*
>
> Yan Li, Han Liu, W.B. Powell, "The Knowledge Gradient Policy using a Sparse Additive Belief Model," Working paper, Department of Operations Research and Financial Engineering, Princeton University, 2015.
>
> > *This paper extends the work on optimal learning with a linear belief model, to the setting where the belief model is a high-dimensional, sparse linear belief model. The paper puts a prior on the distribution of indicator variables that capture whether a coefficient is zero or not. The work is motivated by a problem involving learning the structure of RNA molecules.*
> >
> > [(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Li-Sparse%20additive%20models%20Dec022014.pdf)
>
> Yan Li, Kristopher G. Reyes, Jorge Vazquez-Anderson, Yingfei Wang, Lydia M Contreras, Warren B. Powell, "A Knowledge Gradient Policy for Sequencing Experiments to Identify the Structure of RNA Molecules Using a Sparse Additive Belief Model," Working paper, Department of Operations Research and Financial Engineering, Princeton University, 2015.
>
> > *This paper applies the sparse KG algorithm (see paper immediately above) to the problem of identifying the structure of* RNA *molecules*. *It uses a biophysical model to develop the structure that is used in developing the prior and the underlying belief model.*
> >
> > [(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Li%20-%20KG%20for%20sequencing%20experiments%20for%20RNA%20using%20SpKG%20August%204%202015.pdf)

The knowledge gradient using a nonlinear belief model

> Si Chen, K-R G. Reyes, M. Gupta, M. C. McAlpine, W. B. Powell, "Optimal Learning in Experimental Design Using the Knowledge Gradient Policy with Application to Characterizing Nanoemulsion Stability," SIAM J. Uncertainty Quantification (to appear)
>
> > *This paper addresses the problem of learning when the belief model is nonlinear in the parameters, motivated by a problem in materials science. The paper uses the strategy of solving a sampled belief model, where the prior is represented by a sample of possible parameters (rather than our standard use of multivarite normal distributions).*
> >
> > [(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Chen_KGDP_JUQ_020615.pdf)
>
> 

The knowledge gradient for nonparametric belief models:

> Mes, M., P. I. Frazier and W. B. Powell, "Hierarchical Knowledge Gradient for Sequential Sampling," J. Machine Learning Research, Vol. 12, pp. 2931-2974
>
> > *We develop the knowledge gradient for optimizing a function when our belief is represented by constants computed at different levels of aggregation. Our estimate of the function at any point is given by a weighted sum of estimates at different levels of aggregation.*
> >
> > *[(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Mes%20Powell%20Frazier%20-%20Hierarchical%20knowledge%20gradient_JMLR_Nov32011.pdf)*
>
> E. Barut and W. B. Powell, "Optimal Learning for Sequential Sampling with Non-Parametric Beliefs"
>
> > *This paper develops and tests a knowledge gradient algorithm when the underlying belief model is nonparametric, using a broad class of kernel regression models. The model assumes that the set of potential alternatives to be evaluated is finite.*
> >
> > *[(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Barut%20Powell-Knowledge%20gradient%20for%20nonparametric%20belief%20modelApril2011.pdf)*
>
> B. Cheng, A. Jamshidi, W. B. Powell, Optimal Learning with a Local Parametric Approximations, J. Global Optimization (to appear)
>
> > *The knowledge gradient is developed for a locally parametric belief model. This model, called [DC-RBF](http://optimallearning.princeton.edu/Papers/Jamshidi%20Powell%20-%20Recursive%20local%20polynomial%20approximation%20method%20using%20DC-RBF%20Feb162013.pdf), approximates a function by representing the domain using a series of clouds, which avoids storing the history.*
> >
> > *[(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Cheng%20Jamshidi%20Powell%20-%20Optimal%20learning%20with%20local%20parametric%20belief%20model%20March142015.pdf)*

Learning while learning

There are applications where the underlying alternative is steadily getting better in the process of observing it. An athlete improves over time, as do teams that work together over time. A product with a specific set of features might see sales steadily improve as word of mouth gets around. Often, we do not have time to wait for a process to reach its asymptotic limit, so we can fit a function that tries to guess (imperfectly) this limit. This problem arose in a business simulator which used approximate dynamic programming to learn a policy, while we were tuning various business parameters. This work is summarized in

> P. Frazier, W. B. Powell, H. P. Simao, "Simulation Model Calibration with Correlated Knowledge-Gradients," Winter Simulation Conference, December, 2009.
>
> > *A common challenge in the calibration of simulation model is that we have to tune several continuous parameters. This is our first application of the knowledge gradient algorithm with correlated beliefs to the problem of parameter tuning for simulation models. A single run of the model (which uses adaptive learning from approximate dynamic programming) requires more than a day, so the paper also introduces methods to product results without a full run. A Bayesian model is set up to capture the uncertainty in our beliefs about the convergence of the model. The method is illustrated in the tuning of two continuous parameters, which required approximately six runs of the model.*
> >
> > *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Frazier-WSC_KG_simulation2009_final.pdf)*

Learning when the alternatives are continuous

This paper can handle low-dimensional vectors of continuous parameters.

> Scott, Warren, P. I. Frazier, and W. B. Powell. "The Correlated Knowledge Gradient for Simulation Optimization of Continuous Parameters Using Gaussian Process Regression."  *SIAM Journal on Optimization*  21, No. 3 (2011): 996-1026.
>
> > *We have previously developed the knowledge gradient with correlated beliefs for discrete alternatives. This paper extends this idea to problems with continuous alternatives. We do this by developing a continuous approximate of the knowledge gradient. This produces a nonconcave surface that we have to maximize. Local minima are located close to points that have been previously measured, so we use these points to guess at the locations of local maxima and then use a simple gradient search algorithm starting from each of these points. A proof of convergence is provided. We use the distances between local minima to perform scaling of the steepest descent algorithm. We compare the method against Huang's adaptation of sequential kriging to problems with noisy measurements.*
> >
> > *[(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Scott%20Powell%20-%20Knowledge%20gradient%20for%20continuous%20parameters%20February2011.pdf)*
>
> >   

Learning on graphs and linear programs

> I.O. Ryzhov, W.B. Powell, "Information collection on a graph," *Operations Research*, Vol 59, No. 1, pp. 188-201, 2011. (c) Informs
>
> > *We derive a knowledge gradient policy for an optimal learning problem on a graph, in which we use sequential measurements to rene Bayesian estimates of individual arc costs in order to learn about the best path. This problem differs from traditional ranking and selection, in that the implementation decision (the path we choose) is distinct from the measurement decision (the edge we measure). Our decision rule is easy to compute, and performs competitively against other learning policies, including a Monte Carlo adaptation of the knowledge gradient policy for ranking and selection.*
> >
> > *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell%20-%20InformationCollectionOngraph_OR_May292011.pdf)*
>
> Ryzhov,I.O., W. B. Powell, "Information Collection in a Linear Program," SIAM J. Optimization (to appear)
>
> > *Linear programs often have to be solved with estimates of costs. This theory paper describes an adaptation of the knowledge gradient for general linear programs, extending our previous paper on learning the costs on arcs of a graph for a shortest path problem.*
> >
> > *[(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell%20KG%20for%20linear%20programs%20June142012.pdf)*
>
> B. Defourny, I. O. Ryzhov, W. B. Powell, "Optimal Information Blending with Measurements in the L2 Sphere"
>
> *This (primarily theoretical) paper extends the paper above on learning the coefficients of a linear program. We consider the situation where information is collected in the form of a linear combination of the objective coefficients, subject to random noise. We can choose the weights in the linear combination, a process we refer to as information blending. The paper presents two optimal blending strategies: an active learning method that maximizes uncertainty reduction, and an economic approach that maximizes an expected improvement criterion. Semidefinite programming relaxations are used to create efficient convex approximations to the nonconvex blending problem.*
>
> *[(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Defourny%20Ryzhov%20Powell%20-%20Optimal%20information%20blending_October122012.pdf)*

Learning in the presence of a physical state

> [Ryzhov, I. O., W. B. Powell, "Approximate Dynamic Programming with Correlated Bayesian Beliefs," Forty-Eighth Annual Allerton Conference on Communication, Control, and Computing, September 29 -- October 1, 2010, Allerton Retreat Center, Monticello, Illinois., IEEE Press, pp. 1360-1367.](http://optimallearning.princeton.edu/Papers/RyzhovPowell-kgdp_AllertonconferenceJune142010.pdf)
>
> > *This paper introduces the idea of using the knowledge gradient within a dyamic program, which effectively means in the presence of a physical state. This paper uses a discrete, lookup table representation of the belief model.*
>
> [Ryzhov, I. O. and W. B. Powell, "Bayesian Active Learning With Basis Functions," SSCI 2011 ADPRL - 2011 IEEE Symposium on Adaptive Dynamic Programming and Reinforcement Learning, Paris, April, 2011.](http://optimallearning.princeton.edu/Papers/Ryzhov%20Powell-Bayesian%20active%20learning%20with%20basis%20functionsJan2011.pdf) -
>
> > *This paper uses the knowledge gradient for dynamic programs where the value function is now approximated using a linear model.*

Nested batch learning

> Yingfei Wang, K. G. Reyes, K. A. Brown, C. A. Mirkin, W. B. Powell, "Nested Batch Mode Learning and Stochastic Optimization with an Application to Sequential Multi-Stage Testing in Materials Science," SIAM J. Scientific Computing (to appear)
>
> > *Motivated by a problem in laboratory experimentation, this paper considers the problem where there is an initial choice (e.g. size and shape) followed by a series of experiments (e.g. testing different densities) that can be run in batch model. The paper develops an approximation of the knowledge gradient for batch learning to guide the initial discrete decision (size and shape). The problem is closely related to learning in the presence of a physical state, since the initial decision (size and shape) set the stage for the second decision (density) that is run in batch.*
> >
> > [(Click here to download paper)](http://optimallearning.princeton.edu/Papers/Wang%20-%20Nested%20Batch%20Mode%20Learning%20Feb%20162015.pdf)

General theory

P. Frazier and W. B. Powell, "Consistency of Sequential Bayesian Sampling Policies" SIAM J. Control and Optimization, Vol. 49, No. 2, 712-731 (2011).   DOI: 10.1137/090775026

> We consider Bayesian information collection, in which a measurement policy collects information to support a future decision. We give a sufficient condition under which measurement policies sample each measurement type infinitely often, ensuring consistency, i.e., that a globally optimal future decision is found in the limit. This condition is useful for verifying consistency of adaptive sequential sampling policies that do not do forced random exploration, making consistency difficult to verify by other means. We demonstrate the use of this sufficient condition by showing consistency of two previously proposed ranking and selection policies: OCBA for linear loss, and the knowledge-gradient policy with independent normal priors. Consistency of the knowledge-gradient policy was shown previously, while the consistency result for OCBA is new.
>
> [*(click here to download paper)*](http://optimallearning.princeton.edu/Papers/Frazier%20Powell-Consistency%20of%20sequential%20Bayesian%20sampling%20policiesSIAM2011.pdf)

> Wang, Y. W. B. Powell, K. Reyes, R. Schapire, "Finite-time analysis for the knowledge-gradient policy, and a new testing environment for optimal learning," Working paper, Department of Operations Research and Financial Engineering, Princeton University.

> This paper makes two contributions. First, it provides the first finite-time bound on the performance of the knowledge gradient for offline ranking and selection problems. Second, it describes the first general-purpose testing environment, MOLTE, which provides a large library of problems, each implemented in its own .m file, and a library of algorithms that can be applied to these problems (each of which is also provided in its own .m file). This makes it very easy for others to add new problems, and new algorithms.
>
> *[(click here to download paper)](http://optimallearning.princeton.edu/Papers/Wang%20-%20Finite%20time%20analysis%20for%20the%20knowledge%20gradient%20policy.pdf)*
{% endraw %}
