import { Injectable, Provider } from '@angular/core';
import { UiAllSalutationsResponseModel } from '@ui-frontend-service/shared/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UI_ALL_SALUTATIONS_QUERY } from './graphql';
import { UiSalutationDataAccessService } from './salutation.abstract';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

@Injectable()
export class UiSalutationDataAccessServiceImpl implements UiSalutationDataAccessService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  allSalutations(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllSalutationsResponseModel>
  ): Observable<UiAllSalutationsResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_SALUTATIONS_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allSalutations')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for fetching salutations.
 */
export const UI_SALUTATION_DATA_ACCESS_PROVIDER: Provider[] = [
  {
    provide: UiSalutationDataAccessService,
    useClass: UiSalutationDataAccessServiceImpl,
  },
];
