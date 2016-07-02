'use strict';

const webpack = require('webpack');

module.exports = {
	// cache: true,  

 	entry: [
 		'bootstrap-webpack!./bootstrap.config.js',
 		'./src/js/app.js',
 	],

 	output: {
    path: './bin',
    filename: 'app.bundle.js',
    publicPath: 'bin/'
 	},

 	resolve: {
 		modulesDirectories: ['src', 'src/js', 'node_modules'],
 	},

 	module: {
 		loaders: [
    	{ test: /\.css$/, loader: 'style!css' },
    	{ test: /\.less$/, loader: 'style!css!less' },
    	{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
    	{ test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ],
  },

  plugins: [
  	// new webpack.optimize.UglifyJsPlugin(),
	]

};