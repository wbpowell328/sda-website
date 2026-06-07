---
layout: page
title: "Drug Discovery"
permalink: /drug-discovery/
date: 2017-09-07 11:45:10
---

{% raw %}
Optimal Learning for Drug Discovery in Ewing's Sarcoma Peter I. Frazier, Diana Negoescu, Warren B. Powell

**![](http://castle.princeton.edu/html/images/molecule_white_bkgnd.jpg)We are pleased to announce that Diana Negoescu '09 and Peter Frazier \*09 received the honorable mention in the first "Doing Good with Good OR" competition sponsored by Informs. Their project addressed the problem of sequencing the testing of different compounds. For example, in the simple molecule below, there are two sites where we can put any of six substituents (in this case the substituents are atoms, but more frequently these are small combinations of atoms).**

![](http://castle.princeton.edu/html/images/Molecule_two_sites.jpg)

**For larger molecules, there can easily be thousands or tens of thousands of combinations.**

**The project involved the application of the *knowledge gradient* (see the page on [Optimal Learning](http://castle.princeton.edu/html/optimallearning.htm)) to the problem of how to sequence experiments. Each experiment is used to update a statistical model known in this literature as the Free-Wilson model. The knowledge gradient identifies the compounds from which we will *learn the most*. After each experiment, we update the Free-Wilson model, which can then be used to predict which compound is the best. Since these experiments are time consuming and expensive, the goal of this research was to run the smallest number of experiments.**

**![](http://castle.princeton.edu/html/images/KGvsExplore_DoingGoodwGoodOR.jpg)The research used a version of the knowledge gradient which takes advantage of correlated beliefs - trying one compound teaches us something about other compounds due to similarities. This makes it possible to sequence a few hundred experiments, after which we make a recommendation about the best out of 50,000 compounds. The research required modifications to the algorithm for computing the knowledge gradient with correlated beliefs. The original algorithm could handle problems with a few thousand choices, while the largest molecule tested in this research had 87,000 combinations. The new algorithm, which was mathematically equivalent, reduced the need to store a covariance matrix with 87,000 rows and columns to one with only about 200 rows and columns, with a dramatic reduction in execution times.**

**The figure to the left illustrates the ability of the KGCB algorithm to quickly find the best molecule compared to a random strategy. In this experiment, KGCB reliably found the best compound (out of 10,000 choices) in as little as 20 to 60 experiments, versus 60 to over 120 experiments using an unstructured strategy.**

**Slide presentation given by Diana Negoescu at Informs for the competition**

[Optimal Learning for Drug Discovery in Ewing's Sarcoma](http://castle.princeton.edu/Papers/Negoescu-Doinggood_Informs_October2009.pdf)

**Additional readings:**

[Diana Negoescu, Peter I. Frazier, "Optimal Learning for Drug Discovery in Ewing's Sarcoma," paper submitted to the "Doing Good with Good OR" competition of Informs.](http://castle.princeton.edu/Papers/Doinggood_fullPaper.pdf)

[Diana Negoescu, Peter I. Frazier and Warren B. Powell, "The Knowledge-Gradient Algorithm for Sequencing Experiments in Drug Discovery,"](http://castle.princeton.edu/Papers/Negoescu%20Frazier%20Powell_drug_discovery_JOC_August10_2010.pdf) more complete technical paper describing the algorithmic research in detail. [Click here for technical appendix.](http://castle.princeton.edu/Papers/Negoescu%20Frazier%20Powell_drug_discovery_JOC_August10_2010_online_supplement.pdf)

[Frazier, P., W. B. Powell and S. Dayanik, "A Knowledge Gradient Policy for Sequential Information Collection," SIAM J. on Control and Optimization, Vol. 47, No. 5, pp. 2410-2439 (2008).](http://castle.princeton.edu/Papers/FrazierPowell_KnowledgeGradientJournalPaper.04092008.pdf) - This is the original theory paper setting up the knowledge gradient algorithm with independent beliefs.

[P. Frazier, W. B. Powell, S. Dayanik, "The Knowledge-Gradient Policy for Correlated Normal Beliefs," Informs Journal on Computing (to appear).](http://castle.princeton.edu/Papers/FrazierPowell_CorrelatedKnowledgeGradient10232008.pdf) - This paper introduces the knowledge gradient algorithm for correlated beliefs. It is limited to problems where the number of potential alternatives to measure is not too large (say, \< 1000).
{% endraw %}
