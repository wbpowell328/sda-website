---
layout: page
title: "Timeline of Developments"
permalink: /timeline-of-developments/
date: 2017-07-16 23:48:06
---

{% raw %}
<style>
/* Vertical-ribbon interactive timeline. Self-contained: styles only apply to .tl-wrap. */
.tl-intro {
  max-width: 720px;
  margin: 0 auto 2.5rem;
  text-align: center;
  color: #5a4a35;
}
.tl-wrap {
  position: relative;
  max-width: 980px;
  margin: 0 auto;
  padding: 1rem 0 3rem;
}
.tl-wrap::before {
  /* The central vertical ribbon */
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #c9a574 0%, #5a3e1f 8%, #5a3e1f 92%, #c9a574 100%);
  transform: translateX(-50%);
  border-radius: 2px;
}
.tl-decade {
  position: relative;
  text-align: center;
  margin: 2rem 0 1.5rem;
  z-index: 2;
}
.tl-decade span {
  display: inline-block;
  background: #5a3e1f;
  color: #f5ede0;
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 0.95rem;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(60, 40, 20, 0.25);
}
.tl-event {
  position: relative;
  width: 50%;
  padding: 0.4rem 2.5rem 0.4rem 0;
  box-sizing: border-box;
  margin: 0.6rem 0;
}
.tl-event.tl-right {
  margin-left: 50%;
  padding: 0.4rem 0 0.4rem 2.5rem;
}
.tl-year {
  position: absolute;
  top: 0.9rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #5a3e1f;
  color: #f5ede0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
  line-height: 1.1;
  border: 4px solid #faf4e3;
  box-shadow: 0 2px 6px rgba(60, 40, 20, 0.35);
  z-index: 2;
  font-family: Georgia, "Times New Roman", serif;
}
.tl-event.tl-left .tl-year {
  right: -32px;
}
.tl-event.tl-right .tl-year {
  left: -32px;
}
.tl-card {
  display: block;
  width: 100%;
  text-align: left;
  background: #fbf2dc;
  border: 2px solid #c9a574;
  border-radius: 8px;
  padding: 0.9rem 1.1rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  color: #2a1d10;
  box-shadow: 0 2px 6px rgba(60, 40, 20, 0.12);
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
}
.tl-card:hover {
  border-color: #5a3e1f;
  box-shadow: 0 4px 12px rgba(60, 40, 20, 0.22);
  background: #fcf6e6;
}
.tl-card:focus-visible {
  outline: 3px solid #c9a574;
  outline-offset: 2px;
}
.tl-headline {
  font-weight: 700;
  font-size: 1.05rem;
  color: #3d2817;
  line-height: 1.35;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}
.tl-toggle {
  flex: 0 0 auto;
  color: #8a6a3a;
  font-size: 0.85rem;
  font-weight: 400;
  transition: transform 0.2s;
  user-select: none;
}
.tl-card[aria-expanded="true"] .tl-toggle {
  transform: rotate(180deg);
}
.tl-detail {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, margin-top 0.35s ease;
  font-size: 0.95rem;
  line-height: 1.55;
  color: #3a2d1e;
}
.tl-card[aria-expanded="true"] .tl-detail {
  max-height: 600px;
  margin-top: 0.7rem;
}
.tl-detail a {
  color: #5a3e1f;
  font-weight: 600;
}
.tl-detail p {
  margin: 0.4rem 0;
}
/* Mobile / narrow screens — collapse to single column with ribbon on the left */
@media (max-width: 720px) {
  .tl-wrap::before {
    left: 32px;
    transform: none;
  }
  .tl-event,
  .tl-event.tl-right {
    width: 100%;
    margin-left: 0;
    padding: 0.4rem 0 0.4rem 80px;
  }
  .tl-event.tl-left .tl-year,
  .tl-event.tl-right .tl-year {
    left: 0;
    right: auto;
  }
  .tl-decade {
    text-align: left;
    padding-left: 80px;
  }
}
</style>

<div class="tl-intro">
A summary of major developments in CASTLE Labs over its history.
<br><em>Click any event for a full description.</em>
</div>

<div class="tl-wrap" id="tl-wrap">

  <div class="tl-decade"><span>1980s</span></div>

  <div class="tl-event tl-left">
    <div class="tl-year">1983</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">SuperSPIN — first interactive optimization model<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Developed the <a href="/sda-website/superspin/">first interactive optimization model ("SuperSPIN")</a> for network design for less-than-truckload motor carriers. It was adopted by almost the entire LTL industry, and helped to stabilize LTL trucking in the post-deregulation era. SuperSPIN is still in production 40 years later (marketed by Manhattan Associates).</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">1985<br>–87</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">MicroMAP — first in-memory real-time load matching<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Developed <a href="/sda-website/micromap/">MicroMAP</a>, the first in-memory, real-time load-matching system for truckload trucking which captured the uncertainty of the future. MicroMAP was the first commercially successful load matching system, which is still in use today (marketed by Manhattan Associates).</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">1987</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Edelman finalist — SuperSPIN at Yellow Freight<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Edelman finalist with SuperSPIN implemented at Yellow Freight System.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">1988</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Founded Princeton Transportation Consulting Group<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Founded Princeton Transportation Consulting Group. The initial management team was David Cape '87 and Ken Nickerson '84, who jointly wrote MicroMAP. PTCG marketed SuperSPIN and MicroMAP.</p>
      </div>
    </button>
  </div>

  <div class="tl-decade"><span>1990s</span></div>

  <div class="tl-event tl-left">
    <div class="tl-year">1990</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">CASTLE Laboratory founded — Hugo Simao joins<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>CASTLE Laboratory was founded with the hiring of Hugo Simao to develop an operational linehaul planning system for Yellow Freight System. First implemented in 1992, the system is still running 30 years later (with a major upgrade implemented in 2018). CASTLE would grow to handle projects in trucking (LTL, truckload, parcel), rail (primarily locomotive optimization, management of high value spare parts), before evolving into energy, e-commerce and health.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">1991</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Edelman finalist — LOADMAP at North American Van Lines<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Edelman finalist for application of LOADMAP (predecessor of MicroMAP) at North American Van Lines.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">1992</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">LQN methodology — predecessor of approximate dynamic programming<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Developed the "LQN" methodology for fleet management, the predecessor of approximate dynamic programming for high-dimensional applications. This methodology used a linear approximation of value functions, a technique that is still being used to optimize fleets of drivers.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">1994</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">First real-time multi-leg driver scheduling system<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>First real-time driver scheduling system that could assign drivers over multiple legs, all using an in-memory, real-time system (developed by Derek Gittoes).</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">1995</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Transport Dynamics founded<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Transport Dynamics was founded by Derek Gittoes.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">1996<br>–2008</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">PLASMA — locomotive optimization for Norfolk Southern<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Developed <a href="/sda-website/plasma/">PLASMA</a> for Norfolk Southern which was the first production-quality optimization model for a North American freight railroad. The model is still running at Norfolk Southern after 15 years, and remains the only optimization model in production at a North American freight railroad.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">1997</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Merging historical patterns with optimization<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Introduced the idea of merging historical patterns in a large-scale optimization model, blending low-dimensional rules with high-dimensional algorithms. This idea was a major breakthrough since it helped to incorporate simple patterns of behavior captured using machine learning with optimization-based methods that could handle high-dimensional applications such as managing drivers.</p>
      </div>
    </button>
  </div>

  <div class="tl-decade"><span>2000s</span></div>

  <div class="tl-event tl-left">
    <div class="tl-year">2002</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">CAVE algorithm — Greg Godfrey<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Greg Godfrey develops the CAVE algorithm and adapts it to resource allocation problems with multi-period travel times. This logic remains one of the core tools of the lab for a wide range of resource allocation problems.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2002<br>–08</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">SMART-TL — full driver optimization for truckload<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>10 years of research finally produced the first driver optimization model for truckload trucking which handles a full set of driver and load attributes, including hours of service rules, equipment types, routing drivers to home, pickup and delivery appointment windows, and home time appointments. The model ("SMART-TL") was adapted to Schneider National (2004–2008). SMART-TL was later licensed to Optimal Dynamics.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">2006</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Knowledge gradient introduced — Peter Frazier<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Peter Frazier introduces the "<a href="/sda-website/optimal-learning/#kg-offline">knowledge gradient</a>," launching a new direction in optimal learning.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2007</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">First edition of <em>Approximate Dynamic Programming</em><span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>First edition of a book on Approximate Dynamic Programming, merging dynamic programming and math programming for the first time. The second edition (2011) was the first to identify four classes of policies.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">2008</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">PENSA Laboratory established — stochastic optimization in energy<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p><a href="/sda-website/energystorage/">PENSA Laboratory</a> (Princeton laboratory for ENergy Systems Analysis) was established to study stochastic optimization problems in energy, with a major grant from SAP.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2009</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Approximate Dynamic Programming optimizes truckload fleet operations at Schneider National, wins Daniel Wagner prize.<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p><a href="/sda-website/schneider/">Winner, Daniel Wagner Prize</a> from Informs for the first application of approximate dynamic programming for truckload fleet management for Schneider National. Now called SMART-TL, this is the first system to be able to estimate the marginal value of drivers and loads while handling all driver work rules and home constraints. SMART-TL would be licensed to Optimal Dynamics, founded in 2017 to bring this technology to the truckload industry.</p>
      </div>
    </button>
  </div>

  <div class="tl-decade"><span>2010s</span></div>

  <div class="tl-event tl-left">
    <div class="tl-year">2010</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Bridging online and offline learning — Ilya Ryzhov<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Ilya Ryzhov bridges online and offline learning using the knowledge gradient.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2011</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Second edition of <em>Approximate Dynamic Programming</em><span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Second edition of <em>Approximate Dynamic Programming</em> appears, representing a major revision of the first edition. 300 new pages, and a complete restructuring of the book, including a first draft of identifying four major classes of policies.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">2012</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline"><em>Optimal Learning</em> published by Wiley<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p><a href="https://optimallearning.princeton.edu"><em>Optimal Learning</em></a> is published by Wiley, introducing an entirely new class of policies for information collection tuned to the needs of business, science and engineering, geared to an undergraduate audience.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2013</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">CASTLE rechristened — new methodological focus<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>"CASTLE Labs" is rechristened "Laboratory for ComputAtional STochastic optimization and LEarning" to emphasize new focus on methodology with many applications.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">2014<br>–19</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">"Jungle of Stochastic Optimization" — unified framework<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Wrote "Jungle of Stochastic Optimization" for the Informs TutORial series. First time the four classes of policies were presented formally for solving stochastic optimization problems. Follow-on papers in 2016 (also for the TutORials series) and 2019 (for European J. of Operational Research) established the unified framework for sequential decision problems. This field came to be known as "sequential decision analytics".</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2017</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">Optimal Dynamics founded<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p><a href="http://optimaldynamics.com/">Optimal Dynamics</a> was founded by Daniel Powell to market the "SMART" library to the truckload trucking industry. The company would later raise $50 million in funding, and by 2023 had almost 70 employees.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">2018</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">10+ years of energy storage research compiled<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p><a href="/sda-website/energystorage/">Compiled 10+ years of research into energy storage</a>, which is the first to fully research all four classes of policies in the context of a wide range of storage applications, including the first formal model to properly handle rolling forecasts.</p>
      </div>
    </button>
  </div>

  <div class="tl-decade"><span>2020s</span></div>

  <div class="tl-event tl-left">
    <div class="tl-year">2022</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline"><em>Reinforcement Learning and Stochastic Optimization</em> published<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Published <a href="https://tinyurl.com/RLandSO/"><em>Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions</em></a>. The first book to unify 15 fields of stochastic optimization using a single universal modeling framework that can be used to model any sequential decision problem. The book then identifies four classes of policies that include every possible method for making decisions.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2022</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline"><em>Sequential Decision Analytics and Modeling</em> published<span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Published <a href="/sda-website/sdamodeling/"><em>Sequential Decision Analytics and Modeling: Modeling with Python</em></a>. This is an introductory book first used in an undergraduate course at Princeton, which uses a teach-by-example style.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-left">
    <div class="tl-year">2024</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline"><em>A Modern Approach to Teaching Optimization</em><span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>Posted <a href="/sda-website/teachingoptimization/"><em>A Modern Approach to Teaching Optimization</em></a> which presents a fundamentally new approach for teaching an introduction to optimization course for undergraduates or masters.</p>
      </div>
    </button>
  </div>

  <div class="tl-event tl-right">
    <div class="tl-year">2026</div>
    <button class="tl-card" aria-expanded="false" type="button">
      <div class="tl-headline">New monograph series: <em>Bridging Decision Problems</em><span class="tl-toggle">▼</span></div>
      <div class="tl-detail">
        <p>New monograph series: <em>Bridging Decision Problems</em>. Volume I, <em>Framing the Problem</em> appears. It lays the foundation for modeling any sequential decision problem by identifying metrics, decisions and uncertainties, using no mathematics.</p>
      </div>
    </button>
  </div>

</div>

<script>
(function () {
  const wrap = document.getElementById('tl-wrap');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    const card = e.target.closest('.tl-card');
    if (!card) return;
    const isOpen = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
  // Allow keyboard Enter / Space (button does this natively, but be defensive)
  wrap.addEventListener('keydown', function (e) {
    const card = e.target.closest('.tl-card');
    if (!card) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
})();
</script>
{% endraw %}
