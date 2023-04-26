import { UiAllSubContactsResponseModel, UiSubContactDetailByIdResponseModel } from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query for fetching all sub-contacts.
 */
export const UI_ALL_SUB_CONTACTS_QUERY = uiGql<UiAllSubContactsResponseModel, UiEmptyObject>`
  query subContacts {
    allSubContacts {
      id
      EmailType {
        id
      }
      email
    }
  }
`;

/**
 * The variables needed for fetching a sub-contact by id.
 */
export type UiSubContactByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the sub-contact-details by id.
 */
export const UI_SUB_CONTACT_BY_ID_QUERY = uiGql<UiSubContactDetailByIdResponseModel, UiSubContactByIdGQLVariables>`
  query subContactById($id: ID!) {
    SubContact(id: $id) {
      id
      EmailType {
        id
      }
      email
    }
  }
`;
