import { Observable } from 'rxjs';
import { UiMutationOptionsAlone, UiWatchQueryOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UiAllInvoicesSubsetResponseModel,
  UiAllInvoicesTablePagedResponseModel,
  UiInvoiceDetailByIdResponseModel,
  UiInvoiceRemoveByIdResponseModel,
  UiInvoicesMetaResponseModel,
  UiInvoiceTablePageFilter,
} from '@ui-frontend-service/sales/api-types';
import { UiInvoiceByIdGQLVariables, UiRemoveInvoiceDetailGQLVariables } from './graphql';

export abstract class UiSalesDataAccessInvoiceService {
  /**
   * Fetches meta-data about the sales-table.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options to pass to the watchQuery method.
   */
  abstract allInvoicesMeta(
    pageFilter: UiInvoiceTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiInvoiceTablePageFilter, UiInvoicesMetaResponseModel>
  ): Observable<UiInvoicesMetaResponseModel>;

  /**
   * Fetches all invoices paged according to the filter.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all invoices for the table.
   */
  abstract allInvoices(
    pageFilter?: UiInvoiceTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiInvoiceTablePageFilter, UiAllInvoicesTablePagedResponseModel>
  ): Observable<UiAllInvoicesTablePagedResponseModel>;

  /**
   * Fetches all invoices with a subset of fields.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all invoices for the table.
   */
  abstract allInvoicesSubset(
    pageFilter?: UiInvoiceTablePageFilter,
    options?: UiWatchQueryOptionsAlone<UiInvoiceTablePageFilter, UiAllInvoicesSubsetResponseModel>
  ): Observable<UiAllInvoicesSubsetResponseModel>;

  /**
   * Fetch a invoice by id.
   *
   * @param id The id of the invoice to fetch.
   * @param options The options for the retrieval of the invoice by id.
   */
  abstract invoiceDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiInvoiceByIdGQLVariables, UiInvoiceDetailByIdResponseModel>
  ): Observable<UiInvoiceDetailByIdResponseModel>;

  /**
   * Remove the invoice with the given id.
   *
   * @param id The id of the invoice to remove.
   * @param options The options for the removal of the invoice.
   */
  abstract removeInvoiceById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveInvoiceDetailGQLVariables>
  ): Observable<UiInvoiceRemoveByIdResponseModel>;
}
