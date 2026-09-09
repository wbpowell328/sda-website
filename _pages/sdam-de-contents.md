---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: Inhaltsverzeichnis
permalink: /sdam/de/contents/
date: 2026-07-19
lang: de
translated_from: en
translated_from_hash: ae561f774704c6c5
---

{%- assign book = site.data[page.book_data] -%}
<ul class="book-toc-list">
{% for c in book.chapters %}
  {% unless c.is_toc or c.no_expand %}
    <li>
      {% if c.url != "" %}
        <a href="{{ c.url | relative_url }}">{% if c.num != "" %}<span class="book-toc-chnum">Kapitel {{ c.num }}.</span> {% endif %}{{ c.title }}</a>
      {% else %}
        {% if c.num != "" %}<span class="book-toc-chnum">Kapitel {{ c.num }}.</span>{% endif %} {{ c.title }} <em>(demnächst verfügbar)</em>
      {% endif %}
    </li>
  {% endunless %}
{% endfor %}
</ul>