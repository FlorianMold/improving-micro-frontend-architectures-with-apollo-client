import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { CONTACT_LIST_WIDGET_VERSION } from '../../core/version';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import { map } from 'rxjs/operators';
import { UiContactDataAccessContactService } from '@ui-frontend-service/contact/data-access';

@Component({
  selector: 'ui-dashboard-contact-list-widget',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [UiDashboardRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntryContactListComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _contactService = inject(UiContactDataAccessContactService);

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /** The currently authenticated user. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  /** Emits all contacts. */
  contactList$ = this._contactService
    .allContactsSubset({
      page: 0,
      perPage: 100,
      sortField: 'customer_number',
      sortOrder: 'asc',
    })
    .pipe(map((data) => data.allContacts));

  constructor(@Optional() remoteSetupService?: UiDashboardRemoteSetupService) {
    remoteSetupService?.start(CONTACT_LIST_WIDGET_VERSION);
  }

  ngOnInit(): void {
    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();
  }
}
