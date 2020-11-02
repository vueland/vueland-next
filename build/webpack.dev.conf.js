const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseConfig.externals.path.dist,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    historyApiFallback: true,
  },
  entry: {
    retn: `${ baseConfig.externals.path.dev }/app.ts`
  },
  output: {
    filename: `index.js`,
    path: baseConfig.externals.path.dist,
    chunkFilename: `chunk.[name].[hash].js`,
    publicPath: '/',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${ baseConfig.externals.path.dev }/index.html`,
      filename: 'index.html',
      inject: true
    }),

    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
})

module.exports = new Promise((res, rej) => {
  res(devConfig)
})
