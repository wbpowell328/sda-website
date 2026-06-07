---
layout: page
title: "Books"
permalink: /teaching-books/
date: 2026-05-31
---

{% raw %}
<img src="/sda-website/assets/images/teaching-books/rlso-cover.png" alt="Reinforcement Learning and Stochastic Optimization book cover" width="180" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

## Reinforcement Learning and Stochastic Optimization

W. B. Powell, *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions (RLSO)*, 1100 pages, John Wiley and Sons, 2022.

This is a graduate-level book aimed at readers who are interested in writing their own models and algorithms. The mathematical notation provides sufficient detail to support this level of modeling. There are over 350 exercises, organized at the end of each chapter in seven categories:

1. Review questions
2. Modeling questions
3. Computational exercises
4. Theory questions
5. Problem-solving questions
6. Exercises from SDAM (see below)
7. The "diary problem" — a question aimed at a single problem designed by the reader in chapter 1

[Click here for book webpage.](/sda-website/rlso/)

<br clear="all" />

<img src="/sda-website/assets/images/teaching-books/sdam-cover.jpg" alt="Sequential Decision Analytics and Modeling book cover" width="180" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

## Sequential Decision Analytics and Modeling

W. B. Powell, *Sequential Decision Analytics and Modeling (SDAM)*, 2nd edition, Kindle and PDF, 2025.

SDAM is recommended as a starting point for readers interested in an introduction to the general area of sequential decision problems. It uses a teach-by-example style. Each of the application chapters (every chapter except 1 and 7) follows the same outline: narrative, framing (metrics, decisions, uncertainties), the five elements of the universal modeling framework, a section on modeling uncertainty (typically brief), and a section suggesting policies that might be effective for making decisions.

[Click here for book webpage.](/sda-website/sdamodeling/)

<br clear="all" />

<img src="/sda-website/assets/images/teaching-books/bridging-vol-i-cover.jpg" alt="Bridging Decision Problems, Volume I: Framing the Problem cover" width="180" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

## Bridging Decision Problems (monograph series)

**Volume I: Framing the Problem.** Kindle Direct Publishing, January 2026.

Volume I is 150 pages centered on answering three questions:

1. What are the performance metrics?
2. What types of decisions are being made?
3. What are the sources of uncertainty?

These questions are supported by a dozen different applications in chapter 2, and uses no math.

[Click here for book webpage.](/sda-website/bridgingdecisionproblems/)

### Forthcoming volumes

- **Volume II: The Universal Modeling Framework** — this volume will cover all five elements in considerable depth, representing a substantial expansion on Chapter 9 (Modeling) in RLSO. The presentation uses careful mathematical notation, which is essential for a modeling chapter. There is an in-depth section on modeling uncertainty, but it makes no attempt to describe how to make decisions — that is handled in Volume III.
- **Volume III: Policies** — builds on the modeling framework in Volume II and covers all four classes of policies described in RLSO. The presentation is organized by presenting the policies that are most widely used first, then policies with more limited applications. In some cases policies are presented for specific problem settings, such as whether decisions are discrete or vector-valued.

<br clear="all" />

<img src="/sda-website/assets/images/teaching-books/mato-cover.jpg" alt="A Modern Approach to Teaching Optimization book cover" width="180" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

## A Modern Approach to Teaching Optimization

W. B. Powell, *A Modern Approach to Teaching Optimization*, Boston–Delft: NOW Publishers, 2024.

This book is designed for instructors. It is intended to provide an outline for an introductory course in optimization for undergraduates and masters students. The presentation is divided into 11 topics, starting with machine learning — which lays the foundation for tuning parameters for sequential decision problems covered in topics 2 through 6. We do not introduce linear programming until topic 7. Topics 7 through 11 cover linear, integer, and nonlinear programming, each of which is presented first in a static setting and then extended to a fully sequential setting.

[Click here for book webpage.](/sda-website/teachingoptimization/)

<br clear="all" />

<img src="/sda-website/assets/images/teaching-books/optimal-learning-cover.jpg" alt="Optimal Learning book cover" width="180" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

## Optimal Learning

W. B. Powell and I. O. Ryzhov, *Optimal Learning*, John Wiley and Sons, New York, 2012.

I taught this course at Princeton University from 2008 through 2019 to undergraduates in Operations Research and Financial Engineering. An in-progress draft of a 2nd edition of the book is available from the webpage.

**Optimal Learning** is the name I gave to the class of problems where you have a set of discrete choices (there may be two, dozens, or thousands) where you are uncertain about how well each work. This course was formed on the basis of research by my former Ph.D. student Peter Frazier, who developed a policy he called the *knowledge gradient*. His work on the knowledge gradient for correlated beliefs won the Test of Time Award from the *Informs Journal on Computing* in 2025 (the paper was published in 2007).

[Click here to go to the Optimal Learning course where you can download the 2nd edition of the book.](/sda-website/optimallearningcourse/)

<br clear="all" />

<img src="/sda-website/assets/images/teaching-books/decision-factory-cover.png" alt="Cover of 'The Decision Factory: A Novel About Decisions Under Uncertainty,' first edition, by Adam DeJans Jr. and John Brandon Elam, with a foreword by Warren B. Powell" width="180" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

## The Decision Factory

Adam DeJans Jr. and John Brandon Elam, *The Decision Factory: A Novel About Decisions Under Uncertainty* (with a foreword by W. B. Powell), First Edition.

*The Decision Factory*, coauthored by Adam DeJans and John Elam, is a book written in the conversational style of Eli Goldratt's *The Goal*, centered on a fictitious company "Fulcrum" that is dealing with a complex operational problem. Using no mathematics, TDF outlines how the focus on policies applies to everyday problems, drawing on the Universal Modeling Framework. As I point out in my foreword, even simple rules which capture years of operational knowledge are examples of policy function approximations.

*The Decision Factory* is an outstanding illustration of how day-to-day decision making can be translated into the Universal Modeling Framework. This represents a widely overlooked step in stochastic optimization which is the framing of a problem into the core elements of metrics, decisions, and uncertainties.

*The Decision Factory* is available [on Amazon here](https://a.co/d/03rBmtZH).
{% endraw %}
