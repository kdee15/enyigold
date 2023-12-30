const contentful = require("contentful");

module.exports = {
  images: {
    loader: "custom",
    loaderFile: "./src/helpers/contentfulImageLoader.js",
  },
};
