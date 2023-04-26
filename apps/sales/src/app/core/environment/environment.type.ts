import { UiBaseEnvironment } from '@ui-frontend-service/shared/feature/common-options';
import { Provider } from '@angular/core';

export interface UiSalesEnvironment extends UiBaseEnvironment {
  /** Whether the application runs in production mode. */
  production: boolean;
  /** The build date of the application. */
  applicationBuildDate?: string;
  /** The providers used for injecting the data-access services. */
  dataAccessProviders: Provider[];
  /** Whether the application should connect to the graphql dev-tools. */
  connectToDevTools: boolean;
  /** The allowed level for the logger. */
  logLevel: number;
}
