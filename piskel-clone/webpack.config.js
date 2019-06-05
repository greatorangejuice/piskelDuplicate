const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|jp(e*)g|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: '.src//screens/canvas/images/[hash]-[name].[ext]',
        },
      }],
    },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'piskel-clone',
    template: './src/screens/canvas/index.html',
    meta: {
      viewport: 'width=device-width, initial-scale=1',
    },
  })],
};
