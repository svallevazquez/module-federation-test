const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const PORT = 3001;

module.exports = merge(common, {
	mode: 'development',
	output: {
		filename: '[name].js',
	},
	devtool: 'inline-source-map',
	devServer: {
		host: '0.0.0.0',
		allowedHosts: 'all',
		watchFiles: ['src/**/*'],
		static: {
			directory: path.join(__dirname, 'public'),
		},
		historyApiFallback: true,
		compress: true,
		port: PORT,
		hot: true,
		open: false,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
	},
});
