---
layout: page
title: "On State Variables"
permalink: /statevariables/
date: 2022-04-04 15:32:46
---

<!-- wp:tadv/classic-paragraph -->
<p>Warren B. Powell</p>
<p>Fundamental to sequential decision problems is the concept of a state variable.  Astonishingly, there are entire communities that deal with sequential decision problems that use the term "state variable" (or state space) without offering a proper definition (although some think they do).  </p>
<p>Below is a summary of some competing perspectives of state  variables.  I end with "My definition" which I think is precise and clear enough to teach to any audience, and resolves all of my issues with state variables.  An extended description can be found in section 9.4 of <a href="https://tinyurl.com/RLandSO/">RLSO</a>.</p>
<h4>Definitions from the MDP community:</h4>
<p>Some "definitions" of state variables:</p>
<ul>
<li>Bellman’s seminal text [Bellman (1957), p. 81] says “... we have a physical system characterized at any stage by a small set of parameters, the <em>state</em> <em>variables</em>.” (Italics are from the original text)</li>
<li>Puterman first introduces a state variable by saying [Puterman (2005), p. 18] “At each decision epoch, the system occupies a <em>state</em>.” (Italics are from the original text)</li>
<li>From Wikipedia: "A <strong>state variable</strong> is one of the set of variables that are used to describe the mathematical ‘state’ of a dynamical system."  (The next sentence says: "Intuitively, the state of a system describes enough about the system to determine its future behavior in the absence of any external forces affecting the system." But, we can still define state variables in the presence of exogenous information flows, so this statement is not accurate either.)</li>
</ul>
<p>Let me first start by asking: Didn't we all learn in grade school that we do not use the word we are defining in its definition??!!  </p>
<h4>A definition from the RL community:</h4>
<p>The reinforcement literature inherited the style of not defining state variables from the literature on Markov decision processes, but a notable exception is the second edition of Sutton and Barto's <em>Reinforcement Learning: An introduction</em>.  While they never explicitly define a state variable, they offer descriptions: </p>
<ul>
<li>On p. 7, under section 1.4 Limitations and Scope, the authors note: ".. we encourage the reader to follow the informal meaning and think of the state as whatever information is available about its environment."</li>
<li>In chapter 3 they then say [p. 49] "The state must include information about all aspects of the past agent-environment interaction that make a difference for the future."</li>
</ul>
<p>The first bullet seems to suggest that all available information (about the environment) is in the state variable, but does not define "environment."  The second bullet includes the condition "that make(s) a difference for the future."  Keep reading.</p>
<h4>From some theoreticians:</h4>
<p>I have spoken to numerous mathematicians (in stochastic control/optimization) who will insist "but I know what a state variable is."  Consider the following anecdotes of statements made by some of the best known names in the field:</p>
<ul>
<li>
<p>From <i>Probability and </i><i>Stochastics</i> by Erhan Cinlar (2011) - a former colleague at Princeton and one of the best known probabilists in the field: "The definitions of 'time' and 'state' depend on the application at hand and on the demands of mathematical tractability.  Otherwise, if such practical considerations are ignored, every stochastic process can be made Markovian by enhancing its state space sufficiently."</p>
</li>
<li>From Bertsekas' <em>Dynamic Programming and Optimal Control: Approximate Dynamic Programming </em>(4th edition, 2012): "... we assume that at each time <em>k</em>, the control is applied with knowledge of the current state [latex]x_k[/latex].  Such policies are called <em>Markov</em> because they do not involve dependence on states beyond the current.  However, what if the control were allowed to depend on the entire past history:</li>
</ul>
<p>[latex]h_k = \{x_0, u_0, \ldots, x_{k-1},u_{k-1},x_k\}[/latex]</p>
<p>which ordinarily would be available at time <em>k.  </em>Is it possible that better performance can be achieved in this way?" (WBP: If this were the case, then there is information from "history" that is needed to make decisions, so why isn't this included in the state variable?)</p>
<ul>
<li>In Puterman's wonderful book <em>Markov Decision Processes</em>, on p. 97 he presents a graph problem that involves finding the path through a network that minimizes the <em>second highest</em> cost on the path (rather than the sum of the costs).  He then goes on to argue that Bellman's optimality equation no longer works!  This is because he changes how costs are calculated, but still assumes the state of the system is the node where a traveler is located.  The problem is that with the revised cost metric, you also have to keep track of the two highest costs on the path the traveler has traversed, because this is what is needed to determine whether a cost on the next arc is one of the top two.</li>
<li>From Sean Meyn's "Control Systems and Reinforcement Learning," Sean states (p. 12):  "In statistics, the term <em>sufficient statistic</em> is used to denote a quantity that summarizes all past observations.  The <em>state</em> plays an analogous role in control theory."  It is popular for theoreticians to "define" a state variable as a sufficient statistic, but this is just replacing one piece of terminology with another, that still needs to be defined.</li>
<li>Two mathematical books on optimal control, one by Rene Carmona, and one by Fleming and Soner, while using very sophisticated mathematics never actually define a state variable.   <img class="alignnone size-large wp-image-8639" src="https://castle.princeton.edu/wp-content/uploads/2025/01/Soner-Carmona-theorem-1024x289.jpg" alt="" width="660" height="186" /></li>
</ul>
<p>If we agree that a state is all the information you need to model the system from time <em>t</em> onward, then the system is, by definition (and by construction) Markovian. Further, you would never need information from history since again, by definition (and by construction), the state variable already has any information that may have arrived before time <em>t</em> (or "time" <em>k</em>).  So, there is no need to "expand the state space sufficiently," nor any need to depend on history.</p>
<p>[Side note: a talented post-doc in my lab posed the question: What if we simply do not know all the information we need? This raises subtle issues that are more than I can cover on a webpage.  See note (vii) on page 483 of <a href="https://tinyurl.com/RLandSO/">RLSO</a> (following the definition of states) and section 20.2 in <a href="https://tinyurl.com/RLandSO/">RLSO</a> which uses a two-agent model of flu mitigation to illustrate the setting of when a controlling agent does not know the environment.]</p>
<h4>Definitions from optimal control</h4>
<p>Now look at some definitions in books on optimal control: </p>
<ul>
<li>From Kalman's 1963 paper <a href="https://castle.princeton.edu/wp-content/uploads/2025/01/Kalman-Mathematical-description-of-linear-dynamical-systems-1963-1.pdf">"Mathematical Description of Linear Dynamical Systems" (SIAM J. on Control)</a> he has the statement below.  Note that he correctly describes a state variable as "the minimal amount of information about the past history," which is quite general, but illustrates it using the position and momentum of particles, which reflects the common tendency to equate "state" with "physical state." <img class="alignnone size-full wp-image-8630" src="https://castle.princeton.edu/wp-content/uploads/2025/01/Kalman-state-variable-paragraph.jpg" alt="" width="1017" height="303" /></li>
<li>From Kirk (2004): "A state variable is a set of quantities [latex]x_1(t),x_2(t),\ldots,[/latex] which if known at time <em>t</em>, are determined for [latex]t \geq t_0[/latex] by specifying the inputs for the system for [latex]t \geq t_0[/latex]."</li>
<li>From Cassandras and Lafortune (2008): "The <em>state</em> of a system at time [latex]t_0[/latex] is the information required at time [latex]t_0[/latex] such that the output [cost] [latex]y(t)[/latex] for all [latex]t \geq t_0[/latex] is uniquely determined from this information and from [latex]u(t)[/latex]."</li>
</ul>
<p>Each of these definitions can be restated simply as:</p>
<ul>
<li>The state is all the information you need at time <em>t</em> to model the system from time <em>t</em> onward.</li>
</ul>
<p>This definition is also consistent with Sean Meyn's characterization of state variables (given above) as "sufficient statistics" which is just another way of saying the definition above.</p>
<p>Both of the definitions above understand that to model the system moving forward, you need the controls [latex]u(t)[/latex] (presumably determined by a "control law" or "policy") as well as any exogenous (random) information.  These definitions appear to be standard in optimal control.</p>
<p>I like the characterization, widely used in books on optimal control, that the state variable is all the information you need to model the system from time <em>t</em> onward, regardless of <em>when</em> the information arrived!  My only complaint is that it needs to be more explicit.</p>
<h4>My definition: </h4>
<p>In my new book (<a href="https://tinyurl.com/RLandSO/">RLSO</a>)[section 9.4], I offer two definitions of state variables depending on whether a policy has been specified or not.  </p>
<ul>
<li><strong>Policy-dependent version</strong> - A function of history that, combined with the exogenous information (and a policy), is necessary and sufficient to compute the cost/contribution function, the decision function (the policy), and any information required by the transition function to model the information needed for the cost/contribution and decision functions in the future.</li>
<li><strong>Optimization version</strong> - A function of history that is necessary and sufficient to compute the cost/contribution function, the constraints, and any information required by the transition function to model the information needed for the cost/contribution function and the constraints in the future.</li>
</ul>
<p>Both definitions are completely consistent with the "all the information you need ..." definitions from optimal control.  It is just that I have identified the specific places where we need to provide information: the cost/contribution function, the policy (or constraints), and then the equations used to model how this information evolves over time (this is inside the transition function).  </p>
<p>I find it useful to note that a state variable is <em>information </em>which may come in three flavors:</p>
<ul>
<li>Physical state variables [latex]R_t[/latex] - This might be inventory, the location of a vehicle on a graph, the attributes of a person, machine or patient.</li>
<li>Informational variables [latex]I_t[/latex] - This is any information about quantities or parameters that are not included in [latex]R_t[/latex].  Examples could be market prices, weather, or traffic conditions.</li>
<li>Belief variables [latex]B_t[/latex] - These are statistics (frequentist) or parameters of probability distributions (Bayesian) describing any quantities or parameters that we do not know perfectly.  This could be used to describe how a market responds to price, the time that a shipment might arrive, the state of a patient or complex machine.  Belief states can also capture the parameters needed to determine a policy, which might be the estimates of value functions or of the parameters of a policy.  This means that the state variable can include estimates of the value of being in a state (go ahead and wrap your head around that one!).</li>
</ul>
<p>While the optimal control literature is the best I have seen in terms of defining state variables, I have yet to see a control paper that recognizes that a belief can be part of a state variable.</p>
<p>The POMDP (partially observable Markov decision process) literature creates a special dynamic program where the belief about a quantity can be a state, but this literature does not seem to recognize that you can have physical state variables and belief state variables that combine to form <em>the</em> state variable.  A good example arises in clinical trials where you have a physical state (how many patients are remaining in the pool, how much money you have remaining) and the belief about the efficacy of the drug. </p>
<h4>But what if there is missing information?</h4>
<p>In a mathematical statement of a problem, we can design a state variable that includes all the information needed to meet the three requirements I outlined above.  But what if we simply do not have access to some information?</p>
<p>Some examples of missing information are:</p>
<ul>
<li>An electrical power transformer ages with the number of times voltage surges (e.g. from lighting) pass through the device.  However, we are not able to directly observe either the number of lightning strikes, or the deterioration of the materials within the transformer.</li>
<li>One way to optimize inventories is to discount the price, but we don't know how the market responds to these price changes.</li>
</ul>
<p>Missing the information about the age of materials within the transformer, or how the market responds to prices, makes it impossible to model the forward trajectory of the system.  How do we construct a state variable that meets the requirements in all the above definitions to include <em>all</em> the information needed to model the system forward in time?</p>
<p>What we do is to replace the information with a probabilistic belief.  This may be based on frequentist or Bayesian modeling, which means it has to be more than just a point estimate - it has to include a probability distribution of the missing information.</p>
<p> </p>
<!-- /wp:tadv/classic-paragraph -->
