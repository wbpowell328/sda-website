---
layout: page
title: "Service Network Design"
permalink: /service-network-design/
date: 2017-09-06 10:57:04
---

<i>Service network design covers the problem of when to move a truck that can carry multiple shipments. In a static setting, this produces large integer programming problems. In a dynamic setting, it creates batch service processes.</i>

&nbsp;

<strong>Dall’Orto, L. C., T. G. Crainic, J. E. Leal and W. B. Powell, “The Single-Node Dynamic Service Scheduling and Dispatching Problem,” European Journal of Operations Research, Vol. 170, No. 1, pp. 1-23 (2005).</strong>

<em>Network design problems represent one of the hardest classes of integer programming problems. Time-staged versions of these problems are even harder. In this paper we extend the approximate dynamic programming strategy introduced by Katerina Papadaki for the single link problem to a problem where trucks are being dispatched out of a single node to multiple destinations. We have to figure out where to send trucks, and what freight to put on each truck. A truck going to destination j may carry freight to a final destination k. We treat the cost function from j to k as linear, and focus on the integer programming problem out of the origin node i. We solve one time period at a time, using a linear approximation to capture the impact of holding customers from time t to t+1. A metaheuristic is used to solve the single node (multiple link) problem, which while not very large, has to be solved very quickly (since it has to be solved iteratively). </em>

<a href="http://castle.princeton.edu/Papers/Dal%20Orto%20Crainic%20Powell%20Single%20node%20June%2010%202004.pdf" target="_blank" rel="noopener">(Click here to download paper)</a>

<strong>Papadaki, K. and W.B. Powell, “An Adaptive Dynamic Programming Algorithm for a Stochastic Multiproduct Batch Dispatch Problem,” Naval Research Logistics, Vol. 50, No. 7, pp. 742-769, 2003.</strong>

<em>One of the oldest problems in dynamic programming arises in the context of planning inventories. You can use textbook backward dynamic programming if there is only one product type, but real problems have multiple products. In this paper, we consider a multiproduct problem in the context of a batch service problem where different types of customers wait to be served. Arrivals are stochastic and nonstationary. We show that an approximate dynamic programming strategy using linear value functions works quite well and is computationally no harder than a simple myopic heuristics (once the iterative learning is completed). </em>

<a href="http://castle.princeton.edu/Papers/multiproduct_paper.pdf" target="_blank" rel="noopener"><i>(click here to download paper)</i></a>

<strong>Papadaki, K. and W.B. Powell, “Exploiting structure in adaptive dynamic programming algorithms for a stochastic batch service problem,” European Journal of Operational Research, Vol. 142, No. 1, pp. 108-127 (2002).</strong>

<em>This paper compares an optimal policy for dispatching a truck over a single link (with one product type) against an approximate policy that uses approximations of the future. Why would we approximate a problem that is easy to solve to optimality? Because the optimal policy only works on single link problems with one type of product, while the other is scalable to much harder problems. </em>

<a href="http://castle.princeton.edu/Papers/monotone.pdf" target="_blank" rel="noopener"><i>(click here to download paper)</i></a>

<strong>J.B. Braklow, W. Graham, K. Peck, S. Hassler, and W.B. Powell, "Interactive Optimization Improves Service and Performance for Yellow Freight System," Interfaces, Vol. 22, No. 1, 1992, pp. 147-172.</strong>

<em>This was a finalist in the 1991 Franz Edelman competition, and for many years one of the most requested videotapes from the Edelman library. The paper documents a strategic planning system implemented at Yellow in the late 1980's which is still in production at Yellow as of this writing (2005). The system uses interactive optimization techniques to build a service network that delivers packages both efficiently and with high service.</em>

<a href="http://castle.princeton.edu/Papers/Braklow%20Graham%20et%20al%20%20Interactive%20Optimization%20Improves%20Service%20at%20Yellow.pdf" target="_blank" rel="noopener">(click here to download paper)</a>

<strong>Farvolden, J.M. and W.B. Powell, "Subgradient Optimization for the Service Network Design Problem," Transportation Science, Vol. 28, No. 3, pp. 256-272. (c) Informs </strong>

<strong>Powell, W.B. "A Local Improvement Heuristic for the Design of Less-Than-Truckload Motor Carrier Networks," Transportation Science, Vol 20, No. 4, pp. 246-257 (1986). (c) Informs</strong>

<a href="http://castle.princeton.edu/Papers/Powell-Local%20Improvement%20Heuristic%20for%20LTL%20Networks.pdf" target="_blank" rel="noopener"><i>(click here to download paper)</i></a>

<strong>Koskosidis, I.A. and W.B. Powell, "Shipment Routing Algorithms with Tree Constraints," Transportation Science Vol 26, No. 3, pp. 230-245, 1992. (c) Informs </strong>

Less-than-truckload networks require that shipments be routed over links where the cost on a link is a piecewise linear function of the flow. Such problems could be solved as classical traffic assignment problems, but LTL networks (at the time) require that the routing of the shipments be communicated iin a way that follows a tree so that they can be described with the instruction "a shipment at i, headed to destination k, be sent on a truck going to j." This paper formulates the problem and describes a solution procedure.

<a href="http://castle.princeton.edu/Papers/Koskosidis%20Powell%20-%20Shipment%20routing%20algs%20with%20tree%20constraints.pdf"><i>(click here to download paper)</i></a>

<strong>Powell, W.B. and Y. Sheffi, "Design and Implementation of an Interactive Optimization System for Network Design in the Motor Carrier Industry," Operations Research, Vol. 37, No. 1, pp. 12-29 (1989). (c) Informs.</strong>

<em>This paper describes a production system for static load planning for less-than-truckload motor carriers. The problem is determining where a carrier should offer "direct service". If we run trucks from i to j, it will carry freight that not only originates and i and terminates at j, but also other origin-destination pairs for which this link in the network helps them move quickly and at low cost. The problem the carrier faces is that the trucks have to move at least once a day, and possibly more. So, if there is not enough freight to fill the trucks, then it is possible that it is better to not run trucks between these points, and force freight through links with higher density. While this can be set up as a large-scale integer network design problem, the practical reality is that there are issues not captured by the cost model. This system solves the problem interactively, which also means that the calculations had to be *really* fast (on 1980's vintage computers). Developed at Princeton University, this system was one of the founding products of the Princeton Transportation Consulting Group, and has been used by numerous LTL carriers in the 1990's.</em>

<a href="http://castle.princeton.edu/Papers/Powell%20Sheffi%20-%20Design%20and%20implementation%20of%20an%20interactive%20opt%20system%20for%20ltl.pdf" target="_blank" rel="noopener"><i>(click here to download paper)</i></a>

<strong>Powell, W.B. and Y. Sheffi, "The Load Planning Problem of Motor Carriers: Problem Description and a Proposed Solution Approach," Transportation Research, Vol. 17A, No. 6, pp. 471-480, (1983).</strong>
