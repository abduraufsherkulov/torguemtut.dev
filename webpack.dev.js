const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "https://localhost:3000/dist/",
    historyApiFallback: true,
    hot: true,
    https: false
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
//   devtool: "eval",
  plugins: [
    new webpack.HotModuleReplacementPlugin()]
});
