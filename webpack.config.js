const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        popup: path.join(__dirname, 'src/popup.ts'),
        options: path.join(__dirname, 'src/options.ts'),
        contentScript: path.join(__dirname, 'src/contentScript.ts'),
        eventPage: path.join(__dirname, 'src/eventPage.ts')
    },
    output: {
        path: path.join(__dirname, 'build/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                include: /src/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules', 'src']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};