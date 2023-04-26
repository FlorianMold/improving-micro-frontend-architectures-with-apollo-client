import { UiBaseQueryResponse, UiBaseModel } from './base.model';

/**
 * The model, which specifies all title-properties.
 */
export interface UiTitleModel extends UiBaseModel {
  id: string;
}

/**
 * The model, when all titles are fetched.
 */
export interface UiAllTitlesResponseModel extends UiBaseQueryResponse {
  allTitles: UiTitleModel[];
}
