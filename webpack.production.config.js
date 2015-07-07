var Webpack = require('webpack');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));     // replace with optimist ????????
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var appPath = path.resolve(__dirname, 'src' );
var env = argv.env || 'development';

var plugins = [
  new webpack.DefinePlugin({
    ENV : JSON.stringify(env),
    NODE_ENV: JSON.stringify(env)
  }),
  new webpack.optimize.UglifyJsPlugin(
     {minimize: true, mangle: true, sourceMap: false}
  ),
  new webpack.NoErrorsPlugin()
];

var config = {
  
  entry: path.resolve(appPath, 'index.js'),
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },  
  
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  
  module: {
    loaders: [
     { test: /\.jsx?$/i, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src') },
     { test: /\.css$/i,  loader: 'style!css' },
     { test: /\.jpe?g($|\?)|\.gif($|\?)|\.png($|\?)/i, loader: 'file-loader' }

    ]
  },
  
  plugins: plugins,

  devtool: 'source-map'  
};

module.exports = config;
