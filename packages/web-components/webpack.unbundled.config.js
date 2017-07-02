var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const min = process.env.NODE_ENV === 'production';

var extractCss = new ExtractTextPlugin('[name].css');

module.exports = {
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist/bundle',
        filename: min ? '[name].min.js' : '[name].js',
        chunkFilename: '[id].chunk.js',
        
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    entry: {
        'jable-components': './src/index.unbundled.ts'
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
                use: extractCss.extract(['css-loader', 'sass-loader'])
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
            filename: min ? 'example.min.html' : 'example.html'
        }),
        extractCss
    ].concat(min ? [new webpack.optimize.UglifyJsPlugin()] : [])
};