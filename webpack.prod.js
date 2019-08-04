const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimizer: [new TerserPlugin({
            cache: true,
            parallel: true,
            terserOptions: {
                compress: {
                    dead_code: true,
                    conditionals: true,
                    booleans: true
                },
                module: false,
                output: {
                    comments: false,
                    beautify: false,
                }
            }
        })],
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "./",
        filename: '[name].[contenthash].bundle.js',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: 'Output Management',
            favicon: "./src/images/favicon.png"
        })
    ],
});