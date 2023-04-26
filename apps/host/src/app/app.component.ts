import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateAdapter } from '@angular/material/core';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import { UI_DATE_FORMATS, UiDateFormats } from '@ui-frontend-service/shared/feature/common-date-options';
import { UiCommonVersionService } from '@ui-frontend-service/shared/feature/common-services';
import { UiVersion } from '@ui-frontend-service/shared/ui/components/version';
import { UiLayoutTemplateService } from '@ui-frontend-service/shared/ui/dom-layout';
import { map, Observable } from 'rxjs';
import { UI_HOST_ENVIRONMENT, UiHostEnvironment } from './core/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-host-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHostAppComponent implements OnInit {
  /** Observable that emits the currently registered versions. */
  versions$?: Observable<UiVersion[]>;

  /** Observable that emits the current user, when logged in. */
  user$ = this._globalStateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  private _topRightMenuTemplate?: TemplateRef<unknown>;

  set topRightMenuTemplate(templateRef: TemplateRef<unknown> | undefined) {
    this._layoutTemplateService.registerTopRightMenu(templateRef);
    this._topRightMenuTemplate = templateRef;
  }

  /** Template reference to the top-right menu. */
  @ViewChild('topRightMenu', { read: TemplateRef })
  get topRightMenuTemplate(): TemplateRef<unknown> | undefined {
    return this._topRightMenuTemplate;
  }

  constructor(
    @Inject(UI_HOST_ENVIRONMENT) private _env: UiHostEnvironment,
    @Inject(UI_DATE_FORMATS) private _dateFormats: UiDateFormats,
    private _versionService: UiCommonVersionService<UiVersion>,
    private _authService: UiAuthenticationDataAccessService,
    private _bottomSheet: MatBottomSheet,
    private _layoutTemplateService: UiLayoutTemplateService,
    private _dateAdapter: DateAdapter<Date>,
    private _globalStateService: UiGlobalStateDataAccessService,
    private _router: Router
  ) {}

  /** Opens the bottom-sheet with the versions component. */
  openBottomSheet(): void {
    const { applicationBuildDate } = this._env;
    const dateFormat = `${this._dateFormats.display.dateInput} ${this._dateFormats.display.timeInput}`;
    const buildDate = this._dateAdapter.parse(applicationBuildDate, dateFormat);
    this._bottomSheet.open(UiHostVersionBottomSheetComponent, {
      data: {
        versions: this._versionService.getVersions(),
        buildDate: 'Build date: ' + (buildDate ? this._dateAdapter.format(buildDate, dateFormat) : undefined),
      },
    });
  }

  /**
   * Logs out the user and navigates back to the login.
   */
  handleLogoutClick(): void {
    this._authService.logout();
    void this._router.navigate(['./login']);
  }

  ngOnInit(): void {
    this.versions$ = this._versionService.getVersions$();

    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();
  }
}

@Component({
  template: ` <ui-version [uiVersions]="data.versions">{{ data.buildDate }}</ui-version> `,
})
export class UiHostVersionBottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { versions: UiVersion[]; buildDate: string }) {}
}
