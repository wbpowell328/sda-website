---
layout: page
title: "Teaching Sequential Decision Analytics"
permalink: /teachingsda/
date: 2026-02-02
---

{% raw %}
Warren B. Powell  
Professor Emeritus, Princeton University

Sequential decision analytics is the field that covers the solution of sequential decision problems on the computer, starting from real problem settings (and no math!), all the way through to computer modeling and then field implementation. 

The heart of sequential decision analytics is the universal modeling framework for sequential decision problems.  The UMF is completely general, so it will not constrain how you look at a problem, a property not shared by other modeling frameworks.  Not only does it cover *any* sequential decision problem, it also includes *any *method for making decisions, making it possible to choose the method that works best for any particular situation.

In addition, unlike any other analytical approach, it does not start with analytics -- it starts with a process of framing the problem in English which lays the foundation for the UMF, *if it is needed*.  However, even if a decision problem does not need analytics, the UMF guides the process of how to think about a problem.

Since these ideas are new, they are not taught in existing academic programs (with a small but growing list of exceptions).  For this reason, I have compiled this webpage to guide anyone who wants to learn these ideas.

This webpage is organized as follows:

- [**Audiences**](#audiences) -- I describe the audience for different types of material.
- [**Level 1 -- Understanding the problem**](#level-1) -- These skills involve knowing how to ask the right questions of a domain expert that lay the foundation for modeling decisions.
- [**Level 2 -- Introduction to sequential decision analytics**](#level-2) -- This provides a basic understanding of the analytics of our modeling framework, but not at the depth required to develop production software.
- [**Level 3 -- Advanced modeling**](#level-3) -- Here we address the technical challenge of modeling a problem, but before we design policies for making decisions.
- [**Level 4 -- Designing policies**](#level-4) -- Finally we tackle the complex problem of making effective decisions over time by creating policies for making decisions.
- [**Level 5 -- Multiagent systems**](#level-5) -- This level will address extending our framework to handle the rich domain of multiagent systems.
- [**Teaching sequential decision analytics (introductory)**](#teaching-sda-intro) -- I describe the undergraduate course I taught at Princeton using *Sequential Decision Analytics and Modeling*, including all of my lecture slides.
- [**Teaching *Reinforcement Learning and Stochastic Optimization* (advanced)**](#teaching-rlso) -- This is a weekly seminar where I recommend the specific sections of my book that I would teach in a first pass through the book.
- [**Optimal/active learning ("Intelligent trial and error")**](#optimal-learning) -- This bullet contains material on what I consider to be the most important sequential decision problem, finding the best of a set of uncertain choices.
- [**Educational videos**](#educational-videos) -- This lists helpful educational videos along with presentations emphasizing specific applications (finance, energy, health, supply chain management).

## Audiences {#audiences}

I divide audiences into the following levels:

1.  **Domain experts** -- These are people who are familiar with a problem domain, without formal analytical training.  This would include business people, scientists, engineers, health professionals, economists, and finance professionals.
2.  **Problem framers** -- These are people who provide the bridge between domain experts and modelers.  They answer the domain-specific questions that would be needed by any model.
3.  **Decision scientists** -- These are people with basic training in analytics that give them some understanding of analytical tools, but primarily for the purpose of using software packages.
4.  **Modelers** -- These are people with stronger mathematical training that allow them to understand mathematical notation and (usually) the ability to implement these models on the computer.  Modelers typically have the training in programming to translate their models into software, but typically lack the training in databases as well as front-end and back-end programming.
5.  **Software engineers** -- These are the people with the training in databases along with the software engineering skills for front-end and/or back-end programming.  This community may benefit from an understanding of sequential decision problems, but generally they are responding to the needs of the modelers and users.

The material on this webpage primarily serves the needs of the first four groups.  

## Level 1 -- Understanding the problem {#level-1}

This level involves understanding the process of making decisions over time as new information arrives.  The traditional approach to teaching this material has been to start with books that use relatively advanced analytical tools.  Students are then taught how to model a problem using the tools they have just learned. This has created a barrier between real-world problems and practical tools.  So-called advanced tools tend to use complex mathematics to model relatively simple problems, a limitation that gets lost in the math.

It is important to remember that real decision problems are understood by the people who work in business, science, engineering, health, economics or finance.  These people usually do not have any analytical training, but they understand their problem domains.  If we want to model their problem, we have to ask the right questions.  

This level is for undergraduates and masters students in domain-oriented fields, as well as people in business, the hard sciences, the social sciences, economics and health who typically do not have mathematical training.

#### **Understanding decisions**

There are countless discussions of "making better decisions" accompanied by an extensive literature for finding "optimal decisions," and yet none of these sources offer a formal definition of a decision, or a characterization of different types of decisions.  

We fill in this gap with the webpage we call ["What is a decision" that can be accessed here. ](https://tinyurl.com/whatisadecision/) The point of this discussion is to identify decisions independently of any effort to model decisions, which introduces *expertise bias* where the description of a problem is guided by the technical training of the person providing the description.   

#### Business applications

<img src="https://castle.princeton.edu/wp-content/uploads/2026/02/The-Decision-Factory-192x300.jpg" alt="The Decision Factory book cover" width="192" align="right" />
While decisions span any human endeavor, a major problem class is the vast range of decisions made in business settings.  The forthcoming book *The Decision Factory* (to appear in March, 2026) uses the style of a novel (popularized by the 1984 business classic *The Goal*) to illustrate the challenges of planning in a dynamic environment.  The book uses the principle of designing *policies* that are methods (any method) for making decisions.

#### Framing the problem

The traditional view of mathematical modeling is as a bridge between a real problem and an application.  The problem with this approach is that it typically involves using someone skilled in mathematical modeling to ask the questions to formulate the model.

But which skills?  People may be trained in machine learning, Monte Carlo simulation, decision trees, or integer programming.  Their training determines the vocabulary they use to understand a problem.  They ask the questions to fit the framework and solution approaches they are trained in, a characteristic that I refer to as *expertise filtering*.  

We propose that framing should be an intermediate step, performed by people trained in how to ask the right questions, but without the bias of any particular form of analytics.

We replace the traditional process with one that starts with four steps:

1.  Describing the problem in plain English.
2.  Framing the problem, which consists of identifying metrics, types of decisions and uncertainties. At this point, we may feel we understand the problem well enough to make the decisions, but if not, we progress to step 3.
3.  Develop a formal model using the universal modeling framework, where decisions are made with the four classes of policies.
4.  Software implementation, either as a simulator or implementation as a production system.

These four steps lay the foundation for improving any process, where we still need to design the processes for collecting information and implementing decisions.

We approach framing centered on three questions:

1.  What are the performance metrics?
2.  What types of decisions are being made (and who makes them)?
3.  What are the sources of uncertainty (and the form they take) that affect performance?  

<img src="https://castle.princeton.edu/wp-content/uploads/2025/12/Bridging-Vol-I-cover-202x300.jpg" alt="Bridging Decision Problems Vol I cover" width="202" align="right" />
A good starting point is Volume I of my new monograph series, [*Bridging Decision Problems*](https://tinyurl.com/BridgingDecisionProblems/).  Volume I is called *Framing the Problem* and is written entirely around these three questions, with no math. There is more information at the link [Framing Decision Problems (t](https://tinyurl.com/FramingDecisionProblems/)he book is available for \$5 on [Kindle from Amazon here)](https://tinyurl.com/PowellFramingAmazon/).

I also recommend the talk I gave at Loyola which focuses on how to teach these ideas to a business audience.

[Sequential Decision Problems: From Framing to Modeling to Solutions](https://tinyurl.com/PowellFramingVideo/)

## Level 2 -- Introduction to sequential decision analytics {#level-2}

This level requires a facility with mathematical modeling, which means representing sequential decision problems with mathematical notation. This level will expose students to different methods for solving problems, but not at the level to implement these methods on a computer.  Students become familiar with simple models for sequential decision problems, and the four classes of policies for making decisions.

This level is for students with basic analytical skills, such as those provided in most engineering departments, applied math, and programs sending students into roles with titles of "data analytics" or "data scientists."  

#### Introductory book

A popular starting point with mathematical modeling is the introductory book *Sequential Decision Analytics and Modeling,* which is available for download at: 

*[Sequential Decision Analytics and Modeling](https://tinyurl.com/sdamodeling/) *

The book uses a teach-by-example style and consists of 14 chapters, 12 of which are on different applications:

**Chapter 1 -- Introduction\**
Chapter 2 -- An asset selling problem  
Chapter 3 -- Adaptive market planning  
Chapter 4 -- Learning the best diabetes medication  
Chapter 5 -- Stochastic shortest path problems -- Static  
Chapter 6 -- Stochastic shortest path problems -- Dynamic  
**Chapter 7 -- Applications, revisited\**
Chapter 8 -- Energy storage I  
Chapter 9 -- Energy storage II  
Chapter 10 -- Supply chain management I -- The two-agent newsvendor problem  
Chapter 11 -- Supply chain management II -- The beer game  
Chapter 12 -- Ad-click optimization  
Chapter 13 -- Blood management problem  
Chapter 14 -- Optimizing clinical trials

Each chapter follows roughly the same outline, covering:

- Narrative -- brief description of the problem.
- The universal model -- All five elements of the UMF.
- Modeling uncertainty -- I use the different application settings to highlight different approaches to modeling uncertainty.
- Designing policies -- By chapter 6 the reader will have seen all four classes of policies (first introduced at the end of chapter 1). Chapter 7 reviews the first six chapters, focusing on state variables and the different classes of policies.
- Possible extensions -- Some chapters offer extensions of the original problem.

This is the first edition.  The 2nd edition will be available in March, 2026. A more advanced book dedicated to modeling for the universal modeling framework will be coming out in early 2026.  

### Weekly seminar series

The idea of this weekly seminar series is to focus on developing the process of modeling in the context of actual applications.  I recommend following the style of the application chapters (every chapter except chapters 1 and 7) in *[Sequential Decision Analytics and Modeling](https://tinyurl.com/sdamodeling/) (SDAM).  *

- Week 1 -- I suggest starting by listing as many sequential decision problems as you can that are relevant to the people attending the seminar.  One way to get started is to ask everyone attending the seminar to come with several examples of decision problems that they can think of.  I then suggest working through Chapter 1 of SDAM to illustrate the notation in the context of the inventory problems in Section 1.3.
- Weeks 2-6 -- I recommend using the examples in chapters 2-6 to demonstrate the different elements of the universal modeling framework. By week 6, everyone should have a good feel for how to think about sequential decision problems using basic notation. 
- Week 7 -- Use Chapter 7 to review the material from the first six weeks.  In particular pay attention to the different flavors of state variables, along with the four classes of policies.  
- Weeks 8-12 -- Again, you can follow the chapters in SDAM, or blend in applications from your own experiences.  Use these weeks to focus on more complex applications.

## Level 3 -- Advanced modeling {#level-3}

This level is for people who want to *model* real problems and implement these models on the computer.  This is the necessary step before actually solving the problems by making decisions.  This requires modeling how the system evolves over time given a source for making decisions (which comes in level 4).  Typically, the most difficult modeling task arises when modeling uncertainty.  As with Level 2, this can also be done at different levels, where the most basic level will cover policies that span the widest range of problems, up to the most advanced algorithms for specialized classes of complex problems. 

Level 3 focuses just on modeling sequential decision problems.  Here we take as given that someone is going to make decisions for us, and we just have to model how our system will evolve over time.  This involves three elements:

- State variables -- At this point we have an incomplete understanding of the state variable (a full understanding requires the policy itself), but enough to develop an understanding of the process.
- The exogenous information process -- Here we model the flow of information that we did not know in advance, which means this information reflects different forms of uncertainty.  This is typically the most challenging dimension of modeling.
- The transition function -- Given the state variable (admittedly incomplete), the decision (which comes from the policy to be designed later), and the exogenous information, the transition function tells us how to update the state variable.  

<img src="https://castle.princeton.edu/wp-content/uploads/2026/02/Bridging-Vol-II-front-cover-203x300.jpg" alt="Bridging Decision Problems Vol II cover" width="203" align="right" />
The best starting point at this time is [Chapter 9 of *Reinforcement Learning and Stochastic Optimization*, which can be downloaded from here](https://tinyurl.com/RLandSO/). Volume II of the "Bridging Decision Problems" series, called "The Universal Modeling Framework," is an expanded version of Chapter 9.  It steps through all five elements of the universal modeling framework as is done in Chapter 9 of RLSO, but in considerably more detail.  Volume II will be available in the spring of 2026.

## Level 4 -- Designing policies {#level-4}

<img src="https://castle.princeton.edu/wp-content/uploads/2023/03/Powell-RLSO-WIleyFrontCover-199x300.jpg" alt="Reinforcement Learning and Stochastic Optimization cover" width="199" align="right" />
Once we have our model, we then turn to the challenge of making decisions, which are made with methods known as "policies."  There are four classes of policies, where the fourth class involves creating an approximate model of the future (possibly deterministic, but not necessarily), which we solve to make a decision now.  The classes of policies range in complexity, but there is a tradeoff: the simpler the policy, the more it depends on tunable parameters (and tuning is hard!).  

The best coverage of the four classes of policies (as of this writing) is the book [*Reinforcement Learning and Stochastic Optimization: A unified framework for Sequential Decisions. *The webpage for the book is here. ](https://tinyurl.com/RLandSO/) A summary of the four classes is contained in Chapter 11 (which can be downloaded from the link above).  Chapters 12 through 19 are then an in-depth tour of the four classes:

1.  Policy function approximations (PFAs) -- These are analytical functions that compute the decision directly from the information in the state variable.  It is the only one of the four classes that do not involve an embedded optimization problem. PFAs include *any* function used in machine learning.
2.  Cost function approximations (CFAs) -- These come in two broad flavors:
    a.  CFAs for discrete actions -- This covers the most common form of decision problem where we have to choose the best from a set of choices with uncertain outcomes (we cover this under the "Optimal Learning" heading below).  CFAs typically consist of computing an index for each choice (which involves one or more tunable parameters), and then selecting the choice with the highest index.
    b.  CFAs for vector-valued actions -- Here, the CFA is typically a linear, nonlinear, or integer program, possibly of very large size.  The optimization model can be parameterized to improve its performance over time.
3.  Value function approximations (VFAs)- This is where we depend on Bellman's equation to design policies that approximate the impact of a decision now on the future.
4.  Direct lookahead approximations (DLAs) -- This covers policies where we optimize into the future to make a decision now.  This canc be divided into two important classes:
    a.  Deterministic lookaheads -- As with CFAs (that do not plan into the future), deterministic lookaheads can be parameterized to improve its performance over time.
    b.  Stochastic lookaheads -- The most common form  of stochastic lookahead is a decision tree, but there is a wide range of methods that fall under this category, including using an approximate model that still has to be optimized to determine the best decision now.  

 

<img src="https://castle.princeton.edu/wp-content/uploads/2026/02/Bridging-Vol-III-front-cover-200x300.jpg" alt="Bridging Decision Problems Vol III cover" width="200" align="right" />
An updated presentation of the four classes of policies will be given in Volume III of the monograph series "Bridging Decision Problems", which is called "Designing Policies." Unlike the RLSO book, which provides a tour through the four classes in order, "Designing Policies" is going to present them organized from the most useful to least useful, which requires separating the four class, direct lookahead approximations, into two subclasses: deterministic lookaheads and stochastic lookaheads.  Then, stochastic lookaheads are divided into presentations of discrete actions and vector-valued actions.  

Volume III should be available late in 2026. Until this time, please use Chapter 11 of RLSO. 

## Level 5 -- Multiagent systems {#level-5}

On the planning horizon is material for multiagent systems.  The study of multiagent systems builds on the framework for single-agent systems established above.  It starts by applying the universal modeling framework for each agent, but this opens the door to much richer behaviors.  The technical training is the same as Levels 3 and 4.  However, the modeling of interagent behavior and beliefs is considerably more subtle than is required in a single agent model (which describes the vast majority of implementations of optimization models).  

At the moment the only material we have for multiagent systems is Chapter 20 in *[Reinforcement Learning and Stochastic Optimization](https://tinyurl.com/RLSOchapter20/). *

Levels 3, 4 and 5 are for students with strong math and programming skills which are typically found in computer science, operations research, applied math, and electrical engineering.

## Teaching sequential decision analytics (introductory) {#teaching-sda-intro}

**Description:** This course was taught at Princeton to undergraduates in operations research.  It introduces the general field of sequential decision problems, using a teach-by-example style.  The course follows a downloadable book (see below) that provides the general framework for sequential decision problems, followed by a series of examples that are all modeled using the same style.  The examples were chosen to illustrate the four classes of policies, as well as other issues such as modeling uncertainty.

This course will not provide the comprehensive overview of methodology provided by the graduate course.  It is focused on teaching students how to think clearly about sequential decision problems using a powerful, universal modeling framework.  All of this is done through a series of carefully chosen examples designed to illustrate creating and solving models.  

**Audience: **The course was originally written for undergraduates in Operations Research and Financial Engineering at Princeton.  The only mathematical prerequisite is a course in probability and statistics.  One chapter (on blood management) uses linear programming, but the material can be covered without prior knowledge of linear programming.

**Notes:** It is extremely easy to create new lectures built around different applications.  On two occasions I invited students doing senior thesis research with me to help me run a lecture, where they would provide the answers to questions needed to fill in the five elements of the modeling framework.  Students best understand material that is centered on applications they are familiar with, and this is where the material can be easily customized to new problem settings.

**Readings:**

This course is taught from the downloadable book: *[Sequential Decision Analytics and Modeling](https://tinyurl.com/sdamodeling).*

**Syllabus:**

[Download syllabus here.](https://castle.princeton.edu/wp-content/uploads/2023/04/ORF-411-2018-syllabus.pdf)

**Programming:** There are exercises at the end of each chapter.  Most chapters are accompanied by a python module that can be found at [https://tinyurl.com/sdagithub/](https://tinyurl.com/sdagithub).  Often the exercises can be completed without touching the code, but the software was designed to allow students to modify the logic.  I suggest designing questions that fit the programming skills of the audience.

**Lectures:** 

Below are the lectures from the course I taught Fall, 2018.  Each lecture is given in pdf and powerpoint formats.

**Lecture slides:**

First half of course [(pdf)](https://castle.princeton.edu/wp-content/uploads/2019/03/ORF-411-lecture-notes-Fall-2018-First-half.pdf).  Second half of course [(pdf)](https://castle.princeton.edu/wp-content/uploads/2019/03/ORF-411-lecture-notes-Fall-2018-Second-half.pdf)

Individual lectures (powerpoint format):

- Lecture 1 -- Introduction, applications, modeling ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-1-Introduction-applications-modeling-frameworks.pptx))
- Lecture 2 -- Adaptive market planning ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-2-Adaptive-market-planning.pptx))
- Lecture 3 -- Machine learning ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-3-Machine-learning.pptx))
- Lecture 4 -- Learning diabetes medications ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-4-Learning-diabetes-medications.pptx))
- Lecture 5 -- Learning policies ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-5-Learning-policies.pptx))
- Lecture 6 -- Stochastic shortest paths I ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-6-Stochastic-shortest-paths-I.pptx))
- Lecture 7 -- Stochastic shortest paths II ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-7-Stochastic-shortest-paths-II.pptx))
- Lecture 8 -- Designing policies ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-8-Dynamic-shortest-paths.pptx))
- Lecture 9 -- Energy storage I ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-9-Designing-policies.pptx))
- Lecture 10 -- Energy storage II ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-10-Energy-storage-I.pptx))
- Lecture 11 -- Energy storage III ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-11-Energy-storage-II.pptx))
- Lecture 12 -- Uncertainty modeling ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-12-Energy-storage-III.pptx))
- Lecture 13 -- Uncertainty modeling ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-13-Uncertainty-modeling.pptx))
- Lecture 14 -- The beer game I -- Introduction ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-14-The-beer-game-I.pptx))
- Lecture 15  -- The beer game II ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-15-The-beer-game-II.pptx), [spreadsheet](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-15-Princeton-beer-game-spreadsheet.xlsx))
- Lecture 16 -- The beer game III -- Discussion ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-16-The-beer-game-III-Discussion.pptx))
- Lecture 17 -- The blood management problem ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-17-The-blood-management-problem.pptx))
- Lecture 18 -- Hotel revenue management ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-18-Hotel-revenue-management.pptx))
- Lecture 19 -- Class decision problem -- Booking flights ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-19-Student-decision-problem-Booking-a-flight.pptx))
- Lecture 20 -- Clinical drug trials ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-20-Clinical-trials.pptx))
- Lecture 21 -- Student decision problems -- Rowing strategies, twitter trading ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-21-Student-decision-problems-Rowing-twitter-trading.pptx))
- Lecture 22 -- Summary lecture ([powerpoint](https://castle.princeton.edu/wp-content/uploads/2020/03/ORF-411-Lecture-22-Summary-lecture.pptx))

## Teaching *Reinforcement Learning and Stochastic Optimization* (advanced) {#teaching-rlso}

<img src="https://castle.princeton.edu/wp-content/uploads/2023/03/Powell-RLSO-WIleyFrontCover-199x300.jpg" alt="Reinforcement Learning and Stochastic Optimization cover" width="199" align="right" />
Given the lack of existing courses that use my new book, *Reinforcement Learning and Stochastic Optimization,* I recommend setting up a weekly seminar where graduate students or professionals teach it to themselves.  This course requires strong analytical skills, and is appropriate for people who are interested in developing models and algorithms for real applications.

Below is a sketch of what I recommend could be covered each week.

- Week 1 -- Discuss different settings in which sequential decisions arise that are familiar to the group.  Discuss: decisions, metrics and exogenous information (that you learn/observe after making a decision).  Then introduce state variables, which is all the information you need to compute your metrics, make your decision (which can reflect constraints as well as any other information needed in a policy that has not yet been designed), and model the evolution of the state variables.  Note that the design of state variables is iterative -- it evolves as you model the system.  You might jump forward to my section 9.9 for an illustration using energy storage.  Mention the four classes of policies that you will return to repeatedly.
- Week 2 -- Assign as outside reading to skim section 2.1 that covers 15 different classes of problems.  Discuss in class any that might be of special interest to the class, but otherwise, I would not use class time on this.  Use week 2 to cover key elements of Chapter 3 -- Online learning, which is a short course in machine learning.  I suggest covering lookup tables (frequentist and Bayesian), correlated beliefs, a brief discussion of hierarchical models, then linear models, and finally sampled beliefs for nonlinear models.  You will probably also want to touch on neural networks.
- Week 3 -- Cover chapter 4, including section 4.2 (so-called stochastic models that only need deterministic methods), section 4.3 (sampled belief models -- simple idea, but this is very important), and then adaptive learning in section 4.4, which is the focus of the rest of the book.
- Week 4 -- Chapters 5 and 6 -- Derivative-based stochastic search.  Cover the basic idea of a stochastic gradient algorithm, and illustrate how a stochastic gradient may be computed (e.g. for the simple newsvendor problem).  Mention that we can use numerical derivatives (I would introduce SPSA).  Then introduce the need for the stepsize, after which I would jump to chapter 6 (on stepsizes).  Introduce basic deterministic stepsizes and one or two stochastic stepsize rules.  I would not go through the optimal stepsize rules -- it is just important to know this material is there.
- Week 5 -- Chapter 7 -- Derivative-free stochastic search.  This is a big chapter.  You need to introduce what it means to do derivative-free stochastic search, and touch on the concept of cumulative and final reward objectives.  Now introduce the four classes of policies again.  You will find it easiest to illustrate the PFA, CFA and possibly some form of DLA, such as the knowledge gradient.  You should introduce the concept of the multiarmed bandit problem.  I would skip section 7.6 on VFA-based policies, but note that this section introduces Gittins indices, which was the inspiration for the UCB policies (section 7.5); UCB policies are very popular in the tech sector for choosing which products to advertise to maximize ad clicks.  The knowledge gradient (section 7.7.2) captures the value of the information from an experiment. This is useful for expensive experiments and small budgets.  You may find you need two weeks for Chapter 7.
- Week 6 -- The class should skim chapter 8 (a series of examples) before class.  Then use this class for chapter 9, my big modeling chapter.  The five elements of the modeling framework are covered in sections 9.4-9.8.  Section 9.1 starts with a simple inventory problem.  Section 9.2 provides guidelines for mathematical notation which is useful for more complex problems, and 9.3 describes how to properly model time in the presence of sequential information processes. Section 9.9 illustrates the modeling framework for an energy storage problem, but I would stop here.
- Week 7 -- Chapter 10 focuses on modeling uncertainty.  This is where it would help if the students pick a problem on their own, and then review the 12 classes of uncertainties in section 10.1.  Then jump to the COVID example in section 10.2.  The rest of the chapter addresses the challenges of modeling uncertainty and the technique of Monte Carlo simulation.  This is important, but students may have prior background in this.
- Week 8 -- Chapter 11 is a major chapter -- this is where I review the four classes of policies in more depth, and then cover how to choose from among the classes.  This discussion is important, but is highly problem dependent.  Be sure to touch on section 11.7 on hybrid policies, where I review six examples of policies that combine two or more of the four classes into a single policy.  It might help to pick a specific problem such as the energy storage problem in section 11.9, where we illustrate all four classes of policies, and then show that any of them (plus a hybrid) can work best depending on the data.
- Week 9 -- Chapter 12 -- Here we introduce the simplest policies, PFAs, and discuss parameter tuning.  Here we are just using the methods of chapters 5 and 7, but the review is useful, since it is done in the context of parameter tuning.  Parameter tuning ends up being a recurring problem, since you are almost always introducing some form of approximation in any of the four classes of policies, and approximations tend to lead to tunable parameters.
- Week 10  -- Chapter 13 -- This is the first chapter dedicated to the idea of parameterizing deterministic optimization models.  This is an important class of policies since it is widely used in practice, but largely ignored by the academic literature.  See the energy storage example with time-dependent demands and rolling forecasts.  If anyone is looking for a good area of research, there are incredible opportunities, partly because it is such a useful strategy, but also because there are unresolved methodological issues.
- Weeks 11-12 -- There are five chapters on value function approximations, often equated (incorrectly) with "reinforcement learning."  You could easily spend half of a real course (meeting twice each week) on this material.  I suggest:
  - Cover equation 14.2 in chapter 14, which is basic backward dynamic programming.  Be sure to introduce the one-step transition matrix, and note that it is rarely computable.  Note that if we could compute one-step transition matrices, we could solve every sequential decision problem with equation 14.2 (I am not a big fan of dynamic programming for steady state problems -- in my entire career, I have never encountered a real application that was properly modeled as a steady state problem).
  - Then jump to chapter 15 (backward ADP) and cover section 15.1, which is how to compute equation 14.2 approximately.  
  - Now jump to section 15.3.1 which introduces the idea of using linear models for value function approximations.  Mention that you could use a deep neural network here, but it would require a large sample.  Be sure to take a quick look at the experimental work in section 15.4.  There is not much theory supporting backward ADP, but so far it has worked in every problem I have tried!
  - Next jump to sections 16.1 and 16.2 which describes how to fit a VFA using a fixed policy.
  - Then jump to sections 17.1, 17,2 (skim 17.3), 17.4, and 17.5.  Section 17.6 provides two examples that students might find useful.
  - Chapter 18 is advanced material specifically for more complex resource allocation problems.  The interest in this material is very dependent on the makeup of the class.  This material could easily require an entire session.
- Week 13 -- Chapter 19 covers direct lookahead policies.  This chapter is divided into three parts.  Sections 19.1 through 19.5 provides background material which should be skimmed.  Section 19.6 introduces deterministic lookaheads, including parameterized deterministic lookaheads (we first saw this in the energy storage problem in chapter 13).  Then, I would cover section 19.7, which introduces stochastic lookahead models, and discusses each of the four classes of policies to be used in the stochastic lookahead.  The remainder of the chapter covers Monte Carlo tree search (for problems with discrete decisions) and stochastic programming (for problems with vector-valued decisions).  This is specialized material that depends on the background and interests of the class.

There are entire books written on specific strategies for solving stochastic lookaheads within a DLA policy.  We effectively cover these in just a few sections by standing on the shoulders of all the other chapters.

- Week 14 -- Chapter 20 on Multiagent systems -- While the interest in this material depends on the interests of the students, there is some very important material in this chapter.  I recommend covering sections 20.1 and 20.2.  Section 20.3 on POMDPs is advanced material, which points out the limitations of the very substantial literature on POMDPs, but again, the interest in this material depends on the makeup of the class.  Our position is that the two-agent model (environment plus controller) should be used to model problems where we cannot observe the environment perfectly.  Sections 20.4, 20.5 and 20.6 are on more specialized topics that depend on the interests of the class.

## Optimal/active learning (or "Intelligent trial and error") {#optimal-learning}

A special but important class of sequential decision problems involves searching for the best of a set of choices, where the value of each choice is uncertain, as illustrated in the diagram below.

![](https://castle.princeton.edu/wp-content/uploads/2026/01/Discrete-choices-uncertainty-1024x438.jpg)

I refer to pure versions of this problem under the umbrella of *optimal learning.* Optimal learning is a field with many names, including "active learning," "ranking and selection," and "multiarmed bandit problems," but more general names are "derivative-free stochastic search" or "intelligent trial and error." Absolutely every human encounters this problem, probably daily.

There are two technical challenges that arise in optimal learning problems:

1.  Creating a belief model -- This is highly dependent on the context.  Choices may be categorical (drugs, suppliers, people, webpage designs) or continuous (price, dosage, concentration, quantity).  A choice might be scalar or a vector.  This creates a variety of ways to design belief models, using either frequentist or Bayesian methods (see chapter 3 of *Reinforcement Learning and Stochastic Optimization*, [downloadable from here](https://tinyurl.com/RLSOchapter3/)).
2.  Designing the policy for testing choices -- Also known as "acquisition functions," the policy determines how to determine which experiment(s) to run next.

All optimal learning problems are sequential decision problems, where it helps to identify the following major classes in terms of the state variable:

- Pure belief states B_t -- These are problems where the only connection between experiments is what we learn about the value of the choices.  What we have learned can be stored using frequentist statistics (think of averages and standard deviations), Bayesian methods (where beliefs are represented as discrete or continuous probability distributions), and even a mixture of the two.
- Belief states B_t with other information I_t about parameters and functions.  An example is where I_t contains the attributes of a patient, while B_t contains how we believe the patient will respond to a type of medical treatment. I_t is often referred to as *context. *We generally assume that I_t is not controlled by decisions (although there can be exceptions). 
- Belief states B_t with states about physical and/or financial resources, R_t, which are being controlled, such as the movements of a utility truck that is learning the state of a network after a storm.  There is very little literature on resource management problems with a belief state ([for an exception, look here.](https://tinyurl.com/icvrp/))

Separate from the variations above, optimal learning problems come in many flavors:

- The number of choices may be:
  - Two, as in continue/stop, hold/sell, A/B designs.
  - Several (10-100), as in choosing the best drug, the best person, the best location (see the list next to the diagram).
  - Many (1000s to tens of thousands, or more) -- This might be the best chemical, the best protein, the best of one or more discretized continuous parameters.
- Online or offline:
  - Online means learning in the field, where you have to live with the outcome of each experiment.  Examples include field testing of different products or prices, or testing drugs on a patient.
  - Offline means learning in a laboratory or test environment.  This would include computer simulations, testing materials in a lab, or using test markets.
- Noise level -- Experiments may have no noise, moderate levels of noise, or (and this is common) very high noise.
- Belief models -- We may have independent or correlated beliefs (for discrete/categorical choices), and any of a range of parametric models for continuous choices.
- Expense of running an experiment -- Experiments may take a fraction of a second (testing an online bid or the number of clicks that a particular ad receives), seconds, minutes, hours, days, weeks, even a year.  Granting someone a car loan may require several years to determine if the recipient defaults.
- The experimental budget (for offline learning) -- How many experiments can we run? Given a budget, we may face the decision of whether to even undertake a series of experiments.
- Serial or parallel experiments -- Testing treatments on a particular patient have to be done serially (one experiment at a time).  Experiments may also be done in parallel, such as testing different marketing strategies in different stores or running computer simulations in parallel.
- Immediate or lagged learning -- If we run an experiment, do we learn the results of the experiment right away (typical of laboratory experiments or computer simulations), or is there a lag (an extreme example is learning whether someone defaults on a loan, which might take years).  

Additional materials are provided below:

- [The webpage for my undergraduate course at Princeton, *Optimal Learning,* is available here.  It includes an (in progress) version of the 2nd edition of the book we used. ](/sda-website/optimallearningcourse/) The webpage includes:
  - The syllabus of the course.
  - A downloadable pdf for the (in progress) 2nd edition of my book with Ilya Ryzhov, *Optimal Learning*. 
  - A tutorial article set in the context of guiding laboratory experiments for materials scientists.
- The knowledge gradient, developed by Peter Frazier (now a professor at Cornell), is a powerful policy when experiments are expensive.  A major feature is its ability to handle a range of belief models, where the most useful captures correlations between the choices (this is almost universally true).  The KG for correlated beliefs won the "Test of Time" award from the Informs Journal  on Computing.  [Peter Frazier's software for the knowledge gradient is available on GitHub here.](https://tinyurl.com/GitHubKG/)
- Optimal learning problems can be solved with any of the four classes of policies.  These are all covered in Chapter 7 of my RLSO book.  [Chapter 7 can be downloaded here. ](https://tinyurl.com/RLSOchapter7/) The most useful are the CFA class (which includes popular methods in computer science such as upper confidence bounding and Thompson sampling) and the DLA class (which includes knowledge gradient and expected improvement).  

## Educational videos {#educational-videos}

- - "[Learning While Doing](https://tinyurl.com/LearningWhileDoing/)" is a short video that illustrates how we can adaptively learn the best values of tunable parameters, without building a computer model. This video uses the real-world setting of a mutual fund cash manager learning how to determine the best amount of cash to keep on hand for redemptions.  [Click here for the video.](https://tinyurl.com/LearningWhileDoing/)
  - In April, 2025 I gave a talk at Cornell's ORIE department on a fresh approach to teaching optimization. It covers the universal modeling framework and the four classes of policies. It introduces and illustrates the idea of using parameterized versions of deterministic optimization models. [I have broken this talk into four parts here](https://tinyurl.com/HowtoTeachOptimization/). 
  - In July, 2025, I gave a talk at Toyota's North American headquarters to 300 people within Toyota.  The talk spans my "7 levels of AI" through to problem framing, the universal modeling framework, the four classes of policies, and the implementation process.

 

I have given a series of videos where I illustrate the universal modeling framework in the context of different application domains:

- [SDA with finance applications](https://tinyurl.com/PowellvideoSDAfinance/) -- Talk given to the University of Twente's (Netherlands) Program in Digital Finance.
- [SDA with energy applications](https://tinyurl.com/PowellvideoSDAenergy) -- Talk given to the Data Mining Society
- [SDA with health applications](https://tinyurl.com/PowellvideoSDAhealth/) -- Talk given for Anne Zander's Program for Sequential Decision Problems at the University of Twente.
- [SDA with supply chain applications](https://tinyurl.com/PowellvideoSDASCMRutgers/) (talk given at Rutgers supply chain analytics conference, 2024)
{% endraw %}
