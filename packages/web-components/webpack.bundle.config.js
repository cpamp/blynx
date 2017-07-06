var merge = require('webpack-merge');
const min = process.env.NODE_ENV === 'production';
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(require('./webpack.common'), {
    devtool: 'source-map',
    output: {
        filename: min ? '[name].bundle.min.js' : '[name].bundle.js',
    },
    entry: {
        'jable-components': './src/index.bundle.ts'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: ['to-string-loader', 'css-loader?minimize=' + min, 'sass-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/example.html',
            filename: min ? 'example.bundle.min.html' : 'example.bundle.html'
        })
    ]
})