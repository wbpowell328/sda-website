---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: Tabla de contenidos
permalink: /sdam/es/contents/
date: 2026-07-19
lang: es
translated_from: en
translated_from_hash: 7f9941f97f3b6ba6
---

<ul class="book-toc-list">
{% for c in site.data.sdam_toc.chapters %}
  {% unless c.is_toc or c.no_expand %}
    <li>
      {% if c.url != "" %}
        <a href="{{ c.url | relative_url }}">{% if c.num != "" %}<span class="book-toc-chnum">Capítulo {{ c.num }}.</span> {% endif %}{{ c.title }}</a>
      {% else %}
        {% if c.num != "" %}<span class="book-toc-chnum">Capítulo {{ c.num }}.</span>{% endif %} {{ c.title }} <em>(próximamente)</em>
      {% endif %}
    </li>
  {% endunless %}
{% endfor %}
</ul>