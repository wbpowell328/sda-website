---
layout: page
title: "Supervising theses on sequential decision problems"
permalink: /supervising-theses/
date: 2026-08-09
---

<img src="/assets/images/supervising-theses/thesis-students.jpg"
     alt="Professor Powell with a group of undergraduate senior thesis students, Ph.D.s, post-docs and research staff at Princeton"
     style="float:right; width:414px; max-width:55%; margin:0 0 0.75rem 1.25rem;">

At Princeton I supervised over 200 undergraduate senior theses along with over 50 masters theses and doctoral dissertations, with the majority coming in the last 15 years. In my last active semester, I had over 25 undergraduate senior theses, Ph.D.s, post-docs and research staff (see picture at right), all of whom were working on sequential decision problems.

In the last years of my teaching career, I had refined a process for supervising student research, both graduate and undergraduate. It is easily adaptable to a vast range of applications, as well as the full spectrum of analytical capabilities, from purely applied students working in application domains, to students in business, engineering up to mathematically sophisticated students in operations research, computer science and electrical engineering.

In this section, I am going to focus on theses on applied topics aimed at undergraduate and masters students. The material reflecting decision framing is new, but it is particularly well suited to students working in a specific application domain.

## Steps in the research process

How did I handle all those senior theses? In my last decade, I refined the process of supervising theses, all of which involved some form of sequential decision problem (keep in mind that this is an astonishingly broad problem class). The steps in my process worked as follows:

1. **Choosing a topic** — Unless the student or adviser already has a particular problem in mind, I would start with broad topics such as energy, supply chain management, finance, e-commerce, sports, … Each of these have many subareas — the idea is to either focus on a high-level metric (lower costs, lower risk, reducing infections, maximizing profits), or a specific decision (trading assets, comparing energy storage policies, choosing a team, …). Research works best when either the adviser or the student is very familiar with the problem domain.

2. **Framing the decision problem** — This consists of answering the questions:

    a. What metrics will be used to evaluate performance? For a discussion of metrics, see [here](/framingproblems/#performance-metrics). For each metric, be sure to consider both average performance and risk.

    b. What types of decisions are being made? For more complex problems, there may be more than one decision-maker (this is a multiagent system), which might be adversaries (companies competing against each other, military opponents, …). For more on identifying decisions, see [here](/decisionsdecisions/).

    c. What are the sources of uncertainty that will affect the performance of the system? For a thorough discussion of the types of uncertainties, see [here](/modeling-uncertainty/#categories).

    For a thorough discussion of decision framing, see [here](/framingproblems/).

    Note that if you want to optimize playing chess, these questions are trivial. If you want to solve complex problems in business, health, or perhaps climate change, these questions are quite challenging.

    At this point there is typically no mathematical modeling.

3. **Mathematical modeling** — At Princeton (in operations research), all my students included mathematical models using what I now call the *Universal Modeling Framework*. The three framing questions lay the foundation for filling in the five elements of the [universal modeling framework](/universal-modeling-framework/):

    a. **State variables** — This is all the information at a point in time that is needed to compute the performance metrics, and make decisions (which depends on the policy used to make decisions — this is yet to be designed), for now and in the future. The design of state variables is evolutionary — it will grow as the model matures. State variables may capture the physical state (such as the location of a drone), other information (e.g. wind speed, temperature) and, most important, beliefs about variables that are not known perfectly. (For more on state variables, see the discussion [here](/statevariables/).)

    b. **Decision variables** — This involves assigning notation to the types of decisions identified above. The method we used to make decisions (called the policy) will be designed later.

    c. **Exogenous information** — This is new information we learn after we make a decision, which come from the sources of uncertainty identified in the framing process. The exogenous information process may be fairly simple (such as Poisson arrivals of customers arriving to a queue or purchasing a product), or it can be a rich and complex process that occupies the core of the thesis. See [here](/modeling-uncertainty/) for an introduction to modeling uncertainty.

    d. **Transition function** — These are the equations that describe the evolution of the state variables given the decision made and the exogenous information that arrives after the decision is made.

    e. **Objective function** — This is where we evaluate the policy (which has not yet been designed) and search over different policies to find the one that works the best. The objective function builds on the performance metrics identified in the framing process.

    My best recommendation for illustrations of modeling problems using this framework is the online book *[Sequential Decision Analytics and Modeling](/sdam/)*. It includes 12 different chapters illustrating the framework on different applications. For a more advanced treatment (masters to Ph.D.) see Chapter 9 of *[Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions](/rlso/)*, which can be downloaded from the [book webpage](/rlso/).

4. **Reviewing the model** — Students have the most difficulty with mathematical modeling. I recommend that advisers review the first draft of the modeling chapter that a student writes to check the notation. The most subtle aspect of a sequential decision problem is modeling the flow of information, but the examples in the [SDAM book](/sdam/) illustrate a style that makes modeling information fairly straightforward.

5. At this point, the thesis should follow the style of the chapters in the [SDAM book](/sdam/) above. After modeling the five elements, the next step is to model uncertainty, which can be as simple as using historical data (as with the training of any statistical model), or subtle for a (typically advanced) student who wants to develop a mathematical model. Modeling uncertainty may require nothing more than finding a historical dataset, or running a simple spreadsheet simulation. Or, it can evolve into surprisingly sophisticated mathematics — it all depends on the background, skill and interests of the student.

6. The final modeling step involves designing, tuning, and comparing policies for making decisions. See [here](/policies/) for a thorough discussion of policies. Remember — always start with the simplest policy. As with modeling uncertainty, designing policies can be fairly simple exercises, or they can challenge the most sophisticated Ph.D. student.

7. The research would normally close with doing some form of policy study to conclude the research.

8. During the year, I would set up office hours each week (typically Friday morning) where students could sign up to meet with me. It is important to make sure a student has a reasonable topic and that the mathematical model is sound (the [SDAM book](/sdam/) was my most useful reference).

## My undergraduate senior theses (2010-2020)

I am including the titles of the senior theses I supervised from 2010-2020 to provide an indication of the variety of topics that I handled using my approach. If you are interested in any thesis, email me at [wbpowell328@gmail.com](mailto:wbpowell328@gmail.com) and I will make the thesis available.

### 2020 (on sabbatical)

1. Kara Dowling (2020), A Multi-agent Stochastic Control Model for Adversarial Planning in Naval Operations
2. Madhumitha Shridharan (2020), The Little Wind Farm That Could: A Comparative Analysis of Lookahead Policies for Energy Storage Problems

### 2019

1. Emma Corless (2019), Conquering an Empire of Pain: An Optimal Learning Strategy for Identifying the Stage of Opioid Addiction
2. Sadie McGirr (2019), Optimal learning for optimal rowing: Minimizing race energy expenditure
3. Greg Kernisan (2019), Making "Dependable Engines": From Policy Search to Stochastic Lookaheads in Dynamic Supply Chain Planning
4. Stephanie Ward (2019), Optimizing Energy Storage Locations in the Presence of Offshore Wind using Stochastic Dual Dynamic Programming
5. Emily Kallfelz (2019), Optimal Learning for Optimal Rowing: Maximizing Technical Efficiency
6. Amanda Brown (2019), Beat the Curve: Designing Adaptive Blood Glucose Management Strategies for Non-Pump Patients with Type 1 Diabetes
7. Selina Pi (2019), An optimal learning model for state-level optimization of naloxone kits with non-convex response rates
8. Amy Zhang (2019), Optimal Learning using Monte Carlo Tree Search for Epidemic Control in the Meningitis Belt

### 2018

1. Joseph Carlstein (2018), Approximate Dynamic Programming: Designing an Economically Optimal Fleet of Electric Self-Driving Cars
2. Anid Laoui (2018), Optimal Design for Multi-Agent Peer to Peer Energy Trading Networks
3. Steven Sobel (2018), A Stochastic Optimization Model for Managing Energy Storage Using a Driverless Fleet of Electric Vehicles
4. Evan Wood (2018), Energy Risk Management: Stochastic Optimization for Industrial Gas Operations
5. Brandon Tan (2018), The Knowledge Gradient Policy for Sequential Information Collection: A Review (PACM)
6. Nicholas Yang (2018), The Knowledge Gradient Policy in Sequential Decision Applications (Math)
7. Michael Li (2018), Applying the Knowledge Gradient Policy with Locally Quadratic Belief Model to Optimizing Energy Arbitrage Strategies (CS — Junior independent work)
8. Woramot (Earning) Yomjinda (2018), Jet Engine Supply Chain Optimization: Graphical Utility and One-Agent Inventory Policy Against Uncertainties (ORFE — Junior independent work)
9. Tor Nitayanont (2018), Relationship Learning on a Graph Using Optimal Learning Policies (ORFE — Junior independent work)

### 2017

1. Andy Deng (2017), Optimal Management and Design for a Fleet of Electric Vehicles
2. Ginevra Guzzi (2017), Investigating a Feasible, Reliable and Cost-Effective Energy Portfolio in a Net-Zero Carbon Emissions Landscape
3. Raj Patel (2017), Twitter Trading: Modeling Twitter Processes and Finding an Optimal Trading Policy
4. Aaron Schwartz (2017), Stochastic Optimization for Isolated Microgrid Energy System Design and Control
5. Eric Schneider (2017), Multifidelity Modeling with Varying Costs using Optimal Learning (Math)
6. Connor Werth (2017), Learning Stochastic Binary Feedback on a Sampled Hierarchical Belief Model: Optimal Pricing of Contracts in the Truckload Trucking Market

### 2016

1. Sankalpa Banerjee (2016), Understanding Variability and Uncertainty in Energy Generation Portfolios using SMART-Invest: A Stochastic Dynamic Programming Approach
2. Kabo Kula (2016), A Stochastic Analysis of the Economics of Solar and Storage
3. Angela Zhou (2016), Sequential Decision-Making Problems: Online Learning for Optimization over Networks
4. Zachary Koerbel (2016), An Evaluation of Different Hotel Management Techniques
5. Chandler Gay (2016), Simulated Solar Variability under High Penetration Renewable Energy Deployment
6. Mohamed El Tonbari (2016), Low Rank Approximations to Markov Decision Processes
7. Olabode Adunbarin (2016), Energy Resource Scheduling Policy Studies in the PJM Electricity Market: A Dynamic Programming Approach
8. Natalie Carthy (2016), A Dynamic Programming Model for Simulation Demand Response and Renewable Energy
9. Raina Sun (2016), Gone With the Wind: A Stochastic Model of Wind Energy Crossing Time and Error Distributions
10. Bryan Oslin (2016), Finding the Inefficiencies in Medicine: An Analysis of Medical Quality Versus Cost with Respect to Knee Replacement Episodes

### 2015 (on sabbatical)

1. Erick Chen (2015), Structured Approximate Dynamic Programming for Simulating Heterogeneous Agents in Incomplete Markets
2. Saumya Singh (2015), Princetonian Electricity: Managing an Isolated Microgrid

### 2014

1. Kevin Cen (2014), Entropy Minimization and Locating Faults Across the Electrical Network using Customer No Light Calls
2. Henry Chai (2014), A Statistical Model for Simulating Solar Intensity in New Jersey
3. Daniel P. Chen (2014), Analyzing Transformer Replacement Policies: A Simulation Approach to Reducing Failure Risk
4. Luke L. Cheng (2014), Solar, Wind, and Storage: Optimizing for Least Cost Configurations of Renewable Energy Generation in the PJM Grid
5. Mark Holekamp (2014), Keeping the Lights On: An Analysis of the Dynamic Allocation Problem of Assigning Utility Repair Trucks to Outages
6. Kevin Lin (2014), Approximate Dynamic Programming Applied to Biofuel Markets in the Presence of Renewable Fuel Standards
7. Oladoyin F. Phillips (2014), Policies for Investing in Nigeria's Power Delivery Capabilities

### 2013

1. Haotian (Cosmo) Zhong (2013), Replicating Electricity Spot Prices Through Inverse Optimization of Supply Shifts
2. Daniel H. Elkind (2013), Prediction Markets and Strategic Behavior: A Simulation Approach to Evaluating Alternative Mechanisms, Program in Applied and Computational Mathematics, Economics Department
3. Kelly R. Funderburk (2013), Exploring Alternative Treatment for Bacterial Meningitis through Optimal Dosing Strategy: Responding to Rising Antibiotic Resistance
4. Shreyashi Ghosh (2013), The Future of Solar: An Analysis of New Jersey's Market for Solar Renewable Energy Credits (SRECs)
5. Taman Narayan (2013), Modeling Government Contracting: A Principal-Agent Approach with Imperfect Monitoring and Constrained Rewards, Certificate Program in Applied and Computational Mathematics, Economics Department
6. Alexander Ogier (2013), Optimizing Princeton's Energy Use, Department of Computer Science
7. Tarun Sinha (2013), Resource Optimization in the Princeton University Energy System, Department of Mechanical and Aeronautical Engineering
8. Tarun Sinha (2013), A Stochastic Gradient Method to Match Actual Resource Demand in Energy Management Systems, Certificate Program in Applied and Computational Mathematics, Department of Mechanical and Aeronautical Engineering (PACM certificate)
9. Timothy Wenzlau (2013), Nested Newsvendor Optimal Commitment Policies in Day-Ahead and Hour-Ahead Electric Capacity Forward Markets

### 2012

1. Yu-Sung Huang (2012), Dynamic Pricing of Electric Vehicle Charging Locations: An Application of Optimal Learning
2. Kevin Kim (2012), A Stochastic Unit Commitment Model in the Presence of Offshore Wind Energy
3. Huanqi Deng (2012), A Clustering Based Algorithm for Efficient Online Nonparametric Regression
4. Dao Mi (2012), Electricity Forward and Option Hedging System
5. Daniel Dix (2012), Examining the Impact of Electric Vehicles on Today's Power Grid
6. Ma. Claudine M. Fernandez (2012), Parameterization of Public Policies to Incentivize Investment in Geothermal Power Projects in the Philippines
7. Steven Chen (2012), Natural Gas Power Generation in the Presence of Wind: A Mixed Integer Linear Programming Approach to the Hour-Ahead Unit Commitment Problem
8. Atanas Petkov (2012), The Hedging Problem: Modeling Electricity Spot Prices

### 2011

1. Xiaoyang Long (2011), Optimal Learning in Dynamic Pricing Problems with Linear Beliefs
2. Hui (CinCin) Fang (2011), Controlling the Elements: Regulating Wind With Hydro in China
3. Sarah Gershkon (2011), Advance Commitments for Electric Power: Applied Policies and Risk-Management at Air Products and Chemicals
4. Kathy Huang (2011), Smart Home Appliances: Demand Management as Energy Storage
5. Vince Jeong (2011), Approximate Dynamic Programming for the Stochastic Load Curtailment Problem
6. Lawrence W. Manning (2011), Mean Field Variational Inference for Dirichlet Process mixtures of Generalized Linear Models and Applications in Approximate Q-learning
7. Ben Sheng (2011), A Stochastic Dynamic Programming Model of Ancillary Storage Using Electric Vehicles to Offset Volatility from Wind Generation
8. Gerald van den Berg (2011), Bayesian Information Collection in Stochastic Optimization: An Aggregation-Based Approach
9. Megan Wong (2011), Cell Charging Challenges: An Optimal Pricing Strategy for a Solar Mobile Charging System in Africa
10. Sami Yabroudi (2011), Exploiting the Inverse Capacity-Rate Relationship in a Stochastic Setting: Control Algorithm Development for Hybrid Energy Storage in Renewable Energy Applications (MAE)
11. Peck Yang (2011), Lake Management: Endogenous and Optimal Learning to Reduce Uncertainty
12. Florina Yezril (2011), Smart Grid in New York City: Modeling, Optimizing, and Controlling Power Flow Bottlenecks (EE)
13. Rui Zhang (2011), Winding up the Grid: Optimal Placement of Wind Farms in China

### 2010

1. Peng, Jerry (2010), The Batch Knowledge Gradient Policy for Simultaneous Information Collection
2. Earp, Daphne (2010), Riding Down the Experience Curve: A Dynamic Model for Photovoltaic Technology Incentives
3. Escoriaza, Alex (2010), Simulation and Analysis of an Energy Portfolio Problem using a Deterministic Linear Program
4. Hsih, Katie (2010), Optimal Dosing Applied to Glycemic Control for Type 2 Diabetes
5. Hummer, Merritt (2010), Greening the Grid: Optimal Tax Policy for Wind and Solar Technology
6. Schoppe, Christine (2010), Wind and Pumped Hydro-Power Storage: Determining Optimal Commitment Policies with Knowledge Gradient Nonparametric Regression
7. Schoppe, Jennifer (2010), The Valuation of Natural Gas Storage: A Knowledge Gradient Approach with Nonparametric Estimation
8. Shue, Victoria (2010), Batteries: Storing Wind
9. Tagher, Nicholas (2010), Powering America: Optimizing Electricity Generation for the United States until 2030
10. Wei, Eva (2010), Optimal Levels of Hourly Wind Generation Commitment and Reserve Portfolio Usage
11. Yu, Vanessa (2010), Optimal Information Collection and Intervention Strategy for Infectious Disease Outbreak at Princeton University: A Partially Observable Markov Decision Process
12. Zhou, Jessica (2010), 20 Percent Wind Generation and the Energy Markets
