import { UiEmailTypeByIdResponseModel, UiAllEmailTypesResponseModel } from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query for fetching all email-types.
 */
export const UI_ALL_EMAIL_TYPES_QUERY = uiGql<UiAllEmailTypesResponseModel, UiEmptyObject>`
  query allEmailTypes {
    allEmailTypes {
      id
    }
  }
`;

/**
 * The variables for the email-type query.
 */
export type UiEmailTypeByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the email-type by id.
 */
export const UI_EMAIL_TYPE_BY_ID_QUERY = uiGql<UiEmailTypeByIdResponseModel, UiEmailTypeByIdGQLVariables>`
  query emailTypeById($id: ID!) {
    EmailType(id: $id) {
      id
    }
  }
`;
