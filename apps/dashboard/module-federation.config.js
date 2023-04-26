/** These libraries throw an error, when being shared. */
const apolloLibraries = new Set(['@apollo/client/core', '@apollo/client/link/batch', '@apollo/client/link/error']);

/**
 * Libraries that produce an error, when shared through the application.
 * @type {Set<string>}
 */
const notShareableLibraries = new Set([...apolloLibraries]);

module.exports = {
  name: 'dashboard',
  exposes: {
    './ContactWidget': 'apps/dashboard/src/app/remote-entry/contact/contact.module.ts',
    './SalesWidget': 'apps/dashboard/src/app/remote-entry/sales/sales.module.ts',
    './AddressWidget': 'apps/dashboard/src/app/remote-entry/address/address.module.ts',
    './PersonWidget': 'apps/dashboard/src/app/remote-entry/person/person.module.ts',
    './UserWidget': 'apps/dashboard/src/app/remote-entry/user/user.module.ts',
    './InvoiceWidget': 'apps/dashboard/src/app/remote-entry/invoice/invoice.module.ts',
    './ContractWidget': 'apps/dashboard/src/app/remote-entry/contract/contract.module.ts',
    './ContactListWidget': 'apps/dashboard/src/app/remote-entry/contact-list/contact-list.module.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (notShareableLibraries.has(libraryName)) {
      return false;
    }

    return defaultConfig;
  },
};
