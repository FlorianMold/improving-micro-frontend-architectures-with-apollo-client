import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLoginComponent, UiLoginModel } from '@ui-frontend-service/shared/ui/components/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiAuthenticationDataAccessService } from '@ui-frontend-service/shared/data-access';
import { UiCommonLocalStorageService } from '@ui-frontend-service/shared/feature/common-services';

@Component({
  selector: 'ui-sales-login-wrapper',
  standalone: true,
  imports: [CommonModule, UiLoginComponent],
  template: ` <ui-login (uiLogin)="handleLogin($event)" (uiCancel)="handleCancel()" class="ui-login-wrapper"></ui-login> `,
  styles: [
    `
          :host {
            display: block;
          }
    
          .ui-login-wrapper {
            position: absolute;
            margin: auto;
    
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
    
            width: 600px;
            height: 400px;
          }
        `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesLoginWrapperComponent {
  private _authenticationService = inject(UiAuthenticationDataAccessService);
  private _router = inject(Router);
  private _snackbar = inject(MatSnackBar);
  private _storageService = inject(UiCommonLocalStorageService);

  /**
   * Handles the login of the user.
   *
   * @param user The user to login.
   */
  handleLogin(user: UiLoginModel): void {
    this._authenticationService.authenticate(user.email, user.password).subscribe({
      next: () => {
        this._snackbar.open('Login erfolgreich!', 'X');
        this._storageService.setItem('stayLoggedIn', String(user.stayLoggedIn));
        void this._router.navigate(['']);
      },
      error: () => {
        this._snackbar.open('Der Login ist fehlgeschlagen!', 'X');
      },
    });
  }

  /**
   * Handles the case, when the login is canceled.
   */
  handleCancel(): void {
    void this._router.navigate(['']);
  }
}
