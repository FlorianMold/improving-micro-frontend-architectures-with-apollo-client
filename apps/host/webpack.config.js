const { withModuleFederation } = require('@nrwl/angular/module-federation');
const config = require('./module-federation.config');
const { getClientEnvironment } = require('./client-environment');
const webpack = require('webpack');

// Taken from https://github.com/nrwl/nx/issues/10485
module.exports = withModuleFederation({
  ...config,
}).then((fromModuleFederation) => {
  return (config, context) => {
    config = fromModuleFederation(config, context);

    config.plugins.push(new webpack.DefinePlugin(getClientEnvironment(context.configuration)));

    return config;
  };
});
