const path = require( "path" ),
		HtmlWebpackPlugin = require( "html-webpack-plugin" ),
		webpack = require( "webpack" );

const PATHS = {
	app : path.join( __dirname, "app" ),
	build : path.join( __dirname, "build" )
};



/**
 * Only doing the devConfig as we are not going into 
 * production :)
 */
const devConfig = {
	entry : {
		app : PATHS.app
	},
	output : {
		path : PATHS.build,
		filename : '[name].js'
	},
	devServer : {
		// hotOnly : true,
		stats : "errors-only",
		// overlay : {
		// 	errors : true,
		// 	warnings : true
		// },
		watchOptions : { // ubuntu specific
			aggregateTimeout : 300,
			poll : 100
		}
	},
	devtool : "inline-source-map",
	module : {
		rules : [
			{
				test : /\.js$/,
				enforce : "pre",
				use : [{
					loader : "eslint-loader",
					options : {
						emitWarning : true
					}
				}],
				include : PATHS.app
			},
			{
				test : /\.css$/,
				use : [ "style-loader",
						  "css-loader" ]
			},
			{
				test : /\.jsx?$/,
				use : [{
					loader : "babel-loader",
					options : {
						cacheDirectory : true
					}
				}],
				include : PATHS.app
			}
		]
	},
	plugins : [
		new HtmlWebpackPlugin({
			title : "Git User Search"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.WatchIgnorePlugin([
			path.join( __dirname, "node_modules" )
		])
	],
};

module.exports = function( env ){
	console.log( "env is...", env );
	return devConfig;
};