import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UiInvoiceTypeModel } from '@ui-frontend-service/sales/api-types';
import { UiSalesInvoiceCommonForm } from './invoice-common.type';

@Component({
  selector: 'ui-sales-invoice-common',
  templateUrl: './invoice-common.component.html',
  styleUrls: ['./invoice-common.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesInvoiceCommonComponent {
  /** The form, that should be rendered. Renders an empty form by default. */
  @Input('uiForm')
  invoiceCommonForm = UiSalesInvoiceCommonComponent.getEmptyForm();

  /** All invoice types, which should be selectable for the user. */
  @Input('uiInvoiceTypes') invoiceTypes?: UiInvoiceTypeModel[] = [];

  /**
   * Returns an empty form for common invoice details.
   */
  static getEmptyForm(): FormGroup<UiSalesInvoiceCommonForm> {
    return new FormGroup({
      id: new FormControl('', { nonNullable: true }),
      creatorClient: new FormControl('', { nonNullable: true }),
      modifyClient: new FormControl('', { nonNullable: true }),
      customerName: new FormControl('', { nonNullable: true }),
      invoiceType: new FormControl('', { nonNullable: true }),
    });
  }
}
