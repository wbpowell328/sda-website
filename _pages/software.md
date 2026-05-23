---
layout: page
title: "Software"
permalink: /software/
date: 2017-07-16 23:48:06
---

<p class="large">Below are some general purpose routines that we have developed.</p>
<p class="large"><a href="https://castle.princeton.edu/datasets/#molte">MOLTE - Modular, Optimal Learning Testing Environment</a> - This is a Matlab-based environment for comparing algorithms for offline and online learning with discrete alternatives.</p>
<p class="large"><a href="https://castle.princeton.edu/datasets/#monotoneADP">Monotone ADP</a>-Approximate dynamic programming when the value function increases monotonically with respect to each state variable.</p>
<p class="large">Optimal learning software using the knowledge gradient (<a href="http://optimallearning.princeton.edu/" target="_blank" rel="noopener">click here for more information</a>)</p>

<blockquote>
<p class="large"><a href="http://castle.princeton.edu/html/software/kg/KnowledgeGradient_IndependentNormal.xlsx">The knowledge gradient with independent beliefs</a> - Excel spreadsheet</p>
<p class="large"><a href="http://castle.princeton.edu/html/software/kg/KGCB.zip">The knowledge gradient with correlated beliefs</a> - Matlab software</p>
<p class="large"><a href="http://castle.princeton.edu/html/software/kg/KGLinRegression.zip">The knowledge gradient using a linear belief model</a> - Matlab software</p>
</blockquote>
<p class="large"><a href="https://castle.princeton.edu/datasets/#sparsekg">Sparse-KG - The knowledge gradient for a sparse-additive belief model</a></p>
<span class="large"><strong><a id="molte" name="molte"></a>MOLTE - Modular, Optimal Learning Testing Environment</strong></span>
<p class="large">MOLTE is a Matlab-based environment for testing policies for learning the maximum of a function of a (small) set of discrete alternatives. The problems may be offline (ranking and selection) or online (multiarmed bandit). New problems can be easily added by encapsulating the data in its own .m file. Similarly, each algorithm is contained in its own .m file. A simple spreadsheet interface allows the user to guide which problems are being tested, and with which algorithms.</p>
<p class="large">A user's manual is available <a href="http://castle.princeton.edu/html/software/molte/MOLTE_ManualSept62016.pdf" target="_blank" rel="noopener">here</a>.</p>
<p class="large">The complete system, including the MOLTE modeling environment, .m problem files, .m algorithm files, the spreadsheet that determines which problems and algorithms are tested in a particular simulation, and the Matlab simulation environment can be downloaded by click on:</p>
<p class="large"><a href="http://castle.princeton.edu/html/software/molte/MOLTE_Sept6_2016.zip">The MOLTE learning system</a></p>
<p class="large">MOLTE was used for the experimental work in the following paper (which derives a finite-time bound for the knowledge gradient policy), is available at:</p>
<p class="large"><a href="http://castle.princeton.edu/html/software/molte/Wang_MOLTE_June4_2016.pdf" target="_blank" rel="noopener">Yingfei Wang, Warren B. Powell, "A Modular Optimal Learning Testing Environment"</a> - A paper describing MOLTE (under review).</p>
<span class="large"><strong><a id="monotoneADP" name="monotoneADP"></a>Approximate dynamic programming for monotone value functions</strong></span>

<span class="large">There are a surprising number of dynamic programming problems where the value function increases monotonically with each dimension of the state variable. When this property arises, exploiting monotonicity can dramatically increase the rate of convergence of an approximate dynamic programming algorithm.</span>
<p class="large">The software below, written in MatLab, requires the user to specify a cost function, a transition function, and a discrete set of actions. State variables may be continuous, but the software will discretize it on the fly to a user-specified granularity.</p>
<p class="large"><span class="large"><a href="http://castle.princeton.edu/html/software/monotone/README.pdf">Readme file</a> - Provides introduction to the monotone-ADP code</span></p>
<p class="large"><a href="http://castle.princeton.edu/html/software/monotone/MonotoneADP_MATLAB.zip">Simple storage application</a> - This uses a simple charge/discharge storage problem to illustrate the code. It includes the matlab files and a simple demonstration problem.</p>
<p class="large"><a href="http://castle.princeton.edu/html/software/monotone/MonotoneADP_OptimalStopping_MATLAB.zip">Optimal stopping problem</a> - This is a more interesting (and challenging) multidimensional optimal stopping application.</p>
<p class="large"><strong><a id="monotoneADP2" name="sparsekg"></a>Sparse-KG - Knowledge gradient for sparse additive belief model</strong></p>
<p class="large">This package guides the sequential design of experiments for a finite set of alternatives, where the belief model is described by a sparse linear model. Our motivating application was guiding the selection of probes for an RNA molecule, to learn a high-dimensional belief model about the energy of the molecule which exhibited hundreds of sites.</p>
<p class="large">A technical paper describing the methodology and the RNA application is available at:</p>
<p class="large"><a href="http://castle.princeton.edu/Papers/Li%20-%20KG%20policy%20for%20sparse%20additive%20belief%20model.pdf" target="_blank" rel="noopener">Yan Li, Han Liu, W.B. Powell, “The Knowledge Gradient Policy using a Sparse Additive Belief Model,”</a></p>
<p class="large">The software can be downloaded from</p>
<p class="large"><a href="http://castle.princeton.edu/html/html/software/Sparse-KG/SpKG_code_July42015.zip">Sparse-KG software</a></p>
