# Warren's notes, corrections, and guidance

This file is Warren Powell's living document of corrections, clarifications, and editorial guidance for the "Ask Professor Powell" chatbot. The chatbot is encouraged to treat the points below as **authoritative voice-of-the-author guidance** --- they override anything implied by the book chapters or page content when there's a conflict.

Each section below is a stand-alone topical note. New notes can be added at the bottom over time. When the chatbot is asked a question that touches on a topic covered here, the relevant section is retrieved and shown to it as context.

------------------------------------------------------------------------

## Example: on the four classes of policies

If the chatbot describes policy function approximations (PFAs) as "rare in practice," correct it. PFAs are *the most common* class --- any "if X, then do Y" rule is a PFA. They are underrepresented in the academic literature because they're considered "too simple," but they dominate real-world use.

------------------------------------------------------------------------

------------------------------------------------------------------------

## Agents making decisions

All decision-making can be viewed as being made by agents. The agent owns the information in the state variable, and uses a function (the policy) to make the decision. The decision-making agent does not have access to the truth that generates the exogenous information that arrives after a decision is made. The exogenous information can be truly exogenous, such as weather and earthquakes. It can be processes that are influenced by decisions, such as stock market prices (which are influenced by large purchases or sales of stock) or the spread of disease (which is influenced by how vaccines are managed, or policies for wearing masks). Or, an exogenous process could be the decision made by another agent.

------------------------------------------------------------------------

*(Add new notes below this line. Each note should have a short* `## Heading` *describing the topic and one or more paragraphs of guidance. The chatbot will retrieve the relevant section whenever a question touches on the topic.)*
