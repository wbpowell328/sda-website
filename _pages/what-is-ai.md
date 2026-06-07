---
layout: page
title: "What is AI?"
permalink: /what-is-ai/
date: 2019-04-15 11:25:06
---

{% raw %}
Warren B Powell - Princeton University

([I welcome comments on the thoughts on this webpage - Please enter them here](http://tinyurl.com/whatisaicomments).)

There are a lot of articles appearing about "What is AI" (along with "What is machine learning" and "What is reinforcement learning") that talk about these terms using vague language ([see the article from BBC Future that proposes to use "reinforcement learning" to solve dynamic resource allocation problems.](http://www.bbc.com/future/story/20190606-the-maths-problem-that-modern-life-depends-on)). This web page discusses these topics in more concrete terms, but with minimal mathematics.

There are three approaches computers can use to exhibit intelligence:

1\) **Rule-based logic** - This was the original form of "artificial intelligence" in the 1960's and 70's, but it is still used today. "If furniture has four legs and a seat, it is a chair" or "if the credit score is over 600, grant the loan" are simple examples. In a health context, the attributes of a patient are more complicated ("if patient is male, and if a smoker, and if over 50, and if \... and if \... then order treatment X"). If the input data (for the "if" statements) has more than three or four dimensions, the rule becomes quickly intractable. This is the reason that "rule-based AI" failed, but we note that simple business rules remain widely used today in virtually all systems.

2\) **Making estimates using data from the environment** - This is the domain of machine learning, also known as statistics, statistical learning and, more broadly, data sciences. It helps to divide this into two broad classes:

- Supervised learning - This is the domain of "big data" where a large training dataset consisting of input-response (such as, faces with names - the machine learning community refers to the "response" as labels) is used to train a machine learning model.
- Unsupervised learning - Here we cluster input data (such as attributes of patients or customers) but without access to labels/responses.

3\) **Making decisions that interact with the environment** - Decisions involve a controllable quantity, and a metric that evaluates the performance of the decision. These arise in both static and sequential settings. Algorithmic strategies for making decisions are quite rich, but for this discussion it is useful to identify the following classes of methods:

- Rule-based logic - We can use rules to make decisions, such as "if a patient has these symptoms, then apply this treatment."
- Deterministic optimization - Powerful solvers for high-dimensional problems known as linear programs (where quantities can be continuous) emerged in the 1990s, followed by breakthroughs for integer programs \~2000. These are widely used in static planning problems such as airline scheduling.
- Reinforcement learning - These methods emerged in the 1980's in the context of describing how a mouse finds its way out of a maze, and was ultimately applied to the Chinese game of Go. It has been primarily applied to "single entity" problems such as controlling robots, playing games, or guiding a physician, as opposed to more complex resource allocation problems.
- Stochastic optimization - This is an umbrella term for a wide range of modeling and algorithmic strategies for solving decision problems in the presence of uncertainty. The problem domain is so rich it has been studied by over 15 distinct research communities, spanning problems from optimal stopping to high-dimensional resource allocation problems. Recently, we have pulled these together into a single, unified framework that draws on the tools of deterministic optimization, machine learning and simulation ([see the jungle of stochastic optimization](http://jungle.princeton.edu)).

**Making estimates using data from the environment**

Estimation come in three flavors:

a\) **Classification** - e.g. identifying the name of a person from an image, words being spoken, or the identity of a song from a recording. This tends to have right vs. wrong answers.

b\) **Inference** - For example, estimating the deterioration of a piece of machinery, or inferring the number of people infected by a disease. Inferences typically imply some error in our estimation of an unknown truth, where we wish to minimize some measure of the errors.

c\) **Prediction** - These are estimates about the future, such as the amount of snowfall or the movement of a stock price.

In all three cases, we have observable (input) data *x* (such as an image, the characteristics of a patient, or a history of stock prices) from which we wish to make inferences about something that is not known (or observable) to us right now (the identity of the image, diagnosing a disease, or future stock prices).

While these are different settings, they all require the same machinery of statistical modeling (all forms, not just neural nets).  Central to making inferences is that you have some model $$f(x|\theta)$$ where "*x*" is a set of known inputs (for example, prices), and $$ f(x|\theta) $$ is a function that predicts a response *y* (such as the observed sales at price *x*).  Imagine that you have a set of inputs (prices) $$x^1, \..., x^N$$, and the corresponding responses (observed sales) $$y^1,\...,y^N $$ . For our sales problem, we might use the function

$$ Sales = f(x|\theta) = \theta_0 - \theta_1 x$$

which captures the behavior that higher prices produce lower sales. This is an example of a *parametric function*. For more complicated functions, we might use any of a family of models, including neural networks, but these require very large datasets of inputs $$x^1,\...,x^n$$ and observations $$y^n$$ to fit the model. If we use a neural network to model demand as a function of price, it is entirely possible (in fact, likely) that the estimated demand will rise and fall even as prices are increased.

We then want to find the function $$f(x|\theta)$$, and the parameters $$\theta$$, that solves the model fitting problem

$$ \min_\theta \sum_{n=1}^N [y^n-f(x^n|\theta)]^2$$.

But to determine the best function $$f(x|\theta)$$, and to find the best $$\theta$$, you need a set of these responses $$y^n$$. This is known as *supervised learning*.

Statistical models can be classified under three headings:

1.  **Lookup table** - Here "*x*" is discrete (e.g. the gender of a patient) or discretized (e.g. the blood sugar of a patient). A lookup table requires a different estimate (or classification) for each value of "*x.''* "*x*" may have multiple dimensions (age, gender, ethnicity) in which case the number of possible values of "x" can grow dramatically - this is the classic "curse of dimensionality."
2.  **Parametric models** - A simple linear parametric model might write demand as a function of price using $$D(p|\theta) = \theta_0 - \theta_1 p + \theta_2 p^2$$. More complex functions might be nonlinear in the parameters such as $$D(p|\theta) = \theta_0 e^{-\theta_1 p}$$. Neural networks are a type of nonlinear model, but typically with a *lot* of parameters, which means they need a lot of data.
3.  **Nonparametric/locally parametric** - This is a class of advanced models that includes deep neural networks, but could also include models that use simple approximations (perhaps constants or linear models) that only apply to specific regions. These models require more data (and sometimes a lot of data).

The rest of the discussion explores these ideas in more depth.

**Making decisions that interact with the environment**

In the context of this discussion, we identify two broad classes of decisions:

**o Decisions that change the environment.** These decisions might change the physical device (such as moving from one location to another, acquiring/using inventory, taking a drug, or investing in stocks) or setting parameters such as the price of a product. Choosing website designs or restaurant menus fall in this category.

**o Decisions to exchange information.** It helps to identify two classes of "information decisions":

1.  **Decisions to acquire information** - We might run a laboratory or field experiment, take a medical image, or simulate an operational problem in the computer to collect information that changes what we know about the environment. This information is then used to make better decisions that directly change the environment.
2.  **Decisions to communicate/disseminate information.** We might send a signal, email a coupon or broadcast an ad to inform other decision makers.

Some decisions may change the physical environment while also producing information, such as traversing a network (or making a move in a game) that also allows us to learn about the network (or the response of an opponent).

It helps to have the notion of the "state" of our system which contains all the information needed to make a decision. The state, which we denote $$S_t$$, can be a physical state $$R_t$$ (the location of a vehicle, how much water is in a reservoir), other information $$I_t$$ (weather, forecasts, prices), and possibly beliefs $$B_t$$ about quantities we cannot observe directly.

For example, in our demand model $$D(p|\theta) = \theta_0 - \theta_1 p$$, we may not know $$(\theta_0,\theta_1)$$, but we might have estimates along with information about the accuracy of the estimates (such as a mean and variance). We might also have beliefs about the deterioration of a piece of machinery, or the presence of disease in a population.

Pure information collection decisions only change the belief state $$B_t$$, which does not directly affect the environment, but will have an impact on decisions that do affect the environment. Problems with just a belief state are pure learning problems, known in some communities as "multiarmed bandit" problems, but there are many problems with physical and/or information states that also have belief states. When decisions may change the belief state, they become *active learning problems.*

We evaluate decisions using a cost or contribution function $$C(S,x)$$ that, given a "state" *S* (which contains all the information we need to make a decision) and a decision *x* (that you control), $$C(S,x)$$ is a metric of how well we have done.  If we have a deterministic problem, we might be looking for an optimal decision $$x\*$$.

For sequential problems (and especially sequential problems where there is some form of uncertainty), we are looking for a decision function, or *policy*, for making decisions that we like to write $$x_t = X^\pi(S_t)$$. Rather than finding optimal decisions, we aspire to find optimal policies, although in practice this is quite rare. The challenge of finding policies is an essential feature of problems where decisions have to be made over time.

There are many communities that address the challenges of making decisions under uncertainty. We refer to these communities as the "[jungle of stochastic optimization](http://jungle.princeton.edu)" using names such as dynamic programming (or Markov decision processes), optimal control (or stochastic control), simulation-optimization, stochastic programming, decision analysis, and stochastic search, along with communities that use names such as multiarmed bandit problems and active learning. However, in recent years one name has caught the attention of the broader public, and that is "reinforcement learning" which emerged from the work in the 1980's of Rich Sutton and Andy Barto in computer science. [I have prepared a webpage on reinforcement learning here](http://www.castle.princeton.edu/what-is-rl/).
{% endraw %}
