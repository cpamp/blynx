var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const min = process.env.NODE_ENV === 'production';

var es2015 = JSON.stringify({presets: [['es2015', {modules: false}]]})

module.exports = {
    output: {
        path: __dirname + '/dist/bundle',
        chunkFilename: '[id].chunk.js',
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        loaders: [{
                test: /\.ts$/,
                loaders: ['babel-loader?' + es2015, 'awesome-typescript-loader'],
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader?' + es2015]
            }, {
                test: /\.html$/,
                loaders: ['raw-loader']
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jable-components']
        }),
        //new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin()
    ]
};