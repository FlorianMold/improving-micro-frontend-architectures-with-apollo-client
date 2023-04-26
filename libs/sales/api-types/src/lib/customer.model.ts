import { UiSalesBaseModel } from './base.model';

/**
 * The model for specifying all properties of a customer.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiCustomerModel extends UiSalesBaseModel {
  id: string;
  name: string;
  name2: string;
  postal: string;
  street: string;
  vatNumber: string;
  salesCountry_id: string;
}
