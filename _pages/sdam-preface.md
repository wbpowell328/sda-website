---
layout: book
book_data: sdam_toc
book_home: /sdam/
title: "Preface and acknowledgements"
permalink: /sdam/preface/
date: 2026-07-17
---

{% raw %}
**Preface for the first edition**

My work in sequential decision problems grew out of research that started in the 1980s in trucking, and over my career spanned rail, energy, health, finance, e-commerce, supply chain management, and even learning for materials science. Sequential decision problems arise in daily activities such as sports, cooking, shopping, and finding the best path to a destination. They also arise when designing a product for a startup, hiring people for the startup, and designing marketing campaigns.

The early work in sequential decision problems (known as dynamic programs or optimal control problems) focused on solving a famous, and famously intractable, equation known as Bellman's equation (or Hamilton-Jacobi equations for continuous problems). I joined a community that worked on methods for approximating these equations; this work produced a successful book on approximate dynamic programming, producing a breakthrough for a class of resource allocation problems. Over time, however, I came to realize that approximate dynamic programming was a powerful method for solving a very narrow range of problems — the proverbial hammer looking for a nail.

My work on a wide range of problems made me realize the importance of using a broad range of methods which could be found through the research literature. I found I could model any sequential decision problem with the same framework which involved searching over methods for making decisions, generally known as "policies" in the research literature. I was then able to organize the vast range of methods into four broad classes (meta-classes) of policies which span *any* method for making decisions, including anything proposed in the literature or used in practice (including methods that have not been invented yet!).

This framework is the foundation of a graduate-level book that I finished in 2022 called *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (see [tinyurl.com/RLandSO](https://tinyurl.com/RLandSO/)). As I was writing this book, I realized that sequential decision problems are universal, arising in every human activity. Furthermore, these ideas could (and should) be taught to a broad audience, and not just the typical, analytically sophisticated crowd that we find in operations research, computer science, economics, and pockets of engineering.

The goal of this book is to enable readers to understand how to approach, model and solve a sequential decision problem, even if they are never going to write a line of code. While this book is analytical, the real goal is to teach readers how to *think* about sequential decision problems, breaking them down into the five core elements of a sequential decision model, modeling uncertainty, and then designing policies.

Just as there are many styles for teaching statistics within different communities, I believe there will be a similar evolution to teaching these ideas to different audiences. The examples in this book come from operations research, which I like to call the mathematics of everyday life. I think readers will find most of the examples to be familiar, independent of their professional field. At the same time, I can easily see versions of the book designed purely for different problem domains such as health, finance, energy, robotics, and supply chain management (and this is hardly a comprehensive list).

**Acknowledgments for the first edition**

Any proper acknowledgment of the work behind this book would recognize everyone who contributed to the graduate-level text, *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*. There are simply too many people to list them all here, and I ask readers to check the Acknowledgments section in that book for my best effort at recognizing the efforts of so many who contributed to my understanding of sequential decision problems.

This said, I would like to recognize a few people who contributed to this book. First there was an enthusiastic group of interns who wrote all the Python modules that are used in the exercises for this book: Raluca Cobzaru, Andrei Grauer, Joy Hii, John Nguyen and Robert Raveaunu. I am especially grateful to Dennis Djanka, a professor at Karlsruhe University in Germany, who updated the original Python modules from Python 2 to Python 3, and made revisions that make the library easier to use.

Second I warmly acknowledge the efforts of Dr. Juliana Nascimento, who went through every line of this Python code, fixing bugs, cleaning the logic, and helping me write the problem sets that were based on these exercises.

Finally and most important was my undergraduate class, ORF 411: Sequential Decision Analytics and Modeling, that signed up for the course and participated in the first course specifically on "sequential decision analytics" taught anywhere. They helped me refine the lectures which can be found at [tinyurl.com/RLSOcourses](https://tinyurl.com/RLSOcourses/) (scroll down to "Undergraduate/masters course in sequential decision analytics" for the slides).

Warren B. Powell<br>
Princeton, New Jersey<br>
August, 2022

**Preface for the second edition**

In 2026 I made the decision to go down the path of publishing through Kindle Direct Publishing, which I chose for my new monograph series *Bridging Decision Problems*. When I saw how easy it was, I realized that I could do the same with *Sequential Decision Analytics and Modeling*. KDP will make it possible for me to do minor updates along with new editions without the overhead of working through a publisher. It allows me to provide a Kindle edition for a minimal price, along with a much more reasonably priced hardbound edition.

The second edition contains the same set of application chapters. The biggest changes are in chapter 1, where I incorporated my ideas on defining different types of decisions. Each of the application chapters now start with a "Chapter Overview" that helps readers to understand what the chapter is about. The entire book also benefited from a much-needed proofreading to fix minor edits and some occasional errors.

This edition also embraces a process that I am calling "framing the problem" which involves starting by identifying (in English) the performance metrics, the types of decisions being made, and the sources of uncertainty. My new monograph, [*Bridging Decision Problems, Volume I: Framing the Problem*](/bridging-vol1/), addresses these three questions over the course of 150 pages, so they are not as simple as they sound, even without the mathematical modeling.

Each chapter now includes a brief section, right after the narrative, called "Framing the Problem" that sets the stage for the section on mathematical modeling by listing the metrics, decisions and uncertainties. Our application of framing will make the process seem much simpler than it is for most real problems, since I do not illustrate the process of starting with a full list of metrics, decisions, and uncertainties which are then reduced to those represented in the model.

<figure class="book-figure">
  <img src="/assets/images/sdam/geography-2025.png" alt="Geographical distribution of downloads of first edition as of 2025" style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 0.1.</span> Geographical distribution of downloads of first edition as of 2025</figcaption>
</figure>

**Acknowledgments for the second edition**

I would first like to acknowledge the many thousands of readers who have downloaded this book. With this writing, the book has enjoyed close to 18,000 downloads from around the world (see Figure 0.1).  The feedback has been simply heartwarming.

An important feature of this book is the Python modules that accompany most of the chapters. A few years after the first edition was published, I learned to my considerable disappointment that Python had updated from version 2 to version 3, and the original modules no longer worked (and I gave up coding in 1990, a decision which was core to my success).

You can imagine my heartfelt gratitude when Dennis Djanka, a professor at Karlsruhe University in Germany, reached out to me with the information that he had completely rewritten the library in Python 3. In addition, he made the following additions (as he summarized it in his email):

- Introduction of abstract base classes SDPModel and SDPPolicy that make it easy to setup new models and policies with minimum amount of code.
- Complete rewrite of the code for the *AssetSelling*, *MedicalDecisionDiabetes* and *StochasticShortestPath_static* modules and created a Jupyter Notebook for each of the problems that walks the user from creating a model and policy to tuning policies and interpreting the results.

I previously created a URL for Dennis' version of the directory using [tinyurl.com/sdagithubnew](https://tinyurl.com/sdagithubnew/) while retaining my original directory at [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/). With the release of the 2nd edition, I have changed the original URL so that it also points to Dennis' new library.

Warren B. Powell<br>
Princeton, New Jersey<br>
February, 2026
{% endraw %}
