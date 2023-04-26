import { Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiGlobalStateDataAccessService } from './global-state.abstract';
import { UI_GET_LOGGED_IN_USER } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiUserResponseModel } from '@ui-frontend-service/shared/api-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

@Injectable()
export class UiGlobalStateDataAccessServiceImpl implements UiGlobalStateDataAccessService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  getLoggedInUser(options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiUserResponseModel>): Observable<UiUserResponseModel> {
    return this._graphQLClient
      .watchQuery<UiUserResponseModel, UiEmptyObject>({
        ...options,
        query: UI_GET_LOGGED_IN_USER,
      })
      .pipe(
        tap(() => this._logger.debug('getLoggedInUser')),
        map(mapQueryResult())
      );
  }
}

/**
 * The needed providers for the contact service.
 */
export const UI_GLOBAL_STATE_DATA_ACCESS_PROVIDER: Provider[] = [
  {
    provide: UiGlobalStateDataAccessService,
    useClass: UiGlobalStateDataAccessServiceImpl,
  },
];
