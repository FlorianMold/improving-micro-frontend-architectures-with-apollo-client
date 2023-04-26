import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiUserResponseModel } from '@ui-frontend-service/shared/api-types';

/**
 * The query for getting the logged-in user.
 */
export const UI_GET_LOGGED_IN_USER = uiGql<UiUserResponseModel, UiEmptyObject>`
  query GetLoggedInUser {
    getAuthenticatedUser @client {
      id
      username
      email
      token
    }
  }
`;
