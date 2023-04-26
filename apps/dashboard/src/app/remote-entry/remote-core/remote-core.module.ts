import { Injectable, NgModule, OnDestroy } from '@angular/core';
import { environment, UI_DASHBOARD_ENVIRONMENT } from '../../core/environment';
import { UiCommonVersionService } from '@ui-frontend-service/shared/feature/common-services';
import { UiVersion } from '@ui-frontend-service/shared/ui/components/version';
import { UI_DASHBOARD_APP_NAME } from '../../app-config.const';
import { UI_APPLICATION_NAME, UI_BASE_ENVIRONMENT } from '@ui-frontend-service/shared/feature/common-options';
import Chart from 'chart.js/auto';

Chart.defaults.color = '#fff';

@Injectable()
export class UiDashboardRemoteSetupService implements OnDestroy {
  constructor(private _versionService: UiCommonVersionService<UiVersion>) {}

  /** The registered version. */
  private _versions: UiVersion[] = [];

  /**
   * Register the needed configuration for the given services.
   * @param versions The array of versions to register.
   */
  start(versions: UiVersion[]): void {
    this._versionService.register(versions);
    this._versions = versions;
  }

  /**
   * Unregister the registered application-version.
   */
  unregisterVersion(): void {
    this._versionService.unregister(this._versions, (a) => a.name);
  }

  ngOnDestroy(): void {
    this.unregisterVersion();
  }
}

@NgModule({
  providers: [
    { provide: UI_DASHBOARD_ENVIRONMENT, useValue: environment },
    { provide: UI_BASE_ENVIRONMENT, useExisting: UI_DASHBOARD_ENVIRONMENT },
    {
      provide: UI_APPLICATION_NAME,
      useValue: UI_DASHBOARD_APP_NAME,
    },
  ],
})
export class UiDashboardRemoteCoreModule {}
