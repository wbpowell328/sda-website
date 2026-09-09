---
layout: book
book_data: sdam_toc_ja
book_home: /sdam/ja/contents/
title: 目次
permalink: /sdam/ja/contents/
date: 2026-07-19
lang: ja
translated_from: en
translated_from_hash: ae561f774704c6c5
---

{%- assign book = site.data[page.book_data] -%}
<ul class="book-toc-list">
{% for c in book.chapters %}
  {% unless c.is_toc or c.no_expand %}
    <li>
      {% if c.url != "" %}
        <a href="{{ c.url | relative_url }}">{% if c.num != "" %}<span class="book-toc-chnum">Chapter {{ c.num }}.</span> {% endif %}{{ c.title }}</a>
      {% else %}
        {% if c.num != "" %}<span class="book-toc-chnum">Chapter {{ c.num }}.</span>{% endif %} {{ c.title }} <em>(近日公開)</em>
      {% endif %}
    </li>
  {% endunless %}
{% endfor %}
</ul>