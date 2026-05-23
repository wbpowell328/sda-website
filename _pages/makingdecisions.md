---
layout: page
title: "What is a decision? (... and how do we make them)"
permalink: /makingdecisions/
date: 2025-10-15 09:53:04
---

{% raw %}
<!-- wp:tadv/classic-paragraph -->
<p style="text-align: center;">Warren B. Powell<br>Professor emeritus, Princeton University<br>Chief Innovation Officer, Optimal Dynamics</p>
<p>&nbsp;</p>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph -->
<p><em>Note to all readers: This webpage is designed to facilitate discussion. I am astonished that a question such as "What is a decision" has not been definitively answered at this time (2026).  I welcome comments to anything on this page, but especially my own attempt at a definition, and especially my section on different types of decisions.  Please send thoughts and comments to me at wbpowell328@gmail.com.</em></p>
<p>Decisions are a fundamental human activity, studied and debated throughout our entire history, driven by our endless desire to improve.  As I like to say:  </p>
<p><img class="alignright size-full wp-image-9088" src="https://castle.princeton.edu/wp-content/uploads/2025/10/If-you-want-to-run-a-better-tan.jpg" alt="" width="1836" height="368" /></p>
<p>After a career in traditional academic research on models and algorithms for making better decisions in various specialized settings, retirement has allowed me to think more deeply about this topic, and I have been struck by the open questions about decisions.  Specifically:</p>
<ul>
<li>What is a decision?</li>
<li>Types of decision settings (very important!)</li>
<li>Some features of decisions:<br />
<ul style="list-style-type: circle;">
<li>Flavors of decisions</li>
<li>Timing</li>
<li>Different words for "decision"</li>
</ul>
</li>
<li>History of defining decisions</li>
<li>What decisions do we need to make?</li>
<li>How do we make decisions?</li>
<li>The psychology of making decisions</li>
<li>"State variables" are fundamental in dynamic problems, but what is a state variable?</li>
<li>What is the value of information?</li>
<li>The "great thinkers" in the history of decision-making.</li>
</ul>
<p>A goal of this page is making people more aware of when they are making decisions, since we frequently make decisions without realizing it. You cannot make a better decision until you recognize that you are making a decision.</p>
<h2>What is a decision?</h2>
<p>It is astonishing that such a fundamental activity of people lacks a broadly accepted definition.  As with many commonly used words, "decision" is used in different ways.  </p>
<ol>
<li><em><strong>An endogenously controllable information class, </strong></em>or more simply, <strong><em>i</em><em><strong>nformation</strong> we control.</em> </strong>This definition distinguishes between: a) What we know at a point in time (the state of knowledge); b) Information that changes the state of knowledge that we (as the controlling agent) control; c) Information that changes the state of knowledge that we do not control, which means it arrives from an exogenous source outside of our control. Information in (b) represents decisions.</li>
<li><em><strong>A choice from a set of alternatives.</strong></em><strong> </strong>The "decision" is the choice that is made (by some process) from a set of discrete alternatives, or within a feasible region such as [latex]Ax = b, x \geq 0[/latex] where [latex]x[/latex] is chosen to optimize some metric where [latex]x = (x_1, \ldots, x_K)[/latex].</li>
<li><em><strong>A single choice in a set of alternatives. </strong></em>"What decision was made" refers to the specific choice (the single element in a set of choices) as opposed to the entire set.</li>
<li><strong><em>A committed choice or action</em><em>, separate from a plan that may or may not be implemented. </em></strong>The idea of distinguishing plans from commitments was introduced by the decision scientist Ron Howard in 1966 using the phrasing "<em>An irrevocable allocation of resources," </em>to capture the commitment to implement a choice.  </li>
<li><em><strong>The outcome of a competition or judgment. </strong></em>For example, the winner of a sports contest, the result of an election, a judicial opinion.</li>
</ol>
<p>A <em><strong>decision</strong></em> is distinct from the process of making a decision.  The decision may involve an explicit evaluation of all the possible choices, or it may be the output of a function or process that is designed to produce feasible decisions that perform well over time.</p>
<h2>Types of decision settings</h2>
<p>Decisions arise in a variety of settings.  Communities that study the science of decisions (decision analysis, math programming, optimal control, stochastic search) are typically motivated by applications that feature different flavors of decisions, different ways that uncertainty may arise, and styles of performance metrics:</p>
<ol>
<li><strong>Physical and financial decisions</strong> - These decisions arise in the management of physical and financial resources, spanning people, equipment, facilities, products, commodities, water, energy, in addition to cash, investments, loans, ...  Decisions include buying, selling, moving, and modifying resources. This class is the domain of operations research, engineering control, and finance; it draws heavily on tools such as linear, integer and nonlinear programming.  </li>
<li><strong>Complex/strategic decisions </strong>-These are decisions that may make multiple changes to a system (changing resources, parameters, beliefs), and which typically involve significant sources of uncertainty. These decisions are typically evaluated once, but the option of waiting and making the decision later may exist.  </li>
<li><strong>Information acquisition/observation decisions</strong> - These include decisions to acquire or observe information by running experiments in the lab, field, or with computer simulations that are conducted in a test environment (offline), or decisions to run and observe processes in the field using a "learning while doing" approach (online). Offline information acquisition can include laboratory experiments, simulations, internet searches, or hiring domain experts.  Online learning involves observing a process as it evolves, such as how a market responds to advertising or pricing, or how a patient responds to a treatment. These decisions are studied under names such as design of experiments (static or sequential), stochastic search, active (or optimal) learning, multiarmed bandits, and Bayesian optimization.</li>
<li><strong>Information communication/sharing decisions -</strong> These come in two forms:
<ol style="list-style-type: lower-alpha;">
<li>Messaging - This reflects what we say in text, video and/or audio.  A modern example of messaging includes prompt optimization, but other examples are the design of ads, communications to a company or public broadcast, instructions to use a product, training given to employees, and instructions on how to use a product.</li>
<li>Channels and timing - This reflects the choice of channel (text/emails, publication (print or online), social media, or advertising channels) along with the timing and frequency.  </li>
</ol>
</li>
<li><strong>Choosing functions</strong> - Often overlooked as a decision, functions may be methods to make decisions (policies), optimization models, objective functions, models for forecasting or estimation, or transition functions (such as how disease spreads).  This category covers the choice of function, which means its structure.  </li>
<li><strong>Setting parameters</strong> - Functions are typically characterized by one or more parameters (typically continuous, but not always) that can be tuned to improve predictive accuracy (when fitting statistical models) or optimized to improve performance (when tuning a policy for making decisions). Parameters may be associated with a function; they can be the weight on a performance metric, or they could be a target (or limit) for a performance metric. </li>
<li><strong>Labeling or identification - </strong>We may be given a picture of a person, and asked to identify them, where we want to maximize the number of times we identify the person correctly.  A large language model is given a set of tokens, and it tries to identify the most likely token that comes next. This type of decision specifically targets the choice of <em>label</em>, as opposed to choosing the best model as would be done in machine learning (choosing the model would be a type 5 decision, while optimizing the coefficients is type 6).  </li>
<li><strong>Features and behaviors</strong> - How to design a product, what features a software package should have, what services should be provided to a customer, and whether or not to be polite. This might also include a student's choice of major, which determines the skills they will graduate with.</li>
<li>
<p><strong>Deciding what to decide</strong> - In most real applications, the number of potential decisions (that is, anywhere we face a choice) can be quite large.  We have to prioritize which decisions have the greatest economic value to justify doing any formal analysis.  I describe a simple approach for "deciding what to decide" in <a href="https://tinyurl.com/PowellFramingVideo/">part 2 of the framing tutorial here</a>.   </p>
</li>
</ol>
<p>"Decisions" arise at every level of the decision-making process.  Once we have chosen what decision we want to make (possibly a type 1 or 2 decision), we have to decide which policy to use for making decisions (a type 5 decision).  Then, the policies are typically characterized by parameters that have to be optimized (a type 6 decision), which requires choosing a search algorithm (another type 5 decision). If we use a derivative-free stochastic search method, this involves type 3 decisions to guide the search. If there is information we do not know, we might estimate it using machine learning, which requires making type 7 decisions, which may also involve type 5 decisions (the type of model) and type 6 decisions (to learn the best parameters). </p>
<p>There is an inevitable overlap between the different types of decisions.  We may decide to send a truck from one location to another (a physical decision, type 1), which gives us an observation of the travel time (an information decision, type 3), which we use to update our estimate of travel times.  </p>
<p>If you think of a type of decision that does not seem to fit in these types, email me at wbpowell328@gmail.com. </p>
<h2>Some features of decisions</h2>
<p>Here we provide some additional features of decisions:</p>
<ol style="list-style-type: lower-alpha;">
<li>Flavors of decision variables.</li>
<li>Timing of when decisions are made and implemented.</li>
<li>Different words for "decision"</li>
</ol>
<h3>Flavors of decision variables</h3>
<ol style="list-style-type: lower-alpha;">
<li><strong>Binary</strong> - We choose to hold an asset or sell it; we can make a purchase now or wait; we have to decide which of two webpage designs to use (known as A/B testing). </li>
<li><strong>Discrete</strong> - We have a set of three or more choices.  We may be choosing among 10 or 20 suppliers, 5,000 molecular compounds, or 1 million combinations of discretized parameters.</li>
<li><strong>Continuous scalar</strong> - This might describe a price, dosage, diameter or temperature.</li>
<li><strong>Vectors</strong>, where the elements may be continuous, binary or discrete.</li>
<li><strong>Categorical</strong>, where a choice is described by a vector of attributes [latex]a_1, \ldots, a_K[/latex].</li>
</ol>
<h3>Timing</h3>
<ol style="list-style-type: lower-alpha;">
<li>Whether a decision is made now (at time [latex]t[/latex]) or planned for some time in the future.</li>
<li>When it is implemented. We may order an aircraft to be delivered in 2 years, or we place an order from a distant supplier where it takes four months to arrive.  </li>
<li>Whether it is made just once (purchasing a company, designing a building), or repeated over time (ordering inventory, scheduling machines).</li>
<li>Whether a decision is made at specified points in time, or triggered by exogenous events.</li>
</ol>
<h3>Different words for "decision"</h3>
<p>Given that decisions are a universal human activity, it should not be surprising that there are different terms with roughly the same meaning.  This is important when working with people to identify what decisions are being made.  The list below hints at the richness of this vocabulary (these terms are not equivalent - they can refer to any of the definitions above): </p>
<ul>
<li>Action (widely used in Markov decision processes and reinforcement learning)</li>
<li>Call, as in "make the call" (management, sports)</li>
<li><span style="font-size: revert;">Choice (popular in decision analysis)</span></li>
<li>Control (engineering)</li>
<li>Design (layouts, product features)</li>
<li>Election (making a choice of political candidate)</li>
<li>Intervention (medical)</li>
<li>Move (games, business strategy)</li>
<li>Option (financial options, what options do we have, menu options)</li>
<li>Order (military,</li>
<li>Pick (selecting an item)</li>
<li>Preference</li>
<li>Response (choice of message)</li>
<li>Selection</li>
<li>Task/job</li>
<li>Trade (finance)</li>
<li>Treatment (medical, decoration)</li>
<li>Vote (expressing a choice of candidates)</li>
</ul>
<h2><strong>History of defining decisions</strong></h2>
<p>I was surprised to learn that there are very few efforts to define "decision." The vast mathematical literature simply introduces notation such as [latex]x[/latex] (math programming), action [latex]a[/latex] (computer science), control [latex]u[/latex] (engineering), or any other letter suitable for an application. However, you cannot assign a variable until you have already identified the type of decision in English.</p>
<p>There is also a substantial literature that focuses on how people make decisions, where the set of decisions is typically a simple set of discrete alternatives, but where the performance of each alternative is uncertain.  </p>
<p><img class="aligncenter size-full wp-image-9606" src="https://castle.princeton.edu/wp-content/uploads/2026/04/Eilon-What-is-a-decision-Top-Smaller-1.jpg" alt="" width="656" height="409" /></p>
<p><a href="https://tinyurl.com/EilonWhatIsADecision/">A 1969 paper in the prestigious journal <em>Management Science</em> by Samuel Eilon was titled "What Is a Decision" which opens with the line</a>:  </p>
<p>“An examination of the literature reveals the somewhat perplexing fact that most books on management and decision theory do not contain a specific definition of what is meant by a <em>decision</em>. ”</p>
<p>The first page contains the only discussion of “what is a decision” and, rather than offering his own definition, simply summarizes the thoughts of others.  He seems to highlight the opinion of Harald Ofstad (1961) who states:</p>
<p>“… to make a decision means to make a judgment regarding what one <em>ought</em> to do in a certain situation after having deliberated on some alternative courses of action.”</p>
<p>He closes the section with what appears to be his own characterization of a decision:</p>
<p>“The essential ingredients in this definition are that the decision-maker has <em>several alternatives</em> and that his choice involves a <em>comparison</em> between these alternatives and the *evaluation of their outcomes.*</p>
<p>The remainder of the paper follows the familiar style of talking about how to evaluate decisions, and the process of making decisions.  There is no recognition of planning (making decisions in the future) which is contingent on uncertain events.</p>
<p>The only community that seems to consistently offer a formal definition is decision analysis, and all of these definitions seem to trace their roots to Ron Howard, who defined decisions in a 1966 paper as "An irrevocable allocation of resources." He updated this in his 2015 book, <span style="font-size: revert;">"Foundations of Decision Analysis" where he poses the definition:</span></p>
<p><em>A decision is a choice between two or more alternatives that involves an irrevocable allocation of resources.</em></p>
<p>Note that in this version, he includes the requirement that there be a "choice between two or more alternatives" which was missing from his first version, but consistent with Ofstad's characterization.</p>
<p><img class="aligncenter size-full wp-image-9563" src="https://castle.princeton.edu/wp-content/uploads/2026/03/Howard-What-is-a-decision.jpg" alt="" width="1024" height="401" /></p>
<p>The paragraph below the definition explains his reasoning, in particular his use of "irrevocable."  What he is trying to do is to exclude someone "thinking about" a choice, but this has the effect of excluding any form of planning.</p>
<p>In <em>Handbook of Decision Analysis (2nd edition), </em>Parnell et al. adopted Howard's definition where they state: </p>
<p><img class="alignright size-full wp-image-9086" src="https://castle.princeton.edu/wp-content/uploads/2025/10/ParnellDecisionDefined.jpg" alt="" width="1090" height="376" /></p>
<p>David Skinner, in his elegant book <em>Introduction to Decision Analysis (3rd edition)</em>, uses the definition: </p>
<p><img class="alignright size-full wp-image-9083" src="https://castle.princeton.edu/wp-content/uploads/2025/10/SkinnerDecisiondefined-1.jpg" alt="" width="1183" height="393" /></p>
<p>Note that this version excludes both "irrevocable" or any mention of having a choice among a set of alternatives.  So, after Google Maps decides on a path (where multiple paths are considered), Skinner's definition would apply to the driver who is simply following the recommended path.</p>
<p>Howard's definition seems to exclude a linear program, which is choosing an optimal set of decisions that may never be implemented.  Similarly, it would exclude the path produced by Google Maps, which may change as traffic conditions change.  It also ignores the decision of how to make a decision.  An example is choosing the penalty for tolls when solving a shortest path problem.  </p>
<p>Yet another definition comes from Joannes Vermorel, the CEO of Lokad, a provider of software for supply chain management, who wrote a very thoughtful book "Introduction to Supply Chain" which contains the definition (in Chapter 8 - Decisions):</p>
<p><img class="aligncenter size-full wp-image-9585" src="https://castle.princeton.edu/wp-content/uploads/2026/04/Definition-Intro-to-supply-chain.jpg" alt="" width="1192" height="379" /></p>
<p>We can go back to Aristotle (~350 BCE), for whom a <em>decision</em> <em>is a <strong>deliberate choice of action made through reasoning, aimed at achieving a good or virtuous end. </strong></em>Typical of the early philosophers up through modern decision scientists in psychology (such as Kahneman - see below), this description focuses on how to make a decision and how to evaluate it, but avoids the question of identifying what decisions are available to be made.</p>
<p>When reviewing books for definitions of decisions, I would often find discussions of decisions to be intermingled with how decisions are made, and the impact of a decision.  My definition keeps these issues separate.</p>
<p>A decision is, first and foremost, a piece of <em>information</em>. A person (or computer) makes a decision, and only then do we address the problem of implementing the decision, if necessary.  Decisions are often made as part of a planning process, which means they may not be directly implemented at all. </p>
<p>What is most important is that we think broadly so that we are aware of any way we can control or modify a process to achieve an objective.  We address this in the next section where we identify different types of decisions.</p>
<h2>What decisions do we need to make?</h2>
<p>When we are trying to improve some performance metric ("metric-focused" problems), we may face the challenge of simply identifying what decisions are available to be made.  This step of the process is completely missing when you start with a math model with some [latex]x[/latex].</p>
<p>Below I illustrate a time when I was invited to tour an Amazon fulfillment facility.  As I walked around the facility, I found myself looking for anything that could be changed, which meant that I was looking at the result of a decision.  This exercise can be applied to any setting.  Think of doing this with your little red "My Decision Book" where you can write down the "decisions" you observe.</p>
<p>I like to emphasize that improving any process starts in English.</p>
<p><img class="alignright size-full wp-image-9081" src="https://castle.princeton.edu/wp-content/uploads/2025/10/ProblemsToDecisions.jpg" alt="" width="1047" height="454" /></p>
<h2>How do we make decisions?</h2>
<p>There are over 50 words that mean, in the right context, a method for making decisions (<a href="https://tinyurl.com/decisionsandpolicies/">see here for my list</a>).  I use the term "policy" which I define using:</p>
<p><em>Policies are methods for making decisions, ... any method.  </em></p>
<p>In 2014 at an Informs TutORial session, I presented four classes of policies that cover <em>any</em> method for making decisions:</p>
<ol>
<li><strong>Policy function approximations (PFAs)</strong> - These are analytical functions that map information in the state variable (which contains everything we know or believe) to a decision.  This is the only class that does not involve an embedded optimization problem.</li>
<li><strong>Cost function approximations (CFAs)</strong> - These are parameterized approximations (usually deterministic optimization models) of a decision problem that are tuned to work well over time.  CFAs may be modified versions of the value of a set of discrete choices, or large-scale linear, integer or nonlinear programs.  CFAs are widely used in industry, but in an ad-hoc way.</li>
<li><strong>Value function approximations (VFAs)</strong> - These are the policies based on Bellman's equation.</li>
<li><strong>Direct lookahead approximations (DLAs)</strong> - These are policies that optimize over some planning horizon to determine a decision that can be made now. It often helps to divide DLAs into two categories: a) those that use a deterministic model of the future, and b) those that use a stochastic model of the future.  </li>
</ol>
<p>I claim these four classes are universal - any method for making a decision falls in one of these four classes or a hybrid.  In addition, there are a number of hybrids that can be created (and which are used in practice):</p>
<ul>
<li>CFAs with PFAs - Choosing least-cost supplier, but with rules to exclude high-risk companies.</li>
<li>Lookahead (DLA) with VFA - Optimize seasonal production plan, with functions capturing value of ending inventories</li>
<li>Parameterized deterministic direct lookaheads (DLA/CFA) - Plan seasonal production using [latex]\theta[/latex]-percentile (say, 80th percentile) demand forecasts.</li>
<li>VFA policy using PFA - Distribution planning using VFAs to value inventory at each warehouse, but using rules (PFAs) to force deliveries to specific locations.</li>
<li>VFA with CFA - Start with a VFA-based policy with a linear model, and then tune the parameters of the linear VFA to get the best results using a simulator.</li>
</ul>
<p>These four classes form the foundation of my 2022 book <em><a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization</a> </em>(a graduate-level text) and <em><a href="https://tinyurl.com/sdamodeling/">Sequential Decision Analytics and Modeling</a> </em>(a teach-by-example book written for undergraduates). </p>
<p>The academic literature focuses primarily on VFAs (policies based on Bellman's equation), and stochastic DLAs, which come in a variety of flavors (decision trees, stochastic programming, and robust optimization).</p>
<p>I like to list the policies based on what is most useful:</p>
<p><strong>Category 1</strong>: Class 1) PFAs, class 2) CFAs, and class 4a) deterministic DLAs. My guess is that these three cover about 97 percent of all decisions.  We all make decisions, and I claim we use all three, and know how to adapt them to different situations. We are simply born with these tools.</p>
<p><strong>Category 2</strong>: Class 4b) Stochastic DLAs for discrete actions, which typically produce decision trees.  These are widely used in business settings for making decisions about whether to move forward with complex activities, but can be applied to a wide range of simple decisions with uncertain outcomes.</p>
<p><strong>Category 3</strong>: Class 3) VFAs - This is where I put all the work based on Bellman's equation, including approximate dynamic programming and reinforcement learning (circa 1996 from Sutton and Barto's first edition).  I like to describe VFA-based policies as "A powerful strategy that works for a very small number of problems" but the attention it receives in the research literature far exceeds its usefulness in practice.</p>
<p><strong>Category 4</strong>: Class 4b) Stochastic DLAs, but this time I am referring to stochastic programming for vector-valued decisions. Despite thousands of papers on this topic since it was introduced in 1955, real-world applications are rare.  </p>
<p>There are entire communities that focus on a specific class of policies, as occurs in decision analysis with decision trees, the stochastic programming community that looks to include uncertainty in math programming models, and domain-specific communities such as inventory planning that automatically assume orders are made with simple order-up-to policies.  People often make decisions without realizing it because they are following some policy through force of habit.  </p>
<h2>The psychology of decision making<img class="alignright size-medium wp-image-8962" src="https://castle.princeton.edu/wp-content/uploads/2025/10/KahnemanThinkingFastandSlow-212x300.jpg" alt="" width="212" height="300" /></h2>
<ul>
<li>There is an extensive literature on how people make decisions.  Easily the leading voices in this literature are Daniel Kahneman, former Princeton professor and Nobel prize-winning author, with over 500,000 citations, and his frequent coauthor, Amos Tversky.  Kahneman's work focused on <em>how</em> people make decisions, especially in the handling of uncertainty.  His highly cited book book, <em>Thinking Fast and Slow</em> explored how different regions of the brain would handle the tasks associated with decision-making.</li>
</ul>
<p>So it was to my considerable surprise that nowhere in his extensive writings does it appear that he ever actually defined a decision.  Implicit in his discussions is the assumption that decisions are discrete alternatives, where the goal would be to choose what is "best" from a set of discrete alternatives.  For example, none of his work would help with problems such as choosing the best assignment of 100 resources to 100 tasks, optimizing thousands (or billions) of parameters in a statistical model, or choosing the best <em>policy</em> for making decisions.</p>
<p>I also offer another hypothesis:</p>
<p><em>Humans, without any training, use all four classes of policies, albeit in an ad hoc way.  Our brains have learned to naturally adapt our decision-making styles to different situations.</em></p>
<p>A simple example is playing chess, where we start each game using "if in this state, we take this action" style of thinking (a form of PFA called a lookup table), to the use of decision trees where we plan into the future, a form of DLA (direct lookahead approximation).  We might even use a DLA/VFA hybrid where we plan for a few moves into the future, and then stop using a rough approximation of the value of the position we are in (e.g. did we lose our queen, or is our rook in a strong position).  </p>
<h2>State variables: The information we use to make decisions.</h2>
<p>Almost inseparable from how we make decisions is the information we have available to make the decision.  In the communities that work on sequential decision problems (dynamic programming, Markov decision processes, optimal control), this information is contained in the <em>state variable</em>.  Bizarrely, I came to realize that even the top theoreticians (and I would say <em>especially</em> the top theoreticians) did not know how to define a state variable!</p>
<p>I found two books on deterministic optimal control which offered a perfectly acceptable definition:</p>
<p><em>All the information you need at time t to model the system from time t onward.</em></p>
<p>Nothing wrong with this, except that it doesn't specify <em>what</em> information is needed.</p>
<p>I offer a fairly extensive discussion of what I might call "the state of state variables" <a href="https://tinyurl.com/onstatevariables/">which can be accessed here</a>. This webpage includes my own definition of a state variable, which has been evolving over time.  The most refined version is contained in my 2022 volume, <a href="https://tinyurl.com/RLandSO/"><em>Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions</em></a> (see section 9.4).  In it, I offer two definitions depending on whether you are given the policy for making decisions, or whether we are working from a fundamental description.  The most interesting case in my view is where we specify the policy, for which I offer the definition: </p>
<p><em>The state variable is a function of history that, given a policy, is necessary and sufficient to compute:</em></p>
<ol style="list-style-type: lower-alpha;">
<li><em>The performance metrics.</em></li>
<li><em>The policy (the function used to make decisions).</em></li>
<li><em>Any information needed to compute (a) and (b) in the future, which may include the dependence (if any) of the exogenous information on the current state and/or the decision that has just been made.</em></li>
</ol>
<p>It is (b) that requires that we specify our policy.  If we want to do this without specifying the policy, we would replace (b) with the constraints (or whatever is needed to specify the set of decisions).  However, if we have a VFA or DLA type policy we are typically modeling the future using a forecast, which would have to be contained in the state variable.   </p>
<p>Understanding policies helps us understand what information we need to make our decisions, which then guides the collection of what can be large quantities of data.  Often, there is information we need but do not know (such as a demand forecast, or how a patient will respond to treatment) that we need to estimate using statistical models.</p>
<p>Compiling the information in state variables is the core of ontology and epistemology, which dates back to the work of the ancient philosophers, and is an active area of application for modern large language models.  Ontology can be thought of as "what we know" while epistemology addresses "how we know it" which helps us address how <em>well</em> we know something.  Decisions invariably modify processes moving forward in time, usually in the presence of dynamic information processes which are unknown at the time a decision is made.  </p>
<h2>What is the value of information?</h2>
<p>Arguably, one of the most subtle questions that arises in controllable systems is capturing the value of information.  This is a common question (or at least it should be) because there are so many settings where we have to make decisions without knowing everything we need perfectly.  Some examples: </p>
<ul>
<li>A physician can prescribe a treatment plan now, or run tests (blood tests, CT scans) to learn more about the patient and then design a treatment plan.</li>
<li>A manufacturer can plan operations given the uncertainty of when inbound parts might arrive from Asia, or invest in a visibility platform that can provide more precise estimates of arrival times.</li>
<li>A hotel revenue manager makes a best guess of total bookings for a particular date in the future, or he can invest in the expertise of a consultant who pulls together data on special events and the booking rates of other hotels to provide more accurate estimates.</li>
<li>An energy trading firm places bets on highly volatile electricity prices.  They can reach out to the local utilities to learn the production plans for tomorrow so the trading firm can better estimate whether capacity will be generous (producing lower prices) or tight (producing higher prices).</li>
</ul>
<p>There is a debate in the inventory planning community on the value of probabilistic forecasts of demand versus point forecasts. What is the value of using a probabilistic forecast? </p>
<p>The value of better estimates of unknown quantities depends on the policy used to make the decisions in each of these settings. All policies can (and should) be tuned to work as well as they can given whatever information they have access to. However,  tuning, which can be done in a simulator or the field, is hard.  For example, inventory planning using point forecasts can be improved through appropriately tuned safety stocks, but tuning does not completely replace the value of probabilistic forecasts.</p>
<p>The value of the new information requires simulating the policy without the information and then simulating it with the information.  </p>
<p>Value-of-information studies are arguably the most subtle from a modeling perspective. They require:</p>
<ul>
<li>Understanding belief state variables and the uncertainty they capture.</li>
<li>Knowing how to model the dynamics of the real process. </li>
<li>Choosing appropriate policies to handle uncertainty.</li>
<li>Understanding how to tune policies under appropriate conditions.</li>
<li>Capturing changes in uncertainties in the performance metrics (including risk) due to better sensors and estimation methods.</li>
<li>Running the simulations to evaluate the value of the new sources of information.  </li>
<li>Tuning policies always requires simulating them over time in the presence of whatever dynamic information processes are involved.  There are two ways of performing these simulations: </li>
</ul>
<ul>
<li style="list-style-type: none;">
<ul style="list-style-type: circle;">
<li>In a computer-based simulator - Here the challenge is to create samples of the exogenous information processes (prices, treatment outcomes, demands).  We can draw samples from history or generate them from a mathematical model.  Simulators can be quite sophisticated and may require substantial efforts to develop and calibrate.</li>
<li>In the real world - This involves implementing a policy in the field and observing actual performance.  This avoids the need to develop models, but it is quite slow (it takes a day to simulate a day), and incurs the risk that you are implementing poor decisions in the field.  Also, tuning a decision-making policy in the field is difficult, but may be unavoidable.  This is a topic that desperately needs more research. The "great thinkers" in the history of decision-making.</li>
</ul>
</li>
</ul>
<h2>The "great thinkers" in the history of decision-making</h2>
<p>I have been compiling a list of "great thinkers" in the area of decision-making.  This is my latest:</p>
<ol>
<li>Aristotle (circa 350 BCE) – Is generally considered the first philosopher to systematically analyze the process of making decisions through concepts like deliberation and choice (following on Socrates and Plato).</li>
<li>William Hamilton (1800s) – Who, with Carl Jacobi, invented the Hamilton-Jacobi equations for solving a class of deterministic dynamic control problems.</li>
<li>John von Neumann (1940s) – With Oskar Morganstern and building on the work of Bernoulli (1700s) pioneered the use of expected utility for evaluating uncertain payoffs.</li>
<li>Herbert Simon (1950s) – Contributed the theory of bounded rationality and satisficing, which arises when making decisions in constrained environments.</li>
<li>George Dantzig (1950s) – Invented the simplex algorithm that launched the field of high-dimensional decision problems, starting with linear programming.</li>
<li>Richard Bellman (1950s) – Father of dynamic programming that laid the foundation for solving sequential decision problems under uncertainty.</li>
<li>Howard Raiffa (1960s) – Who, with Ron Howard, introduced and developed the field of decision analysis.  </li>
<li>Daniel Kahneman (1970s) – Winner of the Nobel prize in economics, Kahneman was renowned for his work, often with his perennial coauthor Amos Tversky, on human judgment and decision-making under uncertainty.</li>
</ol>
<p><img class="aligncenter size-full wp-image-9129" src="https://castle.princeton.edu/wp-content/uploads/2025/10/AristotletoKahneman.jpg" alt="" width="1058" height="810" /></p>
<p>What is surprising is my realization that none of these people ever <em>defined</em> a decision, although a notable exception is the definition by Ron Howard (described at the top of this page) who played a central role (along with Howard Raiffa) in the development of decision analysis.  What I did was to look at the <em>types</em> of decisions each considered in their work - it is very revealing in terms of what they seem to think of a decision:</p>
<ul>
<li><strong>A set of discrete choices</strong> - This is the most common type of decision that people encounter in their day-to-day lives, as well as most professional decisions.  The challenge arises when dealing with uncertainty - quantifying the probability of different outcomes, and then choosing across uncertain choices:
<ul style="list-style-type: circle;">
<li>Aristotle - Focused on the process of deliberation, highlighting the process that a decision requires identifying and comparing choices.</li>
<li>John von Neumann - Helped to formalize the concept of utility versus expected payoffs.</li>
<li>Herbert Simon - Introduced the dimension that people and organizations often do not have the time to consider every choice.</li>
<li>Howard Raiffa - Promoted the use of decision trees, which start with making a single decision followed by uncertain events and, often, more decisions.</li>
<li>Daniel Kahneman - Focused on characterizing how people make decisions.</li>
</ul>
</li>
<li><strong>Continuous control problems - </strong>These problems arise in the control of physical systems such as vehicles or aircraft, which are controlled in continuous time, using continuous controls such as imposing force in one or more dimensions, administering drugs, or heating/cooling a building.
<ul style="list-style-type: circle;">
<li>William Hamilton - With Carl Jacobi, introduced the Hamilton-Jacobi equations that exploit the use of a function (denoted [latex]J_t(x_t)[/latex]) for the value of being in state [latex]x[/latex].  The system was governed by a continuous control vector [latex]u_t(x_t)[/latex].  In 1960 Rudolf Kalman exploited this work to derive an explicit solution to the linear quadratic control problem in 1960, a special, but important problem arising in engineering control problems. </li>
</ul>
</li>
<li><strong>Sequential discrete decision problems<em> - </em></strong>This is where discrete decisions are made sequentially over time.
<ul style="list-style-type: circle;">
<li>Richard Bellman - Bellman's work in the 1950s launched decades of research into multiperiod stochastic, dynamic problems where decisions (actions) are discrete.  His work also assumed that the state variable was also discrete, and the state space was not too large.  This restricts the theory to problems with very low-dimensional (and discrete) state variables; the growth of the (discrete) state space with the number of dimensions is known as the <em>curse of dimensionality</em>.</li>
<li>Howard Raiffa - While the most common use of decision trees is for a single decision (make decision, see random outcome, stop), decision trees can handle fully sequential problems.  Decision trees do not assume discrete states, but the price is that they grow exponentially with the number of time periods, which limits their horizons.</li>
</ul>
</li>
<li><strong>Vector-valued static decision problems <em>- </em></strong>These problems grew out of the logistical challenges of World War II, building on prior work done in the 1930s in the Soviet Union.
<ul style="list-style-type: circle;">
<li>George Dantzig - Dantzig realized that many logistical problems, such as assigning resources to tasks, could be formulated as linear programs where the goal is to minimize the total cost while observing constraints such as each resource can be assigned to only one task, and at most one resource can be assigned to any task. Dantzig developed the simplex algorithm that would produce optimal solutions for a single (static) instance of an assignment problem.  The simplex algorithm could be applied to general linear programs, which arise in many settings.  This work launched the field of mathematical programming, which was quickly extended to convex nonlinear problems, the much harder class of integer programming problems, and an extensive array of other high-dimensional optimization problems.  Dantzig also introduced stochastic programming which is a restricted form of decision tree designed to handle vector-valued decisions.</li>
</ul>
</li>
</ul>
<!-- /wp:tadv/classic-paragraph -->

<!-- wp:tadv/classic-paragraph /-->

<!-- wp:tadv/classic-paragraph /-->

<!-- wp:tadv/classic-paragraph /-->
{% endraw %}
