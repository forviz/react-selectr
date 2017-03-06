var path = require('path');
var webpack = require('webpack');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  // devtool: 'source-map',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    bundle: [
      // necessary for hot reloading with IE:
      'babel-polyfill',
      'eventsource-polyfill',
      'react-hot-loader/patch',
      // listen to code updates emitted by hot middleware:
      'webpack-hot-middleware/client',
      './example/app',
    ],
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(`${process.env.NODE_ENV}`),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      // {
      //   test: /\.(woff2?|ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'url-loader',
      // },
    ],
  },
  // module: {
  //   loaders: [
  //     { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/, include: __dirname },
  //     { test: /\.scss$/, loader: 'style!css?sourceMap!sass?sourceMap&sourceComments' },
  //     { test: /\.css$/, loaders: ['style-loader', 'css-loader?sourceMap'] },
  //   ],
  // },
  resolve: {
    alias: {
      'react-selectr': path.join(__dirname, 'src')
    },
    extensions: ['.js']
  },
};
