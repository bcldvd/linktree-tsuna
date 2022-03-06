const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      template: "src/index.hbs",
      templateParameters: require("./dist/links.json"),
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/tsuna-logo.png", to: "./tsuna-logo.png" }],
    }),
    new MiniCssExtractPlugin(),
  ],
  mode: "production",
  devServer: {
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      { test: /\.hbs$/, loader: "handlebars-loader" },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    clean: true,
  },
};
