/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/

export default {
  // /**
  // * Blog posts
  // */
  // posts: function (eleventyConfig) {
  // eleventyConfig.addCollection("posts", function(collectionApi) {
  //    return collectionApi.getFilteredByGlob("src/content/posts/*.md");
  //  });
  // },


  /**
   * Pages
   */
  pages: async function (eleventyConfig) {
    // Get all `.md` files in the `src/pages` directory
    eleventyConfig.addCollection("pages", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/content/pages/**/*.njk");
    });
  },

  /**
   * Components
   */
  components: function (eleventyConfig) {
    // Get all `.md` files in the `src/pages` directory
    eleventyConfig.addCollection("components", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/assets/components/*.njk");
    });

    // If this is a production build, add `components` to Ignores
    if (process.env.ELEVENTY_ENV === "production") {
      eleventyConfig.ignores.add("src/assets/components/*.njk");
      eleventyConfig.ignores.add("src/stylesheet.njk");
    }
  }
}
