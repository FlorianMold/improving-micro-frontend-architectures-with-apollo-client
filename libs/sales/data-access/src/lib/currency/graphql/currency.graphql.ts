import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllArticleUnitsResponseModel } from '@ui-frontend-service/sales/api-types';

/**
 * The query for fetching all article-units.
 */
export const UI_ALL_CURRENCIES_QUERY = uiGql<UiAllArticleUnitsResponseModel, UiEmptyObject>`
  query allCurrencies {
    allCurrencies {
      id
      shortName
      longName
    }
  }
`;
