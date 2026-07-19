---
layout: book
book_data: sdam_toc
book_home: /sdam/contents/
title: "Table of contents"
permalink: /sdam/contents/
date: 2026-07-19
---

<ul class="book-toc-list">
{% for c in site.data.sdam_toc.chapters %}
  {% unless c.is_toc or c.no_expand %}
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
