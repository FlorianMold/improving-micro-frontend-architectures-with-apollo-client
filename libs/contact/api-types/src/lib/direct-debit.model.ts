import { UiContactPaymentMethodModel } from './payment-method.model';
import { UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a direct-debit.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiDirectDebitModel extends UiContactPaymentMethodModel {
  id: string;
  accountHolder: string;
  bankName: string | null;
  iban: string;
  bic: string;
  bankCode: string | null;
}

/**
 * The model for fetching all direct-debits.
 */
export interface UiAllDirectDebitsModel {
  id: string;
  accountHolder: string;
  bankName: string | null;
  iban: string;
  bic: string;
  bankCode: string | null;
}

/**
 * The response-model for all direct-debits query.
 */
export interface UiAllDirectDebitsResponseModel extends UiContactQueryResponse {
  allDirectDebits: UiAllDirectDebitsModel[];
}

/**
 * The model for the direct-debit detail query.
 */
export interface UiDirectDebitDetailByIdModel {
  id: string;
  accountHolder: string;
  bankName: string | null;
  iban: string;
  bic: string;
  bankCode: string | null;
}

/**
 * The response-model for the direct-debit-detail query.
 */
export interface UiDirectDebitByIdResponseModel extends UiContactQueryResponse {
  DirectDebit: UiDirectDebitDetailByIdModel;
}
