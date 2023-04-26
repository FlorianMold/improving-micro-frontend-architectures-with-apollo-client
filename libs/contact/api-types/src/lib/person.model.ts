import { UiContactBaseModel, UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a person.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiPersonModel extends UiContactBaseModel {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  mobile: string | null;
  fax: string | null;
  function: string;
}

/**
 * The model for fetching all persons.
 */
export interface UiAllPersonsModel {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  mobile: string | null;
  fax: string | null;
  function: string;
}

/**
 * The response-model for all persons query.
 */
export interface UiAllPersonsResponseModel extends UiContactQueryResponse {
  allPeople: UiAllPersonsModel[];
}

/**
 * The model for fetching all persons, with a subset of attributes.
 */
export interface UiAllPersonsSubsetModel {
  id: string;
  firstName: string | null;
  lastName: string | null;
}

/**
 * The response-model for all persons query.
 */
export interface UiAllPersonsSubsetResponseModel extends UiContactQueryResponse {
  allPeople: UiAllPersonsSubsetModel[];
}

/**
 * The model for fetching all persons.
 */
export interface UiPersonDetailByIdModel {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  mobile: string | null;
  fax: string | null;
  function: string;
}

/**
 * The response-model for the person-detail query.
 */
export interface UiPersonDetailByIdResponseModel extends UiContactQueryResponse {
  Person: UiPersonDetailByIdModel;
}
