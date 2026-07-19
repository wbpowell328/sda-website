---
layout: book
book_data: mato_toc
book_home: /mato/contents/
title: "Chapter 2: Audience"
permalink: /mato/chapter-2/
date: 2026-07-19
---

{% raw %}
This book was originally written to help schools teaching introductory optimization courses adjust their pedagogical approach to a modern style that is much more useful and relevant to students. For this purpose, I discuss below the audience from three perspectives: what departments can use this approach, the students that I am targeting, and the faculty who might be interested in teaching this.

A fourth audience is people who have already taken a traditional course in (typically deterministic) optimization. Simply reading these notes will provide a different perspective that draws on the skills you have already learned.

## 2.1 Academic departments

I think the style of this course can be used in any department that involves making quantifiable decisions. This includes engineering (all departments), the physical sciences (laboratories are full of sequential decision problems), the social sciences, economics, business schools, politics, and psychology.

"Optimization" (linear, nonlinear and integer programming) is traditionally taught in operations research, industrial engineering and applied math. In engineering there is much more emphasis on control theory (a form of sequential decision problem), while economics (along with advanced courses in OR and IE) will emphasize dynamic programming. Computer science for the past decade has taught reinforcement learning, a field that addresses "Markov decision processes" which is just a different form of control problem. These courses all tend to be taught with a moderate to high level of mathematical sophistication, ignoring the reality that virtually everyone needs to solve sequential decision problems.

I will note that none of these classical courses on optimization traditionally deal with what I call "optimal learning" problems, which are problems where the decision controls what information to collect to improve your understanding of a process so you can make better decisions in the future. Optimal learning problems arise in laboratory experimentation (either physical experiments or computer simulations) and a host of field settings (what is the best product to recommend, what is the best price to charge, what is the best medical treatment, what process to use to make a material, ....). I taught a course called Optimal Learning for 10 years at Princeton at the undergraduate level. The course was quite popular, and deals with problems that are much more familiar to our students than linear programs.

The course I am proposing covers both static problems (such as linear programs) as well as sequential decision problems (which includes dynamic programming, optimal control and reinforcement learning). Topics like linear programming can be ignored (for fields where these problems simply do not arise), covered very briefly (a single lecture), or extensively (some courses will spend 4-6 weeks just on linear programming).

The real novelty of our teaching style is how we approach sequential decision problems, which arise in virtually every problem domain, and yet are often ignored in introductory courses in optimization. Our approach to teaching this topic emphasizes practical solution methods that reflect what is used in practice but placed in a framework that formalizes the evaluation and tuning of policies.

Our point of departure from traditional approaches for teaching sequential decision problems is that we largely ignore methods based on solving Bellman's equation (known as Hamilton-Jacobi equations in the optimal control field). Methods based on HJB equations are mathematically elegant, but only apply to a very narrow set of problems, which is a reason why people routinely make decisions over time who have never even heard of HJB equations.

\[Side note: I spent 20 years of my career, and wrote a popular 500-page book, on approximate dynamic programming (also known as reinforcement learning) which is a field that focuses on methods for solving HJB equations approximately. My conclusion that this approach has limited practical value is based on many years of research.\]

## 2.2 Students

The course is aimed at undergraduates or masters students with no prior training in optimization. The following skills will be useful:

- Students will need some calculus, but only at the level of understanding a derivative and gradient (which, to be honest, can be presented very quickly). When we do use derivatives/gradients, these can often be estimated numerically instead of using the analytical formulas stressed in introductory calculus courses.

- We use a very modest amount of linear algebra -- much less than traditional courses in optimization. For example, there are perhaps two places where we use the concept of an inverse of a matrix. Students without any prior training in linear algebra could be taught the basic idea of a vector and matrix in a short tutorial session.

- We will occasionally use some very basic concepts from statistics, but we will do this in a way that does not require a prior course in statistics. For example, it is very easy to introduce a student to a mean and variance. In this course there is no need for familiarity with different probability distributions.

## 2.3 Faculty

I am assuming that the faculty teaching this course are already trained in the core fields of linear, nonlinear and integer programming if you wish to cover this material, but there are entire fields (such as computer science) where students are typically not introduced to linear programming. These topics are covered, but not nearly in the depth that the faculty member might remember from their own training. Times have changed, and there is no longer a need to teach, for example, algorithms for solving linear programs (packages will be used).

## 2.4 Students/professionals with prior optimization training

Reading (even skimming) these notes by someone who has already had a course in (deterministic) optimization should change how they think the solution of the optimization model should be evaluated. This means appreciating that in many (most? almost all?) settings, deterministic optimization models are actually policies (methods for making decisions) that need to be evaluated over time, under uncertainty. This then opens a door to improving the solution of their deterministic model in terms of real-world performance.
{% endraw %}
