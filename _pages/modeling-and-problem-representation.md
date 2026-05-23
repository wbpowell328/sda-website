---
layout: page
title: "Modeling and Problem Representation"
permalink: /modeling-and-problem-representation/
date: 2017-09-06 10:57:04
---

<strong>Marar, A. and W.B. Powell, “Combining Cost-Based and Rule-Based Knowledge in Complex Resource Allocation Problems,” IIE transactions Vol. 38 (2), pp. 159-172 2006.</strong>

<em>Assume that we wish to solve a (static) resource allocation problem. We have a cost model, but it is not perfect. We also have observations of how resources (each described by a vector of attributes) behave in the field. However, the data from history is typically at a more aggregate level. For example: "team drivers like long loads", "high powered locomotives are best pulling merchandise trains" are examples of aggregate behaviors that we would like to replicate in a model, while also trying to minimize costs. </em>

<a href="http://castle.princeton.edu/Papers/Marar%20Powell%20Kulkarni%20-%20Cost-based%20and%20rule-based%20patterns%20.pdf" target="_blank" rel="noopener">(Click here to download paper)</a>

<strong>Marar, A. and W. B. Powell, “Capturing Incomplete Information in Resource Allocation Problems through Numerical Patterns,” European Journal of Operations Research, 2008 (in press). doi:10.1016/j.ejor.2008.06.002</strong>

<em>We have long found that it is useful to use historical (or exogenous) patterns of behavior to guide optimization-based models. This paper specifically addresses the use of exogenous patterns of the form "we do a particular action x percent of the time".</em>

<em><a href="http://castle.princeton.edu/Papers/Marar%20Powell-Capturing%20incomplete%20iniformation%20through%20numerical%20patterns.pdf" target="_blank" rel="noopener">(click here to download paper)</a></em>

&nbsp;

<strong>Powell, W.B., T. Wu, H. P. Simao and A. Whisman, “Using Low Dimensional Patterns in Optimizing Simulators: An Illustration for the Military Airlift Problem,” Mathematical and Computer Modeling 29, pp. 657-675 (2004).</strong>

<em>Sometimes a knowledgeable user will look at the results of a model and claim "You cannot send C-141's into Saudi Arabia!". Complaints such as these are instances of low-dimensional patterns, and represent an expression of a desirable behavior that is fairly easy to capture. The problem is that these simplistic rules are not enough to build an entire simulation. In this paper, we draw on the results of Marar to guide the behavior of a simulation model for the military airlift problem.</em>

<a href="http://castle.princeton.edu/Papers/amc_patterns.pdf" target="_blank" rel="noopener">(Click here to download paper)</a>

<strong>Shapiro, J, W.B. Powell and D.E. Bernstein, “A Flexible Java Representation for Uncertainty in Online Operations Research Models,” Journal of Computing, Vol. 13, No. 1, pp. 29-55, 2001. (c) Informs.</strong>

<i>Sometimes a fresh perspective on an old problem produces some really nice insights. In this paper, Joel Shapiro observed that the classical way of representing random variables in software was neither accurate mathematically nor elegant from a software engineering perspective. The problem is that it is common in simulation packages to sample a random variable before it is ``known.'' In this paper, he introduces an</i><b><span style="font-family: 'Courier New';">Information</span></b><i>object that captures whether a quantity is known or not, and introduces the use of the event listener paradigm to notify a decision function when the information is updated.</i>

<a href="http://castle.princeton.edu/Papers/shapiropowellbernstein.ps" target="_blank" rel="noopener">(Click here to download paper)</a>

<strong>Powell, W.B., J. Shapiro and H.P. Simao, “A Representational Paradigm for Dynamic Resource Transformation Problems,” Annals of Operations Research on Modeling (C. Coullard, R. Fourer, and J. H. Owen, eds), Vol. 104, pp. 231-279, 2001.</strong>

<i>This paper is the fundamental modeling paradigm for our work. It evolved over a fouryear period starting in 1997. As we have worked on harder and more complex problems, it became clear that we needed to focus attention on notation. This paper formally introduces a problem class that we call </i>Dynamic Resource Transformation Problems. <i>(This can be abbreviated DRTP, but we use DRiP since it is more pronouncable.) </i><i><a href="https://castle.princeton.edu/?page_id=437&amp;preview=true">click here</a>.</i>

<a href="http://castle.princeton.edu/Papers/drtp.pdf" target="_blank" rel="noopener">(Click here to download paper)</a>

<strong>Powell, W.B. "On Languages for Dynamic Resource Scheduling Problems," in Fleet Management and Logistics, (T. G. Crainic and G. Laporte, eds.), Kluwer Academic Publishers, Boston, 1998.</strong>

<i>This paper was written for a speciality conference on routing and scheduling in honor of the 25th anniversary of the Centre de recherche sur les transports. We were asked to think about the future, and it caught me at a time when I was struggling with the problem of modeling complex operational problems. The paper reflected my frustration with the standard modeling paradigms that our community was using. This was the foundational work for the creation of the DRiP problem class.</i>

<a href="http://castle.princeton.edu/Papers/languages.pdf" target="_blank" rel="noopener"><i>(Click here to download paper)</i></a>

<strong>"Toward a Unified Framework for Real-Time Logistics Control," Military Journal of Operations Research, Vol. I, No. 4, Winter, 1996, pp. 69-79.</strong>

<i>An early application of the DRiP framework for airlift operations.</i>
