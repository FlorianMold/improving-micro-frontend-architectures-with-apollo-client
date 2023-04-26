const fs = require('fs');
const moduleFederationConfigPath = '../apps/host/src/assets/module-federation.manifest.json';
const moduleFederationConfig = require(moduleFederationConfigPath);

console.log('Current Module-Federations Configuration:');
console.log(moduleFederationConfig);

/**
 * Generates the module-federation for the given micro-frontends.
 *
 * @param contactServiceUrl The url for the contact-service.
 * @param salesServiceUrl The url for the sales-service.
 * @param dashboardServiceUrl The url for the dashboard-service.
 * @param userServiceUrl The url for the user-service.
 * @returns {{contact, sales}}
 */
function generateModuleFederationConfig(contactServiceUrl, salesServiceUrl, dashboardServiceUrl, userServiceUrl) {
  if (contactServiceUrl && salesServiceUrl && dashboardServiceUrl) {
    return {
      sales: salesServiceUrl,
      contact: contactServiceUrl,
      dashboard: dashboardServiceUrl,
      user: userServiceUrl,
    };
  } else {
    console.error('Please provide valid urls for every micro-frontend.');
    process.exit(1);
  }
}

const { UI_HOST_CONTACT_APP_URL, UI_HOST_SALES_APP_URL, UI_HOST_DASHBOARD_APP_URL, UI_HOST_USER_APP_URL } = process.env;

const moduleFederation = generateModuleFederationConfig(
  UI_HOST_CONTACT_APP_URL,
  UI_HOST_SALES_APP_URL,
  UI_HOST_DASHBOARD_APP_URL,
  UI_HOST_USER_APP_URL
);

fs.writeFile('./apps/host/src/assets/module-federation.manifest.json', JSON.stringify(moduleFederation), (err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log('New Module-Federation Configuration:');
    console.log(moduleFederation);
    console.log(`Wrote module-federation.manifest.json to "${moduleFederationConfigPath}"`);
  }
});
