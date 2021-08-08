const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  plugins: [new CleanWebpackPlugin()],
});