import { uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UiAllInvoicesSubsetResponseModel,
  UiAllInvoicesTablePagedResponseModel,
  UiInvoiceDetailByIdResponseModel,
  UiInvoicesMetaResponseModel,
  UiInvoiceTablePageFilter,
} from '@ui-frontend-service/sales/api-types';

/**
 * The query for fetching the paginated invoices for the invoices-table.
 */
export const UI_ALL_INVOICES_TABLE_PAGED_QUERY = uiGql<UiAllInvoicesTablePagedResponseModel, UiInvoiceTablePageFilter>`
  query allInvoices($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: InvoiceFilter) {
    allInvoices(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      number
      CreatorClient {
        id
        Client {
          id
          name
        }
      }
      ModifyClient {
        id
        Client {
          id
          name
        }
      }
      Customer {
        id
        name
        name2
        SalesCountry {
          id
          shortName
        }
      }
      InvoiceType {
        id
      }
    }
  }
`;

/**
 * The query for fetching the paginated invoices for the invoices-table.
 */
export const UI_ALL_INVOICES_SUBSET_QUERY = uiGql<UiAllInvoicesSubsetResponseModel, UiInvoiceTablePageFilter>`
  query allInvoicesSubset($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: InvoiceFilter) {
    allInvoices(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      number
      InvoiceType {
        id
      }
    }
  }
`;

/**
 * Loads the meta-data of the invoice-table.
 * This contains the total count of the invoices.
 */
export const UI_ALL_INVOICES_META_QUERY = uiGql<UiInvoicesMetaResponseModel, UiInvoiceTablePageFilter>`
  query _allInvoicesMeta($page: Int, $perPage: Int) {
    _allInvoicesMeta(page: $page, perPage: $perPage) {
      count
    }
  }
`;

/**
 * The variables for fetching a invoice by id.
 */
export interface UiInvoiceByIdGQLVariables {
  /** The id of the invoice to fetch. */
  id: string;
}

/**
 * The query for fetching the invoice-details by id.
 */
export const UI_INVOICE_DETAIL_BY_ID_QUERY = uiGql<UiInvoiceDetailByIdResponseModel, UiInvoiceByIdGQLVariables>`
  query Invoice($id: ID!) {
    Invoice(id: $id) {
      id
      number
      InvoicePositions {
        id
        articleNumber
        articleOrigin
        articleSerial
        articleText
        net
        brut
        position
        remark
        cancellationInvoice
        Vat {
          id
        }
        Article {
          id
          name
          description
          price
          descriptionInt
          ArticleUnit {
            id
          }
        }
      }
      CreatorClient {
        id
        Client {
          id
          name
        }
      }
      ModifyClient {
        id
        Client {
          id
          name
        }
      }
      Customer {
        id
        name
        name2
        postal
        street
        vatNumber
        SalesCountry {
          id
          longName
          shortName
        }
      }
      InvoiceType {
        id
      }
      Notes {
        id
        body
        subject
      }
    }
  }
`;

/**
 * The mutation for removing an invoice.
 */
export const UI_REMOVE_INVOICE_MUTATION = uiGql<{ id: string }, UiRemoveInvoiceDetailGQLVariables>`
  mutation removeInvoice($id: ID!) {
    removeInvoice(id: $id) {
      id
    }
  }
`;

/**
 * The variables for removing an invoice.
 */
export interface UiRemoveInvoiceDetailGQLVariables {
  id: string;
}
