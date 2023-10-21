const contentful = require("contentful");

module.exports = {
  images: {
    loader: "imgix",
    path: "https://kdee.imgix.net/",
    domains: ["images.ctfassets.net"],
  },
};
