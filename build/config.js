const path = require('path')
const nodeExternals = require('webpack-node-externals')

let externals = {}

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()]

exports.externals = externals

exports.alias = {
  '@': path.resolve(__dirname, '../src'),
  retn: path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}
