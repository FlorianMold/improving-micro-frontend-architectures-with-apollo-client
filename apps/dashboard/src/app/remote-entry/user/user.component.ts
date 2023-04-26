import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import {
  UiAuthenticationDataAccessService,
  UiGlobalStateDataAccessService,
  UiUserDataAccessService,
} from '@ui-frontend-service/shared/data-access';
import { map } from 'rxjs/operators';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { SALES_WIDGET_VERSION } from '../../core/version';

@Component({
  selector: 'ui-dashboard-user-widget',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntryUserComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _userService = inject(UiUserDataAccessService);

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /**
   * Get the current authenticated user.
   */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  /**
   * Load the most active users on the platform.
   */
  users$ = this._userService
    .allUsersSubset({ page: 0, perPage: 100, sortOrder: 'asc', sortField: 'email' })
    .pipe(map((data) => data.allUsers));

  constructor(@Optional() remoteSetupService?: UiDashboardRemoteSetupService) {
    remoteSetupService?.start(SALES_WIDGET_VERSION);
  }

  ngOnInit(): void {
    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();
  }
}
