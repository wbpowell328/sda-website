---
layout: page
title: "How To Read \"Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions (RLSO)\""
permalink: /howtoreadrlso/
date: 2023-03-12 12:51:08
---

{% raw %}
Warren B. Powell
Professor Emeritus, Princeton University

My book, *Reinforcement Learning and Stochastic Optimization (RLSO),* synthesizes 15![](https://castle.princeton.edu/wp-content/uploads/2023/03/Powell-RLSO-WIleyFrontCover-199x300.jpg) different fields that work on sequential decision problems, * *but there is a price: it is an 1100 page book.  

This webpage is designed to guide newcomers to the field that I have been calling *sequential decision analytics.* It will start with video tutorials, then transition to a book I wrote for my undergraduate course, and then I will start stepping into the "big book" which can be done in stages.

**Step 1: Video tutorials**

- I recommend starting with the short (40 minute) video introduction:

<https://tinyurl.com/sdafieldyoutube/>

- I then suggest the four-part tutorial (approximate 100 minutes total) which expands the tutorial above with more examples, a more complete discussion of modeling, and a more complete discussion of all four classes of policies.

&nbsp;

- [https://tinyurl.com/SDAPartI](https://tinyurl.com/SDAPartI)
- [https://tinyurl.com/SDAPartII](https://tinyurl.com/SDAPartII)
- [https://tinyurl.com/SDAPartIII](https://tinyurl.com/SDAPartIII)
- [https://tinyurl.com/SDAPartIV](https://tinyurl.com/SDAPartIV)

**Step 2: The "beginner" book**

I wrote this book for an undergraduate course, but it is![](https://castle.princeton.edu/wp-content/uploads/2023/03/SDAM-front-cover_Nov232022-202x300.jpg) ideal for almost anyone who wants to first understand how to *think* about sequential decision problems.  An introduction to the book (and a downloadable pdf) is available at

[Sequential decision analytics and modeling](https://tinyurl.com/sdamodeling/)

This book uses a teach-by-example style.  Chapter 1 gives an introduction to the universal modeling framework.  Then, all the remaining chapters (with the exception of chapter 7) are examples, each written using the same outline, and each chosen to bring out different modeling issues.  Chapter 7 pauses to illustrate the key ideas using the examples in the first six chapters.  This book is very easy to skim.

Note that most of the chapters in this book are accompanied by python modules, which are referenced in the exercises at the end of most of the application chapters.  The python modules are available at <https://tinyurl.com/sdagithub>.

**Step 3: Reading the "big book"**

At this point, you need a copy of *[Reinforcement Learning and Stochastic Optimization (RLSO)](https://tinyurl.com/RLandSO/). * Once you have the book, I suggest:

- Read/skim chapter 1, which provides an overview of the book (this will overlap somewhat chapter 1 of SDAM).
- Pay special attention to "Section 1.8 - How to read this book".  This section outlines the organization of the book, and notes that sections marked by an \* can be skipped the first time through the book.  This will dramatically shorten the book on a first read.  I make the point that this is a long book that has been written to "read short."
- Also note that chapter 11 provides an overview of all four classes of policies, and provides guidance on how to choose among the policies.  If you have a specific problem you are trying to solve, this may help you avoid going through chapters 12-19 which cover:
  a.  Chapter 12 - Policy function approximations (PFAs)
  b.  Chapter 13 - Cost function approximations (CFAs)
  c.  Chapters 14-18 - Policies based on value function approximations (VFAs) - This is the material most often identified with "reinforcement learning" or "approximate dynamic programming"
  d.  Chapter 19 - Direct lookahead approximations (DLAs) - This chapter presents two important subclasses of policies:
      i.  Deterministic lookahead models (possibly parameterized)
      ii. Stochastic lookahead models - Here I review how to design policies within the lookahead model.
- Chapter 20 is on multiagent systems, although note that this is where I introduce the idea of modeling learning problems as a two-agent system (the environment plus the controller).

**Step 4: Self-study**

Finally, I have a series of suggested ways of teaching this material at

[https://tinyurl.com/RLSOcourses/](https://tinyurl.com/RLSOcourses/)

At the top I have designed a "Weekly seminar series" where I have outlined the material that a group of students or professionals could work through the material in the book.  These topics can also be used as guidance for individual self study.

I also make available three important chapters from the book webpage ([https://tinyurl.com/RLandSO/](https://tinyurl.com/RLandSO/)) where you can download chapter 1 for an overview (also chapters 9, on modeling, and 11, on the four classes of policies).

**Step 5: Other educational material**

I maintain a webpage of resources for the field of sequential decision analytics at:

<https://tinyurl.com/sdalinks/> (or <https://castle.princeton.edu/sdalinks> if you are unable to use "tinyurl" links.)

**Step 6: Follow me on LinkedIn!**

If you are not one of my followers already, be sure to follow me on LinkedIn where I post a steady series of thoughts and insights on sequential decision analytics and its applications.  [linkedin.com/in/warrenbpowell](https://www.linkedin.com/in/warrenbpowell)
{% endraw %}
