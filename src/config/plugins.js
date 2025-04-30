/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
*/

import metagenPlugin from 'eleventy-plugin-metagen';
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import componentSystem from '../../eleventy-universal-components.js';

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
  },

  /**
   * Component system plugin
   */
  componentSystem: async function (eleventyConfig) {
    // Add plugin to eleventyConfig
    eleventyConfig.addPlugin(componentSystem);
  }
}
