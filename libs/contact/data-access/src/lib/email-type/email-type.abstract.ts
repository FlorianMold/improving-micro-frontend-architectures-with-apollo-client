import { UiEmailTypeByIdResponseModel, UiAllEmailTypesResponseModel } from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiEmailTypeByIdGQLVariables } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessEmailTypeService {
  /**
   * Fetches all email-types.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allEmailTypes(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllEmailTypesResponseModel>
  ): Observable<UiAllEmailTypesResponseModel>;

  /**
   * Fetches a email-type by id.
   *
   * @param id The id of the email-type to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract emailTypeById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiEmailTypeByIdGQLVariables, UiEmailTypeByIdResponseModel>
  ): Observable<UiEmailTypeByIdResponseModel>;
}
