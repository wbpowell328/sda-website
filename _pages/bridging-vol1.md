---
layout: book
title: "Framing the Problem"
permalink: /bridging-vol1/
date: 2026-07-17
---

<img src="/assets/images/bridging-decision-problems/vol-i-cover.jpg" alt="Cover of Bridging Decision Problems, Volume I — Framing the Problem, by Warren B. Powell" width="200" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />

This is a web edition of *Framing the Problem*, Volume I of the monograph series **Bridging Decision Problems**, read directly in your browser rather than as a PDF.

The book is also available on [Kindle](https://tinyurl.com/PowellFramingAmazon/), or as a [downloadable PDF](/assets/papers/bridging-vol-i-framing.pdf). For an overview of the ideas in the book, see the [Bridging Decision Problems](/bridgingdecisionproblems/) webpage.

<br clear="all" />

## Table of contents

<ul class="book-toc-list">
{% for c in site.data.bridging_vol1_toc.chapters %}
  {% unless c.is_toc %}
    <li>
      {% if c.url != "" %}
        <a href="{{ c.url | relative_url }}"><span class="book-toc-chnum">Chapter {{ c.num }}.</span> {{ c.title }}</a>
      {% else %}
        <span class="book-toc-chnum">Chapter {{ c.num }}.</span> {{ c.title }} <em>(coming soon)</em>
      {% endif %}
    </li>
  {% endunless %}
{% endfor %}
</ul>
