---
layout: page
title: "Dynamic Resource Transformation Problems"
permalink: /dynamic-resource-transformation-problems/
date: 2017-09-07 09:11:00
---

<b>After years of working on complex operational problems, it became clear that we needed a new vocabulary for modeling these applications. The standard paradigm of deterministic math programming was too rigid. Other approaches for integrating uncertainty, such as stochastic programming, discrete dynamic programming and stochastic control, were too difficult to apply to these problems. In engineering practice, most people end up turning to simulation, which is extremely flexible, but the lack of sophistication creates a host of practical problems.</b>

<b>Given this need, we created a problem called a DRTP (Dynamic Resource Transformation Problem). We pronounce these "DRiPs" because we have implemented this modeling paradigm in Java, and this pronunciation allows us to refer to the package as "DRiP Java" (if you think this is bad, stay tuned). Also, DRTP is hard to pronounce.</b>

<b>There are three dimensions of a DRTP: Information entities, processes, and controls. We use the notation:</b>

<b><span style="color: #ff0000; font-size: xx-small;">Information</span><span style="font-size: xx-small;"> || </span><span style="color: #0000ff; font-size: xx-small;">Processes</span><span style="font-size: xx-small;"> || </span><span style="color: #009900; font-size: xx-small;">Controls</span></b>

<b>to label a problem. Each of the three primary dimensions has several subdimensions which together completely specify a DRTP.</b>

<b>The problem class is fully described in the paper:</b>

Powell, W.B., J. Shapiro and H.P. Simao, “A Representational Paradigm for Dynamic Resource Transformation Problems,” Annals of Operations Research on Modeling (C. Coullard, R. Fourer, and J. H. Owen, eds), Vol. 104, pp. 231-279, 2001.

<b>To see a powerpoint presentation on DRTP's, <a href="http://castle.princeton.edu/html/Powerpoint/CIV%20411%2012-3%20DRTP/index.htm">click here</a>.</b>
