/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
*/

import metagenPlugin from 'eleventy-plugin-metagen';
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default {
  /**
   * Metagen plugin
   * https://github.com/tannerdolby/eleventy-plugin-metagen
   */
  metagen: async function (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(metagenPlugin);
  },

  /**
   * Eleventy Render plugin
   * https://www.11ty.dev/docs/plugins/render/
   */
  render: async function (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(EleventyRenderPlugin);
  },

  /**
   * Eleventy Bundle config
   */
  bundle: async function (eleventyConfig) {
      eleventyConfig.addBundle("css", {
        toFileDirectory: "./assets/styles/",
      });

      eleventyConfig.addBundle("js", {
        toFileDirectory: "./assets/scripts/",
      });
  },

  /**
   * Eleventy Image Transform plugin
   * https://www.11ty.dev/docs/plugins/eleventy-img/
   */
  eleventyImage: async function (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
      outputDir: "./public/assets/images/",
      urlPath: "/assets/images/",
      htmlOptions: {
        imgAttributes: {
          loading: "lazy",
          decoding: "async",
        },
        pictureAttributes: {}
      },
    });
  }
}
