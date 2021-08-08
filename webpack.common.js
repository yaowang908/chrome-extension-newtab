const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: ["ts-loader", "babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
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
      filename: "css/[name].css"
    }),
  ],
};