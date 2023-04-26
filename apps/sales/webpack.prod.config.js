const { withModuleFederation } = require('@nrwl/angular/module-federation');
const config = require('./module-federation.config');
const { getClientEnvironment } = require('./client-environment');
const webpack = require('webpack');

module.exports = withModuleFederation({
  ...config,
  /*
   * Remote overrides for production.
   * Each entry is a pair of an unique name and the URL where it is deployed.
   *
   * e.g.
   * remotes: [
   *   ['app1', 'https://app1.example.com'],
   *   ['app2', 'https://app2.example.com'],
   * ]
   */
}).then((fromModuleFederation) => {
  return (config, context) => {
    config = fromModuleFederation(config, context);
    config.plugins.push(new webpack.DefinePlugin(getClientEnvironment(context.configuration)));

    return config;
  };
});
