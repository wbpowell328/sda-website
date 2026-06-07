---
layout: page
title: "Courses"
permalink: /teaching-courses/
date: 2026-05-31
---

{% raw %}
This page outlines a series of courses and seminars, some of which were taught at Princeton University, on topics related to sequential decision analytics:

- [**Framing Decision Problems**](#framing) — any effort to improve a process needs to start by describing the problem in English, a step we call "Framing the Problem." This could be taught as a course centered on a specific class of applications such as supply chain management or public health.
- [**Sequential Decision Analytics and Modeling (SDAM)**](#sdam) — designed for undergraduates and masters, as well as a supplement to courses on a wide range of topics. This course uses basic mathematical modeling to describe sequential decision problems.
- [**SDAM as a weekly seminar series**](#sdam-seminar) — how the SDAM course could be self-taught as a weekly seminar series.
- [**Reinforcement Learning and Stochastic Optimization (RLSO)**](#rlso) — a graduate-level course for students who want to learn how to model real-world sequential decision problems and develop implementable algorithms.
- [**RLSO as a weekly seminar series**](#rlso-seminar) — how the RLSO course could be self-taught as a weekly seminar series.
- [**Optimal Learning**](#optimal-learning) — I taught this course for 10 years at Princeton at the undergraduate level.

## Framing Decision Problems {#framing}

<img src="/sda-website/assets/images/teaching-courses/bridging-vol-i-cover.jpg" alt="Bridging Decision Problems Vol I cover" width="200" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

The traditional view of mathematical modeling is as a bridge between a real problem and an application. The problem with this approach is that it typically involves using someone skilled in mathematical modeling to ask the questions to formulate the model.

But which skills? People may be trained in machine learning, Monte Carlo simulation, decision trees, or integer programming. Their training determines the vocabulary they use to understand a problem. They ask the questions to fit the framework and solution approaches they are trained in — a characteristic I refer to as *expertise filtering*.

We propose that framing should be an intermediate step, performed by people trained in how to ask the right questions, but without the bias of any particular form of analytics.

We replace the traditional process with one that starts with four steps:

1. **Describing the problem** in plain English.
2. **Framing the problem**, which consists of identifying metrics, types of decisions, and uncertainties. At this point, we may feel we understand the problem well enough to make the decisions, but if not, we progress to step 3.
3. **Develop a formal model** using the universal modeling framework, where decisions are made with the four classes of policies.
4. **Software implementation**, either as a simulator or as a production system.

These four steps lay the foundation for improving any process, where we still need to design the processes for collecting information and implementing decisions.

We approach framing centered on three questions:

1. What are the performance metrics?
2. What types of decisions are being made (and who makes them)?
3. What are the sources of uncertainty (and the form they take) that affect performance?

## Sequential Decision Analytics and Modeling (SDAM) {#sdam}

<img src="/sda-website/assets/images/teaching-courses/sdam-cover.jpg" alt="Sequential Decision Analytics and Modeling book cover" width="200" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

**Description.** This course was taught at Princeton to undergraduates in operations research. It introduces the general field of sequential decision problems, using a teach-by-example style. The course follows a downloadable book (see below) that provides the general framework for sequential decision problems, followed by a series of examples that are all modeled using the same style. The examples were chosen to illustrate the four classes of policies, as well as other issues such as modeling uncertainty.

This course will not provide the comprehensive overview of methodology provided by the graduate course. It is focused on teaching students how to think clearly about sequential decision problems using a powerful, universal modeling framework. All of this is done through a series of carefully chosen examples designed to illustrate creating and solving models.

**Audience.** The course was originally written for undergraduates in Operations Research and Financial Engineering at Princeton. The only mathematical prerequisite is a course in probability and statistics. One chapter (on blood management) uses linear programming, but the material can be covered without prior knowledge of linear programming.

**Notes.** It is extremely easy to create new lectures built around different applications. On two occasions I invited students doing senior thesis research with me to help me run a lecture, where they would provide the answers to questions needed to fill in the five elements of the modeling framework. Students best understand material that is centered on applications they are familiar with, and this is where the material can be easily customized to new problem settings.

**Readings.** This course is taught from the downloadable book: [*Sequential Decision Analytics and Modeling*](https://tinyurl.com/sdamodeling).

**Syllabus.** [Download syllabus here](/sda-website/assets/papers/2023/04/ORF-411-2018-syllabus.pdf).

**Programming.** There are exercises at the end of each chapter. Most chapters are accompanied by a Python module that can be found at [https://tinyurl.com/sdagithub](https://tinyurl.com/sdagithub). Often the exercises can be completed without touching the code, but the software was designed to allow students to modify the logic. I suggest designing questions that fit the programming skills of the audience.

### Lecture slides

Lectures from the course I taught Fall 2018, in PDF and PowerPoint formats.

**Full-course PDFs:** [First half of course](/sda-website/assets/papers/2019/03/ORF-411-lecture-notes-Fall-2018-First-half.pdf) · [Second half of course](/sda-website/assets/papers/2019/03/ORF-411-lecture-notes-Fall-2018-Second-half.pdf)

**Individual lectures (PowerPoint):**

- Lecture 1 — [Introduction, applications, modeling](/sda-website/assets/slides/sdam/ORF-411-Lecture-1-Introduction-applications-modeling-frameworks.pptx)
- Lecture 2 — [Adaptive market planning](/sda-website/assets/slides/sdam/ORF-411-Lecture-2-Adaptive-market-planning.pptx)
- Lecture 3 — [Machine learning](/sda-website/assets/slides/sdam/ORF-411-Lecture-3-Machine-learning.pptx)
- Lecture 4 — [Learning diabetes medications](/sda-website/assets/slides/sdam/ORF-411-Lecture-4-Learning-diabetes-medications.pptx)
- Lecture 5 — [Learning policies](/sda-website/assets/slides/sdam/ORF-411-Lecture-5-Learning-policies.pptx)
- Lecture 6 — [Stochastic shortest paths I](/sda-website/assets/slides/sdam/ORF-411-Lecture-6-Stochastic-shortest-paths-I.pptx)
- Lecture 7 — [Stochastic shortest paths II](/sda-website/assets/slides/sdam/ORF-411-Lecture-7-Stochastic-shortest-paths-II.pptx)
- Lecture 8 — [Designing policies](/sda-website/assets/slides/sdam/ORF-411-Lecture-8-Dynamic-shortest-paths.pptx)
- Lecture 9 — [Energy storage I](/sda-website/assets/slides/sdam/ORF-411-Lecture-9-Designing-policies.pptx)
- Lecture 10 — [Energy storage II](/sda-website/assets/slides/sdam/ORF-411-Lecture-10-Energy-storage-I.pptx)
- Lecture 11 — [Energy storage III](/sda-website/assets/slides/sdam/ORF-411-Lecture-11-Energy-storage-II.pptx)
- Lecture 12 — [Uncertainty modeling](/sda-website/assets/slides/sdam/ORF-411-Lecture-12-Energy-storage-III.pptx)
- Lecture 13 — [Uncertainty modeling](/sda-website/assets/slides/sdam/ORF-411-Lecture-13-Uncertainty-modeling.pptx)
- Lecture 14 — [The beer game I: Introduction](/sda-website/assets/slides/sdam/ORF-411-Lecture-14-The-beer-game-I.pptx)
- Lecture 15 — [The beer game II](/sda-website/assets/slides/sdam/ORF-411-Lecture-15-The-beer-game-II.pptx) ([spreadsheet](/sda-website/assets/slides/sdam/ORF-411-Lecture-15-Princeton-beer-game-spreadsheet.xlsx))
- Lecture 16 — [The beer game III: Discussion](/sda-website/assets/slides/sdam/ORF-411-Lecture-16-The-beer-game-III-Discussion.pptx)
- Lecture 17 — [The blood management problem](/sda-website/assets/slides/sdam/ORF-411-Lecture-17-The-blood-management-problem.pptx)
- Lecture 18 — [Hotel revenue management](/sda-website/assets/slides/sdam/ORF-411-Lecture-18-Hotel-revenue-management.pptx)
- Lecture 19 — [Class decision problem: Booking flights](/sda-website/assets/slides/sdam/ORF-411-Lecture-19-Student-decision-problem-Booking-a-flight.pptx)
- Lecture 20 — [Clinical drug trials](/sda-website/assets/slides/sdam/ORF-411-Lecture-20-Clinical-trials.pptx)
- Lecture 21 — [Student decision problems: Rowing strategies, twitter trading](/sda-website/assets/slides/sdam/ORF-411-Lecture-21-Student-decision-problems-Rowing-twitter-trading.pptx)
- Lecture 22 — [Summary lecture](/sda-website/assets/slides/sdam/ORF-411-Lecture-22-Summary-lecture.pptx)

## SDAM as a weekly seminar series {#sdam-seminar}

The idea of this weekly seminar series is to focus on developing the process of modeling in the context of actual applications. I recommend following the style of the application chapters (every chapter except chapters 1 and 7) in [*Sequential Decision Analytics and Modeling*](https://tinyurl.com/sdamodeling/) (SDAM).

- **Week 1** — I suggest starting by listing as many sequential decision problems as you can that are relevant to the people attending the seminar. One way to get started is to ask everyone attending to come with several examples of decision problems that they can think of. I then suggest working through Chapter 1 of SDAM to illustrate the notation in the context of the inventory problems in Section 1.3.
- **Weeks 2–6** — Use the examples in chapters 2–6 to demonstrate the different elements of the universal modeling framework. By week 6, everyone should have a good feel for how to think about sequential decision problems using basic notation.
- **Week 7** — Use Chapter 7 to review the material from the first six weeks. In particular pay attention to the different flavors of state variables, along with the four classes of policies.
- **Weeks 8–12** — Follow the chapters in SDAM, or blend in applications from your own experiences. Use these weeks to focus on more complex applications.

## Reinforcement Learning and Stochastic Optimization (RLSO) {#rlso}

<img src="/sda-website/assets/images/teaching-courses/rlso-cover.png" alt="Reinforcement Learning and Stochastic Optimization book cover" width="190" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

[Course syllabus](http://tinyurl.com/orf544syllabus).

**Course description.** Making decisions under uncertainty is a universal human activity — something we have all done our entire lives, and generally something we do every day. The study of this rich problem area can be organized under a broad umbrella called *stochastic optimization*. Normally taught as a mathematically deep topic, ORF 544 will be taught with a primary emphasis on proper modeling, and the design and analysis of practical algorithms.

The course will present a unified framework for stochastic optimization that cuts across the many communities that contribute to the general problem of the design and control of systems under uncertainty (I call this the "jungle of stochastic optimization"). This modeling framework has been tested in problem domains spanning transportation and logistics, energy, health, finance, internet search, and even the laboratory sciences.

**Audience.** The course is appropriate for students in operations research, economics, computer science, applied math, and any field of engineering (e.g. for students interested in engineering controls). It is open to undergraduates with a strong interest in models and algorithms. The course requires a basic background in probability and statistics at the undergraduate level (e.g. ORF 245 — if you have ORF 309, even better). There is a small amount of material where a background in linear programming is useful, but this will not be required on problem sets or exams. I will occasionally bridge to more advanced probabilistic concepts, but this will be aimed at students without this background and is not required.

**Readings.** [*Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*](https://tinyurl.com/RLandSO/).

### Lecture slides (Spring 2019)

- [Week 1 — Introduction and overview](/sda-website/assets/papers/2019/02/ORF-544-Week-1-Introduction-and-overview.pdf)
- [Week 2 — Adaptive learning](/sda-website/assets/papers/2019/02/ORF-544-Week-2-Adaptive-learning-1.pdf)
- [Week 3 — Derivative-based stochastic optimization](/sda-website/assets/papers/2019/02/ORF-544-Week-3-Derivative-based-stochastic-optimization.pdf) · [Stochastic-based stochastic search for nonconvex problems](https://castle.princeton.edu/wp-content/uploads/2019/02/Ghadimi-Stochastic-optimization-for-nonconvex-problems-Feb-25.pdf)
- [Week 4 — Derivative-free stochastic optimization Part I: PFAs and CFAs](/sda-website/assets/papers/2019/03/ORF-544-Week-4-Derivative-free-stochastic-optimization.pdf)
- [Week 5 — Derivative-free stochastic optimization Part II: VFAs and DLAs](/sda-website/assets/papers/2019/03/ORF-544-Week-5-Derivative-free-stochastic-optimization-VFA-and-DLA.pdf)
- [Week 6 — Notation and the unified modeling framework](/sda-website/assets/papers/2019/03/ORF-544-Week-6-Modeling-The-unified-framework-1.pdf)
- Week 7 — [Uncertainty and designing policies](/sda-website/assets/papers/2019/03/ORF-544-Week-7-Uncertainty-and-designing-policies.pdf)
- [Week 8 — Policy function approximations (PFAs) and policy search](/sda-website/assets/papers/2019/04/ORF-544-Week-8-PFAs-and-policy-search.pdf)
- [Week 9 — Cost function approximations (CFAs) and introduction to Markov decision processes](/sda-website/assets/papers/2019/04/ORF-544-Week-9-CFAs-and-intro-to-MDP.pdf)
- [Week 10 — Approximate dynamic programming and Q-learning (VFAs)](/sda-website/assets/papers/2019/05/ORF-544-Week-10-Approximate-dynamic-prograrmming-and-Q-learning.pdf)
- [Week 11 — Approximate dynamic programming: Monotonicity and convexity](/sda-website/assets/papers/2019/05/ORF-544-Week-11-Approximate-dynamic-prograrmming-Monotonicity-and-convexity.pdf)
- [Week 12 — Lookahead policies](/sda-website/assets/papers/2019/05/ORF-544-Week-12-Lookahead-policies.pdf)

## RLSO as a weekly seminar series {#rlso-seminar}

Given the lack of existing courses that use my book *Reinforcement Learning and Stochastic Optimization*, I recommend setting up a weekly seminar where graduate students or professionals teach it to themselves. This course requires strong analytical skills, and is appropriate for people who are interested in developing models and algorithms for real applications.

Below is a sketch of what I recommend could be covered each week.

- **Week 1** — Discuss different settings in which sequential decisions arise that are familiar to the group. Discuss decisions, metrics, and exogenous information (that you learn / observe after making a decision). Then introduce state variables, which is all the information you need to compute your metrics, make your decision (which can reflect constraints as well as any other information needed in a policy that has not yet been designed), and model the evolution of the state variables. Note that the design of state variables is iterative — it evolves as you model the system. You might jump forward to section 9.9 for an illustration using energy storage. Mention the four classes of policies that you will return to repeatedly.
- **Week 2** — Assign as outside reading to skim section 2.1, which covers 15 different classes of problems. Discuss in class any that might be of special interest, but otherwise don't use class time on this. Use week 2 to cover key elements of Chapter 3 (online learning) — a short course in machine learning. I suggest covering lookup tables (frequentist and Bayesian), correlated beliefs, a brief discussion of hierarchical models, then linear models, and finally sampled beliefs for nonlinear models. You'll probably also want to touch on neural networks.
- **Week 3** — Cover chapter 4, including section 4.2 (so-called stochastic models that only need deterministic methods), section 4.3 (sampled belief models — simple idea, but very important), and then adaptive learning in section 4.4, the focus of the rest of the book.
- **Week 4** — Chapters 5 and 6 — Derivative-based stochastic search. Cover the basic idea of a stochastic gradient algorithm, and illustrate how a stochastic gradient may be computed (e.g. for the simple newsvendor problem). Mention that we can use numerical derivatives (introduce SPSA). Then introduce the need for the stepsize, and jump to chapter 6 (on stepsizes). Introduce basic deterministic stepsizes and one or two stochastic stepsize rules. I would not go through the optimal stepsize rules — just important to know the material is there.
- **Week 5** — Chapter 7 — Derivative-free stochastic search. Big chapter. Introduce what it means to do derivative-free stochastic search, and touch on the concept of cumulative and final reward objectives. Now introduce the four classes of policies again. Illustrate the PFA, CFA, and possibly some form of DLA (such as the knowledge gradient). Introduce the multiarmed bandit problem. I would skip section 7.6 on VFA-based policies, but note that it introduces Gittins indices, the inspiration for the UCB policies (section 7.5); UCB policies are very popular in the tech sector for choosing which products to advertise to maximize ad clicks. The knowledge gradient (section 7.7.2) captures the value of information from an experiment — useful for expensive experiments and small budgets. You may find you need two weeks for Chapter 7.
- **Week 6** — Class should skim chapter 8 (a series of examples) before class. Then use this class for chapter 9, my big modeling chapter. The five elements of the modeling framework are covered in sections 9.4–9.8. Section 9.1 starts with a simple inventory problem. Section 9.2 provides guidelines for mathematical notation useful for more complex problems, and 9.3 describes how to properly model time in the presence of sequential information processes. Section 9.9 illustrates the modeling framework for an energy storage problem.
- **Week 7** — Chapter 10 focuses on modeling uncertainty. This is where it would help if the students pick a problem on their own, and then review the 12 classes of uncertainties in section 10.1. Then jump to the COVID example in section 10.2. The rest of the chapter addresses the challenges of modeling uncertainty and the technique of Monte Carlo simulation. Important, but students may have prior background.
- **Week 8** — Chapter 11 is a major chapter — a review of the four classes of policies in more depth, and how to choose from among the classes. Be sure to touch on section 11.7 on hybrid policies, which reviews six examples of policies that combine two or more of the four classes into a single policy. It might help to pick a specific problem such as the energy storage problem in section 11.9, where we illustrate all four classes of policies, and then show that any of them (plus a hybrid) can work best depending on the data.
- **Week 9** — Chapter 12 — Here we introduce the simplest policies, PFAs, and discuss parameter tuning. We are just using the methods of chapters 5 and 7, but the review is useful, since it is done in the context of parameter tuning. Parameter tuning ends up being a recurring problem, since you are almost always introducing some form of approximation in any of the four classes of policies, and approximations tend to lead to tunable parameters.
- **Week 10** — Chapter 13 — The first chapter dedicated to the idea of parameterizing deterministic optimization models. An important class of policies, widely used in practice but largely ignored by the academic literature. See the energy storage example with time-dependent demands and rolling forecasts. If anyone is looking for a good area of research, there are incredible opportunities — partly because it is such a useful strategy, but also because there are unresolved methodological issues.
- **Weeks 11–12** — Five chapters on value function approximations, often equated (incorrectly) with "reinforcement learning." You could easily spend half of a real course (meeting twice each week) on this material. I suggest:
  - Cover equation 14.2 in chapter 14, which is basic backward dynamic programming. Be sure to introduce the one-step transition matrix, and note that it is rarely computable. If we could compute one-step transition matrices, we could solve every sequential decision problem with equation 14.2 (I am not a big fan of dynamic programming for steady-state problems — in my entire career, I have never encountered a real application that was properly modeled as a steady-state problem).
  - Jump to chapter 15 (backward ADP) and cover section 15.1, which is how to compute equation 14.2 approximately.
  - Now jump to section 15.3.1 which introduces the idea of using linear models for value function approximations. Mention that you could use a deep neural network here, but it would require a large sample. Be sure to take a quick look at the experimental work in section 15.4. There is not much theory supporting backward ADP, but so far it has worked in every problem I have tried!
  - Next jump to sections 16.1 and 16.2, which describe how to fit a VFA using a fixed policy.
  - Then jump to sections 17.1, 17.2 (skim 17.3), 17.4, and 17.5. Section 17.6 provides two examples that students might find useful.
  - Chapter 18 is advanced material specifically for more complex resource allocation problems. The interest in this material is very dependent on the makeup of the class. This could easily require an entire session.
- **Week 13** — Chapter 19 covers direct lookahead policies. Three parts: sections 19.1–19.5 provide background material that should be skimmed. Section 19.6 introduces deterministic lookaheads, including parameterized deterministic lookaheads (first seen in the energy storage problem in chapter 13). Then cover section 19.7, which introduces stochastic lookahead models and discusses each of the four classes of policies to be used in the stochastic lookahead. The remainder of the chapter covers Monte Carlo tree search (for problems with discrete decisions) and stochastic programming (for problems with vector-valued decisions). Specialized material that depends on the background and interests of the class.

  There are entire books written on specific strategies for solving stochastic lookaheads within a DLA policy. We effectively cover these in just a few sections by standing on the shoulders of all the other chapters.
- **Week 14** — Chapter 20 on multiagent systems. While the interest in this material depends on the interests of the students, there is some very important material in this chapter. I recommend covering sections 20.1 and 20.2. Section 20.3 on POMDPs is advanced material, which points out the limitations of the very substantial literature on POMDPs. Our position is that the two-agent model (environment plus controller) should be used to model problems where we cannot observe the environment perfectly. Sections 20.4, 20.5, and 20.6 are on more specialized topics that depend on the interests of the class.

## Optimal Learning {#optimal-learning}

<img src="/sda-website/assets/images/teaching-courses/optimal-learning-cover.jpg" alt="Optimal Learning book cover" width="170" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />

[Course syllabus](http://tinyurl.com/orf418syllabus).

**Course text:** [*Optimal Learning*, 2nd edition, updated March 11, 2018](https://castle.princeton.edu/wp-content/uploads/2019/02/Powell-OptimalLearningWileyMarch112018.pdf).

[Notation notes (designed to help with notation)](https://www.overleaf.com/read/dxytdmrgkkgm). · [Tutorial article aimed at experimental scientists](https://arxiv.org/abs/2004.05417).

Optimal Learning addresses the problem of making decisions that control what we observe, and therefore how we learn. Unlike classical machine learning, where you might be given a large dataset or a flow of data over which you have no control, we address problems where we control what we observe.

Optimal Learning is a topic that is covered under a variety of names including multiarmed bandit problems and derivative-free stochastic search.

Examples arise in all walks of life. Some examples: trying different medications on a patient to find the one that works best; traveling different paths over a network to find the shortest path; bidding on ads to maximize ad-clicks; finding the price on Amazon to maximize sales; or finding the best starting lineup for a basketball team.

Students will learn how to formulate these problems formally as sequential decision problems in terms of belief models, decisions, the information that is learned from the decision, and the metrics that we use to evaluate our performance. Our decisions have to balance learning against doing the best we can now given what we know. A special case is known as the multi-armed bandit problem, but our framework will be more general. Students will learn all four classes of policies that encompass the entire literature on active learning problems.

Learning problems are solved by designing policies that determine what experiment to run next (choice of drug, bid for an ad, path through a network) given current beliefs. We describe two fundamental strategies for designing policies, each of which is divided into two classes — creating the four classes of policies that cover all possible approaches for solving these problems. Students will learn how to tune and evaluate policies.

**Prerequisites.** The course requires a basic course in probability and statistics, but a more advanced course at the level of ORF 309 is valuable.

**Requirements.** Weekly problem sets in the first half of the semester. In the second half, there will be several problem sets, but students will also participate in one of two activities:

- **Design of an active learning problem.** Students, working in teams of two, identify a learning problem, develop a model, propose and then compare several policies for learning.
- **The Princeton ad-click game.** Teams design learning policies for placing bids for ad-clicks following the rules used by Google. Students design policies (in Python) which then compete against each other to maximize total profits.
{% endraw %}
