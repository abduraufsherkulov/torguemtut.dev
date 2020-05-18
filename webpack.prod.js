const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

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
                },
                styles: {
                    name: 'styles',
                    test: (m, c, entry = 'styles') =>
                        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
                fonts: {
                    name: 'fonts',
                    test: (m, c, entry = 'fonts') =>
                        m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true,
                },
            }
        }
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: '[name].[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: 'Output Management',
            favicon: "./src/images/favicon.png"
        }),
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[name].[contenthash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
});