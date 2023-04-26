import { UiSalesEnvironment } from './environment.type';
import { UiLogLevel } from '@ui-frontend-service/shared/feature/logger';
import { UI_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/shared/data-access';
import { UI_SALES_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/sales/data-access';

const production = false;
const dataAccessProviders = [...UI_SALES_DATA_ACCESS_SERVICE_PROVIDERS, ...UI_DATA_ACCESS_SERVICE_PROVIDERS];

export const environment: UiSalesEnvironment = {
  production,
  applicationBuildDate: process.env['UI_SALES_APPLICATION_BUILD_DATE'],
  dataAccessProviders,
  connectToDevTools: true,
  logLevel: UiLogLevel.DEBUG,
};
