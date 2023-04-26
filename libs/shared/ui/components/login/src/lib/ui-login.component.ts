import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UiFormSubmitModule } from '@ui-frontend-service/shared/ui/components/form-submit';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

/** The properties that the user must enter. */
export interface UiLoginModel {
  /** The email of the user. */
  email: string;
  /** The password of the user. */
  password: string;
  /** Whether the user should stay logged in. */
  stayLoggedIn: boolean;
}

@Component({
  selector: 'ui-login',
  standalone: true,
  templateUrl: './ui-login.component.html',
  styleUrls: ['./ui-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UiFormSubmitModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class UiLoginComponent {
  _loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    stayLoggedIn: [false],
  });

  /** Whether the password is shown in cleartext or not */
  _hidePassword = true;

  /** Emits, when the user tries to login. */
  @Output('uiLogin') loginValues = new EventEmitter<UiLoginModel>();
  /** Emits, when the login is aborted. */
  @Output('uiCancel') cancel = new EventEmitter<void>();

  /**
   * Emits the values of the login, when the user tries to log in.
   */
  login() {
    const { email, password, stayLoggedIn } = this._loginForm.getRawValue();
    this.loginValues.emit({ email, password, stayLoggedIn });
  }
}
