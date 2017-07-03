var merge = require('webpack-merge');

module.exports = merge(require('./webpack.common'), {
    entry: {
        'jable-components': './src/index.unbundled.ts'
    }
})