const path = require('path')
const webpack = require('webpack')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env = {}) => {
  return {
    output: {
      publicPath: 'http://localhost:8081/',
      clean: true
    },
    optimization: {
      runtimeChunk: false,
      removeEmptyChunks: true,
      minimize: !env.dev,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            compress: {
              collapse_vars: true,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        })
      ],
      splitChunks: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: { babelrc: true }
            },
            {
              loader: 'ts-loader',
              options: { transpileOnly: true }
            },
            {
              loader: 'eslint-loader'
            }
          ]
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: [ 'vue-loader', 'eslint-loader' ]
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline'
        }
      ]
    },
    resolve: {
      extensions: [ '.ts', '.js', '.vue', '.json' ],
      alias: {
        '@': path.resolve(__dirname, '../src'),
        vue: 'vue/dist/vue.runtime.esm-browser.js'
      }
    },
    plugins: [
      new RemoveEmptyScriptsPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false
      }),
      new webpack.WatchIgnorePlugin({
        paths:[
          /\.js$/,
          /\.d\.ts$/
        ]}),
      new VueLoaderPlugin()
    ]
  }
}
