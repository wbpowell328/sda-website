---
layout: page
title: "Hdai"
permalink: /hdai/
date: 2020-05-25 20:02:01
---

{% raw %}
## High-dimensional AI for dynamic resource allocation

30 years of research has produced a breakthrough in AI technologies for designing and controlling complex resource allocation problems, motivated by problems in transportation and logistics. The AI community might be able to play board games such as chess and Go, but optimizing a trucking company, railroad or supply chain takes AI to an entirely new level of high-dimensional problems.

Our research required breakthroughs in modeling complex systems, modeling uncertainty, adaptive learning, and designing methods for making decisions, all geared to handling the resource allocation problems that arise in transportation and logistics.

![](https://castle.princeton.edu/wp-content/uploads/2020/05/NewModelingLanguage-1024x772.jpg)

## Modeling

You cannot solve a problem unless you can model it. Guided by decades of research on a wide range of problems, we developed a new modeling framework for complex resource allocation problems. Our modeling framework handles features including:

- Multiattribute resources to model drivers, locomotives and other complex resources.
- Layered problems, such as inventories (1-layer), driver-truck or locomotive-train (2-layers), pilot-aircraft-customer (3-layers). We even handled a 5-layer problem.
- Lagged resources, to capture travel times and pre-order times for customer orders.
- Multi-agent control - We model the organization of how decisions are made, and what decision-makers know.

## Uncertainty

Dynamic resource allocation problems in transportation and logistics all share a common feature: uncertainty. It might be uncertainty in market demands, travel times, prices, weather, equipment performance, and market conditions.

In the 1990's, there was a sudden burst of interest in "optimization." These powerful tools shared the same limitation: an inability to handle uncertainty. As a result, uncertain quantities were replaced with best estimates. Conventional wisdom for handling uncertainty was to reduce it through better forecasting

We represent uncertainty using probability distributions, which means we capture the range of possible values. Rather than adopting methods that require a perfect forecast, we model the uncertainty and then develop methods that learn to adapt to uncertainty. However, incorporating uncertainty in AI tools requires a fundamentally new approach to modeling and making decisions.

## Learning

Making decisions under uncertainty requires learning, which is one reason why there is so much attention today given to machine learning and neural networks. Neural networks are an example of high-dimensional learning architectures: they can fit almost anything, given a large-enough dataset.

In transportation and logistics, we might need to estimate the number of loads for a particular shipper, in a particular lane, on a particular day of week. We will not have a lot of data for fitting this model, and since behaviors change (think about the COVID pandemic), the value of history is limited.

We use two novel strategies in our work on learning:

- Variable-dimensional learning - We blend models of different levels of complexity to find the right model given the available data. This blend changes over time as more data arrives.
- Active learning - Where possible, we make decisions that reflect the value of information that we might acquire as a result of the decision.

Both of these strategies are new to the problem domain of dynamic resource allocation, but have proven to be powerful tools in our work in transportation and logistics.

## Designing policies

In deterministic optimization, we make decisions. When we work with uncertainty, we design policies, which are methods for making decisions. This is the fundamental departure when making decisions under uncertainty.

![](https://castle.princeton.edu/wp-content/uploads/2020/01/jungle.jpg)

There is a vast literature on making decisions in the presence of uncertainty, which we call the [jungle of stochastic optimization](http://jungle.princeton.edu). We have developed a unified framework that spans all of these communities. In the process, we have found that all of the methods proposed in the academic literature, including those used in practice, can be organized under four broad classes of policies. This will include anything already being used in practice. This means the methods are practical and scalable to the complex problems that arise in practice.
{% endraw %}
