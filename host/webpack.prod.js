const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
	common({ isDev: false }),
	{
		mode: 'production',
		devtool: 'source-map',
	}
);
