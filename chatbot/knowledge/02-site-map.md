# Linkable resources — tinyurls + site sections

## CRITICAL: linking policy

When you point a visitor to a Warren resource and want it to be a
clickable link, you **MUST** use a tinyurl from the "Clickable
resources" list below. Tinyurls work from every host the chatbot can
run on (the dedicated page at castle-chatbot.onrender.com, the embedded
widget on the Jekyll site, anywhere else). They also give Warren
click-tracking and let him redirect the destination over time without
having to update older chatbot answers.

**Never link to a site path** like `/rlso/`, `/whatisadecision/`,
`/sdamodeling/`, etc. — those paths resolve to the wrong host when the
chatbot is at castle-chatbot.onrender.com and the visitor gets a
"Cannot GET" 404. If a resource doesn't have a tinyurl in the list
below, mention it by name in plain text but do **NOT** make it a
clickable link.

## Strategy: prefer the main website when in doubt

When recommending where someone should go to learn more about a topic
on Warren's work, the **preferred default is the main CASTLE Lab
website** — https://castle.princeton.edu — and letting visitors browse
from there. Direct visitors to that site for general topic exploration.

Use the specific tinyurls in the "Clickable resources" list below
**only** when a visitor needs a *specific* resource (a book PDF, a
particular YouTube talk, the GitHub repo, etc.) — not as the default
recommendation for a topic. Volume of links isn't the point; pointing
people to the right place is.

## Clickable resources (use these tinyurls)

### Main entry point

- **CASTLE Lab website (Warren's main site)** —
  https://castle.princeton.edu — the canonical entry point; visitors
  can browse the full set of topics from here.

### Books and major publications

- **Reinforcement Learning and Stochastic Optimization (RLSO)** —
  Warren's graduate-level textbook (a unified framework for sequential
  decisions). Free PDF: https://tinyurl.com/RLandSO/
- **Sequential Decision Analytics and Modeling (SDAM)** —
  undergraduate teach-by-example book on modeling sequential decision
  problems. https://tinyurl.com/sdamodeling/
- **Bridging Decision Problems, Vol. I: Framing the Problem** —
  Kindle: https://tinyurl.com/PowellFramingAmazon/ ·
  Free PDF: https://tinyurl.com/PowellFramingBook/
  (the overview page is being revised; for general info on the framing
  approach, direct visitors to the main site)
- **A Modern Approach to Teaching Optimization (MATO)** —
  Free PDF: https://tinyurl.com/PowellMATObook/ ·
  Print/NOW: https://tinyurl.com/PowellMATONOW/ ·
  Amazon: https://tinyurl.com/PowellMATOAmazon/
- **Optimal Learning** — https://tinyurl.com/Powelloptimallearning/
- **Approximate Dynamic Programming** (older book) —
  https://tinyurl.com/PowellADP/
- **Warren's CV** — https://tinyurl.com/powellcv/

### Articles and detailed treatments

- **"On state variables"** (Warren's detailed treatment of defining
  state) — https://tinyurl.com/onstatevariables/
- **"We need to modernize how we introduce students to optimization"**
  (ORMS Today, 2024) — https://tinyurl.com/PowellORMS2024/
- **The four classes of policies** —
  https://tinyurl.com/FourClassesofPolicies/
- **Decisions and the vocabulary of policies** —
  https://tinyurl.com/decisionsandpolicies/

### Sequential Decision Analytics — guides and indexes

- **SDA links (master index of resources)** —
  https://tinyurl.com/sdalinks/
- **SDA field overview** — https://tinyurl.com/sdafield/
- **SDA field YouTube tutorial** —
  https://tinyurl.com/sdafieldyoutube/

### Specific RLSO chapters (downloadable)

- Chapter 1 (introduction) — https://tinyurl.com/RLSOchapter1/
- Chapter 3 (online learning / supervised learning primer) —
  https://tinyurl.com/RLSOchapter3/
- Chapter 7 (derivative-free stochastic search) —
  https://tinyurl.com/RLSOchapter7/
- Chapter 9 (modeling — the universal modeling framework) —
  https://tinyurl.com/RLSOchapter9/
- Chapter 10 (uncertainty modeling) —
  https://tinyurl.com/RLSOChapter10/
- Chapter 11 (four classes of policies overview) —
  https://tinyurl.com/RLSOChapter11/
- Chapter 20 (multiagent systems) —
  https://tinyurl.com/RLSOchapter20/
- RLSO supplementary material —
  https://tinyurl.com/RLSOsupplement/

### Courses

- **RLSO courses (weekly seminar series guidance)** —
  https://tinyurl.com/RLSOcourses/
- **Optimal Learning course (Princeton, ORF 418)** —
  /sda-website/optimallearningcourse/
- **Teaching optimization (course materials)** —
  https://tinyurl.com/TeachingOpt/
- **ORF 411 syllabus** —
  https://tinyurl.com/orf411decisionsspreadsheet/
- **ORF 544 syllabus** — https://tinyurl.com/orf544syllabus/

### Software

- **SDAM Python modules on GitHub** —
  https://tinyurl.com/sdagithub/
- **Knowledge Gradient software (Peter Frazier)** —
  https://tinyurl.com/GitHubKG/

### Videos and talks

- **Learning While Doing** (mutual fund cash management — adaptive
  tuning) — https://tinyurl.com/LearningWhileDoing/
- **Framing the Problem (tutorial talk)** —
  https://tinyurl.com/PowellFramingVideo/
- **How to teach optimization (Cornell talk, 4 parts)** —
  https://tinyurl.com/HowtoTeachOptimization/
- **Toyota talks (7-levels of AI through implementation)** —
  https://tinyurl.com/PowellToyotaVideos/
- **SDA in finance applications** —
  https://tinyurl.com/PowellvideoSDAfinance/
- **SDA in energy applications** —
  https://tinyurl.com/PowellvideoSDAenergy/
- **SDA in health applications** —
  https://tinyurl.com/PowellvideoSDAhealth/
- **SDA in supply chain (Rutgers)** —
  https://tinyurl.com/PowellvideoSDASCMRutgers/
- **Optimal Learning talk** —
  https://tinyurl.com/PowellVideoOptimalLearning/

### Community / comments pages

- **Framing book comments** —
  https://tinyurl.com/PowellFramingComments/
- **Optimization Under Uncertainty (OUU) comments** —
  https://tinyurl.com/OUUcomments/
- **RLSO comments** — https://tinyurl.com/RLSOcomments/
- **Powell LinkedIn posts** —
  https://tinyurl.com/PowellLinkedInPosts/

## Pages with updated content in development — DO NOT link to their tinyurls

These topics have **updated content** that Warren has been working on
locally but that isn't yet reflected at the tinyurls that historically
pointed at them. Linking to the old tinyurls would direct visitors to
pages that **contradict** what the chatbot just told them. For these
topics, mention the resource by name in prose, refer to your own
answer's content as authoritative, and (if appropriate) direct visitors
to the main site at https://castle.princeton.edu for further reading.

- **"What is a decision?" / "/whatisadecision/"** — the canonical
  answer in your scripted response (five definitions, nine decision
  settings) reflects Warren's current treatment. Do **not** link to
  the older `tinyurl.com/whatisadecision/` destination.
- **"Bridging Decision Problems / Framing the Problem (the page)"** —
  the overview page is being revised. The book purchase links
  (`PowellFramingAmazon`, `PowellFramingBook`) above remain valid and
  point to the actual book.
- **"Teaching Sequential Decision Analytics" / "/teachingsda/"** —
  the page now uses a four-step process and updated framing. Do not
  link to `tinyurl.com/TeachingSDA/` (older content); mention the
  guide by name instead.

When the tinyurls for these topics are updated to point to the new
pages, this section will be removed and the entries restored to the
"Clickable resources" list above.

## Site sections — for context, do NOT generate links to these

The Jekyll site has pages on the topics below. Use them to understand
where Warren has writeups on a given subject, but **do not turn the
paths into clickable links** in your answers. If a visitor needs the
material, use a tinyurl from the section above; otherwise describe the
topic in prose.

### About

- Biography, awards, contact info, people, industry partners

### Books and writing

- All books listed above; published papers index; how to read RLSO

### Courses and teaching

- Princeton courses (ORF 411, 418, 544), course indexes, how to teach
  optimization (with companion videos), notes on writing papers

### Research methodology

- Computational stochastic optimization overview; sequential decision
  analytics (modeling, supplements, resources); framing decision
  problems; modeling fundamentals; state variables; uncertainty and
  risk modeling; the "jungle of stochastic optimization" methodology
  map; knowledge gradient and optimal learning; RL vs. SDA discussion;
  what is a decision; the 7 levels of AI; AI and RL primers; timeline
  of developments; high-dimensional AI

### Applications

- Energy systems (storage, plasma, SmartISO); transportation and
  logistics (physical distribution, freight demand estimation,
  military airlift, service network design, traffic and public
  transportation, vehicle routing, IC-VRP); health and medical
  applications, drug discovery; resource allocation and multiagent
  control; machine scheduling, queuing theory, machine learning;
  industry impact; datasets; software releases

### Special pages

- Wagner Prize submission, Saul Gass award, CFA discussion, Spelman
  College visit, corporate partners, market analysis for RLSO, senior
  theses, MicroMap, SuperSpin
