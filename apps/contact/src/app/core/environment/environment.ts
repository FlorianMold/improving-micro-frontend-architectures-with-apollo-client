import { UiContactEnvironment } from './environment.type';
import { UI_CONTACT_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/contact/data-access';
import { UiLogLevel } from '@ui-frontend-service/shared/feature/logger';
import { UI_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/shared/data-access';

const production = false;

const dataAccessProviders = [...UI_CONTACT_DATA_ACCESS_SERVICE_PROVIDERS, ...UI_DATA_ACCESS_SERVICE_PROVIDERS];

export const environment: UiContactEnvironment = {
  production,
  applicationBuildDate: process.env['UI_CONTACT_APPLICATION_BUILD_DATE'],
  dataAccessProviders,
  connectToDevTools: true,
  logLevel: UiLogLevel.DEBUG,
};
