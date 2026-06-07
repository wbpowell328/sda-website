---
layout: page
title: "Transportation and Logistics"
permalink: /transportation-and-logistics/
date: 2017-09-07 10:18:43
---

{% raw %}
Freight transportation dominated our activities in the 1980's and 1990's, with projects running right up to 2020.  This problem class played an important formative role in our approach to modeling. Uncertainty is very important in freight transportation, and was central in our development of the tools of approximate dynamic programming for high dimensional stochastic optimization problems.

Some of our more notable activities have included:![](https://castle.princeton.edu/wp-content/uploads/2022/02/NS_locomotive-300x169.jpg)

- [Locomotive planning at Norfolk Southern Railroad with PLASMA](https://castle.princeton.edu/plasma/) - Approximate dynamic programming has produced what appears to be the first production optimization model for locomotives for a North American freight railroad. PLASMA is used for both strategic and tactical planning (winner, Best Paper prize from Society for Transportation Science and Logistics, 2015)
- United Parcel Service - We developed a multiagent simulator for modeling their intercity operations.
- Planning high value spare parts for Embraer - Approximate dynamic programming was used to optimize 700 high value spare parts at Embraer, simultaneously planning advance orders, re-usable parts, and the allocation to field inventory locations subject to tight cost and service constraints.
- [Driver fleet planning at Schneider National](https://castle.princeton.edu/wagner/) - The "tactical planning system" as![](https://castle.princeton.edu/wp-content/uploads/2022/02/schneider_dispatch_room-300x225.jpg) they call it uses approximate dynamic programming to intelligently model the behavior of dispatchers, allowing Schneider to change the mix of drivers and freight, or to test changes in work rules and driver management policies.
- Linehaul operations for Yellow Roadway Worldwide. Yellow was the early developer of [SUPERSPIN](https://castle.princeton.edu/superspin/) (used by the entire LTL industry). Through the 1990's we developed an interactive, dynamic linehaul planning system for drivers. Over 2017-2020 we developed and implemented a dynamic load planning model with a parallel driver optimization system.
- Netjets - We have developed a series of models for Netjets, the leader in the fractional jet ownership industry. Our planning models include a highly detailed model that simultaneously optimizes pilots, aircraft and customers at a high level of detail over a month; a strategic fleet planning model that spans 10 years; and a more aggregate fleet planning model that optimizes purchases, sales and fleet mix over 10-20 years.

See [impact on industry](http://castle.princeton.edu/impact/) for a complete list of projects.

In the late 1990's, our diversity of projects was the motivation behind the modeling framework known as the *[dynamic resource transformation problem](http://castle.princeton.edu/Papers/drtp.pdf)* [(DRTP)](http://castle.princeton.edu/Papers/drtp.pdf). Solving the stochastic, dynamic problems arising in this setting was the primary motivation behind our work to solve high dimensional dynamic programs using the modeling and algorithmic framework of [approximate dynamic programming](http://adp.princeton.edu/).

In 2016, Princeton granted an exclusively license to the software library behind this work to [Optimal Dynamics](http://optimaldynamics.com).  In 2020, Warren Powell retired from Princeton to help OD take this technology to industry.
{% endraw %}
