import { FormControl } from '@angular/forms';

/**
 * The structure of a form containing details about an invoice note.
 */
export interface UiSalesInvoiceNoteForm {
  id: FormControl<string>;
  subject: FormControl<string>;
  body: FormControl<string>;
}

/**
 * The raw values contained by the associated type UiSalesInvoiceNoteForm.
 */
export interface UiSalesInvoiceNoteFormRawValue {
  id: string;
  subject: string;
  body: string;
}
