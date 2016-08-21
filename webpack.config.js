const path = require('path');
const webpack = require('webpack');

var plugins = [
	// This plugin, checks all entry chunks if there are some chunks that are
	// required more than `minChunks` times they are moved to `name` chunk
	new webpack.optimize.CommonsChunkPlugin({
		name: 'common',
		minChunks: 2
	}),

	// You need to add the plugin ExtractTextPlugin to work here, since it's not a
	// loader, the parameter you pass to it is the name of the output file you
	// want to create.
	// Using a combination of inline css and extracted css you can implement the
	// critical CSS for a fast loading time and request less important styles
	// later.
	new ExtractTextPlugin('[name].css')
];

const config = {
	entry: {
		common: ['react', 'react-dom'],
		app: './client/js/App',
    polyfill: ['babel-polyfill']
	},
	output: {
		path: path.resolve(process.cwd(), 'public', 'scripts'),
		filename: '[name]-[hash:20].js',
		chunckFile: '[name]-[chunckhash:20].js',
		publicPath: '/scripts',
		libraryTarget: 'var'
	},
	plugins: plugins,
	module: {
		// You add query parameters if you want to pass some data to the loaders
		loaders: []
	}
};

module.exports = config;
