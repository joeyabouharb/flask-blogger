const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
<<<<<<< HEAD
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
=======
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
>>>>>>> joey
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
<<<<<<< HEAD
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
=======
      { test: /\.(css|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
>>>>>>> joey
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  mode: 'development',
<<<<<<< HEAD
=======
  devServer: {
    historyApiFallback: true,
  },
>>>>>>> joey
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
<<<<<<< HEAD

=======
>>>>>>> joey
};
