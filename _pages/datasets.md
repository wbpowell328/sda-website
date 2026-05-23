---
layout: page
title: "Datasets"
permalink: /datasets/
date: 2017-07-16 23:48:06
---

<p class="medium">This webpage offers a series of benchmark problems for testing ADP/RL algorithms. In each we have found the *optimal* policy by creating and solving a discrete version of the problem.</p>
<p class="medium">We have found that popular algorithms based on using various machine learning algorithms can work surprisingly poorly on classical inventory/storage problems. See</p>
<a href="http://castle.princeton.edu/Papers/Jiang%20et%20al%20-%20Comparison%20of%20ADP%20Techniques%20-%20Does%20anything%20work.pdf" target="_blank" rel="noopener">Daniel Jiang, Thuy Pham, Warren B. Powell, Daniel Salas, Warren Scott, “A Comparison of Approximate Dynamic Programming Techniques on Benchmark Energy Storage Problems: Does Anything Work?,” IEEE Symposium Series on Computational Intelligence, Workshop on Approximate Dynamic Programming and Reinforcement Learning, Orlando, FL, December, 2014.</a>
<p class="medium">We have had our best success with methods that can be described as "lookup table with structure." Below, we list problems that exploit <a href="https://castle.princeton.edu/datasets/#convex">convexity</a> and <a href="https://castle.princeton.edu/datasets/#monotone">monotonicity</a>.</p>
<p class="medium"><span class="large"><strong><a id="convex" name="convex"></a>Convex problems - The value function is convex in a single resource dimension</strong></span></p>

<ul>
 	<li class="medium"><span class="large"><a href="https://castle.princeton.edu/datasets/#storagesalas">Energy storage datasets I</a> - prepared by Daniel Salas</span></li>
</ul>
<p class="medium"><span class="large"><a href="https://castle.princeton.edu/datasets/#monotone">Monotone problems</a> - The value function is monotone in each dimension of the state variable</span></p>

<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li class="medium"><span class="large"><a href="https://castle.princeton.edu/datasets/#storagejiang">Energy storage datasets II</a> - prepared by Daniel Jiang (Created June 3 2015)</span></li>
</ul>
</li>
</ul>
<ul>
 	<li class="medium"><span class="large"><a href="https://castle.princeton.edu/datasets/#stoppingjiang">Optimal stopping problems</a> - prepared by Daniel Jiang (Created June 3 2015)</span></li>
</ul>
<strong>Energy storage datasets prepared by Warren Scott </strong>

This is a series of benchmarked energy storage datasets prepared by Warren Scott for the paper:

<a href="https://castle.princeton.edu/wp-content/uploads/2019/01/Benchmark_Energy_Storage_Problems.zip">Click here for the datasets.</a>

<strong><a id="storagesalas" name="storagesalas"></a><span class="large">Energy storage datasets I</span></strong><span class="large"> - prepared by Daniel Salas</span>
<p class="large">The datasets reflect a relatively simple energy storage problem depicted by (in its full form) one battery, a variable (but free) stochastic source (wind or solar), a limitless source at a random prices (from the grid), to serve a fairly predictable but time varying load. We visualiez the problem using</p>
<img src="http://castle.princeton.edu/html/images/PrincetonEnergyStorageBenchmark.jpg" alt="princeton energy storage" width="600" height="231" />
<p class="large">The Princeton energy storage benchmark datasets are a series of finite horizon problems that consist of four components:</p>

<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li class="large">A renewable source of energy (free, but variable and usually stochastic).</li>
</ul>
</li>
</ul>
<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li class="large">The power grid - an infinite supply of energy (and a market) at a random price.</li>
</ul>
</li>
</ul>
<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li class="large">A load - usuallly time dependent, usually stochastic.</li>
</ul>
</li>
</ul>
<ul>
 	<li class="large">A single storage device used to smooth out flows</li>
</ul>
<p class="large">Most of these problems use time-dependent processes. These might reflect a daily cycle for energy storage, or they are simply randomly generated from a time-dependent process.</p>
<p class="large">The problems are described in the paper</p>
<p class="large"><a href="http://castle.princeton.edu/Papers/Salas%20Powell%20-%20Benchmarking%20ADP%20for%20multidimensional%20energy%20storage%20problems.pdf" target="_blank" rel="noopener">Daniel Salas, W. B. Powell, “Benchmarking a Scalable Approximation Dynamic Programming Algorithm for Stochastic Control of Multidimensional Energy Storage Problems,” </a></p>
<p class="large">The problems below include both deterministic and stochastic settings. The optimal benchmark for the deterministic problems was computed by solving the full problem as a linear program. The stochastic problems were solved as discrete Markov decision processes. A description of how to use the datasets is contained in</p>
<p class="large"><a href="http://castle.princeton.edu/html/Datasets/Time-dependent_storage/readme.pdf" target="_blank" rel="noopener">Readme file</a></p>
<p class="large">The datasets include matlab code for generating the scenarios. For non-Matlab types, the scenarios are contained in a text file so that you can compare against exact benchmarks.</p>
<p class="large"><a href="http://castle.princeton.edu/html/Datasets/Time-dependent_storage/Deterministic%20datasets.zip">Deterministic datasets (10 problems)</a></p>
<p class="large"><a href="http://castle.princeton.edu/html/Datasets/Time-dependent_storage/Stochastic%20datasets.zip">Stochastic datasets (21 problems)</a></p>
<a id="monotone" name="monotone"></a><strong class="large">Monotone problems</strong>
<p class="large">We have been undertaking a body of research where we exploit monotonicity in the value function. The monotone-ADP algorithm, and descriptions of the datasets, are given in</p>
<p class="large"><a href="http://castle.princeton.edu/Papers/Jiang-MonotoneADP_arxiv_V4_May252015.pdf" target="_blank" rel="noopener">Daniel Jiang, W. B. Powell, “An Approximate Dynamic Programming Algorithm for Monotone Value Functions,” (under review)</a></p>
<strong><a id="storagejiang" name="storagejiang"></a><span class="large">Energy storage datasets II - prepared by Daniel Jiang</span></strong>
<p class="large">These datasets are based on the Salas storage datasets (above), but includes stochastic demands, and uses a more compact way of representing the optimal policy. The datasets, with complete software and documentation, can be downloaded from:</p>
<p class="large"><a href="http://castle.princeton.edu/html/Datasets/EnergyStorage.zip">Energy storage datasets II</a></p>
<strong><a id="storagejiang2" name="stoppingjiang"></a><span class="large">Optimal stopping problems - prepared by Daniel Jiang</span></strong>

The optimal stopping datasets, with complete software and documentation, can be downloaded from

<a href="http://castle.princeton.edu/html/Datasets/OptimalStopping.zip">Optimal stopping datasets</a>
