import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiArticleUnitModel, UiSalesCountryModel, UiVatModel } from '@ui-frontend-service/sales/api-types';
import { FormControl, FormGroup } from '@angular/forms';
import { UiSalesInvoicePositionForm } from './invoice-position.type';

@Component({
  selector: 'ui-sales-invoice-position',
  templateUrl: './invoice-position.component.html',
  styleUrls: ['./invoice-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesInvoicePositionComponent {
  /** The index of the invoice-position. */
  @Input('uiIndex') index = -1;
  /** The possible vats for the invoice-position. */
  @Input('uiVats') vats?: UiVatModel[] = [];
  /** The possible article-units for the invoice-position. */
  @Input('uiArticleUnits') articleUnits?: UiArticleUnitModel[] = [];
  /** The possible countries for the invoice-position. */
  @Input('uiCountries') countries?: UiSalesCountryModel[] = [];

  /** The form, that should be rendered. Renders an empty form by default. */
  @Input('uiForm')
  invoicePositionForm = UiSalesInvoicePositionComponent.getEmptyForm();

  /**
   * Returns an empty form for an invoice position.
   */
  static getEmptyForm(): FormGroup<UiSalesInvoicePositionForm> {
    return new FormGroup<UiSalesInvoicePositionForm>({
      id: new FormControl('', { nonNullable: true }),
      articleNumber: new FormControl('', { nonNullable: true }),
      articleOrigin: new FormControl('', { nonNullable: true }),
      articleSerial: new FormControl('', { nonNullable: true }),
      articleText: new FormControl('', { nonNullable: true }),
      net: new FormControl<number | null>(null),
      brut: new FormControl<number | null>(null),
      vat_id: new FormControl('', { nonNullable: true }),
      articleUnit_id: new FormControl('', { nonNullable: true }),
    });
  }
}
