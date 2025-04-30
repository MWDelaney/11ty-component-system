import { EleventyRenderPlugin } from "@11ty/eleventy";

/**
 * Universal Components for Eleventy
 *
 * Include this file in your `.eleventy.js` to add universal components to your project.
 *
 * Collections:
 * - `components`: A collection of components sourced from the `src/assets/components/*.njk` directory.
 *
 * Filters:
 * - `merge`: Merges two objects into a single object. Properties from the second object
 *   will overwrite those in the first object if they share the same keys.
 *
 * Plugins:
 * - `EleventyRenderPlugin`: A plugin for advanced rendering capabilities in Eleventy.
 *
 * Bundling:
 * - CSS: Bundles CSS files into the `./assets/styles/` directory.
 * - JS: Bundles JavaScript files into the `./assets/scripts/` directory.
 */
export default function(eleventyConfig) {

  /**
   * Add the Eleventy Render Plugin.
   * Check if the plugin is already enabled before enabling it.
   */
    if (!eleventyConfig.plugins || !eleventyConfig.plugins.includes(EleventyRenderPlugin)) {
      eleventyConfig.addPlugin(EleventyRenderPlugin);
    }

  /**
   * Exclude components and stylesheet from production buildes
   * Update the paths to match your project structure, and the condition to
   * match your build process.
   */
  if (process.env.ELEVENTY_ENV === "production") {
      eleventyConfig.ignores.add("src/assets/components/*.njk");
      eleventyConfig.ignores.add("src/stylesheet.njk");
  }

  /**
   * Components Collection
   * This collection includes all components from the `src/assets/components/*.njk` directory.
   * Change this path to match your project structure.
   */
  eleventyConfig.addCollection("components", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/assets/components/*.njk");
  });

  /**
   * Merge filter
   * This filter merges two objects into a single object.
   */
  eleventyConfig.addFilter("merge", function (a, b) {
    return { ...a, ...b };
  });

  /**
   * Add handy bundles for CSS and JS
   * Change the `toFileDirectory` to match your project structure.
   *
   * To use these bundles, add following syntax to your templates:
   *   <!-- CSS Bundle -->
   *   <link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
   *
   *   <!-- JS Bundle -->
   *   <script src="{% getBundleFileUrl "js" %}"></script>
   */
  eleventyConfig.addBundle("css", {
    toFileDirectory: "./assets/styles/",
  });

  eleventyConfig.addBundle("js", {
    toFileDirectory: "./assets/scripts/",
  });

}
