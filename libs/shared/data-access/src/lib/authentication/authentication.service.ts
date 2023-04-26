import { Injectable, Provider } from '@angular/core';
import { UiUserByCredentialsModel } from '@ui-frontend-service/shared/api-types';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UiAuthenticationDataAccessService } from './authentication.abstract';
import { UiUserDataAccessService } from '../user';
import { uiAuthenticatedUser } from '../global-state';
import { UiCommonJwtService } from '@ui-frontend-service/shared/feature/common-services';

/**
 * Service that provides authentication.
 */
@Injectable()
export class UiAuthenticationDataAccessServiceImpl implements UiAuthenticationDataAccessService {
  constructor(private _dataAccessService: UiUserDataAccessService, private _jwtService: UiCommonJwtService) {}

  /**
   * Store the user and notify watchers of the authenticated users.
   */
  private _setAuthentication(user: UiUserByCredentialsModel | null) {
    return uiAuthenticatedUser(user);
  }

  /**
   * Tries to authenticate the given user.
   *
   * @param email The email of the user.
   * @param password The password of the user.
   */
  authenticate(email: string, password: string): Observable<UiUserByCredentialsModel | null> {
    return this._dataAccessService.userByCredentials(email, password).pipe(
      map((userResponse) => userResponse.userByCredentials),
      map((user) => {
        if (user) {
          return user;
        }
        throw new Error('Invalid credentials');
      }),
      map((user) => this._storeAuthentication(user)),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    this._purgeAuthentication();
  }

  /**
   * Checks whether the user has a valid token.
   * Tries to load the user-information with the given token.
   */
  populate() {
    const token = this._jwtService.getToken();
    if (token) {
      /** If jwt is detected, attempt to get & store user's info. */
      this._dataAccessService.userByToken(token).subscribe({
        next: (userResponse) => this._storeAuthentication(userResponse.userByToken),
        error: () => this._purgeAuthentication(),
      });
      return;
    }

    this._purgeAuthentication();
  }

  /**
   * Removes the token of the user and removes the user from the global state.
   */
  private _purgeAuthentication() {
    this._jwtService.destroyToken();
    this._setAuthentication(null);
  }

  /**
   * Stores the token of the user.
   *
   * @param user The user to authenticate.
   */
  private _storeAuthentication(user: UiUserByCredentialsModel | null) {
    this._jwtService.saveToken(user?.token ?? '');
    this._setAuthentication(user);
    return user;
  }
}

/**
 * The needed providers for the contact service.
 */
export const UI_AUTHENTICATION_DATA_ACCESS_PROVIDER: Provider[] = [
  {
    provide: UiAuthenticationDataAccessService,
    useClass: UiAuthenticationDataAccessServiceImpl,
  },
];
