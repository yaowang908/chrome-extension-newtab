const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    "js/newtab": __dirname + "/src/app/newtab.tsx",
    "js/popup": __dirname + "/src/app/popup.tsx",
    "js/options": __dirname + "/src/app/options.tsx",
    background: __dirname + "/src/app/background.tsx",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js"],
        },
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        exclude: /node_modules/,
        type: "asset/resource",
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./new-tab.html",
      template: __dirname + "/index.html",
      inject: "body",
      chunks: ["js/newtab"],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: __dirname + "/index.html",
      inject: "body",
      chunks: ["js/popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: __dirname + "/index.html",
      inject: "body",
      chunks: ["js/options"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets/",
          to: "assets/",
        },
        {
          from: "buffer",
          // to: "./",
        },
      ],
    }),
  ],
};