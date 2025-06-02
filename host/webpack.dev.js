const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const PORT = 3000;

module.exports = merge(
	common({ isDev: true }),
	{
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			allowedHosts: 'all',
			host: '0.0.0.0',
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
	}
);
