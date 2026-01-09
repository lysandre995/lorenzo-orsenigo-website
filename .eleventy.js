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

  // Add date formatting filter
  eleventyConfig.addFilter("formatDate", function(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  });

  // Add filter to sort events by date
  eleventyConfig.addFilter("sortByDate", function(array, order = "asc") {
    return array.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  });

  // Add filter to capitalize all words in hyphenated strings
  eleventyConfig.addFilter("titleCase", function(str) {
    if (!str) return "";
    return str.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('-');
  });

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
