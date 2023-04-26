import { UiSalesBaseModel, UiSalesMutationResponse, UiSalesQueryResponse } from './base.model';
import { UiPageFilter } from './pagination';

/**
 * The model for specifying all properties of an invoice.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiInvoiceModel extends UiSalesBaseModel {
  id: string;
  number: string;
  creatorClient_id: string;
  modifyClient_id: string;
  customer_id: string;
  invoiceType_id: string;
  sales_payment_method_id: string;
}

export interface UiAllInvoicesTablePagedModel {
  id: string;
  number: number;
  CreatorClient: {
    id: string;
    Client: {
      id: string;
      name: string;
    };
  };
  ModifyClient: {
    id: string;
    Client: {
      id: string;
      name: string;
    };
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
  InvoiceType: {
    id: string;
  };
}

export interface UiAllInvoicesTablePagedResponseModel extends UiSalesQueryResponse {
  allInvoices: UiAllInvoicesTablePagedModel[];
}

export interface UiAllInvoicesSubsetResponseModel {
  id: string;
  number: number;
  InvoiceType: {
    id: string;
  };
}

export interface UiAllInvoicesSubsetResponseModel extends UiSalesQueryResponse {
  allInvoices: UiAllInvoicesSubsetResponseModel[];
}

export interface UiInvoiceDetailModel extends UiSalesBaseModel {
  id: string;
  number: number;
  InvoicePositions: {
    id: string;
    articleNumber: string;
    articleOrigin: string;
    articleSerial: string;
    articleText: string;
    net: number;
    brut: number;
    position: number;
    remark: string;
    cancellationInvoice: number;
    Vat: {
      id: string;
    };
    Article: {
      id: string;
      name: string;
      description: string;
      price: number;
      descriptionInt: string;
      ArticleUnit: {
        id: string;
      };
    };
  }[];
  CreatorClient: {
    id: string;
    Client: {
      id: string;
      name: string;
    };
  };
  ModifyClient: {
    id: string;
    Client: {
      id: string;
      name: string;
    };
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
      longName: string;
      shortName: string;
    };
  };
  InvoiceType: {
    id: string;
  };
  Notes: {
    id: string;
    body: string;
    subject: string;
  }[];
}

/**
 * The response-model for the contact-detail query.
 */
export interface UiInvoiceDetailByIdResponseModel extends UiSalesQueryResponse {
  Invoice: UiInvoiceDetailModel;
}

/**
 * The response-model for the meta-data information of the query.
 */
export interface UiInvoicesMetaResponseModel extends UiSalesQueryResponse {
  _allInvoicesMeta: { count: number };
}

/**
 * The fields, which can be filtered on the invoice-table.
 */
export interface UiInvoiceTablePageQueryFilter {
  id?: string | null;
}

/**
 * The page-filter for the contact-table.
 */
export type UiInvoiceTablePageFilter = UiPageFilter<UiInvoiceTablePageQueryFilter>;

/**
 * The response-model for the remove invoice-mutation.
 */
export interface UiInvoiceRemoveByIdResponseModel extends UiSalesMutationResponse {
  removeInvoice?: { id: string };
}
