var merge = require('webpack-merge');
const min = process.env.NODE_ENV === 'production';
var extract = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(require('./webpack.common'), {
    output: {
        filename: min ? '[name].min.js' : '[name].js',
    },
    entry: {
        'jable-components': './src/index.unbundled.ts'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: extract.extract({use: ['css-loader?minimize=' + min, 'sass-loader']})
        }]
    },
    plugins: [
        new extract('jable-components' + (min ? '.min' : '') + '.css'),
        new HtmlWebpackPlugin({
            template: 'src/example.html',
            filename: min ? 'example.min.html' : 'example.html'
        })
    ]
})