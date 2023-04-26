import { APP_INITIALIZER, NgModule } from '@angular/core';
import { UiUserEnvironmentLoaderService } from './conf';
import { HttpClientModule } from '@angular/common/http';
import { UiToastrModule } from '@ui-frontend-service/shared/ui/toastr';
import { UiDateModule } from '@ui-frontend-service/shared/feature/common-date-options';
import {
  UI_APPLICATION_NAME,
  UI_BASE_ENVIRONMENT,
  UiMaterialOptionsModule,
} from '@ui-frontend-service/shared/feature/common-options';
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
import { UI_LAYOUT_CONFIG, UI_LAYOUT_NAVIGATION_CONFIG, UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import {
  UiCommonJwtService,
  UiCommonVersionService,
  UiEnvironmentLoaderService,
} from '@ui-frontend-service/shared/feature/common-services';
import { UI_LOGGER_LEVEL, UiLoggerModule } from '@ui-frontend-service/shared/feature/logger';
import { environment, UI_USER_ENVIRONMENT, UiUserEnvironment } from './environment';
import { UI_USER_NAVIGATION } from './navigation';
import { UI_USER_NATIVE_ENVIRONMENT } from './tokens';
import { UI_USER_APP_NAME } from '../app-config.const';
import { layoutOptionsFactory, remoteEnvironmentFactory } from './factories';
import { UI_USER_APP_TYPE_POLICIES } from './policies';

const commonServices = [UiCommonVersionService, UiCommonJwtService];

@NgModule({
  imports: [
    HttpClientModule,
    UiToastrModule.forRoot(),
    UiDateModule,
    UiMaterialOptionsModule,
    UiLoggerModule.forRoot(),
    UiLayoutModule.forRoot(),
    UiGraphQLClientOptionsModule.withConfig('user-native-app', {
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
    { provide: UI_USER_NATIVE_ENVIRONMENT, useValue: true },
    { provide: UiEnvironmentLoaderService, useClass: UiUserEnvironmentLoaderService },
    { provide: UiGraphQLEnvironmentLoaderService, useExisting: UiEnvironmentLoaderService },
    {
      provide: UI_LAYOUT_CONFIG,
      useFactory: layoutOptionsFactory,
    },
    {
      provide: UI_LAYOUT_NAVIGATION_CONFIG,
      useValue: UI_USER_NAVIGATION,
    },
    {
      provide: UI_APPLICATION_NAME,
      useValue: UI_USER_APP_NAME,
    },
    {
      provide: UI_USER_ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: UI_BASE_ENVIRONMENT,
      useExisting: UI_USER_ENVIRONMENT,
    },
    {
      provide: UI_LOGGER_LEVEL,
      useFactory: (env: UiUserEnvironment) => env.logLevel,
      deps: [UI_USER_ENVIRONMENT],
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
        typePolicies: UI_USER_APP_TYPE_POLICIES,
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
export class UiUserCoreModule {}
