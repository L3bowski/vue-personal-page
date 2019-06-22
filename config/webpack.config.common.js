'use strict';

const VueLoaderPlugin      = require('vue-loader/lib/plugin');
const HtmlPlugin           = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const path                 = require('path');
const isDev                = process.env.NODE_ENV === 'development';

const envConfig = require('dotenv').config();
if (envConfig.error || !envConfig.parsed.MAPS_API_KEY) {
    throw 'The Google Maps API key must be provided through a .env file to build/start the app';
}

const webpackConfig = {
    entry: {
        index: path.resolve(__dirname, '..', 'src', 'main'),
    },
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
            '@': path.resolve(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [ path.resolve(__dirname, '..', 'src') ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [ path.resolve(__dirname, '..', 'src') ]
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlPlugin({ template: 'index.html', chunksSortMode: 'dependency' }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '..', 'assets'),
              to: path.resolve(__dirname, '..', 'dist')
            }
        ])
    ]
};

module.exports = webpackConfig;
