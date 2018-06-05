const withPlugins = require("next-compose-plugins")
const withSass = require('@zeit/next-sass')
const withImages = require('./tools/next-images')
const path = require('path')
const WebpackUploadPlugin = require('webpack-upload')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

require('./tools/eject-reducers')

const prod = process.env.NODE_ENV === 'production'

const assetPrefix = prod ? '//res.dev1.qlchat.com/rs/wechat-react' : ''

const plugins = [
    withImages,
    // withSass,
]

module.exports = withPlugins([...plugins], {
    distDir: '../build',

    assetPrefix: assetPrefix,

    webpack: (config, options) => {
        const { isServer, buildId } = options

        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        }

        // if (prod && isServer) {
        //     config.plugins.push(
        //         new WebpackUploadPlugin({
        //             receiver: 'http://receiver.dev1.qlchat.com/receiver',
        //             to: `/data/nodeapp/resources/rs/wechat-react`
        //         }
        //     ))
        // }


        config.module.rules.push({
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: false,
                            url: true,
                            sourceMap: false,
                            minimize: true,
                            // localIdentName: false
                            //     ? '[name]-[local]-[hash:base64:5]'
                            //     : '[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                autoprefixer(),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, 'pages'),
                            ],
                        },
                    },
                ],
            }),
        });

        if (prod) {
            config.plugins.push(new ExtractTextPlugin('app-' + buildId + '.css'));
        } else {
            config.plugins.push(new ExtractTextPlugin('app.css'));
        }
        
        return config
    }
})
