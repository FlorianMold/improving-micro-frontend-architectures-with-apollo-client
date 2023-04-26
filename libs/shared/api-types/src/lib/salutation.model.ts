import { UiBaseModel, UiBaseQueryResponse } from './base.model';

/**
 * The model, which specifies all salutation-properties.
 */
export interface UiSalutationModel extends UiBaseModel {
  id: string;
}

/**
 * The response-model for all salutations query.
 */
export interface UiAllSalutationsResponseModel extends UiBaseQueryResponse {
  allSalutations: UiSalutationModel[];
}
