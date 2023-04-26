import { UiContactBaseModel, UiContactMutationResponse, UiContactQueryResponse } from './base.model';

/**
 * The model, which specifies all salutation-properties.
 */
export interface UiSalutationModel extends UiContactBaseModel {
  id: string;
}

/**
 * The response-model for all salutations query.
 */
export interface UiAllSalutationsResponseModel extends UiContactQueryResponse {
  allSalutations: UiSalutationModel[];
}

/**
 * The response-model for the salutation detail query.
 */
export interface UiSalutationDetailByIdResponseModel extends UiContactQueryResponse {
  Salutation: UiSalutationModel;
}

/** The response-model for the create-salutation mutation. */
export interface UiCreateSalutationResponseModel extends UiContactMutationResponse {
  createSalutation?: UiSalutationModel;
}

/** The response-model for the remove-salutation mutation. */
export interface UiRemoveSalutationResponseModel extends UiContactMutationResponse {
  removeSalutation?: UiSalutationModel;
}
