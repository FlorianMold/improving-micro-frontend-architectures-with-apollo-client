import { UiContactBaseModel, UiContactMutationResponse, UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a country.
 */
export interface UiCountryModel extends UiContactBaseModel {
  id: string;
}

/**
 * The model for fetching all countries.
 */
export interface UiAllCountriesResponseModel extends UiContactQueryResponse {
  allCountries: UiCountryModel[];
}

/**
 * The model for fetching a country by id.
 */
export interface UiCountryByIdResponseModel extends UiContactQueryResponse {
  Country: UiCountryModel;
}

/** The response-model for the create-country mutation. */
export interface UiCreateCountryResponseModel extends UiContactMutationResponse {
  createCountry?: UiCountryModel;
}

/** The response-model for the remove-country mutation. */
export interface UiRemoveCountryResponseModel extends UiContactMutationResponse {
  removeCountry?: UiCountryModel;
}
