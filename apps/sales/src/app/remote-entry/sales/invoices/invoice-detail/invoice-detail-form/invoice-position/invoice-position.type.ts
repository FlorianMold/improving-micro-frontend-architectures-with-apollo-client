import { FormControl } from '@angular/forms';

/**
 * The structure of a form containing details about a invoice position.
 */
export interface UiSalesInvoicePositionForm {
  id: FormControl<string>;
  articleNumber: FormControl<string>;
  articleOrigin: FormControl<string>;
  articleSerial: FormControl<string>;
  articleText: FormControl<string>;
  net: FormControl<number | null>;
  brut: FormControl<number | null>;
  vat_id: FormControl<string>;
  articleUnit_id: FormControl<string>;
}

/**
 * The raw values contained by the associated type UiSalesInvoicePositionForm.
 */
export interface UiSalesInvoicePositionFormRawValue {
  id: string;
  articleNumber: string;
  articleOrigin: string;
  articleSerial: string;
  articleText: string;
  net: number | null;
  brut: number | null;
  vat_id: string;
  articleUnit_id: string;
}
