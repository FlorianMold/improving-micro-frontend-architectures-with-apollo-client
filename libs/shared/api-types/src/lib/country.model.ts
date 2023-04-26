import { UiBaseModel, UiBaseQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a country.
 */
export interface UiCountryModel extends UiBaseModel {
  id: string;
}

/**
 * The model for fetching all countries.
 */
export interface UiAllCountriesResponseModel extends UiBaseQueryResponse {
  allCountries: UiCountryModel[];
}
