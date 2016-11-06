var pkg = require('./package.json');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: false,
  entry: {
    vconsole : './src/loguploader.js'
  },
  output: {
    path: './dist',
    filename: 'vconsole-loguploader.min.js',
    library: 'vConsole-loguploader',
    libraryTarget: 'umd',
    umdNameDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.html$/, loader: 'html'
      },
      { 
        test: /\.js$/, loader: 'babel'
      },
      {
        test: /\.less$/, loader: 'style!css!less'
      }
    ]
  },
  htmlLoader: {
    ignoreCustomFragments: [/\{\{.*?}}/]
  },
  plugins: [
    new webpack.BannerPlugin([
        pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
        'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
        pkg.license +' license'
    ].join('\n'))
    ,new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]

};
