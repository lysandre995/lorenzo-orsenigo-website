const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw") {
  if (!src) return "";

  const metadata = await Image(src, {
    widths: [400, 800, 1200, 1600],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/assets/img/optimized/",
    urlPath: "/assets/img/optimized/",
    filenameFormat: function (id, src, width, format) {
      const extension = src.split('.').pop();
      const name = src.split('/').pop().replace(`.${extension}`, '');
      return `${name}-${width}w.${format}`;
    }
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // Add image shortcode
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Passthrough copies - keep original images for background-image CSS
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/content/**/*.{jpg,jpeg,png,gif,mp4,mp3,pdf}");

  // Watch targets
  eleventyConfig.addWatchTarget("./src/assets/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
