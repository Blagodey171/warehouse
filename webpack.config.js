require('dotenv').config()
const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    entry: {
        main : ["@babel/polyfill", './src/index.tsx'],
    },
    output: {
        filename: './[name].[contenthash].js',
        clean: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        watchContentBase: true,
        progress: true,
        open: true,
        hot: true,
        historyApiFallback: true,
        
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components|server)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test: /\.ts|tsx?$/,
                exclude: /(node_modules|bower_components|server)/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 3 versions',
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devtool: isDev ? 'source-map' : false,
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
        }),
        new htmlwebpackplugin({
            template: './src/index.html'
        }),
    ]
}