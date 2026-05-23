---
layout: page
title: "What is AI?"
permalink: /what-is-ai/
date: 2019-04-15 11:25:06
---

<!-- wp:paragraph -->
<p>Warren B Powell - Princeton University  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>(<a href="http://tinyurl.com/whatisaicomments">I welcome comments on the thoughts on this webpage - Please enter them here</a>.)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There are a lot of articles appearing about "What is AI" (along with "What is machine learning" and "What is reinforcement learning") that talk about these terms using vague language (<a href="http://www.bbc.com/future/story/20190606-the-maths-problem-that-modern-life-depends-on">see the article from BBC Future that proposes to use "reinforcement learning" to solve dynamic resource allocation problems.</a>).  This web page discusses these topics in more concrete terms, but with minimal mathematics.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There are three approaches computers can use to exhibit intelligence:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>1)  <strong>Rule-based logic</strong> - This was the original form of "artificial intelligence" in the 1960's and 70's, but it is still used today.  "If furniture has four legs and a seat, it is a chair" or "if the credit score is over 600, grant the loan" are simple examples.  In a health context, the attributes of a patient are more complicated ("if patient is male, and if a smoker, and if over 50, and if ... and if ... then order treatment X").  If the input data (for the "if" statements) has more than three or four dimensions, the rule becomes quickly intractable.  This is the reason that "rule-based AI" failed, but we note that simple business rules remain widely used today in virtually all systems.  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2)  <strong>Making estimates using data from the environment</strong>  - This is the domain of machine learning, also known as statistics, statistical learning and, more broadly, data sciences.  It helps to divide this into two broad classes:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Supervised learning - This is the domain of "big data" where a large training dataset consisting of input-response (such as, faces with names - the machine learning community refers to the "response" as labels) is used to train a machine learning model.</li><li>Unsupervised learning - Here we cluster input data (such as attributes of patients or customers) but without access to labels/responses.</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>3) <strong>Making decisions that interact with the environment</strong> -  Decisions involve a controllable quantity, and a metric that evaluates the performance of the decision. These arise in both static and sequential settings. Algorithmic strategies for making decisions are quite rich, but for this discussion it is useful to identify the following classes of methods:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Rule-based logic - We can use rules to make decisions, such as "if a patient has these symptoms, then apply this treatment."</li><li>Deterministic optimization - Powerful solvers for high-dimensional problems known as linear programs (where quantities can be continuous) emerged in the 1990s, followed by breakthroughs for integer programs ~2000.  These are widely used in static planning problems such as airline scheduling.</li><li>Reinforcement learning - These methods emerged in the 1980's in the context of describing how a mouse finds its way out of a maze, and was ultimately applied to the Chinese game of Go.  It has been primarily applied to "single entity" problems such as controlling robots, playing games, or guiding a physician, as opposed to more complex resource allocation problems.</li><li>Stochastic optimization - This is an umbrella term for a wide range of modeling and algorithmic strategies for solving decision problems in the presence of uncertainty.  The problem domain is so rich it has been studied by over 15 distinct research communities, spanning problems from optimal stopping to high-dimensional resource allocation problems.  Recently, we have pulled these together into a single, unified framework that draws on the tools of deterministic optimization, machine learning and simulation (<a href="http://jungle.princeton.edu">see the jungle of stochastic optimization</a>).   </li></ul>
<!-- /wp:list -->

<!-- wp:paragraph {"fontSize":"medium"} -->
<p class="has-medium-font-size"><strong>Making estimates using data from the environment</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Estimation come in three flavors:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>a) <strong>Classification</strong> - e.g. identifying the name of a person from an image, words being spoken, or the identity of a song from a recording. This tends to have right vs. wrong answers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>b) <strong>Inference </strong>- For example, estimating the deterioration of a piece of machinery, or inferring the number of people infected by a disease.  Inferences typically imply some error in our estimation of an unknown truth, where we wish to minimize some measure of the errors.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>c) <strong>Prediction</strong> - These are estimates about the future, such as the amount of snowfall or the movement of a stock price.  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In all three cases, we have observable (input) data <em>x</em> (such as an image, the characteristics of a patient, or a history of stock prices) from which we wish to make inferences about something that is not known (or observable) to us right now (the identity of the image, diagnosing a disease, or future stock prices).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>While these are different settings, they all require the same machinery of statistical modeling (all forms, not just neural nets).&nbsp; Central to making inferences is that you have some model [latex]f(x|\theta)[/latex] where "<em>x</em>" is a set of known inputs (for example, prices), and [latex] f(x|\theta) [/latex] is a function that predicts a response <em>y</em> (such as the observed sales at price <em>x</em>).&nbsp; Imagine that you have a set of inputs (prices) [latex]x^1, ..., x^N[/latex], and the corresponding responses (observed sales) [latex]y^1,...,y^N [/latex] .  For our sales problem, we might use the function</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> [latex] Sales = f(x|\theta) = \theta_0 - \theta_1 x[/latex]</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>which captures the behavior that higher prices produce lower sales. This is an example of a <em>parametric function</em>.  For more complicated functions, we might use any of a family of models, including neural networks, but these require very large datasets of inputs [latex]x^1,...,x^n[/latex] and observations [latex]y^n[/latex] to fit the model.  If we use a neural network to model demand as a function of price, it is entirely possible (in fact, likely) that the estimated demand will rise and fall even as prices are increased.  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We then want to find the function [latex]f(x|\theta)[/latex], and the parameters [latex]\theta[/latex], that solves the model fitting problem</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>               [latex] \min_\theta \sum_{n=1}^N [y^n-f(x^n|\theta)]^2[/latex].</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>But to determine the best function [latex]f(x|\theta)[/latex], and to find the best [latex]\theta[/latex], you need a set of these responses [latex]y^n[/latex].  This is known as <em>supervised learning</em>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Statistical models can be classified under three headings:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li><strong>Lookup table</strong> - Here "<em>x</em>" is discrete (e.g. the gender of a patient) or discretized (e.g. the blood sugar of a patient).  A lookup table requires a different estimate (or classification) for each value of "<em>x.''</em>  "<em>x</em>" may have multiple dimensions (age, gender, ethnicity) in which case the number of possible values of "x" can grow dramatically - this is the classic "curse of dimensionality."</li><li><strong>Parametric models</strong> - A simple linear parametric model might write demand as a function of price using [latex]D(p|\theta) = \theta_0 - \theta_1 p + \theta_2 p^2[/latex].  More complex functions might be nonlinear in the parameters such as  [latex]D(p|\theta) = \theta_0 e^{-\theta_1 p}[/latex].  Neural networks are a type of nonlinear model, but typically with a <em>lot</em> of parameters, which means they need a lot of data. </li><li><strong>Nonparametric/locally parametric</strong> - This is a class of advanced models that includes deep neural networks, but could also include models that use simple approximations (perhaps constants or linear models) that only apply to specific regions.  These models require more data (and sometimes a lot of data).</li></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>The rest of the discussion explores these ideas in more depth.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"fontSize":"medium"} -->
<p class="has-medium-font-size"><strong>Making decisions that interact with the environment</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In the context of this discussion, we identify two broad classes of decisions:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>o Decisions that change the environment.</strong> These decisions might change the physical device (such as moving from one location to another, acquiring/using inventory, taking a drug, or investing in stocks) or setting parameters such as the price of a product.  Choosing website designs or restaurant menus fall in this category.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>o Decisions to exchange information. </strong> It helps to identify two classes of "information decisions":</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li><strong>Decisions to acquire information</strong> - We might run a laboratory or field experiment, take a medical image, or simulate an operational problem in the computer to collect information that changes what we know about the environment. This information is then used to make better decisions that directly change the environment.  </li><li><strong>Decisions to communicate/disseminate information.</strong>  We might send a signal, email a coupon or broadcast an ad to inform other decision makers.</li></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Some decisions may change the physical environment while also producing information, such as traversing a network (or making a move in a game) that also allows us to learn about the network (or the response of an opponent).  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It helps to have the notion of the "state" of our system which contains all the information needed to make a decision.  The state, which we denote [latex]S_t[/latex], can be a physical state  [latex]R_t[/latex]  (the location of a vehicle, how much water is in a reservoir), other information  [latex]I_t[/latex]  (weather, forecasts, prices), and possibly beliefs [latex]B_t[/latex]  about quantities we cannot observe directly.  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For example, in our demand model [latex]D(p|\theta) = \theta_0 - \theta_1 p[/latex], we may not know [latex](\theta_0,\theta_1)[/latex], but we might have estimates along with information about the accuracy of the estimates (such as a mean and variance).   We might also have beliefs about the deterioration of a piece of machinery, or the presence of disease in a population.  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Pure information collection decisions only change the belief state [latex]B_t[/latex], which does not directly affect the environment, but will have an impact on decisions that do affect the environment.  Problems with just a belief state are pure learning problems, known in some communities as "multiarmed bandit" problems, but there are many problems with physical and/or information states that also have belief states.  When decisions may change the belief state, they become <em>active learning problems.</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We evaluate decisions using a cost or contribution function [latex]C(S,x)[/latex] that, given a "state" <em>S</em> (which contains all the information we need to make a decision) and a decision <em>x</em> (that you control), [latex]C(S,x)[/latex] is a metric of how well we have done.&nbsp; If we have a deterministic problem, we might be looking for an optimal decision [latex]x*[/latex].  </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For sequential problems (and especially sequential problems where there is some form of uncertainty), we are looking for a decision function, or <em>policy</em>, for making decisions that we like to write [latex]x_t = X^\pi(S_t)[/latex].  Rather than finding optimal decisions, we aspire to find optimal policies, although in practice this is quite rare.  The challenge of finding policies is an essential feature of problems where decisions have to be made over time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There are many communities that address the challenges of making decisions under uncertainty.  We refer to these communities as the "<a href="http://jungle.princeton.edu">jungle of stochastic optimization</a>" using names such as dynamic programming (or Markov decision processes), optimal control (or stochastic control), simulation-optimization, stochastic programming, decision analysis, and stochastic search, along with communities that use names such as multiarmed bandit problems and active learning.  However, in recent years one name has caught the attention of the broader public, and that is "reinforcement learning" which emerged from the work in the 1980's of Rich Sutton and Andy Barto in computer science.    <a href="http://www.castle.princeton.edu/what-is-rl/">I have prepared a webpage on reinforcement learning here</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:tadv/classic-paragraph /-->
