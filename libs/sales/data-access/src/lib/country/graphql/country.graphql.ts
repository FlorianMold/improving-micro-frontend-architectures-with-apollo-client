import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllCountriesResponseModel } from '@ui-frontend-service/sales/api-types';

/**
 * The query for fetching all vats.
 */
export const UI_ALL_COUNTRIES_QUERY = uiGql<UiAllCountriesResponseModel, UiEmptyObject>`
  query allSalesCountries {
    allSalesCountries {
      id
      shortName
      longName
      euMember
    }
  }
`;
