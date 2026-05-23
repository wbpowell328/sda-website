---
layout: page
title: "From the jungle of stochastic optimization to... Sequential Decision Analytics"
permalink: /jungle/
date: 2017-09-05 18:21:44
---

<p class="medium" align="left"><span style="font-size: 12pt;">I send out frequent updates regarding my work on LinkedIn - if you are not a follower, please reach out and ask to join.</span></p>
<p align="left"><span style="font-size: 12pt;">Some highlights:</span></p>

<ul>
 	<li><span style="font-size: 16px;">New! I have created <a href="http://www.castle.princeton.edu/sda/">a webpage summarizing a field that I am calling "sequential decision analytics"</a>.  See the<a href="https://www.youtube.com/watch?v=qAbDgXZkRmY"> video introduction to sequential decision analytics</a>.</span></li>
 	<li><span style="font-size: 12pt;">For an introduction to the unified framework: I revised and re-recorded a tutorial on the unified framework that I gave at the Kellogg School of Business at Northwestern (February 2020).  It is now on YouTube in two parts:</span>
<ul style="list-style-type: circle;">
 	<li><a href="http://tinyurl.com/unifiedframeworktutorialpartI">Part I - Describes applications, the universal modeling framework, and introduces the four classes of policies for making decisions in the context of pure learning problems (derivative free stochastic search, also known as bandit problems).</a> <a href="https://castle.princeton.edu/wp-content/uploads/2021/05/Powell-Unified-Framework-90-minute-Northwestern-Youtube-May-2021-Part-I.pptx">Slides to Part I</a>.</li>
 	<li><a href="http://tinyurl.com/unifiedframeworktutorialpartII">Part II - Here I illustrate the four classes of policies in the context of more general state-dependent problems.  I then briefly illustrate how these ideas are used at Optimal Dynamics.</a> <a href="https://castle.princeton.edu/wp-content/uploads/2021/05/Powell-Unified-Framework-90-minute-Northwestern-Youtube-May-2021-Part-II.pptx">Slides to Part II</a>.</li>
</ul>
</li>
 	<li><span style="font-size: 12pt;">Scroll down to "Educational materials" for more material.</span></li>
 	<li>
<p class="medium" align="left"><span style="font-size: 12pt;">Scroll down to "Talks and videos" for other presentations. </span></p>
</li>
</ul>
<p class="medium" align="left"><span style="font-size: 12pt;">Sequential decision problems are problems that consist of decision, information, decision, information, .... while incurring costs or receiving rewards.  Sequential decision problems cover an incredibly broad problem class, spanning engineering, the sciences, business, economics, finance, health, transportation, energy and e-commerce.   The problems may be discrete dynamic programs, continuous control problems, graph problems, stochastic search, active learning, and multiagent games and applications.  </span></p>
<p class="medium" align="left"><span style="font-size: 12pt;">We have a very good handle on modeling deterministic optimization problems, but the universe of problems that involve sequential decisions and information have resisted being expressed in the kind of common canonical framework that has become universal in deterministic optimization.</span></p>
<p class="medium" align="left"><span style="font-size: 12pt;">Sequential decision problems are so diverse that the field has become fragmented into a Balkanized set of <img class="size-medium wp-image-5532 alignright" src="https://castle.princeton.edu/wp-content/uploads/2019/03/jungle_screenshot_March2019-300x225.jpg" alt="" width="300" height="225" />communities with competing algorithmic strategies and modeling styles. It is easy to spend a significant part of a career mastering the subtleties of each perspective on stochastic optimization, without recognizing the common themes.</span></p>
<p align="left"><span style="font-size: 12pt;">We have developed a unified framework that covers all of these communities. We break all sequential decision problems into five components: state variables, decision variables, exogenous information variables, the transition function, and the objective function. We search over <em>policies, </em>which are functions (or methods) for making decisions. We have identified two core strategies for designing policies (policy search, and policies based on lookahead approximations), each of which further divides into two subclasses, creating four classes that cover all of the solution approaches in the books illustrated above, as well as anything being used in practice.</span></p>
<p align="left"><span style="font-size: 12pt;">The modeling and algorithmic challenges involve three core elements:</span></p>

<ul>
 	<li><span style="font-size: 12pt;">Modeling the problem (state variables, decision variables, exogenous information processes, transition function, objective function).</span></li>
 	<li><span style="font-size: 12pt;">Modeling the uncertainty (uncertainty quantification).</span></li>
 	<li><span style="font-size: 12pt;">Designing and evaluating policies.</span></li>
</ul>
<p align="left"><span style="font-size: 12pt;">There is a growing community, which started in computer science, which uses the term "reinforcement learning" to refer to sequential decision problems.  <a href="http://www.castle.princeton.edu/what-is-ai/">My explanation of "artificial intelligence," "machine learning," and "reinforcement learning."</a></span></p>
<p class="medium" align="left"><span style="font-size: 12pt;">Our approach does not replace any prior work: rather, it brings all of this work together, and helps to identify opportunities for cross-fertilization.  A good way to think of the unified framework is "standing on the shoulders of giants."</span></p>
<p style="text-align: left;" align="center"><strong><span style="font-size: 12pt;">Educational materials:</span></strong></p>
<p style="text-align: left;" align="center"><span style="font-size: 12pt;">All of the material below, including the material for the graduate course, is written for students with an undergraduate course in probability and statistics.  From time to time a second course in probability may be useful, and I occasionally present problems that use linear programming, but in a way that can be read without a full course in math programming (there may be occasional exceptions).  </span></p>

<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li><span style="font-size: 12pt;">W.B. Powell,  "<a href="http://arxiv.org/abs/1912.03513">From Reinforcement Learning to Optimal Control: A unified framework for sequential decisions"</a> - This describes the frameworks of reinforcement learning and optimal control, and compares both to my unified framework (hint: very close to that used by optimal control).  The modeling framework and four classes of policies are illustrated using energy storage.
</span></li>
 	<li style="text-align: left;"><span style="font-size: 12pt;"><a href="https://castle.princeton.edu/wp-content/uploads/2019/02/Powell-A-Unified-Framework-for-Stochastic-Optimization-EJOR.pdf">W.B. Powell, A unified framework for stochastic optimization, European Journal of Operational Research, Vol. 275, No. 3, pp. 795-821 (2019).</a> - An invited review article to appear in European J. Operational Research. This is my latest attempt to pull this field together in a 25 page tutorial.</span></li>
 	<li><span style="font-size: 12pt;"><a href="http://tinyurl.com/powellenergystorage">Energy storage research</a> - This is a web page summarizing two dozen papers on a variety of energy storage problems.  The webpage provides thumbnail sketches of each research project, with links to the paper (and some software).  I u se all four classes of policies, and one project was the inspiration for what I now call "backward approximate dynamic programming."  </span></li>
 	<li><span style="font-size: 12pt;">"<a href="https://arxiv.org/abs/2002.06238">On State Variables, Bandit Problems and POMDPs</a>" - A thought piece on modeling active learning problems, using flu mitigation as an illustrative examples.  This was written just before the COVID pandemic, but has ideas that are very relevant.</span></li>
 	<li><span style="font-size: 12pt;">I teach this material in an undergraduate course at Princeton: ORF 411 - <em>Sequential Decision Analytics and Modeling</em>. Below are some materials from the course:</span>
<ul style="list-style-type: circle;">
 	<li><span style="font-size: 12pt;"><a href="http://www.castle.princeton.edu/orf-411/">ORF411 Course Web Page</a>, with a complete set of lecture notes in PowerPoint.</span></li>
 	<li><span style="font-size: 12pt;">There is an online textbook for the course at <a href="https://www.overleaf.com/read/nczfwthskmcc">Sequential Decision Analytics and Modeling course notes</a>. Cite this reference as: <a href="http://tinyurl.com/sequentialdecisionanalytics">Warren B. Powell, <em>Sequential Decision Analytics and Modeling</em>, Department of Operations Research and Financial Engineering, Princeton University, 2019.</a></span></li>
 	<li><span style="font-size: 12pt;">You are invited to contribute chapters to the book <a href="http://tinyurl.com/sequentialdecisionanalyticspub">via an editable version</a>.</span></li>
 	<li><span style="font-size: 12pt;"><a href="https://github.com/wbpowell328/stochastic-optimization">Python modules that accompany "Sequential Decision Analytics and Modeling."</a> - There is a python module for most of the chapters.  Most of these have been used in an <a href="http://www.castle.princeton.edu/orf-411/">undergraduate course at Princeton</a>.</span></li>
</ul>
</li>
 	<li><span style="font-size: 12pt;">There is also a graduate level course that I taught at Princeton: ORF 544 -  <em>Stochastic Optimization and Learning.</em> Additional materials are:</span>
<ul style="list-style-type: circle;">
 	<li style="list-style-type: none;">
<ul style="list-style-type: circle;">
 	<li><span style="font-size: 12pt;">The <a href="/orf-544/">webpage for the ORF 544 course, complete with all lecture notes in PowerPoint</a>.</span></li>
</ul>
</li>
 	<li><span style="font-size: 12pt;">A book (in progress) written entirely around this framework can be accessed at </span><span style="font-size: 12pt;"><a href="http://www.castle.princeton.edu/RLSO/">Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions</a>  (this is being continually updated) - This is a book (in progress ~700 pages) that is designed entirely around the unified framework. This book is used in a <a href="https://www.castle.princeton.edu/orf-544/">graduate course</a> on stochastic optimization.  Cite this reference as: Warren B. Powell, <em>Reinforcement Learning and Stochastic Optimization and Learning: A Unified Framework</em>, Department of Operations Research and Financial Engineering, Princeton University, 2019. </span></li>
</ul>
</li>
 	<li><span style="font-size: 12pt;"><a href="https://castle.princeton.edu/wp-content/uploads/2019/04/Jungle_of_stochastic_optimization-April_12_2019.pptx">A very short presentation illustrating the jungle of stochastic optimization</a> (updated April 12, 2019).  The last slide shows the evolution of seven major communities from their origin using one of the four classes of policies, to where they stand now (using two, three or often all four classes of policies.</span></li>
</ul>
</li>
</ul>
<strong><span style="font-size: 12pt;">Talks and videos:</span></strong>
<ul>
 	<li style="list-style-type: none;">
<ul>
 	<li>I am now posting videos on youtube under the channel for <a href="http://tinyurl.com/optimaldynamicsyoutube">Optimal Dynamics</a>.</li>
 	<li>Youtube video of talk given for REFASHIOND Ventures on sequential decision analytics, with examples from supply chain management.</li>
 	<li><span style="font-size: 12pt;"><a href="https://castle.princeton.edu/wp-content/uploads/2020/02/Powell-Unified-Framework-90-minute-Northwestern-February-19-2020.pptx">90 minute presentation at Northwestern Kellogg School of Business, Feb 19, 2020</a>.  This is my latest "unified framework" talk.  For the first time, I illustrated the four classes of policies using two broad problem classes: pure learning problems ("state-independent problems") and the more complex "state-dependent problems." <a href="https://kellogg-northwestern.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=0f40c081-ead9-42e5-8f1c-ab6000d766c0">A video of the talk.</a></span></li>
 	<li><span style="font-size: 12pt;">I gave a 2-day workshop on the unified framework at the Olin Business School at Washington University in St. Louis Nov 5-6, 2019.  <a href="https://tinyurl.com/twodaytutorialsyllabus">2-day workshop Syllabus</a>. The powerpoint slides are below:</span>
<ul style="list-style-type: circle;">
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-1.-Introduction.pptx">1. Introduction</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-2.-Modeling-state-variables.pptx">2. Modeling, state variables</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-3.-Modeling-energy-storage-uncertainty.pptx">3. Modeling energy storage, uncertainty</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-4.-Designing-policies.pptx">4. Designing policies</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-5.-Belief-models-sequential-learning.pptx">5. Belief models, sequential learning</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-6.-Active-learning.pptx">6. Active learning</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-7.-Policies-for-active-learning.pptx">7. Policies for active learning</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-8.-Policy-search-derivative-based-and-derivative-free.pptx">8. Policy search (derivative-based and derivative-free)</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-9.-Mixed-learning-resource-allocation-problems.pptx">9. Mixed learning-resource allocation</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-10.-High-dimensional-ADP-for-resource-allocation.pptx">10. High dimensional ADP for resource allocation</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-11.-Stochastic-lookahead-policies.pptx">11. Stochastic lookahead policies</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-12.-Supply-chain-management.pptx">12. Supply chain management</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-13.-The-modeling-process.pptx">13. The modeling process</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-14.-Guidelines-for-choosing-policies.pptx">14. Guidelines for choosing policies</a></li>
 	<li><a href="https://castle.princeton.edu/wp-content/uploads/2019/11/Powell-Unified-Framework-Washington-U.-15.-Reading-materials.pptx">15. Reading materials</a></li>
</ul>
</li>
 	<li>
<p class="medium" align="left"><span style="font-size: 12pt;">My 90 minute tutorial at Informs  (<a href="https://castle.princeton.edu/wp-content/uploads/2019/10/Powell-Unified-Framework-Informs-Seattle-October-20-2019.pptx">powerpoint</a>) (<a href="https://castle.princeton.edu/wp-content/uploads/2019/10/Powell-Unified-Framework-Informs-Seattle-October-20-2019.pdf">pdf</a>).  <a href="https://photos.app.goo.gl/NP9sR9KBwmY8QLeU8">The recording I made of my INFORMS talk</a>.  If you attended the talk, <a href="http://tinyurl.com/unifiedframeworkcomments">please provide feedback here</a></span></p>
</li>
</ul>
</li>
</ul>
<ul>
 	<li style="text-align: left;"><span style="font-size: 12pt;"><a href="https://tinyurl.com/unifiedframework">See the list of past and pending talks.</a>  <a href="mailto:wbpowell328@gmail.com">If you are interested in me giving a talk at your school or company, send me an email</a>.</span></li>
</ul>
<p align="left"><span style="font-size: 12pt;"><strong>Some key points</strong></span></p>

<ul>
 	<li><span style="font-size: 12pt;">State variables - We claim that all properly modeled dynamic systems are Markovian, and provide a teachable, implementable definition that students can use to guide their efforts to model these systems (see chapter 9 in <em>Reinforcement Learning and Stochastic Optimization </em>available at link above). (If you have a counterexample, <a href="mailto:wbpowell328@gmail.com">email it to me</a>). <a href="https://arxiv.org/abs/2002.06238">But examine this for a fresh perspective on state variables</a>.</span></li>
 	<li><span style="font-size: 12pt;">A dynamic program is a sequential decision <em>problem</em> (it is <em>not</em> a method). Bellman's equations are a) conditions for an optimal policy and b) a path to designing good policies (but just one of four paths).  </span></li>
 	<li><span style="font-size: 12pt;">We introduce the distinction between the <em>base model</em>, which is our model of the problem we are trying to solve, and a <em>lookahead model</em>, widely used as one class of policy (especially in stochastic programming). The base model is often referred to as a "simulator" without recognizing that this is the problem we are trying to solve. The base model is comparable to the objective function in a deterministic optimization model.</span></li>
 	<li><span style="font-size: 12pt;">When solving a deterministic optimization problem, we want to find the best <em>decision</em> (often a real-valued vector). When solving a stochastic optimization problem, we typically want to find the best <em>function</em> (known as a policy). </span></li>
 	<li><span style="font-size: 12pt;">A multistage stochastic program (using scenario trees) is a lookahead model for designing a policy (called a lookahead policy) for solving dynamic programs. An optimal solution of a lookahead model is generally <em>not</em> an optimal policy (even if it is hard to solve).</span></li>
 	<li><span style="font-size: 12pt;">"Robust optimization" (for sequential problems) is a lookahead policy (using a min-max objective) to solve a dynamic program where the objective may be formulated using an expectation (which is what is implied if you simulate the policy and average the results), or the worst case (which is consistent with the robust concept) or any other risk measure.</span></li>
</ul>
<p class="medium" align="left"><span style="font-size: 12pt;"><strong>Our canonical model</strong></span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">The slides below provide a thumbnail sketch of the central idea behind our modeling and algorithmic strategy. </span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">The first slide below contrasts the standard canonical form for a multiperiod, deterministic linear program (on the left), and the approach we are advocating to be the canonical form for a sequential, stochastic optimization problem:</span></p>
<p align="left"><span style="font-size: 12pt;"><img src="https://castle.princeton.edu/html/images/detvsstoch.jpg" alt="DeterministicStochastic" width="631" height="396" /></span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">The key idea is that when working on sequential stochastic problems, you are searching for the best <em>function</em> (known as a policy), rather than the more familiar problem of finding the best real-valued scalar or vector.</span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">This raises the obvious question - how do you search over a space of functions???</span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">We have taken a practical path for solving this question. We have identified four fundamental (meta) classes of policies, called PFAs, CFAs, VFAs and DLAs (direct lookaheads). These are summarized on the following slide:</span></p>
<p class="medium" align="left"><img src="https://castle.princeton.edu/wp-content/uploads/2019/06/UniversalFramework.jpg" /></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">We let [latex]\pi[/latex] be the variable that captures both the type of function, and any parameters that determine the behavior of the function. A tunable parameter could be a regression parameter, or variables that determine the planning horizon, number of stages and number of scenarios.</span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">In the equations above, we use tildes on variables that describe the lookahead model to avoid confusing them with the base model. This is only an issue when we are using lookahead policies.</span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">Note that these four classes of policies span all the standard modeling and algorithmic paradigms, including dynamic programming (including approximate/adaptive dynamic programming and reinforcement learning), stochastic programming, and optimal control (including model predictive control).</span></p>
<p class="medium" align="left"><span style="font-size: 12pt;"><img src="https://castle.princeton.edu/html/images/storageproblem.jpg" alt="storage problem" width="536" height="208" align="right" /></span></p>
<p class="medium" align="left"><span style="font-size: 12pt;">It is important to recognize that even for the same problem, each of the four classes of policies may work best, depending on the data. We demonstrate this in the context of a simple energy storage problem. We created five problems, which we solved using each of the four classes of policies, plus a hybrid. In the graph below, we report the performance of each policy as a fraction of the posterior optimal (the best you could do with perfect information). Each policy works best on one of the five problems.</span></p>
<p class="medium" align="left"><span style="font-size: 12pt;"><img src="https://castle.princeton.edu/html/images/FourPoliciesEnergyStorage.jpg" alt="Four classes of policies" width="630" height="289" /></span></p>
<p align="left"><span style="font-size: 12pt;"><a href="https://castle.princeton.edu/Papers/Powell%20Meisel%20-%20Tutorial%20on%20stochastic%20optimization%20in%20energy%20Part%20I%20Modeling%20and%20policies%20March%202016.pdf" target="_blank" rel="noopener noreferrer"><strong>W.B. Powell, S. Meisel, </strong></a><a href="https://castle.princeton.edu/Papers/Powell%20Meisel%20-%20Tutorial%20on%20stochastic%20optimization%20in%20energy%20Part%20II%20Energy%20storage%20illustration%20March%202016.pdf" target="_blank" rel="noopener noreferrer"><strong>Tutorial on Stochastic Optimization in Energy II: An energy storage illustration</strong>, IEEE Trans. on Power Systems, Vol. 31, No. 2, pp. 1468-1475, 2016</a> </span></p>
<p class="medium" align="left"><span class="medium" style="font-size: 12pt;">We prefer the approach universally used in deterministic optimization where we formulate the problem first, and <em>then</em> we design methods to find a solution (in the form of a policy). But this requires accepting that in sequential problems, we are not looking for <em>decisions</em> (as we do in deterministic models), but rather <em>functions</em> (or policies). Classical strategies in stochastic optimization (which are described using familiar labels such as dynamic programming, stochastic programming, robust optimization and optimal control) actually represent particular classes of policies. So, to solve a problem using one of these approaches means you are actually choosing the class of policy before you have even started modeling the problem.</span></p>
<span style="font-size: 12pt;">Warren Powell
<a href="mailto:wbpowell328@gmail.com">wbpowell328@gmail.com</a></span>
