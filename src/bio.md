---
layout: "layouts/base.njk"
title: "Lorenzo Orsenigo – Biography"
description: "Learn about Lorenzo Orsenigo, composer, percussionist, and researcher in contemporary and artistic music."
---

<div class="bio-container" style="max-width: 600px; margin: 0 auto; padding: 2rem;">
  <h1>{{ bio.title }}</h1>
  <img src="/assets/img/Bio_Updated_compressed.jpg" alt="Lorenzo Orsenigo Portrait" style="margin-bottom: 2rem;">

{% for paragraph in bio.text.split('\n\n') %}

<p>{{ paragraph }}</p>
{% endfor %}

</div>
