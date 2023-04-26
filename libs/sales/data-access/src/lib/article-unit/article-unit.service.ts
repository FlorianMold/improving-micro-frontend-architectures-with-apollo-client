import { Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiSalesDataAccessArticleUnitService } from './article-unit.abstract';
import { UI_ALL_ARTICLE_UNITS_QUERY } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';
import { UiAllArticleUnitsResponseModel } from '@ui-frontend-service/sales/api-types';

@Injectable()
export class UiSalesDataAccessArticleUnitServiceImpl implements UiSalesDataAccessArticleUnitService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  allArticleUnits(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllArticleUnitsResponseModel>
  ): Observable<UiAllArticleUnitsResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_ARTICLE_UNITS_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allArticleUnits')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for the article-unit-service.
 */
export const UI_SALES_DATA_ACCESS_ARTICLE_UNIT_PROVIDER: Provider[] = [
  {
    provide: UiSalesDataAccessArticleUnitService,
    useClass: UiSalesDataAccessArticleUnitServiceImpl,
  },
];
