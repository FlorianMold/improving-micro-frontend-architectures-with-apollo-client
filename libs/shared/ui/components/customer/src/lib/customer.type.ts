import { FormControl } from '@angular/forms';

/**
 * The structure of a form containing information about a customer.
 */
export interface UiCustomerForm {
  id: FormControl<string>;
  name: FormControl<string>;
  name2: FormControl<string>;
  postal: FormControl<string>;
  street: FormControl<string>;
  vatNumber: FormControl<string>;
  country_id: FormControl<string>;
}

/**
 * The raw values contained by the associated type UiCustomerForm.
 */
export interface UiCustomerFormRawValue {
  id: string;
  name: string;
  name2: string;
  postal: string;
  street: string;
  vatNumber: string;
  country_id: string;
}
