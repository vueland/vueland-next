const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const nodeExternals = require('webpack-node-externals')
const copyWebpackPlugin = require('copy-webpack-plugin')
const components = require('../src/components.json')
const path = require('path')

const config = require('./config')

const buildConfig = (env = {}) => merge(baseConfig(env), {
  target: 'browserslist',
  mode: 'production',
  entry: {
    ['vueland']: path.resolve(__dirname, '../src/index.ts'),
    ['vueland-base']: path.resolve(__dirname, '../src/styles/scss/main.scss'),
    ['themes/vueland-theme']: path.resolve(__dirname, '../src/styles/scss/themes/vueland-theme.scss'),
    ...Object.keys(components).reduce((acc, key) => {
      acc[key] = path.resolve(__dirname, components[key])
      return acc
    }, {}),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    library: 'vueland',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  devtool: 'eval-source-map',
  externals: [
    { vue: config.vue },
    nodeExternals(),
  ],
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../types'), to: 'types/' },
      ],
    }),
  ],
})

module.exports = new Promise(res => {
  res(buildConfig({ dev: false }))
})
