import { Inject, Injectable, Provider } from '@angular/core';
import { UiAllEmailTypesResponseModel, UiEmailTypeByIdResponseModel } from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiContactDataAccessEmailTypeService } from './email-type.abstract';
import { UI_ALL_EMAIL_TYPES_QUERY, UI_EMAIL_TYPE_BY_ID_QUERY, UiEmailTypeByIdGQLVariables } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

const __typename = 'EmailType';

@Injectable()
export class UiContactDataAccessEmailTypeServiceImpl implements UiContactDataAccessEmailTypeService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

  allEmailTypes(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllEmailTypesResponseModel>
  ): Observable<UiAllEmailTypesResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_EMAIL_TYPES_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allEmailTypes')),
        map(mapQueryResult())
      );
  }

  emailTypeById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiEmailTypeByIdGQLVariables, UiEmailTypeByIdResponseModel>
  ): Observable<UiEmailTypeByIdResponseModel> {
    const emailTypeRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_EMAIL_TYPE_BY_ID_QUERY,
        additionalCacheRefs: emailTypeRef ? [{ __ref: emailTypeRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('emailTypeById')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for fetching countries.
 */
export const UI_CONTACT_DATA_ACCESS_EMAIL_TYPE_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessEmailTypeService,
    useClass: UiContactDataAccessEmailTypeServiceImpl,
  },
];
