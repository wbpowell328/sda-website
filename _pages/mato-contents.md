---
layout: book
book_data: mato_toc
book_home: /mato/contents/
title: "Table of contents"
permalink: /mato/contents/
date: 2026-07-19
---

<ul class="book-toc-list">
{% for c in site.data.mato_toc.chapters %}
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
