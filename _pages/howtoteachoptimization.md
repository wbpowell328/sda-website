---
layout: page
title: "How to Teach Optimization"
permalink: /howtoteachoptimization/
date: 2025-08-25 19:00:41
---

<!-- wp:tadv/classic-paragraph -->
<p style="text-align: center;">Warren B. Powell<br />Professor Emeritus, Princeton University<br />Executive-in-Residence, Rutgers University<br />Chief Innovation Officer, Optimal Dynamics</p>
<p>I have been spending some time thinking about how we should teach optimization, where I view "optimization" as the science of making good decisions, not just a course in linear programming (etc).  Instead of focusing on how to teach advanced methods, I am more interested in teaching students how to approach the decision problems they will actually face.  The ideas I have accumulated below are designed for undergraduates or master's students, or for doctoral students in an application field. </p>
<p>The webpage is organized into the following topics:</p>
<ul>
<li>Some initial thoughts - These capture how I am thinking right now about optimization.</li>
<li>A course outline - This is my latest version of an outline of a course on "optimization" (that is, a course on making good decisions) if I had to design a course now.</li>
<li>Framing the problem - This is material that precedes creating any mathematical model.  It includes a short monograph with no mathematics, and is designed for people who want to identify the important elements of a decision problem. </li>
<li>A modern approach to teaching optimization - This is a short book I wrote (in 2024) for instructors teaching an introductory course in optimization.</li>
<li>Video presentation on "How to teach optimization" - This is a video based on a talk I gave at Cornell in 2025, broken into four segments.  It contains a nice presentation of the idea of using parameterized deterministic optimization models for solving complex stochastic optimization problems.</li>
<li>Other resources - Books and webpages with additional material.</li>
</ul>
<p>Do you have different ideas, or anything you might add to this?  Email me at wbpowell328@gmail.com.  Please put "How to teach optimization" in the subject line.</p>
<h2>Some initial thoughts</h2>
<ol>
<li>By far the most common (I would say universal) decision problem involves making the best choice from a set of discrete alternatives.  There may be just two choices (to act or not, A/B testing), a small set of discrete choices (say 10 to 100), or many thousands of choices (types of drugs or molecules, discretized sets of parameters).  What makes these problems hard (once the set of choices is known) is that the performance of each choice is uncertain. <img class="aligncenter size-large wp-image-9279" src="https://castle.princeton.edu/wp-content/uploads/2026/01/Discrete-choices-uncertainty-1024x438.jpg" alt="" width="660" height="282" /></li>
<li>The next class of "hard" decision problems are deterministic, and where decisions are vectors, such as the assignment of a set of resources (people, machines) to a set of tasks (jobs, loads to be moved).  These may be linear, integer, and/or nonlinear.  We tend to spend far too much time describing algorithms to solve these problems, despite the presence of widely available packages that we can use, often available in Excel, as python modules, or as commercially available packages.  By contrast, we spend far too little time teaching students how to use these tools properly.  For example, many (most? almost all?) deterministic optimization problems are solved repeatedly over time, which means they are sequential decision problems.  This means a decision now has to be made without knowing information that will arrive after we make the decision, which may impact how a decision performs in the future. </li>
<li>We enjoy teaching very advanced, graduate-level courses in stochastic optimization for making decisions under uncertainty, ignoring the reality that the vast majority of these problems are solved in practice using deterministic optimization tools. As a result, we avoid teaching how to handle uncertainty in our introductory courses, ignoring the reality that <em>everyone</em> makes decisions, and <em>everyone</em> has to deal with uncertainty.</li>
</ol>
<h2>A course outline</h2>
<p>I taught a number of courses dealing with optimization and uncertainty in my 39 years at Princeton.  These courses were primarily for undergraduates, but I also taught a graduate-level course that attracted 50 students from 10 different departments.</p>
<p>Leveraging this experience, decades of research in stochastic optimization, along with solving real-world optimization problems, I found myself gravitating to teaching the material that is most useful.  While my thinking will likely evolve, this is my current set of favorite topics, in the order they should be taught:</p>
<p><strong>Topic 1: Stochastic gradient methods</strong> – Relatively easy to implement and widely used. Start with Chapter 5 of RLSO (this needs to be updated).</p>
<p><strong>Topic 2: Derivative-free stochastic search</strong> – Easily the most common form of stochastic optimization, this is also known as “ranking and selection,” “optimal/active learning,” “multiarmed bandits,” or my favorite, “intelligent trial and error.” I taught an undergraduate using the name “<a href="https://tinyurl.com/OptimalLearningCourse/">Optimal Learning</a>”: <span style="font-size: revert;">  </span>A more modern presentation is Chapter 7 of my graduate-level text <a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization</a> where I cover all four classes of policies, but I would just cover CFAs (such as UCB policies) and DLAs (such as knowledge gradient, expected improvement, and other methods from Bayesian optimization).  See a comparison of a UCB policy vs. the knowledge gradient in the <a href="https://tinyurl.com/LearningWhileDoing/">video here</a>.</p>
<p>There are many variations of this important problem class:</p>
<ol>
<li style="list-style-type: none;">
<ol style="list-style-type: lower-alpha;">
<li>Offline learning (e.g. in a simulator or lab) and online learning (learning in the field).</li>
<li>Level of noise (no/low noise to very high noise)</li>
<li>Time/cost to perform an experiment (fractions of a second to a week or more).</li>
<li>Sequential vs. parallel learning (testing different treatments on a particular patient, or different manufacturing processes at a given factory vs. running parallel simulations, testing pricing strategies at different retail outlets).</li>
<li>Learning with additional state variables such as other relevant information (often called "context") or the presence of physical resources (see Topic 3).</li>
</ol>
</li>
</ol>
<p><strong>Topic 3: Parameterized deterministic optimization problems</strong> – This covers the most useful tools for managing physical or financial resources under uncertainty. Introduce the idea of parameterizing a deterministic approximation, which requires a) finding the best parameterization and then b) tuning the parameters using topics 1 and 2 above. </p>
<p>This material can be taught to students with no background in optimization by just introducing them to the idea of linear, nonlinear and integer programs, and then introducing them to solvers that solve these problems.  This approach closely parallels the design and fitting of statistical models in machine learning.  Focus on using these powerful tools, rather than assuming that everyone has to understand how the algorithms work.</p>
<p><strong>Topic 4: Stochastic lookahead policies - </strong>I would cover decision trees, and the idea of using a simulation-based lookahead, where you need to perform stochastic search on the decision to make now, given a simulated response using an approximate lookahead model (see chapter 19 of <a href="https://tinyurl.com/RLandSO/">RLSO</a>).</p>
<h2>Framing decision problems</h2>
<p>Of particular importance to students in a problem domain such as business, engineering applications and the sciences is the process of framing decision problems.  I start this process by posing three questions:</p>
<ol>
<li>What are the performance metrics?</li>
<li>What types of decisions are being made (and who makes them)?</li>
<li>What are the sources of uncertainty?</li>
</ol>
<p><img class="alignright size-medium wp-image-9231" src="https://castle.princeton.edu/wp-content/uploads/2025/12/Bridging-Vol-I-cover-202x300.jpg" alt="" width="202" height="300" />This material is covered in a short monograph that is <a href="https://tinyurl.com/PowellFramingAmazon/">available on Kindle here</a>. For a peek into the issues covered here, see the <a href="https://tinyurl.com/whatisadecision/">webpage on "What is a decision" here</a>.  </p>
<p>While this material seems more basic that the topics in my optimization course above, the lack of any mathematics can be deceptive: identifying metrics, decisions and uncertainties requires a level of maturity in a problem context.</p>
<h2>A Modern Approach to Teaching Optimization (2024)</h2>
<p><img class="alignright size-medium wp-image-9298" src="https://castle.princeton.edu/wp-content/uploads/2026/01/MATO_FrontCover-197x300.jpg" alt="" width="197" height="300" />In 2024 I wrote a short book for instructions in reaction to people teaching introductory optimization courses by starting with linear programming and the simplex algorithm.  <a href="https://tinyurl.com/TeachingOpt/">The pdf can be downloaded here.</a></p>
<p>MATO is written for instructors teaching an introductory course for undergraduates or masters.  It suggests 11 topics, starting with regression (where you optimize parameters), then progresses through five topics addressing simple, sequential decision problems that any student would recognize.</p>
<p>Linear, integer and nonlinear programming are covered in topics 7 through 11, where I always present the static version of the problem, followed by a fully sequential version where I build on the techniques presented in topics 1-6.</p>
<p>Section 3 steps through the 11 topics summarizing the pedagogy.  Section 5 then steps through the 11 topics again, providing a sketch of an actual lecture.  Instructors still need to develop these into full lectures that cater to their students.</p>
<h2>Video presentation on "How to teach optimization"</h2>
<p>In April, 2025, I gave a talk to Cornell's Department of Operations Research and Financial Engineering.  The title of the talk was</p>
<p style="text-align: center;">A Fresh Approach to Teaching Optimization:<br />From Deterministic Optimization to Sequential Decision Problems</p>
<p>I have broken the talk into four parts:</p>
<p><a href="https://tinyurl.com/HowtoTeachOptimizationPart1/">Part I: Optimizing Decisions</a> - We introduce the idea that decisions are a universal human activity, while only a tiny fraction have even heard of the phrase "linear program" or any of its relatives from math programming. We set the stage by presenting the two titans of optimization, George Dantzig and Richard Bellman, and start by noting that many (in optimization) think that linear program is a powerful tool used by many, while dynamic programming (and Bellman's equation) is primarily elegant theory </p>
<p><a href="https://tinyurl.com/HowtoTeachOptimizationPart2">Part II: Sequential Decision Problems</a> - We introduce sequential decision problems, starting by noting that most linear programs are solved repeatedly over time, which means the linear program is a policy for making decisions.  I introduce the universal modeling framework for sequential decision problems (static, deterministic problems are just a special case) and discuss how to evaluate policies.</p>
<p><a href="https://tinyurl.com/HowtoTeachOptimizationPart3/">Part III: Designing policies</a> - Here we describe the four classes of policies, including PFAs (simple rules, analytical functions, neural networks), CFAs (parameterized deterministic optimization problems, including LPs/NLPs/MILPs), VFAs (Bellman's equation)  and DLAs (deterministic or stochastic lookaheads).  We can also create hybrids from combinations of these.  I close by identifying the three types of policies that are used to solve the vast majority of all decision problems (and this does not include Bellman or stochastic lookaheads).</p>
<p><a href="https://tinyurl.com/HowtoTeachOptimizationPart4/">Part IV: A New Approach to Teaching Optimization</a> - I start by making the point that linear programming is a powerful method for solving a very small number of decision problems, while sequential decision problems (aka dyamic programs) are universal, but almost no-one uses Bellman's equation.  I then present four books that can be used for teaching students at various levels of domain and analytical expertise.</p>
<h2>Other resources</h2>
<p>Below is a current list of books and webpages relevant to these topics.</p>
<ul>
<li><a href="https://tinyurl.com/BridgingDecisionProblems/">Bridging Decision Problems: Volume I - Framing Decisions</a> - This book is for nontechnical readers who serve the role of bridging between a problem domain and a modeler.  It focuses on identifying metrics, types of decisions, and sources of uncertainty. It uses no mathematics. This book would be appropriate for business students, and students specializing in a problem domain rather than analytics.  </li>
<li><a href="https://tinyurl.com/sdamodeling/">Sequential Decision Analytics and Modeling</a> - Written for an undergraduate engineering class, this highly popular book (over 16,000 downloads) uses a teach-by-example style to demonstrate the universal modeling framework, and the four classes of policies. It uses modest notation to illustrate mathematical modeling and designing policies.</li>
<li><a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization</a> - This is a graduate level text for people who want to develop models and algorithms.  It is the first technical optimization text written entirely around the universal modeling framework (see chapter 9) and all four classes of policies (summarized in chapter 11). </li>
<li><a href="https://tinyurl.com/TeachingOpt/">A Modern Approach to Teaching an Introduction to Optimization</a> - This short book is aimed at instructors teaching an introductory course in optimization, which often starts with linear programming.  The book suggests 11 topics, starting with machine learning which lays the important foundation of selecting functions, and then tuning parameters to find the best within a class.  This lays the foundation for topics 2-6 which describe simple sequential decision problems.  Topics 7-11 cover linear, integer and nonlinear programming which are presented in two ways: static, and sequential.  The presentation is appropriate for an undergraduate or master's level course, but would also suggest a fresh approach for Ph.D.-level courses. </li>
<li><a href="https://tinyurl.com/sdalinks/">Resources webpage for sequential decision analytics</a> - This webpage has links to a variety of resources including videos, educational webpages, and a webpage on how to teach sequential decision analytics.</li>
</ul>
<p> </p>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph /-->
