import { APP_INITIALIZER, NgModule } from '@angular/core';
import { UiContactEnvironmentLoaderService } from './conf';
import { HttpClientModule } from '@angular/common/http';
import { UiToastrModule } from '@ui-frontend-service/shared/ui/toastr';
import { UiDateModule } from '@ui-frontend-service/shared/feature/common-date-options';
import {
  UI_APPLICATION_NAME,
  UI_BASE_ENVIRONMENT,
  UiMaterialOptionsModule,
} from '@ui-frontend-service/shared/feature/common-options';
import { UI_LAYOUT_CONFIG, UI_LAYOUT_NAVIGATION_CONFIG, UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import {
  UiCommonJwtService,
  UiCommonVersionService,
  UiEnvironmentLoaderService,
} from '@ui-frontend-service/shared/feature/common-services';
import { layoutOptionsFactory, remoteEnvironmentFactory } from './factories';
import { UI_CONTACT_NATIVE_ENVIRONMENT } from './tokens';
import { UI_CONTACT_NAVIGATION } from './navigation';
import { UI_LOGGER_LEVEL, UiLoggerModule } from '@ui-frontend-service/shared/feature/logger';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UI_REDUCE_QUERY_OPTIONS,
  UiGraphQLClientInMemoryCache,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
  UiGraphQLEnvironmentLoaderService,
  UiReduceQueryOptions,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UI_CONTACT_APP_NAME } from '../app-config.const';
import { environment, UI_CONTACT_ENVIRONMENT, UiContactEnvironment } from './environment';
import { UI_CONTACT_APP_TYPE_POLICIES } from './policies';

const commonServices = [UiCommonVersionService, UiCommonJwtService];

@NgModule({
  imports: [
    HttpClientModule,
    UiToastrModule.forRoot(),
    UiDateModule,
    UiMaterialOptionsModule,
    UiLoggerModule.forRoot(),
    UiLayoutModule.forRoot(),
    UiGraphQLClientOptionsModule.withConfig('contact-native-app', {
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
    { provide: UI_CONTACT_NATIVE_ENVIRONMENT, useValue: true },
    { provide: UiEnvironmentLoaderService, useClass: UiContactEnvironmentLoaderService },
    { provide: UiGraphQLEnvironmentLoaderService, useExisting: UiEnvironmentLoaderService },
    {
      provide: UI_LAYOUT_CONFIG,
      useFactory: layoutOptionsFactory,
    },
    {
      provide: UI_LAYOUT_NAVIGATION_CONFIG,
      useValue: UI_CONTACT_NAVIGATION,
    },
    {
      provide: UI_APPLICATION_NAME,
      useValue: UI_CONTACT_APP_NAME,
    },
    {
      provide: UI_CONTACT_ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: UI_BASE_ENVIRONMENT,
      useExisting: UI_CONTACT_ENVIRONMENT,
    },
    {
      provide: UI_LOGGER_LEVEL,
      useFactory: (env: UiContactEnvironment) => env.logLevel,
      deps: [UI_CONTACT_ENVIRONMENT],
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
        typePolicies: UI_CONTACT_APP_TYPE_POLICIES,
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
export class UiContactCoreModule {}
