import { FormControl } from '@angular/forms';

/**
 * The structure of a form containing common contract details.
 */
export interface UiSalesContractCommonForm {
  id: FormControl<string>;
  contractor: FormControl<string>;
  description: FormControl<string>;
  name: FormControl<string>;
  payPeriod: FormControl<number | null>;
  payPeriodAdvance: FormControl<number | null>;
}

/**
 * The raw values contained by the associated type UiSalesContractCommonForm.
 */
export interface UiSalesContractCommonFormRawValues {
  id: string;
  contractor: string;
  description: string;
  name: string;
  payPeriod: number | null;
  payPeriodAdvance: number | null;
}
