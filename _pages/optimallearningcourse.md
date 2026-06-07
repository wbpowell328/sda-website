---
layout: page
title: "Optimal Learning course"
permalink: /optimallearningcourse/
date: 2026-06-04
---

{% raw %}
This course was taught at the undergraduate level at Princeton University for over 10 years.

### Quick links

- [Course syllabus](http://tinyurl.com/orf418syllabus)
- [Course text — *Optimal Learning*, 2nd edition (March 11, 2018)](/sda-website/assets/papers/optimal-learning-book.pdf)
- [Notation notes (designed to help with notation)](https://www.overleaf.com/read/dxytdmrgkkgm)
- [Tutorial article aimed at experimental scientists](https://arxiv.org/abs/2004.05417)

## Course overview

Optimal Learning addresses the problem of making decisions that control what we observe, and therefore how we learn. Unlike classical machine learning where you might be given a large dataset, or a flow of data over which you have no control, we address problems where we control what we observe.

Examples arise in all walks of life. Some examples include trying different medications on a patient to find the one that works best; traveling different paths over a network to find the shortest path; bidding on ads to maximize ad-clicks; finding the price on Amazon to maximize sales; or finding the best starting lineup for a basketball team.

Students will learn how to formulate these problems formally as sequential decision problems in terms of belief models, decisions, the information that is learned from the decision, and the metrics that we use to evaluate our performance. Our decisions have to balance learning against doing the best we can now given what we know. A special case is known as the multi-armed bandit problem, but our framework will be more general. Students will learn all four classes of policies that encompass the entire literature on active learning problems.

Learning problems are solved by designing policies that determine what experiment to run next (choice of drug, bid for an ad, path through a network) given current beliefs. We will describe two fundamental strategies for designing policies, each of which is divided into two classes, creating the four classes of policies that cover all possible approaches for solving these problems. Students will learn how to tune and evaluate policies.

## Audience

The course requires a basic course in probability and statistics, but a more advanced course in probability at the level of ORF 309 is valuable.

## Requirements

The course will have weekly problem sets in the first half of the semester. In the second half, there will be several problem sets, but students will also participate in **one of two activities**:

- **Design of an active learning problem.** This project requires that students, working in teams of two, identify a learning problem, develop a model, propose, and then compare several policies for learning.
- **Participation in the Princeton ad-click game**, where teams will design learning policies for placing bids for ad-clicks following the rules used by Google. Students will design policies (in Python) which will then compete against each other to maximize total profits.

## Readings

The course will be taught from the second edition of [*Optimal Learning*](/sda-website/assets/papers/optimal-learning-book.pdf), which can be downloaded directly from this site.
{% endraw %}
