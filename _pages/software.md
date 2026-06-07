---
layout: page
title: "Software"
permalink: /software/
date: 2017-07-16 23:48:06
---

{% raw %}
Below are some general purpose routines that we have developed.

[MOLTE - Modular, Optimal Learning Testing Environment](https://castle.princeton.edu/datasets/#molte) - This is a Matlab-based environment for comparing algorithms for offline and online learning with discrete alternatives.

[Monotone ADP](https://castle.princeton.edu/datasets/#monotoneADP)-Approximate dynamic programming when the value function increases monotonically with respect to each state variable.

Optimal learning software using the knowledge gradient ([click here for more information](http://optimallearning.princeton.edu/))

> [The knowledge gradient with independent beliefs](http://castle.princeton.edu/html/software/kg/KnowledgeGradient_IndependentNormal.xlsx) - Excel spreadsheet
>
> [The knowledge gradient with correlated beliefs](http://castle.princeton.edu/html/software/kg/KGCB.zip) - Matlab software
>
> [The knowledge gradient using a linear belief model](http://castle.princeton.edu/html/software/kg/KGLinRegression.zip) - Matlab software

[Sparse-KG - The knowledge gradient for a sparse-additive belief model](https://castle.princeton.edu/datasets/#sparsekg)

**MOLTE - Modular, Optimal Learning Testing Environment**

MOLTE is a Matlab-based environment for testing policies for learning the maximum of a function of a (small) set of discrete alternatives. The problems may be offline (ranking and selection) or online (multiarmed bandit). New problems can be easily added by encapsulating the data in its own .m file. Similarly, each algorithm is contained in its own .m file. A simple spreadsheet interface allows the user to guide which problems are being tested, and with which algorithms.

A user's manual is available [here](http://castle.princeton.edu/html/software/molte/MOLTE_ManualSept62016.pdf).

The complete system, including the MOLTE modeling environment, .m problem files, .m algorithm files, the spreadsheet that determines which problems and algorithms are tested in a particular simulation, and the Matlab simulation environment can be downloaded by click on:

[The MOLTE learning system](http://castle.princeton.edu/html/software/molte/MOLTE_Sept6_2016.zip)

MOLTE was used for the experimental work in the following paper (which derives a finite-time bound for the knowledge gradient policy), is available at:

[Yingfei Wang, Warren B. Powell, "A Modular Optimal Learning Testing Environment"](http://castle.princeton.edu/html/software/molte/Wang_MOLTE_June4_2016.pdf) - A paper describing MOLTE (under review).

**Approximate dynamic programming for monotone value functions** There are a surprising number of dynamic programming problems where the value function increases monotonically with each dimension of the state variable. When this property arises, exploiting monotonicity can dramatically increase the rate of convergence of an approximate dynamic programming algorithm.

The software below, written in MatLab, requires the user to specify a cost function, a transition function, and a discrete set of actions. State variables may be continuous, but the software will discretize it on the fly to a user-specified granularity.

[Readme file](http://castle.princeton.edu/html/software/monotone/README.pdf) - Provides introduction to the monotone-ADP code

[Simple storage application](http://castle.princeton.edu/html/software/monotone/MonotoneADP_MATLAB.zip) - This uses a simple charge/discharge storage problem to illustrate the code. It includes the matlab files and a simple demonstration problem.

[Optimal stopping problem](http://castle.princeton.edu/html/software/monotone/MonotoneADP_OptimalStopping_MATLAB.zip) - This is a more interesting (and challenging) multidimensional optimal stopping application.

**Sparse-KG - Knowledge gradient for sparse additive belief model**

This package guides the sequential design of experiments for a finite set of alternatives, where the belief model is described by a sparse linear model. Our motivating application was guiding the selection of probes for an RNA molecule, to learn a high-dimensional belief model about the energy of the molecule which exhibited hundreds of sites.

A technical paper describing the methodology and the RNA application is available at:

[Yan Li, Han Liu, W.B. Powell, "The Knowledge Gradient Policy using a Sparse Additive Belief Model,"](http://castle.princeton.edu/Papers/Li%20-%20KG%20policy%20for%20sparse%20additive%20belief%20model.pdf)

The software can be downloaded from

[Sparse-KG software](http://castle.princeton.edu/html/html/software/Sparse-KG/SpKG_code_July42015.zip)
{% endraw %}
