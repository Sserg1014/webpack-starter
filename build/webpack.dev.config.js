const webpack = require('webpack')
const {merge} = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')

const webpackDevConfig = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(webpackDevConfig)
})