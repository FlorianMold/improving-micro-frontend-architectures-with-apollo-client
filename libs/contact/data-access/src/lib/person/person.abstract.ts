import {
  UiAllPersonsResponseModel,
  UiAllPersonsSubsetResponseModel,
  UiPersonDetailByIdModel,
} from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiPersonByIdGQLVariables } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessPersonService {
  /**
   * Fetches all persons.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allPersons(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllPersonsResponseModel>
  ): Observable<UiAllPersonsResponseModel>;

  /**
   * Fetches all persons with a subset of the fields.
   *
   * TODO(FM): This is a scientific experiment.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allPersonsSubset(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllPersonsSubsetResponseModel>
  ): Observable<UiAllPersonsSubsetResponseModel>;

  /**
   * Fetches a person by id.
   *
   * @param id The id of the person to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract personById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiPersonByIdGQLVariables, UiPersonDetailByIdModel>
  ): Observable<UiPersonDetailByIdModel>;
}
