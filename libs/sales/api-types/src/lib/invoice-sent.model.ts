import { UiSalesBaseModel } from './base.model';

/**
 * The model for specifying all properties of a send invoice.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiInvoiceSentModel extends UiSalesBaseModel {
  id: string;
  email: string;
  uid: number;
  invoice_id: string;
}
