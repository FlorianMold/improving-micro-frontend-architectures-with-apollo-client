import { UiContactBaseModel, UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a sub-contact.
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiSubContactModel extends UiContactBaseModel {
  id: string;
  email: string;
  emailType_id: string;
  contact_id: string;
  person_id: string;
}

/**
 * The model for loading all sub-contacts.
 */
export interface UiAllSubContactsModel extends UiContactBaseModel {
  id: string;
  email: string;
  EmailType: {
    id: string;
  };
}

/**
 * The response-model for all sub-contacts query.
 */
export interface UiAllSubContactsResponseModel extends UiContactQueryResponse {
  allSubContacts: UiSubContactModel[];
}

/**
 * The model for the sub-contact-detail query.
 */
export interface UiSubContactDetailByIdModel extends UiContactBaseModel {
  id: string;
  email: string;
}

/**
 * The response-model for the sub-contact-detail query.
 */
export interface UiSubContactDetailByIdResponseModel extends UiContactQueryResponse {
  SubContact: UiSubContactDetailByIdModel;
}
