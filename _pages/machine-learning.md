---
layout: page
title: "Machine Learning"
permalink: /machine-learning/
date: 2017-09-05 17:47:05
---

<em>Our pursuit of approximate dynamic programming has brought us into the field of machine learning. Although our original intent was to develop methods to approximate value functions, this work has taken us into new areas.</em>
<div align="center">
<p align="left"><strong>L. Hannah, D. Blei and W. B. Powell, “Dirichlet Process Mixtures of Generalized Linear Models,” J. Machine Learning Research, Vol. 12, pp. 11923-1953, 2011.</strong></p>

</div>
<div align="left">

We propose Dirichlet Process-Generalized Linear Models (DP-GLM), a new method of nonparametric regression that accommodates continuous and categorical inputs, and any response that can be modeled by a generalized linear model. We prove conditions for the asymptotic unbiasedness of the DP-GLM regression mean function estimate and give a practical example for when those conditions hold. Additionally, we provide Bayesian bounds on the distance of the estimate from the true mean function based on the number of observations and posterior samples. We evaluate DP-GLM on several data sets, comparing it to modern methods of nonparametric regression like CART and Gaussian processes. We show that the DP-GLM is competitive with the other methods, while accommodating various inputs and outputs and being robust when confronted with heteroscedasticity.

<em><a href="http://castle.princeton.edu/Papers/HannahBleiPowell-DPGLMSept2009.pdf" target="_blank" rel="noopener">(click here to download paper)</a></em>

</div>
&nbsp;

<strong>L. Hannah, W. B. Powell, D. Blei, "Nonparametric Density Estimation for Stochastic Optimization with an Observable State Variable," Neuro-Information Processing Society, December, 2010.</strong>

<em>Consider the newsvendor problem, where we have to choose a quantity and then observe a demand. Now assume that we are first given information about the state of the world - perhaps it is rainy or sunny. This observable state changes our belief about the demand, which changes our optimal solution. We have to design an online, stochastic optimization algorithm that solves the problem without actually knowning the distribution of demand, even when we know the state. If there were only two states of the world, the problem would be easy. Now assume the state of the world is a multidimensional vector. We use Dirichlet process mixtures to prove convergence to optimality of an online learning algorithm which can be used for complex state-of-the-world variables. We demonstrate the method in the context of making commitments for wind energy.</em>

<em><a href="http://castle.princeton.edu/html/Papers/Hannah%20Powell%20Blei%20SO_NIPS2010_Finalv1.pdf" target="_blank" rel="noopener">(click here to download paper)</a> <a href="http://castle.princeton.edu/html/Papers/Hannah%20Powell%20Blei%20SO_NIPS2010_Finalv1_supplement.pdf" target="_blank" rel="noopener">(supplement)</a></em>

&nbsp;
<div align="center">
<p align="left"><strong>L. Hannah, W. B. Powell, D. Blei, "Stochastic Search with an Observable State Variable," (under review)</strong></p>

</div>
<em>Think of a newsvendor problem where we have to choose a quantity, and then observe a random demand. Now assume that before we choose the quantity, we can observe the weather, which gives us some information about the demand. Now assume we are making a commitment of energy that we are going to deliver from our wind farm before we know how much the wind will blow. But before we make the commitment, we observe a vector of continuous variables including current and previous wind, prices and demand, along with time of day and information about the weather. We use DP-GLM to create an approximation that is a weighted sum of piecewise linear functions which allow us to capture the concavity of the function with respect to the wind commitment. This paper proves convergence of this strategy, and demonstrates its effectiveness in the context of an energy commitment problem.</em>

<a href="http://castle.princeton.edu/Papers/HannahPowellBlei-Stochastic%20search%20with%20observable%20stateJune232010.pdf" target="_blank" rel="noopener">(Click here to download paper)</a>

<strong>George, A., W.B. Powell and S. Kulkarni, “Value Function Approximation Using Hierarchical Aggregation for Multiattribute Resource Management,” Journal of Machine Learning Research, Vol. 9, pp. 2079-2111 (2008).</strong>

<em>There are a number of problems in approximate dynamic programming where we have to use coarse approximations in the early iterations, but we would like to transition to finer approximations as we collect more information. This paper studies the statistics of aggregation, and proposes a weighting scheme that weights approximations at different levels of aggregation based on the inverse of the variance of the estimate and an estimate of the bias. This weighting scheme is known to be optimal if we are weighting independent statistics, but this is not the case here. What is surprising is that the weighting scheme works so well. We demonstrate this, and provide some important theoretical evidence why it works.</em>

<em><a href="http://castle.princeton.edu/Papers/George%20Powell%20Kulkarni%20-%20Value%20function%20approx%20using%20multiple%20aggregation-JMLR_Oct022008.pdf" target="_blank" rel="noopener">(click here to download paper)</a></em>

&nbsp;
