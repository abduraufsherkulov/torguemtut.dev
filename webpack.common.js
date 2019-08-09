const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        bundle: "./src/index.js",
        fonts: "./src/sass/fonts.scss",
        styles: "./src/sass/styles.scss"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env"],
                    plugins: [
                        ['import', {
                            libraryName: "antd",
                            libraryDirectory: 'es',
                            style: true
                        }]
                    ]
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            'primary-color': '#1DA57A',
                            'default-color': '#ebebeb',
                            'link-color': '#1DA57A',
                            'border-radius-base': '2px',
                            'heading-1-size': 'calc(16px + (20 - 16) * ((100vw - 320px) / (1920 - 320)))',
                            'heading-2-size': 'calc(14px + (18 - 14) * ((100vw - 320px) / (1920 - 320)))'
                            // or
                            // 'hack': `true; @import "your-less-file-path.less";`, // Override with less file
                        },
                        javascriptEnabled: true,
                    },
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] }
};