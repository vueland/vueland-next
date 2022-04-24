const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const pkg = require('../package.json')
const config = require('./config')

const buildConfig = merge(baseConfig, {
  target: 'browserslist',
  mode: 'production',
  plugins: [],
  entry: {
    [pkg.name]: baseConfig.externals.path.src + '/index.ts',
    ['vueland-base']: baseConfig.externals.src + '/styles/main.scss',
    ['themes/material-theme']: baseConfig.externals.src + '/styles/themes/material-theme.scss',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    library: 'evo-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  devtool: 'eval-source-map',
  externals: [
    { vue: config.vue },
    nodeExternals()
  ]
})

module.exports = new Promise(res => {
  res(buildConfig)
})
