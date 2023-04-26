import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { UiProfileForm } from './profile.type';

@Component({
  selector: 'ui-profile',
  standalone: true,
  imports: [CommonModule, UiGridModule, MatInputModule, MatIconModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiProfileComponent {
  /** All titles, which should be selectable for the user. */
  @Input('uiProfileTitles') titles?: { id: string }[] = [];

  /** All salutations, which should be selectable for the user. */
  @Input('uiProfileSalutations') salutations?: { id: string }[] = [];

  /** The form, that should be rendered. Renders an empty form by default. */
  @Input('uiProfileForm')
  profileForm = UiProfileComponent.getEmptyForm();

  /** Whether the password is shown in cleartext or not */
  _hidePassword = true;

  /**
   * Returns an empty form for common profile details.
   */
  static getEmptyForm(): FormGroup<UiProfileForm> {
    return new FormGroup<UiProfileForm>({
      id: new FormControl<string>('', { nonNullable: true }),
      username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      title_id: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      firstName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      secondName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      gender: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      birthdate: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      salutation_id: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      address_id: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    });
  }
}
