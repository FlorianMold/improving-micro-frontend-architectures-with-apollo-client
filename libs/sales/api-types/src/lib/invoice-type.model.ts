import { UiSalesBaseModel, UiSalesQueryResponse } from './base.model';

export interface UiInvoiceTypeModel extends UiSalesBaseModel {
  id: string;
}

/**
 * The model for fetching all invoice-types.
 */
export interface UiAllInvoiceTypesResponseModel extends UiSalesQueryResponse {
  allInvoiceTypes: UiInvoiceTypeModel[];
}
