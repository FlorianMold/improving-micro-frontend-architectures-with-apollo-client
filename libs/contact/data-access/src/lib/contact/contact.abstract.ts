import {
  UiAllContactsSubsetResponseModel,
  UiAllContactsTablePagedResponseModel,
  UiContactCountriesCountAggregatedResponseModel,
  UiContactCountriesCountResponseModel,
  UiContactDetailByIdResponseModel,
  UiContactDetailModel,
  UiContactRemoveByIdResponseModel,
  UiContactsMetaResponseModel,
  UiContactTablePageFilter,
  UiContactTitlesCountAggregatedResponseModel,
  UiContactTitlesCountResponseModel,
  UiCreateContactDetailResponseModel,
  UiUpdateContactDetailResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import {
  UiContactByIdGQLVariables,
  UiCreateContactDetailGQLVariables,
  UiRemoveContactDetailGQLVariables,
  UiUpdateContactDetailGQLVariables,
} from './graphql';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessContactService {
  /**
   * Fetches meta-data about the contact-table.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options to pass to the watchQuery method.
   */
  abstract allContactsMeta(
    pageFilter: UiContactTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContactTablePageFilter, UiContactsMetaResponseModel>
  ): Observable<UiContactsMetaResponseModel>;

  /**
   * Fetches all contacts paged according to the filter.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all contacts for the table.
   */
  abstract allContacts(
    pageFilter?: UiContactTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContactTablePageFilter, UiAllContactsTablePagedResponseModel>
  ): Observable<UiAllContactsTablePagedResponseModel>;

  /**
   * Fetches all contacts with a subset of properties.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all contacts for the table.
   */
  abstract allContactsSubset(
    pageFilter?: UiContactTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiContactTablePageFilter, UiAllContactsSubsetResponseModel>
  ): Observable<UiAllContactsSubsetResponseModel>;

  /**
   * Fetch a contact by id.
   *
   * @param id The id of the contact to fetch.
   * @param options The options for the retrieval of the contact by id.
   */
  abstract contactDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiContactByIdGQLVariables, UiContactDetailByIdResponseModel>
  ): Observable<UiContactDetailByIdResponseModel>;

  /**
   * Fetches which title is used the most often.
   *
   * @param options The options for the retrieval of the titles-count.
   */
  abstract contactTitlesCount(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiContactTitlesCountResponseModel>
  ): Observable<UiContactTitlesCountAggregatedResponseModel>;

  /**
   * Fetches which country is used the most often.
   *
   * @param options The options for the retrieval of the country-count.
   */
  abstract contactCountryCount(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiContactCountriesCountResponseModel>
  ): Observable<UiContactCountriesCountAggregatedResponseModel>;

  /**
   * Updates an existing contact.
   *
   * @param contact The updated contact details.
   * @param options The options for the update of the contact.
   *
   */
  abstract updateContact(
    contact: UiContactDetailModel,
    options?: UiMutationOptionsAlone<UiUpdateContactDetailResponseModel, UiUpdateContactDetailGQLVariables>
  ): Observable<UiUpdateContactDetailResponseModel>;

  /**
   * Creates the given contact.
   *
   * @param contact The input values used to create the contact object.
   * @param options The options for the creation of the contact.
   *
   */
  abstract createContact(
    contact: UiContactDetailModel,
    options?: UiMutationOptionsAlone<UiCreateContactDetailResponseModel, UiCreateContactDetailGQLVariables>
  ): Observable<UiCreateContactDetailResponseModel>;

  /**
   * Remove the contact with the given id.
   *
   * @param id The id of the contact to remove.
   * @param options The options for the removal of the contact.
   */
  abstract removeContactById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveContactDetailGQLVariables>
  ): Observable<UiContactRemoveByIdResponseModel>;
}
