---
layout: page
title: "SDA video modules"
permalink: /sda-video-modules/
date: 2026-08-22
---

{% raw %}
<p>This page contains a series of short video modules that started as a three-hour tutorial for the 2026 AIMOR workshop in Banff. Each module is 5 to 25 minutes long, and lists guidelines on technical level and recommended predecessor modules.</p>

<p>The initial modules were posted in August, 2026. I anticipate improving the presentations and adding new modules, so pay attention to the posting and updating dates.</p>

<p>If any faculty would like access to the PowerPoint slides for use in lectures, email me at <a href="mailto:wbpowell328@gmail.com">wbpowell328@gmail.com</a>.</p>

<style>
  .video-module {
    display: flex; gap: 20px; align-items: flex-start;
    margin: 24px 0; padding-bottom: 24px;
    border-bottom: 1px solid #eae0c8;
  }
  .video-module:last-of-type { border-bottom: none; }
  .video-module-img {
    width: 380px; height: auto; flex-shrink: 0;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  }
  .video-module-text { flex: 1; min-width: 0; }
  .video-module-text h3 {
    margin: 0 0 8px 0; font-size: 1.15rem;
  }
  .video-module-text h3 a {
    color: #c9621e; text-decoration: none;
  }
  .video-module-text h3 a:hover { text-decoration: underline; }
  .video-module-text p { margin: 6px 0; }
  .video-module-meta {
    font-size: 0.9rem; color: #5a4a35;
  }
  .video-module-under-dev {
    display: inline-block;
    background: #faf5e6; color: #7a6a55;
    padding: 2px 8px; border-radius: 3px;
    font-size: 0.85rem; font-style: italic;
    border: 1px solid #d9c99d;
  }
  @media (max-width: 700px) {
    .video-module { flex-direction: column; }
    .video-module-img { width: 100%; max-width: 380px; }
  }
</style>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image1.jpeg"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo1">My background</a></h3>
    <p><strong>Summary:</strong> Experience matters, and in this brief presentation I give a peek into my 40+ years of experience thinking about, working on, and implementing systems for solving a wide range of sequential decision problems.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> None<br />
      <strong>Technical level:</strong> Non-technical<br />
      <strong>Time:</strong> 9:50 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image2.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo2">History of research on sequential decision problems</a></h3>
    <p><strong>Summary:</strong> This is a brief history starting with "reinforcement learning" circa 1900, up through its re-introduction in the 1950s, optimal control in the 1970s, modern reinforcement learning in the 1980s, and approximate dynamic programming in the 1990s.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> None<br />
      <strong>Technical level:</strong> None<br />
      <strong>Time:</strong> 21:12 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image3.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo3">Introduction to sequential decision problems</a></h3>
    <p><strong>Summary:</strong> A presentation of examples of the diversity of sequential decision problems, from the simple inventory problems to complex logistics problems, including an initial introduction to optimal learning problems.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> None<br />
      <strong>Technical level:</strong> None<br />
      <strong>Time:</strong> 7:19 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image4.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo4">Framing decision problems</a></h3>
    <p><strong>Summary:</strong> This is the first step to understanding a sequential decision problem, which starts by identifying metrics, decisions and uncertainties.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> None<br />
      <strong>Technical level:</strong> None<br />
      <strong>Time:</strong> 25:20 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image5.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo5">The universal modeling framework (high level)</a></h3>
    <p><strong>Summary:</strong> This is how we model <em>any</em> sequential decision problem, consisting of five elements.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Framing decision problems<br />
      <strong>Technical level:</strong> Basic modeling notation<br />
      <strong>Time:</strong> 11:18 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image6.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo6">Estimation methods</a></h3>
    <p><strong>Summary:</strong> Modeling and solving sequential decision problems draws heavily on the use of estimation methods from machine learning. This is a high level overview.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Universal modeling framework<br />
      <strong>Technical level:</strong> Basic mathematics of probability and statistics<br />
      <strong>Time:</strong> 20:11 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image7.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo7">Universal modeling framework (detailed)</a></h3>
    <p><strong>Summary:</strong> I now step through the individual elements of the universal modeling framework.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> The universal modeling framework (high level)<br />
      <strong>Technical level:</strong> Expectations of simulations of policies<br />
      <strong>Time:</strong> 31:57 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image8.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo8">State variables</a></h3>
    <p><strong>Summary:</strong> This module addresses the astonishing lack of understanding of state variables in various communities (applied probability, dynamic programming). State variables are fundamental to sequential decision problems.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Universal modeling framework (detailed)<br />
      <strong>Technical level:</strong> Some modest mathematics<br />
      <strong>Time:</strong> 28:19 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/modeling-uncertainty.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://youtu.be/8r28RLvuEtg">Modeling uncertainty</a></h3>
    <p><strong>Summary:</strong> This module addresses the challenging area of modeling exogenous information processes. It covers the 12 categories of uncertainties, different flavors of uncertainty, and presents three approaches for representing uncertainty from using history to mathematical models.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Universal modeling framework (detailed); State variables<br />
      <strong>Technical level:</strong> Some modest mathematics at the end<br />
      <strong>Time:</strong> 23:27 &nbsp;·&nbsp; <strong>Posted:</strong> September 2, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image9.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo9">Designing policies</a></h3>
    <p><strong>Summary:</strong> This is the first introduction to the four classes of policies.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> The universal modeling framework (high level)<br />
      <strong>Technical level:</strong> Low<br />
      <strong>Time:</strong> 15:29 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image10.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo10">Choosing policies</a></h3>
    <p><strong>Summary:</strong> Having presented all four classes of policies, we now tackle the question of actually choosing one (or a hybrid).</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Designing policies<br />
      <strong>Technical level:</strong> Moderate<br />
      <strong>Time:</strong> 9:58 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image11.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo11">Policy function approximations</a></h3>
    <p><strong>Summary:</strong> These are analytical functions that map states to actions, without an imbedded optimization problem.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Designing policies, Choosing policies<br />
      <strong>Technical level:</strong> Modest<br />
      <strong>Time:</strong> 9:43 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image12.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo12">Cost function approximations</a></h3>
    <p><strong>Summary:</strong> We introduce the powerful idea of using parameterized versions of deterministic optimization models that are tuned to work well over time.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Policy function approximations; The universal modeling framework<br />
      <strong>Technical level:</strong> Uses deterministic optimization, tuned to work well in a simulated environment<br />
      <strong>Time:</strong> 10:08 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image13.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo13">Value function approximations I — Introduction to dynamic programming</a></h3>
    <p><strong>Summary:</strong> We start our discussion by introducing Bellman's equation and describing the three curses of dimensionality.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> The universal modeling framework; State variables<br />
      <strong>Technical level:</strong> Moderate-advanced<br />
      <strong>Time:</strong> 13:19 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image14.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo14">Value function approximations II — VFA-based policies</a></h3>
    <p><strong>Summary:</strong> We introduce the idea of creating a policy that uses an approximation of the state that a decision takes us to.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> VFA I; State variables<br />
      <strong>Technical level:</strong> Moderate-advanced — illustrates mathematics with visuals<br />
      <strong>Time:</strong> 20:59 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image15.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo15">Value function approximations III — Reinforcement learning</a></h3>
    <p><strong>Summary:</strong> We introduce approximate dynamic programming as it is typically presented under the banner of "reinforcement learning," using the language typically found in computer science.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> VFA II<br />
      <strong>Technical level:</strong> Moderate — math at the level of Sutton and Barto<br />
      <strong>Time:</strong> 17:51 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image16.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3>Value function approximations IV — Forward ADP and linear approximations</h3>
    <p><strong>Summary:</strong> We present the classical techniques of forward approximate dynamic programming, with an emphasis on the use of linear models to approximate the value function.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> VFA I–III<br />
      <strong>Technical level:</strong> Advanced<br />
      <span class="video-module-under-dev">Under development</span>
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image17.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3>Value function approximations V — Applications</h3>
    <p><strong>Summary:</strong> This segment summarizes a series of applications using VFA-based policies, typically in the context of resource allocation problems.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> TBD<br />
      <strong>Technical level:</strong> TBD<br />
      <span class="video-module-under-dev">Under development</span>
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image18.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo18">Direct lookahead approximations I — Overview</a></h3>
    <p><strong>Summary:</strong> We set up the notation for lookahead models, and identify the different ways to approximate lookahead models to make a decision now.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> The universal modeling framework<br />
      <strong>Technical level:</strong> Advanced<br />
      <strong>Time:</strong> 8:25 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image19.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo19">Direct lookahead approximations II — Deterministic lookaheads</a></h3>
    <p><strong>Summary:</strong> A generalization of cost function approximations (which do not plan into the future) is to parameterize deterministic models which do plan into the future.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> DLA I; Cost function approximations<br />
      <strong>Technical level:</strong> Understanding of deterministic optimization<br />
      <strong>Time:</strong> 6:25 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image20.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo20">Direct lookahead approximations III — Stochastic lookaheads</a></h3>
    <p><strong>Summary:</strong> Focuses on the issue of choosing the "policy-within-a-policy" required by stochastic lookahead models. We illustrate PFAs, CFAs and VFAs.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Policy function approximations; Cost function approximations; Value function approximations<br />
      <strong>Technical level:</strong> Advanced<br />
      <strong>Time:</strong> 15:03 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image21.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo21">Direct lookahead approximations IV — Discrete actions</a></h3>
    <p><strong>Summary:</strong> We introduce the idea of using decision trees for small problems, and Monte Carlo tree search for larger problems.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> DLA I<br />
      <strong>Technical level:</strong> Moderate<br />
      <strong>Time:</strong> 16:37 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image22.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo22">Direct lookahead approximations V — Vector-valued actions</a></h3>
    <p><strong>Summary:</strong> We introduce two-stage stochastic programming illustrated by its use in power planning. We then introduce the idea of solving the stochastic lookahead problem using classical stochastic search.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> DLA I, DLA IV<br />
      <strong>Technical level:</strong> Advanced<br />
      <strong>Time:</strong> 9:46 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image23.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3><a href="https://tinyurl.com/SDAvideo23">Policy search</a></h3>
    <p><strong>Summary:</strong> We address the challenge of tuning a parameterized policy using derivative-based and derivative-free stochastic search. Stochastic search is presented as a sequential decision problem, and illustrated using a mutual fund cash balance problem.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Universal modeling framework; Policy function approximations; Cost function approximations; DLA II<br />
      <strong>Technical level:</strong> Moderately advanced<br />
      <strong>Time:</strong> 15:10 &nbsp;·&nbsp; <strong>Posted:</strong> August 22, 2026
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image24.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3>Optimal learning</h3>
    <p><strong>Summary:</strong> One of the most important sequential decision problems involves learning over time, either in an offline setting (laboratory, computer simulation) or an online setting. We compare a CFA-based policy (interval estimation) to a DLA-based policy (the knowledge gradient).</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Universal modeling framework<br />
      <strong>Technical level:</strong> Moderate to advanced<br />
      <span class="video-module-under-dev">Under development</span>
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image25.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3>Deterministic optimization as a sequential decision problem</h3>
    <p><strong>Summary:</strong> There are many classical deterministic optimization problems that, in practice, are solved repeatedly over time. How a deterministic optimization models are used is often overlooked, especially when they are hard integer or nonlinear programs.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> Universal modeling framework<br />
      <strong>Technical level:</strong> Requires knowledge of deterministic optimization<br />
      <span class="video-module-under-dev">Under development</span>
    </p>
  </div>
</div>

<div class="video-module">
  <img src="/assets/images/sda-video-modules/image26.png"
       alt="SDA video module thumbnail" class="video-module-img" />
  <div class="video-module-text">
    <h3>Modeling matters</h3>
    <p><strong>Summary:</strong> This module illustrates a published example of a paper that makes the mistake of assuming that you can use information that does not arrive until the future. This type of mistake is not unusual in engineering communities.</p>
    <p class="video-module-meta">
      <strong>Predecessor modules:</strong> DLA I<br />
      <strong>Technical level:</strong> Modest<br />
      <span class="video-module-under-dev">Under development</span>
    </p>
  </div>
</div>
{% endraw %}
