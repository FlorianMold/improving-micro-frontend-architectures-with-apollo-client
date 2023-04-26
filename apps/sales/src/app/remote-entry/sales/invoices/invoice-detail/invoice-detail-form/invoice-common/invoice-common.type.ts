import { FormControl } from '@angular/forms';

/**
 * The structure of a form containing common invoice details.
 */
export interface UiSalesInvoiceCommonForm {
  id: FormControl<string>;
  creatorClient: FormControl<string>;
  modifyClient: FormControl<string>;
  customerName: FormControl<string>;
  invoiceType: FormControl<string>;
}

/**
 * The raw values contained by the associated type UiSalesInvoiceCommonForm.
 */
export interface UiSalesInvoiceCommonFormRawValue {
  id: string;
  creatorClient: string;
  modifyClient: string;
  customerName: string;
  invoiceType: string;
}
