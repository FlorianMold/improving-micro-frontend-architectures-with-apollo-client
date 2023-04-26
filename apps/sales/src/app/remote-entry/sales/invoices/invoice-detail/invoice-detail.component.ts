import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { UiInvoiceDetailByIdResponseModel } from '@ui-frontend-service/sales/api-types';
import { ActivatedRoute } from '@angular/router';
import {
  UiSalesDataAccessArticleUnitService,
  UiSalesDataAccessCountryService,
  UiSalesDataAccessInvoiceTypeService,
  UiSalesDataAccessVatService,
} from '@ui-frontend-service/sales/data-access';
import { UiSalesInvoiceCommonFormRawValue } from './invoice-detail-form/invoice-common';
import { UiCustomerFormRawValue } from '@ui-frontend-service/shared/ui/components/customer';
import { UiSalesInvoicePositionFormRawValue } from './invoice-detail-form/invoice-position';
import { UiSalesInvoiceNoteFormRawValue } from './invoice-detail-form/invoice-notes/invoice-note';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';

@Component({
  selector: 'ui-sales-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesInvoiceDetailComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _logger = inject(UiLoggerService);

  /** An observable, which emits the invoice to be displayed inside the form. */
  invoice$?: Observable<UiInvoiceDetailByIdResponseModel>;
  /** Emits all article-units. */
  articleUnits$ = inject(UiSalesDataAccessArticleUnitService)
    .allArticleUnits()
    .pipe(filter((value) => !value.loading));
  /** Emits all vats. */
  vats$ = inject(UiSalesDataAccessVatService)
    .allVats()
    .pipe(filter((value) => !value.loading));
  /** Emits all countries. */
  countries$ = inject(UiSalesDataAccessCountryService)
    .allCountries()
    .pipe(filter((value) => !value.loading));
  /** Emits all invoice-types. */
  invoiceTypes$ = inject(UiSalesDataAccessInvoiceTypeService)
    .allInvoiceTypes()
    .pipe(filter((value) => !value.loading));

  ngOnInit(): void {
    /**
     * Check if the invoice was preloaded with a resolver.
     * If not a new invoice should be created.
     */
    this.invoice$ = this._route.data.pipe(
      filter((data) => !!data?.['invoice']),
      map((data) => data?.['invoice'])
    );
  }

  _handleCreateInvoice(invoice: {
    common: Omit<UiSalesInvoiceCommonFormRawValue, 'id'>;
    customer: Omit<UiCustomerFormRawValue, 'id'>;
  }) {
    // TODO: Implement mutations
    this._logger.info('Create Invoice:');
    this._logger.info(invoice);
  }

  _handleUpdateInvoice(invoice: {
    common: UiSalesInvoiceCommonFormRawValue;
    positions: UiSalesInvoicePositionFormRawValue[];
    notes: UiSalesInvoiceNoteFormRawValue[];
    customer: UiCustomerFormRawValue;
  }) {
    // TODO: Implement mutations
    this._logger.info('Update Invoice:');
    this._logger.info(invoice);
  }
}
