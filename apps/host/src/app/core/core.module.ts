import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment, UI_HOST_ENVIRONMENT, UiHostEnvironment } from './environment';
import { UiHostEnvironmentLoaderService } from './conf';
import { UiDateModule } from '@ui-frontend-service/shared/feature/common-date-options';
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
import { UiToastrModule } from '@ui-frontend-service/shared/ui/toastr';
import {
  UI_APPLICATION_NAME,
  UI_BASE_ENVIRONMENT,
  UiMaterialOptionsModule,
} from '@ui-frontend-service/shared/feature/common-options';
import { HttpClientModule } from '@angular/common/http';
import { UI_LAYOUT_CONFIG, UI_LAYOUT_NAVIGATION_CONFIG, UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import {
  UiCommonJwtService,
  UiCommonVersionService,
  UiEnvironmentLoaderService,
} from '@ui-frontend-service/shared/feature/common-services';
import { UiVersion } from '@ui-frontend-service/shared/ui/components/version';
import { APPLICATION_VERSIONS } from './version';
import { layoutOptionsFactory, remoteEnvironmentFactory } from './factories';
import { UI_HOST_NAVIGATION } from './navigation/navigation-nodes.const';
import { UI_LOGGER_LEVEL, UiLoggerModule } from '@ui-frontend-service/shared/feature/logger';
import { UI_HOST_APP_NAME } from '../app-config.const';
import { ReactiveFormsModule } from '@angular/forms';
import { UI_HOST_APP_TYPE_POLICIES } from './policies';

const commonServices = [UiCommonVersionService, UiCommonJwtService];

@NgModule({
  imports: [
    HttpClientModule,
    UiDateModule,
    UiToastrModule.forRoot(),
    UiMaterialOptionsModule,
    UiLoggerModule.forRoot(),
    UiLayoutModule.forRoot(),
    UiGraphQLClientOptionsModule.withConfig('host-native-app', {
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
    { provide: UI_HOST_ENVIRONMENT, useValue: environment },
    { provide: UI_BASE_ENVIRONMENT, useExisting: UI_HOST_ENVIRONMENT },
    { provide: UiEnvironmentLoaderService, useClass: UiHostEnvironmentLoaderService },
    { provide: UiGraphQLEnvironmentLoaderService, useExisting: UiEnvironmentLoaderService },
    {
      provide: UI_LAYOUT_CONFIG,
      useFactory: layoutOptionsFactory,
    },
    {
      provide: UI_LAYOUT_NAVIGATION_CONFIG,
      useValue: UI_HOST_NAVIGATION,
    },
    {
      provide: UI_APPLICATION_NAME,
      useValue: UI_HOST_APP_NAME,
    },
    {
      provide: UI_LOGGER_LEVEL,
      useFactory: (env: UiHostEnvironment) => env.logLevel,
      deps: [UI_HOST_ENVIRONMENT],
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
        typePolicies: UI_HOST_APP_TYPE_POLICIES,
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
  exports: [ReactiveFormsModule],
})
export class UiHostCoreModule {
  constructor(private _versionService: UiCommonVersionService<UiVersion>) {
    this._versionService.register(APPLICATION_VERSIONS);
  }
}
