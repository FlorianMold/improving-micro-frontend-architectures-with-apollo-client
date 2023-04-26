import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiCustomerForm } from './customer.type';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';

@Component({
  selector: 'ui-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, UiGridModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCustomerComponent {
  /** The form, that should be rendered. Renders an empty form by default. */
  @Input('uiForm') customerForm = UiCustomerComponent.getEmptyForm();

  /** All countries, which should be selectable for the customer. */
  @Input('uiCountries') countries?: { id: string; shortName: string; longName: string }[] = [];

  /**
   * Returns an empty form for customer details.
   */
  static getEmptyForm(): FormGroup<UiCustomerForm> {
    return new FormGroup<UiCustomerForm>({
      id: new FormControl<string>('', { nonNullable: true }),
      name: new FormControl<string>('', { nonNullable: true }),
      name2: new FormControl<string>('', { nonNullable: true }),
      postal: new FormControl<string>('', { nonNullable: true }),
      street: new FormControl<string>('', { nonNullable: true }),
      vatNumber: new FormControl<string>('', { nonNullable: true }),
      country_id: new FormControl<string>('', { nonNullable: true }),
    });
  }
}
