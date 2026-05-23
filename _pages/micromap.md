---
layout: page
title: "MicroMap"
permalink: /micromap/
date: 2017-09-07 10:39:37
---

<span style="font-size: 12pt;"><strong>MicroMAP - Real-time load matching and pricing for truckload trucking</strong></span>

<span style="font-size: 12pt;">Warren B. Powell
Princeton University</span>
<h3><span style="font-size: 12pt;"><strong>Highlights</strong></span></h3>
<span style="font-size: 12pt;">MicroMAP, now marketed as "Drivers and Loads" by Manhattan Associates, is a real-time optimization model for recommending assignments of drivers to loads. As of 2011 (according to Manhattan Associates), the model was used by 20 of the largest truckload carriers to dispatch over 66,000 drivers. The model minimizes empties while simultaneously balancing on time service, getting drivers home and matching drivers with the right skills.</span>
<h3><span style="font-size: 12pt;">History</span></h3>
<span style="font-size: 12pt;">In the late 1970's, Schneider National (one of the three largest truckload companies in the U.S.) pioneered the use of early network optimization algorithms to solve the problem of managing their growing fleet of truck drivers. Schneider had developed two models - a dispatch system that optimized the assignment of drivers to loads (without looking into the future), and a fleet planning model that optimized flows over a seven day horizon. The first model ignored the impact of decisions now on the future, while the second model ignored the high level of uncertainty that characterizes customer demands in this industry. These models were developed by Dr. Richard Murphy, at the time a professor at the University of Cincinnati. Dr. Murphy left academia to work with Schneider, and then formed his own consulting firm.</span>

<span style="font-size: 12pt;">Our work began with the initial breakthrough, a model (called "LOADMAP" for load matching and pricing) which produced a computationally tractable approximation for optimizing the flows of trucks over a space-time network. This model is given in the following paper</span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Powell-OperationalPlanningModelforDVA.pdf" target="_blank" rel="noopener">Powell, W.B.,"An Operational Planning Model for the Dynamic Vehicle Allocation Problem with Uncertain Demands," Transportation Research , Vol. 21B, No. 3, pp. 217-232 (1987).</a></span>

<span style="font-size: 12pt;">This model was implemented at two trucking companies: North American Van Lines (which ran a truckload division alongside its household goods division) and the newly started Burlington Motor Carriers. The programming was performed by Ken Nickerson, who was working as a research staff member after graduating from Princeton. The implementation at North American was a finalist in the Franz Edelman competition in 1987. However, these projects demonstrated that it was not enough to plan the flows of generic trucks, but rather we had to model each individual driver. </span>

<span style="font-size: 12pt;"><img src="http://castle.princeton.edu/html/images/micromap.jpg" width="680" height="470" align="right" />LOADMAP was extended to handle individual drivers for their first assignment, after which they were aggregated into individual trucks. An important property of the resulting model was that it could be solved as a "pure network" for which there were very fast algorithms (today, general purpose solvers such as Cplex handle these problems). The new model was programmed by David Cape for his undergraduate senior thesis, and was called "MicroMAP" reflecting its much higher level of detail. The resulting network is depicted to the right. A full research article describing MicroMAP was eventually published in the paper:</span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Trans_Sci_Stochastic_Formulation_Dynamic_Assignment_Problem.pdf" target="_blank" rel="noopener">Powell, W.B. "A Stochastic Formulation of the Dynamic Assignment Problem, with an Application to Truckload Motor Carriers," Transportation Science. Vol. 30, No. 3, pp. 195-219 (1996). (c) Informs. </a></span>

<span style="font-size: 12pt;">A major feature of the implementation was that it was implemented as a real-time optimizer, responding within a second to updates to drivers and loads. MicroMAP was one of two models that formed the foundation of the Princeton Transportation Consulting Group, founded in 1988. </span>

<span style="font-size: 12pt;">The model was implemented at Burlington Motor Carriers. A paper describing this experience is</span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Powell-BMC%20implementation%20paper.pdf" target="_blank" rel="noopener">Powell, W.B., A. Marar, J. Gelfand, and S. Bowers, “Implementing Operational Planning Models: A Case Application from the Motor Carrier Industry,” Operations Research, Vol. 50, No. 4, (2002). (c) Informs</a></span>

<span style="font-size: 12pt;">A separate paper provides additional background on this project, and the general problem of implementing real-time dispatch systems:</span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Powell%20CRC%20chapter%20-%20TL%20dispatching%20Sept%2028%202007.pdf" target="_blank" rel="noopener">Powell, W.B., “Real-time dispatching for truckload motor carriers,” in Logistics Engineering Handbook (G. Don Taylor, ed.), CRC Press, 2007, pp. 15-1 – 15-30. (c) CRC Press.</a></span>

<span style="font-size: 12pt;">MicroMAP was the first commercial dispatch system to run fully in real-time, responding to updates in drivers and loads within a second while capturing a high level of detail about both drivers and loads. Even Schneider's own dispatch system ran in batch when users requested an optimization. PTCG was sold to Manhattan Associates which maintains the system under the name "Drivers and Loads."</span>

<span style="font-size: 12pt;">As of 2011, MicroMAP was being used by 20 of the largest truckload motor carriers to dispatch over 66,000 drivers, including two of the top three "mega" carriers (J. B. Hunt and Swift). Schneider pioneered load matching in the late 1970's with a myopic model that ran in a batch model. However, Schneider uses a model based on approximate dynamic programming for strategic fleet planning. See</span>

<span style="font-size: 12pt;"><a href="http://www.castle.princeton.edu/html/wagner.htm" target="_blank" rel="noopener">http://www.castle.princeton.edu/wagner.htm</a></span>

&nbsp;

&nbsp;
