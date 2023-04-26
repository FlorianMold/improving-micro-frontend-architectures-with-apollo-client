import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllArticleUnitsResponseModel } from '@ui-frontend-service/sales/api-types';

/**
 * The query for fetching all article-units.
 */
export const UI_ALL_ARTICLE_UNITS_QUERY = uiGql<UiAllArticleUnitsResponseModel, UiEmptyObject>`
  query allArticleUnits{
    allArticleUnits {
      id
      nameLong
      nameShort
    }
  }
`;
