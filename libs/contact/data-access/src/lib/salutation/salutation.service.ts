import { Inject, Injectable, Provider } from '@angular/core';
import {
  UiAllSalutationsResponseModel,
  UiCreateSalutationResponseModel,
  UiRemoveSalutationResponseModel,
  UiSalutationDetailByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import {
  UI_ALL_SALUTATIONS_QUERY,
  UI_CREATE_SALUTATION_MUTATION,
  UI_REMOVE_SALUTATION_MUTATION,
  UI_SALUTATION_BY_ID_QUERY,
  UiCreateSalutationGQLVariables,
  UiRemoveSalutationGQLVariables,
  UiSalutationByIdGQLVariables,
} from './graphql';
import { UiContactDataAccessSalutationService } from './salutation.abstract';
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

const __typename = 'Salutation';

@Injectable()
export class UiContactDataAccessSalutationServiceImpl implements UiContactDataAccessSalutationService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

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

  salutationById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiSalutationByIdGQLVariables, UiSalutationDetailByIdResponseModel>
  ): Observable<UiSalutationDetailByIdResponseModel> {
    const salutationRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_SALUTATION_BY_ID_QUERY,
        additionalCacheRefs: salutationRef ? [{ __ref: salutationRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('salutationById')),
        map(mapQueryResult())
      );
  }

  createSalutation(
    id: string,
    options?: UiMutationOptionsAlone<UiCreateSalutationResponseModel, UiCreateSalutationGQLVariables>
  ): Observable<UiCreateSalutationResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_CREATE_SALUTATION_MUTATION,
        variables: { id },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('createSalutation')),
        map(mapMutationResult())
      );
  }

  removeSalutation(
    id: string,
    options?: UiMutationOptionsAlone<UiRemoveSalutationResponseModel, UiRemoveSalutationGQLVariables>
  ): Observable<UiRemoveSalutationResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_SALUTATION_MUTATION,
        variables: { id },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeSalutation')),
        map(mapMutationResult())
      );
  }
}

/**
 * The provider needed for fetching salutations.
 */
export const UI_CONTACT_DATA_ACCESS_SALUTATION_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessSalutationService,
    useClass: UiContactDataAccessSalutationServiceImpl,
  },
];
