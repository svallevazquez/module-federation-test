const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'auto',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		alias: {
			'@atoms': path.resolve(__dirname, 'src/atoms/'),
			'@components': path.resolve(__dirname, 'src/components/'),
			'@hooks': path.resolve(__dirname, 'src/hooks/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@customTypes': path.resolve(__dirname, 'src/types/'),
			'@stores': path.resolve(__dirname, 'src/stores/'),
			'@apiSdk': path.resolve(__dirname, 'src/apiSdk/'),
			'@pages': path.resolve(__dirname, 'src/pages/'),
			'@graphql': path.resolve(__dirname, 'src/graphql/'),
			'@formUtils': path.resolve(__dirname, 'src/form/'),
			'@errorClasses': path.resolve(__dirname, 'src/ErrorClasses/'),
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@mocks': path.resolve(__dirname, 'src/__mocks__/'),
			'@context': path.resolve(__dirname, 'src/context/'),
			'@constants': path.resolve(__dirname, 'src/constants/'),
			'@': path.resolve(__dirname, 'src/'),
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
							[
								'@babel/preset-react',
								{
									runtime: 'automatic',
								},
							],
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.module\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]',
								namedExport: false,
								exportLocalsConvention: 'asIs',
							},
							importLoaders: 1,
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.css$/i,
				exclude: /\.module\.css$/i,
				use: [
					'style-loader',
					'css-loader',
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
				use: [
					{
						loader: 'json-loader',
					},
				],
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
			name: 'app2',
			filename: 'remoteEntry.js',
			shared: {
				'react': {
					singleton: true,
					requiredVersion: '18.3.1',
				},
				'react-dom': {
					singleton: true,
					requiredVersion: '18.3.1',
				},
				'antd': {
					singleton: true,
					requiredVersion: false,
				},
				'react-router': {
					singleton: true,
					requiredVersion: false,
				},
			},
			exposes: {
				'./routes': './src/constants/routes/index.ts',
				'./manifest': './src/microfrontends-manifest.ts',
			},
		}),
	],
	performance: {
		hints: false,
	},
};
