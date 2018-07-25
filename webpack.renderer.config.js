const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const base = require("./webpack.base.config");
const buildPath = path.resolve(__dirname, "./dist");

const renderer = merge(base, {
  entry: "./app/renderer.jsx",
  output: {
    filename: "renderer.js",
    path: buildPath
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          presets: ["es2017", "react"],
          plugins: ["transform-class-properties"]
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    })
  ],
  target: "electron-renderer"
});

module.exports = renderer;
