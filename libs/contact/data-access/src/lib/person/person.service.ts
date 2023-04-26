import { Inject, Injectable, Provider } from '@angular/core';
import {
  UiAllPersonsResponseModel,
  UiAllPersonsSubsetResponseModel,
  UiPersonDetailByIdModel,
} from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UI_ALL_PERSONS_QUERY, UI_ALL_PERSONS_SUBSET_QUERY, UI_PERSON_BY_ID_QUERY, UiPersonByIdGQLVariables } from './graphql';
import { UiContactDataAccessPersonService } from './person.abstract';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

const __typename = 'Person';

@Injectable()
export class UiContactDataAccessPersonServiceImpl implements UiContactDataAccessPersonService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

  allPersons(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllPersonsResponseModel>
  ): Observable<UiAllPersonsResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_PERSONS_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allPersons')),
        map(mapQueryResult())
      );
  }

  allPersonsSubset(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllPersonsSubsetResponseModel>
  ): Observable<UiAllPersonsSubsetResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_PERSONS_SUBSET_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allPersonsSubset')),
        map(mapQueryResult())
      );
  }

  personById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiPersonByIdGQLVariables, UiPersonDetailByIdModel>
  ): Observable<UiPersonDetailByIdModel> {
    const personRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_PERSON_BY_ID_QUERY,
        additionalCacheRefs: personRef ? [{ __ref: personRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('personById')),
        map(mapQueryResult())
      );
  }
}

/**
 * The provider needed for fetching persons.
 */
export const UI_CONTACT_DATA_ACCESS_PERSON_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessPersonService,
    useClass: UiContactDataAccessPersonServiceImpl,
  },
];
