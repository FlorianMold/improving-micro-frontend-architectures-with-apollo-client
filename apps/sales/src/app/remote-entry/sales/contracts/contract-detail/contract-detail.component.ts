import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { UiContractDetailByIdResponseModel } from '@ui-frontend-service/sales/api-types';
import { ActivatedRoute } from '@angular/router';
import { UiSalesDataAccessCountryService } from '@ui-frontend-service/sales/data-access';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { UiSalesContractCommonFormRawValues } from './contract-detail-form/contract-common';
import { UiCustomerFormRawValue } from '@ui-frontend-service/shared/ui/components/customer';

@Component({
  selector: 'ui-sales-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesContractDetailComponent implements OnInit {
  /** An observable, which emits the contract to be displayed inside the form. */
  contract$?: Observable<UiContractDetailByIdResponseModel>;

  /** Emits all countries. */
  countries$ = inject(UiSalesDataAccessCountryService)
    .allCountries()
    .pipe(filter((value) => !value.loading));

  private _route = inject(ActivatedRoute);
  private _logger = inject(UiLoggerService);

  ngOnInit(): void {
    /**
     * Check if the contract was preloaded with a resolver.
     * If not a new contract should be created.
     */
    this.contract$ = this._route.data.pipe(
      filter((data) => !!data?.['contract']),
      map((data) => data?.['contract'])
    );
  }

  _handleCreateContract(contract: {
    common: Omit<UiSalesContractCommonFormRawValues, 'id'>;
    customer: Omit<UiCustomerFormRawValue, 'id'>;
  }): void {
    // TODO: Implement mutations
    this._logger.info('Create Contract:');
    this._logger.info(contract);
  }

  _handleUpdateContract(contract: { common: UiSalesContractCommonFormRawValues; customer: UiCustomerFormRawValue }): void {
    // TODO: Implement mutations
    this._logger.info('Update Contract:');
    this._logger.info(contract);
  }
}
