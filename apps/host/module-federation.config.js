/** These libraries throw an error, when being shared. */
const apolloLibraries = new Set(['@apollo/client/core', '@apollo/client/link/batch', '@apollo/client/link/error']);

/**
 * Libraries that produce an error, when shared through the applications.
 * @type {Set<string>}
 */
const notShareableLibraries = new Set([...apolloLibraries]);

module.exports = {
  name: 'host',
  remotes: [],
  shared: (libraryName, defaultConfig) => {
    if (notShareableLibraries.has(libraryName)) {
      return false;
    }

    return defaultConfig;
  },
};
