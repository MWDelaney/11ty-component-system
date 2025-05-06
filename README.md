# Eleventy Component System

Build resuable components for Eleventy sites. Data model, and markup all in one file.

This is an example of a simple Eleventy component system. It is designed to be a starting point for building reusable components in Eleventy. It's not intended to be a complete solution, but rather an example to help you get started.

## A universal format for 11ty front-end components

The Eleventy Component System is a universal format for building reusable components in Eleventy. It allows you to define your component's data model, markup, and styles in a single file, making it easy to create and manage front-end components

Here's an example of a simple "Article" component:

```md
# components/simple-article.njk
--- 
title: Simple Article

# Default values
heading: Dummy heading
description: Placeholder text for this component. You can use Markdown here.

# Decap CMS fields (optional)
fields:
  - name: heading
    label: Heading
    widget: string
  - name: description
    label: Description
    widget: markdown
---

{# component markup in njk format #}
<article>
  <h2>{{ heading }}</h2>
  {{ description | safe }}
</article>
```

To use this component in your Eleventy site, include a "components" key in your frontmatter:

```md
# page.njk
---
title: My Page
components:
  - type: simple-article # The slugified name of the component
    heading: Eleventy Component System
    description: Reusable components for your Eleventy site.
---

{# Include components partial here or in your layout. #}
{%- include "partials/components.njk" -%}
```

The [components.njk partial](https://github.com/MWDelaney/11ty-component-system/blob/main/src/assets/views/partials/components.njk) will automatically render components using data in the `components` frontmatter key.

Optionally [generate a DecapCMS configuration file](https://github.com/MWDelaney/11ty-component-system/blob/main/src/content/admin/config.yml.njk) and start building pages with components right away!

## Why use the Eleventy Component System?

* Rapidly create reusable components: data model, template, and styles all in one file.
* Autmatically generate a [git-based content management system](https://decapcms.org) for your components.
* Start building pages with components right away!

## Who is this for?

### WordPress developers

* You don't need 90% of WordPress's features, but you do need a way to create and manage content with reusable components.
* Hosting and databases are expensive; most of your content is static and doesn't need to be stored in a database.
