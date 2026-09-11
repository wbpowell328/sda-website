---
layout: book
title: Inhaltsverzeichnis
permalink: /bridging-vol1/de/contents/
date: 2026-07-19
book_home: /bridging-vol1/de/contents/
book_data: bridging_vol1_toc_de
lang: de
translated_from: en
translated_from_hash: d3f1a93677291b22
---

<ul class="book-toc-list">
{% for c in site.data.bridging_vol1_toc.chapters %}
  {% unless c.is_toc or c.no_expand %}
    <li>
      {% if c.url != "" %}
        <a href="{{ c.url | relative_url }}"><span class="book-toc-chnum">Kapitel {{ c.num }}.</span> {{ c.title }}</a>
      {% else %}
        <span class="book-toc-chnum">Kapitel {{ c.num }}.</span> {{ c.title }} <em>(demnächst verfügbar)</em>
      {% endif %}
    </li>
  {% endunless %}
{% endfor %}
</ul>