import { Injectable, Provider } from '@angular/core';
import { UiAllCountriesResponseModel } from '@ui-frontend-service/shared/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiCountryDataAccessService } from './country.abstract';
import { UI_ALL_COUNTRIES_QUERY } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';

@Injectable()
export class UiCountryDataAccessServiceImpl implements UiCountryDataAccessService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

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
}

/**
 * The provider needed for the country-service.
 */
export const UI_COUNTRY_DATA_ACCESS_PROVIDER: Provider[] = [
  {
    provide: UiCountryDataAccessService,
    useClass: UiCountryDataAccessServiceImpl,
  },
];
