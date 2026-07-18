---
layout: book
book_data: sdam_toc
book_home: /sdam/
title: "Chapter 10: Supply chain management I: The two-agent newsvendor problem"
permalink: /sdam/chapter-10/
date: 2026-07-17
---

{% raw %}
## Chapter overview

A common problem that arises in any supply chain management problem is that you have managers ("agents") who need resources, and have to ask higher level managers for these resources. In practice, these "field" managers never know exactly how much they will need, and tend to ask for extra to avoid the significant downside costs of running out. The "central" managers want the field managers to have what they need, but are aware of their incentive to ask for too much. The central managers, then, tend to cut back on these requests in an effort to give the field managers only what they need.

Both of these managers have their own "newsvendor problem" which we first saw in [Chapter 3](/sdam/chapter-3/). However, now we have two "newsvendors" who are playing off each other, since each needs to create an approximation of how the other will behave. This problem arises throughout businesses, and yet does not seem to have attracted any attention in the research literature.

This problem requires we dip our toe in the water of modeling multiagent problems. We use the standard modeling framework we have been applying up to now, with the twist that we now create a version of these models for each decision-making agent. However, aside from introducing a richer set of interactions, the application of the universal modeling framework to each agent remains the same.

## Narrative

Imagine that a field manager for Amazon has to provide trailers to move freight out of Chicago on a weekly basis. The field manager has access to information that allows him to estimate how many trailers he will need that week, but the actual might be higher or lower. The field manager then makes a request to a central manager for trailers, who then makes a judgment on her own how many trailers to provide, and makes the final decision on the number of trailers that will be provided.

The two managers both work for the same company, but the field manager is far more worried about running out, since he has to do short-term rentals if he runs out of trailers. The central manager, on the other hand, does not want the field manager to run out, but she also does not want him to have excess trailers, since she has to pay for those trailers.

We assume the process unfolds as follows:

**Step 1:** The field manager observes an initial estimate of how many trailers are needed. This information is private to the field manager.

**Step 2:** The field manager then requests trailers from the central manager, where he would typically inflate his request to reduce the probability of running out.

**Step 3:** The central manager then decides how many trailers to give to the field manager, typically reducing the request given the pattern of noticing that the field asked for more than was necessary.

**Step 4:** The field manager receives the number of trailers granted by the central manager, and then observes the actual need for trailers.

**Step 5:** The field and central managers compute their performance using their own costs for overage (the unused trailers) and underage (the uncovered demand).

The tension in this problem arises first because the initial estimate of trailers needed is just an estimate, which we may assume is unbiased (that is, it is true on average). The problem is that the field manager has a large cost if he runs out, so his strategy is to overestimate his needs (recall the newsvendor problem in [Chapter 3](/sdam/chapter-3/)). The central manager, on the other hand, probably has balanced costs for being over and under, and does not want to order too many or too few.

What complicates the problem is the initial estimate given to the field manager. While not perfect, it has valuable information since it will indicate if a day is going to have high or low demand. This means that the central manager has to pay attention to the request made by the field manager, while recognizing that the field manager will make requests that are biased upward. Knowing this, the central manager would tend to use the field manager's request as a starting point, but then reduce this for the final allocation. Not surprisingly, the field manager knows that the central manager will do this, and compensates accordingly.

## Framing the problem

The answers to our three framing questions are:

- **Metrics:** Each agent has their own metric which involves minimizing the expected cost of being under and over.
- **Decisions:** The field agent decides how much to request from the central agent. The central agent decides how much of the field agent's request to satisfy.
- **Uncertainties:** The core uncertainty is the actual demand for resources in the field. Then, the field agent has to deal with the uncertainty of how the central agent will respond to their requests, and the central agent has to deal with the uncertainty of how much the field agent will request, which reflects private information.

## Basic model

We will model the problem for both agents, since the information is not the same for both players. Throughout the model, we will be referring to the field manager as $q$ and to the central manager as $q'$.

### State variables

The initial information available to the field manager is the estimate of the number of trailers that will be needed, which we represent using $R^{est}_{tq}$, the initial estimate of how many trailers are needed. This initial estimate may be biased, so we introduce an estimate of this bias using $\delta^{est}_{tq}$, the initial estimate of the difference between $R^{est}_{tq}$ and the true demand. We will also have to estimate how much the central manager reduces the request of the field manager, which we represent using $\delta_{tq}$, the estimate of how much the central manager will reduce the request of the field manager. Similarly, the central manager will learn the difference between the request made by the field manager and what the field manager eventually needs, which we represent by $\delta_{tq'}$, the estimate of the difference between what the field manager requests and what the field eventually needs.

The state variable for each agent is the information they have before they make a decision. For the field manager, the state variable is

$$
S_{tq} = (R^{est}_{tq}, \delta^{est}_{tq}, \delta_{tq}).
$$

The state variable for the central manager is

$$
S_{tq'} = (x_{tqq'}, \delta_{tq'}).
$$

where $x_{tqq'}$ is the request made by the field agent $q$ to the central manager $q'$ (introduced next).

### Decision variables

The decisions for each agent are given by $x_{tqq'}$, the number of trailers that agent $q$ asks for from agent $q'$, and $x_{tq'q}$, the number of trailers that agent $q'$ gives to agent $q$, which is what is implemented in the field.

### Exogenous information

The exogenous information for the field manager can be thought of as the initial estimate of the trailers needed (although we put that in the state variable): $R^{est}_{tq}$, the initial estimate of how many trailers are needed. This estimate is known only to the field agent $q$.

After making the decision $x_{tqq'}$, we then receive two types of information: what the central manager grants us, and then the actual required demand: $x_{tq'q}$, the decision made by the central manager in response to the request of the field manager; and $\Rhat_{t+1}$, the actual number of trailers that field manager $q$ ends up needing (this information is available to the central manager as well).

The exogenous information for agent $q$ is then

$$
W_{t+1,q} = (x_{tq'q},\Rhat_{t+1}).
$$

We note in passing that while this information is indexed at time $t+1$, the request granted by the central manager, $x_{tq'q}$, is indexed by $t$ since it depends on information available up through time $t$. The initial estimate $R^{est}_{tq}$ is new information, but it arrives before the decision is made so it is captured in the state variable for the field agent.

The central manager receives the initial request $x_{tqq'}$ which arrives as exogenous information, but because this is received before she makes her decision, it enters through the state variable for the central manager. The only exogenous information for the central manager is the final demand which might then be used to update beliefs that influence future decisions. This means

$$
W_{t+1,q'} = (\Rhat_{t+1}).
$$

### Transition function

For the field manager, there are three state variables: $R^{est}_{tq}$, the bias $\delta^{est}_{tq}$ between the estimate $R^{est}_{tq}$ and the actual $\Rhat_{t+1}$, and the bias $\delta_{tq}$ introduced by the central manager when the field makes a request. The first state variable, $R^{est}_{tq}$, arrives directly as exogenous information. The biases $\delta^{est}_{tq}$ and $\delta_{t,q}$ are updated using

$$
\delta^{est}_{t+1,q} =  (1-\alpha) \delta^{est}_{tq}   + \alpha (\Rhat_{t+1} - R^{est}_{tq}), \qquad \delta_{t+1,q} = (1-\alpha) \delta_{tq}  + \alpha (x_{tqq'} - x_{tq'q}),
$$

where $0 < \alpha < 1$ is a smoothing factor.

The transition function for the central manager is similar. Again, the decision of the field manager, $x_{tqq'}$, arrives to the state variable exogenously. Then, we update the bias that the central manager estimates in the request of the field manager using

$$
\delta_{t+1,q'} = (1-\alpha) \delta_{t,q'}  + \alpha (x_{tqq'} - \Rhat_{t+1}).
$$

### Objective function

We begin by defining $c^o_q$, the unit cost incurred by the field manager for each excess trailer (what the field pays per day for each trailer), also known as the overage cost; $c^u_q$, the unit cost incurred by the field manager for each trailer that has to be rented to make up for lack of capacity, also known as the underage cost; and $c^o_{q'}, c^u_{q'}$, the cost of overage and underage for the central manager.

The costs for each agent are given by

$$
C_{tq}(S_{tq},x_{tq'q}) = c^o_q \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q} \max\{\Rhat_{t+1} - x_{tq'q},0\},
$$

$$
C_{tq'}(S_{tq'},x_{tq'q}) = c^o_{q'} \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q'} \max\{\Rhat_{t+1} - x_{tq'q},0\}.
$$

The performance of both the field and central managers depends on the number of trailers $x_{tq'q}$ that the central manager gives to the field. This decision, however, depends on the decision made by the field manager.

The decisions of the field manager are made with the policy $X_{tq}(S_t\vert \theta_q)$, where $\theta_q$ is one or more tunable parameters that are used to solve

$$
\begin{align}
\min_{\theta_q}\E \left\{\sum_{t=0}^T C_{tq}(S_{tq},X_{tq}(S_t\vert \theta_q))\vert S_0\right\}.  \label{eq:fieldobjective}
\end{align}
$$

Similarly, the decisions of the central manager are made with the policy $X_{tq'}(S_t\vert \theta_{q'})$ where $\theta_{q'}$ is one or more tunable parameters that solve

$$
\begin{align}
\min_{\theta_{q'}}\E \left\{\sum_{t=0}^T C_{t{q'}}(S_{tq'},X_{tq'}(S_t\vert \theta_{q'}))\vert S_0\right\}. \label{eq:centralobjective}
\end{align}
$$

The optimization problems in $\eqref{eq:fieldobjective}$ and $\eqref{eq:centralobjective}$ have to be solved simultaneously, since both policies have to be simulated at the same time. Of course we could hold $\theta_{q'}$ for the central manager constant while tuning $\theta_q$ for the field manager, but ultimately we are looking for a stable local minimum.

## Modeling uncertainty

This problem is data-driven, which means that we react to data as it arrives. There are three types of information, depending on which agent is involved:

- The initial estimate $R^{est}_t$ of the resources required.
- The request $x_{tqq'}$, made by the field manager, that arrives to the central manager. This decision involves logic introduced by the field manager, which may include randomization. This comes as information to the central manager.
- The decision $x_{tq'q}$ made by the central manager that determines the number of trailers given to the field manager. This comes as information to the field manager.
- The final realization $\Rhat_{t+1}$ of the number of trailers actually required, which is revealed (in this basic model) to both agents.

If we wish to simulate the process, we only need to model the generation of $R^{est}_t$ and $\Rhat_t$. More precisely, we would have to generate $R^{est}_t$ from one distribution, and the error $\Rhat_t - R^{est}_t$ from another distribution.

## Designing policies

For our two-agent newsvendor problem, we have to develop policies for each agent. We begin with the policy for the field manager.

### Field manager

The field manager starts with an estimate $R^{est}_t$, but has to account for three factors:

**1)** The estimate $R^{est}_t$ may have a bias $\delta^{est}$ (we cannot be sure about the source of the estimate $R^{est}_{tq}$). The bias is given by

$$
\delta^{est}_{tq}= \E \Rhat_{t+1} - R^{est}_{tq}.
$$

So, if $\delta^{est}_{tq} > 0$ then this means that $R^{est}_t$ is upwardly biased.

**2)** The true number of trailers needed, $\Rhat_{t+1}$, is random even once you have factored in the bias. The field manager has a higher cost of having too few trailers than too many, so he will want to introduce an upward bias to reflect the higher cost of being caught short.

**3)** The central manager has a balanced attitude toward having too many or too few, and knows about the bias of the field manager. As a result, the central manager will typically use the request of the field manager, $x_{tqq'}$, just as the field manager may be adjusting for a possible bias between the estimate $R^{est}$ and the actual $\Rhat_t$. The field manager knows that the central manager will be making this adjustment, and as a result has to try to estimate it, and counteract it. Since the field manager knows both his request $x_{tqq'}$ and then sees what the central manager provides, the time $t$ observation of the bias is given by

$$
\delta_{tq} =  x_{tq'q} - x_{tqq'}.
$$

We need to use our estimates of the differences between $R^{est}_t$ and $\Rhat_t$, the difference between $x_{tqq'}$ and $x_{tq'q}$, and the difference between $x_{tqq'}$ and $\Rhat_t$. We propose a policy for the field manager given by

$$
\begin{align}
X_{tqq'}(S_t\vert \theta_q) = R^{est}_t - \delta^{est}_{t-1,q} - \delta_{t-1,q}  + \theta_q. \label{eq:fieldpolicy}
\end{align}
$$

This policy starts with the initial estimate $R^{est}_t$, corrects for the bias in this initial estimate using $\delta^{est}_{t-1,q}$, then corrects for the bias from the central manager $\delta_{t-1,q}$, and then finally introduces a shift that can capture the different costs of over and under for the field manager. The parameter $\theta_q$ has to be tuned.

Since there is not an embedded optimization problem (that is, an $\argmax_x$ or $\argmin_x$), this is a classic parameterized policy function approximation (PFA).

### Central manager

Our policy for the central manager is given by

$$
X_{tq'q}(S_t\vert \theta_{q'}) = x_{tqq'} - \delta_{t-1,q'} + \theta_{q'}.
$$

Here, we start with the request made by the field manager, subtract our best estimate of the difference between the field manager's request and what was eventually needed, $\delta_{tq'}$, and then add in $\theta_{q'}$ which is a tunable parameter for the central manager, where $\theta_{q'}$ may be negative.

### Policy search

We now have two parameterized policies. The tuning of the field policy would be done with the objective function in $\eqref{eq:fieldobjective}$, while the tuning of the central policy would be done with the objective function in $\eqref{eq:centralobjective}$. The trick here is that both objectives have to be simulated in parallel, since the policies are interconnected. And while both simulations are running, we are keeping track of the objectives for each agent.

The right way to approach the optimization of the parameters of each agent is to simulate the behavior of both agents simultaneously, but run search algorithms for each agent as if they were separate. The performance of the field agent, for example, would be affected by the behavior of the central agent just as the field agent is affected by the other forms of exogenous information.

This simulation provides an opportunity to explore how the decisions of each agent may *change* the behavior of the other agent. We pursue this more in the exercises.

## What did we learn?

- We introduce a basic multiagent problem we call the "two-agent newsvendor problem" where a field agent has to request resources from a central agent. While both agents are supposed to be working together, they each have their own costs of overage (having too many resources) and underage (having too few, producing unsatisfied demands).
- We model information that is private to the field agent and information that is private to the central agent.
- The problem introduces the dimension of estimating and anticipating the behavior of the central agent to help the field agent make decisions.
- At each point in time, the field agent has a best estimate of what he wants to order given the estimate $R^{est}_{tq}$ and the history of the central agent adjusting the request. Given the uncertainty and the higher cost of running out than having excess, it is natural to expect that a good policy is to order what we expect to need plus a buffer for uncertainty, so we start by suggesting policies of this form.
- This problem lays the foundation for building in a belief of how the central agent will respond to the adjustment being made by the field agent, since we assume that she ultimately sees the overage or underage.
- While this problem seems quite simple, it lays the foundation for many more complex multiagent resource allocation problems.

## Exercises

**Review questions**

<ol class="book-exercises">
<li>What is known by agent $q$ but unknown by agent $q'$? Similarly what is known by agent $q'$ but unknown by agent $q$?</li>
<li>There is one piece of information that is made available to both agents. What is this?</li>
<li>What is the exogenous information that becomes available to the field agent? What is the exogenous information that becomes available to the central agent?</li>
<li>There are three sources of uncertainty in our system. What are they?</li>
</ol>

**Problem solving questions**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Write out the dynamic models for both the field manager and the central manager. Remember that the decision of one manager becomes exogenous information for the other.</li>
<li>What would happen if the field agent simply orders larger and larger quantities? What mechanism could be introduced to the model to minimize this instability?</li>
<li>Create an estimate of how the field agent's decision, $x_{tqq'}$, might affect the behavior of the central agent. Then, design a policy that captures this effect so that the decision made by the field agent anticipates the effect of his decision.</li>
<li>There is just one piece of information that can be used to create a belief about the policy of another agent. What is that information?</li>
<li>Now assume that the field agent gets to sell the resources he obtains from the central agent at a price $p_{tq}$ that changes randomly from one time to the next. This means that the field agent could hold some or all of its resources to a later time period if the price $p_{tq}$ is too low. Expand the model in this chapter to handle this much richer setting. You will need to introduce a new decision variable (how much of the demand to satisfy). Suggest a policy function approximation for making the decision.</li>
</ol>

**Programming questions**

These exercises use the Python module *TwoNewsvendor* on [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Perform a grid search on the bias for the field and central managers. Search over the range $[0,10]$ (in steps of 1) for the field manager, and $[-11,0]$ (in steps of 1) for the central manager. Run the game for $N = 30$ time periods, and repeat simulation for 1,000 samples (and take an average). Note that you are adding rewards over the 30 time periods, but averaging over the 1,000 samples. Plot three heat maps for the following:
  <ol type="a">
    <li>The total reward for the field manager, for each of the combinations of the two biases.</li>
    <li>The total reward for the central manager, for each of the combinations of the two biases.</li>
    <li>The total reward for the company (adding the field manager and central manager), for each of the combinations of the two biases. Discuss the differences in the optimal combinations from each of the three perspectives. Each player wants to maximize its reward.</li>
  </ol>
</li>
<li>Now we are going to use the interval estimation learning policy to learn each of the biases (see the discussion of policies in [Chapter 4](/sdam/chapter-4/)). Let $\theta^{IE}_q$ be the parameter for the IE policy for the field manager, and let $\theta^{IE}_{q'}$ be the parameter for the IE policy for the central manager. Instead of searching for the best bias, we are going to search for the best parameter to guide the policy for finding the bias.
  <ol type="a">
    <li>Run the Python module varying each learning parameter over the range $(0, 1, 2, 3, 4, 5)$. This means 36 total simulations (over a horizon $N = 20$, and for 1,000 sample paths). Plot the same three heat maps that you did for exercise 10.</li>
    <li>Compare the behavior of the heat maps from part (a), to the heat maps from exercise 10. Try to explain the behavior of the field and central agents by writing out the policies and thinking about how it should behave.</li>
    <li>Verify that the direct search for the bias gives the highest overall reward. What are the strengths and weaknesses of each approach in a more realistic setting where the parameters of the problem may change over time?</li>
  </ol>
</li>
<li>(This exercise requires some modifications to the Python module.) Consider now a two-agent newsvendor problem where the central manager also has some external information about the demand. What he has is a much noisier estimate of the demand (say the noise is, for our spreadsheet data where the demand is always between 20 and 40, three times bigger than the noise from the source communicating with the field manager).

Redefine the bias from the central manager as the quantity that he adds to the estimate he gets. Try a learning approach where the bias he selects is chosen in the interval $[-11, 0]$. Run the program and compare the results with the old learning process. As before, run the game for $N = 30$ time periods, and repeat the simulation for 1,000 samples (and take an average). After $N = 30$ time periods, is the central agent putting more weight on the information coming from the field or from his other external source of information? Why?</li>
<li>Consider the case where the field manager is using a learning approach and the central manager is using a punishing strategy. Since he knows the field gets a bigger penalty for providing less than the demand, the central manager will compute the previous field bias (for time $t-1$) and if it is positive, next round, it will apply a bias twice as big in magnitude and of opposite sign to the field's request. Run this experiment and see what the field's bias will be after the 30 time periods. Comparing this policy with the previous policies, should the central manager employ this strategy?</li>
</ol>
{% endraw %}
