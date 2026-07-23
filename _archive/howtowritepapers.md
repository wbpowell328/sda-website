---
layout: page
title: "How to write stochastic, dynamic papers in transportation and logistics"
permalink: /howtowritepapers/
date: 2023-02-07 08:40:54
---

{% raw %}
Warren B. Powell
Professor Emeritus, Princeton University

On my to-do list for retirement was to write this web page on how to write stochastic, dynamic papers for transportation and logistics.  This is a problem that has plagued me for my entire career, from the first paper that I submitted to Transportation Science on a stochastic vehicle allocation problem \~1983 (it took two  years to get my first referee reports), right up to my last paper that was submitted (and rejected) in 2022 (a topic I will return to later).

Stochastic, dynamic problems arise throughout transportation and logistics, and yet we lack the kind of standard, canonical format that is so well known for deterministic optimization problems. To be clear, I am talking about what I now like to call *sequential decision problems* that consist of a sequence: decision, information, decision, information, \... These arise in many ways (I provide more details below), and yet they can all be modeled with a standard, canonical format that follows the style of deterministic optimization.  It took me a career to settle on this modeling style, and, and I am going to share this here.

My goal with this webpage is to create the same kind of canonical format for papers dealing with sequential decision problems as has long been followed for deterministic optimization problems (decision vector, objective function, constraints).

I have intentionally steered this web page toward papers in transportation and logistics, but the modeling framework applies to *any* sequential decision problem - this is important, because the range of sequential decision problems in transportation and logistics is vast, spanning much more than the familiar routing and inventory problems that dominate so much of the literature.  

For a quick (40 minute) video introduction to the framework for general problems, [click here](https://tinyurl.com/sdafieldyoutube/). For a longer tutorial (in four parts), go to:

Part I:  <https://tinyurl.com/SDAPartI/>
Part II: <https://tinyurl.com/SDAPartII/>
Part III: <https://tinyurl.com/SDAPartIII/>
Part IV: <https://tinyurl.com/SDAPartIV/>

## Why me?

I would like to first make the case why I feel that I am in a position to lay out a standard approach for writing papers on stochastic, dynamic problems (or *sequential decision problems*).  

- I have published 24 papers in Transportation Science, as well as other transportation papers in Operations Research and European J. of Operational Research.  These are a subset of over 250 refereed publications, many in top tier theory journals.
- I have written four books, all dealing with sequential decision problems. The two most recent describe the framework that is presented in this webpage:
  - *[Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decision problems](https://tinyurl.com/RLandSO/) - *This is a graduate level text aimed at readers who are interested in building computer models and algorithms.
  - *[Sequential Decision Analytics and Modeling](https://tinyurl.com/sdafieldmodeling/) - *This book uses a teach-by-example style to communicate the modeling framework presented in this webpage using a number of examples, including problems from transportation and inventory planning.
- Two of my papers won best paper prizes from the Society for Transportation Science and Logistics (I personally wrote both papers):
  - [Simao, H. P., J. Day, A. George, T. Gifford, J. Nienow, W. B. Powell, "An Approximate Dynamic Programming Algorithm for Large-Scale Fleet Management: A Case Application," *Transportation Science*, Vol. 43, No. 2, pp. 178-197 (2009).](https://tinyurl.com/PowellSimaoADP)

  - [Belgacem Bouzaiene-Ayari, C. Cheng, S. Das, R. Fiorillo, W.B. Powell, "From Single Commodity to Multiattribute Models for Locomotive Optimization: A Comparison of Integer Programming and Approximate Dynamic Programming," Transportation Science, Vol. 50, No. 2 (2016): 366-389](https://tinyurl.com/PowellPLASMApaper)
- At the invitation of Martin Savelsbergh (EIC of Trans. Sci. at the time) I played the role of a (non-anonymous) "managing editor" to help an author, Marlin Ulmer, address some negative reviews on his paper, "Dynamic Pricing for Same-Day Delivery." The paper went from being rejected to not only being accepted, but also winning the first best-paper award in Transportation Science.  In his acknowledgements, he made the statement (I will return to this experience later):
  - - *The author especially thanks Warren Powell for his great support with the modeling of the problem. The author appreciates Warren's effort to bring clarity to the dynamic routing literature, and the author highly recommends studying his framework to everyone working in this field.*
- In 2022, I received the Saul Gass Expository Writing Award from Informs.
- In 2021, I received the Robert Hermann Lifetime Achievement Award.  I have long felt that these "senior awards" come with a responsibility to give back to the field, drawing on a career of experience to help the field (and especially the youngest members of the field).

## Historical development of my framework

Early in my career I began working on stochastic, dynamic problems, motivated by the challenge of optimizing the flows of trucks in truckload trucking, where the uncertainty of demands being called in dominates the problem.  For 20 years I floundered writing papers where I knew perfectly well that I lacked the kind of canonical modeling framework enjoyed by my colleagues working on deterministic problems.  

My turning point came with my books (1st and 2nd edition) on Approximate Dynamic Programming, where chapter 5 was dedicated to how to model "dynamic programs" but this was still buried in the algorithmic framework of ADP.  From 2014 to 2022 I wrote three tutorial articles (two in the Informs TuTORials series, and one in EJOR) that laid down the foundation for what I now call my universal framework for modeling sequential decision problems. 

My most recent book: [*Reinforcement Learning and Stochastic Optimization: A universal framework for sequential decisions*](https://tinyurl.com/RLandSO/) (RLSO) is the first book written entirely around this framework.  This book builds on my ADP book, but follows the organization of the EJOR paper.  Chapter 9 is dedicated to modeling sequential decision problems (this is an extension to chapter 5 in the ADP book).  This chapter can be downloaded from the [website](https://tinyurl.com/RLandSO/) for the book.

A better reference for modeling sequential decision problems is the companion book I wrote, [*Sequential Decision Analytics and Modeling*](https://tinyurl.com/PowellSDAMbook/).  This book uses a teach-by-example style, and it is this style I follow in this webpage.

## Writing a stochastic, dynamic model

I begin by making the simple point that stochastic, dynamic models of real problems in transportation and logistics are inherently much more complex than deterministic problems.  My modeling style will help manage this complexity, but nothing will completely eliminate it (I will return to this topic later).

I recommend that a stochastic, dynamic modeling paper should contain the following elements:

- **A plain English narrative** - This might go in the introduction, its own section, or an opening paragraph of your modeling section.  I came to appreciate the importance of a plain English narrative while helping Marlin Ulmer with his paper.  This may be just a single paragraph, or perhaps a bit longer, but it should read like an abstract to the model itself.
- **Your mathematical model will build on answers to three questions** -  I think that there are different styles for presenting this information, so this is up to the author.  You might want to provide plain English answers before presenting the mathematical model.  I think this will help clarity, but I think it is also fine to introduce these as the mathematical model is being presented.  The three questions are:
  1.  What metrics are you using to evaluate performance?  Stochastic, dynamic problems often use richer metrics (such as risk) than the familiar "cost function" of deterministic models.  
  2.  What types of decisions are being made (and in some settings, who makes the decisions).
  3.  What are the sources of uncertainty that arise in the problem? This includes statistical or probabilistic characterizations of quantities and parameters we do not know perfectly, as well as the types of new information (I call this "exogenous information") that arrives after a decision is made.
- **The mathematical model -**  This consists of five elements:
  1.  **The state variables** $$S_t$$- There is tremendous confusion about the meaning of "state variable" in the research literature ([please see my discussion here](https://tinyurl.com/onstatevariables/)). In a nutshell, a "state variable" is "all the information you need to model the system from time t onward." Some notes:
      - State variables come in three flavors:
        i.  Physical state $$R_t$$ - This might be the inventory, or the location of a truck or driver on a network. A common (in fact, widespread) mistake is to equate "state" with "physical state."  Simply not true.
        ii. Other information $$I_t$$ - This might be prices, the state of weather, known information about a network.
        iii. Belief state $$B_t$$ - This includes parameters (statistics, probabilities) that describe what we know about quantities and parameters that we do not know perfectly.  This might be forecasts of demands, how a market might respond to price, the unknown status of a network after a storm.
      - More specifically, it is the information you need to:
        i.  Compute the parameters in the objective function.
        ii. Make a decision (this includes defining the constraints, and/or computing a policy that has already been specified).
        iii. Compute variables in (i) and (ii) at any point in the future.
  2.  **The decision variables**  - We have to introduce three piece of information related to decisions:
      i.  We define all of our decision variables - I use $$x_t$$ as generic notation (this is quite common in the OR literature), but you can use any variables you want.
      ii. The constraints/feasible region $$X_t$$ for $$x_t$$ at time *t* (I like using a calligraphic $$X_t$$ for the feasible region, but I haven't figured out how to do this on a webpage). 
      iii. The *policy*, which is whatever method we are going to use for determining $$x_t$$.  Keeping in mind that different variables may be used for decision variables (other than $$x_t$$), if we are using $$x_t$$ for the decision variable, I like to introduce the policy $$X^\pi(S_t)$$ which returns a feasible decision $$x_t \in X_t$$.  We introduce the notation for the policy, *but we will design this later*.  I call this "model first, then solve," which is the style used throughout deterministic optimization (we create the model using $$x_t$$ and later design an algorithm to determine $$x_t$$).  However, this is a major point of departure with the various fields that deal with stochastic optimization.  For example, a two-stage stochastic program is actually a policy (technically a lookahead policy).  
  3.  **Exogenous information** $$W_{t+1}$$ - This is the information that arrives after we make the decision $$x_t$$, and before we make the decision $$x_{t+1}$$.  $$W_{t+1}$$ can be realizations of demands, travel times, prices, consumer behavior, equipment failures, \.... 
  4.  **The transition function** - This is the function that describes how the information in $$S_t$$, the decision $$x_t \in X_t$$ and the exogenous information $$W_{t+1}$$ evolves into the next state $$S_{t+1}$$.  I like to write this as
      - $$S_{t+1}=S^M(S_t,x_t,W_{t+1})$$                                                    (1)
      - where 
      - $$S_{t+1}=S^M(\cdot)$$, which stands for "state transition model" or "system transition model" or for some, just "model" represents all the equations that describe the evolution of each of the state variables.  For a simple inventory problem, this might be as simple as
      - $$R_{t+1}=max\{0,R_t + x_t - D_{t+1}\}$$
      - For many (I would say most) real applications in transportation and logistics, transition functions can easy range from dozens to tens of thousands of lines of code.  If you write a simulator, the transition function is all the code that captures the dynamics of the system.   This raises the question: do you have to include the transition equation for *every* state variable?  For complex problems, my firm answer is: no!  I don't even think  you need to include listing every equation in an appendix, for two reasons: a) for complex problems, there are just too many equations, and no-one would ever read them, and b) no-one is going to solve the exact same problem.  Instead, you want to illustrate just enough of the most important transition equations so that a reader with knowledge about a similar problem would be able to generalize the strategy to their problem.
  5.  **The objective function** -  This consists of two elements:
      1.  i.  The single period cost or contribution function, which we write as $$C(S_t,x_t)$$ where the dependence on the state variable $$S_t$$ makes it possible for the contribution function (my preferred default) to depend on random parameters (such as costs or prices).  Some like to write the contribution function as $$C(S_t,x_t,W_{t+1})$$ - for example, $$S_t$$ might be the inventory, $$x_t$$ is how much new inventory we order, and $$W_{t+1}$$ contains the demand for the product between *t* and *t+1*.  This is fine, but see section 9.8 of [RLSO ](https://tinyurl.com/RLandSO/) for a description of how to transform any problem that uses $$C(S_t,x_t,W_{t+1})$$ into one that uses $$C(S_t,x_t)$$.
          ii. The objective function, which evaluates the performance of a policy.  There are different ways that objective functions can be written for stochastic, dynamic problems, but the most common is to maximize expected cumulative rewards, as in
              - $$max_\pi \mathbb{E} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))|S_0\right\}$$                                                               (2)
              - Other forms of objective functions might include:
                i.  Expected discounted sum (over finite or infinite horizon)
                ii. Maximize the expected performance in just the last time period (I call this the final reward objective).
                iii. We might minimize some arbitrary risk measure (of the cumulative or final reward) instead of using an expectation.  More often, we might optimize the expected costs (cumulative or final) plus a scaling term times a risk measure.  

Some notes about this modeling framework:  

- - This framework can be used to model *any* sequential decision problem (which means any stochastic, dynamic model of a transportation system).
  - If you write a simulator of a sequential decision problem, your code can be translated directly to the modeling framework above, which means that you do not choose between using this framework or something else.  However, what often happens is that authors use other modeling styles, which means that what they are writing on paper is not the same as how they are actually implementing it in software.
- **Modeling the uncertainty** - The next step is to model any forms of uncertainty.   These enter the model in one of two ways:
  i.  Uncertainty in the initial state $$S_0$$ - This might capture initial beliefs about any quantities or parameters (travel times, how a market responds to price).  These beliefs may remain static, or may evolve as we collect more information.
  ii. The exogenous information $$W_{t+1}$$ that is not known when we make a decision $$x_t$$.  
      - There are three ways to create samples of uncertainties for the purpose of testing policies:
        i.  Collect samples of the random information (demands, prices, travel times, \...) from history.
        ii. Manually create outcomes that *might* happen, even if they have never actually happened.  We would use this approach to help design contingency plans for extreme events (earthquakes, hurricanes, disease outbreaks, cyber/physical attacks, \...).
        iii. Create a mathematical model of the random events, which can be used to generate large samples.  This is very attractive, but creating realistic models is technically challenging, and always involves introducing assumptions.  However, it makes it possible to sample from forecasted distributions that have not actually happened in the past.
      - While papers tend to focus on how to make *decisions* in the presence of uncertainty, it is the *modeling* of uncertainty that is often the hardest, and most important, issue.  However, if you want to publish a paper in an operations research journal, you will have better luck focusing on what method (policy) you use to make decisions.
- **Designing the policy -** This is where we get to the problem of creating the function $$X^\pi(S_t)$$.  Policies (recall these are methods for making decisions - any method) can be created using two general strategies, each of which can be divided into two classes, creating what I like to call the "four classes of policies."  These four classes are universal - they include any method that you might already being using (which may be a hybrid).  A sketch of these are described below.  Readers interested in more depth are referred to chapter 11 of my book [RLSO](https://tinyurl.com/RLandSO/) which can be downloaded from the [book webpage here.](https://tinyurl.com/RLandSO/)

## The four classes of policies

- **The policy search class** -- These are functions with parameters that have to be tuned to find the values that work best over time, averaged over all the possible sample paths. This class consists of two sub-classes:
  - **1) Policy function approximations (PFAs)** -- These can be simple rules, linear functions, nonlinear functions (such as neural networks) and nonparametric functions.  PFAs include every possible function that might be used when we are searching for statistical models for machine learning.
  - **2) Cost function approximations (CFAs)** -- We can take a simplified optimization model and parameterize it so that it works better over time, under uncertainty.  CFAs are very popular in engineering practice, but virtually ignored in the stochastic optimization community.
  - Note: PFAs and CFAs are virtually always some form of parameterized policy, that we might write as $$X^\pi(S_t|\theta)$$.  Once we choose some form of PFA and CFA, we still have the optimization problem of choosing the best value of $$\theta$$.  We would write this problem as 
    - $$max_\theta \mathbb{E} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t|\theta))|S_0\right\}$$ 
- **The lookahead class** -- This policy makes better decisions by estimating the downstream value of a decision made now. This class also has two sub-classes:
  - **3) Policies based on value function approximations (VFAs)** -- This is the class (and the only class) that depends on Bellman's equation (also known as the Hamilton-Jacobi equations in control theory). It creates policies by optimizing the first period contribution (or cost) plus an approximation of the value of the state that a decision takes us to.
  - **4) Direct lookaheads (DLAs)** -- These are where we plan over some horizon using an approximate lookahead model.  Unlike VFA-based policies, we explicitly optimize over decisions we may make in the future. DLAs come in two broad flavors:
    i.  Deterministic lookaheads - This is easily the most widely used strategy in transportation and logistics.  Often overlooked is that deterministic lookaheads can be parameterized, creating a hybrid DLA/CFA (CFAs are parameterized optimization problems, but a vanilla CFA does not plan into the future).  Navigation systems (such as google maps) are a classic example of a deterministic lookahead.
    ii. Stochastic lookaheads - These come in many forms.  One of the best known in the operations research community for problems in transportation and logistics is stochastic programming (notably two-stage stochastic programs) first introduced by Dantzig in 1955 for a transportation problem involving aircraft.

In addition to these four classes, we can create a variety of hybrids:

- Tree search terminated with value function approximations (DLA with VFA).
- Deterministic lookahead, parameterized to make it perform better under uncertainty (DLA with CFA).
- Monte Carlo tree search, which is a stochastic lookahead (DLA) with a rollout policy (which might be a PFA), exploration strategy (CFA, using upper confidence bounding) and value function approximations (VFA).
- Any optimization-based policy (CFA, VFA or DLA) with rule-based penalties (PFA).

In my experience, there is a big disconnect between what people use in practice (including researchers focusing on practical applications), and what commands the attention of the research literature.  I have found it useful to divide policies into five categories (I am already splitting DLAs into deterministic and stochastic lookaheads), and then organize these into three categories:

Category 1: These include PFAs, CFAs and (possibly parameterized) DLAs.  These are the simplest and are easily the most widely used in practice.  The choice of PFA, CFA or DLA tends to be obvious from the problem setting.  While these are the simplest, they introduce the challenge of parameter tuning, which is often overlooked, and can be quite challenging.

Category 2: These are stochastic DLAs, which are needed for certain classes of problems where deterministic approximations of the future simply don't work (and this tends to be obvious).

Category 3: Policies based on VFAs (this includes any policy based on approximating Bellman's equation.  I spent 20 years and have a 500+ page book on this class.

My finding is that the majority (and I might say the vast majority) of sequential decision problems are solved with policies in Category 1.  Then there are problems where we need a DLA, but where a deterministic lookahead just won't work.  For example, problems with random prices, or where we need to manage risk, typically require a stochastic DLA.  Finally, category 3 (the entire group of policies based on Bellman's equation) are easily the ones that are least-used in practice.  VFAs are exceptionally powerful for a very narrow class of problems.

Some closing notes on the choice of policies:

- It is *very* common to use some form of direct lookahead (DLA) for problems in transportation and logistics.  Quite often (I would say the vast majority of the time) people will create and solve some form of DLA and then assume they are done, without recognizing that this is a policy that represents one potential solution (that is, one method for making decisions) that has to be evaluated using the objective function above.  I have seen experts claim that if you solve the lookahead model exactly, then your solution is "optimal," without realizing that an optimal solution to an approximate lookahead model (lookahead models in transportation are virtually always approximations) is *not* an optimal policy.
- Easily the most common mistake when "solving" sequential decision problems is the failure to recognize that equation (2) (or some variation), which involves optimizing over policies, is the proper objective function.  Failing to write this is comparable to failing to write out an objective function (such as $$C(x)$$ subject to constraints on *x*) for a deterministic optimization problem.  There are far too many papers that pick some class of policy, without realizing that searching for good policies is the objective.
- It is very rare to find optimal policies for real problems in transportation, just as it is rare to find optimal solutions to complex deterministic problems (e.g. with integer variables and complex cost functions).  Normally, we are looking for effective policies that are not too difficult to compute.
- PFAs and CFAs (as well as some deterministic DLAs) will have tunable parameters.  In this case, we would write our policy as $$X^\pi(S_t|\theta))$$, where $$\theta$$ is a vector of tunable parameters in the function $$X^\pi(S_t|\theta))$$, which has to be tuned by solving the optimization problem:
  - $$max_\theta \mathbb{E} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t|\theta))|S_0\right\}$$                                                               (3)
- There are going to be problems which require a lookahead policy.  Often this will mean a stochastic lookahead.  These are covered in depth in chapter 19 of [RLSO](https://tinyurl.com/RLandSO/) [see section 19.7 for a thorough overview of stochastic lookaheads].

## The reviewing challenge: advice for editors and referees

Reviewing stochastic, dynamic optimization papers in transportation and logistics is inherently more difficult than classical deterministic optimization models, or the growing number of papers focusing on machine learning.  Specifically:

- Stochastic, dynamic problems are inherently more complex.  There are more details, and the details are more subtle (especially related to the sequencing of decisions and information).
- The lack of a standardized, canonical framework means that different papers, even when they are modeling similar problems, can look quite different. 
- Referees facing the daunting task of wading through a complex paper will be tempted to take the easier path: find something wrong and reject.

I would like to illustrate the third bullet using my experience helping with the editing of Marlin Ulmer's paper (mentioned at the top of the page).  Marlin's paper was first rejected, and the editor asked me to help with the revision.  While I did put quite a bit of time into the paper, I did not change either any of the fundamental methodology, or his core modeling framework (he largely followed my framework above).  I did help make the paper clearer (for example, by introducing a narrative) along with a number of other minor edits.  In theory a good referee or AE could have done the same. However, the vast majority of my edits were cosmetic rather than substantive.

While I was helping transform Marlin's paper into an award-winning, my own stochastic, dynamic paper (an information-collecting vehicle routing problem for managing a utility truck after a storm) was being reviewed, and was rejected ([see the paper by Lina al-Kanj here](https://tinyurl.com/ICVRP/)).  I think the rejection can be attributed to the same reason behind the rejection of Marlin's paper, with the exception that I avoided some of the presentation errors that Marlin had made.  After I filed a letter of complaint, the paper was re-reviewed, and the second round produced very thorough and helpful reviews.  The cover letter from the editor invited a revision, but expressed surprise at the length of the reviews.  The reason?  Stochastic, dynamic papers are inherently complex.

Two years later, I submitted another paper on a stochastic, dynamic vehicle routing problem (another information collecting vehicle routing problem involving managing drones to help fight wildfires).  This paper, by Larry Thul, was also rejected ([this paper is also posted here](https://tinyurl.com/ICVRP/)) - both referee reports were about two pages, and did not demonstrate any understanding of the paper.  Why? Stochastic, dynamic papers are inherently complex, and it is easier to reject than to understand what is new.

These two papers illustrate that following a proper, canonical framework is not enough: the community has to agree that this framework is appropriate.  Referees and editors (AEs and area editors) need to enforce the style, and set reasonable expectations.  Stochastic, dynamic problems are pervasive in transportation and logistics, and yet I think I can claim that no two papers follow the same consistent style that we routinely see in deterministic optimization.

- -
{% endraw %}
