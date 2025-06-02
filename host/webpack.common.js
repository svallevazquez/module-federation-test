const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getRemoteConnectionString = require('./get-remote-connection-string');

require('dotenv').config();

module.exports = ({ isDev }) => {
	const APP1_REMOTE_MICROFRONTEND_URL = process.env.APP1_REMOTE_MICROFRONTEND_URL;
	const APP2_REMOTE_MICROFRONTEND_URL = process.env.APP2_REMOTE_MICROFRONTEND_URL;
	const MODULE_SCSS_IMPORT_LOADERS = 2;

	// eslint-disable-next-line no-console
	console.log('App1 - Sales remote url:', APP1_REMOTE_MICROFRONTEND_URL);
	// eslint-disable-next-line no-console
	console.log('App2 - Vendors remote url:', APP2_REMOTE_MICROFRONTEND_URL);
	// eslint-disable-next-line no-console
	console.log('IsDev:', isDev);

	return {
		entry: './src/index.tsx',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: isDev ? '[name].js' : 'bundle.[contenthash].js',
			publicPath: '/',
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.jsx'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		module: {
			rules: [
				{
					test: /\.[jt]sx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								['@babel/preset-react', { runtime: 'automatic' }],
								'@babel/preset-typescript',
							],
						},
					},
				},
				{
					test: /\.module\.css$/i,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: isDev
										? '[path][name]__[local]'
										: '[hash:base64]',
									namedExport: false,
									exportLocalsConvention: 'asIs',
								},
								sourceMap: isDev,
								importLoaders: 1,
							},
						},
					],
				},
				{
					test: /\.module\.scss$/i,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: isDev
										? '[path][name]__[local]'
										: '[hash:base64]',
									namedExport: false,
									exportLocalsConvention: 'asIs',
								},
								sourceMap: isDev,
								importLoaders: MODULE_SCSS_IMPORT_LOADERS,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDev,
							},
						},
					],
				},
				{
					test: /\.css$/i,
					exclude: /\.module\.css$/i,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
					],
				},
				{
					test: /\.scss$/i,
					exclude: /\.module\.scss$/i,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDev,
							},
						},
					],
				},
				{
					test: /\.(png|jpe?g|gif|svg|eot|ttf|woff2?)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.json$/,
					type: 'javascript/auto',
					include: path.resolve(__dirname, 'src'),
					use: ['json-loader'],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: 'public/index.html',
			}),
			new Dotenv({
				systemvars: true,
			}),
			new ModuleFederationPlugin({
				name: 'host_application',
				filename: 'remoteEntry.js',
				remotes: {
					app1: getRemoteConnectionString(APP1_REMOTE_MICROFRONTEND_URL, 'app1'),
					app2: getRemoteConnectionString(APP2_REMOTE_MICROFRONTEND_URL, 'app2'),
					// app1: `app1@${APP1_REMOTE_MICROFRONTEND_URL}/remoteEntry.js`,
					// app2: `app2@${APP2_REMOTE_MICROFRONTEND_URL}/app2RemoteEntry.js`,
				},
				shared: {
					'react': { singleton: true, requiredVersion: '18.3.1' },
					'react-dom': { singleton: true, requiredVersion: '18.3.1' },
					'antd': { singleton: true, requiredVersion: false },
					'react-router': { singleton: true, requiredVersion: false },
				},
			}),
			new MiniCssExtractPlugin({
				filename: isDev ? '[name].css' : '[name].[contenthash].css',
				chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
			}),
		],

		optimization: {
			splitChunks: {
				chunks: 'all',
			},
		},
		performance: {
			hints: false,
		},
	};
};
