const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const nodeExternals = require('webpack-node-externals')
const copyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const config = require('./config')

const buildConfig = (env = {}) => merge(baseConfig(env), {
  target: 'browserslist',
  mode: 'production',
  entry: {
    ['vueland']: path.resolve(__dirname, '../packages/vueland/src/index.ts'),
    ['css/vueland-base']: path.resolve(__dirname, '../packages/vueland/src/styles/scss/main.scss'),
    ['css/themes/vueland-theme']: path.resolve(__dirname, '../packages/vueland/src/styles/scss/themes/vueland-theme.scss'),
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
        { from: path.resolve(__dirname, '../packages/vueland/src/types'), to: 'types/' },
      ],
    }),
  ],
})

module.exports = new Promise(res => {
  res(buildConfig({ dev: false }))
})
