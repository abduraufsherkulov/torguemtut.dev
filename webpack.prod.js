const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        }), new OptimizeCSSAssetsPlugin({})
        ],
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
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "./",
        filename: '[name].[contenthash].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: 'Output Management',
            favicon: "./src/images/favicon.png"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[contenthash].[name].css',
            chunkFilename: '[contenthash].[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
});