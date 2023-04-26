import { Inject, Injectable, Provider } from '@angular/core';
import {
  UiAllTitlesResponseModel,
  UiCreateTitleResponseModel,
  UiRemoveTitleResponseModel,
  UiTitleByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import {
  UI_ALL_TITLES_QUERY,
  UI_CREATE_TITLE_MUTATION,
  UI_REMOVE_TITLE_MUTATION,
  UI_TITLE_BY_ID_QUERY,
  UiCreateTitleGQLVariables,
  UiRemoveTitleGQLVariables,
  UiTitleByIdGQLVariables,
} from './graphql';
import { UiContactDataAccessTitleService } from './title.abstract';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapMutationResult, mapQueryResult } from '../util';

const __typename = 'Title';

@Injectable()
export class UiContactDataAccessTitleServiceImpl implements UiContactDataAccessTitleService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

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

  titleById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiTitleByIdGQLVariables, UiTitleByIdResponseModel>
  ): Observable<UiTitleByIdResponseModel> {
    const titleRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_TITLE_BY_ID_QUERY,
        additionalCacheRefs: titleRef ? [{ __ref: titleRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('titleById')),
        map(mapQueryResult())
      );
  }

  createTitle(
    id: string,
    options?: UiMutationOptionsAlone<UiCreateTitleResponseModel, UiCreateTitleGQLVariables>
  ): Observable<UiCreateTitleResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_CREATE_TITLE_MUTATION,
        variables: { id },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('createTitle')),
        map(mapMutationResult())
      );
  }

  removeTitle(
    id: string,
    options?: UiMutationOptionsAlone<UiRemoveTitleResponseModel, UiRemoveTitleGQLVariables>
  ): Observable<UiRemoveTitleResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_TITLE_MUTATION,
        variables: { id },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeTitle')),
        map(mapMutationResult())
      );
  }
}

/**
 * The provider needed for fetching titles.
 */
export const UI_CONTACT_DATA_ACCESS_TITLE_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessTitleService,
    useClass: UiContactDataAccessTitleServiceImpl,
  },
];
