'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

const envConfig = require('dotenv').config();
if (envConfig.error || !envConfig.parsed.MAPS_API_KEY || !envConfig.parsed.ANALYTICS_TRACKING_ID) {
    throw 'Google Maps API key and Google Analytics Tracking ID must be provided through a .env file to build/start the app';
}

const webpackConfig = {
    entry: {
        index: path.resolve(__dirname, '..', 'src', 'main'),
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
        'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
        'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
        'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
    },
    resolve: {
        extensions: ['.js', '.vue', '.worker'],
        alias: {
            vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
            '@': path.resolve(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve(__dirname, '..', 'src')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, '..', 'src')]
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } }
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            },
            {
                test: /\.(png|jpe?g|gif|mp4)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader?jQuery!expose-loader?$'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: false
            /*chunksSortMode: 'dependency' */
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '..', 'assets'),
                to: path.resolve(__dirname, '..', 'docs')
            }
        ])
    ]
};

module.exports = webpackConfig;
