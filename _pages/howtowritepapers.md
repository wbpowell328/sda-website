---
layout: page
title: "How to write stochastic, dynamic papers in transportation and logistics"
permalink: /howtowritepapers/
date: 2023-02-07 08:40:54
---

<!-- wp:tadv/classic-paragraph /-->

<!-- wp:tadv/classic-paragraph -->
<p>Warren B. Powell<br />Professor Emeritus, Princeton University</p>
<p>On my to-do list for retirement was to write this web page on how to write stochastic, dynamic papers for transportation and logistics.  This is a problem that has plagued me for my entire career, from the first paper that I submitted to Transportation Science on a stochastic vehicle allocation problem ~1983 (it took two  years to get my first referee reports), right up to my last paper that was submitted (and rejected) in 2022 (a topic I will return to later).</p>
<p>Stochastic, dynamic problems arise throughout transportation and logistics, and yet we lack the kind of standard, canonical format that is so well known for deterministic optimization problems. To be clear, I am talking about what I now like to call <em>sequential decision problems</em> that consist of a sequence: decision, information, decision, information, ... These arise in many ways (I provide more details below), and yet they can all be modeled with a standard, canonical format that follows the style of deterministic optimization.  It took me a career to settle on this modeling style, and, and I am going to share this here.</p>
<p>My goal with this webpage is to create the same kind of canonical format for papers dealing with sequential decision problems as has long been followed for deterministic optimization problems (decision vector, objective function, constraints).</p>
<p>I have intentionally steered this web page toward papers in transportation and logistics, but the modeling framework applies to <em>any</em> sequential decision problem - this is important, because the range of sequential decision problems in transportation and logistics is vast, spanning much more than the familiar routing and inventory problems that dominate so much of the literature.  </p>
<p>For a quick (40 minute) video introduction to the framework for general problems, <a href="https://tinyurl.com/sdafieldyoutube/">click here</a>. For a longer tutorial (in four parts), go to:</p>
<p>Part I:  <a href="https://tinyurl.com/SDAPartI/">https://tinyurl.com/SDAPartI/</a><br />Part II: <a href="https://tinyurl.com/SDAPartII/">https://tinyurl.com/SDAPartII/</a><br />Part III: <a href="https://tinyurl.com/SDAPartIII/">https://tinyurl.com/SDAPartIII/</a><br />Part IV: <a href="https://tinyurl.com/SDAPartIV/">https://tinyurl.com/SDAPartIV/</a></p>
<h2>Why me?</h2>
<p>I would like to first make the case why I feel that I am in a position to lay out a standard approach for writing papers on stochastic, dynamic problems (or <em>sequential decision problems</em>).  </p>
<ul>
<li>I have published 24 papers in Transportation Science, as well as other transportation papers in Operations Research and European J. of Operational Research.  These are a subset of over 250 refereed publications, many in top tier theory journals.</li>
<li>I have written four books, all dealing with sequential decision problems. The two most recent describe the framework that is presented in this webpage:
<ul style="list-style-type: circle;">
<li><em><a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decision problems</a> - </em>This is a graduate level text aimed at readers who are interested in building computer models and algorithms.</li>
<li><em><a href="https://tinyurl.com/sdafieldmodeling/">Sequential Decision Analytics and Modeling</a> - </em>This book uses a teach-by-example style to communicate the modeling framework presented in this webpage using a number of examples, including problems from transportation and inventory planning.</li>
</ul>
</li>
<li>Two of my papers won best paper prizes from the Society for Transportation Science and Logistics (I personally wrote both papers):
<ul>
<li>
<p><a href="https://tinyurl.com/PowellSimaoADP">Simao, H. P., J. Day, A. George, T. Gifford, J. Nienow, W. B. Powell, “An Approximate Dynamic Programming Algorithm for Large-Scale Fleet Management: A Case Application,” <em>Transportation Science</em>, Vol. 43, No. 2, pp. 178-197 (2009).</a></p>
</li>
<li>
<p><a href="https://tinyurl.com/PowellPLASMApaper">Belgacem Bouzaiene-Ayari, C. Cheng, S. Das, R. Fiorillo, W.B. Powell, “From Single Commodity to Multiattribute Models for Locomotive Optimization: A Comparison of Integer Programming and Approximate Dynamic Programming,” Transportation Science, Vol. 50, No. 2 (2016): 366-389</a></p>
</li>
</ul>
</li>
<li>At the invitation of Martin Savelsbergh (EIC of Trans. Sci. at the time) I played the role of a (non-anonymous) "managing editor" to help an author, Marlin Ulmer, address some negative reviews on his paper, "Dynamic Pricing for Same-Day Delivery." The paper went from being rejected to not only being accepted, but also winning the first best-paper award in Transportation Science.  In his acknowledgements, he made the statement (I will return to this experience later):
<ul>
<li style="list-style-type: none;">
<ul style="list-style-type: circle;">
<li><em>The author especially thanks Warren Powell for his great support with the modeling of the problem. The author appreciates Warren’s effort to bring clarity to the dynamic routing literature, and the author highly recommends studying his framework to everyone working in this field.</em></li>
</ul>
</li>
</ul>
</li>
<li>In 2022, I received the Saul Gass Expository Writing Award from Informs.</li>
<li>In 2021, I received the Robert Hermann Lifetime Achievement Award.  I have long felt that these "senior awards" come with a responsibility to give back to the field, drawing on a career of experience to help the field (and especially the youngest members of the field).</li>
</ul>
<h2>Historical development of my framework</h2>
<p>Early in my career I began working on stochastic, dynamic problems, motivated by the challenge of optimizing the flows of trucks in truckload trucking, where the uncertainty of demands being called in dominates the problem.  For 20 years I floundered writing papers where I knew perfectly well that I lacked the kind of canonical modeling framework enjoyed by my colleagues working on deterministic problems.  </p>
<p>My turning point came with my books (1st and 2nd edition) on Approximate Dynamic Programming, where chapter 5 was dedicated to how to model "dynamic programs" but this was still buried in the algorithmic framework of ADP.  From 2014 to 2022 I wrote three tutorial articles (two in the Informs TuTORials series, and one in EJOR) that laid down the foundation for what I now call my universal framework for modeling sequential decision problems. </p>
<p>My most recent book: <a href="https://tinyurl.com/RLandSO/"><em>Reinforcement Learning and Stochastic Optimization: A universal framework for sequential decisions</em></a> (RLSO) is the first book written entirely around this framework.  This book builds on my ADP book, but follows the organization of the EJOR paper.  Chapter 9 is dedicated to modeling sequential decision problems (this is an extension to chapter 5 in the ADP book).  This chapter can be downloaded from the <a href="https://tinyurl.com/RLandSO/">website</a> for the book.</p>
<p>A better reference for modeling sequential decision problems is the companion book I wrote, <a href="https://tinyurl.com/PowellSDAMbook/"><em>Sequential Decision Analytics and Modeling</em></a>.  This book uses a teach-by-example style, and it is this style I follow in this webpage.</p>
<h2>Writing a stochastic, dynamic model</h2>
<p>I begin by making the simple point that stochastic, dynamic models of real problems in transportation and logistics are inherently much more complex than deterministic problems.  My modeling style will help manage this complexity, but nothing will completely eliminate it (I will return to this topic later).</p>
<p>I recommend that a stochastic, dynamic modeling paper should contain the following elements:</p>
<ul>
<li><strong>A plain English narrative</strong> - This might go in the introduction, its own section, or an opening paragraph of your modeling section.  I came to appreciate the importance of a plain English narrative while helping Marlin Ulmer with his paper.  This may be just a single paragraph, or perhaps a bit longer, but it should read like an abstract to the model itself.</li>
<li><strong>Your mathematical model will build on answers to three questions</strong> -  I think that there are different styles for presenting this information, so this is up to the author.  You might want to provide plain English answers before presenting the mathematical model.  I think this will help clarity, but I think it is also fine to introduce these as the mathematical model is being presented.  The three questions are:
<ol>
<li>What metrics are you using to evaluate performance?  Stochastic, dynamic problems often use richer metrics (such as risk) than the familiar "cost function" of deterministic models.  </li>
<li>What types of decisions are being made (and in some settings, who makes the decisions).</li>
<li>What are the sources of uncertainty that arise in the problem? This includes statistical or probabilistic characterizations of quantities and parameters we do not know perfectly, as well as the types of new information (I call this "exogenous information") that arrives after a decision is made.</li>
</ol>
</li>
<li><strong>The mathematical model -</strong>  This consists of five elements:
<ol>
<li><strong>The state variables</strong> [latex]S_t[/latex]- There is tremendous confusion about the meaning of "state variable" in the research literature (<a href="https://tinyurl.com/onstatevariables/">please see my discussion here</a>). In a nutshell, a "state variable" is "all the information you need to model the system from time t onward." Some notes:
<ul style="list-style-type: circle;">
<li>State variables come in three flavors:
<ol style="list-style-type: lower-roman;">
<li>Physical state [latex]R_t[/latex] - This might be the inventory, or the location of a truck or driver on a network. A common (in fact, widespread) mistake is to equate "state" with "physical state."  Simply not true.</li>
<li>Other information [latex]I_t[/latex] - This might be prices, the state of weather, known information about a network.</li>
<li>Belief state [latex]B_t[/latex] - This includes parameters (statistics, probabilities) that describe what we know about quantities and parameters that we do not know perfectly.  This might be forecasts of demands, how a market might respond to price, the unknown status of a network after a storm.</li>
</ol>
</li>
<li>More specifically, it is the information you need to:
<ol style="list-style-type: lower-roman;">
<li>Compute the parameters in the objective function.</li>
<li>Make a decision (this includes defining the constraints, and/or computing a policy that has already been specified).</li>
<li>Compute variables in (i) and (ii) at any point in the future.</li>
</ol>
</li>
</ul>
</li>
<li><strong>The decision variables</strong>  - We have to introduce three piece of information related to decisions:
<ol style="list-style-type: lower-roman;">
<li>We define all of our decision variables - I use [latex]x_t[/latex] as generic notation (this is quite common in the OR literature), but you can use any variables you want.</li>
<li>The constraints/feasible region [latex]X_t[/latex] for [latex]x_t[/latex] at time <em>t </em>(I like using a calligraphic [latex]X_t[/latex] for the feasible region, but I haven't figured out how to do this on a webpage). </li>
<li>The <em>policy</em>, which is whatever method we are going to use for determining [latex]x_t[/latex].  Keeping in mind that different variables may be used for decision variables (other than [latex]x_t[/latex]), if we are using [latex]x_t[/latex] for the decision variable, I like to introduce the policy [latex]X^\pi(S_t)[/latex] which returns a feasible decision [latex]x_t \in X_t[/latex].  We introduce the notation for the policy, <em>but we will design this later</em>.  I call this "model first, then solve," which is the style used throughout deterministic optimization (we create the model using [latex]x_t[/latex] and later design an algorithm to determine [latex]x_t[/latex]).  However, this is a major point of departure with the various fields that deal with stochastic optimization.  For example, a two-stage stochastic program is actually a policy (technically a lookahead policy).  </li>
</ol>
</li>
<li><strong>Exogenous information</strong> [latex]W_{t+1}[/latex] - This is the information that arrives after we make the decision [latex]x_t[/latex], and before we make the decision [latex]x_{t+1}[/latex].  [latex]W_{t+1}[/latex] can be realizations of demands, travel times, prices, consumer behavior, equipment failures, .... </li>
<li><strong>The transition function</strong> - This is the function that describes how the information in [latex]S_t[/latex], the decision [latex]x_t \in X_t[/latex] and the exogenous information [latex]W_{t+1}[/latex] evolves into the next state [latex]S_{t+1}[/latex].  I like to write this as
<ul style="list-style-type: circle;">
<li>[latex]S_{t+1}=S^M(S_t,x_t,W_{t+1})[/latex]                                                    (1)</li>
<li>where </li>
<li>[latex]S_{t+1}=S^M(\cdot)[/latex], which stands for "state transition model" or "system transition model" or for some, just "model" represents all the equations that describe the evolution of each of the state variables.  For a simple inventory problem, this might be as simple as</li>
<li>[latex]R_{t+1}=max\{0,R_t + x_t - D_{t+1}\}[/latex]</li>
<li>For many (I would say most) real applications in transportation and logistics, transition functions can easy range from dozens to tens of thousands of lines of code.  If you write a simulator, the transition function is all the code that captures the dynamics of the system.   This raises the question: do you have to include the transition equation for <em>every</em> state variable?  For complex problems, my firm answer is: no!  I don't even think  you need to include listing every equation in an appendix, for two reasons: a) for complex problems, there are just too many equations, and no-one would ever read them, and b) no-one is going to solve the exact same problem.  Instead, you want to illustrate just enough of the most important transition equations so that a reader with knowledge about a similar problem would be able to generalize the strategy to their problem.</li>
</ul>
</li>
<li><strong>The objective function</strong> -  This consists of two elements:<br />
<ol>
<li style="list-style-type: none;">
<ol style="list-style-type: lower-roman;">
<li>The single period cost or contribution function, which we write as [latex]C(S_t,x_t)[/latex] where the dependence on the state variable [latex]S_t[/latex] makes it possible for the contribution function (my preferred default) to depend on random parameters (such as costs or prices).  Some like to write the contribution function as [latex]C(S_t,x_t,W_{t+1})[/latex] - for example, [latex]S_t[/latex] might be the inventory, [latex]x_t[/latex] is how much new inventory we order, and [latex]W_{t+1}[/latex] contains the demand for the product between <em>t</em> and <em>t+1</em>.  This is fine, but see section 9.8 of <a href="https://tinyurl.com/RLandSO/">RLSO </a> for a description of how to transform any problem that uses [latex]C(S_t,x_t,W_{t+1})[/latex] into one that uses [latex]C(S_t,x_t)[/latex].</li>
<li>The objective function, which evaluates the performance of a policy.  There are different ways that objective functions can be written for stochastic, dynamic problems, but the most common is to maximize expected cumulative rewards, as in
<ul style="list-style-type: circle;">
<li>[latex]max_\pi \mathbb{E} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))|S_0\right\}[/latex]                                                               (2)</li>
<li>Other forms of objective functions might include:
<ol style="list-style-type: lower-roman;">
<li>Expected discounted sum (over finite or infinite horizon)</li>
<li>Maximize the expected performance in just the last time period (I call this the final reward objective).</li>
<li>We might minimize some arbitrary risk measure (of the cumulative or final reward) instead of using an expectation.  More often, we might optimize the expected costs (cumulative or final) plus a scaling term times a risk measure.  </li>
</ol>
</li>
</ul>
</li>
</ol>
</li>
</ol>
</li>
</ol>
</li>
</ul>
<p>Some notes about this modeling framework:  </p>
<ul>
<li style="list-style-type: none;">
<ul style="list-style-type: circle;">
<li>This framework can be used to model <em>any</em> sequential decision problem (which means any stochastic, dynamic model of a transportation system).</li>
<li>If you write a simulator of a sequential decision problem, your code can be translated directly to the modeling framework above, which means that you do not choose between using this framework or something else.  However, what often happens is that authors use other modeling styles, which means that what they are writing on paper is not the same as how they are actually implementing it in software.</li>
</ul>
</li>
<li><strong>Modeling the uncertainty</strong> - The next step is to model any forms of uncertainty.   These enter the model in one of two ways:
<ol style="list-style-type: lower-roman;">
<li>Uncertainty in the initial state [latex]S_0[/latex] - This might capture initial beliefs about any quantities or parameters (travel times, how a market responds to price).  These beliefs may remain static, or may evolve as we collect more information.</li>
<li>The exogenous information [latex]W_{t+1}[/latex] that is not known when we make a decision [latex]x_t[/latex].  
<ul style="list-style-type: circle;">
<li>There are three ways to create samples of uncertainties for the purpose of testing policies:
<ol style="list-style-type: lower-roman;">
<li>Collect samples of the random information (demands, prices, travel times, ...) from history.</li>
<li>Manually create outcomes that <em>might</em> happen, even if they have never actually happened.  We would use this approach to help design contingency plans for extreme events (earthquakes, hurricanes, disease outbreaks, cyber/physical attacks, ...).</li>
<li>Create a mathematical model of the random events, which can be used to generate large samples.  This is very attractive, but creating realistic models is technically challenging, and always involves introducing assumptions.  However, it makes it possible to sample from forecasted distributions that have not actually happened in the past.</li>
</ol>
</li>
<li>While papers tend to focus on how to make <em>decisions</em> in the presence of uncertainty, it is the <em>modeling</em> of uncertainty that is often the hardest, and most important, issue.  However, if you want to publish a paper in an operations research journal, you will have better luck focusing on what method (policy) you use to make decisions.</li>
</ul>
</li>
</ol>
</li>
<li><strong>Designing the policy -</strong> This is where we get to the problem of creating the function [latex]X^\pi(S_t)[/latex].  Policies (recall these are methods for making decisions - any method) can be created using two general strategies, each of which can be divided into two classes, creating what I like to call the "four classes of policies."  These four classes are universal - they include any method that you might already being using (which may be a hybrid).  A sketch of these are described below.  Readers interested in more depth are referred to chapter 11 of my book <a href="https://tinyurl.com/RLandSO/">RLSO</a> which can be downloaded from the <a href="https://tinyurl.com/RLandSO/">book webpage here.</a></li>
</ul>
<h2>The four classes of policies</h2>
<ul>
<li><strong>The policy search class</strong> – These are functions with parameters that have to be tuned to find the values that work best over time, averaged over all the possible sample paths. This class consists of two sub-classes:
<ul style="list-style-type: circle;">
<li><strong>1) Policy function approximations (PFAs)</strong> – These can be simple rules, linear functions, nonlinear functions (such as neural networks) and nonparametric functions.  PFAs include every possible function that might be used when we are searching for statistical models for machine learning.</li>
<li><strong>2) Cost function approximations (CFAs)</strong> – We can take a simplified optimization model and parameterize it so that it works better over time, under uncertainty.  CFAs are very popular in engineering practice, but virtually ignored in the stochastic optimization community.</li>
<li>Note: PFAs and CFAs are virtually always some form of parameterized policy, that we might write as [latex]X^\pi(S_t|\theta)[/latex].  Once we choose some form of PFA and CFA, we still have the optimization problem of choosing the best value of [latex]\theta[/latex].  We would write this problem as 
<ul style="list-style-type: circle;">
<li>[latex]max_\theta \mathbb{E} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t|\theta))|S_0\right\}[/latex] </li>
</ul>
</li>
</ul>
</li>
<li><strong>The lookahead class</strong> – This policy makes better decisions by estimating the downstream value of a decision made now. This class also has two sub-classes:
<ul style="list-style-type: circle;">
<li><strong>3) Policies based on value function approximations (VFAs)</strong> – This is the class (and the only class) that depends on Bellman's equation (also known as the Hamilton-Jacobi equations in control theory). It creates policies by optimizing the first period contribution (or cost) plus an approximation of the value of the state that a decision takes us to.</li>
<li><strong>4) Direct lookaheads (DLAs)</strong> – These are where we plan over some horizon using an approximate lookahead model.  Unlike VFA-based policies, we explicitly optimize over decisions we may make in the future. DLAs come in two broad flavors:
<ol style="list-style-type: lower-roman;">
<li>Deterministic lookaheads - This is easily the most widely used strategy in transportation and logistics.  Often overlooked is that deterministic lookaheads can be parameterized, creating a hybrid DLA/CFA (CFAs are parameterized optimization problems, but a vanilla CFA does not plan into the future).  Navigation systems (such as google maps) are a classic example of a deterministic lookahead.</li>
<li>Stochastic lookaheads - These come in many forms.  One of the best known in the operations research community for problems in transportation and logistics is stochastic programming (notably two-stage stochastic programs) first introduced by Dantzig in 1955 for a transportation problem involving aircraft.</li>
</ol>
</li>
</ul>
</li>
</ul>
<p>In addition to these four classes, we can create a variety of hybrids:</p>
<ul>
<li>Tree search terminated with value function approximations (DLA with VFA).</li>
<li>Deterministic lookahead, parameterized to make it perform better under uncertainty (DLA with CFA).</li>
<li>Monte Carlo tree search, which is a stochastic lookahead (DLA) with a rollout policy (which might be a PFA), exploration strategy (CFA, using upper confidence bounding) and value function approximations (VFA).</li>
<li>Any optimization-based policy (CFA, VFA or DLA) with rule-based penalties (PFA).</li>
</ul>
<p>In my experience, there is a big disconnect between what people use in practice (including researchers focusing on practical applications), and what commands the attention of the research literature.  I have found it useful to divide policies into five categories (I am already splitting DLAs into deterministic and stochastic lookaheads), and then organize these into three categories:</p>
<p>Category 1: These include PFAs, CFAs and (possibly parameterized) DLAs.  These are the simplest and are easily the most widely used in practice.  The choice of PFA, CFA or DLA tends to be obvious from the problem setting.  While these are the simplest, they introduce the challenge of parameter tuning, which is often overlooked, and can be quite challenging.</p>
<p>Category 2: These are stochastic DLAs, which are needed for certain classes of problems where deterministic approximations of the future simply don't work (and this tends to be obvious).</p>
<p>Category 3: Policies based on VFAs (this includes any policy based on approximating Bellman's equation.  I spent 20 years and have a 500+ page book on this class.</p>
<p>My finding is that the majority (and I might say the vast majority) of sequential decision problems are solved with policies in Category 1.  Then there are problems where we need a DLA, but where a deterministic lookahead just won't work.  For example, problems with random prices, or where we need to manage risk, typically require a stochastic DLA.  Finally, category 3 (the entire group of policies based on Bellman's equation) are easily the ones that are least-used in practice.  VFAs are exceptionally powerful for a very narrow class of problems.</p>
<p>Some closing notes on the choice of policies:</p>
<ul>
<li>It is <em>very</em> common to use some form of direct lookahead (DLA) for problems in transportation and logistics.  Quite often (I would say the vast majority of the time) people will create and solve some form of DLA and then assume they are done, without recognizing that this is a policy that represents one potential solution (that is, one method for making decisions) that has to be evaluated using the objective function above.  I have seen experts claim that if you solve the lookahead model exactly, then your solution is "optimal," without realizing that an optimal solution to an approximate lookahead model (lookahead models in transportation are virtually always approximations) is <em>not</em> an optimal policy.</li>
<li>Easily the most common mistake when "solving" sequential decision problems is the failure to recognize that equation (2) (or some variation), which involves optimizing over policies, is the proper objective function.  Failing to write this is comparable to failing to write out an objective function (such as [latex]C(x)[/latex] subject to constraints on <em>x</em>) for a deterministic optimization problem.  There are far too many papers that pick some class of policy, without realizing that searching for good policies is the objective.</li>
<li>It is very rare to find optimal policies for real problems in transportation, just as it is rare to find optimal solutions to complex deterministic problems (e.g. with integer variables and complex cost functions).  Normally, we are looking for effective policies that are not too difficult to compute.</li>
<li>PFAs and CFAs (as well as some deterministic DLAs) will have tunable parameters.  In this case, we would write our policy as [latex]X^\pi(S_t|\theta))[/latex], where [latex]\theta[/latex] is a vector of tunable parameters in the function [latex]X^\pi(S_t|\theta))[/latex], which has to be tuned by solving the optimization problem:<br />
<ul style="list-style-type: circle;">
<li>[latex]max_\theta \mathbb{E} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t|\theta))|S_0\right\}[/latex]                                                               (3)</li>
</ul>
</li>
<li>There are going to be problems which require a lookahead policy.  Often this will mean a stochastic lookahead.  These are covered in depth in chapter 19 of <a href="https://tinyurl.com/RLandSO/">RLSO</a> [see section 19.7 for a thorough overview of stochastic lookaheads].</li>
</ul>
<h2>The reviewing challenge: advice for editors and referees</h2>
<p>Reviewing stochastic, dynamic optimization papers in transportation and logistics is inherently more difficult than classical deterministic optimization models, or the growing number of papers focusing on machine learning.  Specifically:</p>
<ul>
<li>Stochastic, dynamic problems are inherently more complex.  There are more details, and the details are more subtle (especially related to the sequencing of decisions and information).</li>
<li>The lack of a standardized, canonical framework means that different papers, even when they are modeling similar problems, can look quite different. </li>
<li>Referees facing the daunting task of wading through a complex paper will be tempted to take the easier path: find something wrong and reject.</li>
</ul>
<p>I would like to illustrate the third bullet using my experience helping with the editing of Marlin Ulmer's paper (mentioned at the top of the page).  Marlin's paper was first rejected, and the editor asked me to help with the revision.  While I did put quite a bit of time into the paper, I did not change either any of the fundamental methodology, or his core modeling framework (he largely followed my framework above).  I did help make the paper clearer (for example, by introducing a narrative) along with a number of other minor edits.  In theory a good referee or AE could have done the same. However, the vast majority of my edits were cosmetic rather than substantive.</p>
<p>While I was helping transform Marlin's paper into an award-winning, my own stochastic, dynamic paper (an information-collecting vehicle routing problem for managing a utility truck after a storm) was being reviewed, and was rejected (<a href="https://tinyurl.com/ICVRP/">see the paper by Lina al-Kanj here</a>).  I think the rejection can be attributed to the same reason behind the rejection of Marlin's paper, with the exception that I avoided some of the presentation errors that Marlin had made.  After I filed a letter of complaint, the paper was re-reviewed, and the second round produced very thorough and helpful reviews.  The cover letter from the editor invited a revision, but expressed surprise at the length of the reviews.  The reason?  Stochastic, dynamic papers are inherently complex.</p>
<p>Two years later, I submitted another paper on a stochastic, dynamic vehicle routing problem (another information collecting vehicle routing problem involving managing drones to help fight wildfires).  This paper, by Larry Thul, was also rejected (<a href="https://tinyurl.com/ICVRP/">this paper is also posted here</a>) - both referee reports were about two pages, and did not demonstrate any understanding of the paper.  Why? Stochastic, dynamic papers are inherently complex, and it is easier to reject than to understand what is new.</p>
<p>These two papers illustrate that following a proper, canonical framework is not enough: the community has to agree that this framework is appropriate.  Referees and editors (AEs and area editors) need to enforce the style, and set reasonable expectations.  Stochastic, dynamic problems are pervasive in transportation and logistics, and yet I think I can claim that no two papers follow the same consistent style that we routinely see in deterministic optimization.</p>
<ul style="list-style-type: circle;">
<li style="list-style-type: none;">
<ul style="list-style-type: circle;">
<li style="list-style-type: none;"> </li>
</ul>
</li>
</ul>
<!-- /wp:tadv/classic-paragraph -->
