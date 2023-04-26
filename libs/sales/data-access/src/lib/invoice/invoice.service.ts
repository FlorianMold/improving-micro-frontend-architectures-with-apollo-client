import { Inject, Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiSalesDataAccessInvoiceService } from './invoice.abstract';
import {
  UI_ALL_INVOICES_META_QUERY,
  UI_ALL_INVOICES_SUBSET_QUERY,
  UI_ALL_INVOICES_TABLE_PAGED_QUERY,
  UI_INVOICE_DETAIL_BY_ID_QUERY,
  UI_REMOVE_INVOICE_MUTATION,
  UiInvoiceByIdGQLVariables,
  UiRemoveInvoiceDetailGQLVariables,
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
  UiAllInvoicesSubsetResponseModel,
  UiAllInvoicesTablePagedResponseModel,
  UiInvoiceDetailByIdResponseModel,
  UiInvoiceRemoveByIdResponseModel,
  UiInvoicesMetaResponseModel,
  UiInvoiceTablePageFilter,
} from '@ui-frontend-service/sales/api-types';

const __typename = 'Invoice';

@Injectable()
export class UiSalesDataAccessInvoiceServiceImpl implements UiSalesDataAccessInvoiceService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    private _logger: UiLoggerService,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache
  ) {}

  allInvoicesMeta(
    pageFilter: UiInvoiceTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiInvoiceTablePageFilter, UiInvoicesMetaResponseModel>
  ): Observable<UiInvoicesMetaResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          ...pageFilter,
        },
        /** The result of this operation does not need to be cached. */
        fetchPolicy: 'network-only',
        query: UI_ALL_INVOICES_META_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allInvoicesMeta')),
        map(mapQueryResult())
      );
  }

  allInvoices(
    pageFilter: UiInvoiceTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiInvoiceTablePageFilter, UiAllInvoicesTablePagedResponseModel>
  ): Observable<UiAllInvoicesTablePagedResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_INVOICES_TABLE_PAGED_QUERY,
        variables: {
          ...pageFilter,
        },
      })
      .pipe(
        tap(() => this._logger.debug('allInvoices', pageFilter)),
        map(mapQueryResult())
      );
  }

  allInvoicesSubset(
    pageFilter: UiInvoiceTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiInvoiceTablePageFilter, UiAllInvoicesSubsetResponseModel>
  ): Observable<UiAllInvoicesSubsetResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_INVOICES_SUBSET_QUERY,
        variables: {
          ...pageFilter,
        },
      })
      .pipe(
        tap(() => this._logger.debug('allInvoicesSubset')),
        map(mapQueryResult())
      );
  }

  invoiceDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiInvoiceByIdGQLVariables, UiInvoiceDetailByIdResponseModel>
  ): Observable<UiInvoiceDetailByIdResponseModel> {
    const invoiceRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_INVOICE_DETAIL_BY_ID_QUERY,
        variables: {
          id,
        },
        additionalCacheRefs: invoiceRef ? [{ __ref: invoiceRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('invoiceDetailById')),
        map(mapQueryResult())
      );
  }

  removeInvoiceById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveInvoiceDetailGQLVariables>
  ): Observable<UiInvoiceRemoveByIdResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_INVOICE_MUTATION,
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              allInvoices(existingInvoices = [], { readField }) {
                return existingInvoices.filter(
                  (invoiceRef: UiStoreObject | UiReference | undefined) => readField('id', invoiceRef) !== id
                );
              },
              _allInvoicesMeta(existingInvoicesMeta = {}) {
                return existingInvoicesMeta?.count - 1;
              },
            },
          });
          /** Remove invoice reference from the cache. */
          cache.evict({ id: cache.identify({ __typename, id }) });
          /** Remove any dangling references. */
          cache.gc();
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeInvoiceById')),
        map(mapMutationResult())
      );
  }
}

/**
 * The needed providers for the invoice-service.
 */
export const UI_SALES_DATA_ACCESS_INVOICE_PROVIDER: Provider[] = [
  {
    provide: UiSalesDataAccessInvoiceService,
    useClass: UiSalesDataAccessInvoiceServiceImpl,
  },
];
