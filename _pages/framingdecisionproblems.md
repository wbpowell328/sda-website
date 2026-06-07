---
layout: page
title: "Framing Decision Problems: A video introduction"
permalink: /framingdecisionproblems/
date: 2026-01-23 14:03:10
---

{% raw %}
Warren B. Powell

"If you want a better {anything} you have to make better decisions."

Making better decisions starts by framing the problem properly. Framing a decision problem starts by answering three questions:

1.  What are the performance metrics?
2.  What types of decisions are being made (and who makes them)?
3.  What are the sources of uncertainty? 

These questions need to be answered by domain experts, without any reference to a particular style of analytics, which invariably biases how the questions are answered.

I spoke on this topic for the Loyola University Chicago Lab for Applied AI Speaker Series at the invitation of Professor Steve Platt,  and then a revised version to Professor John Carrier's class in the MIT xPro Leadership Program.  Below is the latest recording based on these talks (made February 13, 2026), broken into five parts:

[Part 1: Introduction to my work, and the 7 levels of AI](https://tinyurl.com/PowellFramingVideoPart1) - I show how my work at Princeton was motivated by a wide range of problems which formed the basis for my universal modeling framework. I then review the "7 levels of AI."  The first four levels aspire to make computers behave like humans (LLMs are level 4).  Levels 5 and 6 aspire to make computers outperform humans (on well-defined problems).  Level 6 addresses sequential decision problems, which is the focus of the universal modeling framework.

[Part 2: Framing decision problems](https://tinyurl.com/PowellFramingVideoPart2/) - This part presents the central ideas of framing decision problems, starting with the three questions above on metrics, decisions and uncertainties.  This section is the heart of the presentation, and is aimed at people who do not have analytical training, but who want to learn how to ask the right questions.  The framing questions form the foundation for modeling any decision problem.

It is possible to benefit from the talk if you stop here.  The next two parts demonstrate that the framing questions lay the foundation for modeling general sequential decision problems. It is my experience that many models reflect a failure to properly frame the problem.

[Part 3: The universal modeling framework](https://tinyurl.com/PowellFramingVideoPart3/) - My framing questions lay the foundation for a completely general mathematical modeling framework (which fits on a single PowerPoint slide).  The three questions do not provide everything we need, but we need the answers to these questions to get started. The UMF provides the bridge from the framing questions to a full mathematical model. However, even if you don't need a formal model, the UMF provides the framework that guides the initial questions.

The universal modeling framework is very high level.  It is comparable to the canonical modeling framework for linear programs, but extended to allow for sequential decision problems.  Most important is that it shifts from the question of finding optimal *decisions *to finding *policies *(methods for making decisions) that have to be evaluated over time as new information arrives. 

[Part 4: Designing Policies](https://tinyurl.com/PowellFramingVideoPart4/) -  Any method for making decisions falls into four classes of policies (along with hybrids).  I sketch each of the four classes of policies, and present six different metrics for evaluating a policy, which raises the question of how people identify "optimal policies."  I discuss evaluating them in simulators or the field.  I then close by ranking the policies in terms of their usefulness.

[Part 5: Teaching materials](https://tinyurl.com/PowellFramingVideoPart5/) - I review a series of books, starting with two that have no mathematics, a teach-by-example book that illustrates the entire modeling process, and finally an advanced book for people who actually want to write software. 

![](https://castle.princeton.edu/wp-content/uploads/2025/12/Bridging-Vol-I-cover-202x300.jpg)

[A nontechnical book on framing decision problems is available on Amazon in the Kindle format here](https://tinyurl.com/PowellFramingAmazon/). I also recommend [The Decision Factory](https://tinyurl.com/TheDecisionFactory/) (available on Amazon) by Adam DeJans and John Elam.
{% endraw %}
