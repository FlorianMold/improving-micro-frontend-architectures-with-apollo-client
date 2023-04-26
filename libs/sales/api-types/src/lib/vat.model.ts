import { UiSalesBaseModel, UiSalesQueryResponse } from './base.model';

export interface UiVatModel extends UiSalesBaseModel {
  id: string;
  vat: number;
  vatRemark: string;
}

/**
 * The model for fetching all currencies.
 */
export interface UiAllVatsModel extends UiSalesBaseModel {
  id: string;
  vat: number;
  vatRemark: string;
}

/**
 * The model for fetching all vats.
 */
export interface UiAllVatsResponseModel extends UiSalesQueryResponse {
  allVats: UiAllVatsModel[];
}
