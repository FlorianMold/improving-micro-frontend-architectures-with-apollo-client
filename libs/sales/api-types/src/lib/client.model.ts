import { UiSalesBaseModel } from './base.model';

export interface UiClientModel extends UiSalesBaseModel {
  id: string;
  name: string;
}

export interface UiClientRefModel {
  id: string;
  client_id: string;
}
