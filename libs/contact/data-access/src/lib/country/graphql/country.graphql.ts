import {
  UiAllCountriesResponseModel,
  UiCountryByIdResponseModel,
  UiCreateCountryResponseModel,
  UiRemoveCountryResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

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

/**
 * The query for fetching the country-details by id.
 */
export const UI_COUNTRY_BY_ID_QUERY = uiGql<UiCountryByIdResponseModel, UiCountryByIdGQLVariables>`
  query countryById($id: ID!) {
    Country(id: $id) {
      id
    }
  }
`;

/**
 * The variables needed for creating a new country.
 */
export type UiCreateCountryGQLVariables = {
  id: string;
};

/**
 * The mutation for creating a new country.
 */
export const UI_CREATE_COUNTRY_MUTATION = uiGql<UiCreateCountryResponseModel, UiCreateCountryGQLVariables>`
  mutation createCountry($id: ID!) {
    createCountry(id: $id) {
      id
    }
  }
`;

/**
 * The variables needed for removing a country.
 */
export type UiRemoveCountryGQLVariables = {
  id: string;
};

/**
 * The mutation for removing a country.
 */
export const UI_REMOVE_COUNTRY_MUTATION = uiGql<UiRemoveCountryResponseModel, UiRemoveCountryGQLVariables>`
  mutation removeCountry($id: ID!) {
    removeCountry(id: $id) {
      id
    }
  }
`;
