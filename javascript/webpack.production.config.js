const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

let config = require('./webpack.base.config.js');

config.mode =  'production';
config.output.path = path.resolve('./dist');
config.plugins = config.plugins.concat([
    new BundleTracker({path: __dirname, filename: 'webpack-stats-production.json',}),
    new webpack.DefinePlugin({
        'DEBUG': false, // switch some code based on this
    }),
]);

module.exports = config;
