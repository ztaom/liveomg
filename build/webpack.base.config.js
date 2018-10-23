const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, '../src/assets')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name].[ext]?[hash]'
        }
      },
      {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
              limit: 1024,
              name: '[name].[ext]?[hash]'
          }
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true }
                },
                'stylus-loader'
              ],
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: {
                loader: 'css-loader',
                options: { minimize: true }
              }
            })
          : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less/,
        use: isProd
          ? ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: { minimize: true }
                },
                'less-loader'
              ]
            })
          : ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
          }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
}
