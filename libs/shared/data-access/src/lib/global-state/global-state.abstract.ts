import { Observable } from 'rxjs';
import {
  UiEmptyObject,
  UiFieldPolicy,
  UiFieldReadFunction,
  uiMakeVar,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiUserByCredentialsModel, UiUserResponseModel } from '@ui-frontend-service/shared/api-types';

export abstract class UiGlobalStateDataAccessService {
  /**
   * Fetches the logged-in user from the cache.
   *
   * @param options The options for the query.
   */
  abstract getLoggedInUser(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiUserResponseModel>
  ): Observable<UiUserResponseModel>;
}

/**
 * A reactive variable that holds the currently logged-in user.
 */
export const uiAuthenticatedUser = uiMakeVar<UiUserByCredentialsModel | null>(null);

/**
 * Specifies a type-policy for accessing the currently logged-in user.
 * This field is local-only and therefore the data is fetched from the variable directly.
 */
export const UI_AUTHENTICATION_ROOT_QUERY_FIELD_POLICY: {
  [fieldName: string]: UiFieldPolicy | UiFieldReadFunction;
} = {
  getAuthenticatedUser: {
    read() {
      return uiAuthenticatedUser();
    },
  },
};
