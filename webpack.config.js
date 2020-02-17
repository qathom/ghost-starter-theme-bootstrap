const path = require('path');
const ZipFilesPlugin = require('webpack-zip-files-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: './assets/js/theme.js',
  output: {
    path: path.resolve(__dirname, 'assets', 'dist'),
    filename: 'main.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // See postcss.config.js
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new MinifyPlugin(),
    new ZipFilesPlugin({
      entries: [
        // Assets
        { src: path.join(__dirname, './assets/dist'), dist: 'assets/dist' },
        { src: path.join(__dirname, './assets/screenshot-desktop.jpg'), dist: 'assets/screenshot-desktop.jpg' },
        // Handlebars
        { src: path.join(__dirname, './partials'), dist: 'partials' },
        { src: path.join(__dirname, './blog.hbs'), dist: 'blog.hbs' },
        { src: path.join(__dirname, './default.hbs'), dist: 'default.hbs' },
        { src: path.join(__dirname, './home.hbs'), dist: 'home.hbs' },
        { src: path.join(__dirname, './index.hbs'), dist: 'index.hbs' },
        { src: path.join(__dirname, './page.hbs'), dist: 'page.hbs' },
        { src: path.join(__dirname, './post.hbs'), dist: 'post.hbs' },
        // Main
        { src: path.join(__dirname, './LICENSE'), dist: 'LICENSE' },
        { src: path.join(__dirname, './package.json'), dist: 'package.json' },
        { src: path.join(__dirname, './README.md'), dist: 'README.md' },
      ],
      output: path.join(__dirname, 'theme'),
      format: 'zip',
    }),
  ],
};
