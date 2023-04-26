import { FormControl } from '@angular/forms';

/**
 * The structure of a form containing information about an address instance.
 */
export interface UiAddressForm {
  id: FormControl<string>;
  streetName: FormControl<string>;
  location: FormControl<string>;
  postalCode: FormControl<string>;
  country_id: FormControl<string>;
}

/**
 * The raw values contained by the associated type UiAddressForm.
 */
export interface UiAddressFormRawValue {
  id: string;
  streetName: string;
  location: string;
  postalCode: string;
  country_id: string;
}
