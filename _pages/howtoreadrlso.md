---
layout: page
title: "How To Read \"Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions (RLSO)\""
permalink: /howtoreadrlso/
date: 2023-03-12 12:51:08
---

<!-- wp:tadv/classic-paragraph -->
<p>Warren B. Powell<br />Professor Emeritus, Princeton University</p>
<p>My book, <em>Reinforcement Learning and Stochastic Optimization (RLSO), </em>synthesizes 15<img class="size-medium wp-image-8089 alignright" src="https://castle.princeton.edu/wp-content/uploads/2023/03/Powell-RLSO-WIleyFrontCover-199x300.jpg" alt="" width="199" height="300" /> different fields that work on sequential decision problems, <em> </em>but there is a price: it is an 1100 page book.  </p>
<p>This webpage is designed to guide newcomers to the field that I have been calling <em>sequential decision analytics.</em> It will start with video tutorials, then transition to a book I wrote for my undergraduate course, and then I will start stepping into the "big book" which can be done in stages.</p>
<p><strong>Step 1: Video tutorials</strong></p>
<ul>
<li>I recommend starting with the short (40 minute) video introduction:</li>
</ul>
<p><a href="https://tinyurl.com/sdafieldyoutube/">https://tinyurl.com/sdafieldyoutube/</a></p>
<ul>
<li>I then suggest the four-part tutorial (approximate 100 minutes total) which expands the tutorial above with more examples, a more complete discussion of modeling, and a more complete discussion of all four classes of policies.</li>
</ul>
<ul style="list-style-type: circle;">
<li><a href="https://tinyurl.com/SDAPartI"><span style="font-weight: 400;">https://tinyurl.com/SDAPartI</span></a></li>
<li><a href="https://tinyurl.com/SDAPartII"><span style="font-weight: 400;">https://tinyurl.com/SDAPartII</span></a></li>
<li><a href="https://tinyurl.com/SDAPartIII"><span style="font-weight: 400;">https://tinyurl.com/SDAPartIII</span></a></li>
<li><a href="https://tinyurl.com/SDAPartIV"><span style="font-weight: 400;">https://tinyurl.com/SDAPartIV</span></a></li>
</ul>
<p><strong>Step 2: The "beginner" book</strong></p>
<p>I wrote this book for an undergraduate course, but it is<img class="size-medium wp-image-8094 alignright" src="https://castle.princeton.edu/wp-content/uploads/2023/03/SDAM-front-cover_Nov232022-202x300.jpg" alt="" width="202" height="300" /> ideal for almost anyone who wants to first understand how to <em>think</em> about sequential decision problems.  An introduction to the book (and a downloadable pdf) is available at</p>
<p><a href="https://tinyurl.com/sdamodeling/">Sequential decision analytics and modeling</a></p>
<p>This book uses a teach-by-example style.  Chapter 1 gives an introduction to the universal modeling framework.  Then, all the remaining chapters (with the exception of chapter 7) are examples, each written using the same outline, and each chosen to bring out different modeling issues.  Chapter 7 pauses to illustrate the key ideas using the examples in the first six chapters.  This book is very easy to skim.</p>
<p>Note that most of the chapters in this book are accompanied by python modules, which are referenced in the exercises at the end of most of the application chapters.  The python modules are available at <a href="https://tinyurl.com/sdagithub">https://tinyurl.com/sdagithub</a>.</p>
<p><strong>Step 3: Reading the "big book"</strong></p>
<p>At this point, you need a copy of <em><a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization (RLSO)</a>.  </em>Once you have the book, I suggest:</p>
<ul style="list-style-type: circle;">
<li>Read/skim chapter 1, which provides an overview of the book (this will overlap somewhat chapter 1 of SDAM).</li>
<li><span style="font-weight: 400;">Pay special attention to "Section 1.8 - How to read this book".  This section outlines the organization of the book, and notes that sections marked by an * can be skipped the first time through the book.  This will dramatically shorten the book on a first read.  I make the point that this is a long book that has been written to "read short."</span></li>
<li>Also note that chapter 11 provides an overview of all four classes of policies, and provides guidance on how to choose among the policies.  If you have a specific problem you are trying to solve, this may help you avoid going through chapters 12-19 which cover:
<ol style="list-style-type: lower-alpha;">
<li>Chapter 12 - Policy function approximations (PFAs)</li>
<li>Chapter 13 - Cost function approximations (CFAs)</li>
<li>Chapters 14-18 - Policies based on value function approximations (VFAs) - This is the material most often identified with "reinforcement learning" or "approximate dynamic programming"</li>
<li>Chapter 19 - Direct lookahead approximations (DLAs) - This chapter presents two important subclasses of policies:
<ol style="list-style-type: lower-roman;">
<li>Deterministic lookahead models (possibly parameterized)</li>
<li>Stochastic lookahead models - Here I review how to design policies within the lookahead model.</li>
</ol>
</li>
</ol>
</li>
<li>Chapter 20 is on multiagent systems, although note that this is where I introduce the idea of modeling learning problems as a two-agent system (the environment plus the controller).</li>
</ul>
<p><strong>Step 4: Self-study</strong></p>
<p><span style="font-weight: 400;">Finally, I have a series of suggested ways of teaching this material at</span></p>
<p><a href="https://tinyurl.com/RLSOcourses/"><span style="font-weight: 400;">https://tinyurl.com/RLSOcourses/</span></a></p>
<p>At the top I have designed a "Weekly seminar series" where I have outlined the material that a group of students or professionals could work through the material in the book.  These topics can also be used as guidance for individual self study.</p>
<p><span style="font-weight: 400;">I also make available three important chapters from the book webpage (</span><a href="https://tinyurl.com/RLandSO/"><span style="font-weight: 400;">https://tinyurl.com/RLandSO/</span></a><span style="font-weight: 400;">) where you can download chapter 1 for an overview (also chapters 9, on modeling, and 11, on the four classes of policies).</span></p>
<p><strong>Step 5: Other educational material</strong></p>
<p>I maintain a webpage of resources for the field of sequential decision analytics at:</p>
<p><a href="https://tinyurl.com/sdalinks/">https://tinyurl.com/sdalinks/</a> (or <a href="https://castle.princeton.edu/sdalinks">https://castle.princeton.edu/sdalinks</a> if you are unable to use "tinyurl" links.)</p>
<p><strong>Step 6: Follow me on LinkedIn!</strong></p>
<p>If you are not one of my followers already, be sure to follow me on LinkedIn where I post a steady series of thoughts and insights on sequential decision analytics and its applications.  <a class="pv-contact-info__contact-link link-without-visited-state t-14" href="https://www.linkedin.com/in/warrenbpowell">linkedin.com/in/warrenbpowell</a></p>
<!-- /wp:tadv/classic-paragraph -->
