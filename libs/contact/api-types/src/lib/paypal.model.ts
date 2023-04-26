import { UiContactPaymentMethodModel } from './payment-method.model';
import { UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a paypal-account.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiPayPalAccountModel extends UiContactPaymentMethodModel {
  id: string;
  email: string;
  debit_id?: number | null;
}

/**
 * The model for the paypal-account detail query.
 */
export interface UiAllPayPalAccountsModel {
  id: string;
  email: string;
  debit_id: number | null;
}

/**
 * The response-model for all paypal-accounts query.
 */
export interface UiAllPayPalAccountsResponseModel extends UiContactQueryResponse {
  allPayPalAccounts: UiAllPayPalAccountsModel[];
}

/**
 * The model for the paypal-account details.
 */
export interface UiPayPalAccountDetailByIdModel {
  id: string;
  email: string;
  debit_id: number | null;
}

/**
 * The response-model for the paypal-account-detail query.
 */
export interface UiPayPalAccountDetailByIdResponseModel extends UiContactQueryResponse {
  PayPalAccount: UiPayPalAccountDetailByIdModel;
}
