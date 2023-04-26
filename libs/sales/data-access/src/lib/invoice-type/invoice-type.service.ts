import { Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiSalesDataAccessInvoiceTypeService } from './invoice-type.abstract';
import { UI_ALL_INVOICE_TYPES_QUERY } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';
import { UiAllInvoiceTypesResponseModel } from '@ui-frontend-service/sales/api-types';

@Injectable()
export class UiSalesDataAccessInvoiceTypeServiceImpl implements UiSalesDataAccessInvoiceTypeService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  allInvoiceTypes(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllInvoiceTypesResponseModel>
  ): Observable<UiAllInvoiceTypesResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_INVOICE_TYPES_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allInvoiceTypes')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for the invoice-type-service.
 */
export const UI_SALES_DATA_ACCESS_INVOICE_TYPE_PROVIDER: Provider[] = [
  {
    provide: UiSalesDataAccessInvoiceTypeService,
    useClass: UiSalesDataAccessInvoiceTypeServiceImpl,
  },
];
