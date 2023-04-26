import { Inject, Injectable, Provider } from '@angular/core';
import {
  UiAllCountriesResponseModel,
  UiCountryByIdResponseModel,
  UiCreateCountryResponseModel,
  UiRemoveCountryResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiContactDataAccessCountryService } from './country.abstract';
import {
  UI_ALL_COUNTRIES_QUERY,
  UI_COUNTRY_BY_ID_QUERY,
  UI_CREATE_COUNTRY_MUTATION,
  UI_REMOVE_COUNTRY_MUTATION,
  UiCountryByIdGQLVariables,
  UiCreateCountryGQLVariables,
} from './graphql';
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
import { UiRemoveContactDetailGQLVariables } from '../contact';

const __typename = 'Country';

@Injectable()
export class UiContactDataAccessCountryServiceImpl implements UiContactDataAccessCountryService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

  allCountries(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllCountriesResponseModel>
  ): Observable<UiAllCountriesResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_COUNTRIES_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allCountries')),
        map(mapQueryResult())
      );
  }

  countryById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiCountryByIdGQLVariables, UiCountryByIdResponseModel>
  ): Observable<UiCountryByIdResponseModel> {
    const countryRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: { id },
        query: UI_COUNTRY_BY_ID_QUERY,
        additionalCacheRefs: countryRef ? [{ __ref: countryRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('countryById')),
        map(mapQueryResult())
      );
  }

  createCountry(
    id: string,
    options?: UiMutationOptionsAlone<UiCreateCountryResponseModel, UiCreateCountryGQLVariables>
  ): Observable<UiCreateCountryResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_CREATE_COUNTRY_MUTATION,
        variables: { id },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('createCountry')),
        map(mapMutationResult())
      );
  }

  removeCountry(
    id: string,
    options?: UiMutationOptionsAlone<UiRemoveCountryResponseModel, UiRemoveContactDetailGQLVariables>
  ): Observable<UiRemoveCountryResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_COUNTRY_MUTATION,
        variables: { id },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeCountry')),
        map(mapMutationResult())
      );
  }
}

/**
 * The provider needed for the country-service.
 */
export const UI_CONTACT_DATA_ACCESS_COUNTRY_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessCountryService,
    useClass: UiContactDataAccessCountryServiceImpl,
  },
];
