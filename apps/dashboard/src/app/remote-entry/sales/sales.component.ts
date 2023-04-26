import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, Optional } from '@angular/core';
import { SALES_WIDGET_VERSION } from '../../core/version';
import { UiDashboardRemoteSetupService } from '../remote-core';
import { UiAuthenticationDataAccessService, UiGlobalStateDataAccessService } from '@ui-frontend-service/shared/data-access';
import { map } from 'rxjs/operators';
import {
  UiSalesDataAccessArticleUnitService,
  UiSalesDataAccessCountryService,
  UiSalesDataAccessCurrencyService,
  UiSalesDataAccessInvoiceTypeService,
  UiSalesDataAccessVatService,
} from '@ui-frontend-service/sales/data-access';

@Component({
  selector: 'ui-dashboard-sales-widget',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [UiDashboardRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDashboardRemoteEntrySalesComponent implements OnInit {
  private _authService = inject(UiAuthenticationDataAccessService);
  private _stateService = inject(UiGlobalStateDataAccessService);
  private _currencyService = inject(UiSalesDataAccessCurrencyService);
  private _vatService = inject(UiSalesDataAccessVatService);
  private _countryService = inject(UiSalesDataAccessCountryService);
  private _invoiceTypeService = inject(UiSalesDataAccessInvoiceTypeService);
  private _articleUnitService = inject(UiSalesDataAccessArticleUnitService);

  @HostBinding('class') klass = 'ui-dashboard-widget';

  /** The currently authenticated user. */
  user$ = this._stateService.getLoggedInUser().pipe(map((data) => data.getAuthenticatedUser));

  /** Emits all article-units. */
  articleUnits$ = this._articleUnitService.allArticleUnits().pipe(map((data) => data.allArticleUnits));
  /** Emits all currencies. */
  currencies$ = this._currencyService.allCurrencies().pipe(map((data) => data.allCurrencies));
  /** Emits all vats. */
  vats$ = this._vatService.allVats().pipe(map((data) => data.allVats));
  /** Emits all countries. */
  countries$ = this._countryService.allCountries().pipe(map((data) => data.allSalesCountries));
  /** Emits all invoice-types. */
  invoiceTypes$ = this._invoiceTypeService.allInvoiceTypes().pipe(map((data) => data.allInvoiceTypes));

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
