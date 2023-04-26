import { UiAllPayPalAccountsModel, UiPayPalAccountDetailByIdModel } from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiPaypalAccountByIdGQLVariables } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessPaypalAccountService {
  /**
   * Fetches all paypal-accounts.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allPaypalAccounts(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllPayPalAccountsModel>
  ): Observable<UiAllPayPalAccountsModel>;

  /**
   * Fetches a paypal-account by id.
   *
   * @param id The id of the paypal-account to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract paypalAccountById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiPaypalAccountByIdGQLVariables, UiPayPalAccountDetailByIdModel>
  ): Observable<UiPayPalAccountDetailByIdModel>;
}
