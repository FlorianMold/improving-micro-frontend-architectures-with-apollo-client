import { UiContactBaseModel, UiContactMutationResponse, UiContactQueryResponse } from './base.model';

/**
 * The model, which specifies all title-properties.
 */
export interface UiTitleModel extends UiContactBaseModel {
  id: string;
}

/**
 * The model, when all titles are fetched.
 */
export interface UiAllTitlesResponseModel extends UiContactQueryResponse {
  allTitles: UiTitleModel[];
}

/**
 * The model, when a title is fetched by id.
 */
export interface UiTitleByIdResponseModel extends UiContactQueryResponse {
  Title: UiTitleModel;
}

/** The response-model for the create-title mutation. */
export interface UiCreateTitleResponseModel extends UiContactMutationResponse {
  createTitle?: UiTitleModel;
}

/** The response-model for the remove-title mutation. */
export interface UiRemoveTitleResponseModel extends UiContactMutationResponse {
  removeTitle?: UiTitleModel;
}
