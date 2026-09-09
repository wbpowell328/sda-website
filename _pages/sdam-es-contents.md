---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: Tabla de contenidos
permalink: /sdam/es/contents/
date: 2026-07-19
lang: es
translated_from: en
translated_from_hash: ae561f774704c6c5
---

{%- assign book = site.data[page.book_data] -%}
<ul class="book-toc-list">
{% for c in book.chapters %}
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