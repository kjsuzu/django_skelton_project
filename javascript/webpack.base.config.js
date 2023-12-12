const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        main: './src/index',
    },
    output: {
        publicPath: 'static/',
        filename: 'js/[name]-[fullhash:8].js',
        library: 'app',
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style-[name]-[fullhash:8].css',
        }),
        new EventHooksPlugin({
            // delete publicPath for django-webpack-loader
            afterDone: (stats) => {
                let jsonFile = __dirname;
                if (stats.compilation.options.mode == 'production') {
                    jsonFile += '/webpack-stats-production.json'
                } else if (stats.compilation.options.mode == 'development') {
                    jsonFile += '/webpack-stats-local.json'
                } else {
                    return; // shouldnt be
                }
                let json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
                for (const key in json.chunks) {
                    for (const asset of json.chunks[key]) {
                        delete asset.publicPath;
                    }
                }
                fs.writeFileSync(jsonFile, JSON.stringify(json));
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: '> 0.25%, not dead',
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                    },
                                ],
                            ],
                        },
                    },
                ],
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                ],
            }, {
                test: /\.(jpe?g|png|gif|svg|ttf|woff2?|eot|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: (url, resourcePath, context) => {
                                let outpath = outputPath(url, resourcePath, context);
                                let outpaths = outpath.split(path.sep);
                                // put '../' since all files are supposed to be loaded from css
                                // which will be placed at 'static/css/style*.css'
                                outpaths.unshift('../');
                                return path.join.apply(null, outpaths);
                            },
                            // specify dir not to conflict filename
                            outputPath: outputPath,
                        },
                    }
                ]
            }
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
    },

    resolve: {
        modules: ['node_modules',],
        extensions: ['.js',]
    },
}

function outputPath(url, resourcePath, context) {
    let relpath = path.relative(context, resourcePath);
    let relpaths = relpath.split(path.sep);
    // for node_modules, i.e. external library
    if (relpaths[0] == 'node_modules') {
        // remove 'node_modules' prefix
        relpaths.splice(0, 1);
        // remove 1st 'dist' so that path looks better
        let idx = relpaths.indexOf('dist');
        if (idx >= 0) {
            relpaths.splice(idx, 1);
        }
    // for our own file, remove 'assets' part
    } else if (relpaths[0] == 'assets') {
        relpaths.splice(0, 1);
    }
    // put '../' since all files are supposed to be loaded from css
    return path.join.apply(null, relpaths);
}
