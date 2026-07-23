---
layout: page
title: "Decisions, decisions"
permalink: /decisionsdecisions/
date: 2025-10-15 09:53:04
---

{% raw %}

Decisions are a fundamental human activity, studied and debated throughout our entire history, driven by our endless desire to improve.  As I like to say:  

<img src="/assets/images/whatisadecision/run-a-better-anything.jpg" alt="If you want to run a better supply chain, energy system, health system, business process, transportation system, ... anything — you have to make better decisions." style="display: block; margin: 1.5rem auto; max-width: 85%; height: auto;" />

After a career in traditional academic research on models and algorithms for making better decisions in various specialized settings, retirement has allowed me to think more deeply about this topic, and I have been struck by the open questions about decisions.  Specifically:

- [What is a decision?](#what-is-a-decision)
- [Types of decision settings (very important!)](#types-of-decision-settings)
- [From applications to decision types](#from-apps-to-types)
- [Why automate decisions?](#why-automate-decisions)
- [Some perspectives of decisions](#some-perspectives-of-decisions):
  - [Flavors of decisions](#flavors)
  - [Timing](#timing)
  - [Different words for "decision"](#different-words)
  - [Making a decision](#making-a-decision)
  - [Decisions vs. commitments](#decisions-vs-commitments)
- [History of defining decisions](#history-of-defining-decisions)
- [How do we make decisions?](#how-do-we-make-decisions)
- [The psychology of making decisions](#psychology)
- ["State variables" are fundamental in dynamic problems, but what is a state variable?](#state-variables)
- [What is the value of information?](#value-of-information)
- [The "great thinkers" in the history of decision-making.](#great-thinkers)

A goal of this page is making people more aware of when they are making decisions, since we frequently make decisions without realizing it. You cannot make a better decision until you recognize that you are making a decision.

## What is a decision? {#what-is-a-decision}

It is astonishing that such a fundamental activity of people lacks a broadly accepted definition.  As with many commonly used words, "decision" is used in different ways.  

1.  ***An endogenously controllable information class,*** or more simply, ***i**nformation** we control.* **This definition distinguishes between: a) What we know at a point in time (the state of knowledge); b) Information that changes the state of knowledge that we (as the controlling agent) control; c) Information that changes the state of knowledge that we do not control, which means it arrives from an exogenous source outside of our control. Information in (b) represents decisions.
2.  ***A choice from a set of alternatives.***** **The "decision" is the choice that is made (by some process) from a set of discrete alternatives, or within a feasible region such as $$Ax = b, x \geq 0$$ where $$x$$ is chosen to optimize some metric where $$x = (x_1, \ldots, x_K)$$.
3.  ***A single choice in a set of alternatives.*** "What decision was made" refers to the specific choice (the single element in a set of choices) as opposed to the entire set.
4.  ***A committed choice or action, separate from a plan that may or may not be implemented. ***The idea of distinguishing plans from commitments was introduced by the decision scientist Ron Howard in 1966 using the phrasing "*An irrevocable allocation of resources,"* to capture the commitment to implement a choice.  
5.  ***The outcome of a competition or judgment.*** For example, the winner of a sports contest, the result of an election, a judicial opinion.

A ***decision*** is distinct from the process of making a decision.  The decision may involve an explicit evaluation of all the possible choices, or it may be the output of a function or process that is designed to produce feasible decisions that perform well over time.

## Types of decision settings {#types-of-decision-settings}

Decisions arise in a variety of settings.  Communities that study the science of decisions (decision analysis, math programming, optimal control, stochastic search) are typically motivated by applications that feature different flavors of decisions, different ways that uncertainty may arise, and styles of performance metrics:

1.  **Physical and financial decisions** - These decisions arise in the management of physical and financial resources, spanning people, equipment, facilities, products, commodities, water, energy, in addition to cash, investments, loans, \...  Decisions include buying, selling, moving, and modifying resources. This class is the domain of operations research, engineering control, and finance; it draws heavily on tools such as linear, integer and nonlinear programming.  

2.  **Complex/strategic decisions** -These are decisions that may make multiple changes to a system (changing resources, parameters, beliefs), and which typically involve significant sources of uncertainty. These decisions are typically evaluated once, but the option of waiting and making the decision later may exist.  

3.  **Information acquisition/observation decisions** - These include decisions to acquire or observe information by running experiments in the lab, field, or with computer simulations that are conducted in a test environment (offline), or decisions to run and observe processes in the field using a "learning while doing" approach (online). Offline information acquisition can include laboratory experiments, simulations, internet searches, or hiring domain experts.  Online learning involves observing a process as it evolves, such as how a market responds to advertising or pricing, or how a patient responds to a treatment. These decisions are studied under names such as design of experiments (static or sequential), stochastic search, active (or optimal) learning, multiarmed bandits, and Bayesian optimization.

4.  **Information communication/sharing decisions -** These come in two forms:
    a.  Messaging - This reflects what we say in text, video and/or audio.  A modern example of messaging includes prompt optimization, but other examples are the design of ads, communications to a company or public broadcast, instructions to use a product, training given to employees, and instructions on how to use a product.
    b.  Channels and timing - This reflects the choice of channel (text/emails, publication (print or online), social media, or advertising channels) along with the timing and frequency.  

5.  **Performance metrics/objectives** - These might be revenues, costs, stockouts, improved health, portfolio returns, inventory turns, strength of material, or voter polls. These might be evaluated on average, or using some form of risk measure that captures uncertain events not represented by averages. Performance metrics are decisions when they are used to evaluate more primitive decisions (typically over time) by a higher process such as the stock price of a company (influenced by supply chain decisions), the spread of illnesses in a population (influenced by vaccination decisions), or whether a candidate wins an election (influenced by campaigning decisions).

6.  **Choosing functions** - Often overlooked as a decision, functions may be methods to make decisions (policies), optimization models, objective functions, models for forecasting or estimation, or transition functions (such as how disease spreads).  This category covers the choice of function, which means its structure.  

7.  **Setting parameters** - Functions are typically characterized by one or more parameters (typically continuous, but not always) that can be tuned to improve predictive accuracy (when fitting statistical models) or optimized to improve performance (when tuning a policy for making decisions). Parameters may be associated with a function; they can be the weight on a performance metric, or they could be a target (or limit) for a performance metric. 

8.  **Labeling/identification/estimation -** We may be asked to name a disease, identify a plant, or estimate tomorrow's load on the power grid.

9.  **Features and behaviors** - How to design a product, what features a software package should have, what services should be provided to a customer, and whether or not to be polite. This might also include a student's choice of major, which determines the skills they will graduate with.

10. **Deciding what to decide** - In most real applications, the number of potential decisions (that is, anywhere we face a choice) can be quite large.  We have to prioritize which decisions have the greatest economic value to justify doing any formal analysis.  I describe a simple approach for "deciding what to decide" in [part 2 of the framing tutorial here](https://tinyurl.com/PowellFramingVideo/).   

"Decisions" arise at every level of the decision-making process.  Once we have chosen what decision we want to make (possibly a type 1 or 2 decision), we have to decide which policy to use for making decisions (a type 6 decision).  Then, the policies are typically characterized by parameters that have to be optimized (a type 7 decision), which requires choosing a search algorithm (another type 6 decision). If we use a derivative-free stochastic search method, this involves type 3 decisions to guide the search. If there is information we do not know, we might estimate it using machine learning, which requires making type 8 decisions, which may also involve type 6 decisions (the type of model) and type 7 decisions (to learn the best parameters). 

There is an inevitable overlap between the different types of decisions.  We may decide to send a truck from one location to another (a physical decision, type 1), which gives us an observation of the travel time (an information decision, type 3), which we use to update our estimate of travel times.  

If you think of a type of decision that does not seem to fit in these types, email me at wbpowell328@gmail.com.

## From applications to decision types {#from-apps-to-types}

The list of types of decisions above, while not directly involving any analytics, are analytically motivated, and are unlikely to be immediately obvious from domain experts.

In this section, we illustrate how we envision applying the list of decision types by creating a matrix, where each row is an application setting, followed by ten columns, one for each decision type. In the cell corresponding to the application setting and decision type, we list some examples of decisions that fall in the appropriate decision type which are relevant to the application setting:

<div style="overflow-x: auto; margin: 1rem -2rem 1rem -1.5rem;">
<table class="apps-vs-types">
  <thead>
    <tr>
      <th rowspan="2" style="min-width: 8rem;">Application domain</th>
      <th colspan="10" style="text-align: center;">Decision types</th>
    </tr>
    <tr>
      <th>Type 1<br>Resource allocation</th>
      <th>Type 2<br>Strategic decisions</th>
      <th>Type 3<br>Information collection</th>
      <th>Type 4<br>Information sharing / dissemination</th>
      <th>Type 5<br>Performance metrics/objectives</th>
      <th>Type 6<br>Functions</th>
      <th>Type 7<br>Parameters</th>
      <th>Type 8<br>Labeling / identification / estimation</th>
      <th>Type 9<br>Features / behaviors</th>
      <th>Type 10<br>Deciding what to decide</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Corporate finance</th>
      <td>Investment in facilities, bonds, loans</td>
      <td>Purchasing new companies</td>
      <td>New product launches</td>
      <td>Marketing strategies, social media</td>
      <td>Stock price, earnings per share</td>
      <td>Contract terms, uncertainty modeling, risk evaluation</td>
      <td>Pricing, risk tolerance</td>
      <td>Estimating future interest rates, likelihood of policy changes</td>
      <td>Product features, contract terms</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Financial management</th>
      <td>Portfolio optimization</td>
      <td>Major real estate investment, major private equity investment</td>
      <td>Hiring a new portfolio manager, researching new technology</td>
      <td>Selling to investors, managing signals sent to market</td>
      <td>Portfolio return, risk of loss</td>
      <td>Choice of portfolio optimization model</td>
      <td>Tuning parameters of portfolio model</td>
      <td>Estimating future returns, change in price of oil</td>
      <td>Mix of financial investments</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Drug development</th>
      <td>Which drugs to research / send to clinical trials</td>
      <td>Launching new research initiative, launching drug into new market</td>
      <td>Laboratory experiments, Phase I trial, market surveys</td>
      <td>Communication with physicians, marketing to public</td>
      <td>Drug performance, cost</td>
      <td>Design of drug portfolio optimization model</td>
      <td>Parameters of portfolio optimization model; drug prices</td>
      <td>Estimating future drug efficacy, competitive response</td>
      <td>Drug characteristics; pill vs. injection; frequency</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Medical decision making</th>
      <td>Spending limits on drugs</td>
      <td>Amputation? Transplant? Chemo vs. radiation? Abortion?</td>
      <td>What tests to run, trying a treatment or medication</td>
      <td>What to share with patient; patient instructions</td>
      <td>Treatment performance, side effects</td>
      <td>Policy to use for testing treatments</td>
      <td>Dosages, policy parameters</td>
      <td>Diagnosing a patient</td>
      <td>Features of drug / side effects</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Public health</th>
      <td>Funding, vaccine allocations</td>
      <td>Requiring COVID masks, launching insurance program</td>
      <td>Testing for COVID, sampling sewage, testing for deer ticks</td>
      <td>Public information, instructions to physicians, drug labels</td>
      <td>Adoption rate, reduced disease, cost</td>
      <td>Utility function for allocating vaccines, model of patient response to dosage</td>
      <td>Age limits for vaccination</td>
      <td>Predicting next year's flu</td>
      <td>Behavioral changes required of patient (diet, exercise, medications)</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Supply chain management</th>
      <td>Allocating inventories, manufacturing capacity</td>
      <td>Asian vs. domestic suppliers; materials required by product design</td>
      <td>Hiring product-tracking firm, inventory-sensing technology</td>
      <td>Web interface for database, product advertising</td>
      <td>Inventory turns, stockouts, cost</td>
      <td>Forecasting methods, inventory replenishment policy</td>
      <td>Forecasting parameters, inventory policy parameters</td>
      <td>Economic forecasting, competitor behavior</td>
      <td>Purchasing contracts, labor contracts</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Truckload fleet management</th>
      <td>Assigning drivers to loads</td>
      <td>Purchasing fleet of flatbeds</td>
      <td>Testing out new traffic lanes</td>
      <td>Load solicitation queries; driver ads</td>
      <td>Revenue per week, missed loads, empty miles</td>
      <td>Load acceptance policies</td>
      <td>Pricing, fleet size</td>
      <td>Estimating future spot prices</td>
      <td>Contract terms with shippers</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Power grid management</th>
      <td>Generation capacity, which generators to run</td>
      <td>Major investments in generation and transmission capacity</td>
      <td>Testing new storage technologies</td>
      <td>Marketing campaigns to encourage conservation</td>
      <td>Electricity cost, outages</td>
      <td>Design of unit commitment models</td>
      <td>Tuning limits on voltage fluctuations, parameters in unit commitment models</td>
      <td>Forecasting power demand tomorrow</td>
      <td>Terms of contracts for energy capacity markets</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Oil and gas extraction</th>
      <td>Which oil wells to dig; managing oil inventories</td>
      <td>Exploring a new field; testing new technology</td>
      <td>Purchasing geologic surveys; drilling test well</td>
      <td>Communicating new labor policies</td>
      <td>Production rates, empty wells, cost</td>
      <td>Creating drilling strategies for fracking</td>
      <td>Bid price for a field; minimum flow rate</td>
      <td>Estimating yield of an oil pocket</td>
      <td>Terms of leasing contracts</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>E-commerce</th>
      <td>Inventory planning</td>
      <td>Choosing suppliers, distribution strategy</td>
      <td>Choosing product to advertise</td>
      <td>Social media advertising</td>
      <td>Clicks, revenue, returns</td>
      <td>Design of policy for advertising product</td>
      <td>Parameters of ad-click bidding policy</td>
      <td>Forecasting product demands</td>
      <td>Delivery services; return handling</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Hotel management</th>
      <td>Number of rooms at different price points</td>
      <td>Launching new hotel chain</td>
      <td>Testing new services</td>
      <td>Marketing messages and channels</td>
      <td>Revenue, empty rooms</td>
      <td>Room contract terms; bidding policies for ads</td>
      <td>Room rates</td>
      <td>Estimating demand for special events</td>
      <td>Services with a room (e.g. breakfast)</td>
      <td>Deciding what to decide</td>
    </tr>
    <tr>
      <th>Presidential election</th>
      <td>Hiring state-level campaign staffs; candidate travel schedule</td>
      <td>Decision to run for office</td>
      <td>Running a poll</td>
      <td>Campaign ads (TV, social media, podcasts, local signs)</td>
      <td>Polling averages, expenditures, votes</td>
      <td>Contract terms with campaign advisers, marketing contracts</td>
      <td>Budgets (hiring, ads)</td>
      <td>Forecasting turnout, votes</td>
      <td>Campaign promises</td>
      <td>Deciding what to decide</td>
    </tr>
  </tbody>
</table>
</div>

<style>
.apps-vs-types { border-collapse: collapse; font-size: 0.72rem; line-height: 1.3; }
.apps-vs-types th, .apps-vs-types td { border: 1px solid #c9a86b; padding: 0.35rem 0.35rem; vertical-align: top; }
.apps-vs-types thead th { background: #ede0bd; color: #3d2914; font-weight: 600; }
.apps-vs-types tbody th { background: #faf5e6; color: #3d2914; text-align: left; font-weight: 600; white-space: nowrap; }
.apps-vs-types tbody tr:nth-child(even) td { background: #fbf9f4; }
</style>

The idea of the 10 types of decisions is to provide a guide to think outside the box of the most familiar decisions. In practice, you are not going to subject each of these decisions to formal analysis, which is why the tenth type, "Deciding what to decide," remains a completely subjective choice.

## Why automate decisions? {#why-automate-decisions}

To help with the task of "deciding what to decide" it is useful to think about why you want to use a computer to make decisions. Some reasons are:

1. To make better decisions than are being made now — this is often the first reason cited, but in practice it might be the least important.
2. To make decisions more quickly — there are many settings where decisions have to be made within a certain amount of time, which could be anything from 50 milliseconds in an e-commerce application, to several hours for scheduling power generators for tomorrow.
3. To remove the human from the decision-making process, which can be for several reasons:
   1. To adapt more quickly to changing conditions.
   2. Saving manpower expenses.
   3. Providing more uniform behavior when there is a team of people making the same decisions.
   4. To reduce the need for training as people turn over.
   5. As improvements are made, you just have to change an automated process once, whereas with people you need to retrain everyone.
4. Anticipating the impact of a decision now on the behavior of a system in the future. Simulating decisions in the future is very hard for people, and even imperfect planning in the future can improve planning now.
5. Simulating decisions can help with strategic planning.

## Some perspectives of decisions {#some-perspectives-of-decisions}

<a id="some-features-of-decisions"></a>

Here we provide some additional features of decisions:

- [Flavors of decision variables](#flavors).
- [Timing of when decisions are made and implemented](#timing).
- [Different words for "decision"](#different-words).
- [Making a decision](#making-a-decision).
- [Decisions vs. commitments](#decisions-vs-commitments).

### Flavors of decision variables {#flavors}

- **Binary** - We choose to hold an asset or sell it; we can make a purchase now or wait; we have to decide which of two webpage designs to use (known as A/B testing).
- **Discrete** - We have a set of three or more choices.  We may be choosing among 10 or 20 suppliers, 5,000 molecular compounds, or 1 million combinations of discretized parameters.
- **Continuous scalar** - This might describe a price, dosage, diameter or temperature.
- **Vectors**, where the elements may be continuous, binary or discrete.
- **Categorical**, where a choice is described by a vector of attributes $$a_1, \ldots, a_K$$.

### Timing {#timing}

- Whether a decision is made now (at time $$t$$) or planned for some time in the future.
- When it is implemented. We may order an aircraft to be delivered in 2 years, or we place an order from a distant supplier where it takes four months to arrive.
- Whether it is made just once (purchasing a company, designing a building), or repeated over time (ordering inventory, scheduling machines).
- Whether a decision is made at specified points in time, or triggered by exogenous events.

### Different words for "decision" {#different-words}

Given that decisions are a universal human activity, it should not be surprising that there are different terms with roughly the same meaning.  This is important when working with people to identify what decisions are being made.  The list below hints at the richness of this vocabulary (these terms are not equivalent - they can refer to any of the definitions above): 

- Action (widely used in Markov decision processes and reinforcement learning)
- Call, as in "make the call" (management, sports)
- Choice (popular in decision analysis)
- Control (engineering)
- Design (layouts, product features)
- Election (making a choice of political candidate)
- Intervention (medical)
- Move (games, business strategy)
- Option (financial options, what options do we have, menu options)
- Order (military,
- Pick (selecting an item)
- Preference
- Response (choice of message)
- Selection
- Task/job
- Trade (finance)
- Treatment (medical, decoration)
- Vote (expressing a choice of candidates)

### Making a decision {#making-a-decision}

I learned that there is no consensus as to what is meant by "Making a decision." For example, imagine we compile a dataset of patient attributes and their symptoms, along with the treatment decisions made by physicians, and use this dataset to train a neural network. If we then use the neural network to recommend a treatment for a new patient, can we say the neural network is "making a decision"?

The question produced dozens of thoughtful answers, but no consensus.

My answer? Yes, the neural network *is* making a decision.

Rationale: A decision is being made any time there is a set of choices (discrete or continuous, scalar or vector-valued), and we recommend a particular choice. It does not matter what method is being used, and while there is typically a performance metric that we are trying to optimize, there is no requirement that the decision be optimal in any way.

Discussion:

The following illustration helps identify a central feature of a decision. Consider the following two settings:

1. Estimating demand $$D_{t}$$ as a function of price $$p_{t}$$:

    $$D_{t} = \theta_{0}^{D} - \theta_{1}^{D}p_{t}$$

    This is a simple linear model, where we might use a dataset of past demands and prices to find the values of $$\theta^{D} = (\theta_{0}^{D}, \theta_{1}^{D})$$ that produce the best fit (although this does not matter). We quickly recognize this as an exercise in machine learning.

2. Placing an order $$x_{t}$$ as a function of the current inventory $$R_{t}$$:

    $$x_{t} = \theta_{0}^{x} - \theta_{1}^{x}R_{t}$$

    This equation represents a way of making an inventory ordering decision (a way of "making a decision"), while the first equation is a way of estimating demand as a function of price (a machine learning problem).

The difference between the two settings is that in the first, $$D_{t}$$ is determined by the market while in the second, we have the responsibility of choosing the order quantity $$x_{t}$$.

Now imagine we are trying to determine how many items to purchase, $$D_{t}$$, when the market price is $$p_{t}$$. In this case, the first equation becomes a policy for making the decision $$D_{t}$$ which we now control.

Any variable $$x$$ is a decision if we control how it is chosen, either directly or through the design of a function (called a policy) $$X^\pi(S \mid \theta)$$ where $$S$$ contains the information we use to make the decision.

### Decisions vs. commitments {#decisions-vs-commitments}

There are many who equate "decisions" (or "making decisions") with some sort of commitment that they will be implemented. For example, Ron Howard's 1966 definition of a decision as an "irrevocable allocation of resources" implies a commitment that a decision will be implemented.

I disagree.

Whenever a computer is used to plan/optimize decisions, there can never be a requirement or expectation of how the optimized solution will be used. We might be planning into the future or simulating decisions for a strategic study, or making a recommendation that a human then ignores.

## **History of defining decisions** {#history-of-defining-decisions}

I was surprised to learn that there are very few efforts to define "decision." The vast mathematical literature simply introduces notation such as $$x$$ (math programming), action $$a$$ (computer science), control $$u$$ (engineering), or any other letter suitable for an application. However, you cannot assign a variable until you have already identified the type of decision in English.

There is also a substantial literature that focuses on how people make decisions, where the set of decisions is typically a simple set of discrete alternatives, but where the performance of each alternative is uncertain.  

<img src="/assets/images/decisionsdecisions/eilon-what-is-a-decision.jpg" alt="Top of Samuel Eilon's 1969 Management Science paper titled 'What Is a Decision'" style="display: block; margin: 1rem auto; max-width: 100%; height: auto;" />

[A 1969 paper in the prestigious journal *Management Science* by Samuel Eilon was titled "What Is a Decision" which opens with the line](https://tinyurl.com/EilonWhatIsADecision/):  

"An examination of the literature reveals the somewhat perplexing fact that most books on management and decision theory do not contain a specific definition of what is meant by a *decision*. "

The first page contains the only discussion of "what is a decision" and, rather than offering his own definition, simply summarizes the thoughts of others.  He seems to highlight the opinion of Harald Ofstad (1961) who states:

"... to make a decision means to make a judgment regarding what one *ought* to do in a certain situation after having deliberated on some alternative courses of action."

He closes the section with what appears to be his own characterization of a decision:

"The essential ingredients in this definition are that the decision-maker has *several alternatives* and that his choice involves a *comparison* between these alternatives and the \*evaluation of their outcomes.\*

The remainder of the paper follows the familiar style of talking about how to evaluate decisions, and the process of making decisions.  There is no recognition of planning (making decisions in the future) which is contingent on uncertain events.

The only community that seems to consistently offer a formal definition is decision analysis, and all of these definitions seem to trace their roots to Ron Howard, who defined decisions in a 1966 paper as "An irrevocable allocation of resources." He updated this in his 2015 book, "Foundations of Decision Analysis" where he poses the definition:

*A decision is a choice between two or more alternatives that involves an irrevocable allocation of resources.*

Note that in this version, he includes the requirement that there be a "choice between two or more alternatives" which was missing from his first version, but consistent with Ofstad's characterization.

<img src="/assets/images/decisionsdecisions/howard-what-is-a-decision.jpg" alt="Scan of Ron Howard's 2015 definition of a decision from 'Foundations of Decision Analysis'" style="display: block; margin: 1rem auto; max-width: 85%; height: auto;" />

The paragraph below the definition explains his reasoning, in particular his use of "irrevocable."  What he is trying to do is to exclude someone "thinking about" a choice, but this has the effect of excluding any form of planning.

In *Handbook of Decision Analysis (2nd edition),* Parnell et al. adopted Howard's definition where they state: 

<img src="/assets/images/decisionsdecisions/parnell-decision-defined.jpg" alt="Parnell et al.'s definition of a decision from Handbook of Decision Analysis, 2nd edition" style="display: block; margin: 1rem auto; max-width: 85%; height: auto;" />

David Skinner, in his elegant book *Introduction to Decision Analysis (3rd edition)*, uses the definition: 

<img src="/assets/images/decisionsdecisions/skinner-decision-defined.jpg" alt="David Skinner's definition of a decision from Introduction to Decision Analysis, 3rd edition" style="display: block; margin: 1rem auto; max-width: 85%; height: auto;" />

Note that this version excludes both "irrevocable" or any mention of having a choice among a set of alternatives.  So, after Google Maps decides on a path (where multiple paths are considered), Skinner's definition would apply to the driver who is simply following the recommended path.

Howard's definition seems to exclude a linear program, which is choosing an optimal set of decisions that may never be implemented.  Similarly, it would exclude the path produced by Google Maps, which may change as traffic conditions change.  It also ignores the decision of how to make a decision.  An example is choosing the penalty for tolls when solving a shortest path problem.  

Yet another definition comes from Joannes Vermorel, the CEO of Lokad, a provider of software for supply chain management, who wrote a very thoughtful book "Introduction to Supply Chain" which contains the definition (in Chapter 8 - Decisions):

<img src="/assets/images/decisionsdecisions/vermorel-definition.jpg" alt="Joannes Vermorel's definition of a decision from 'Introduction to Supply Chain'" style="display: block; margin: 1rem auto; max-width: 85%; height: auto;" />

We can go back to Aristotle (\~350 BCE), for whom a *decision* *is a **deliberate choice of action made through reasoning, aimed at achieving a good or virtuous end.*** Typical of the early philosophers up through modern decision scientists in psychology (such as Kahneman - see below), this description focuses on how to make a decision and how to evaluate it, but avoids the question of identifying what decisions are available to be made.

When reviewing books for definitions of decisions, I would often find discussions of decisions to be intermingled with how decisions are made, and the impact of a decision.  My definition keeps these issues separate.

A decision is, first and foremost, a piece of *information*. A person (or computer) makes a decision, and only then do we address the problem of implementing the decision, if necessary.  Decisions are often made as part of a planning process, which means they may not be directly implemented at all. 

What is most important is that we think broadly so that we are aware of any way we can control or modify a process to achieve an objective.  We address this in the next section where we identify different types of decisions.

## How do we make decisions? {#how-do-we-make-decisions}

There are over 50 words that mean, in the right context, a method for making decisions ([see here for my list](https://tinyurl.com/decisionsandpolicies/)).  I use the term "policy" which I define using:

*Policies are methods for making decisions, \... any method. *

In 2014 at an Informs TutORial session, I presented four classes of policies that cover *any* method for making decisions:

1.  **Policy function approximations (PFAs)** - These are analytical functions that map information in the state variable (which contains everything we know or believe) to a decision.  This is the only class that does not involve an embedded optimization problem.
2.  **Cost function approximations (CFAs)** - These are parameterized approximations (usually deterministic optimization models) of a decision problem that are tuned to work well over time.  CFAs may be modified versions of the value of a set of discrete choices, or large-scale linear, integer or nonlinear programs.  CFAs are widely used in industry, but in an ad-hoc way.
3.  **Value function approximations (VFAs)** - These are the policies based on Bellman's equation.
4.  **Direct lookahead approximations (DLAs)** - These are policies that optimize over some planning horizon to determine a decision that can be made now. It often helps to divide DLAs into two categories: a) those that use a deterministic model of the future, and b) those that use a stochastic model of the future.  

I claim these four classes are universal - any method for making a decision falls in one of these four classes or a hybrid.  In addition, there are a number of hybrids that can be created (and which are used in practice):

- CFAs with PFAs - Choosing least-cost supplier, but with rules to exclude high-risk companies.
- Lookahead (DLA) with VFA - Optimize seasonal production plan, with functions capturing value of ending inventories
- Parameterized deterministic direct lookaheads (DLA/CFA) - Plan seasonal production using $$\theta$$-percentile (say, 80th percentile) demand forecasts.
- VFA policy using PFA - Distribution planning using VFAs to value inventory at each warehouse, but using rules (PFAs) to force deliveries to specific locations.
- VFA with CFA - Start with a VFA-based policy with a linear model, and then tune the parameters of the linear VFA to get the best results using a simulator.

These four classes form the foundation of my 2022 book *[Reinforcement Learning and Stochastic Optimization](https://tinyurl.com/RLandSO/) *(a graduate-level text) and *[Sequential Decision Analytics and Modeling](https://tinyurl.com/sdamodeling/) *(a teach-by-example book written for undergraduates). 

The academic literature focuses primarily on VFAs (policies based on Bellman's equation), and stochastic DLAs, which come in a variety of flavors (decision trees, stochastic programming, and robust optimization).

I like to list the policies based on what is most useful:

**Category 1**: Class 1) PFAs, class 2) CFAs, and class 4a) deterministic DLAs. My guess is that these three cover about 97 percent of all decisions.  We all make decisions, and I claim we use all three, and know how to adapt them to different situations. We are simply born with these tools.

**Category 2**: Class 4b) Stochastic DLAs for discrete actions, which typically produce decision trees.  These are widely used in business settings for making decisions about whether to move forward with complex activities, but can be applied to a wide range of simple decisions with uncertain outcomes.

**Category 3**: Class 3) VFAs - This is where I put all the work based on Bellman's equation, including approximate dynamic programming and reinforcement learning (circa 1996 from Sutton and Barto's first edition).  I like to describe VFA-based policies as "A powerful strategy that works for a very small number of problems" but the attention it receives in the research literature far exceeds its usefulness in practice.

**Category 4**: Class 4b) Stochastic DLAs, but this time I am referring to stochastic programming for vector-valued decisions. Despite thousands of papers on this topic since it was introduced in 1955, real-world applications are rare.  

There are entire communities that focus on a specific class of policies, as occurs in decision analysis with decision trees, the stochastic programming community that looks to include uncertainty in math programming models, and domain-specific communities such as inventory planning that automatically assume orders are made with simple order-up-to policies.  People often make decisions without realizing it because they are following some policy through force of habit.  

## The psychology of decision making {#psychology}

<img src="/assets/images/decisionsdecisions/kahneman-thinking-fast-and-slow.jpg" alt="Cover of Daniel Kahneman's book 'Thinking, Fast and Slow' — a sketch of two figures with the title set in stencil-style type" width="220" align="right" style="max-width: 100%; height: auto; margin-left: 1rem; margin-bottom: 0.5rem;" />
There is an extensive literature on how people make decisions.  Easily the leading voices in this literature are Daniel Kahneman, former Princeton professor and Nobel prize-winning author, with over 500,000 citations, and his frequent coauthor, Amos Tversky.  Kahneman's work focused on *how* people make decisions, especially in the handling of uncertainty.  His highly cited book book, *Thinking Fast and Slow* explored how different regions of the brain would handle the tasks associated with decision-making.

So it was to my considerable surprise that nowhere in his extensive writings does it appear that he ever actually defined a decision.  Implicit in his discussions is the assumption that decisions are discrete alternatives, where the goal would be to choose what is "best" from a set of discrete alternatives.  For example, none of his work would help with problems such as choosing the best assignment of 100 resources to 100 tasks, optimizing thousands (or billions) of parameters in a statistical model, or choosing the best *policy* for making decisions.

I also offer another hypothesis:

*Humans, without any training, use all four classes of policies, albeit in an ad hoc way.  Our brains have learned to naturally adapt our decision-making styles to different situations.*

A simple example is playing chess, where we start each game using "if in this state, we take this action" style of thinking (a form of PFA called a lookup table), to the use of decision trees where we plan into the future, a form of DLA (direct lookahead approximation).  We might even use a DLA/VFA hybrid where we plan for a few moves into the future, and then stop using a rough approximation of the value of the position we are in (e.g. did we lose our queen, or is our rook in a strong position).  

## State variables: The information we use to make decisions. {#state-variables}

Almost inseparable from how we make decisions is the information we have available to make the decision.  In the communities that work on sequential decision problems (dynamic programming, Markov decision processes, optimal control), this information is contained in the *state variable*.  Bizarrely, I came to realize that even the top theoreticians (and I would say *especially* the top theoreticians) did not know how to define a state variable!

I found two books on deterministic optimal control which offered a perfectly acceptable definition:

*All the information you need at time t to model the system from time t onward.*

Nothing wrong with this, except that it doesn't specify *what* information is needed.

I offer a fairly extensive discussion of what I might call "the state of state variables" [which can be accessed here](https://tinyurl.com/onstatevariables/). This webpage includes my own definition of a state variable, which has been evolving over time.  The most refined version is contained in my 2022 volume, [*Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*](https://tinyurl.com/RLandSO/) (see section 9.4).  In it, I offer two definitions depending on whether you are given the policy for making decisions, or whether we are working from a fundamental description.  The most interesting case in my view is where we specify the policy, for which I offer the definition: 

*The state variable is a function of history that, given a policy, is necessary and sufficient to compute:*

a.  *The performance metrics.*
b.  *The policy (the function used to make decisions).*
c.  *Any information needed to compute (a) and (b) in the future, which may include the dependence (if any) of the exogenous information on the current state and/or the decision that has just been made.*

It is (b) that requires that we specify our policy.  If we want to do this without specifying the policy, we would replace (b) with the constraints (or whatever is needed to specify the set of decisions).  However, if we have a VFA or DLA type policy we are typically modeling the future using a forecast, which would have to be contained in the state variable.   

Understanding policies helps us understand what information we need to make our decisions, which then guides the collection of what can be large quantities of data.  Often, there is information we need but do not know (such as a demand forecast, or how a patient will respond to treatment) that we need to estimate using statistical models.

Compiling the information in state variables is the core of ontology and epistemology, which dates back to the work of the ancient philosophers, and is an active area of application for modern large language models.  Ontology can be thought of as "what we know" while epistemology addresses "how we know it" which helps us address how *well* we know something.  Decisions invariably modify processes moving forward in time, usually in the presence of dynamic information processes which are unknown at the time a decision is made.  

## What is the value of information? {#value-of-information}

Arguably, one of the most subtle questions that arises in controllable systems is capturing the value of information.  This is a common question (or at least it should be) because there are so many settings where we have to make decisions without knowing everything we need perfectly.  Some examples: 

- A physician can prescribe a treatment plan now, or run tests (blood tests, CT scans) to learn more about the patient and then design a treatment plan.
- A manufacturer can plan operations given the uncertainty of when inbound parts might arrive from Asia, or invest in a visibility platform that can provide more precise estimates of arrival times.
- A hotel revenue manager makes a best guess of total bookings for a particular date in the future, or he can invest in the expertise of a consultant who pulls together data on special events and the booking rates of other hotels to provide more accurate estimates.
- An energy trading firm places bets on highly volatile electricity prices.  They can reach out to the local utilities to learn the production plans for tomorrow so the trading firm can better estimate whether capacity will be generous (producing lower prices) or tight (producing higher prices).

There is a debate in the inventory planning community on the value of probabilistic forecasts of demand versus point forecasts. What is the value of using a probabilistic forecast? 

The value of better estimates of unknown quantities depends on the policy used to make the decisions in each of these settings. All policies can (and should) be tuned to work as well as they can given whatever information they have access to. However,  tuning, which can be done in a simulator or the field, is hard.  For example, inventory planning using point forecasts can be improved through appropriately tuned safety stocks, but tuning does not completely replace the value of probabilistic forecasts.

The value of the new information requires simulating the policy without the information and then simulating it with the information.  

Value-of-information studies are arguably the most subtle from a modeling perspective. They require:

- Understanding belief state variables and the uncertainty they capture.
- Knowing how to model the dynamics of the real process. 
- Choosing appropriate policies to handle uncertainty.
- Understanding how to tune policies under appropriate conditions.
- Capturing changes in uncertainties in the performance metrics (including risk) due to better sensors and estimation methods.
- Running the simulations to evaluate the value of the new sources of information.  
- Tuning policies always requires simulating them over time in the presence of whatever dynamic information processes are involved.  There are two ways of performing these simulations: 


  - In a computer-based simulator - Here the challenge is to create samples of the exogenous information processes (prices, treatment outcomes, demands).  We can draw samples from history or generate them from a mathematical model.  Simulators can be quite sophisticated and may require substantial efforts to develop and calibrate.
  - In the real world - This involves implementing a policy in the field and observing actual performance.  This avoids the need to develop models, but it is quite slow (it takes a day to simulate a day), and incurs the risk that you are implementing poor decisions in the field.  Also, tuning a decision-making policy in the field is difficult, but may be unavoidable.  This is a topic that desperately needs more research.

## The "great thinkers" in the history of decision-making {#great-thinkers}

I have been compiling a list of "great thinkers" in the area of decision-making.  This is my latest:

1.  Aristotle (circa 350 BCE) -- Is generally considered the first philosopher to systematically analyze the process of making decisions through concepts like deliberation and choice (following on Socrates and Plato).
2.  William Hamilton (1800s) -- Who, with Carl Jacobi, invented the Hamilton-Jacobi equations for solving a class of deterministic dynamic control problems.
3.  John von Neumann (1940s) -- With Oskar Morganstern and building on the work of Bernoulli (1700s) pioneered the use of expected utility for evaluating uncertain payoffs.
4.  Herbert Simon (1950s) -- Contributed the theory of bounded rationality and satisficing, which arises when making decisions in constrained environments.
5.  George Dantzig (1950s) -- Invented the simplex algorithm that launched the field of high-dimensional decision problems, starting with linear programming.
6.  Richard Bellman (1950s) -- Father of dynamic programming that laid the foundation for solving sequential decision problems under uncertainty.
7.  Howard Raiffa (1960s) -- Who, with Ron Howard, introduced and developed the field of decision analysis.  
8.  Daniel Kahneman (1970s) -- Winner of the Nobel prize in economics, Kahneman was renowned for his work, often with his perennial coauthor Amos Tversky, on human judgment and decision-making under uncertainty.

<img src="/assets/images/decisionsdecisions/aristotle-to-kahneman.jpg" alt="A panel of portraits or headshots of the eight great thinkers: Aristotle, William Hamilton, John von Neumann, Herbert Simon, George Dantzig, Richard Bellman, Howard Raiffa, and Daniel Kahneman" style="display: block; margin: 1rem auto; max-width: 72%; height: auto;" />

What is surprising is my realization that none of these people ever *defined* a decision, although a notable exception is the definition by Ron Howard (described at the top of this page) who played a central role (along with Howard Raiffa) in the development of decision analysis.  What I did was to look at the *types* of decisions each considered in their work - it is very revealing in terms of what they seem to think of a decision:

- **A set of discrete choices** - This is the most common type of decision that people encounter in their day-to-day lives, as well as most professional decisions.  The challenge arises when dealing with uncertainty - quantifying the probability of different outcomes, and then choosing across uncertain choices:
  - Aristotle - Focused on the process of deliberation, highlighting the process that a decision requires identifying and comparing choices.
  - John von Neumann - Helped to formalize the concept of utility versus expected payoffs.
  - Herbert Simon - Introduced the dimension that people and organizations often do not have the time to consider every choice.
  - Howard Raiffa - Promoted the use of decision trees, which start with making a single decision followed by uncertain events and, often, more decisions.
  - Daniel Kahneman - Focused on characterizing how people make decisions.
- **Continuous control problems - **These problems arise in the control of physical systems such as vehicles or aircraft, which are controlled in continuous time, using continuous controls such as imposing force in one or more dimensions, administering drugs, or heating/cooling a building.
  - William Hamilton - With Carl Jacobi, introduced the Hamilton-Jacobi equations that exploit the use of a function (denoted $$J_t(x_t)$$) for the value of being in state $$x$$.  The system was governed by a continuous control vector $$u_t(x_t)$$.  In 1960 Rudolf Kalman exploited this work to derive an explicit solution to the linear quadratic control problem in 1960, a special, but important problem arising in engineering control problems. 
- **Sequential discrete decision problems *- ***This is where discrete decisions are made sequentially over time.
  - Richard Bellman - Bellman's work in the 1950s launched decades of research into multiperiod stochastic, dynamic problems where decisions (actions) are discrete.  His work also assumed that the state variable was also discrete, and the state space was not too large.  This restricts the theory to problems with very low-dimensional (and discrete) state variables; the growth of the (discrete) state space with the number of dimensions is known as the *curse of dimensionality*.
  - Howard Raiffa - While the most common use of decision trees is for a single decision (make decision, see random outcome, stop), decision trees can handle fully sequential problems.  Decision trees do not assume discrete states, but the price is that they grow exponentially with the number of time periods, which limits their horizons.
- **Vector-valued static decision problems *- ***These problems grew out of the logistical challenges of World War II, building on prior work done in the 1930s in the Soviet Union.
  - George Dantzig - Dantzig realized that many logistical problems, such as assigning resources to tasks, could be formulated as linear programs where the goal is to minimize the total cost while observing constraints such as each resource can be assigned to only one task, and at most one resource can be assigned to any task. Dantzig developed the simplex algorithm that would produce optimal solutions for a single (static) instance of an assignment problem.  The simplex algorithm could be applied to general linear programs, which arise in many settings.  This work launched the field of mathematical programming, which was quickly extended to convex nonlinear problems, the much harder class of integer programming problems, and an extensive array of other high-dimensional optimization problems.  Dantzig also introduced stochastic programming which is a restricted form of decision tree designed to handle vector-valued decisions.
{% endraw %}
