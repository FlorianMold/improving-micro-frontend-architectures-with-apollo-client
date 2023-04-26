import { Injectable, Provider } from '@angular/core';
import { UiAllTitlesResponseModel } from '@ui-frontend-service/shared/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UI_ALL_TITLES_QUERY } from './graphql';
import { UiTitleDataAccessService } from './title.abstract';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

@Injectable()
export class UiTitleDataAccessServiceImpl implements UiTitleDataAccessService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  allTitles(options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllTitlesResponseModel>): Observable<UiAllTitlesResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_TITLES_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allTitles')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for fetching titles.
 */
export const UI_TITLE_DATA_ACCESS_PROVIDER: Provider[] = [
  {
    provide: UiTitleDataAccessService,
    useClass: UiTitleDataAccessServiceImpl,
  },
];
