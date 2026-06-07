---
layout: page
title: "Sequential Decision Analytics and Modeling, 2nd edition"
permalink: /sdamodeling/
date: 2026-06-04
---

{% raw %}
Warren B. Powell
Professor Emeritus, Princeton University
Chief Innovation Officer, Optimal Dynamics

<img src="/sda-website/assets/images/legacy/2026/02/SDAM-front-cover-jpg-201x300.jpg" alt="Cover of Sequential Decision Analytics and Modeling, 2nd edition" width="201" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />
Sequential decision problems arise in virtually every form of human processes: transportation and logistics, supply chain management, energy, health (from public health to medical decision making), finance, e-commerce, laboratory sciences, …

*Sequential Decision Analytics and Modeling* uses a teach-by-example style to illustrate a universal framework for modeling sequential decision problems. The universal framework applies to *any* sequential decision problem, from active learning problems up through complex resource allocation problems. Chapters are accompanied by Python modules that have implemented the models, but the book should be of value even to people not interested in writing code.

- [Click here for a free copy of the 2nd edition](https://tinyurl.com/PowellSDAMbook).

I also recommend as a companion my new monograph *Framing the Problem*, which is addressed very briefly at the beginning of each application chapter. Copies can be obtained from:

- [Kindle edition (just $5)](https://tinyurl.com/PowellFramingAmazon/), or [download the PDF here](https://tinyurl.com/PowellFramingBook/).

<br clear="all" />

## Changes in the 2nd edition

- Updated chapter 1 reflecting new thinking about decisions.
- Each chapter now begins with an overview of what the chapter is covering.
- There is now a short framing section where I identify the metrics, decisions and uncertainties, right after the narrative.
- Numerous edits throughout the book.

## Summary

Chapter 1 illustrates the core modeling framework using two inventory examples and introduces the four classes of policies that encompass *any* method used for making decisions.

Chapters 2–6 use a series of examples designed to illustrate each of the four classes of policies, along with different styles for modeling uncertainty. We pause in chapter 7 to revisit the universal modeling framework, drawing on the applications from chapters 2–6 to illustrate state variables (including belief states), scalar and vector-valued decisions, uncertainty modeling, different types of objective functions, and the four classes of policies.

The book is designed to be used as a standalone introduction to the vast field of sequential decision analytics. For more information, [see the sequential decision analytics website](https://tinyurl.com/sdafield). A YouTube video introduction to [sequential decision analytics is available here](https://tinyurl.com/sdafieldyoutube). [A webpage of links to books, videos, discussions, and suggested courses is available here](https://tinyurl.com/sdalinks/).

For advanced readers interested in developing models and algorithms, I recommend my book *[Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions](https://tinyurl.com/RLandSO/)*.

## Audience

While the entire book is focused on sequential decisions under uncertainty, the book assumes no background in any form of stochastic optimization or dynamic programming. I taught out of an earlier version of this book in an undergraduate course at Princeton. The complete lecture notes are available at [tinyurl.com/RLSOcourses](https://tinyurl.com/RLSOcourses) (scroll down to the "Undergraduate course"). I also suggest an introductory weekly seminar on the same webpage (near the top).

## Software

There is a series of Python modules that accompany most of the chapters. These can be accessed at [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/).

These modules were originally developed by a group of students, reviewed by a staff member, and then used once to teach the course at Princeton (after which I retired). The original modules were completely rewritten by Dennis Janka, a professor at Karlsruhe University in Germany. In his words, the new library includes:

- Introduction of abstract base classes `SDPModel` and `SDPPolicy` that make it easy to set up new models and policies with a minimum amount of code.
- Complete rewrite of the code for the `AssetSelling`, `MedicalDecisionDiabetes`, and `StochasticShortestPath_static` modules, and a Jupyter Notebook for each of the problems that walks the user from creating a model and policy through tuning policies and interpreting the results.

You may contact Dennis at [dennis.janka@h-ka.de](mailto:dennis.janka@h-ka.de) if you have questions or suggestions about the software library. I am grateful to anyone willing to make contributions to this resource.

## Supplementary material

There is additional material, such as spreadsheets and datasets, on the [supplementary material page](/sda-website/sdamodelingsupplements/).
{% endraw %}
