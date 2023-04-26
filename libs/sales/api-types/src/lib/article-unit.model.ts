import { UiSalesBaseModel, UiSalesQueryResponse } from './base.model';

export interface UiArticleUnitModel extends UiSalesBaseModel {
  id: string;
  nameLong: string;
  nameShort: string;
}

/**
 * The model for fetching all article-units.
 */
export interface UiAllArticleUnitsResponseModel extends UiSalesQueryResponse {
  allArticleUnits: UiArticleUnitModel[];
}
