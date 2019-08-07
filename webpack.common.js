const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
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
                    loader: 'style-loader',
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
                            'heading-1-size': 'calc(16px + (28 - 16) * ((100vw - 300px) / (1600 - 300)))'
                            // or
                            // 'hack': `true; @import "your-less-file-path.less";`, // Override with less file
                        },
                        javascriptEnabled: true,
                    },
                }]
            },
            {
                test: /\.css$/,
                use: [
                {
                    loader: 'css-loader', 
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] }
};