import { UiAllSubContactsModel, UiSubContactDetailByIdModel } from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import { UiSubContactByIdGQLVariables } from './graphql';
import { UiEmptyObject, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessSubContactService {
  /**
   * Fetches all sub-contact.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allSubContacts(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAllSubContactsModel>
  ): Observable<UiAllSubContactsModel>;

  /**
   * Fetches a sub-contact by id.
   *
   * @param id The id of the sub-contact to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract subContactById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiSubContactByIdGQLVariables, UiSubContactDetailByIdModel>
  ): Observable<UiSubContactDetailByIdModel>;
}
