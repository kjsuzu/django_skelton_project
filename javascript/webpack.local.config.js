const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

let config = require('./webpack.base.config.js');

config.mode =  'development';
config.output.path = path.resolve('./build');
config.plugins = config.plugins.concat([
    new BundleTracker({path: __dirname, filename: 'webpack-stats-local.json',}),
    new webpack.DefinePlugin({
        'DEBUG': true, // switch some code based on this
    }),
]);

module.exports = config;
