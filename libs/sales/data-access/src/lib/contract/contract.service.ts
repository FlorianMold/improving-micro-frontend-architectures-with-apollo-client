import { Inject, Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiSalesDataAccessContractService } from './contract.abstract';
import {
  UI_ALL_CONTRACTS_META_QUERY,
  UI_ALL_CONTRACTS_SUBSET_QUERY,
  UI_ALL_CONTRACTS_TABLE_PAGED_QUERY,
  UI_CONTRACT_DETAIL_BY_ID_QUERY,
  UI_REMOVE_CONTRACT_MUTATION,
  UiContractByIdGQLVariables,
  UiRemoveContractDetailGQLVariables,
} from './graphql';
import {
  UiMutationOptionsAlone,
  UiReference,
  UiStoreObject,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapMutationResult, mapQueryResult } from '../util';
import {
  UiAllContractsSubsetResponseModel,
  UiAllContractsTablePagedResponseModel,
  UiContractDetailByIdResponseModel,
  UiContractRemoveByIdResponseModel,
  UiContractsMetaResponseModel,
  UiContractTablePageFilter,
} from '@ui-frontend-service/sales/api-types';

const __typename = 'Contract';

@Injectable()
export class UiSalesDataAccessContractServiceImpl implements UiSalesDataAccessContractService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    private _logger: UiLoggerService,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache
  ) {}

  allContractsMeta(
    pageFilter: UiContractTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContractTablePageFilter, UiContractsMetaResponseModel>
  ): Observable<UiContractsMetaResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          ...pageFilter,
        },
        /** The result of this operation does not need to be cached. */
        fetchPolicy: 'network-only',
        query: UI_ALL_CONTRACTS_META_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allContractsMeta')),
        map(mapQueryResult())
      );
  }

  allContracts(
    pageFilter: UiContractTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContractTablePageFilter, UiAllContractsTablePagedResponseModel>
  ): Observable<UiAllContractsTablePagedResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_CONTRACTS_TABLE_PAGED_QUERY,
        variables: {
          ...pageFilter,
        },
      })
      .pipe(
        tap(() => this._logger.debug('allContracts', pageFilter)),
        map(mapQueryResult())
      );
  }

  allContractsSubset(
    pageFilter: UiContractTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContractTablePageFilter, UiAllContractsSubsetResponseModel>
  ): Observable<UiAllContractsSubsetResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_CONTRACTS_SUBSET_QUERY,
        variables: {
          ...pageFilter,
        },
      })
      .pipe(
        tap(() => this._logger.debug('allContractsSubset', pageFilter)),
        map(mapQueryResult())
      );
  }

  contractDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiContractByIdGQLVariables, UiContractDetailByIdResponseModel>
  ): Observable<UiContractDetailByIdResponseModel> {
    const contractRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_CONTRACT_DETAIL_BY_ID_QUERY,
        variables: {
          id,
        },
        additionalCacheRefs: contractRef ? [{ __ref: contractRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('contractDetailById')),
        map(mapQueryResult())
      );
  }

  removeContractById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveContractDetailGQLVariables>
  ): Observable<UiContractRemoveByIdResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_CONTRACT_MUTATION,
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              allContracts(existingContracts = [], { readField }) {
                return existingContracts.filter(
                  (contractRef: UiStoreObject | UiReference | undefined) => readField('id', contractRef) !== id
                );
              },
              _allContractsMeta(existingContractsMeta = {}) {
                return existingContractsMeta?.count - 1;
              },
            },
          });
          /** Remove contract reference from the cache. */
          cache.evict({ id: cache.identify({ __typename, id }) });
          /** Remove any dangling references. */
          cache.gc();
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeContractById')),
        map(mapMutationResult())
      );
  }
}

/**
 * The needed providers for the Contract-service.
 */
export const UI_SALES_DATA_ACCESS_CONTRACT_PROVIDER: Provider[] = [
  {
    provide: UiSalesDataAccessContractService,
    useClass: UiSalesDataAccessContractServiceImpl,
  },
];
