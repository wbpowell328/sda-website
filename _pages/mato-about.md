---
layout: book
book_data: mato_toc
book_home: /mato/contents/
title: "A Modern Approach to Teaching an Introduction to Optimization"
permalink: /mato/about/
date: 2026-07-19
---

<img src="/assets/images/mato/cover.jpg" alt="Cover of A Modern Approach to Teaching an Introduction to Optimization, by Warren B. Powell" width="200" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />

This is a web edition of *A Modern Approach to Teaching an Introduction to Optimization*, read directly in your browser rather than as a PDF.

The book is also available as a [downloadable PDF](/assets/papers/mato.pdf), or see the [book's webpage](/teachingoptimization/) for a fuller overview and additional readings.

<br clear="all" />

"Optimization" is widely taught in departments such as operations research, industrial engineering, and sometimes applied math, as focusing on complex, multidimensional (and often very high-dimensional) problems that can be formulated as linear, nonlinear or integer programs. Introductory courses are often centered on linear programming, the simplex algorithm and duality theory.

"Optimization" should be the study of making good decisions, and should start with the simplest (but nontrivial) decisions that are familiar to every student. Linear programs solve a very tiny fraction of decision problems, even in areas such as business where linear programming is often taught. I will note that almost no-one in business without formal training in linear programming has even heard the term. More distressingly, only a fraction of undergraduates or masters students who take linear programming ever solve a linear program (even with a package). And no-one outside a tiny core of specialists has ever programmed the simplex algorithm.

This document outlines a new way of teaching optimization that starts with some basic machine learning problems that are very familiar today given the attention that "AI" has attracted. Few people recognize that basic machine learning is actually solving a stochastic optimization problem by assuming we are given a training dataset. I leverage this idea to introduce students to some simple sequential decision problems that involve decisions that everyone faces. We make these decisions using methods (policies) that range from simple, parameterized rules or functions that can be optimized exactly as we solve our machine learning problem.

I then present a series of topics that progress from simple problems that are familiar to everyone, eventually reaching topics such as linear, integer, and nonlinear programming. However, I minimize the attention given to the design of algorithms given that there are widely available packages (it will be the rare beginning student who ever transitions to an algorithmic designer). Instead, I focus on modeling and evaluating the solution which is typically done in the presence of uncertainty.

This book is aimed at faculty who are already teaching an introductory optimization course, or who have a background in optimization and are designing an optimization course. It is also useful to anyone with conventional training in optimization, since it will show you how to think about optimization differently. The presentation consists of a set of topics to guide the design of lectures, leaving considerable flexibility in terms of how much emphasis is placed on individual topics.

The presentation starts with sequential problems, since these are the simplest nontrivial decision problems that are most familiar to students. It then transitions to classical static optimization problems (linear, integer and nonlinear programming) but in each case we show how static optimization models can often be viewed as methods for making decisions in a sequential setting.
