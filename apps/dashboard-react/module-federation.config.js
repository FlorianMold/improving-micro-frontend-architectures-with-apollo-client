// @ts-check

/**
 * @type {import("@nrwl/react/src/module-federation/models").ModuleFederationConfig}
 **/
const moduleFederationConfig = {
  name: 'dashboard-react',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

module.exports = moduleFederationConfig;
