---
layout: page
title: "Superspin"
permalink: /superspin/
date: 2017-09-07 10:31:19
---

<span style="font-size: 12pt;"><strong>SuperSPIN - Interactive optimization for less-than-truckload trucking</strong></span>

<span style="font-size: 12pt;">Warren B. Powell
Princeton University</span>
<h3><span style="font-size: 12pt;"><strong>Highlights</strong></span></h3>
<span style="font-size: 12pt;">It is not often that a model is able to shape an industry, but SuperSPIN was a model that arrived during a period of tremendous change in the LTL trucking industry. SuperSPIN allowed companies to understand the tradeoffs between the number of end of lines and the value of network density. It also played a role in determining which carriers survived, and was used in the planning of some of the largest LTL carriers that survived the shakeout. </span>

<span style="font-size: 12pt;">In the 1990's, SuperSPIN was being used by every major national and regional LTL carrier.SuperSPIN played a role in the planning of Roadway Package System, which would later become FedEx Ground, as well as the LTL carriers that would later become Fedex Freight (the LTL devision of FedEx). SuperSPIN was used at Overnight Transportation, which is now UPS Freight. PTCG was later bought out by Manhattan Associates which continues to support SuperSPIN.</span>
<h3><span style="font-size: 12pt;">History</span></h3>
<span style="font-size: 12pt;">SuperSPIN started as a model called "APOLLO" (Advanced Planner Of LtL Operations) developed at Princeton University with funding from John Terry at IU International for its subsidiary, Ryder Truck Lines, an LTL carrier based primarily in the east (IU had funded Warren Powell's Ph.D. dissertation at MIT under the guidance of Professor Paul Roberts). APOLLO laid the foundation for the interactive optimization structure that proved so popular with industry. The core research for the model is captured by the papers</span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Powell-Local%20Improvement%20Heuristic%20for%20LTL%20Networks.pdf" target="_blank" rel="noopener">Powell, W.B. "A Local Improvement Heuristic for the Design of Less-Than-Truckload Motor Carrier Networks," Transportation Science, Vol 20, No. 4, pp. 246-257 (1986). (c) Informs</a></span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Koskosidis%20Powell%20-%20Shipment%20routing%20algs%20with%20tree%20constraints.pdf" target="_blank" rel="noopener">Koskosidis, I.A. and W.B. Powell, "Shipment Routing Algorithms with Tree Constraints," Transportation Science Vol 26, No. 3, pp. 230-245, 1992. (c) Informs</a></span>

<span style="font-size: 12pt;">The project at Ryder terminated in 1985 as a merger between Ryder and its western sister, Pacific Intermountain Express (P.I.E.) went badly. The project at Ryder is summarized in the paper</span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Powell%20Sheffi%20-%20Design%20and%20implementation%20of%20an%20interactive%20opt%20system%20for%20ltl.pdf" target="_blank" rel="noopener">Powell, W.B. and Y. Sheffi, "Design and Implementation of an Interactive Optimization System for Network Design in the Motor Carrier Industry," Operations Research, Vol. 37, No. 1, pp. 12-29 (1989). (c) Informs.</a></span>

<span style="font-size: 12pt;">In 1986, Yellow Freight System (as it was known then) picked up development. Under the direction of John Braklow, the model (now under <img src="http://castle.princeton.edu/html/images/superspin.jpg" width="440" height="566" align="right" />the name SYSNET (r)) became a major tactical planning tool for Yellow, going into production in 1988. Yellow had undergone tremendous growth through the 1980's, with over 700 end-of-line terminals by 1988 (in LTL trucking, freight originates and terminals at end of line terminals, with "breakbulks" serving as hubs where shipments are unloaded, sorted and reloaded, just like passengers changing planes at a hub terminal). </span>

<span style="font-size: 12pt;">The problem is illustrated in the upper network to the right. If there are a large number of terminals, Yellow could minimize the "stem time" for trucks delivering shipments from an end of line (illustrated by the small delivery tours out of the terminal at the top). However, this also reduced the number of shipments originating and terminating at each end of line. As a result, shipments typically would move through two hubs before reaching the destination end of line.</span>

<span style="font-size: 12pt;">With SYSNET, Yellow was able to determine that it could lower costs and improve service with fewer end of lines, incurring higher delivery costs. The reason is that with fewer end of lines, there was more freight originating and terminating at each end of line. With the higher density, Yellow could load trucks past a hub, reducing handling cost and improving service. The resulting network is depicted in the lower graphic to the right.</span>

<span style="font-size: 12pt;">The feature that made SYSNET so powerful was that it used interactive optimization, which allowed a knowledgeable analyst to guide the search process. SYSNET made it possible for a user to pose a "what if" question (should the company run trucks direct from terminal i to hub j, or hub j to terminal k) and get an answer in a fraction of a second. In a single session, a user could evaluate hundreds of changes to the network, guiding the search process and holding final approval over any changes. On the computers available in the 1980's, this was a fairly difficult feat. 20 years later, no other model has been able to replace this capability. We actually developed a black box model that was marketed under the name "SPIN" (the acronym was derived from the clumsy "Strategic Planning Interactive Network system"), but the model was not successful and was dropped. </span>

<span style="font-size: 12pt;">The project at Yellow was recognized in 1991 as a finalist in the prestigious Franz Edelman competition. This project is summarized in the paper:</span>

<span style="font-size: 12pt;"><a href="http://castle.princeton.edu/Papers/Braklow%20Graham%20et%20al%20%20Interactive%20Optimization%20Improves%20Service%20at%20Yellow.pdf" target="_blank" rel="noopener">J.B. Braklow, W. Graham, K. Peck, S. Hassler, and W.B. Powell, "Interactive Optimization Improves Service and Performance for Yellow Freight System," Interfaces, Vol. 22, No. 1, 1992, pp. 147-172.</a></span>

<span style="font-size: 12pt;">In 1988, the Princeton Transportation Consulting Group was founded, with two Princeton undergraduates forming the initial management team. David Cape '87 was the president (David contributed to a model, MicroMAP, for truckload trucking for his undergraduate senior thesis), and Ken Nickerson '84 was vice president in charge of software development and engineering. PTCG took over the re-engineering of the model, which consisted of over 40,000 lines of code, almost entirely written by Warren Powell (in Fortran, on a mainframe, before the internet, before Federal Express and before the existence of modern software development tools). </span>

<span style="font-size: xx-small;"><span style="font-size: 12pt;">PTCG turned SuperSPIN into a professional software product and service. SuperSPIN was ultimately adopted by virtually every major LTL carrier, although some companies used it with more sophistication than others. SuperSPIN played a role in the planning of Roadway Package System, which would later become FedEx Ground, as well as the LTL carriers that would later become Fedex Freight (the LTL devision of FedEx). SuperSPIN was used at Overnight Transportation, which is now UPS Freight. PTCG was later bought out by Manhattan Associates.</span> </span>

&nbsp;
