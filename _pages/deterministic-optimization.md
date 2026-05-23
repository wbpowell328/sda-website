---
layout: page
title: "Deterministic Optimization"
permalink: /deterministic-optimization/
date: 2017-09-05 17:47:05
---

<strong>Chen, Z.-L. and W.B. Powell, "A Note on Bertsekas' Small-Label-First Strategy," Networks, Vol. 29, No. 2, pp. 111-116 (1997).</strong>

<i>A neat little technical result showing that an algorithm by Bertsekas is NP, and how it can be easily fixed.</i>

<a href="http://castle.princeton.edu/Papers/Chen%20Powell%20Note%20on%20Bertsekas%20small%20label%20first.pdf" target="_blank" rel="noopener"><i>(click here to download paper)</i></a>

<strong>Chen, Z.L. and W.B. Powell, "A Generalized Threshold Algorithm for the Shortest Path Problem with Time Windows," in Network Design: Connectivity and Facilities (P. Pardalos, D. Du, eds.), pp. 303-318 (1998).</strong>

<i>We look at the resource constrained shortest path problem (by Desroschers, Desrosiers and Soumis) and show that Klingman's threshold algorithm is faster in side by side comparisons of code programmed by the same programmer. This is yet another experimental demonstration that the algorithm with the better complexity bound (label setting) is not quite as good as label correcting algorithms (the threshold algorithm is a member of this class).</i>

<a href="http://castle.princeton.edu/Papers/Chen%20Powell%20Generalized%20threshold%20alg%20for%20shortest%20path%20with%20time%20windows.pdf" target="_blank" rel="noopener"><i>(click here to download paper)</i></a>

<strong>Jones, K.L., I.J. Lustig, W.B. Powell and J.M. Farvolden, "Multicommodity network flows: The impact of formulation on decomposition," Mathematical Programming, Vol. 62, pp. 95-117 (1993).</strong>

<i>When this research was done, it was "common knowledge" that Dantzig-Wolfe decomposition did not work. It was common practice (primarily in the 1980's) to use decompositions that produced small master problems. Here, we show that it is possible to get dramatic increases in speed by breaking extreme point solutions (which might be a solution to a network flow problem) into more elementary representations (trees or paths). This produces much larger master problems (an issue in the 80's, but less important now) but much faster convergence.</i>

<strong>Farvolden, J.M., W.B. Powell and I.J. Lustig, "A Primal Partitioning Solution for the Arc-Chain Formulation of a Multicommodity Network Flow Problem," Operations Research , Vol. 41, No. 4, pp. 669-693 (1993). (c) Informs.</strong>

<i>A fast, neat algorithm for multicommodity network flow problems where we show that the basis can be partitioned and exploited to produce a very fast algorithm. Our experiments are primarily on dynamic graphs, and commodities that represent O/D flows.</i>

<strong>Powell, W.B., E. Berkkam and I.J. Lustig, "On Algorithms for Nonlinear Dynamic Networks", in Network Optimization Problems: Algorithms, Complexity and Applications (Dingzhu Du and Panox Pardalos, eds.) World Scientific Press, New Jersey, pp. 203-231 (1993).</strong>

<strong>Powell, W.B. "A Review of Sensitivity Results for Linear Networks and a New Approximation to Reduce the Effects of Degeneracy," Transportation Science, Vol. 23, No. 4, pp. 231-243 (1989). (c) Informs</strong>

<i>This paper is perhaps the most frequently used result in CASTLE Lab. The paper shows how to quickly obtain left and right derivatives with respect to resource constraints using flow augmenting paths. The basic result appears to be "well known" in the research community, but we could not find any documentation of the algorithm or formal writeup of the theory. </i>

<a href="http://castle.princeton.edu/Papers/Powell-Sensitivity%20results%20for%20linear%20networks.pdf" target="_blank" rel="noopener"><i>(click here to download paper)</i></a>

&nbsp;
