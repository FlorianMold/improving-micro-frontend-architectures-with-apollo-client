import {
  UiAllSalutationsResponseModel,
  UiCreateSalutationResponseModel,
  UiRemoveSalutationResponseModel,
  UiSalutationDetailByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query for fetching all salutations.
 */
export const UI_ALL_SALUTATIONS_QUERY = uiGql<UiAllSalutationsResponseModel, UiEmptyObject>`
  query allSalutations {
    allSalutations {
      id
    }
  }
`;

/**
 * The variables needed for fetching a salutation by id.
 */
export type UiSalutationByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the salutation-details by id.
 */
export const UI_SALUTATION_BY_ID_QUERY = uiGql<UiSalutationDetailByIdResponseModel, UiSalutationByIdGQLVariables>`
  query salutationById($id: ID!) {
    Salutation(id: $id) {
      id
    }
  }
`;

/**
 * The variables needed for creating a new salutation.
 */
export type UiCreateSalutationGQLVariables = {
  id: string;
};

/**
 * The mutation for creating a new salutation.
 */
export const UI_CREATE_SALUTATION_MUTATION = uiGql<UiCreateSalutationResponseModel, UiCreateSalutationGQLVariables>`
  mutation createSalutation($id: ID!) {
    createSalutation(id: $id) {
      id
    }
  }
`;

/**
 * The variables needed for removing a salutation.
 */
export type UiRemoveSalutationGQLVariables = {
  id: string;
};

/**
 * The mutation for removing a salutation.
 */
export const UI_REMOVE_SALUTATION_MUTATION = uiGql<UiRemoveSalutationResponseModel, UiRemoveSalutationGQLVariables>`
  mutation removeSalutation($id: ID!) {
    removeSalutation(id: $id) {
      id
    }
  }
`;
