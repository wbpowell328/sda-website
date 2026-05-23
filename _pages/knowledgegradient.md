---
layout: page
title: "The Knowledge Gradient"
permalink: /knowledgegradient/
date: 2025-12-04 15:07:00
---

<!-- wp:tadv/classic-paragraph -->
<p style="text-align: center;">Warren B Powell<br />Professor Emeritus, Princeton University</p>
<p><br />In 2025, Peter Frazier, one of my former Ph.D. students, won the 2025 "Test of Time" award for his paper on the knowledge gradient for correlated beliefs that he performed while a Ph.D. student in my lab (2005-2008).  Much more than a best paper award, the "Test of Time" award represents the judgment of everyone who adopted this approach in the years since it first appeared (2008-2009).   </p>
<p>Peter's work opened up a decade of research performed by eight Ph.D. students and post-docs while in my lab.  This webpage is a summary of this work. <img class="aligncenter size-full wp-image-9446" src="https://castle.princeton.edu/wp-content/uploads/2026/02/KGTestofTimeAward-1.jpg" alt="" width="793" height="613" /></p>
<h4><strong>Test of Time Award Citation 2007–2011</strong></h4>
<p><strong>The Knowledge-Gradient Policy for Correlated Normal Beliefs</strong></p>
<p>Peter Frazier, Warren Powell, Savas Dayanik<br /><em>INFORMS Journal on Computing </em>21(4):599–613, Fall 2009<br />https://pubsonline.informs.org/doi/10.1287/ijoc.1080.0314</p>
<p>This paper introduces the now well-known knowledge-gradient (KG) method for gathering information when faced with a black-box objective, where query measurements may be both costly and noisy. The focus of the paper is on ranking and selection, but the KG method can be used also to study multiarmed bandit problems and many other models in Bayesian information collection. This very broad applicability led to a lively KG research area that continues to this day, with new developments studied in modern machine learning. It is an excellent example of work that has stood the test of time.</p>
<p>Peter Frazier prepared a retrospective of the knowledge gradient, which summarizes the body of research that followed the publication of the knowledge gradient (<a href="https://castle.princeton.edu/wp-content/uploads/2026/02/Frazier-retrospective-of-KG-Dec-2025.pdf">Click here)</a>.</p>
<p>Note that Peter (and the Bayesian optimization community) refer to the knowledge gradient as an "acquisition function." I use the more general term "policy" that recognizes that these active learning problems are just special cases of sequential decision problems, also known as dynamic programs.  In chapter 7 of my book <em><a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization</a>, </em>I address this class of problems under the heading of "derivative-free stochastic search" and illustrate all four classes of policies.  The knowledge gradient falls in the fourth class, direct lookahead approximations.</p>
<h4>Background</h4>
<p>There is a vast range of sequential decision problems, but in my opinion, by far the most important falls under the broad umbrella of "derivative-free stochastic search" where we are trying to solve the problem </p>
<p>[latex] min_x E_W F(x,W) [/latex]  </p>
<p>where [latex]x[/latex] may be a discrete scalar, or a continuous or discrete vector.  [latex]W[/latex] represents random inputs, and [latex]F(x, W)[/latex] is some process or function where we cannot compute the expectation, but we can observe a noisy sample observation [latex]{\hat F(x,W)}[/latex] for an [latex]x[/latex] that we choose, and inputs [latex]W[/latex] that we do not control.  We assume in this work that we do not have access to derivatives of [latex]F(x,W)[/latex].</p>
<p>Examples of [latex]F(x, W)[/latex] include: the revenue from advertising a product, the performance of a drug or medical treatment, the performance of a scientific experiment to produce a new material, the outcome of a simulation of a business process, the performance of an athlete or salesperson, ... The list is endless.</p>
<p>Although [latex]x[/latex] may be discrete or continuous, scalar or vector, the most common version of this problem involves identifying the best of a set of discrete choices which have uncertain values, as depicted below: <img class="aligncenter size-large wp-image-9279" src="https://castle.princeton.edu/wp-content/uploads/2026/01/Discrete-choices-uncertainty-1024x438.jpg" alt="" width="660" height="282" /></p>
<p>In chapter 7 of my 2022 book, <em>Reinforcement Learning and Stochastic Optimization,</em> I show how this problem can be solved with any of the four classes of policies.  However, two are the most widely used: </p>
<ul>
<li><strong>Upper confidence bounding</strong> - These are policies that compute an index for each (discrete) choice [latex]x[/latex] that consists of the current best estimate of its expected performance, plus an "uncertainty bonus" that can be calculated in any of a number of ways (this has kept computer scientists busy for years).  UCB policies are quite easy to compute, but the uncertainty bonus always includes a tunable parameter, and tuning this paper is hard (and widely overlooked).  However, the simplicity of the policy has made it very attractive in e-commerce for identifying (for example) the best product to display that will attract the most ad-clicks.</li>
<li><strong>Stochastic lookahead policies</strong> - These are policies that compute an index based on an approximation of how the information gained from the experiment will improve future decisions in some way.  This is where the knowledge gradient falls, since at its heart, it computes the value of the information from an experiment in terms of how it improves decisions in the future.  Expected improvement is a related policy that is also quite popular.  Stochastic lookahead policies are harder to compute, but generally do not have tunable parameters.  If they do, the tuning is much easier because the problem is well-scaled.  </li>
</ul>
<p>These policies are known in certain communities (such as Bayesian optimization) as <em>acquisition functions</em>.  I am not sure why this term has been adopted, since this term is unique to certain communities, which disguises its membership in the much more general problem class I refer to as <em>sequential decision problems. </em></p>
<p>My experience is that the knowledge gradient policy is best suited for problems where experiments are expensive, which means we have to exploit as much as possible any prior knowledge.  A particularly important property is its ability to minimize the dependence on tunable parameters.</p>
<p>The knowledge gradient for correlated beliefs appears to be the first policy that explicitly captured correlations between the beliefs of different alternatives.  This laid the groundwork for the research of other students (sometimes with Peter's help) that used other belief models, including linear models; models with sampled, parametric beliefs; models where each alternative is described with a multidimensional attribute vector, leading to a belief model based on hierarchical aggregation; and a belief model using local parametric beliefs.  </p>
<h4>Software</h4>
<p>Peter Frazier has made his software library for the knowledge gradient, including the calculation of the knowledge gradient for correlated beliefs, <a href="https://tinyurl.com/GitHubKG/">on GitHub here.</a></p>
<h4>Learning while doing video</h4>
<p>A powerful strategy to achieve steady improvement of operations sometimes involves adjusting parameters in the field.  I prepared a video demonstrating this for a mutual fund struggling to find the right amount of cash to keep on hand to meet redemptions.  The video illustrates a UCB-style policy (called "Interval estimation") along with an application of the knowledge gradient, which is explained without mathematics.  The video brings out the challenge of tuning parameters in simpler policies such as those in the UCB class.  KG is somewhat more complex, but does a better job of exploiting prior knowledge, and does not have any tunable parameters.</p>
<p><a href="https://tinyurl.com/LearningWhileDoing/">Access the video here.</a></p>
<h4>Teaching materials</h4>
<p>The "optimal learning" problems addressed by the knowledge gradient span an important class of sequential decision problems.  I would argue that this is by far the most common decision problem that people have to solve on a day-to-day basis.  I have prepared teaching materials on sequential decision problems:</p>
<p><a href="https://tinyurl.com/TeachingSDA/">Teaching materials for sequential decision problems</a></p>
<p>Search on "Optimal/active learning" for the materials relevant to the knowledge gradient.</p>
<h4>Students and papers related to the knowledge gradient</h4>
<p>Below is a list of the students I supervised, starting with Peter Frazier, who did work developing and extending the knowledge gradient, often motivated by real applications, often in the hard sciences.  There was considerable joint work  - I have listed the papers under the student who was the primary author on the paper. </p>
<p><strong>Peter Frazier (Ph.D. student)</strong></p>
<ul>
<li>Frazier, P., W. B. Powell and S. Dayanik, “A Knowledge-Gradient Policy for Sequential Information Collection,” <em>SIAM J. on Control and Optimization</em>, Vol. 47, No. 5, pp. 2410-2439 (2008). – This was the first knowledge gradient paper, which used the more classical model of independent beliefs across the alternatives.</li>
<li>Frazier, W. B. Powell, S. Dayanik, “The Knowledge-Gradient Policy for Correlated Normal Beliefs,” Informs J. on Computing, Vol. 21, No. 4, pp. 585-598 (2009) – This paper, which won the “Test of Time” award, extended the knowledge gradient to the much more important problem where beliefs across alternatives were correlated, a property that applies to the vast majority of learning problems. This paper broke the mold in the multiarmed bandit community dating to the 1950s of assuming independent beliefs.</li>
<li>Frazier, P. I., and W. B. Powell, “Paradoxes in Learning and the Marginal Value of Information,” <em>Decision Analysis</em>, Vol. 7, No. 4, pp. 378-403, 2010. – This was the paper where we discovered that the value of information from an experiment might be nonconcave with respect to the number of times we repeat an experiment.  This happens whenever experiments are very noisy.</li>
<li>Frazier, P.I., and W. B. Powell, “Consistency of Sequential Bayesian Sampling Policies” SIAM J. Control and Optimization, Vol. 49, No. 2, 712-731 (2011). – In this paper, Peter outlined a new proof technique for proving asymptotic optimality of offline learning algorithms. He used this technique to prove that a highly popular policy known as “interval estimation” was *not* asymptotically optimal.</li>
<li>Negoescu, P. Frazier and W. B. Powell, “The Knowledge Gradient Algorithm for Sequencing Experiments in Drug Discovery,” Informs J. on Computing, Vol. 23, No. 3, pp. 346-363, 2011. – This paper was derived from Diana Negoescu’s undergraduate senior thesis (supervised by Peter Frazier) where she introduced the idea of using a linear belief model, which departed from the standard lookup table belief models for bandit problems.</li>
</ul>
<p><strong>Ilya Ryzhov (Ph.D. student)</strong></p>
<ul>
<li>Ryzhov, I., W. B. Powell, P. I. Frazier, “The knowledge gradient algorithm for a general class of online learning problems,” <em>Operations Research</em>, Vol. 60, No. 1, pp. 180-195 (2012). – In this paper, Ilya extended the original knowledge gradient algorithm for offline learning (typical of most stochastic search problems) to the online setting (typical of most multiarmed bandit problems).  The extension required a trivial modification of the offline knowledge gradient, extending all the results for offline learning to online learning.</li>
<li>Ilya Ryzhov, Martijn Mes, W.B. Powell, Gerald van den Berg, “Bayesian Exploration for Approximate Dynamic Programming,” Operations Research, Vol. 67, No. 1, pp. 198-214 (2019) – This paper adapted the principle of value of information for knowledge gradient to help solve the classical “exploration vs. exploitation” problem of approximate dynamic programming.  This is effectively an extension of the knowledge gradient from a pure learning problem to one involving a physical state.</li>
<li>I. Ryzhov and W. B. Powell, “Optimal learning on a graph,” <em>Operations Research</em>, Vol. 59, No. 1, pp. 188-201, 2011. – Here, the knowledge gradient was derived for finding the shortest path over a graph with unknown coefficients.</li>
<li>Ryzhov, I., W. B. Powell, “Information Collection for Linear Programs with Uncertain Objective Coefficients,” SIAM J. Optimization, Vol. 22(4), pp. 1344–1368 (2012). – This paper generalized the learning problem to the complex case of uncertainty about the cost coefficients in a linear program, generalizing his work in the previous paper.</li>
</ul>
<p><strong>Martijn Mes (post doc)</strong></p>
<ul>
<li>Mes, M., P. I. Frazier and W. B. Powell, “Hierarchical Knowledge Gradient for Sequential Sampling,” <em>J. Machine Learning Research</em>, Vol.12, pp. 2931-2974, 2011. – This paper extended the knowledge gradient to a problem where beliefs were formed using hierarchically aggregated estimates.  This proved particularly valuable for problems where the alternatives (the “bandits”) were described by vectors of attributes.</li>
</ul>
<p><strong>Warren Scott (Ph.D. student)</strong></p>
<ul>
<li>Scott, Warren, P. I. Frazier, and W. B. Powell. "The Correlated Knowledge Gradient for Simulation Optimization of Continuous Parameters Using Gaussian Process Regression." <em>SIAM J. on Optimization</em> 21, No. 3 (2011): 996-1026. – Warren Scott extended the general bandit framework to continuous alternatives, which means general continuous stochastic search problems.</li>
</ul>
<p><strong>Xinyu He (Ph.D. student)</strong></p>
<ul>
<li>Xinyu He, Warren B. Powell, “Optimal Learning for Stochastic Optimization with Nonlinear Parametric Belief Models,” SIAM J. Optimization, Vol. 28, No. 3, pp. 2327-2359, 2018. – This paper applied the knowledge gradient to problems where the belief model was represented by a finite sample of parametric belief models.</li>
<li>Xinyu He, Warren B. Powell, “Optimal Learning for Nonlinear Parametric Belief Models for Multidimensional Continuous Space,” SIAM J. Optimization, Vol. 28, No. 4, 2945-2974, 2018. – This paper extends the knowledge gradient to problems where the alternatives are continuous, and the belief model is a multidimensional parametric model.</li>
<li>Xinyu He, Kristofer-Roy Reyes, W.B. Powell, “Optimal Learning with Local Nonlinear Parametric Belief Models over Continuous Designs,” SIAM J. on Scientific Computing, Vol 42, No. 4, pp. A2134-2157. – This paper relaxed the assumption that we could assume that the true belief was one of a sampled set of parametric models, and instead used locally nonlinear approximations.  The work was demonstrated on a real problem in materials science. </li>
</ul>
<p><strong>Yan Li (Ph.D. student)</strong></p>
<ul>
<li>Yan Li, Han Liu, W.B. Powell, “A Lasso-based Sparse Knowledge Gradient Policy for Sequential Optimal Learning,” AISTATS, May, 2016. – This paper extended the knowledge gradient policy to high-dimensional linear belief models estimated using LASSO.</li>
<li>Yan Li, Kristopher G. Reyes, Jorge Vazquez-Anderson, Yingfei Wang, Lydia M Contreras, Warren B. Powell, “A Knowledge Gradient Policy for Sequencing Experiments to Identify the Structure of RNA Molecules Using a Sparse Additive Belief Model,” Informs. J. on Computing, Vol. 30, No. 4, 750-767 (2018) – Yan led the development of a knowledge gradient policy to identify the structure of RNA molecules using a sparse additive belief model. </li>
</ul>
<p><strong>Yingfei Wang (Ph.D. student)</strong></p>
<ul>
<li>Yingfei Wang, K. G. Reyes, K. A. Brown, C. A. Mirkin, W. B. Powell, “Nested Batch Mode Learning and Stochastic Optimization with an Application to Sequential Multi-Stage Testing in Materials Science,” SIAM J. Scientific Computing, Vol. 37, No. 3, pp. B361-B381, 2015. – This paper extended the knowledge gradient to experimental work where experiments could be run in batches.</li>
</ul>
<p><strong>Si Chen (Ph.D. student)</strong></p>
<ul>
<li>Si Chen, K-R G. Reyes, M. Gupta, M. C. McAlpine, W. B. Powell, “Optimal Learning in Experimental Design Using the Knowledge Gradient Policy with Application to Characterizing Nanoemulsion Stability,” SIAM J. Uncertainty Quantification, Vol. 3, pp. 320-345, 2015. – Hidden in this paper was a major computational advance using the knowledge gradient with sampled parametric belief models. </li>
</ul>
<p>The experience of supervising all this research helped me develop a comfort level with recognizing that "belief states" are legitimate elements of any state variables for dynamic systems where learning is happening.  I supervised two papers that involved managing physical resources (vehicles) while learning was occurring.  Both are available here.  Brief summaries are:</p>
<ul>
<li><strong>Lina al-Kanj, Warren Powell, Belgacem Bouzaiene-Ayari, <em>The Information-Collecting Vehicle Routing Problem: Stochastic Optimization for Emergency Storm Response -</em> </strong>This paper optimizes the movement of a utility truck after a storm, where the utility truck has to learn where trees have fallen down while also repairing places where a tree has damaged a power line.  This involves managing a physical resource (the utility truck) while also learning about the state of the network, producing a problem with both a physical state and a belief state.  The problem is solved using a stochastic lookahead policy solved using Monte Carlo tree search, which is robust to complex state variables (the belief state is high-dimensional and continuous).</li>
<li><strong>Lawrence Thul, W.B. Powell, <em>An Information-Collecting Drone Management Problem for Wildfire Mitigation, Jan 18, 2023 -</em></strong> This project involved managing a drone that was collecting information about a fire.  Beliefs about the state of the fire were then used to guide the dispatching of a helicopter dropping fire retardant on the fire.  The physical state describes the location of the drone that has to be dynamically managed while in the air.  The belief state describes what we know about the fire.  </li>
</ul>
<p> </p>
<p> </p>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph /-->
