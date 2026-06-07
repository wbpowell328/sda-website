---
layout: page
title: "Wagner"
permalink: /wagner/
date: 2017-09-07 10:30:14
---

{% raw %}
2009 Daniel H. Wagner Prize **Approximate Dynamic Programming to Model Fleet Operations at Schneider National**

CASTLE Lab is pleased to announce that a project involving the adaptation of approximate dynamic programming to model fleet operations at Schneider National received the 2009 Daniel H. Wagner Prize, given by the College for the Practice of Management Science at Informs. The Wagner prize recognizes the development of new methodology in the context of real-world applications.

The team contributing to the project includes Hugo P. Simao, Abraham George and Warren B. Powell from Princeton University, and Ted Gifford, Jeff Day and John Nienow from Schneider National..

![](http://castle.princeton.edu/html/images/schneider_dispatch_small.jpg)The model, known as the Tactical Planning Simulator (TPS) at Schneider, produces a highly detailed "simulation" of fleet operations, capturing the dynamics of drivers and loads at a very high level of detail. The problem is formulated as a very large-scale stochastic optimization problem. We used an optimization framework to model the collective intelligence of the dispatch center (at the right). When we modeled operations at the level of detail required both for proper calibration and to provide sensitivity to key policy studies, the result was an infinite-dimensional dynamic program with a decision vector with 50,000 dimensions.

The problem was solved using approximate dynamic programming, which overcomes the high dimensional state variables using methods from machine learning. This logic captured the critical ability of the dispatch center to anticipate the impact of decisions now on the future. This logic made it possible to capture not only a 15-dimensional attribute vector describing each of the over 5,000 drivers, but also uncertainties in loads (demands) and travel times. The optimization framework, which was carefully calibrated against historical performance, made it possible to introduce changes in the driver mix, loads, and policies, and capture the collective intelligence of their experienced team of dispatchers supported by modern information systems, which includes satellite communication and advanced optimization.

Considerable attention was put into capturing a host of real-world details so that the model closely matched a number of performance metrics. This includes issues such as:

- Getting drivers home at a rate that matched historical performance.

- Making sure that teams and owner-operators achieved revenue and equipment productivity targets.

- Detailed modeling of hours-of-service regulations.

- Proper management of Canadian drivers.

- Use of relays to help get drivers home.

A paper published in Interfaces describing the project with no mathematics is available [here](http://castle.princeton.edu/Papers/Simao_Interfaces_SchneiderNationalOctober2010.pdf). This paper also summarizes a number of projects undertaken at Schneider producing millions of dollars in benefits. The powerpoint presentation used to present the project at the Wagner competition is available here in [powerpoint](http://castle.princeton.edu/Presentations/Simao_Wagner_INFORMS09_Oct11.ppt) (large file) or [pdf](http://castle.princeton.edu/Presentations/Simao_Wagner_INFORMS09_Oct11.pdf). A longer, more technical paper, published in Transportation Science in 2009, is available [here](http://castle.princeton.edu/Papers/Simao_et_al_SchneiderNational.pdf). This paper won the 2010 Best Paper Prize from the Society for Transportation Science and Logistics.

Press releases and articles on the project can be found at:

### [Forbes magazine](http://www.forbes.com/sites/helencoster/2011/08/24/schneider-national-uses-data-to-survive-a-bumpy-economy/) {#forbes-magazine align="left"}

[http://www.logisticsonline.com/article.mvc/Nations-Largest-Truckload-Provider-Utilizes-0001?VNETCOOKIE=NO](http://www.logisticsonline.com/article.mvc/Nations-Largest-Truckload-Provider-Utilizes-0001?VNETCOOKIE=NO)

[http://www.schneider.com/news/News/PRD_003790](http://www.schneider.com/news/News/PRD_003790)

[http://mhlnews.com/distribution/schneider-streamlines-shipping-simulator-082310/index.html](http://mhlnews.com/distribution/schneider-streamlines-shipping-simulator-082310/index.html)

[http://analytics-magazine.com/march-april-2010/161-analytics-in-action-schneider-national-runs-with-analytics.html](http://analytics-magazine.com/march-april-2010/161-analytics-in-action-schneider-national-runs-with-analytics.html)

[http://fleetowner.com/management/news/schneider-princeton-shipping-technology-0818/](http://fleetowner.com/management/news/schneider-princeton-shipping-technology-0818/)

[http://analytics-magazine.com/spring-2008/254-roundtable-profiles-the-schneider-enterprise.html](http://analytics-magazine.com/spring-2008/254-roundtable-profiles-the-schneider-enterprise.html)

[http://www.fleetmag.com/web/online/Industry-News/Schneider-National-and-Princeton-University-team-up/1\$$4294](http://www.fleetmag.com/web/online/Industry-News/Schneider-National-and-Princeton-University-team-up/1$$4294)
{% endraw %}
