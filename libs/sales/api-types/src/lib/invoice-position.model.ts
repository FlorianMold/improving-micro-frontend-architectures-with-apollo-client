import { UiSalesBaseModel } from './base.model';

/**
 * The model for specifying all properties of an invoice-position.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiInvoicePositionModel extends UiSalesBaseModel {
  id: string;
  articleNumber: string;
  articleOrigin: string;
  articleSerial: string;
  articleText: string;
  brut: number;
  cancellationInvoice: number;
  net: number;
  paidDate: number;
  paymentDeadline: number;
  position: number;
  remark: string;
  article_id: string;
  contract_id: string;
  invoice_id: string;
  vat_id: string;
}
