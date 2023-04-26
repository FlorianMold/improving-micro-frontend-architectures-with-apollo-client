import { Inject, Injectable, Provider } from '@angular/core';
import { UiAllPayPalAccountsModel, UiPayPalAccountDetailByIdModel } from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UI_ALL_PAYPAL_ACCOUNTS_QUERY, UI_PAYPAL_ACCOUNT_BY_ID_QUERY, UiPaypalAccountByIdGQLVariables } from './graphql';
import { UiContactDataAccessPaypalAccountService } from './paypal.abstract';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

const __typename = 'PaypalAccount';

@Injectable()
export class UiContactDataAccessPaypalAccountServiceImpl implements UiContactDataAccessPaypalAccountService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

  allPaypalAccounts(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllPayPalAccountsModel>
  ): Observable<UiAllPayPalAccountsModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_PAYPAL_ACCOUNTS_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allPaypalAccounts')),
        map(mapQueryResult())
      );
  }

  paypalAccountById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiPaypalAccountByIdGQLVariables, UiPayPalAccountDetailByIdModel>
  ): Observable<UiPayPalAccountDetailByIdModel> {
    const payPalRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_PAYPAL_ACCOUNT_BY_ID_QUERY,
        additionalCacheRefs: payPalRef ? [{ __ref: payPalRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('paypalAccountById')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for fetching titles.
 */
export const UI_CONTACT_DATA_ACCESS_PAYPAL_ACCOUNT_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessPaypalAccountService,
    useClass: UiContactDataAccessPaypalAccountServiceImpl,
  },
];
