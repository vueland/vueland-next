const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = (env = {}) => merge(baseConfig(env), {
  devtool: 'eval-cheap-module-source-map',
  target: 'web',
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../dev/app.ts')
  },
  devServer: {
    host: 'localhost',
    open: false,
    port: 8082,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /\w+/, to: '/index.html' }
      ]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vueland',
      hash: false,
      template: path.resolve(__dirname, '../dev') + '/index.html',
      filename: 'index.html',
      inject: true,
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
})

module.exports = new Promise(res => res(devConfig({ dev: true })))
