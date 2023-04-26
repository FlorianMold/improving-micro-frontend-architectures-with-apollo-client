import { UiSalesBaseModel, UiSalesMutationResponse, UiSalesQueryResponse } from './base.model';
import { UiPageFilter } from './pagination';

/**
 * The model for specifying all properties of a contract.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiContractModel extends UiSalesBaseModel {
  id: string;
  contractor: string;
  description: string;
  name: string;
  payPeriod: number;
  payPeriodAdvance: number;
  paymentAt: number;
  validAt: number;
  validTo: number;
  client_id: string;
  customer_id: string;
}

export interface UiAllContractsTablePagedModel {
  id: string;
  contractor: string;
  description: string;
  name: string;
  Client: {
    id: string;
    name: string;
  };
  Customer: {
    id: string;
    name: string;
    name2: string;
    SalesCountry: {
      id: string;
      shortName: string;
    };
  };
}

export interface UiAllContractsSubsetModel {
  id: string;
  contractor: string;
  description: string;
  name: string;
  Customer: {
    id: string;
    SalesCountry: {
      id: string;
      shortName: string;
    };
  };
}

export interface UiAllContractsTablePagedResponseModel extends UiSalesQueryResponse {
  allContracts: UiAllContractsTablePagedModel[];
}

export interface UiAllContractsSubsetResponseModel extends UiSalesQueryResponse {
  allContracts: UiAllContractsSubsetModel[];
}

export interface UiContractDetailModel extends UiSalesBaseModel {
  id: string;
  contractor: string;
  description: string;
  name: string;
  payPeriod: number;
  payPeriodAdvance: number;
  Client: {
    id: string;
    name: string;
  };
  Customer: {
    id: string;
    name: string;
    name2: string;
    postal: string;
    street: string;
    vatNumber: string;
    SalesCountry: {
      id: string;
      shortName: string;
      longName: string;
    };
  };
}

/**
 * The response-model for the contact-detail query.
 */
export interface UiContractDetailByIdResponseModel extends UiSalesQueryResponse {
  Contract: UiContractDetailModel;
}

/**
 * The response-model for the meta-data information of the query.
 */
export interface UiContractsMetaResponseModel extends UiSalesQueryResponse {
  _allContractsMeta: { count: number };
}

/**
 * The fields, which can be filtered on the contract-table.
 */
export interface UiContractTablePageQueryFilter {
  id?: string | null;
}

/**
 * The page-filter for the contact-table.
 */
export type UiContractTablePageFilter = UiPageFilter<UiContractTablePageQueryFilter>;

/**
 * The response-model for the remove contract-mutation.
 */
export interface UiContractRemoveByIdResponseModel extends UiSalesMutationResponse {
  removeContract?: { id: string };
}
