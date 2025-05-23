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

// Change the following constants to match your project structure
const COMPONENTS_DIR = "src/assets/components/*.njk"; // The directory you'll store your single-file components.
const CSS_BUNDLE_DIR = "./assets/styles/"; // The directory where the CSS bundle will be saved.
const JS_BUNDLE_DIR = "./assets/scripts/"; // The directory where the JS bundle will be saved.
const STYLESHEET_FILE = "src/stylesheet.njk"; // Component stylesheet template (optional)

export default function(eleventyConfig) {
  /**
   * Add the Eleventy Render Plugin.
   * Check if the plugin is already enabled before enabling it.
   */
  if (!eleventyConfig.plugins || !eleventyConfig.plugins.includes(EleventyRenderPlugin)) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);
  }

  /**
   * Exclude components and stylesheet from production builds
   */
  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.ignores.add(COMPONENTS_DIR);
    eleventyConfig.ignores.add(STYLESHEET_FILE);
  }

  /**
   * Components Collection
   * This collection includes all components from the `COMPONENTS_DIR` directory.
   */
  eleventyConfig.addCollection("components", function(collectionApi) {
    return collectionApi.getFilteredByGlob(COMPONENTS_DIR);
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
    toFileDirectory: CSS_BUNDLE_DIR,
  });

  eleventyConfig.addBundle("js", {
    toFileDirectory: JS_BUNDLE_DIR,
  });

  /**
   * Add a shortcode for the components system
   */

}
