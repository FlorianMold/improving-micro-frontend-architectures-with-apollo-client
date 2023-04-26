import {
  UiAllCountriesResponseModel,
  UiCountryByIdResponseModel,
  UiCreateCountryResponseModel,
  UiRemoveCountryResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiCountryByIdGQLVariables, UiCreateCountryGQLVariables } from './graphql';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiRemoveContactDetailGQLVariables } from '../contact';

export abstract class UiContactDataAccessCountryService {
  /**
   * Fetches all countries.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allCountries(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllCountriesResponseModel>
  ): Observable<UiAllCountriesResponseModel>;

  /**
   * Fetches a country by id.
   *
   * @param id The id of the country to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract countryById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiCountryByIdGQLVariables, UiCountryByIdResponseModel>
  ): Observable<UiCountryByIdResponseModel>;

  /**
   * Creates a new country with the given id.
   *
   * @param id The identifier of the country to create.
   * @param options The options to pass to the mutation method.
   *
   * @privateRemarks This function does not work with the json-graphql-test-backend!
   */
  abstract createCountry(
    id: string,
    options?: UiMutationOptionsAlone<UiCreateCountryResponseModel, UiCreateCountryGQLVariables>
  ): Observable<UiCreateCountryResponseModel>;

  /**
   * Removes the country with the given id.
   *
   * @param id The identifier of the country to remove.
   * @param options The options to pass to the mutation method.
   */
  abstract removeCountry(
    id: string,
    options?: UiMutationOptionsAlone<UiRemoveCountryResponseModel, UiRemoveContactDetailGQLVariables>
  ): Observable<UiRemoveCountryResponseModel>;
}
