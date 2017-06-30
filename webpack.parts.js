const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

exports.generateIndexHTML = function(options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
        template: require('html-webpack-template'),
        appMountId: 'app',
        inject: false
      })
    ]
  };
};

exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      quiet: true,
      // stats: 'errors-only',
      host: options.host,
      port: options.port,
      contentBase: 'src'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({}),
      new FriendlyErrorsWebpackPlugin()
    ]
  };
};

exports.lintJavaScript = function({ paths, options }) {
  return {
    module: {
      rules: [
        {
          test: /\.jsx$/,
          include: paths,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: options
        }
      ]
    }
  };
};

exports.loadCSS = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          // Restrict extraction process to the given
          // paths.
          include: paths,
          exclude: [ 'node_modules' ],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: function() {
                  // autoprefixer with cssnext:
                  //(default: browserslist default > 1%, last 2 versions, Firefox ESR, Opera 12.1)
                  return [ require('cssnext'), require('precss') ];
                }
              }
            }
          ]
        }
      ]
    }
  };
};

exports.extractCSS = function(paths) {
  return {
    module: {
      rules: [
        // Extract CSS during build
        {
          test: /\.css$/,
          // Restrict extraction process to the given
          // paths.
          include: paths,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          })
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[contenthash].css')
    ]
  };
};

exports.lintCSS = function(paths, rules) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          enforce: 'pre',
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: function() {
              return [
                require('stylelint')({
                  rules: { rules },
                  // Ignore node_modules CSS
                  ignoreFiles: 'node_modules/**/*.css'
                })
              ];
            }
          }
        }
      ]
    }
  };
};

exports.generateSourcemaps = function(type) {
  return { devtool: type };
};

exports.extractBundles = function(bundles, options) {
  const entry = {};
  const names = [];

  // Set up entries and names.
  bundles.forEach(({ name, entries }) => {
    if (entries) {
      entry[name] = entries;
    }

    names.push(name);
  });

  return {
    // Define an entry point needed for splitting.
    entry,
    plugins: [
      // Extract bundles.
      new webpack.optimize.CommonsChunkPlugin(
        Object.assign({}, options, { names })
      )
    ]
  };
};

exports.loadJavaScript = function(paths) {
  return {
    module: {
      rules: [
        { test: /\.jsx$/, exclude: /node_modules/, use: 'babel-loader' }
      ]
    }
  };
};

exports.loadTypescript = function(path, reactHotLoader = false) {
  let loaders = [ 'awesome-typescript-loader' ];

  if (reactHotLoader) {
    loaders.unshift('react-hot-loader/webpack');
  }

  return {
    module: {
      rules: [
        {
          test: /\.tsx$/,
          include: path,
          use: loaders,
          exclude: [ /\.(spec|e2e|d)\.tsx$/ ]
        }
      ]
    }
  };
};

exports.clean = function(path) {
  return { plugins: [ new CleanWebpackPlugin([ path ]) ] };
};

exports.minifyJavaScript = function({ useSourceMap }) {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: useSourceMap,
        compress: { warnings: false }
      })
    ]
  };
};

exports.setFreeVariable = function(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return { plugins: [ new webpack.DefinePlugin(env) ] };
};

exports.lintTypescript = function({ paths, options }) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx$/,
          include: paths,
          enforce: 'pre',
          loader: 'tslint-loader'
        }
      ]
    }
  };
};
