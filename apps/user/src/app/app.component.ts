import { ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import { Router } from '@angular/router';
import { UiLayoutTemplateService } from '@ui-frontend-service/shared/ui/dom-layout';
import { map } from 'rxjs';

@Component({
  selector: 'ui-user-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiUserAppComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _router = inject(Router);
  private _layoutTemplateService = inject(UiLayoutTemplateService);

  /** Observable that emits the current user, when logged in. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

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

  /**
   * Logs out the user and navigates back to the login.
   */
  handleLogoutClick(): void {
    this._authService.logout();
    void this._router.navigate(['./login']);
  }

  ngOnInit(): void {
    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();
  }
}
