---
layout: page
title: "A Modern Approach to Teaching an Introduction to Optimization"
permalink: /teachingoptimization/
date: 2026-06-04
---

{% raw %}
<img src="/sda-website/assets/images/teaching-optimization/mato-cover.jpg" alt="Cover of 'A Modern Approach to Teaching an Introduction to Optimization' by Warren B. Powell, NOW Publishing, 2024 — orange cover with a graph diagram" width="197" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />

**Warren B. Powell, *A Modern Approach to Teaching an Introduction to Optimization*, NOW Publishing, 2024 (120 pages).**

- [Download free PDF here](/sda-website/assets/papers/mato.pdf).
- Print version available from [NOW Publishing](https://tinyurl.com/PowellMATONOW) or [Amazon](https://tinyurl.com/PowellMATOAmazon).

The book outlines a new approach to teaching "optimization," which I view as the "science of making good decisions." It covers a much wider range of decision problems than traditional courses on optimization. It is not a standalone book for students. Instead, it provides a roadmap for instructors to teach "optimization" more as a "science of decision making" spanning both static and sequential decision problems.

In addition to instructors, the book should also be interesting to anyone who has already taken a course in optimization, as it will give you a different (and much broader) way of thinking about how to use what you have already learned.

Many of the topics on sequential decision problems are based on material that is available in my book *[Sequential Decision Analytics and Modeling](/sda-website/sdamodeling/)*. These problems cover the decisions that arise most often in practice. For material that covers classical static linear, integer and nonlinear programming, instructors can use whatever book they may already be using. In my presentation, I present these more familiar optimization problems in two ways: the familiar static version, and then as a policy for a sequential decision problem (which I think represents most actual applications of these methods).

<br clear="all" />

This page is organized as follows:

- [**Motivation**](#motivation)
- [**Audience**](#audience)
- [**Additional readings**](#additional-readings)
- [**Some observations**](#observations)
- [**A modern approach to teaching introductory optimization**](#modern-approach)

## Motivation {#motivation}

My retirement in 2020 allowed me to think about a field from a fresh perspective. While reviewing the undergraduate course at Princeton taught in operations research (along with the textbooks, both widely used by other schools), I concluded that we are approaching how we introduce optimization completely backward, especially given the status of optimization solvers. There is far too much emphasis on sophisticated algorithms for complex problems and not enough emphasis on modeling decision problems that arise in practice.

The problem is not unique to Princeton, since the issues are reflected in the textbooks. The entire field of operations research has fallen into the trap of teaching our favorite methods, rather than teaching students how to make the best possible decisions for a wide range of problems.

## Audience {#audience}

The book is designed for instructors who are teaching (or looking to teach) an introduction to optimization for undergraduates or masters students. The material can be slanted toward traditional audiences from industrial engineering and operations research (who typically have stronger methodological skills) to students focused on a variety of problem domains in engineering and the sciences, economics, politics, health, energy, finance, …

It will also be useful to anyone who has already taken a course in optimization since it will show you a different way of thinking about what you have already learned.

## Additional readings {#additional-readings}

<img src="/sda-website/assets/images/teaching-optimization/orms-modernize-optimization.jpg" alt="Cover of OR/MS Today, June 2024 issue, featuring the article 'Modernize optimization' by Warren B. Powell" width="225" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />

- This book is part of a theme describing a new way of thinking about optimization. This theme is summarized in an article I wrote for the Informs newsletter, *OR/MS Today*, which appeared in June 2024. It can be [downloaded here](https://tinyurl.com/PowellORMS2024/).
- I wrote an article for my Princeton colleagues proposing the idea that the science of how to make good decisions should be taught broadly, much as statistics / data analytics is taught today. I identify three classes of undergraduates: softer domains (sociology, psychology, politics, non-math-track economics), hard science domains (chemistry, physics, math-track economics, physical engineering), and the analytical departments (computer science, operations research, information theory). [You can access the article here](https://tinyurl.com/PowellTeachingDecisions/).

<br clear="all" />

## Some observations {#observations}

- Optimization should be the science of making the best decisions we can.
- We should start with the simplest nontrivial decision problems that students are most familiar with. Examples include machine learning (a form of nonlinear optimization), and an array of sequential decision problems where the decisions may be binary (selling an asset, booking a flight, choosing a webpage design), discrete (choosing the best product to recommend, medical treatment, person to perform a task, …) or a continuous scalar (price, dosage, concentration, time, …).
- Most optimization courses in industrial engineering, operations research, MBA programs, … emphasize linear programs. Virtually no one without formal training has even heard of a linear program, and very few students who take a course in linear programming ever solve a linear program. Of course, there are many applications of linear programming (and integer programming), but these are more complex problems.
- Linear programs (along with integer and nonlinear programs) are almost always presented as static problems. However, the vast majority of optimization problems are used to make decisions that arise over time, which means they are sequential decision problems that have to be solved as new information continues to arrive.

Many people with formal training will recognize a sequential decision problem as a dynamic program, which normally leads to sophisticated material based on Bellman's equation. The only time I use Bellman's equation is to solve a simple deterministic shortest path problem. Please keep in mind that while the academic community likes to bring a high level of sophistication to optimization problems that involve uncertainty, people deal with uncertainty all the time, and there are methods for solving these problems that are quite simple.

## A modern approach to teaching introductory optimization {#modern-approach}

My new monograph represents a fundamentally new approach to teaching introductory optimization. The book challenges two titans of optimization, George Dantzig and Richard Bellman, a point that I make in greater detail in the article:

[***We need to modernize how we introduce students to optimization***](https://tinyurl.com/PowellORMS2024), *OR/MS Today* (June 2024).

The course still covers linear programming (as well as integer and nonlinear programming), but these topics are not started until fairly late in the course, and with much less emphasis on algorithms since these problems are typically solved using packages.

The book sketches **11 topics** that provide a reasonably detailed course outline, with the expectation that an instructor will tune the detailed material to the skills and interests of the class.

The course starts by emphasizing problems that are very familiar to students. I begin with machine learning problems (**Topic 1**) given the very high level of awareness this field enjoys today under the banner of "artificial intelligence." These problems also lay an important foundation for optimizing parameters that is used throughout the course.

**Topics 2–5** then work through a series of simple sequential decision problems that will be very familiar to students (something that has never been true in traditional optimization courses). Even though these are relatively simpler problems and methods, there is still a formal framework that can and should be taught to students in a first course in optimization.

**Topic 6** pauses to present a universal modeling framework for sequential decision problems. These are better known as dynamic programs, but I almost never use Bellman's equation (with apologies to Richard Bellman). Instead, the reader is introduced to four classes of policies, several of which will already be familiar to students (who, after all, have been making decisions in a sequential environment their entire lives). Note that a linear (or integer, or nonlinear) program can be a policy for certain classes of sequential decision problems, which are illustrated in the book.

I do not start linear programming until **Topic 7**, and even then it is a fairly high-level presentation, where there is more emphasis on *what* a linear program is than the painful details of how to solve it. There is a section that uses a network problem to walk students through the simplex algorithm purely using pictures and another section that repeats this exercise but also shows the linear algebra (some instructors will like this, but many will not). Very few students learning this material for the first time will ever solve a linear programming problem after graduation, and if they do, they are going to use a package.

**Topic 8** shows how to use linear programming in a dynamic environment (planning energy storage), and illustrates how deterministic linear programming can be effectively used to solve a stochastic, dynamic problem.

**Topic 9** introduces basic integer programming, using a static facility location problem to illustrate integer variables. I do not encourage presenting the details of integer programming since these algorithms are sophisticated, and anyone solving an integer programming problem will use a package. However, I do provide a list of different classes of integer programs and highlight which are probably solvable using a general-purpose package, and which are not.

**Topic 10** then describes how facility location problems are implemented in practice, which is in a fully sequential setting. While very advanced techniques could be brought to bear on this problem, in an introductory course it is more important for students to recognize that real integer programs are often implemented over time.

Finally, **Topic 11** introduces nonlinear programming, and again starts with a static problem (portfolio optimization) and then shows how in practice many (most? almost all?) static problems are implemented sequentially (such as any portfolio problem).
{% endraw %}
