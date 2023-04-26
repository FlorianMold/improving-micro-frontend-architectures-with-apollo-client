import { Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiSalesDataAccessCurrencyService } from './currency.abstract';
import { UI_ALL_CURRENCIES_QUERY } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';
import { UiAllCurrenciesResponseModel } from '@ui-frontend-service/sales/api-types';

@Injectable()
export class UiSalesDataAccessCurrencyServiceImpl implements UiSalesDataAccessCurrencyService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  allCurrencies(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllCurrenciesResponseModel>
  ): Observable<UiAllCurrenciesResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_CURRENCIES_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allCurrencies')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for the currency-service.
 */
export const UI_SALES_DATA_ACCESS_CURRENCY_PROVIDER: Provider[] = [
  {
    provide: UiSalesDataAccessCurrencyService,
    useClass: UiSalesDataAccessCurrencyServiceImpl,
  },
];
