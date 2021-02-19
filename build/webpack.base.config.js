const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Main const
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    build: path.join(__dirname),
    // assets: 'assets/'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        common: `${PATHS.src}/js`,
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: `${PATHS.dist}`,
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/img`, to: `${PATHS.dist}/img` },
                { from: `${PATHS.src}/favicon`, to: `${PATHS.dist}/favicon` }
            ]
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: { config: `${PATHS.build}/postcss.config.js` }
                        }
                    },
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: { config: `${PATHS.build}/postcss.config.js` }
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                rewriteUrls: "all"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: { config: `${PATHS.build}/postcss.config.js` }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                rewriteUrls: "all"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webm|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `img/[name][ext]?[hash]`
                }
            },
            {
                test: /fonts\/.*?\.(woff2?|eot|ttf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `fonts/[name].[ext]?[hash]`
                }
            }
        ]
    }
}