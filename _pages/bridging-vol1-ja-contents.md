---
layout: book
title: 目次
permalink: /bridging-vol1/ja/contents/
date: 2026-07-19
book_home: /bridging-vol1/ja/contents/
book_data: bridging_vol1_toc_ja
lang: ja
translated_from: en
translated_from_hash: d3f1a93677291b22
---

<ul class="book-toc-list">
{% for c in site.data.bridging_vol1_toc.chapters %}
  {% unless c.is_toc or c.no_expand %}
    <li>
      {% if c.url != "" %}
        <a href="{{ c.url | relative_url }}"><span class="book-toc-chnum">第{{ c.num }}章.</span> {{ c.title }}</a>
      {% else %}
        <span class="book-toc-chnum">第{{ c.num }}章.</span> {{ c.title }} <em>(近日公開)</em>
      {% endif %}
    </li>
  {% endunless %}
{% endfor %}
</ul>