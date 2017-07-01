var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist/bundle',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    entry: {
        'components': './src/index.ts'
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
                exclude: /external\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['components']
        }),
        //new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/example.html'
        })
    ]
};