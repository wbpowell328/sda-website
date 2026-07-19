---
layout: book
book_data: sdam_toc
book_home: /sdam/contents/
title: "Sequential Decision Analytics and Modeling"
permalink: /sdam/contents/
date: 2026-07-19
---

<img src="/assets/images/sdam/cover.jpg" alt="Cover of Sequential Decision Analytics and Modeling, 2nd edition, by Warren B. Powell" width="200" align="right" style="max-width: 100%; height: auto; margin-left: 1.5rem; margin-bottom: 1rem;" />

This is a web edition of *Sequential Decision Analytics and Modeling* (2nd edition), read directly in your browser rather than as a PDF.

*Sequential Decision Analytics and Modeling* uses a teach-by-example style to illustrate a universal framework for modeling sequential decision problems. The universal framework applies to *any* sequential decision problem, from active learning problems up through complex resource allocation problems. Chapters are accompanied by Python modules that have implemented the models, but the book should be of value even to people not interested in writing code.

The book is also available as a [downloadable PDF](/assets/papers/sdam-2nd-edition.pdf), or see the [book's webpage](/sdamodeling/) for a fuller overview, the accompanying Python software, and course materials.

<br clear="all" />

## Table of contents

<ul class="book-toc-list">
{% for c in site.data.sdam_toc.chapters %}
  {% unless c.is_toc %}
    <li>
      {% if c.url != "" %}
        <a href="{{ c.url | relative_url }}">{% if c.num != "" %}<span class="book-toc-chnum">Chapter {{ c.num }}.</span> {% endif %}{{ c.title }}</a>
      {% else %}
        {% if c.num != "" %}<span class="book-toc-chnum">Chapter {{ c.num }}.</span>{% endif %} {{ c.title }} <em>(coming soon)</em>
      {% endif %}
    </li>
  {% endunless %}
{% endfor %}
</ul>
