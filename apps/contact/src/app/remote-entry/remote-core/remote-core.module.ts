import { Inject, Injectable, NgModule, OnDestroy, Optional } from '@angular/core';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UiLayoutNavigationService } from '@ui-frontend-service/shared/ui/dom-layout';
import { UiCommonVersionService } from '@ui-frontend-service/shared/feature/common-services';
import { UiVersion } from '@ui-frontend-service/shared/ui/components/version';
import { environment, UI_CONTACT_ENVIRONMENT } from '../../core/environment';
import { UI_CONTACT_NAVIGATION } from '../../core/navigation';
import { UI_CONTACT_NATIVE_ENVIRONMENT } from '../../core/tokens';
import { APPLICATION_VERSIONS } from '../../core/version';
import { UI_CONTACT_APP_NAME } from '../../app-config.const';
import { UI_APPLICATION_NAME, UI_BASE_ENVIRONMENT } from '@ui-frontend-service/shared/feature/common-options';
import { UI_CONTACT_APP_TYPE_POLICIES } from '../../core/policies';

@Injectable()
export class UiContactRemoteSetupService implements OnDestroy {
  constructor(
    private _versionService: UiCommonVersionService<UiVersion>,
    private _layoutNavigationService: UiLayoutNavigationService,
    @Inject(UI_CONTACT_NATIVE_ENVIRONMENT) @Optional() private _isNative?: boolean
  ) {}

  /**
   * Register the needed configuration for the given services.
   */
  start() {
    this._versionService.register(APPLICATION_VERSIONS);

    /** Register a second toolbar-row, when the app is contained inside a host-application. */
    if (!this._isNative && UI_CONTACT_NAVIGATION.topNodes.length > 0) {
      this._layoutNavigationService.registerSecondToolbarRowNavigationNodes(UI_CONTACT_NAVIGATION.topNodes);
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
    UiGraphQLClientOptionsModule.withConfig('contact-remote-app', {
      provideGraphQLClientOptions: true,
    }),
  ],
  providers: [
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
      provide: UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
      useValue: {
        shareCache: true,
        persistCache: false,
        useTypePolicies: true,
        typePolicies: UI_CONTACT_APP_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiContactRemoteCoreModule {}
