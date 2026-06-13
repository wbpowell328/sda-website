---
layout: page
title: "The business case for optimal learning"
permalink: /optimal-learning-business-case/
date: 2026-06-12
---

{% raw %}
The most common decision problem that we all face involves finding the best of a discrete set of choices, where we do not know how well each choice will perform. We may be choosing among two web page designs, twenty suppliers, or ten thousand molecular compounds. We can learn which choice is best by trying them, but every experiment costs time and money, and we never have the budget to try everything.

<img src="/sda-website/assets/images/optimal-learning/choices-with-uncertainty.png" alt="Bar chart of seven choices (A through G) with uncertainty bars, alongside a list of example problem settings: type of drug, supplier, trading policy, product design, battery technology, price, web page design, product to advertise, location for a clinic, diameter of silicon wafer, financial trading policy, advertising channel, choice of manager" style="display: block; margin: 1rem auto; max-width: 80%; height: auto;" />

This page makes the business case for the science of solving these problems well — a field I call [optimal learning](/sda-website/optimal-learning/). The argument has three parts: these problems are everywhere; the money at stake is enormous; and the methods most organizations use today leave much of that money on the table.

- [Where these problems arise](#applications)
- [What they all have in common](#common-structure)
- [A second class: the optimization models that run industry](#optimization-models)
- [How large is the market?](#market-size)
- [Why the market is underserved](#underserved)
- [What serving this market looks like](#serving)

## Where these problems arise {#applications}

The list below is intended to convey breadth, not completeness. In every sector, the same problem appears over and over: a set of alternatives, uncertain performance, and a limited budget for learning which is best.

**Health and life sciences** — Choosing the best molecular compound from a library of thousands; choosing drug dosages and treatment plans; designing the sequence of experiments in a clinical program; selecting the best diagnostic protocol; choosing where to locate a clinic. Bringing a single new drug to market costs on the order of [$1 billion to $2.3 billion](https://www.biopharmadive.com/news/new-drug-cost-research-development-market-jama-study/573381/), and the majority of that money is spent running experiments — on compounds, doses, and patient populations — to find the best of a set of choices.

**E-commerce and digital business** — Choosing the best web page design (A/B testing is the two-choice special case); which product to display or recommend; which price to charge; which email subject line to send; which features to include in an app. These decisions are made millions of times per day, and small improvements compound at internet scale.

**Advertising and marketing** — Which product to advertise, which creative to run, which channel to use, which audience to target, and when. Global digital advertising spending alone is roughly [$750 billion per year](https://www.emarketer.com/content/worldwide-ad-spending-forecast-2025), and behind every ad placement is a best-of-N choice made under uncertainty.

**Manufacturing and materials** — Choosing the best battery chemistry or material formulation; setting process parameters such as temperatures, concentrations, and pressures; choosing the diameter of a silicon wafer; selecting machine settings; qualifying and choosing suppliers.

**Energy** — Choosing among storage technologies; siting wind, solar, and storage facilities; setting the parameters of policies for buying and selling energy in volatile markets.

**Finance** — Choosing the best trading policy and tuning its parameters; deciding how much cash a mutual fund should keep on hand; choosing among investment strategies; setting credit thresholds.

**Transportation, logistics and supply chains** — Choosing carriers and suppliers; choosing among network designs; tuning the parameters of dispatch, routing, and inventory policies.

**People and organizations** — Choosing a manager; choosing among job candidates; choosing which training program, sales strategy, or organizational design to adopt.

**Artificial intelligence and simulation** — Tuning the hyperparameters of machine learning models; calibrating simulators; choosing among model architectures; and most recently, optimizing the prompts given to large language models. AI does not compete with this problem class — it generates new instances of it.

## What they all have in common {#common-structure}

Every problem above has the same structure: a set of discrete alternatives, uncertain performance, the ability to learn by experimenting, and a budget. The problems differ along two especially important dimensions: whether experiments are inexpensive (fractions of a second to minutes) or expensive (an hour to a day, week or month), and whether we are learning offline (in a lab or simulator, where all that matters is the final design) or online (in the field, where we have to live with the results while we are learning). Crossing these two dimensions produces four important variations of the problem class:

<img src="/sda-website/assets/images/optimal-learning/online-vs-offline-matrix.png" alt="A 2x2 matrix crossing offline vs. online learning with inexpensive vs. expensive experiments. Offline+inexpensive: optimizing computer games, tuning trading policies. Online+inexpensive: bidding for ad-clicks, ad-click maximization, recommender systems. Offline+expensive: laboratory experimentation, optimizing materials, tuning expensive simulators. Online+expensive: tuning industrial processes, finding the best price, finding the best drug. Time scales range from microseconds (top) to a month (bottom)." style="display: block; margin: 1rem auto; max-width: 85%; height: auto;" />

This matrix is worth reading as a market segmentation. Each quadrant is a distinct market segment, with its own customers, economics, and tooling: the inexpensive/online quadrant is the world of ad-clicks and recommender systems; the expensive/offline quadrant is the world of laboratories, materials, and industrial simulators; the expensive/online quadrant is the world of tuning live industrial processes, prices, and patient treatments, where every experiment carries real consequences.

And even this matrix understates the variety, because it ignores the dimension of whether there are physical resources that have to be managed alongside the learning — where the state of our equipment, inventory, or fleet affects which experiments we can even run. These mixed resource-and-learning problems are common in practice and almost untouched in the literature.

Because the underlying structure is the same across all of these settings, the same mathematics serves all of them. This is what makes optimal learning a *horizontal* technology, like spreadsheets or machine learning: the market is not one industry, but a recurring decision type inside every industry.

## A second class: the optimization models that run industry {#optimization-models}

Everything above involves choosing from a set of discrete alternatives. There is an entire class of decision problems that looks completely different: the high-dimensional planning and scheduling problems that are formulated as linear, nonlinear or integer programs and solved with commercial solvers. These models plan airline schedules, route fleets of trucks, plan production and inventories across supply chains, commit power generators for tomorrow's electricity grid, and schedule workforces — decisions involving thousands to millions of variables, far beyond any enumerable set of choices.

These optimization models are, without exception, deterministic models of the real world. The plan that comes out of the solver is optimal for a world where demands are known, travel times are exact, machines never fail and prices hold still — and then the plan meets reality. A simple and remarkably practical way of handling this uncertainty is to introduce tunable parameters that improve the robustness of the solution in real-world settings: safety stocks, schedule slack, reserve capacity, or replacing a point forecast with (say) an 80th-percentile forecast. The deterministic model stays — the solver technology is mature and trusted — while the parameters absorb the uncertainty. (These parameterized deterministic models are what I call [cost function approximations](/sda-website/cost-function-approximations/); they are widely used in industry, but almost always in an ad hoc way.)

The catch is that someone has to tune the parameters — and tuning is precisely the optimal learning problem described above. Each candidate setting of the parameters is a choice, its performance is uncertain, and every evaluation is an experiment. The parameters can be tuned in a simulator, but realistic simulators of a supply chain or a power grid are hard and expensive to build, and most companies do not have one. The much larger market is tuning in the field — a process I call ["Learning While Doing"](https://tinyurl.com/LearningWhileDoing/) — where the parameters are adjusted as the business operates. Field experiments are slow (a week or a month per observation), noisy, and we have to live with the results while we learn: this is the expensive/online quadrant of the matrix above, in its purest form.

The market this opens is easy to bound from below. Commercial optimization software is itself a [roughly $2 billion-per-year market](https://datahorizzonresearch.com/global-mathematical-optimization-software-market-49113) — and as with A/B testing, the software is just the visible tip. Every one of the thousands of deployed optimization models faces uncertainty that its mathematics ignores; every one of them has parameters that someone is tuning today by judgment and habit; and the decisions those models control — airline fleets, supply chains, power grids — are measured in the hundreds of billions of dollars. Optimal learning is the missing discipline for tuning them.

## How large is the market? {#market-size}

No analyst publishes a market figure for "best-of-N decisions under uncertainty," because the spending is buried inside R&D budgets, advertising budgets, and operations. But we can anchor the size from public numbers:

- **Global R&D spending was approaching [$2.9 trillion in 2024](https://www.wipo.int/en/web/global-innovation-index/w/blogs/2024/end-of-year-edition).** Virtually all R&D is sequential experimentation: trying alternatives, observing results, and deciding what to try next. Optimal learning is, quite literally, the science of how to spend this money efficiently. If better experimental sequencing saved even one percent of this spending, that would be worth roughly $29 billion per year.

- **Drug development concentrates the stakes.** At [$1 billion to $2.3 billion per approved drug](https://www.genengnews.com/gen-edge/the-unbearable-cost-of-drug-development-deloitte-report-shows-15-jump-in-rd-to-2-3-billion/), every experiment avoided is money saved, and every month saved in finding the best compound or dose accelerates revenue that can run into millions of dollars per day. Methods that exploit correlated beliefs can identify a nearly-best compound from 10,000 candidates in around 50 experiments — this is the difference between a feasible program and an impossible one.

- **Digital advertising is about [$750 billion per year](https://www.emarketer.com/content/worldwide-ad-spending-forecast-2025)** and every impression served involves choosing the best of a set of ads or products under uncertainty. The major platforms already embed simple learning policies (variants of upper confidence bounding) — proof that this mathematics runs at trillion-decision scale, profitably.

- **The A/B testing software market — about [$1.3 billion in 2025 and growing at double-digit rates](https://www.researchandmarkets.com/report/a-b-testing-software)** — is the part of this market that has already been productized. It is worth pausing on what A/B testing is: the *simplest possible case* of optimal learning — two choices, cheap online experiments, no prior knowledge, no correlated beliefs. A billion-dollar software category has been built on the easiest corner of the problem class.

The pattern across these anchors: where experiments are cheap and fast (web pages, ads), the methods have been commercialized and the market is visible. Where experiments are expensive and slow (drugs, materials, energy systems, field operations) — which is where each individual decision is worth the most — the market is largely untouched.

## Why the market is underserved {#underserved}

Three reasons.

**The field is fragmented.** This problem class has been studied under at least seven names — multi-armed bandits, derivative-free stochastic search, Bayesian optimization, design of experiments, ranking and selection, active learning — each in a different academic community with its own language ([see the communities](/sda-website/optimal-learning/#communities)). A lab director with an expensive-experiment problem has no obvious place to look, and would find each community solving only a slice of her problem.

**Existing tools serve the easy special cases.** Look back at the four-quadrant matrix above: commercial tooling is concentrated almost entirely in the inexpensive-experiments row. A/B testing platforms handle two cheap choices. Ad-tech bandits handle high-frequency, low-stakes choices. Bayesian optimization libraries handle continuous parameters in computer experiments. The expensive-experiments row — small budgets, prior knowledge, correlated beliefs, and settings that mix learning with the management of physical resources — is where each individual decision is worth the most, and it is barely served at all.

**So organizations default to naive strategies.** Test the option the boss likes; spread the budget evenly across alternatives; test the current best repeatedly. These strategies feel reasonable and waste large fractions of experimental budgets, invisibly, because no one computes what a well-designed learning policy would have found with the same budget.

## What serving this market looks like {#serving}

The technology exists. Policies such as the [knowledge gradient](/sda-website/optimal-learning/#kg-offline) — which maximizes the value of information from each experiment, handles correlated beliefs, exploits prior knowledge, and has no tunable parameters — were developed precisely for the expensive-experiment, small-budget settings that current tools ignore ([the original research and software](/sda-website/knowledgegradient/)). What the market needs is the connective tissue:

- **Framing and education** — teaching organizations to recognize that they face a learning problem at all, and how to state it ([a universal modeling framework](/sda-website/universal-modeling-framework/) makes this teachable).
- **Software** — libraries and platforms that bring knowledge-gradient-class methods to lab scientists, simulation engineers, and operations planners, not just machine learning specialists.
- **Embedding** — building these policies into the tools organizations already use: laboratory information systems, simulation packages, pricing engines, and supply chain platforms.

The breadth documented on this page is the point: any technology that addresses a decision made daily in every industry — where the visible, easy corner of the market already supports a billion-dollar software category and the expensive corner spends trillions — is addressing a very large market indeed.

*Questions and comments are welcome at wbpowell328@gmail.com.*
{% endraw %}
