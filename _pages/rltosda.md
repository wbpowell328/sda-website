---
layout: page
title: "From reinforcement learning to sequential decision analytics"
permalink: /rltosda/
date: 2022-03-24 10:47:25
---

<!-- wp:tadv/classic-paragraph -->
<p>Warren B Powell</p>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph -->
<p>"Reinforcement learning" has been undergoing an evolution from the early work in the 1980s-1990s where it focused on a form of approximate dynamic programming called Q-learning, to the study of a diverse range of algorithmic strategies for sequential decision problems.&nbsp; Since this time it has continued to evolve, along with a number of other communities that also work on sequential decision problems.&nbsp; I feel I have anticipated where those entire evolution is likely to end up.</p>
<p>Please enter any comments on the ideas in this page at <a href="https://tinyurl.com/RLSOcomments">https://tinyurl.com/RLSOcomments</a>.</p>
<p><img class="size-medium wp-image-7108 alignright" src="https://castle.princeton.edu/wp-content/uploads/2021/09/Powell-RLSO-WIleyFrontCover-199x300.jpg" alt="" width="199" height="300">My new book,&nbsp;<em>Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions (RLSO)</em> is the first book to propose a universal framework that models&nbsp;<em>any</em> sequential decision problem, from pure learning (multiarmed bandit) to complex resource allocation problems.&nbsp; We formally pose the problem of optimizing over policies (methods for making decisions), and present four classes of policies that include&nbsp;<em>any</em> method for making decisions.&nbsp; The entire book is organized around this universal modeling framework and the four classes of policies.</p>
<p><img class="size-medium wp-image-7293 alignleft" src="https://castle.princeton.edu/wp-content/uploads/2022/03/Jungleofstochasticoptimization-300x225.jpg" alt="" width="300" height="225">This modeling framework spans 15 distinct communities that work on sequential decision problems. These communities use eight distinct notational systems, and feature a wide range of solution techniques tailored to specific problem domains that arise in different fields.&nbsp; However, there are four fields that make particularly important contributions: Markov decision processes, math programming, optimal (stochastic) control, and stochastic search (derivative-based and derivative-free).&nbsp; Of course, we will draw heavily on the tools of machine learning and Monte Carlo simulation.</p>
<p><img class=" wp-image-7294 alignright" src="https://castle.princeton.edu/wp-content/uploads/2022/03/Evolutionofjungle-300x224.jpg" alt="" width="360" height="269"><span style="font-size: revert;">Most of these communities have been evolving from an initial algorithmic strategy to different strategies that span the four classes of policies.&nbsp; This evolution has been taking place in a number of communities that work on sequential decision problems - the best illustration is the second edition of Sutton and Barto's&nbsp;<em>Reinforcement Learning</em> book that now includes policy gradient methods, upper confidence bounding and Monte Carlo tree search.&nbsp; In the graphic to the right, I have listed seven of the most prominent communities: stochastic search (derivative-free and derivative-based), simulation optimization, multiarmed bandits, optimal control, Markov decision processes, reinforcement learning and stochastic programming.&nbsp; I then show which of the four classes of policies are actively studied in each community (wider lines represent the policies that were initially studied).</span></p>
<p>Below I list the differences between how these problems are described and solved in the reinforcement learning literature, and the modeling and solution approach that I use in RLSO.&nbsp; I claim that my approach better represents how people in the RL community actually write their software, and the algorithms that are actually being used (including algorithms that have not yet been adopted!). Below I touch on three issues:</p>
<ul>
<li>Modeling - This addresses notational choices and the elements of a sequential decision problem.</li>
<li>Designing policies - I identify four (meta)classes of policies that include&nbsp;<em>any</em> method for making decisions in a sequential decision problem.</li>
<li>Policy search/parameter tuning - I have been surprised at how often the RL community ignores the important step of tuning parameters within a policy.</li>
</ul>
<p><strong>Modeling</strong></p>
<ul>
<li><strong>&nbsp;The modeling framework.</strong> Reinforcement learning adopted the modeling framework of Markov decision processes, which captures state <em>spaces</em>, action&nbsp;<em>spaces</em>, the one-step probability transition matrix [latex]P(s'|s,a)[/latex] which is the probability of transitioning from state <em>s</em> to state&nbsp;<em>s'&nbsp;</em>after taking action&nbsp;<em>a,&nbsp;</em>and the reward&nbsp;<em>r(s,a)</em>. This framework was designed by mathematicians, and offers virtually no value in terms of modeling real problems. I draw heavily from the modeling framework used in optimal control (but not the notation), where I can model any sequential decision problem using five components:
<ul style="list-style-type: circle;">
<li>State variables [latex]S_t[/latex] giving all the information at time <em>t</em> to model the system from time&nbsp;<em>t&nbsp;</em>onward.&nbsp; We could use [latex]S^n[/latex] to model the information after <em>n</em> observations/iterations/experiments.&nbsp; State variables are widely misunderstood (neither Sutton and Barto nor Bertsekas define a state variable).&nbsp; See chapter 9, section 9.4 of <em>RLSO </em>for a detailed definition and discussion of state variables.</li>
<li>Decision variables [latex]x_t[/latex] - While the RL community tends to focus on discrete actions&nbsp;<em>a</em>, [latex]x_t[/latex] (adopted from the field of math programming, used around the world) can be binary, discrete, continuous, and vectors of continuous and/or discrete variables (in other words, anything).&nbsp; Decisions at time <em>t</em> have to reflect any constraints [latex]x_t \in X_t[/latex].&nbsp; We make decisions using a method we call a <em>policy</em>, that we represent using [latex]X^\pi(S_t)[/latex], but we defer designing policies until later (this is the basis of what I call "model first, then solve").</li>
<li>Exogenous information [latex]W_{t+1}[/latex] - This is the information that arrives between&nbsp;<em>t</em> and&nbsp;<em>t+1</em> (or we can use [latex]W^{n+1}[/latex] is what we observe in the&nbsp;<em>n+1st</em> experiment).&nbsp; Exogenous information can come from Monte Carlo simulation using a probability distribution, or it can come from historical data or field observations (in an online setting).&nbsp;</li>
<li>Transition function [latex]S_{t+1}=S^M(S_t,x_t,W_{t+1})[/latex] - Transition functions are widely used in optimal control and engineering, where they use [latex]x_{k+1}=f(x_k,u_k,w_k)[/latex] to represent the transition function from state [latex]x_k[/latex] at ''time'' <em>k, </em>apply&nbsp;control [latex]u_k[/latex], and then observe [latex]w_k[/latex] (which is random at ''time'' <em>k</em>).&nbsp; Our notation [latex]S^M(\cdot)[/latex] stands for ''state transition model'' (or ''system model'').&nbsp; The one-step transition <em>matrix</em> used in the RL/MDP communities is almost never computable, while transition <em>functions</em> are easy to compute.&nbsp; When people talk about ''simulating the transition matrix'' they actually mean using the transition function.</li>
<li>The objective function - We prefer to maximize contributions [latex]C(S_t,x_t)[/latex] (or minimize costs).&nbsp; Our objective function optimizes over policies [latex]X^\pi(S_t)[/latex].&nbsp; Objective functions come in different flavors: final reward/cumulative reward, expectation/risk/ ... If we use a classical expectation-based objective of a cumulative reward, we would write:</li>
</ul>
</li>
</ul>
<p>[latex]\max_{\pi} \mathbb{E} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))|S_0 \right\}[/latex]</p>
<ul>
<li><strong>&nbsp;From model to software.&nbsp;</strong> There is a one-to-one relationship between the modeling framework I use and the software implementation.&nbsp; Anyone who writes a simulation model of a sequential decision problem can directly translate their code back to the modeling framework above.&nbsp; This is true of anyone working in reinforcement learning using the standard modeling style in this community, even if they are not familiar with the modeling framework in RLSO.</li>
<li><strong>&nbsp;Finite-horizon vs. steady state.</strong>&nbsp; For historical reasons (see chapter 14 in RLSO), the MDP community uses a steady-state model.&nbsp; We follow the style of communities like optimal control and stochastic programming and use a finite-time model, which is most useful in the vast majority of practical applications.</li>
</ul>
<p><strong>Designing policies</strong></p>
<ul>
<li><strong>&nbsp;We optimize over policies.&nbsp;</strong> In the RL/MDP community, it is very common that people completely ignore objective functions, but when the objective function above is written, authors then transition to Bellman's equation:</li>
</ul>
<p>[latex]V(s) = \max_x \left[C(S,x)+\sum_{s'}P(s'|s,x)V(s')\right][/latex]</p>
<p>This is almost never computable, so people then begin creating algorithms for approximating the value functions, which is often viewed as some form of magic.&nbsp; I spent 20 years working on this strategy, and while I enjoyed some real breakthroughs, I came to realize that this approach only works on a very narrow set of applications.&nbsp;&nbsp;</p>
<p>We optimize over all four classes of policies (these are meta-classes), which covers&nbsp;<em>any</em> approach that you might use.&nbsp; The four classes of policies can be divided into two broad strategies: policy search and lookahead approximations:</p>
<ul>
<li style="list-style-type: none;">
<ul>
<li><strong>Policy search</strong> - Here we search over families of functions (for making decisions) to find the one that works best on average over time.&nbsp; This approach consists of two classes:
<ul style="list-style-type: circle;">
<li><strong>Class 1: Policy function approximations (PFAs)</strong> - These are analytical functions that map the information in the state variable to a feasible decision.&nbsp; PFAs include any function that might be used as a statistical model in machine learning: lookup tables, parametric functions, and nonparametric functions.</li>
<li><strong>Class 2: Cost function approximations (CFAs)</strong> - CFAs are parameterized optimization problems which are typically some form of deterministic optimization model.&nbsp; We can parameterized the objective, the constraints, or both.&nbsp; CFAs are widely used in practice, but almost completely overlooked in the academic community, with one notable exception: upper confidence bounding policies for learning problems (multiarmed bandit problems).</li>
</ul>
</li>
<li><strong>Lookahead approximations</strong> - These are policies that optimize immediate costs/contributions plus the downstream costs/contributions resulting from the decision made now.&nbsp; These also come in two flavors:
<ul style="list-style-type: circle;">
<li><strong>Class 3: Value function approximations (VFAs)</strong> - Here we approximate the value [latex]{\bar V}_{t+1}(S_{t+1}|\theta)[/latex] giving us the policy</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>[latex]X^\pi(S_t|\theta)&nbsp; = argmax_{x_t}\left(C(S_t,x_t) + \mathbb{E}\left\{{\bar V}_{t+1}(S_{t+1}|\theta)|S_t\right\}\right)[/latex]</p>
<p>The expectation inside the max operator makes it difficult (usually impossible) to handle problems where&nbsp;<em>x</em> is a vector, but we can use a post-decision state [latex]S^x_t[/latex] which is the state immediately after we make a decision (the RL community uses the unusual term "after state" variable, but it is important to recognize that it is the state after a decision is made).&nbsp; &nbsp;This produces the policy:</p>
<p>[latex]X^\pi(S_t|\theta)&nbsp; = argmax_{x_t}\left(C(S_t,x_t) + {\bar V}^x_t(S^x_t|\theta)\right)[/latex]</p>
<p>Now we have a deterministic optimization problem, which opens the door to using solvers such as Cplex and Gurobi, making it possible to handle high-dimensional decision vectors such as arise in resource allocation problems.</p>
<p>VFA policies are known in the RL community as Q-learning, where [latex]Q(s,a)[/latex] (using&nbsp;<em>a</em> for action instead of&nbsp;<em>x</em> for decision) is the value of being in state <em>s</em> and taking action <em>a</em>.&nbsp; The policy would be written</p>
<p>[latex]A^\pi(S_t)&nbsp; = argmax_{a}{\bar Q}(S_t,a)[/latex]</p>
<ul>
<li style="list-style-type: none;">
<ul>
<li style="list-style-type: none;">
<ul style="list-style-type: circle;">
<li><strong>Class 4: Direct lookahead approximations (DLAs)</strong> - Here we optimize over some planning horizon.&nbsp; There are two broad strategies for doing this:
<ul>
<li>Deterministic lookaheads - As done with Google maps, we optimize a deterministic approximation over some planning horizon, such as finding the path to the destination.&nbsp; We can parameterize this and create a hybrid DLA/CFA.</li>
<li>Stochastic lookaheads - Now we have to solve a stochastic optimization problem within the optimization problem in our lookahead policy.&nbsp; This is covered in depth in Chapter 19 of <em>RLSO</em>.</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph -->
<p>DLA policies are widely known under the name "model predictive control."  </p>
<p><strong>Policy search/parameter tuning</strong></p>
<ul>
<li>A problem that frequently arises in the context of sequential decision problems is the need to perform what could be called "policy search" or "parameter tuning."  Imagine that we have a parameterized policy [latex]X^\pi(S_t|\theta) [/latex] that we evaluate using</li>
</ul>
<p>[latex]F(\theta) = \mathbb{E}\left\{\sum_{t=0}^T C(S_t,X^\pi(S_t|\theta))|S_0\right\} [/latex]</p>
<p>where [latex]S_{t+1} = S^M(S_t,X^\pi(S_t|\theta),W_{t+1})[/latex]. A simple example of [latex]X^\pi(S_t|\theta)[/latex] would be a UCB policy popular in reinforcement learning for multiarmed bandit problems, given by</p>
<p>[latex]X^\pi(S_t|\theta) = \argmax_x \big({\bar \mu}_{tx} + \theta {\bar \sigma}_{tx}\big)[/latex]</p>
<p>where [latex]x[/latex] is one of a set of discrete choices (drugs, products),  [latex]{\bar \mu}_{tx}[/latex] is our current estimate of how well [latex]x[/latex] will perform after <em>t</em> observations, and [latex]\theta {\bar \sigma}_{tx}[/latex] is the estimate of the standard deviation of [latex]{\bar \mu}_{tx}[/latex].</p>
<p>Since we can never actually compute the expectation, we need a way for generating samples [latex]W^n_1, \ldots, W^n_T[/latex] for a sample [latex]n=1, \ldots, N[/latex].  We then approximate [latex]F(\theta)[/latex] using [latex]{\bar F}(\theta)[/latex] using</p>
<p>[latex]{\bar F}(\theta) = \frac{1}{N}\sum_{n=1}^N\sum_{t=0}^T C(S^n_t,X^\pi(S^n_t|\theta)) [/latex]</p>
<p>where [latex]S^n_t[/latex] is the state generated by following sample path [latex]W^n_1, \ldots, W^n_T[/latex].</p>
<p>We now face the problem of determining the best value of [latex]\theta[/latex].  We have been surprised at how often this is overlooked in the RL community, such as tuning [latex]\theta[/latex] in our UCB policy above. </p>
<p>Tuning is its own sequential decision problem, which can be tackled using either derivative-based methods (see Chapter 5 in RLSO) or derivative-free methods (Chapter 7).  This means that tuning a policy for multiarmed bandit problems requires solving another multiarmed bandit problem. We can model the tuning problem as a Markov decision problem, and solve it using any of the four classes of policies!  (See Chapter 7 for an in-depth discussion of this issue).</p>
<ul>
<li> </li>
</ul>
<p> </p>
<!-- /wp:tadv/classic-paragraph -->
