import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { CONTRACT_WIDGET_VERSION } from '../../core/version';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import { map } from 'rxjs/operators';
import { UiSalesDataAccessContractService } from '@ui-frontend-service/sales/data-access';

@Component({
  selector: 'ui-dashboard-contract-widget',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
  providers: [UiDashboardRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntryContractComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _contractService = inject(UiSalesDataAccessContractService);

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /** The currently authenticated user. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  /** Emits all contracts. */
  contracts$ = this._contractService
    .allContractsSubset({
      page: 0,
      perPage: 100,
      sortField: 'number',
      sortOrder: 'asc',
    })
    .pipe(map((data) => data.allContracts));

  constructor(@Optional() remoteSetupService?: UiDashboardRemoteSetupService) {
    remoteSetupService?.start(CONTRACT_WIDGET_VERSION);
  }

  ngOnInit(): void {
    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();
  }
}
