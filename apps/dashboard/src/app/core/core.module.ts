import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UiDateModule } from '@ui-frontend-service/shared/feature/common-date-options';
import {
  UI_APPLICATION_NAME,
  UI_BASE_ENVIRONMENT,
  UiMaterialOptionsModule,
} from '@ui-frontend-service/shared/feature/common-options';
import { UI_LOGGER_LEVEL, UiLoggerModule } from '@ui-frontend-service/shared/feature/logger';
import { UiDashboardEnvironmentLoaderService } from './conf';
import { remoteEnvironmentFactory } from './factories';
import { UI_DASHBOARD_NATIVE_ENVIRONMENT } from './tokens';
import {
  UI_REDUCE_QUERY_OPTIONS,
  UI_GRAPHQL_CLIENT_CACHE,
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientInMemoryCache,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
  UiGraphQLEnvironmentLoaderService,
  UiReduceQueryOptions,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UI_DASHBOARD_APP_NAME } from '../app-config.const';
import { environment, UI_DASHBOARD_ENVIRONMENT, UiDashboardEnvironment } from './environment';
import { UI_DASHBOARD_APP_TYPE_POLICIES } from './policies';
import {
  UiCommonJwtService,
  UiCommonVersionService,
  UiEnvironmentLoaderService,
} from '@ui-frontend-service/shared/feature/common-services';

const commonServices = [UiCommonVersionService, UiCommonJwtService];

@NgModule({
  imports: [
    HttpClientModule,
    UiDateModule,
    UiMaterialOptionsModule,
    UiLoggerModule.forRoot(),
    UiGraphQLClientOptionsModule.withConfig('dashboard-native-app', {
      provideGraphQLClientOptions: true,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: remoteEnvironmentFactory,
      multi: true,
      deps: [UiEnvironmentLoaderService],
    },
    { provide: UI_DASHBOARD_NATIVE_ENVIRONMENT, useValue: true },
    { provide: UiEnvironmentLoaderService, useClass: UiDashboardEnvironmentLoaderService },
    { provide: UiGraphQLEnvironmentLoaderService, useExisting: UiEnvironmentLoaderService },
    {
      provide: UI_APPLICATION_NAME,
      useValue: UI_DASHBOARD_APP_NAME,
    },
    { provide: UI_DASHBOARD_ENVIRONMENT, useValue: environment },
    { provide: UI_BASE_ENVIRONMENT, useExisting: UI_DASHBOARD_ENVIRONMENT },
    {
      provide: UI_LOGGER_LEVEL,
      useFactory: (env: UiDashboardEnvironment) => env.logLevel,
      deps: [UI_DASHBOARD_ENVIRONMENT],
    },
    {
      provide: UI_GRAPHQL_CLIENT_CACHE,
      useValue: new UiGraphQLClientInMemoryCache(),
    },
    {
      provide: UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
      useValue: {
        shareCache: true,
        persistCache: false,
        useTypePolicies: true,
        typePolicies: UI_DASHBOARD_APP_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
    {
      provide: UI_REDUCE_QUERY_OPTIONS,
      useValue: {
        reduceQueries: true,
      } as UiReduceQueryOptions,
    },
    ...commonServices,
    ...environment.dataAccessProviders,
  ],
})
export class UiDashboardCoreModule {}
