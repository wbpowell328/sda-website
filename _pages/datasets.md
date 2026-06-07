---
layout: page
title: "Datasets"
permalink: /datasets/
date: 2017-07-16 23:48:06
---

{% raw %}
This webpage offers a series of benchmark problems for testing ADP/RL algorithms. In each we have found the \*optimal\* policy by creating and solving a discrete version of the problem.

We have found that popular algorithms based on using various machine learning algorithms can work surprisingly poorly on classical inventory/storage problems. See

[Daniel Jiang, Thuy Pham, Warren B. Powell, Daniel Salas, Warren Scott, "A Comparison of Approximate Dynamic Programming Techniques on Benchmark Energy Storage Problems: Does Anything Work?," IEEE Symposium Series on Computational Intelligence, Workshop on Approximate Dynamic Programming and Reinforcement Learning, Orlando, FL, December, 2014.](http://castle.princeton.edu/Papers/Jiang%20et%20al%20-%20Comparison%20of%20ADP%20Techniques%20-%20Does%20anything%20work.pdf)

We have had our best success with methods that can be described as "lookup table with structure." Below, we list problems that exploit [convexity](https://castle.princeton.edu/datasets/#convex) and [monotonicity](https://castle.princeton.edu/datasets/#monotone).

**Convex problems - The value function is convex in a single resource dimension**

- [Energy storage datasets I](https://castle.princeton.edu/datasets/#storagesalas) - prepared by Daniel Salas

[Monotone problems](https://castle.princeton.edu/datasets/#monotone) - The value function is monotone in each dimension of the state variable

- - [Energy storage datasets II](https://castle.princeton.edu/datasets/#storagejiang) - prepared by Daniel Jiang (Created June 3 2015)

&nbsp;

- [Optimal stopping problems](https://castle.princeton.edu/datasets/#stoppingjiang) - prepared by Daniel Jiang (Created June 3 2015)

**Energy storage datasets prepared by Warren Scott ** This is a series of benchmarked energy storage datasets prepared by Warren Scott for the paper: [Click here for the datasets.](https://castle.princeton.edu/wp-content/uploads/2019/01/Benchmark_Energy_Storage_Problems.zip) **Energy storage datasets I** - prepared by Daniel Salas

The datasets reflect a relatively simple energy storage problem depicted by (in its full form) one battery, a variable (but free) stochastic source (wind or solar), a limitless source at a random prices (from the grid), to serve a fairly predictable but time varying load. We visualiez the problem using

![princeton energy storage](http://castle.princeton.edu/html/images/PrincetonEnergyStorageBenchmark.jpg)

The Princeton energy storage benchmark datasets are a series of finite horizon problems that consist of four components:

- - A renewable source of energy (free, but variable and usually stochastic).

&nbsp;

- - The power grid - an infinite supply of energy (and a market) at a random price.

&nbsp;

- - A load - usuallly time dependent, usually stochastic.

&nbsp;

- A single storage device used to smooth out flows

Most of these problems use time-dependent processes. These might reflect a daily cycle for energy storage, or they are simply randomly generated from a time-dependent process.

The problems are described in the paper

[Daniel Salas, W. B. Powell, "Benchmarking a Scalable Approximation Dynamic Programming Algorithm for Stochastic Control of Multidimensional Energy Storage Problems,"](http://castle.princeton.edu/Papers/Salas%20Powell%20-%20Benchmarking%20ADP%20for%20multidimensional%20energy%20storage%20problems.pdf)

The problems below include both deterministic and stochastic settings. The optimal benchmark for the deterministic problems was computed by solving the full problem as a linear program. The stochastic problems were solved as discrete Markov decision processes. A description of how to use the datasets is contained in

[Readme file](http://castle.princeton.edu/html/Datasets/Time-dependent_storage/readme.pdf)

The datasets include matlab code for generating the scenarios. For non-Matlab types, the scenarios are contained in a text file so that you can compare against exact benchmarks.

[Deterministic datasets (10 problems)](http://castle.princeton.edu/html/Datasets/Time-dependent_storage/Deterministic%20datasets.zip)

[Stochastic datasets (21 problems)](http://castle.princeton.edu/html/Datasets/Time-dependent_storage/Stochastic%20datasets.zip)

**Monotone problems**

We have been undertaking a body of research where we exploit monotonicity in the value function. The monotone-ADP algorithm, and descriptions of the datasets, are given in

[Daniel Jiang, W. B. Powell, "An Approximate Dynamic Programming Algorithm for Monotone Value Functions," (under review)](http://castle.princeton.edu/Papers/Jiang-MonotoneADP_arxiv_V4_May252015.pdf)

**Energy storage datasets II - prepared by Daniel Jiang**

These datasets are based on the Salas storage datasets (above), but includes stochastic demands, and uses a more compact way of representing the optimal policy. The datasets, with complete software and documentation, can be downloaded from:

[Energy storage datasets II](http://castle.princeton.edu/html/Datasets/EnergyStorage.zip)

**Optimal stopping problems - prepared by Daniel Jiang** The optimal stopping datasets, with complete software and documentation, can be downloaded from [Optimal stopping datasets](http://castle.princeton.edu/html/Datasets/OptimalStopping.zip)
{% endraw %}
