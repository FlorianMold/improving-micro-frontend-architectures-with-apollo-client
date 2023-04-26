import { UiContactBaseModel, UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of an email-type.
 */
export interface UiEmailTypeModel extends UiContactBaseModel {
  id: string;
}

/**
 * The model for fetching all email-types.
 */
export interface UiAllEmailTypesResponseModel extends UiContactQueryResponse {
  allEmailTypes: UiEmailTypeModel[];
}

/**
 * The model for fetching an email-type by id.
 */
export interface UiEmailTypeByIdResponseModel extends UiContactQueryResponse {
  EmailType: UiEmailTypeModel;
}
