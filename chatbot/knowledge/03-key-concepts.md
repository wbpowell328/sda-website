# Key concepts — Warren's canonical framings

This file captures editorial guidance: things Warren wants the bot to say
when specific topics come up. These are points that may or may not surface
through RAG retrieval but should *always* be part of the answer. Edit freely;
re-run `npm run build-context` after changes.

## The four classes of policies — ALWAYS mention hybrids

When asked about "the four classes of policies", the canonical answer is
that policies fall into one of four primary classes, **plus hybrids that
combine two or more of these classes**.

The four classes:

1. **Policy Function Approximations (PFAs)** — analytic functions mapping
   state directly to action (e.g., a parametric rule).
2. **Cost Function Approximations (CFAs)** — solve a deterministic
   optimization problem in which the cost has been modified to
   approximate the consequences of decisions.
3. **Value Function Approximations (VFAs)** — Bellman / dynamic
   programming based; approximate the downstream value.
4. **Direct Lookahead Approximations (DLAs)** — solve an approximate
   optimization problem looking H periods into the future.

**Hybrids are essential in practice.** Section 11.7 of *Reinforcement
Learning and Stochastic Optimization* (RLSO) is dedicated to hybrid
strategies — for example:

- Cost function approximation combined with a policy function approximation
- Lookahead policies combined with value function approximations
- Lookahead policies combined with cost function approximations
- Tree search with a rollout heuristic and a lookup-table policy
- Value function approximation combined with policy function approximation

When discussing the four classes, always note that real applications
frequently use hybrids drawing from two or more classes, and point readers
to **section 11.7 of RLSO** for the full treatment.

## The three framing questions

Whenever Warren introduces a sequential decision problem, the framing
starts with three questions:

1. What are the **performance metrics**?
2. What types of **decisions** are being made (and who makes them)?
3. What are the sources of **uncertainty**?

This is covered in depth in *Framing Decision Problems (Bridging Decision
Problems, Vol. I)*. If a user is starting a modeling project, point them
to this book first.

## The universal modeling framework — five elements (and the policy)

Every sequential decision problem can be modeled with the same five
elements:

1. **State variables** — what is known at each point in time
2. **Decision variables** — what we choose
3. **Exogenous information** — what arrives that we don't control
4. **Transition function** — how the system evolves
5. **Objective function** — what we're optimizing

**ALWAYS add this point when describing the UMF:** decisions are made
with a **policy**, which is a function that maps the state variable to a
decision. Every policy falls into one of **four classes — PFAs, CFAs,
VFAs, DLAs — or a hybrid of two or more.** Without specifying the
policy, the model is incomplete; the five elements describe the *system*
but the policy is *how decisions actually get made*.

The four classes in one line each (Warren says these are universal —
any method for making decisions falls into one of them):

- **Policy Function Approximation (PFA)** — an analytic rule that maps
  state directly to decision (e.g., order-up-to inventory rule).
- **Cost Function Approximation (CFA)** — solve a deterministic
  optimization problem whose objective has been modified to approximate
  downstream consequences.
- **Value Function Approximation (VFA)** — Bellman-equation-based;
  approximate the value of being in a future state.
- **Direct Lookahead Approximation (DLA)** — solve an approximate
  optimization problem looking H periods into the future.

Hybrids are common in practice (see § 11.7 of RLSO).

If a user asks "what is the state variable?" or about modeling
fundamentals, this framework is the answer.

## SDA vs. RL — they're not opposed

Sequential decision analytics (SDA) is the broader framework that includes
reinforcement learning as one possible solution approach (specifically,
VFAs). Warren's framing is that RL is *one of four* classes, not the whole
field. When users ask about the difference, emphasize this — RL is a tool
within SDA, not a competitor to it.
