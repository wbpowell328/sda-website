---
layout: page
title: "Bridging Decision Problems"
permalink: /bridgingdecisionproblems/
date: 2026-06-04
---

{% raw %}
**Warren B. Powell**
Executive-in-Residence, Rutgers University
Chief Innovation Officer, Optimal Dynamics
Professor Emeritus, Princeton University

<img src="/sda-website/assets/images/bridging-decision-problems/vol-i-cover.jpg" alt="Cover of Bridging Decision Problems, Volume I — Framing the Problem, by Warren B. Powell, Kindle Direct Publishing, 2026" width="210" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />
*Bridging Decision Problems* is being planned as a series of monographs on the process of modeling decision problems and implementing the results. Unlike traditional presentations that start with a mathematical model, solve it, and then declare success, we are going to progress through the entire process:

1. Start with a raw problem that features decisions using a process we call "framing the problem."
2. Model the process using the "universal modeling framework" that can be applied to *any* decision problem.
3. Translate the model to computer code, both as a simulator (which has several applications) and a method for making decisions (called the *policy*).
4. Design the process for collecting the information needed to run the model.
5. Implement the decisions in the field and track performance.

Volume I addresses the first step, framing the problem, which involves answering a series of questions in English that form the basis of a mathematical model that can be implemented on the computer. This webpage is a very brief overview of the framing process. At the bottom is a link to a new book that describes this process in much more detail (but no math).

[Volume I is now available on Kindle](https://tinyurl.com/PowellFramingAmazon/), or [download the PDF](https://tinyurl.com/PowellFramingBook/).

<br clear="all" />

In our presentation, we always assume that the "problem" involves improving one or more performance metrics. We operate under the principle:

<img src="/sda-website/assets/images/bridging-decision-problems/run-a-better-anything.jpg" alt="If you want to run a better {anything} you have to make better decisions." style="display: block; margin: 1.5rem auto; max-width: 100%; height: auto;" />

This page is organized as follows:

- [**The list of lists for framing**](#lists-for-framing) — guides for identifying the key elements of a sequential decision problem.
- [**The six steps for solving decision problems**](#six-steps) — from problem narrative to field implementation.
- [**The three stages of automation**](#automation) — how computer assistance evolves from advisor to autonomous.
- [**The universal modeling framework**](#umf) — one framework for *any* sequential decision problem.
- [**Making decisions**](#making-decisions) — the four classes of policies.
- [**References**](#references) — books, slides, and webpages for going deeper.

## The list of lists for framing {#lists-for-framing}

The graphic below contains a series of lists that can serve as a guide when you are identifying the key elements of a sequential decision problem. It includes the following lists:

- Categories of metrics
- Types of decisions
- Classes of uncertainty
- Behaviors of uncertainty
- The four classes of policies
- The functions that depend on the state variable
- State variables based on knowledge

<img src="/sda-website/assets/images/bridging-decision-problems/lists-for-framing.jpg" alt="A poster-style graphic titled 'Lists for framing sequential decision problems,' organized into seven labeled boxes — categories of metrics, types of decisions, classes of uncertainty, behaviors of uncertainty, the four classes of policies, the functions that depend on the state variable, and state variables based on knowledge — each enumerating the items in that category" style="display: block; margin: 1.5rem auto; max-width: 100%; height: auto;" />

For a more detailed walk-through of the framing process itself, see the [Framing decision problems](/sda-website/framingproblems/) page.

## The six steps for solving decision problems {#six-steps}

The process of solving decision problems (and I mean *any* decision problem) can be envisioned in six stages comprised of:

1. **Summarizing the business problem** in the language of the problem domain.
2. **Framing the problem**, which means stating it in English, but using specific vocabulary that sets the stage for mathematical modeling, if required.
3. **Mathematical modeling** — this is done with the universal modeling framework (UMF), which can capture *any* sequential decision problem.
4. **Identify the information** needed to run the model, and create the processes to acquire it. This process is increasingly being assisted by LLMs.
5. **Computer implementation** — the UMF provides an explicit roadmap to computer implementation, which can be in a spreadsheet or sophisticated model.
6. **Implementing the decisions in the field**, which typically raises fresh issues. This may or may not involve implementing the software itself in the field. This process is also starting to be assisted by LLMs.

<img src="/sda-website/assets/images/bridging-decision-problems/six-steps-skill-cycle.jpg" alt="A circular skill-cycle diagram showing the six stages of solving a decision problem connected as a loop: business problem narrative, framing, mathematical modeling, information acquisition, computer implementation, and field implementation" style="display: block; margin: 1.5rem auto; max-width: 100%; height: auto;" />

We note that our guiding light (or "north star") is using a computer to make decisions to improve performance, even if we do not develop a mathematical model or implement it on the computer. Our experience is that this process brings clarity to complex problems, which may provide enough guidance to make a decision without formal analysis. However, if additional help is needed, we always retain the option of progressing to a computer model, whether it is a spreadsheet or more sophisticated software.

We recognize that computers can be used in a variety of ways:

- **Creating information so a human can make a decision** — the universal modeling framework helps to identify what information is needed.
- **Computer-assisted** — the computer recommends, human reviews.
- **Completely autonomous** — the computer makes the decision on its own.
- **Simulating decisions from the current state** — we use a computer to project the downstream effect of a decision now, simulating decisions that are needed in the future.
- **Strategic simulations** — here, we simulate a system over time, without needing to capture its current state. We use strategic simulators to help make design decisions.

## The three stages of automation {#automation}

The process of automating a decision process proceeds in three stages, as outlined below.

<img src="/sda-website/assets/images/bridging-decision-problems/three-stages-automation.jpg" alt="Diagram of the three stages of automating a decision process — moving from human-only decisions, through computer-assisted decisions where the computer recommends and the human reviews, to fully autonomous computer-driven decisions" style="display: block; margin: 1.5rem auto; max-width: 100%; height: auto;" />

## The universal modeling framework {#umf}

The information provided by the framing process is guided by the universal modeling framework. This general framework can be used to represent *any* sequential decision problem, including both single- and multi-agent applications. I like to present the universal modeling framework (for a single agent) using the slide:

<img src="/sda-website/assets/images/bridging-decision-problems/universal-modeling-framework.jpg" alt="A slide titled 'Universal Modeling Framework' showing the five elements of any sequential decision problem — state variables, decision variables, exogenous information, transition function, and objective function — arranged around a decision loop with arrows linking decisions to information to states over time" style="display: block; margin: 1.5rem auto; max-width: 100%; height: auto;" />

Any problem modeled using the universal modeling framework (UMF) can be directly implemented on a computer. This does not mean that all decision problems benefit from being implemented on the computer. However, all decision problems benefit from being approached with this structure. At a minimum, it will help you *think* about any decision problem. If it is felt that a computer-assisted solution would add value, then there is an immediate path to computer implementation.

## Making decisions {#making-decisions}

There are decades of research and countless books and papers that address the problem of how to make decisions in the presence of uncertainty. Since 2010 I have been refining the idea that *any* method for making decisions falls within four classes of policies divided into two broad strategies:

**Strategy I: Policy search** — these are functions that have to be tuned to work well over time.

- **Policy function approximations (PFAs)** — analytical functions, from order-up-to inventory policies, linear or nonlinear functions, even deep neural networks.
- **Cost function approximations (CFAs)** — parameterized versions of typically deterministic approximations that are parameterized to work well over time, under uncertainty.

**Strategy II: Lookahead policies** — these policies approximate the impact of decisions now on the future.

- **Policies based on value function approximations (VFAs)** — this is where solutions based on Bellman's equation are located.
- **Direct lookahead approximations (DLAs)** — these policies optimize into the future to make better decisions now. It is helpful to divide these into two classes: (a) deterministic lookahead (think of Google Maps), and (b) stochastic lookahead, which can come in a range of forms (see chapter 19 of [*Reinforcement Learning and Stochastic Optimization*](/sda-website/rlso/)).

A slightly longer description is provided [here](https://tinyurl.com/FourClassesofPolicies/). I recommend the video tutorial [here](https://tinyurl.com/sdafieldyoutube/). Note that three of the four classes of policies (CFAs, VFAs and DLAs) involve solving embedded optimization problems within the policies. These are usually (but not always) solved using deterministic methods.

## References {#references}

This new process of framing the problem is described in detail in a new monograph. The book is available for purchase on [Kindle](https://tinyurl.com/PowellFramingAmazon/), and the [PDF can be downloaded for free](https://tinyurl.com/PowellFramingBook/). For an earlier preview, the table of contents and preface are available:

- [*Framing Decision Problems: Bridging Problems and Models* — Volume I — TOC and Preface (August 18, 2025)](https://tinyurl.com/PowellBridgingBook)

[Please feel free to leave comments here.](https://tinyurl.com/PowellFramingComments/)

### Forthcoming volumes

- **Volume II: The Universal Modeling Framework** — this volume will show how to translate the framing information from Volume I into a very general modeling framework called the "universal modeling framework." A substitute that you can access now is the book *[Sequential Decision Analytics and Modeling](/sda-website/sdamodeling/)*.
- **Volume III: Designing Policies** — this volume will cover the four classes of policies in much more depth, show how to evaluate them using the universal framework, and finally how to tune them. A substitute that you can access now is Chapter 11 of [*Reinforcement Learning and Stochastic Optimization*](https://tinyurl.com/RLSOChapter11/).

### Potential future volumes (depending on what catches my interest)

- **Uncertainty Modeling** — controllable dynamic systems are governed by two flows of information: decisions and exogenous information. This volume addresses in much more depth how we think about and model exogenous information processes. A substitute for now is Chapter 10 of my advanced book, which can be downloaded [here](https://tinyurl.com/RLSOChapter10/).
- **Supply chain management** — there is so much interest in this problem class. It will provide an opportunity for me to dip my toe into these waters.
- **Navigating complex environments** — this is where I want to really develop my ideas for multi-agent decision-making.

### Other relevant books

- *[Sequential Decision Analytics and Modeling (2022)](/sda-website/sdamodeling/)* — this book uses a teach-by-example style. Each chapter (other than chapters 1 and 7) describes a different problem, which is then modeled using the UMF. The problems are chosen to illustrate each of the four classes of policies.
- *[Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions](/sda-website/rlso/)* (Wiley, 2022), 1,100 pages. This is an advanced, graduate-level book designed for people who want to develop models and algorithms for sequential decision problems.

### Webpages of possible interest

- ["The Road to Digital Automation at Toyota: Learning How to Be an Informed Consumer,"](https://tinyurl.com/PowellToyotaVideos/) Toyota's North American Headquarters, July 10, 2025. This is a presentation in five parts given to a broad audience at Toyota that contrasts LLMs with using computers to make decisions.
- [Webpage for sequential decision analytics](https://tinyurl.com/sdalinks/) — a page of resources covering an introduction to sequential decision problems, video introductions, downloadable books (introductory and advanced), an introduction to optimal learning, courses and teaching materials, educational web pages, and LinkedIn posts.
{% endraw %}
