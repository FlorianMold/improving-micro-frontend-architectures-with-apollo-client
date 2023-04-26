import { Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiSalesDataAccessCountryService } from './country.abstract';
import { UI_ALL_COUNTRIES_QUERY } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapQueryResult } from '../util';
import { UiAllCountriesResponseModel } from '@ui-frontend-service/sales/api-types';

@Injectable()
export class UiSalesDataAccessCountryServiceImpl implements UiSalesDataAccessCountryService {
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
export const UI_SALES_DATA_ACCESS_COUNTRY_PROVIDER: Provider[] = [
  {
    provide: UiSalesDataAccessCountryService,
    useClass: UiSalesDataAccessCountryServiceImpl,
  },
];
