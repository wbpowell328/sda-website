---
layout: page
title: "Sequential Decision Analytics for Optimization"
permalink: /sdaforoptimization/
date: 2025-11-13 14:27:31
---

{% raw %}
Warren B Powell
Professor Emeritus, Princeton University
Chief Innovation Officer, Optimal Dynamics

 

This webpage features a presentation I gave to Gurobi Optimization (on November 12, 2025) covering my universal modeling framework for sequential decision problems, but with an emphasis on problems that are typically solved using solvers for deterministic optimization (e.g. linear, nonlinear and integer programming).  

Below are recordings of a talk based on the presentation to Gurobi, divided into five parts.  I think the most exciting idea for people who work on problems that can be reasonably solved using deterministic optimization is presented in part 4 of the talk, which contains an easy introduction to the idea of using parameterized deterministic approximations.

[Part 1: Introduction, transitioning from static to sequential problems](http://tinyurl.com/PowellVideoSDAforOpt1) - I start with an overview of the vast problem class that is covered by sequential decision problems that span choosing among a set of discrete choices to solving large-scale optimization problems. I then make the point that most deterministic math programs are not solved once, but repeatedly over time, which means the optimization problem is a policy for solving a fully sequential decision problem. 

[Part 2: Sequential decision problems and the universal modeling framework](https://tinyurl.com/PowellVideoSDAforOpt2) - Here I introduce the universal modeling framework for sequential decision problems, and show how to write the objective function, and discuss the process of optimizing over and evaluating policies.  I close with a section where I give a formal definition of a "decision" and describe six types of decisions, two of which (types 1 and 6) are familiar to the math programming community.

[Part 3: The four classes of policies](https://tinyurl.com/PowellVideoSDAforOpt3) - I provide a tour through all four classes of policies (PFAs, CFAs, VFAs and DLAs), three of which are well-suited to solving sequential math programming problems.  The four classes cover **any** method for making decisions (these are meta-classes), which means any method covered in any book, or used in practice.  I also present examples of hybrids that combine multiple classes.  

[Part 4: Parameterizing deterministic optimization problems](https://tinyurl.com/PowellVideoSDAforOpt4) - This part provides an easy introduction to the process of using parameterized versions of deterministic approximations, demonstrated using the context of planning an energy storage problem using rolling forecasts of wind.  I then show that any of the four classes of policies may work best depending on the characteristics of the data.

[Part 5: Teaching sequential decision analytics](https://tinyurl.com/PowellVideoSDAforOpt5) - I close by making the point that the current books on making decisions over time (under uncertainty) are fragmented into different communities.  The universal framework offers a single model that covers all sequential decision problems, and any method for making decisions.  This creates visibility for the entire spectrum of approaches for making decisions, allowing people to choose the right approach for their application.
{% endraw %}
