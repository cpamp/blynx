var merge = require('webpack-merge');
const min = process.env.NODE_ENV === 'production';

module.exports = merge(require('./webpack.common'), {
    devtool: 'source-map',
    output: {
        filename: min ? '[name].bundle.min.js' : '[name].bundle.js',
    },
    entry: {
        'jable-components': './src/index.bundle.ts'
    }
})