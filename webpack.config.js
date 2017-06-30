const path = require('path');
const webpack = require('webpack');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, 'dist')
};

const common = merge([
  {
    output: { path: PATHS.dist, filename: '[name].js' },
    resolve: {
      alias: { Components: path.resolve(__dirname, 'src/components/') },
      extensions: [ '.js', '.ts', '.tsx' ]
    }
  },
  parts.generateIndexHTML()
]);

module.exports = function(env) {
  let config = {};
  if (env === 'production') {
    config = merge([
      common,
      {
        entry: { src: PATHS.src },
        output: {
          chunkFilename: 'scripts/[chunkhash].js',
          filename: '[name].[chunkhash].js'
        },
        plugins: [new webpack.HashedModuleIdsPlugin()]
      },
      parts.loadTypescript(PATHS.src),
      parts.setFreeVariable('process.env.NODE_ENV', 'production'),
      parts.generateSourcemaps('source-map'),
      parts.clean(PATHS.dist),
      parts.minifyJavaScript({ useSourceMap: true }),
      // parts.lintTypescript({ paths: PATHS.src }),
      parts.extractBundles([
        { name: 'vendor', entries: [ 'react' ] },
        { name: 'manifest' }
      ])
    ]);
  } else {
    config = merge([
      common,
      {
        entry: [ 'react-hot-loader/patch', PATHS.src ],
        plugins: [ new webpack.NamedModulesPlugin() ]
      },
      parts.loadTypescript(PATHS.src, true),
      parts.generateSourcemaps('eval-source-map'),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    ]);
  }
  return config;
};
