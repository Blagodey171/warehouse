require('dotenv').config()
const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const serverConfig = {
    entry: {
        server : ["@babel/polyfill", './server/index'],
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './server.node.js',
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ]
                    }
                }
            },
            {
                test: /\.ts|tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader',
                    // options: {
                    //     presets: [
                    //         "@babel/preset-env",
                    //         "@babel/plugin-transform-runtime"
                    //     ]
                    // }
                } ,
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}

const clientConfig = {
    entry: {
        main : ["@babel/polyfill", './src/index.tsx'],
    },
    output: {
        filename: './[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
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
module.exports = [ serverConfig, clientConfig ];