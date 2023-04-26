import { Inject, Injectable, NgModule, OnDestroy, Optional } from '@angular/core';
import { environment, UI_SALES_ENVIRONMENT } from '../../core/environment';
import { UiCommonVersionService } from '@ui-frontend-service/shared/feature/common-services';
import { UiVersion } from '@ui-frontend-service/shared/ui/components/version';
import { APPLICATION_VERSIONS } from '../../core/version';
import { UI_APPLICATION_NAME, UI_BASE_ENVIRONMENT } from '@ui-frontend-service/shared/feature/common-options';
import { UiLayoutNavigationService } from '@ui-frontend-service/shared/ui/dom-layout';
import { UI_SALES_NATIVE_ENVIRONMENT } from '../../core/tokens';
import { UI_SALES_NAVIGATION } from '../../core/navigation';
import { UI_SALES_APP_NAME } from '../../app-config.const';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UI_SALES_APP_TYPE_POLICIES } from '../../core/policies';

@Injectable()
export class UiSalesRemoteSetupService implements OnDestroy {
  constructor(
    private _versionService: UiCommonVersionService<UiVersion>,
    private _layoutNavigationService: UiLayoutNavigationService,
    @Inject(UI_SALES_NATIVE_ENVIRONMENT) @Optional() private _isNative: boolean
  ) {}

  /**
   * Register the needed configuration for the given services.
   */
  start() {
    this._versionService.register(APPLICATION_VERSIONS);

    /** Register a second toolbar-row, when the app is contained inside a host-application. */
    if (!this._isNative && UI_SALES_NAVIGATION.topNodes.length > 0) {
      this._layoutNavigationService.registerSecondToolbarRowNavigationNodes(UI_SALES_NAVIGATION.topNodes);
    }
  }

  /**
   * Unregister the registered application-version.
   */
  unregisterVersion() {
    this._versionService.unregister(APPLICATION_VERSIONS, (a) => a.name);
  }

  /**
   * Unregisters the second-toolbar row.
   */
  unregisterSecondToolbarRow() {
    if (!this._isNative) {
      this._layoutNavigationService.unregisterSecondToolbarRow();
    }
  }

  ngOnDestroy(): void {
    this.unregisterVersion();
    this.unregisterSecondToolbarRow();
  }
}

@NgModule({
  imports: [
    UiGraphQLClientOptionsModule.withConfig('sales-remote-app', {
      provideGraphQLClientOptions: true,
    }),
  ],
  providers: [
    {
      provide: UI_APPLICATION_NAME,
      useValue: UI_SALES_APP_NAME,
    },
    { provide: UI_SALES_ENVIRONMENT, useValue: environment },
    {
      provide: UI_BASE_ENVIRONMENT,
      useExisting: UI_SALES_ENVIRONMENT,
    },
    {
      provide: UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
      useValue: {
        shareCache: true,
        persistCache: false,
        useTypePolicies: true,
        typePolicies: UI_SALES_APP_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiSalesRemoteCoreModule {}
