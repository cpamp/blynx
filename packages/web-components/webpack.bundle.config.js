var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const min = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist/bundle',
        filename: min ? '[name].bundle.min.js' : '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    entry: {
        'jable-components': './src/index.bundle.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        loaders: [{
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['jable-components']
        }),
        //new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/example.html',
            filename: min ? 'example.bundle.min.html' : 'example.bundle.html'
        })
    ].concat(min ? [new webpack.optimize.UglifyJsPlugin()] : [])
};