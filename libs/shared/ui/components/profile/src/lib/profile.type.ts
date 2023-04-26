import { FormControl } from '@angular/forms';

/**
 * The structure of a form containing information about a profile instance.
 */
export interface UiProfileForm {
  id: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  title_id: FormControl<string>;
  firstName: FormControl<string>;
  secondName: FormControl<string>;
  phone: FormControl<string>;
  gender: FormControl<string>;
  birthdate: FormControl<string>;
  salutation_id: FormControl<string>;
  address_id: FormControl<string>;
}

/**
 * The raw values contained by the associated type UiProfileForm.
 */
export interface UiProfileFormRawValue {
  id: string;
  username: string;
  email: string;
  password: string;
  title_id: string;
  firstName: string;
  secondName: string;
  phone: string;
  gender: string;
  birthdate: string;
  salutation_id: string;
  address_id: string;
}
