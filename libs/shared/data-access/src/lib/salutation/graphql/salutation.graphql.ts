import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllSalutationsResponseModel } from '@ui-frontend-service/shared/api-types';

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
