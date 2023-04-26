import { Observable } from 'rxjs';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAllCurrenciesResponseModel } from '@ui-frontend-service/sales/api-types';

export abstract class UiSalesDataAccessCurrencyService {
  /**
   * Fetches all currencies
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allCurrencies(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllCurrenciesResponseModel>
  ): Observable<UiAllCurrenciesResponseModel>;
}
