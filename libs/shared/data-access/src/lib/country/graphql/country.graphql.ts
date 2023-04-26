import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllCountriesResponseModel } from '@ui-frontend-service/shared/api-types';

/**
 * The query for fetching all countries.
 */
export const UI_ALL_COUNTRIES_QUERY = uiGql<UiAllCountriesResponseModel, UiEmptyObject>`
  query allCountries {
    allCountries {
      id
    }
  }
`;

/**
 * The variables needed for fetching a country by id.
 */
export type UiCountryByIdGQLVariables = {
  id: string;
};
