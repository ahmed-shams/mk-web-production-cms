const withCSS = require("@zeit/next-css");

const config = {
  target: "serverless",
  assetPrefix: "https://s3.amazonaws.com/sls-cms-client"
};

module.exports = withCSS(config);
