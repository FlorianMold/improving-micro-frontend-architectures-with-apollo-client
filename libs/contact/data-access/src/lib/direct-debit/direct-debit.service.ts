import { Inject, Injectable, Provider } from '@angular/core';
import { UiAllDirectDebitsResponseModel, UiDirectDebitByIdResponseModel } from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiContactDataAccessDirectDebitService } from './direct-debit.abstract';
import { UI_ALL_DIRECT_DEBITS_QUERY, UI_DIRECT_DEBIT_BY_ID_QUERY, UiDirectDebitByIdGQLVariables } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

const __typename = 'DirectDebit';

@Injectable()
export class UiContactDataAccessDirectDebitServiceImpl implements UiContactDataAccessDirectDebitService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

  allDirectDebits(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllDirectDebitsResponseModel>
  ): Observable<UiAllDirectDebitsResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_DIRECT_DEBITS_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allDirectDebits')),
        map(mapQueryResult())
      );
  }

  directDebitById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiDirectDebitByIdGQLVariables, UiDirectDebitByIdResponseModel>
  ): Observable<UiDirectDebitByIdResponseModel> {
    const directDebitRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_DIRECT_DEBIT_BY_ID_QUERY,
        additionalCacheRefs: directDebitRef ? [{ __ref: directDebitRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('directDebitById')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for fetching direct-debits.
 */
export const UI_CONTACT_DATA_ACCESS_DIRECT_DEBIT_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessDirectDebitService,
    useClass: UiContactDataAccessDirectDebitServiceImpl,
  },
];
