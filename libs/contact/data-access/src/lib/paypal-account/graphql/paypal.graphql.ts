import { UiAllPayPalAccountsResponseModel, UiPayPalAccountDetailByIdResponseModel } from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query for fetching all paypal-accounts.
 */
export const UI_ALL_PAYPAL_ACCOUNTS_QUERY = uiGql<UiAllPayPalAccountsResponseModel, UiEmptyObject>`
  query paypalAccounts {
    allPaypalAccounts {
      id
      email
    }
  }
`;

/**
 * The variables needed for fetching a paypal-account by id.
 */
export type UiPaypalAccountByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the paypal-account-details by id.
 */
export const UI_PAYPAL_ACCOUNT_BY_ID_QUERY = uiGql<UiPayPalAccountDetailByIdResponseModel, UiPaypalAccountByIdGQLVariables>`
  query payPalAccountById($id: ID!) {
    PayPalAccount(id: $id) {
      id
      email
    }
  }
`;
