const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    newtab: __dirname + "/src/app/newtab.tsx",
    popup: __dirname + "/src/app/popup.tsx",
    options: __dirname + "/src/app/options.tsx",
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
        use: ["ts-loader", "babel-loader"],
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
      chunks: ["newtab"],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: __dirname + "/index.html",
      inject: "body",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: __dirname + "/index.html",
      inject: "body",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      filename: "background.html",
      template: __dirname + "/index.html",
      inject: "body",
      chunks: ["background"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          transform: function (content, path) {
            // generates the manifest file using the package.json information
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
      ],
    }),
  ],
};