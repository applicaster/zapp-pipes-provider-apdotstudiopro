var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, './bundle'),
    publicPath: '/',
    library: 'zappPipes',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'nosources-source-map',
};
