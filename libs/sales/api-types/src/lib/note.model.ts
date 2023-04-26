import { UiSalesBaseModel } from './base.model';

/**
 * The model for specifying all properties of a note.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiNoteModel extends UiSalesBaseModel {
  id: string;
  body: string;
  date: number;
  subject: string;
  uid: number;
  invoice_id: string;
}
