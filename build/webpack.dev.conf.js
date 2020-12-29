const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 8080,
    overlay: {
      warnings: false,
      errors: true,
    },
    historyApiFallback: true,
  },
  entry: {
    vueland: `${ baseConfig.externals.path.dev }/app.ts`,
  },
  output: {
    filename: `index.js`,
    path: baseConfig.externals.path.dist,
    chunkFilename: `chunk.[name].[hash].js`,
    publicPath: '/',
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${ baseConfig.externals.path.dev }/index.html`,
      filename: 'index.html',
      inject: true,
    }),
  ],
})

module.exports = new Promise((res, rej) => {
  res(devConfig)
})
