---
layout: book
title: "Table of contents"
permalink: /bridging-vol1/contents/
date: 2026-07-19
---

<ul class="book-toc-list">
{% for c in site.data.bridging_vol1_toc.chapters %}
  {% unless c.is_toc or c.no_expand %}
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
