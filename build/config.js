const path = require('path')
const nodeExternals = require('webpack-node-externals')

let externals = {}

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()]

exports.externals = externals

exports.alias = {
  '@': path.resolve(__dirname, '../packages/vueland/src'),
  vueland: path.resolve(__dirname, '../packages/vueland')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}
