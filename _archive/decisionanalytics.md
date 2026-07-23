---
layout: page
title: "Decision Analytics"
permalink: /decisionanalytics/
date: 2020-01-25 08:32:08
---

{% raw %}
Warren B Powell -- Princeton University

Decision Analytics is the next phase of artificial intelligence -- using machines to make decisions, in real world, dynamic environments under different sources of uncertainty. 

Decisions are at the foundation of business, science, engineering, health, transportation, and economics.  They arise throughout the vast problem class known as dynamic resource allocation problems which are so prominent in transportation, logistics and supply chain management.  But they also arise in pricing, marketing, and human resource management. 

AI today predominantly means machine learning, an increasingly this means the power of neural networks to capture complex patterns.  These tools require big datasets to fit large-scale models that require learning tens of thousands, even millions, of parameters.  Neural networks complement an already large toolbox of statistical learning methods.  All of these tools are critical to computer decision making, for the same reason that they are important today for humans.

While decision analytics builds on machine learning, it requires a completely new modeling and algorithmic framework that builds on powerful tools from the optimization community.  In fact, "optimization" was the big buzzword of the 1990's in transportation and logistics, but the approach was too static and rigid.  It produced perfect answers if you gave it perfect data.  Real problems are dynamic, and are plagued by missing and inaccurate data.

Decision analytics blends the fields of optimization and machine learning into a new framework that is specifically designed for dynamic problems.  It takes advantage of the growing access to accurate real-time data through smartphones and "Internet of Things" (IoT) technologies, but uses machine learning in a variety of ways.  This is the field that will blend the new world of instant communication and sensing with old world information processes where knowledge is imperfect and people make their own decisions.

![](https://castle.princeton.edu/wp-content/uploads/2020/01/jungle-300x224.jpg)There are well-defined communities that work in the fields of statistical machine learning and (deterministic) optimization, but as of this writing, there are over 15 distinct fields that work in the areas of making decisions under uncertainty. 

![](https://castle.princeton.edu/wp-content/uploads/2020/01/rlsobook-233x300.jpg)We have pulled these fields together into a single, unified framework that covers *any* sequential decision problem in the presence of many sources of uncertainty.  The framework provides a clear path to computationally tractable and scalable tools that can work in highly dynamic environments. This work builds on decades of research at Princeton University, summarized at [jungle.princeton.edu](http://jungle.princeton.edu).

And these tools do scale.  Reinforcement learning was considered a breakthrough when it was credited with creating expert chess players and playing the Chinese game of Go, where a player has to choose the best of  up to 391 possible actions.  A Go board has has 391 squares, each of which can take 3 values.  Optimizing 5,000 drivers in a truck fleet requires choosing the best out of [latex] 2\^{50,000} [\\latex] actions.  We have to manage 5000 drivers (a bit larger than 391), each of which can take on [latex] 10\^{20} [\\latex] values (a bit larger than 3).  And we have to do this with all the uncertainties of shipper behavior, driver behavior, loading and unloading delays, and traffic problems.  We have it covered.

The elements of decision analytics:

- Problem definition - In plain English, describe the problem.
- Problem elements - List the different agents, which includes controlling agents (that make decisions) as well as exogenous sources of information. For each decision agent, we list decisions, metrics, and uncertainties.  From this we start the process of describing what we need to know, and ways to approximate what we cannot know perfectly.
- Modeling - Here we translate the problem elements for each agent into five core dimensions:
  - State variables
  - Decision variables
  - Exogenous information (what we learn after a decision is made)
  - Transition function (how the state variables evolves over time)
  - Objective function (the performance metrics)
- Uncertainty quantification - Here we model the different sources of exogenous information.
- Designing policies - Decisions are made with policies.  We draw from our four fundamental classes of policies, choose the policies that appear to fit each decision, and design the process for tuning policies.
- Designing the information architecture and data flows.  
- Implementation - Implement the system incrementally, taking on the easiest decisions and evolving to the more complex.  Exception reporting identifies when human intervention is required.  Exception events should drive revisions in the data flows and/or design of the policies.
- Monitoring and continual improvement.

This process can be implementing using the concepts of agile development.  Decisions can be tackled incrementally and steadily improved (as happens today with people).
{% endraw %}
