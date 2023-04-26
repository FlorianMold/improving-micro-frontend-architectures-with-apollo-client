import { Observable } from 'rxjs';
import { UiUserByCredentialsModel } from '@ui-frontend-service/shared/api-types';

export abstract class UiAuthenticationDataAccessService {
  /**
   * Tries to authenticate the given user.
   *
   * @param email The email of the user.
   * @param password The password of the user.
   */
  abstract authenticate(email: string, password: string): Observable<UiUserByCredentialsModel | null>;

  /**
   * Checks whether the user has a valid token.
   */
  abstract populate(): void;

  /**
   * Logs out the current user.
   */
  abstract logout(): void;
}
