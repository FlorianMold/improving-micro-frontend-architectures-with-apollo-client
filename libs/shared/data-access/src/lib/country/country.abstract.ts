import { UiAllCountriesResponseModel } from '@ui-frontend-service/shared/api-types';
import { Observable } from 'rxjs';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiCountryDataAccessService {
  /**
   * Fetches all countries.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allCountries(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllCountriesResponseModel>
  ): Observable<UiAllCountriesResponseModel>;
}
