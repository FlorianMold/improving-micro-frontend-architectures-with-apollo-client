import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { INVOICE_WIDGET_VERSION } from '../../core/version';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import { map } from 'rxjs/operators';
import { UiSalesDataAccessInvoiceService } from '@ui-frontend-service/sales/data-access';

@Component({
  selector: 'ui-dashboard-invoice-widget',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [UiDashboardRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntryInvoiceComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _invoiceService = inject(UiSalesDataAccessInvoiceService);

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /** The currently authenticated user. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  /** Emits all invoices. */
  invoices$ = this._invoiceService
    .allInvoicesSubset({
      page: 0,
      perPage: 100,
      sortField: 'number',
      sortOrder: 'asc',
    })
    .pipe(map((data) => data.allInvoices));

  constructor(@Optional() remoteSetupService?: UiDashboardRemoteSetupService) {
    remoteSetupService?.start(INVOICE_WIDGET_VERSION);
  }

  ngOnInit(): void {
    /**
     * Try to log in the user automatically.
     * This is only possible if the user has a valid refresh token.
     */
    this._authService.populate();
  }
}
