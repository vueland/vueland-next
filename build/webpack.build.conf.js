const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const pkg = require('../package.json')
const config = require('./config')

const buildConfig = merge(baseConfig, {
  mode: 'production',
  entry: {
    [pkg.name]: baseConfig.externals.path.src + '/index.ts',
    ['vueland-base']: baseConfig.externals.src + '/styles/main.scss',
    ['themes/material-theme']: baseConfig.externals.src + '/styles/themes/material-theme.scss',
  },
  output: {
    filename: `[name].js`,
    path: baseConfig.externals.path.dist,
    publicPath: '/dist/',
    library: 'vueland',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  devtool: 'source-map',
  externals: {
    vue: config.vue
  }
})

module.exports = new Promise(res => {
  res(buildConfig)
})
