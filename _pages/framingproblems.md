---
layout: page
title: "Bridging Decision Problems"
permalink: /framingproblems/
date: 2025-07-30 19:29:07
---

<!-- wp:tadv/classic-paragraph -->
<p style="text-align: center;"><strong><br />Warren B. Powell</strong><br />Executive-in-residence, Rutgers University<br />Chief Innovation Officer, Optimal Dynamics<br />Professor emeritus, Princeton University</p>
<p><img class="alignright size-medium wp-image-9231" src="https://castle.princeton.edu/wp-content/uploads/2025/12/Bridging-Vol-I-cover-202x300.jpg" alt="" width="202" height="300" /></p>
<p><em>Bridging Decision Problems</em> is being planned as a series of monographs on the process of modeling decision problems and implementing the results. Unlike traditional presentations that start with a mathematical model, solve it, and then declare success, we are going to progress through the entire process:     </p>
<ol>
<li>Start with a raw problem that features decisions  using a process we call "framing the problem."</li>
<li>Model the process using the "universal modeling framework" that can be applied to <em>any</em> decision problem</li>
<li>Translate the model to computer code, both as a simulator (which has several applications) and a method for making decisions (called the <em>policy</em>)</li>
<li>Design the process for collecting the information needed to run the model.</li>
<li>Implement the decisions in the field and track performance.</li>
</ol>
<p>Volume I addresses the first step, framing the problem, which involves answering a series of questions in English that form the basis of a mathematical model that can be implemented on the computer. <span style="font-size: revert;">This webpage is a very brief overview of the framing process.  At the bottom is a link to a new book that describes this process in much more detail (but no math).</span></p>
<p><a href="https://tinyurl.com/PowellFramingAmazon/">Volume I is now available on Kindle here</a>, or <a href="https://tinyurl.com/PowellFramingBook/">download the pdf from here</a>.</p>
<p>In our presentation, we always assume that the "problem" involves improving one or more performance metrics.  We operate under the principle: </p>
<p><img class="aligncenter size-large wp-image-9088" src="https://castle.princeton.edu/wp-content/uploads/2025/10/If-you-want-to-run-a-better-tan-1024x205.jpg" alt="" width="660" height="132" /></p>
<h2>The list of lists for framing</h2>
<p>The graphic below contains a series of lists that can serve as a guide when you are identifying the key elements of a sequential decision problem.  It includes the following lists:</p>
<ul>
<li>Categories of metrics</li>
<li>Types of decisions</li>
<li>Classes of uncertainty</li>
<li>Behaviors of uncertainty</li>
<li>The four classes of policies</li>
<li>The functions that depend on the state variable</li>
<li>State variables based on knowledge</li>
</ul>
<p><img class="aligncenter size-full wp-image-9621" src="https://castle.princeton.edu/wp-content/uploads/2026/04/Lists-for-framing-sequential-decision-problems-1.jpg" alt="" width="1205" height="658" /></p>
<h2>The six steps for solving decision problems</h2>
<p>The process of solving decision problems (and I mean <em>any</em> decision problem) can be envisioned in six stages comprised of:  </p>
<ol>
<li>Summarizing the business problem in the language of the problem domain.</li>
<li>Framing the problem, which means stating it in English, but using specific vocabulary that sets the stage for mathematical modeling, if required.</li>
<li>Mathematical modeling - This is done with the universal modeling framework (UMF), which can capture <em>any</em> sequential decision problem. </li>
<li>Identify the information needed to run the model, and creating the processes to acquire it. This process is increasingly being assisted by LLMs.</li>
<li>Computer implementation - The UMF provides an explicit roadmap to computer implementation, which can be in a spreadsheet or sophisticated model.</li>
<li>Implementing the decisions in the field, which typically raises fresh issues. This may or may not involve implementing the software itself in the field.  This process is also starting to be assisted by LLMs.</li>
</ol>
<p><img class="aligncenter size-large wp-image-8750" src="https://castle.princeton.edu/wp-content/uploads/2025/07/Skill-cycle-white-background-1024x584.jpg" alt="" width="660" height="376" /></p>
<p>We note that our guiding light (or "north star") is using a computer to make decisions to improve performance, even if we do not develop a mathematical model or implement it on the computer.  Our experience is that this process brings clarity to complex problems, which may provide enough guidance to make a decision without formal analysis.  However, if additional help is needed, we always retain the option of progressing to a computer model, whether it is a spreadsheet or more sophisticated software.</p>
<p>We recognize that computers can be used in a variety of ways:</p>
<ul>
<li>Creating information so a human can make a decision - The universal modeling framework helps to identify what information is needed.</li>
<li>Computer-assisted – The computer recommends, human reviews.</li>
<li>Completely autonomous - The computer makes the decision on its own.</li>
<li>Simulating decisions from the current state - We use a computer to project the downstream effect of a decision now, simulating decisions that are needed in the future.</li>
<li>Strategic simulations - Here, we simulate a system over time, without needing to capture its current state. We use strategic simulators to help make design decisions.</li>
</ul>
<h2>The three stages of automation</h2>
<p>The process of automating a decision process proceeds in three stages, as outlined below.</p>
<p><img class="aligncenter size-full wp-image-8827" src="https://castle.princeton.edu/wp-content/uploads/2025/08/Three-stages-of-automation.jpg" alt="" width="624" height="739" /></p>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph -->
<h2>&nbsp;</h2>
<h2>The universal modeling framework</h2>
<p>The information provided by the framing process is guided by the universal modeling framework. This general framework can be used to represent <em>any</em> sequential decision problem, including both single and multi-agent applications.&nbsp; I like to present the universal modeling framework (for a single agent) using the slide:</p>
<p><img class="size-large wp-image-8728 aligncenter" src="https://castle.princeton.edu/wp-content/uploads/2025/07/Universal-Modeling-Framework-1024x576.jpg" alt="" width="660" height="371"></p>
<p>Any problem modeled using the universal modeling framework (UMF) can be directly implemented on a computer.&nbsp; This does not mean that all decision problems benefit from being implemented on the computer.&nbsp; However, all decision problems benefit from being approached with this structure.&nbsp; At a minimum, it will help you <em>think</em> about any decision problem.&nbsp; If it is felt that a computer-assisted solution would add value, then there is an immediate path to computer implementation.&nbsp;&nbsp;</p>
<h2>Making decisions</h2>
<p>There are decades of research and countless books and papers that address the problem of how to make decisions in the presence of uncertainty.&nbsp; Since 2010 I have been refining the idea that <em>any</em> method for making decisions falls within four classes of policies divided into two broad strategies:</p>
<p>Strategy I: Policy search - These are functions that have to be tuned to work well over time.</p>
<ul>
<li>Policy function approximations (PFAs) - These are analytical functions, from order-up-to inventory policies, linear or nonlinear functions, even deep neural networks.</li>
<li>Cost function approximations (CFAs) - These are parameterized versions of typically deterministic approximations that are parameterized to work well over time, under uncertainty.</li>
</ul>
<p>Strategy 2: Lookahead policies - These policies approximate the impact of decisions now on the future.</p>
<ul>
<li>Policies based on value function approximations (VFAs) - This is where solutions based on Bellman's equation are located.</li>
<li>Direct lookahead approximations (DLAs) - These policies optimize into the future to make better decisions now.&nbsp; It is helpful to divide these into two classes: a) Deterministic lookahead (think of Google maps), and b) stochastic lookahead, which can come in a range of forms (see chapter 19 of <a href="https://tinyurl.com/RLandSO/">RLSO</a>).</li>
</ul>
<p>A slightly longer description is provided <a href="https://tinyurl.com/FourClassesofPolicies/">here</a>.&nbsp; I recommend the video tutorial <a href="https://tinyurl.com/sdafieldyoutube/">here</a>. Note that three of the four classes of policies (CFAs, VFAs and DLAs) involve solving imbedded optimization problems within the policies.&nbsp; These are usually (but not always) solved using deterministic methods.</p>
<h2>References</h2>
<p>This new process of framing the problem is described in detail in a new monograph. The book should be available for purchase in December 2025.&nbsp; The pdf should be available for free download by April, 2026. For now, the table of contents and preface (which contains an overview of the book) can be downloaded from:</p>
<p style="text-align: left;"><a href="https://tinyurl.com/PowellBridgingBook">Framing Decision Problems: Bridging problems and models Volume I - TOC and Preface - August 18, 2025.</a></p>
<p style="text-align: left;"><a href="https://tinyurl.com/PowellFramingComments/">Please feel free to leave comments here</a>.&nbsp;</p>
<p>I am currently planning the next three volumes:</p>
<ul>
<li>Volume II: The Universal Modeling Framework - This volume will show how to translate the framing information from Volume I into a very general modeling framework called the "Universal Modeling Framework." A substitute that you can access now is the book "Sequential Decision Analytics and Modeling," which can be downloaded <a href="https://tinyurl.com/sdamodeling/">here</a>.&nbsp;</li>
<li>Volume III: Designing Policies - This volume will cover the four classes of policies in much more depth, and show how to evaluate them using the universal framework, and finally how to tune them. A substitute that you can access now is Chapter 11 of my advanced book which can be downloaded from <a href="https://tinyurl.com/RLSOChapter11/">here</a>.</li>
</ul>
<p>Potential future volumes (depending on what catches my interest):</p>
<ul>
<li>Uncertainty Modeling - Controllable dynamic systems are governed by two flows of information: decisions and exogenous information. This volume addresses in much more depth how we think about and model exogenous information processes. A substitute for now is Chapter 10 of my advanced book, which can be downloaded from <a href="https://tinyurl.com/RLSOChapter10/">here</a>.</li>
<li>Supply chain management - There is so much interest in this problem class.&nbsp; It will provide an opportunity for me to dip my toe into these waters.</li>
<li>Navigating complex environments - This is where I want to really develop my ideas for multi-agent decision-making.</li>
</ul>
<p><strong>Other relevant books:</strong></p>
<ul style="list-style-type: disc;">
<li><a href="https://tinyurl.com/sdamodeling/">Sequential Decision Analytics and Modeling (2022)</a> - This book uses a teach-by-example style. Each chapter (other than chapters 1 and 7) describes a different problem, which is then modeled using the UMF.&nbsp; The problems are chosen to illustrate each of the four classes of policies.</li>
<li><a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decision problems</a> (Wiley, 2022), 1100 pages.&nbsp; This is an advanced, graduate-level book designed for people who want to develop models and algorithms for sequential decision problems.&nbsp;&nbsp;</li>
</ul>
<p><strong>Webpages of possible interest:</strong></p>
<p>“<a href="https://tinyurl.com/PowellToyotaVideos/">The Road to Digital Automation at Toyota: Learning How to Be an Informed Consumer</a>,” Toyota’s North American Headquarters, July 10, 2025.&nbsp; This is a presentation in five parts given to a broad audience at Toyota that contrasts LLMs with using computers to make decisions.</p>
<p><a href="https://tinyurl.com/sdalinks/">Webpage for sequential decision analytics</a> - This webpage is a page of resources for the following topics:</p>
<ul>
<li>&nbsp;Introduction to the field of sequential decision problems</li>
<li>Some video introductions</li>
<li>Downloadable books (introductory and advanced)</li>
<li>Introduction to Optimal Learning</li>
<li>Courses and teaching materials&nbsp;</li>
<li>Educational web pages about sequential decision analytics</li>
<li>LinkedIn posts on sequential decision analytics</li>
</ul>
<p>&nbsp;</p>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph /-->
