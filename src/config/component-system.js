import { EleventyRenderPlugin } from "@11ty/eleventy";
import fs from 'fs';
import path from 'path';

/**
 * Universal Components for Eleventy Plugin
 *
 * A configurable plugin for adding universal components to your Eleventy project.
 *
 * @param {Object} options - Configuration options for the plugin
 * @param {string} [options.componentsDir="src/assets/components/*.njk"] - Glob pattern for component files
 * @param {string} [options.cssBundleDir="./assets/styles/"] - Directory for CSS bundle output
 * @param {string} [options.jsBundleDir="./assets/scripts/"] - Directory for JS bundle output
 * @param {string} [options.stylesheetFile="src/stylesheet.njk"] - Component stylesheet template file
 * @param {string} [options.collectionName="components"] - Name of the components collection
 * @param {boolean} [options.enableRenderPlugin=true] - Whether to enable the Eleventy Render Plugin
 * @param {boolean} [options.enableBundles=true] - Whether to enable CSS and JS bundles
 * @param {boolean} [options.excludeFromProduction=true] - Whether to exclude components from production builds
 *
 * Collections:
 * - `components` (or custom name): A collection of components sourced from the components directory.
 *
 * Plugins:
 * - `EleventyRenderPlugin`: A plugin for advanced rendering capabilities in Eleventy.
 *
 * Bundling:
 * - CSS: Bundles CSS files into the configured CSS bundle directory.
 * - JS: Bundles JavaScript files into the configured JS bundle directory.
 */

/**
 * Default configuration options
 */
const defaultOptions = {
  componentsDir: "src/assets/components/*.njk",
  cssBundleDir: "./assets/styles/",
  jsBundleDir: "./assets/scripts/",
  stylesheetFile: "src/stylesheet.njk",
  collectionName: "components",
  enableRenderPlugin: true,
  enableBundles: true,
  excludeFromProduction: true
};

export default function(eleventyConfig, userOptions = {}) {
  // Merge user options with defaults
  const options = { ...defaultOptions, ...userOptions };
  /**
   * Add the Eleventy Render Plugin.
   * Check if the plugin is already enabled before enabling it.
   */
  if (options.enableRenderPlugin && (!eleventyConfig.plugins || !eleventyConfig.plugins.includes(EleventyRenderPlugin))) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);
  }

  /**
   * Exclude components and stylesheet from production builds
   */
  if (options.excludeFromProduction && process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.ignores.add(options.componentsDir);
    eleventyConfig.ignores.add(options.stylesheetFile);
  }

  /**
   * Components Collection
   * This collection includes all components from the configured components directory.
   */
  eleventyConfig.addCollection(options.collectionName, function(collectionApi) {
    return collectionApi.getFilteredByGlob(options.componentsDir);
  });

  /**
   * Add handy bundles for CSS and JS
   * Change the bundle directories via options to match your project structure.
   *
   * To use these bundles, add following syntax to your templates:
   *   <!-- CSS Bundle -->
   *   <link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
   *
   *   <!-- JS Bundle -->
   *   <script src="{% getBundleFileUrl "js" %}"></script>
   */
  if (options.enableBundles) {
    eleventyConfig.addBundle("css", {
      toFileDirectory: options.cssBundleDir,
    });

    eleventyConfig.addBundle("js", {
      toFileDirectory: options.jsBundleDir,
    });
  }

  /**
   * Add filters for the component system
   */

  // Filter to read and extract frontmatter from the original file
  eleventyConfig.addFilter("getFrontmatter", function(item) {
    if (!item || !item.inputPath) {
      return '';
    }

    try {
      // Read the original file content
      const fileContent = fs.readFileSync(item.inputPath, 'utf8');

      // Extract frontmatter (content between the first two --- markers)
      const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);

      if (frontmatterMatch) {
        // Return the frontmatter with the --- delimiters
        return `---\n${frontmatterMatch[1]}\n---`;
      }

      return 'No frontmatter found';
    } catch (error) {
      return `Error reading file: ${error.message}`;
    }
  });

  /**
   * Add a shortcode for the components system
   */

  // Plugin setup complete
  return {
    // Optionally return plugin metadata
    configFunction: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}

/**
 * Usage Examples:
 *
 * Basic usage with defaults:
 * ```javascript
 * import componentSystem from "./src/config/component-system.js";
 *
 * export default function(eleventyConfig) {
 *   eleventyConfig.addPlugin(componentSystem);
 * }
 * ```
 *
 * Custom configuration:
 * ```javascript
 * import componentSystem from "./src/config/component-system.js";
 *
 * export default function(eleventyConfig) {
 *   eleventyConfig.addPlugin(componentSystem, {
 *     componentsDir: "src/components/*.njk",
 *     cssBundleDir: "./public/css/",
 *     jsBundleDir: "./public/js/",
 *     collectionName: "myComponents",
 *     enableBundles: false
 *   });
 * }
 * ```
 */
