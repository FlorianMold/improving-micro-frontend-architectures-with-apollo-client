import { UiUserEnvironment } from './environment.type';
import { UiLogLevel } from '@ui-frontend-service/shared/feature/logger';
import { UI_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/shared/data-access';

const production = false;
const dataAccessProviders = [...UI_DATA_ACCESS_SERVICE_PROVIDERS];

export const environment: UiUserEnvironment = {
  production,
  applicationBuildDate: process.env['UI_USER_APPLICATION_BUILD_DATE'],
  dataAccessProviders,
  connectToDevTools: true,
  logLevel: UiLogLevel.DEBUG,
};
