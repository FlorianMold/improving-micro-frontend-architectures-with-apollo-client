import { UiHostEnvironment } from './environment.type';
import { UiLogLevel } from '@ui-frontend-service/shared/feature/logger';
import { UI_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/shared/data-access';

const dataAccessProviders = [...UI_DATA_ACCESS_SERVICE_PROVIDERS];

export const environment: UiHostEnvironment = {
  production: true,
  applicationBuildDate: process.env['UI_HOST_APPLICATION_BUILD_DATE'],
  dataAccessProviders,
  connectToDevTools: false,
  logLevel: UiLogLevel.INFO,
};
