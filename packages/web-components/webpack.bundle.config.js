var merge = require('webpack-merge');

module.exports = merge(require('./webpack.common'), {
    devtool: 'source-map',
    entry: {
        'jable-components': './src/index.bundle.ts'
    }
})