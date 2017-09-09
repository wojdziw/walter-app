/* eslint-disable */


const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const config = require('./config/shared.webpack.config.js');
const vendorConfig = require('./config/vendor.webpack.config.js');

const isDevelopment = process.env.NODE_ENV === 'development'
const enableOfflinePlugin = false
const isOffline = enableOfflinePlugin && !isDevelopment

const outputPath = path.join(__dirname, 'build')
const publicPath = '/web/build'


const addAssetHtmlFiles = Object.keys(vendorConfig.entry).map((name) => {
  const fileGlob = `${name}*.dll.js`
  const paths = glob.sync(path.join(vendorConfig.output.path, fileGlob))
  if (paths.length === 0) throw new Error(`Could not find ${fileGlob}!`)
  if (paths.length > 1) throw new Error(`Too many files for ${fileGlob}! You should clean and rebuild.`)
  return {
    filepath: require.resolve(paths[0]),
    includeSourcemap: false,
    outputPath: 'js/vendor',
    publicPath: '/web/build/js/vendor',
  }
})

const plugins = [
  ...Object.keys(vendorConfig.entry).map(name =>
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.join(vendorConfig.output.path, `${name}-manifest.json`)),
    })
  ),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    '__DEV__': isDevelopment,
    '__OFFLINE__': isOffline,
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'web/templates/index.ejs',
  }),
  new AddAssetHtmlPlugin(addAssetHtmlFiles),
  new CopyWebpackPlugin([
    // Workaround for AddAssetHtmlPlugin not copying compressed .gz files
    { context: 'web/vendor/', from: '*.js.gz', to: 'js/vendor/' },
  ]),

  // Split out any remaining node modules
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor/lib',
    minChunks: module => module.context && module.context.indexOf('node_modules/') !== -1,
  }),

  ...(isDevelopment ? [] : [
    ...config.productionPlugins,

    // Add any app-specific production plugins here.
  ])
]

// If offline plugin is enabled, it has to come last.
if (isOffline) plugins.push(new OfflinePlugin())

module.exports = {
  devServer: {
    contentBase: outputPath,
  },
  entry: {
    app: path.join(__dirname, '../index.web.js')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // TODO: Set up react-hot-loader during development.
        loaders: [ 'babel-loader?cacheDirectory=true' ],
      },
      ...config.loaders,
    ]
  },
  output: {
    path: outputPath,
    filename: 'js/[name]-[hash:16].js',
    publicPath: publicPath,
  },
  plugins: plugins,
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
    extensions: [".web.js", ".js", ".json"]
  }
};
