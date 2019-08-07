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
    publicPath: "http://localhost:3000/dist/",
    historyApiFallback: true,
    hot: true
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
//   devtool: "eval",
  plugins: [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.HotModuleReplacementPlugin()]
});
