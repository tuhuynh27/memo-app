const webpack = require("webpack");
const path = require("path");
const {
  nodeStyleLoader,
  babelLoader,
  typeLoader,
  fileLoader,
  styleLoader,
  resolve,
  optimization
} = require("./webpack.common");

module.exports = options => {
  return {
    entry: options.entry,
    output: options.output,
    module: {
      rules: [
        babelLoader,
        typeLoader,
        options.target === "node"
          ? {}
          : fileLoader(options.environment === "development"),
        options.target === "node"
          ? nodeStyleLoader
          : styleLoader(options.environment === "development")
      ],
      exprContextCritical: false
    },
    devServer: options.devServer || {},
    resolve,
    target: options.target || "web",
    externals: options.externals || [],
    mode: options.mode || "development",
    devtool: options.devtool || "",
    optimization: options.target === "node" ? {} : optimization,
    plugins:
      options.target === "node"
        ? options.plugins || []
        : (options.plugins || []).concat([
            new webpack.DefinePlugin({
              "process.env": {
                NODE_ENV: JSON.stringify(options.environment),
                BROWSER: JSON.stringify(
                  options.target === "node" ? false : true
                )
              },
              ENVIRONMENT: JSON.stringify(options.environment)
            })
          ])
  };
};
