# Eleventy Component System

Build resuable single-file components for Eleventy sites. Data model and markup all in one file, styles and javascript too!

This is an example of a simple Eleventy component system. It is designed to be a starting point for building reusable components in Eleventy. It's not intended to be a complete solution, but rather an example to help you get started.

## A single-file format for 11ty front-end components

The Eleventy Component System is a single-file format for building reusable components in Eleventy. It allows you to define your component's data model, markup, and styles in a single file and use them in your pages by populating them with frontmatter.

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

The [components.njk partial](https://github.com/MWDelaney/11ty-component-system/blob/main/src/assets/views/partials/components.njk) will automatically render components using data in the `components` frontmatter key, and markup from the component.

Optionally [generate a DecapCMS configuration file](https://github.com/MWDelaney/11ty-component-system/blob/main/src/content/admin/config.yml.njk) and start building pages with components right away!

## How to use

1. Download or copy the contents of [eleventy-component-system.js](https://github.com/MWDelaney/11ty-component-system/blob/main/eleventy-universal-components.js) and include it in your Eleventy config file. Update paths in the script to match your project structure. 
2. Download [components.njk](https://github.com/MWDelaney/11ty-component-system/blob/main/src/assets/views/partials/components.njk) and place it in your [includes directory](https://www.11ty.dev/docs/config/#directory-for-includes) (default: `_includes/`).
3. Create a directory in your project for single-file components. For example, `src/components/`.
4. (Optional) Copy the [admin directory](https://github.com/MWDelaney/11ty-component-system/tree/main/src/content/admin) to your project to use DecapCMS to create pages with your components.
