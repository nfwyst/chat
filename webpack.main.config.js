const path = require("path");
const merge = require("webpack-merge");

const base = require("./webpack.base.config");
const buildPath = path.resolve(__dirname, "./dist");

const main = merge(base, {
  entry: ["babel-polyfill", "./app/main.js"],
  output: {
    filename: "main.js",
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2017"],
              plugins: ["transform-class-properties"]
            }
          }
        ]
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: "electron-main"
});

module.exports = main;
