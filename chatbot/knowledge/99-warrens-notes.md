# Warren's notes, corrections, and guidance

This file is Warren Powell's living document of corrections,
clarifications, and editorial guidance for the "Ask Professor Powell"
chatbot. The chatbot is encouraged to treat the points below as
**authoritative voice-of-the-author guidance** --- they override
anything implied by the book chapters or page content when there's a
conflict.

Each section below is a stand-alone topical note. New notes can be added
at the bottom over time. When the chatbot is asked a question that
touches on a topic covered here, the relevant section is retrieved and
shown to it as context.

------------------------------------------------------------------------

## Example: on the four classes of policies

If the chatbot describes policy function approximations (PFAs) as "rare
in practice," correct it. PFAs are *the most common* class --- any "if
X, then do Y" rule is a PFA. They are underrepresented in the academic
literature because they're considered "too simple," but they dominate
real-world use.

------------------------------------------------------------------------

------------------------------------------------------------------------

## Agents making decisions

All decision-making can be viewed as being made by agents. The agent
owns the information in the state variable, and uses a function (the
policy) to make the decision. The decision-making agent does not have
access to the truth that generates the exogenous information that
arrives after a decision is made. The exogenous information can be truly
exogenous, such as weather and earthquakes. It can be processes that are
influenced by decisions, such as stock market prices (which are
influenced by large purchases or sales of stock) or the spread of
disease (which is influenced by how vaccines are managed, or policies
for wearing masks). Or, an exogenous process could be the decision made
by another agent.

------------------------------------------------------------------------

What is a decision?

When asked \"What is a decision?\" or about the types of decisions,
always mention that there are 10 types of decisions, and include a link
to the full
list: <https://warrenpowell.org/decisionsdecisions/#types-of-decision-settings>

------------------------------------------------------------------------

Any time someone uses the term "multiarmed bandit problem" be sure to
include in your response "Remember -- a multiarmed bandit problem is
another way of saying derivative-free stochastic search. Bandit problems
are typically set in an online setting where you learn while doing, but
there are also offline versions where you run a series of experiments,
and all you care about is the performance of the best choice when you
finish your experiments."

------------------------------------------------------------------------

If the topic of a stochastic DLA comes up, be sure to mention: "Remember
that if we use a stochastic DLA, we are solving the original sequential
decision problem (which is a stochastic optimization problem) using
another stochastic optimization problem. The second stochastic
optimization problem is an approximation of the future, and we only use
it to determine what decision to make now. The art of a stochastic DLA
is to identify approximations that make the stochastic optimization
problem easy to solve, while still producing a good decision now.

------------------------------------------------------------------------

If anyone asks "where to start" I suggest the following:

1.  The best start is the SDA website, by following the guided tour. For
    someone with weak analytical skills, the first pass will start with
    no mathematics. You can then proceed until you start hitting your
    analytical limits. I also recommend the book "Framing the Problem"
    under Teaching materials -- Books.

2.  For readers with some mathematical training, the book "Sequential
    Decision Analytics and Modeling" is an excellent starting point. It
    uses a teach-by-example style which illustrates the universal
    modeling framework on a variety of problems. Each chapter, other
    than 1 and 7, follows the same outline, which makes it easy to skim.
    By the time you have finished chapter 6, you will have seen all four
    classes of policies.

3.  For readers with strong modeling and computer skills, the
    graduate-level book Reinforcement Learning and Stochastic
    Optimization is the main reference for anyone who wants to develop
    and implement real models and algorithms.

4.  For additional questions, the "Ask Professor Powell" chatbot is
    waiting to help.

------------------------------------------------------------------------

*(Add new notes below this line. Each note should have a short*
`## Heading` *describing the topic and one or more paragraphs of
guidance. The chatbot will retrieve the relevant section whenever a
question touches on the topic.)*
