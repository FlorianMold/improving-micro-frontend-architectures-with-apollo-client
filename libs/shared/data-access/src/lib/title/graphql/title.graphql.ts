import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllTitlesResponseModel } from '@ui-frontend-service/shared/api-types';

/**
 * The query for fetching all titles.
 */
export const UI_ALL_TITLES_QUERY = uiGql<UiAllTitlesResponseModel, UiEmptyObject>`
  query allTitles {
    allTitles {
      id
    }
  }
`;
