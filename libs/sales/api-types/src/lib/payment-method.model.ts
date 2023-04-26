import { UiSalesBaseModel } from './base.model';

/**
 * The model for specifying all properties of a payment-method.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiSalesPaymentMethodModel extends UiSalesBaseModel {
  id: string;
}
