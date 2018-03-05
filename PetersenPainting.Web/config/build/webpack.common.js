const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
        'styles': './src/global.scss'
    },

    resolve: {
        extensions: [
            '.js', '.ts'
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'awesome-typescript-loader?configFileName=config/tsconfig.json', 'angular2-template-loader' ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.scss$/,
                exclude: [ /node_modules/, helpers.root('src', 'global.scss') ],
                use: [ 'to-string-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /global\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'app', 'vendor', 'polyfills' ]
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        ),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
          
            // For Angular 5, see also https://github.com/angular/angular/issues/20357#issuecomment-343683491
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('src'), // location of your src
            {
              // your Angular Async Route paths relative to this root directory
            }
          )
    ]
};