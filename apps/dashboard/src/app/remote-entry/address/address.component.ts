import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { ADDRESS_WIDGET_VERSION } from '../../core/version';
import {
  UiContactDataAccessEmailTypeService,
  UiContactDataAccessSalutationService,
} from '@ui-frontend-service/contact/data-access';
import { map } from 'rxjs/operators';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';

@Component({
  selector: 'ui-dashboard-address-widget',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [UiDashboardRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntryAddressComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _emailTypeService = inject(UiContactDataAccessEmailTypeService);
  private _salutationService = inject(UiContactDataAccessSalutationService);

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /** The currently authenticated user. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));
  emailTypes$ = this._emailTypeService.allEmailTypes().pipe(map((data) => data.allEmailTypes));
  salutations$ = this._salutationService.allSalutations().pipe(map((data) => data.allSalutations));

  constructor(@Optional() remoteSetupService?: UiDashboardRemoteSetupService) {
    remoteSetupService?.start(ADDRESS_WIDGET_VERSION);
  }

  ngOnInit(): void {
    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();
  }
}
