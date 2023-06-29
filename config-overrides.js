const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    url: require.resolve('url/'),
    // crypto: require.resolve('crypto-browserify'),
    path: require.resolve("path-browserify"),
    utils: require.resolve("util/"),
    fs : false,
    os: require.resolve("os-browserify/browser")
    // http: require.resolve('stream-http'),
    // https: require.resolve('https-browserify'),
    // buffer: require.resolve('buffer'),
    // stream: require.resolve('stream-browserify'),
  };

  config.module.noParse = [/node_modules[/\\]sql\.js[/\\]dist[/\\]sql-wasm\.js$/];

//   config.plugins.push(
//     new webpack.ProvidePlugin({
//       process: 'process/browser',
//       Buffer: ['buffer', 'Buffer'],
//     }),
//   );

  return config;
}
