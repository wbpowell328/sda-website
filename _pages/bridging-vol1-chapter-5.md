---
layout: book
title: "Chapter 5: Uncertainties"
permalink: /bridging-vol1/chapter-5/
date: 2026-07-17
---

{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Sequential decision problems invariably have to deal with uncertainty, which is typically the most challenging dimension of making decisions over time. There are three ways that uncertainty affects the performance of our system:

1. The decision we make at a point in time is not implemented correctly.
2. The performance of the system given our decision is not the same as what we estimated when we made the decision.
3. The impact of a decision now on the future is not estimated correctly because of changes as we step forward in time.

Although we list only three ways that uncertainty affects performance, uncertainty arises in many forms, which is why some forms of uncertainty are often overlooked in the modeling process. In fact, most uses of optimization tools ignore all forms of uncertainty, typically reflecting the dramatic increase in uncertainty introduced by explicitly modeling any form of uncertainty.

A goal of this chapter is to highlight the different ways that uncertainty can arise. This does not mean that models need to incorporate all forms of uncertainty. However, the decision to ignore a form of uncertainty should be an explicit choice, and not just because a modeler overlooked it.

## The 12 classes of uncertainty {#12classesofuncertainty}

One way to approach the identification of sources of uncertainty is to work backward from a mathematical model. Below are 12 classes of uncertainty created from the perspective of how uncertainty can enter a model. Complex problems, such as managing a supply chain, an energy system or solving a public health problem, will involve all 12 classes, while simple problems such as playing chess may involve just one.

There is some overlap in the classes, so do not worry if there is some ambiguity in terms of where to list a source of uncertainty. What is important is to identify as many different forms of uncertainty as possible.

1. **Observational errors** – These represent errors in quantities and parameters that we have to observe from the environment. Some examples might be:
   - The current inventory of a product as represented in the computer, which may not match what is actually on hand.
   - Medical X-rays of a patient to detect cancer.
   - The fraction of voters who prefer a particular candidate for political office.
2. **Exogenous uncertainty** – This is information that will arrive to our system after making a decision, such as:
   - The demand for a product being sold in the market.
   - The change in price of a stock.
   - The time required to drive from one city to the next.
   - The amount of cash that may be deposited or withdrawn tomorrow.
   - How a patient responds to a type of medication.
3. **Prognostic uncertainty** – This is errors in forecasts of demands, prices, travel times (any quantity that we might be forecasting).
4. **Inferential uncertainty** – This captures uncertainty in our estimates of the state of the world right now. This could include:
   - How the market might respond to a change in price. We might think there is a 10 percent drop in demand for a 5 percent increase in price, but the true value might be that demand will drop by 12 percent.
   - We think that a cancer patient is stage 2, but it might be stage 3. We might detect breast cancer, but overlook that it has spread to other organs.
   - A presidential campaign may think that \$10 million in ad spending in a major market might produce a 2 percent increase in favorability of a candidate, but the reality may be higher or lower.
5. **Experimental uncertainty** – This describes the variation from running repeated experiments either in a lab, a simulator, or the field:
   - A manufacturer runs experiments of a process for manufacturing silicon wafers. The test may be repeated 10 times, producing a spread of yields between 70 and 90 percent.
   - A business is evaluating a new marketing campaign by running it in five different test markets. There will be variations across the markets, and over time.
   - A computer simulator is used to test the performance of an inventory ordering policy. Each pass of the simulator will produce different results.
6. **Model uncertainty** – This is an umbrella that can cover multiple sources of uncertainty, but one of the most important is uncertainty in the model of how a process evolves over time. Examples might be:
   - How the climate responds to changes in policies for controlling carbon.
   - How a patient responds to injections of insulin.
   - How a disease spreads in a population in response to changes in policies regarding the distribution of vaccines.
7. **Transitional uncertainty** – This is noise in how a system responds to a control. The simplest example would be controlling the path of a rocket or aircraft, which is buffeted by wind. We typically assume that the evolution of the system is known and deterministic, but is affected by an exogenous process (such as wind).
8. **Implementation uncertainty** – There can be a difference between what we decide to do, and the decision that is actually implemented in the field. For example:
   - The physician orders a particular medication, but the patient does not take it, or takes the wrong dose.
   - A scientist wants to test a particular combination of materials, but the intern orders an incorrect item (errors like this can produce major breakthroughs!).
   - The power grid orders that a generator be turned on at 1pm, but the local operator does not turn on the generator until 2pm.
9. **Communication errors** – Instructions to the field can be simply miscommunicated. The person receiving the instruction may think they are doing what is requested, but they just did not hear or understand an instruction.
10. **Algorithmic instability** – There are some settings where running an algorithm repeatedly can return different solutions:
    - Complex problems often require the use of sophisticated algorithms that introduce an element of variability, which often arises when an algorithm uses parallel processing. The speed of parallel processors may affect who finishes first, which can affect the overall path of the algorithm.
    - Algorithms for solving stochastic optimization problems often depend on Monte Carlo sampling which will produce different results each time the algorithm is run (this is seen when running large language models).
11. **Goal uncertainty** – Companies that require groups of people to make decisions (dispatching trucks, trading financial assets, bidding on energy contracts) can exhibit variations because different people emphasize different performance metrics.
12. **Environmental uncertainty** – Here, "environment" might reflect climate, or a political environment (which might impact policies or tariffs), or new management at a company (which results in a change in priorities).

## Examples from selected applications {#examples-from-selected-applications}

It helps to see examples of each of the 12 classes for some of the applications we introduced in Chapter 2. For each application, we describe one or more examples of the uncertainties for each class, noting that simpler applications will not have uncertainties for all 12 classes. It is important to remember that the real goal here is to recognize as many sources of uncertainty as possible. How these uncertainties are reflected in the process of making decisions will come in future volumes.

### Cash management for a mutual fund

A mutual fund has to determine how much cash to keep on hand to meet redemption requests, and as deposits are made, by both individual and institutional investors.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Table 5.1.</span> Uncertainties arising in the mutual fund cash balance problem.</caption>
<thead>
<tr><th>Classes of uncertainty</th><th>Mutual fund cash balance</th></tr>
</thead>
<tbody>
<tr><td>1. Observational uncertainty</td><td></td></tr>
<tr><td>2. Exogenous uncertainty</td><td>Deposits, redemptions, market indices</td></tr>
<tr><td>3. Prognostic uncertainty</td><td>Forecasts of deposits, redemptions, market indices, interest rates</td></tr>
<tr><td>4. Inferential uncertainty</td><td>Estimating how redemptions change with market performance</td></tr>
<tr><td>5. Experimental variability</td><td>Testing different policies for holding cash</td></tr>
<tr><td>6. Model uncertainty</td><td></td></tr>
<tr><td>7. Transitional uncertainty</td><td>Updating how much cash is on hand</td></tr>
<tr><td>8. Implementation uncertainty</td><td></td></tr>
<tr><td>9. Communication errors</td><td></td></tr>
<tr><td>10. Algorithmic instability</td><td></td></tr>
<tr><td>11. Goal uncertainty</td><td>Balancing maximizing investment returns, minimizing stock sales for redemptions</td></tr>
<tr><td>12. Environmental uncertainty</td><td>Changes in interest rates</td></tr>
</tbody>
</table>
</div>

### Finding the best diabetes treatment

Diabetes patients have to manage their blood sugar using a combination of medications (perhaps using an insulin pump) and diet.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Table 5.2.</span> Uncertainties arising in the management of blood sugar.</caption>
<thead>
<tr><th>Classes of uncertainty</th><th>Managing blood sugar</th></tr>
</thead>
<tbody>
<tr><td>Observational uncertainty</td><td>Measuring A1c levels</td></tr>
<tr><td>Exogenous uncertainty</td><td>What a patient eats</td></tr>
<tr><td>Prognostic uncertainty</td><td>Anticipating changes in blood sugar levels after a meal</td></tr>
<tr><td>Inferential uncertainty</td><td>Estimating how a patient's blood sugar responds to medication</td></tr>
<tr><td>Experimental variability</td><td>Changes in blood sugar for different types of medication</td></tr>
<tr><td>Model uncertainty</td><td>Modeling how a patient responds to a type of medication</td></tr>
<tr><td>Transitional uncertainty</td><td></td></tr>
<tr><td>Implementation uncertainty</td><td>Whether a patient follows their physician's instructions</td></tr>
<tr><td>Communication errors</td><td>Whether a patient misunderstands the physician's instructions</td></tr>
<tr><td>Algorithmic instability</td><td></td></tr>
<tr><td>Goal uncertainty</td><td>Balancing blood sugar reduction vs. digestion issues</td></tr>
<tr><td>Environmental uncertainty</td><td></td></tr>
</tbody>
</table>
</div>

### Supply chain management

Supply chains require managing inventories that have to be coordinated across the system.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Table 5.3.</span> Uncertainties arising in supply chain management.</caption>
<thead>
<tr><th>Classes of uncertainty</th><th>Supply chain management</th></tr>
</thead>
<tbody>
<tr><td>1. Observational uncertainty</td><td>Measuring inventory</td></tr>
<tr><td>2. Exogenous uncertainty</td><td>Market demand, weather, transit times</td></tr>
<tr><td>3. Prognostic uncertainty</td><td>Forecasting demands, production, resignations</td></tr>
<tr><td>4. Inferential uncertainty</td><td>Market response to price, machine failure rates</td></tr>
<tr><td>5. Experimental variability</td><td>Simulation errors, testing new materials, test marketing</td></tr>
<tr><td>6. Model uncertainty</td><td>How information spreads in the marketplace, how employees respond to incentives</td></tr>
<tr><td>7. Transitional uncertainty</td><td>Updating inventories</td></tr>
<tr><td>8. Implementation uncertainty</td><td>Failure to follow instructions</td></tr>
<tr><td>9. Communication errors</td><td>Incorrect instructions to suppliers</td></tr>
<tr><td>10. Algorithmic instability</td><td>Variations in optimal solution from production schedules</td></tr>
<tr><td>11. Goal uncertainty</td><td>Differences in priorities toward production cost vs. covering demand</td></tr>
<tr><td>12. Environmental uncertainty</td><td>Changes in tariffs, currency exchange rates, interest rates</td></tr>
</tbody>
</table>
</div>

### Allocating naloxone kits

State agencies have to allocate naloxone kits to meet the needs of local clinics and medical professionals who are treating patients.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Table 5.4.</span> Uncertainties arising in the management of naloxone kits.</caption>
<thead>
<tr><th>Classes of uncertainty</th><th>Management of naloxone kits</th></tr>
</thead>
<tbody>
<tr><td>Observational uncertainty</td><td>The number of naloxone kits in inventory</td></tr>
<tr><td>Exogenous uncertainty</td><td>The number of events requiring uses of naloxone kits</td></tr>
<tr><td>Prognostic uncertainty</td><td>Estimates of changes in patterns of drug use</td></tr>
<tr><td>Inferential uncertainty</td><td>Estimates of how the availability of kits affects their use</td></tr>
<tr><td>Experimental variability</td><td></td></tr>
<tr><td>Model uncertainty</td><td>Understanding how drug use patterns change over time</td></tr>
<tr><td>Transitional uncertainty</td><td>Changes in naloxone kit inventories from week to week</td></tr>
<tr><td>Implementation uncertainty</td><td>Whether kits are used properly; whether instructions to allocate are followed</td></tr>
<tr><td>Communication errors</td><td>Whether field representatives follow instructions in handing out kits</td></tr>
<tr><td>Algorithmic instability</td><td></td></tr>
<tr><td>Goal uncertainty</td><td>Prioritizing who to supply with naloxone kits</td></tr>
<tr><td>Environmental uncertainty</td><td>Availability of funding for naloxone kits</td></tr>
</tbody>
</table>
</div>

### Managing a fleet of trucks

Truckload trucking companies have to determine which loads to move, with what driver.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Table 5.5.</span> Uncertainties arising in the management of a fleet of trucks.</caption>
<thead>
<tr><th>Classes of uncertainty</th><th>Managing a fleet of trucks</th></tr>
</thead>
<tbody>
<tr><td>Observational uncertainty</td><td></td></tr>
<tr><td>Exogenous uncertainty</td><td>New loads from shippers; refused assignments by drivers; traffic delays</td></tr>
<tr><td>Prognostic uncertainty</td><td>Forecasts of loads in the future</td></tr>
<tr><td>Inferential uncertainty</td><td>How the market will respond to changes in spot prices</td></tr>
<tr><td>Experimental variability</td><td>Running simulations of changes in driver allocations</td></tr>
<tr><td>Model uncertainty</td><td></td></tr>
<tr><td>Transitional uncertainty</td><td>Changes in number of available loads; updates to driver availability</td></tr>
<tr><td>Implementation uncertainty</td><td>Whether a dispatcher follows the instruction of the model</td></tr>
<tr><td>Communication errors</td><td>Whether dispatchers follow the instructions of their managers</td></tr>
<tr><td>Algorithmic instability</td><td>Changes in the solution from updates of estimates of driver values</td></tr>
<tr><td>Goal uncertainty</td><td>Balancing empty miles against shipper commitments against getting drivers home</td></tr>
<tr><td>Environmental uncertainty</td><td>Changes in hours-of-service rules by the Dept. of Transportation</td></tr>
</tbody>
</table>
</div>

### Planning an electric power grid

The power grid has to work with utilities to determine which generators should be turned on to meet the anticipated demands placed on the grid.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Table 5.6.</span> Uncertainties arising in the management of the electric power grid.</caption>
<thead>
<tr><th>Classes of uncertainty</th><th>Managing the electric power grid</th></tr>
</thead>
<tbody>
<tr><td>Observational uncertainty</td><td>Estimating temperature, weather, customer attitudes</td></tr>
<tr><td>Exogenous uncertainty</td><td>Changes in weather, generator failures</td></tr>
<tr><td>Prognostic uncertainty</td><td>Forecasts in temperature, wind, cloud cover</td></tr>
<tr><td>Inferential uncertainty</td><td>Estimating how power demand changes as grid prices change</td></tr>
<tr><td>Experimental variability</td><td>Variability in the response to changes in model parameters</td></tr>
<tr><td>Model uncertainty</td><td>Errors in evolution of wind speeds over geographical region</td></tr>
<tr><td>Transitional uncertainty</td><td>Difference between expected wind power and actual</td></tr>
<tr><td>Implementation uncertainty</td><td>Differences between instructions to utilities and what they do</td></tr>
<tr><td>Communication errors</td><td>Errors in understanding of instructions communicated to utilities</td></tr>
<tr><td>Algorithmic instability</td><td>Variations in the performance of the integer programming algorithm</td></tr>
<tr><td>Goal uncertainty</td><td>Balancing the use of nuclear vs. coal vs. renewables</td></tr>
<tr><td>Environmental uncertainty</td><td>Changes in policies for reimbursement of excess solar generation</td></tr>
</tbody>
</table>
</div>

## How uncertainty affects performance

While we have identified 12 classes of uncertainty, there are only three ways that uncertainty affects the behavior of a model:

1. How decisions are made.
2. The performance metrics from the decisions chosen in the model.
3. The evolution of the system in the model after a decision is made, and before the next decisions have to be made.

Then there are the ways that uncertainty affects performance in the field:

<ol start="4">
<li>The decisions that are implemented in the field.</li>
<li>The actual performance metrics for the decisions that are implemented in the field.</li>
<li>The evolution of the system in the field.</li>
</ol>

There are many ways uncertainty affects performance, from random costs to how a patient responds to a drug to the price of an investment. For now, we are just going to focus on identifying how uncertainty affects performance.

## Different forms of uncertainty

The first step in understanding uncertainty requires listing the different sources of uncertainty, as we have done above. The next step, then, is describing the different forms that the uncertainty arises. Below is a sampling of these:

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Hourly energy output from solar over an entire year, demonstrating both with-day and seasonal variability." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 5.1.</span> Hourly energy output from solar over an entire year, demonstrating both with-day and seasonal variability.</figcaption>
</figure>

- **Fine-grained variability** – This might arise at time scales of seconds (even fractions of a second), minutes, hours, or daily. Examples of fine-grained variability are:
  - High-frequency trading in finance - These decisions are made several times per second.
  - Frequency regulation for the power grid - These are signals sent every two seconds to generators to make adjustments so that the power voltage stays within a narrow range.
  - Hourly sales of different restaurant food choices which may require some preparation in advance of service.
  - The hourly variations in wind speeds, shown in figure 5.1. This figure would also capture hourly to daily variations in cloud cover, all in the context of predictable seasonal variations.
  - Daily sales of a retail product.
  - Daily to weekly variations in hospital admissions with the flu.

- **Shifts** – The fine-grained variability of a process typically represents variations around a mean, but there are times when the mean will shift. Examples are:
  - The random demands for a retail product may shift as a result of a change in pricing for either the product, or a competitive product.
  - The rate of hospital admissions for an infectious disease will shift as the disease moves through a population near the hospital.
  - The demands for redemptions from a mutual fund, which vary by the minute, will shift when the broader stock market responds to a changing economy.
  - The number of people making bids on houses (say, for a given realtor), will shift to different levels as interest rates change.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/Bursts.png" alt="Illustration of bursts of activity." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figure 5.2.</span> Illustration of bursts of activity.</figcaption>
</figure>

- **Bursts, intermittent demands** – These describe patterns where there is little or no activity, but then undergoes a burst until it dies down again (see figure 5.2). Examples of bursts include:
  - Spread of diseases such as measles – When a disease enters a region, there will be a period of increased infections as the disease moves through the most vulnerable part of the population.
  - A product may not be selling, until someone happens to buy it and then spreads the word when they have a good experience. This will spread through their network until it is saturated.

- **Spikes** – A process may reflect two driving sources. One produces modest outcomes from a well-defined distribution. The second represents infrequent outcomes that are much larger than the first distribution. For example:
  - The price of electricity on the grid is updated every 5 minutes. Figure 5.3 shows real-time grid prices for the month of February. It shows a steady sequence of random changes, with occasional spikes that are much larger than the typical variations.
  - A storm creates a rush of purchases of milk, eggs and toilet paper.
  - A storm system moving past an airport can result in a number of flight cancellations, which in turn can create a large number of last-minute requests for hotel rooms.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/RealTimePricesFebruary.png" alt="Real-time electricity prices, updated every five minutes, in February, illustrating extreme volatility.">
  <figcaption><span class="fig-num">Figure 5.3.</span> Real-time electricity prices, updated every five minutes, in February, illustrating extreme volatility.</figcaption>
</figure>

- **Spatial events (weather, diseases, regulatory)** – There are numerous examples of random processes that are regional in nature. Some examples are:
  - Weather – Storms can create a range of random events in a region that has been struck by bad weather, or where bad weather is forecast.
  - Diseases – Since disease propagation often requires physical contact, outbreaks typically follow a regional pattern.
  - Regulations – Changes in regulations typically follow political boundaries, which could be for a country, or a state, district or province within a country.
- **Systemic events** – These are events that can affect an entire company (spanning international boundaries), an entire country, or even have a global impact, such as:
  - Cyberattacks, which can impact information flows for an entire company.
  - Public perception – Public events can produce rapid positive or negative perceptions of a company. For example, a beer company undertook a campaign to promote the LGBTQ community, which produced a sudden backlash by their conservative customers which impact sales across the company.
- **Rare events** – Rare events can arise from a number of sources such as earthquakes, disease outbreaks, or terrorist attacks. These tend to be recognized events that occur quite rarely, but which can have a major impact on an organization when they do happen.
- **Contingencies** – This category refers to events that might happen, but for which there is no history. For example, grid operators will plan for a failure of nuclear power plants. While this may not have ever happened within a country, the grid operator may still want to prepare for the event if it does happen.

## Seasonality

A different form of variability is captured under the general term "seasonality" which comes in various forms:

- **Daily cycles** – Also known as diurnal cycles, these are all ultimately traced to solar cycles, but these can induce strong daily patterns in human activities. Daily cycles are typically discretized into hours, but finer discretizations (5 minutes, 1 minute) can arise.
- **Day of week** – This reflects the daily patterns in human behavior set around the different days of the week.
- **Hour of week** – Hourly patterns may easily depend on the day of week as well as hour of day to capture effects such as Monday morning, Friday afternoon, and daily patterns on weekdays versus weekends.
- **Week of month** – Manufacturing often has a push to maximize production by month, creating an incentive to push product out before the end of the month. This creates a surge toward the end of the month, followed by a lull.
- **Month of year** – This captures the familiar seasonal patterns of winter, spring, summer and fall.
- **Week of year** – Seasonal changes can occur within a month, encouraging the use of week-of-year as a seasonal time increment.

Figure 5.4 (left) shows solar energy production over the course of a week, illustrating both the familiar and highly predictable pattern created by the sun, which is interfered by the highly stochastic presence of cloud cover. Figure 5.4 (right) shows hourly solar energy over the entire year, where we can clearly see the reduction in solar energy during the winter season.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DailyAnnualSolarEnergy.png" alt="Daily solar energy over a week (left), and annual solar energy (right).">
  <figcaption><span class="fig-num">Figure 5.4.</span> Daily solar energy over a week (left), and annual solar energy (right).</figcaption>
</figure>

## Creating beliefs

If we are modeling uncertainty on the computer, we have to find a way to represent it. Below are several popular strategies.

- Historical data may be used to fit a known probability distribution – There is an entire family of probability distributions we can use to fit to historical data, the best known being the normal distribution. We return to this rich topic later.
- Use historical data to create a sampled belief model – Imagine we have travel times ranging from 50 to 80 minutes for a trip, depending on the traffic. We can use any of several probability distributions to represent this uncertainty, or we may simply use a sample of past observations, such as:

  > (52, 63, 78, 59, 71, 68)

- Use historical data to create a quantile distribution from which samples can be drawn – Assume we have a sample of 10 observations of electricity prices, given in figure 5.5 (left). After sorting the prices from smallest to largest, we then show the cumulative probability given in figure 5.5 (right). So, we would say that 60 percent of the observations are \$86.33 or lower. These are then plotted in the cumulative distribution on the right.

  It is also possible to manually create a cumulative distribution using judgment.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/EmpiricalCDF.png" alt="Computing an empirical CDF from a set of observations.">
  <figcaption><span class="fig-num">Figure 5.5.</span> Computing an empirical CDF from a set of observations.</figcaption>
</figure>

- Use manually created outcomes to represent events that might happen – When we do not have data, we can simply make up possible outcomes. For example, we may be shipping product from Taiwan, which normally takes four weeks. However, we can envision various forms of delays, from hurricanes to backups at the Suez Canal, labor problems at ports or even terrorist attacks. We might feel that we have to allow for the possibility that the shipment might take as long as nine weeks, and then plan for this contingency.

## The problem of correlations

The previous section is a brief snapshot of ways of representing the uncertainty in an estimate. However, once we go down the road of recognizing uncertainty, we have to face the far more complex issue of correlations.

It helps to have some examples of information processes in mind to illustrate different forms of correlation. Assume we might be considering any of the following streams of data:

1. Customers purchasing a retail product across many sales locations.
2. The lead time from placing an order and receiving it.
3. The energy generated from a wind farm.
4. The rate of new infections from the latest strain of flu.
5. The number of truckload movements tendered by a customer to different locations.

These are just a small handful of the types of information streams we will have to deal with. Below we use these examples to talk about three different types of correlations:

- Correlations over time.
- Correlations over geography.
- Correlations over attributes.

### Correlations over time

All sequential decision problems involve the element of time, which may be at virtually any time scale, from seconds, minutes, hours, and days to weeks, months and even years.

Correlation over time can arise in each of our five problem settings as follows:

1. An incoming snow storm can create a surge in demand for snowblowers; negative publicity can create a period of reduced demand.
2. A port strike can create backlogs that increase unloading times for months.
3. Rain storms can create periods of increased wind generation that may last for days.
4. As a virus enters a region, it will create a period of elevated infections that can last from weeks to months.
5. If a plant is shut down for maintenance, there may be a drop in loads out of a location for a week.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/CrossingTimes.png" alt="Actual vs. forecast, showing crossing times.">
  <figcaption><span class="fig-num">Figure 5.6.</span> Actual vs. forecast, showing crossing times.</figcaption>
</figure>

Figure 5.6 illustrates how the energy generated from wind may exceed, or fall below, the forecast over a period of time as weather systems move through a region. It is important that we replicate not just the error between actual and predicted, but also the amount of time we stay above or below the forecast, a quantity known as the "crossing time."

It is fairly common for random signals to be viewed as variations from a base mean, which is usually treated as a constant which has to be estimated. In reality, the "base mean" may also be varying, but on a different time scale. For example, customers walking into a retail store represent random outcomes on a fine time scale, since the behavior of each customer is independent. But they may be responding to market signals (advertising, word-of-mouth) that is also changing, but more slowly.

Arguably the biggest challenge with correlation over time is that it can occur at multiple time scales, at the same time. Independent events (such as how many people come into a store each hour requesting cough medicine) are quite easy to model. The variations that happen on longer time scales are harder because they create what appear to be correlations across time at smaller time scales.

### Correlations across geography

Customer purchase decisions, disease outbreaks, and weather are all examples of random processes that vary geographically. Sometimes political boundaries may limit the correlations, but most of the time it is simply distance that governs the strength of the correlation.

Spatially distributed processes typically occur in very high dimensions (there are a lot of spatial locations!). What simplifies geographical correlations is that it is typically fairly easy to capture. Geography may be a pure function of distance, but it can also reflect geographical boundaries as well as population movement patterns. Fortunately, there are powerful mathematical tools help identify and capture these correlations.

Correlation across geography can arise in each of our five problem settings as follows:

1. The surge in demand for snowblowers will also be regional since it is responding to snowstorms (which are regional).
2. A port delay can produce reduced supplies in the region served by the port, with higher correlations for points closer to the port.
3. Rainstorms are also regional, and will create surges in energy from wind farms in the areas affected by the storm. Similarly, hot spells (which are also regional) will produce periods of low wind.
4. The spread of flu will be regional since it passes between people who are close to each other.
5. Freight is generated either by changes in a manufacturing plant (which is located at one point) or changes in demand, which may be driven by regional forces.

### Correlations across attributes

Most of our examples involve activities that are characterized by a set of attributes:

1. Demand for clothing will have correlations between garments with similar style but different colors.
2. Products that share common inputs (such as materials for clothing, chips for cars, rare earths for motors) may exhibit similar lead time delays when there is a shortage of the input.
3. (No apparent use of correlation across attributes for wind energy.)
4. New infections may be correlated across people who share features such as age or medical conditions.
5. The flow of truckload movements can be correlated when they are moving common commodities or products.

It is often the case that when we expand all the attributes, we find ourselves with so many combinations that the number of observations for a particular combination of attributes may be quite small, and possibly zero. These problems lend themselves to the use of hierarchical estimation methods, where we create different time series by neglecting one or more attributes, and then using weighted combinations.

## Exercises

**Review questions**

<ol class="book-exercises">
<li>Name the 12 classes of uncertainty, giving one example of each from any application.</li>
<li>Name seven forms of uncertainty that can describe random processes, and describe a context that might produce each one.</li>
<li>What are the ways that uncertainty can impact the performance of a system, and give an example of each.</li>
<li>Name four forms of seasonality.</li>
<li>Create a cumulative distribution of wind speeds from the following observations:
<p>(17, 8, 2, 12, 9, 28, 10, 8, 35, 12, 15)</p>
</li>
</ol>

**Modeling questions**

<p>For each of the questions below, try to find as many forms of uncertainty within each of the classes for the following settings, following the tables given in the <a href="#examples-from-selected-applications">section above</a>.</p>

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>The inventory planning problem in <a href="/bridging-vol1/chapter-2/#inventoryplanning">Chapter 2</a>.</li>
<li>The furniture demand management problem in <a href="/bridging-vol1/chapter-2/#demandmanagementfurniture">Chapter 2</a>.</li>
<li>Planning clinical trials in <a href="/bridging-vol1/chapter-2/#clinicaltrials">Chapter 2</a>.</li>
<li>Running a presidential election in <a href="/bridging-vol1/chapter-2/#presidentialelection">Chapter 2</a>.</li>
<li>Supply chain finance in <a href="/bridging-vol1/chapter-2/#supplychainfinance">Chapter 2</a>.</li>
<li>Choose a problem setting of your own, ideally one with some complexity, and identify as many types of uncertainty using the 12 classes as a guide.</li>
</ol>
{% endraw %}
