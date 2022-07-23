const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/',
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: path.join(__dirname, 'public')
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.wav$/i,
        type: 'asset/resource',
        generator: {
          filename: 'sounds/[name][ext]'
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: undefined
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.join('src', 'components'),
      pages: path.join('src', 'pages'),
      img: path.join('src', 'img')
    },
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[name].chunk.css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    }, process.env.NODE_ENV === 'production' ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    } : undefined),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'public'),
          globOptions: {
            ignore: ['**/*.html']
          }
        }
      ]
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/)
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    splitChunks: {
      chunks: 'all'
    }
  }
};
