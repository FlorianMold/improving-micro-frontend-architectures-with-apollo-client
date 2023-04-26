import { UiAllDirectDebitsResponseModel, UiDirectDebitByIdResponseModel } from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query for fetching all direct-debits.
 */
export const UI_ALL_DIRECT_DEBITS_QUERY = uiGql<UiAllDirectDebitsResponseModel, UiEmptyObject>`
  query directDebits {
    allDirectDebits {
      id
      accountHolder
      bankName
      iban
      bic
      bankCode
    }
  }
`;

/**
 * The variables for the direct-debit-detail query.
 */
export type UiDirectDebitByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the direct-debit-details by id.
 */
export const UI_DIRECT_DEBIT_BY_ID_QUERY = uiGql<UiDirectDebitByIdResponseModel, UiDirectDebitByIdGQLVariables>`
  query directDebitById($id: ID!) {
    DirectDebit(id: $id) {
      id
      accountHolder
      bankName
      iban
      bic
      bankCode
    }
  }
`;
