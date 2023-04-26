import { UiSalesBaseModel, UiSalesQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a currency.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiCurrencyModel extends UiSalesBaseModel {
  id: string;
  longName: string;
  shortName: string;
  country_id: string;
}

/**
 * The model for fetching all currencies.
 */
export interface UiAllCurrenciesModel extends UiSalesBaseModel {
  id: string;
  longName: string;
  shortName: string;
}

/**
 * The model for fetching all currencies.
 */
export interface UiAllCurrenciesResponseModel extends UiSalesQueryResponse {
  allCurrencies: UiAllCurrenciesModel[];
}
