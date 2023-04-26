import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { UiAddressForm } from './address.type';

@Component({
  selector: 'ui-address',
  standalone: true,
  imports: [CommonModule, UiGridModule, MatInputModule, MatIconModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAddressComponent {
  /** All countries, which should be selectable for the address. */
  @Input('uiAddressCountries') countries?: { id: string }[] = [];

  /** The form, that should be rendered. Renders an empty form by default. */
  @Input('uiAddressForm')
  addressForm: FormGroup<UiAddressForm> = UiAddressComponent.getEmptyForm();

  /**
   * Returns an empty form for common address details.
   */
  static getEmptyForm(): FormGroup<UiAddressForm> {
    return new FormGroup<UiAddressForm>({
      id: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      streetName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      location: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      postalCode: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      country_id: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    });
  }
}
