var merge = require('webpack-merge');
const min = process.env.NODE_ENV === 'production';

module.exports = merge(require('./webpack.common'), {
    output: {
        filename: min ? '[name].min.js' : '[name].js',
    },
    entry: {
        'jable-components': './src/index.unbundled.ts'
    }
})