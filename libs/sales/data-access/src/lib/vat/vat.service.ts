import { Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiSalesDataAccessVatService } from './vat.abstract';
import { UI_ALL_VATS_QUERY } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';
import { UiAllVatsResponseModel } from '@ui-frontend-service/sales/api-types';

@Injectable()
export class UiSalesDataAccessVatServiceImpl implements UiSalesDataAccessVatService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  allVats(options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllVatsResponseModel>): Observable<UiAllVatsResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_VATS_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allVats')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for the vat-service.
 */
export const UI_SALES_DATA_ACCESS_VAT_PROVIDER: Provider[] = [
  {
    provide: UiSalesDataAccessVatService,
    useClass: UiSalesDataAccessVatServiceImpl,
  },
];
