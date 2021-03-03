var path = require("path");
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const env = dotenv.config().parsed;

var config = {
  entry: ["babel-polyfill", "main.js"],

  output: {
    path: __dirname,
    publicPath: '/dist/',
    filename: "index.js"
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.scss', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/index.html',
      chunks: ["app"],
      inject: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
    {
      test: /\.less$/,
      include: /styles/,
      loaders: [
        "less-loader"
      ]
    }
    ]
  },
  devServer: {
    port: 5000,
    publicPath: '/',
    historyApiFallback: true,
    // proxy:{
    //   '*/**':{
    //     target:{
    //       port:5000
    //     },
    //     secure: false
    //   }
    // }
  },
  node: {
    fs: "empty"
  }
}

module.exports = config;
