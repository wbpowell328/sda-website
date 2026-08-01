---
layout: book
title: "Chapter 7: Closing Notes"
permalink: /bridging-vol1/chapter-7/
date: 2026-07-17
---

{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

This volume has focused on answering three questions to help with framing pretty much any problem involving a decision. The questions are:

- **What are the performance metrics?** These should be presented using the following guidelines:
  - They should be organized into pyramids as an informal way of capturing relative performance.
  - They should be identified as objectives (to be minimized or maximized), targets, or limits.
  - Finally, they should be separated between base metrics and risk metrics.
- **What types of decisions are being made (and who makes them)?** These should be identified by:
  - Are the decisions acting on physical resources, financial resources, or information?
  - Are the decisions discrete or continuous, scalar or vectors?
  - At what frequency are decisions made, and when are they implemented?
- **What are the sources of uncertainty that affect performance?** These should be characterized on the basis of:
  - Which of the 12 classes of uncertainty are relevant to the problem?
  - How does each source of uncertainty impact how decisions are made, and how do they impact the performance metrics?
  - How does each source of uncertainty behave? This should capture how they behave over time, and any correlations that need to be represented.

Of course these questions sound interesting and relevant, but this is all we cover in Volume I. We gave a brief tour of the four classes of policies for making decisions, but we will not return to this topic until Volume III. Before we can address making decisions, we have to fill in other details such as identifying the information needed to make a decision, and how the system evolves over time. This is covered in Volume II, which also sets the foundation for evaluating the policies that we will present in Volume III.

## Decisions, decisions

We make so many decisions that we are often working our way through problems without even recognizing that we have choices. Arguably the first decision we have to make is what sort of analysis to do in order to make a decision. Four important categories of decision settings include:

1. **Decisions where there is potential for simply doing a better job:**
   - A trucking company has to decide which loads to book to maximize revenue while meeting the needs of their drivers. This may involve deciding which shippers they should offer bids for to try to win their freight, which also requires specifying what prices to charge, and whether to make changes in their fleet.
   - A hedge fund wants to automate what had been a manual process for picking investments on a day-to-day basis. Anticipated benefits are better performance with fewer, reducing administrative costs.
   - A manufacturer wants to do a better job managing inventories for their supply chain.
2. **High volume decisions which require automation:**
   - A major retailer has to manage inventories for 50,000 items, requiring daily inventory reviews and replenishment decisions.
   - A hotel has to update pricing on over 10,000 different room/service offerings on their website.
   - The power grid has to plan the schedules for hundreds of power generators on a rolling basis.
   - A mutual fund manager has to decide which of 10,000 stocks to invest in.
   - An online bank might have to evaluate thousands of loan applications each day.

   These are decisions that are made in which high volume, where manual decision making is cumbersome, and may require training a large number of people.
3. **High value, high risk decisions** - These are decisions that require analysis because the choices are high value, with high uncertainty, which means there is considerable risk:
   - Should a company purchase another company? There is a lot of money involved, and uncertainty in the performance of the new markets they are acquiring, and how well corporate cultures will blend.
   - Should a drug company push a drug into clinical trials? Total costs can be over 100 million dollars, and there is on average only a 10 percent probability the drug will ultimately be successful.
   - A patient is suffering from a serious disease, but the only treatment puts the patient's life at risk.

   These are the kinds of problems that are typically the subject of careful analyses using decision trees, sometimes with the help of external consultants.
4. **Decisions made without any analysis** - These are often decisions affecting complex activities where formal analysis is not likely to be of value, and people have strong intuition about what choices to make:
   - A startup needs to increase sales. After a meeting of the executive team, they decide to increase the marketing budget, add two sales people, and include a promotional package to allow people to try the software at very low cost.
   - A public health expert is trying to address a surge of drug overdoses. She decides to undertake an information campaign, provides additional funding to harm reduction groups, and talks to local police and health officials.
   - As a clothing manufacturer in the U.S., you source most of your fabric from Bangladesh, which is being threatened with a dramatic increase in tariffs. If they go through, you will not be able to operate profitably. What do you do?
   - The campaign manager for a presidential campaign has to decide where to schedule the speeches for a candidate over the next two weeks.

   In each of these, the decision-maker is moving forward on gut instinct, without even making a list of the alternative choices that may be required. While an argument can be made that the decision is drawing on past experience, there is typically uncertainty and some thought should go into thinking about strategies given different outcomes.

We would make the argument that all decisions benefit from simply understanding the metrics for evaluating performance (including risk), what types of decisions can be made, and the uncertainties that may affect performance. Whether these are then subjected to more formal analysis will be a judgment call by the decision maker, which is the first decision that has to be made for a project.

The goal of this volume is to avoid falling in the trap of framing a problem based on the familiarity of the person (or team) doing the framing with specific tools, whether they are decision trees or large integer programs. Framing needs to be completely independent of any toolbox.

## Next steps

Framing a problem in terms of metrics, decisions, and uncertainties is a critical first step, one that may contribute additional clarity to help understand a problem, even if there is no subsequent use of quantitative analysis. However, there will be problems that either call for more careful analysis, or there is a clear need for automation (such as the examples above).

When there is an interest in moving to the computer for making decisions, we have to anticipate the following steps:

1. **Identifying the metrics, decisions, and uncertainties** that we want to include in our model to address the ultimate goal(s) of the project. At this point a choice has to be made: use the improved understanding to make a decision, or move forward with further analysis.
2. **Mathematical modeling** the chosen problem using the universal modeling framework, including the modeling of uncertainty. This is covered in Volume II.
3. **Designing the policies** to determine the decisions identified in Step 2, and tuning them using the model developed in Step 3. This step will help identify the information that is needed. This is covered in Volume III.
4. **Designing the processes** for collecting the information needed to make decisions (compute the policy) and evaluate performance.
5. **Implementing decisions in the field.** This requires communicating instructions and designing the processes to implement decisions. This is where we observe and manage compliance.
6. **Evaluating performance** of the process.

It is possible to simulate all these steps in the computer which can help serve as a test environment. Simulators (sometimes known as "digital twins") can be helpful for evaluating and comparing policies, but they can be difficult to build and validate. As a field implementation there are significant steps for creating data collection processes, as well as systems for implementing and compliance monitoring.
{% endraw %}
