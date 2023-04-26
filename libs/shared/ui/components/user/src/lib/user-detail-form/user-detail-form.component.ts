import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { UiProfileComponent, UiProfileForm, UiProfileFormRawValue } from '@ui-frontend-service/shared/ui/components/profile';
import { UiAddressComponent, UiAddressForm, UiAddressFormRawValue } from '@ui-frontend-service/shared/ui/components/address';
import { MatCardModule } from '@angular/material/card';
import { UiFormSubmitModule } from '@ui-frontend-service/shared/ui/components/form-submit';
import { MatButtonModule } from '@angular/material/button';
import { UiUserDetailFormInput } from './user-detail-form.type';

@Component({
  selector: 'ui-user-detail-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    UiProfileComponent,
    UiAddressComponent,
    UiFormSubmitModule,
    MatButtonModule,
  ],
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiUserDetailFormComponent implements OnChanges {
  /**
   * The user which should prefill the form.
   *
   * If user is not specified, the component creates a new user.
   */
  @Input('uiUser') user?: UiUserDetailFormInput | null = null;
  /** All salutations, which should be selectable for the user. */
  @Input('uiSalutations') salutations?: { id: string }[] = [];
  /** All titles, which should be selectable for the user. */
  @Input('uiTitles') titles?: { id: string }[] = [];
  /** All countries, which should be selectable for the user. */
  @Input('uiCountries') countries?: { id: string }[] = [];

  /** Emits, when the form has been submitted and no initial user was provided. */
  @Output('uiCreateUser') readonly createUser = new EventEmitter<{
    profile: Omit<UiProfileFormRawValue, 'id' | 'address_id'>;
    address: Omit<UiAddressFormRawValue, 'id'>;
  }>();

  /** Emits, when the form has been submitted and an initial user was provided. */
  @Output('uiUpdateUser') readonly updateUser = new EventEmitter<{
    profile: UiProfileFormRawValue;
    address: UiAddressFormRawValue;
  }>();

  private _formBuilder = inject(FormBuilder);

  _profileForm: FormGroup<UiProfileForm> = UiProfileComponent.getEmptyForm();

  _addressForm: FormGroup<UiAddressForm> = UiAddressComponent.getEmptyForm();

  _userDetailForm = this._formBuilder.group({
    profile: this._profileForm,
    address: this._addressForm,
  });

  ngOnChanges(changes: SimpleChanges): void {
    const { user } = changes;

    if (user?.currentValue) {
      const updatedUser = user.currentValue;
      this._profileForm.setValue({
        id: updatedUser.id,
        email: updatedUser.email,
        salutation_id: updatedUser.Salutation.id,
        password: updatedUser.password,
        title_id: updatedUser.Title.id,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        secondName: updatedUser.secondName,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        birthdate: updatedUser.birthdate,
        address_id: updatedUser.Address.id,
      });

      this._addressForm.setValue({
        id: updatedUser.Address.id,
        streetName: updatedUser.Address.streetName,
        postalCode: updatedUser.Address.postalCode,
        location: updatedUser.Address.location,
        country_id: updatedUser.Address.Country.id,
      });
    }
  }

  /**
   * Handles the submit-event of the user-detail form. When the user already has an id, the "Update"-event will be emitted.
   * Otherwise, the "Create"-event will be emitted.
   */
  _handleFormSubmission(): void {
    if (this._userDetailForm.valid) {
      const profileForm = this._profileForm.getRawValue();
      const userModel = {
        username: profileForm.username,
        password: profileForm.password,
        email: profileForm.email,
        firstName: profileForm.firstName,
        secondName: profileForm.secondName,
        phone: profileForm.phone,
        gender: profileForm.gender,
        birthdate: profileForm.birthdate,
        salutation_id: profileForm.salutation_id,
        title_id: profileForm.title_id,
      };

      const addressForm = this._addressForm.getRawValue();
      const addressModel = {
        streetName: addressForm.streetName,
        postalCode: addressForm.postalCode,
        location: addressForm.location,
        country_id: addressForm.country_id,
      };

      if (this.user) {
        this.updateUser.emit({
          profile: { id: this.user.id, address_id: this.user.Address.id, ...userModel },
          address: { id: this.user.Address.id, ...addressModel },
        });
      } else {
        this.createUser.emit({
          profile: userModel,
          address: addressModel,
        });
      }
    }
  }
}
