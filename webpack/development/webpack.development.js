const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("../common/webpack.core")({
  environment: "development",
  entry: {
    browser: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../../", "public"),
    chunkFilename: "[name].js",
    filename: `[name].js`,
    publicPath: "/"
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "../../public"),
    port: 3000,
    historyApiFallback: true,
    hot: true,
    compress: false,
    host: "0.0.0.0"
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
