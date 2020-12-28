const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = pathString => {
  return path.resolve(__dirname, pathString)
}

const isProd = process.env.NODE_ENV === 'production'

const PATH = {
  root: resolve('../'),
  src: resolve('../src'),
  dev: resolve('../dev'),
  dist: resolve('../dist'),
  public: 'public/',
  assets: 'assets/',
}

exports.config = {
  node: {
    fs: 'empty'
  },
}

module.exports = {
  externals: {
    path: PATH,
  },
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  optimization: {
    mergeDuplicateChunks: true,
    // providedExports: true,
    // usedExports: true,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {},
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          },
          esModule: false
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': PATH.src,
      '@dev': PATH.dev,
      '/': PATH.public,
      'vue': 'vue'
    },
    extensions: ['*', '.js', '.json', '.vue', '.ts']
  },
  node: {
    global: false,
    // fs: 'empty'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'css/chunk.[name].[hash].css',
    }),
    new VueLoaderPlugin()
  ],
}
