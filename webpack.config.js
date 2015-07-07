var webpack  = require('webpack');
var path     = require('path');

var argv     = require('minimist')(process.argv.slice(2));     // replace with optimist ????????
var env      = argv.env || 'development';

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath       = path.resolve(__dirname, 'public', 'build');
var appPath         = path.resolve(__dirname, 'src', 'app');

var plugins = [
  new webpack.DefinePlugin({
    ENV : JSON.stringify(env),
    NODE_ENV: JSON.stringify(env)
  }),
  new webpack.HotModuleReplacementPlugin(),
  
  new webpack.NoErrorsPlugin()
];

var config = {
  
  entry: [
    'webpack-dev-server/client?http://localhost:3000', 
    'webpack/hot/dev-server', 
    path.resolve(appPath, 'index.js')
  ],
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src') },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jpe?g($|\?)|\.gif($|\?)|\.png($|\?)/i, loader: 'file-loader' },
   ]
  },
  
  plugins: plugins,
  
  devtool: 'eval-source-map'
 
};

module.exports = config;
