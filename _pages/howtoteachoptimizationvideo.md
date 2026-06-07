---
layout: page
title: "Video series on How To Teach Optimization"
permalink: /howtoteachoptimizationvideo/
date: 2026-01-29 13:01:44
---

{% raw %}
Warren B. Powell
Professor Emeritus, Princeton University

This talk is based on a presentation with the same title I gave to the Operations Research and Industrial Engineering (ORIE) Department at Cornell University, April, 2025.  I have recorded the talk in four parts:

[Part I: Optimizing Decisions](https://tinyurl.com/HowtoTeachOptimizationPart1/) -- We introduce the idea that decisions are a universal human activity, while only a tiny fraction have even heard of the phrase "linear program" or any of its relatives from math programming. We set the stage by presenting the two titans of optimization, George Dantzig and Richard Bellman, and start by noting that many (in optimization) think that linear program is a powerful tool used by many, while dynamic programming (and Bellman's equation) is primarily elegant theory 

[Part II: Sequential Decision Problems](https://tinyurl.com/HowtoTeachOptimizationPart2) -- We introduce sequential decision problems, starting by noting that most linear programs are solved repeatedly over time, which means the linear program is a policy for making decisions.  I introduce the universal modeling framework for sequential decision problems (static, deterministic problems are just a special case) and discuss how to evaluate policies.

[Part III: Designing policies](https://tinyurl.com/HowtoTeachOptimizationPart3/) -- Here we describe the four classes of policies, including PFAs (simple rules, analytical functions, neural networks), CFAs (parameterized deterministic optimization problems, including LPs/NLPs/MILPs), VFAs (Bellman's equation)  and DLAs (deterministic or stochastic lookaheads).  We can also create hybrids from combinations of these.  I close by identifying the three types of policies that are used to solve the vast majority of all decision problems (and this does not include Bellman or stochastic lookaheads).

[Part IV: A New Approach to Teaching Optimization](https://tinyurl.com/HowtoTeachOptimizationPart4/) -- I start by making the point that linear programming is a powerful method for solving a very small number of decision problems, while sequential decision problems (aka dyamic programs) are universal, but almost no-one uses Bellman's equation.  I then present four books that can be used for teaching students at various levels of domain and analytical expertise:

- [Bridging Decision Problems: Volume I -- Framing Decisions](https://tinyurl.com/BridgingDecisionProblems/) -- This book is for nontechnical readers who serve the role of bridging between a problem domain and a modeler.  It focuses on identifying metrics, types of decisions, and sources of uncertainty. It uses no mathematics. This book would be appropriate for business students, and students specializing in a problem domain rather than analytics.  
- [Sequential Decision Analytics and Modeling](https://tinyurl.com/sdamodeling/) -- Written for an undergraduate engineering class, this highly popular book (over 16,000 downloads) uses a teach-by-example style to demonstrate the universal modeling framework, and the four classes of policies. It uses modest notation to illustrate mathematical modeling and designing policies.
- [Reinforcement Learning and Stochastic Optimization](https://tinyurl.com/RLandSO/) -- This is a graduate level text for people who want to develop models and algorithms.  It is the first technical optimization text written entirely around the universal modeling framework (see chapter 9) and all four classes of policies (summarized in chapter 11). 
- [A Modern Approach to Teaching an Introduction to Optimization](https://tinyurl.com/TeachingOpt/) -- This short book is aimed at instructors teaching an introductory course in optimization, which often starts with linear programming.  The book suggests 11 topics, starting with machine learning which lays the important foundation of selecting functions, and then tuning parameters to find the best within a class.  This lays the foundation for topics 2-6 which describe simple sequential decision problems.  Topics 7-11 cover linear, integer and nonlinear programming which are presented in two ways: static, and sequential.  The presentation is appropriate for an undergraduate or master's level course, but would also suggest a fresh approach for Ph.D.-level courses. 
- [Resources webpage for sequential decision analytics](https://tinyurl.com/sdalinks/) -- This webpage has links to a variety of resources including videos, educational webpages, and a webpage on how to teach sequential decision analytics.
{% endraw %}
