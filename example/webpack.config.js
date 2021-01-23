var webpack = require('webpack');

module.exports = {
    entry: "./example.js",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
        })
    ],
    resolve: {
        extensions: ['', '.es6.js', '.js', '.jsx'],
        modulesDirectories: [
            'node_modules',
            'src'
        ],
        alias: {
            src: '../src'
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.jsx$/, loader: 'jsx' },
            { test: /\.(ttf|eot|svg|woff|gif|png|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    }
};