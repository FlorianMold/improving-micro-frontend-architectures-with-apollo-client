import { UiSalesBaseModel, UiSalesQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a country.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiSalesCountryModel extends UiSalesBaseModel {
  id: string;
  euMember: boolean;
  longName: string;
  shortName: string;
}

/**
 * The model for fetching all countries.
 */
export interface UiAllCountriesModel extends UiSalesBaseModel {
  id: string;
  euMember: boolean;
  longName: string;
  shortName: string;
}

/**
 * The model for fetching all countries.
 */
export interface UiAllCountriesResponseModel extends UiSalesQueryResponse {
  allSalesCountries: UiAllCountriesModel[];
}
