const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyPlugin = require('copy-webpack-plugin');

var config = {
  entry: {
    'app': './src/js/app.js',
    'editor': './src/js/editor.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [
          path.resolve(__dirname, 'src/fonts')
        ],
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            publicPath: '../fonts/',
            name: '[hash].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: [
          path.resolve(__dirname, 'src/fonts')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]'
            },
          },
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
    new CopyPlugin([
      {
        from: 'node_modules/svgxuse/svgxuse.min.js',
        to: 'js/svgxuse.min.js'
      }
    ])
  ]
};

module.exports = (env, argv) => {
  if (argv.mode !== 'production') {
    config.devtool = 'source-map';
  }

  return config;
};
