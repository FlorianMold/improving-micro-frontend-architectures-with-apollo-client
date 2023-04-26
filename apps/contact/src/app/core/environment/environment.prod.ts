import { UI_CONTACT_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/contact/data-access';
import { UiContactEnvironment } from './environment.type';
import { UiLogLevel } from '@ui-frontend-service/shared/feature/logger';
import { UI_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/shared/data-access';

const dataAccessProviders = [...UI_CONTACT_DATA_ACCESS_SERVICE_PROVIDERS, ...UI_DATA_ACCESS_SERVICE_PROVIDERS];

export const environment: UiContactEnvironment = {
  production: true,
  applicationBuildDate: process.env['UI_CONTACT_APPLICATION_BUILD_DATE'],
  dataAccessProviders,
  connectToDevTools: false,
  logLevel: UiLogLevel.INFO,
};
