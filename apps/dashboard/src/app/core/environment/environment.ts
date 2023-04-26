import { UiDashboardEnvironment } from './environment.type';
import { UI_CONTACT_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/contact/data-access';
import { UiLogLevel } from '@ui-frontend-service/shared/feature/logger';
import { UI_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/shared/data-access';
import { UI_SALES_DATA_ACCESS_SERVICE_PROVIDERS } from '@ui-frontend-service/sales/data-access';

const dataAccessProviders = [
  ...UI_CONTACT_DATA_ACCESS_SERVICE_PROVIDERS,
  ...UI_SALES_DATA_ACCESS_SERVICE_PROVIDERS,
  ...UI_DATA_ACCESS_SERVICE_PROVIDERS,
];

export const environment: UiDashboardEnvironment = {
  production: false,
  applicationBuildDate: process.env['UI_DASHBOARD_APPLICATION_BUILD_DATE'],
  dataAccessProviders,
  connectToDevTools: true,
  logLevel: UiLogLevel.DEBUG,
};
