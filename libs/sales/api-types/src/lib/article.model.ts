import { UiSalesBaseModel } from './base.model';

/**
 * The model for specifying all properties of an article.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiArticleModel extends UiSalesBaseModel {
  id: string;
  name: string;
  description: string;
  descriptionInt: string;
  price: number;
  creatorClient_id: string;
  modifyClient_id: string;
  articleUnit_id: string;
}

export interface UiArticleDetailModel extends UiSalesBaseModel {
  id: string;
  name: string;
  description: string;
  descriptionInt: string;
  price: number;
  Creator: {
    id: string;
    name: string;
  };
  EditedBy: {
    id: string;
    name: string;
  };
  Unit: {
    id: string;
    nameLong: string;
    nameShort: string;
  };
}
