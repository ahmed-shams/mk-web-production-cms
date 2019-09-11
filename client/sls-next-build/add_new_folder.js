
  const page = require("./add_new_folder.original.js");
  const handlerFactory = require("serverless-nextjs-plugin/aws-lambda-compat");

  module.exports.render = (event, context, callback) => {
    const handler = handlerFactory(page);
    handler(event, context, callback);
  };
