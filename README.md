# Eleventy Component System

## Single-file front-end components for Eleventy sites

This example project shows how to use the Eleventy Component System to create reusable *single-file* components in your Eleventy site.

## A universal format for 11ty front-end components

```njk
# components/callout.njk
--- 
title: Callout

# Default values
heading: Dummy heading
description: Placeholder text for this callout component. You can use Markdown here.
image: /assets/images/placeholder.jpg
imageAlt: An example image
links:
  - linkUrl: #
    linkText: Example link
background: light
---

<section class="block block-callout bg-{{ background }} text-bg-{{ background }}">
  <article class="text-center">
    <header>
      <h2>{{ heading }}</h2>
    </header>
    {{ description | safe }}
    <footer class="mt-4">
      <nav>
      {% for link in links %}
        <a href="{{ link.linkUrl }}" class="btn {{ 'btn-light' if loop.first else 'btn-link' }}">
          {{ link.linkText }}
        </a>
      {% endfor %}
      </nav>
    </footer>
  </article>
  <figure>
    <img src="{{ image }}" alt="{{ imageAlt }}" />
  </figure>
</section>

{% css %}
.block-callout {
  figure img {
    transform: rotate(6deg);
  }
}
{% endcss %}
```

```njk
# page.njk
---
title: My Page
components:
  - type: callout
    heading: Eleventy Component System
    description: Reusable components for your Eleventy site.
    image: /assets/images/possums.jpg
    imageAlt: A cute possum
    links:
      - linkUrl: #
        linkText: Learn more about 11ty Component System!
      - linkUrl: #
        linkText: Build your own component!
      - linkUrl: #
        linkText: Get started with Eleventy!
---
```

## Why use the Eleventy Component System?

* Rapidly create reusable components: data model, template, and styles all in one file.
* Autmaticaally generate a [git-based content management](https://decapcms.org) system for your components.
* Start building pages with components right away!

## Who is this for?

### WordPress developers

* You don't need 90% of WordPress's features, but you do need a way to create and manage content with reusable components.
* Hosting and databases are expensive; most of your content is static and doesn't need to be stored in a database.
