const hostPath = '../apps/host/src/assets/settings.json';
const contactPath = '../apps/contact/src/assets/settings.json';
const salesPath = '../apps/sales/src/assets/settings.json';
const dashboardPath = '../apps/dashboard/src/assets/settings.json';
const userPath = '../apps/user/src/assets/settings.json';

const fs = require('fs');
const hostSettings = require(hostPath);
const contactSettings = require(contactPath);
const salesSettings = require(salesPath);
const dashboardSettings = require(dashboardPath);
const userSettings = require(userPath);

/**
 * Environment variables that should be synced to settings in settings.json
 * @type {[{environmentName: string, settingsName: string}]}
 */
const settingsToSyncMap = [{ environmentName: 'GRAPHQL_URL', settingsName: 'graphQLEndpoint' }];

const apps = [
  { path: hostPath, currentSetting: hostSettings, prefix: 'UI_HOST', settingsToSync: settingsToSyncMap },
  { path: contactPath, currentSetting: contactSettings, prefix: 'UI_CONTACT', settingsToSync: settingsToSyncMap },
  { path: salesPath, currentSetting: salesSettings, prefix: 'UI_SALES', settingsToSync: settingsToSyncMap },
  { path: userPath, currentSetting: userSettings, prefix: 'UI_USER', settingsToSync: settingsToSyncMap },
  { path: dashboardPath, currentSetting: dashboardSettings, prefix: 'UI_DASHBOARD', settingsToSync: settingsToSyncMap },
];

apps.forEach((app) => {
  const shortPath = app.path.split('../')[1];
  printSettingJson(shortPath, app.currentSetting);

  console.log(`Syncing environment variables into ${shortPath}.`);

  const newSettings = applyNewSettings(app);
  writeSettingsFile(app.path, newSettings);

  console.log('New settings applied', newSettings, '\n');
});

/**
 * Writes the new settings to the given path.
 *
 * @param path The path of the new settings.
 * @param newSettings The new settings.
 */
function writeSettingsFile(path, newSettings) {
  const newPath = path.split('../')[1];
  fs.writeFileSync(newPath, JSON.stringify(newSettings, null, 2));
}

/**
 * Applies the new settings to the current-setting. Takes the values from the environment-variables.
 *
 * @param currentSetting The current settings.
 * @param prefix The prefix of the environment-variables.
 * @param settingsToSync The settings, that should be synced.
 * @returns {*}
 */
function applyNewSettings({ currentSetting, prefix, settingsToSync }) {
  const newSettings = { ...currentSetting };
  settingsToSync.forEach(({ settingsName, environmentName }) => {
    newSettings[settingsName] = process.env[`${prefix}_${environmentName}`];
  });
  return newSettings;
}

/**
 * Prints the settings.json for the given app.
 *
 * @param appPath Path to the settings.json
 * @param settings The settings.json
 */
function printSettingJson(appPath, settings) {
  console.log('App:', appPath, settings);
}
