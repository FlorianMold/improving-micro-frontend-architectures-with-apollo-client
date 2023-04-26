import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, map, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  UiAllInvoicesTablePagedModel,
  UiAllInvoicesTablePagedResponseModel,
  UiInvoiceTablePageFilter,
  UiInvoiceTablePageQueryFilter,
} from '@ui-frontend-service/sales/api-types';
import { UiSalesDataAccessInvoiceService } from '@ui-frontend-service/sales/data-access';

export class UiInvoiceTableDataSource extends DataSource<UiAllInvoicesTablePagedModel> {
  /** The data-subject that contains the current invoices for the table. */
  private _dataSubject = new BehaviorSubject<UiAllInvoicesTablePagedModel[]>([]);

  /** Handles the subscription to the table-data. */
  private _dataSubscription = new Subscription();

  constructor(private _invoiceService: UiSalesDataAccessInvoiceService, private _paginator: MatPaginator) {
    super();
  }

  /**
   * Connects a collection viewer (such as a data-table) to this data source. Note that
   * the stream provided will be accessed during change detection and should not directly change
   * values that are bound in template views.
   * @returns Observable that emits a new value when the data changes.
   */
  override connect(): Observable<UiAllInvoicesTablePagedModel[]> {
    return this._dataSubject.asObservable();
  }

  /**
   * Disconnects a collection viewer (such as a data-table) from this data source. Can be used
   * to perform any clean-up or tear-down operations when a view is being destroyed.
   */
  override disconnect() {
    this._dataSubscription.unsubscribe();
    this._dataSubject.complete();
  }

  /**
   * Loads all invoices based on the given filter.
   *
   * @param _filterObj The object, which contains the fields to filter by.
   * @param sortOrder The sort-order.
   * @param sortField The field to sort by.
   * @param pageIndex The index of the page to fetch.
   * @param pageSize The size of the page to fetch.
   */
  _loadInvoices(
    _filterObj: UiInvoiceTablePageQueryFilter = {},
    sortField = 'number',
    sortOrder = 'asc',
    pageIndex = 0,
    pageSize = 100
  ) {
    const pageFilter: UiInvoiceTablePageFilter = {
      sortField,
      sortOrder,
      perPage: pageSize,
      page: pageIndex,
    };

    this._dataSubscription = combineLatest([
      this._invoiceService.allInvoicesMeta(pageFilter).pipe(filter((response) => !response.loading)),
      this._invoiceService.allInvoices(pageFilter).pipe(filter((response) => !response.loading)),
    ])
      .pipe(
        map(([metaData, invoices]) => ({
          metaData,
          invoices,
        }))
      )
      .subscribe(({ metaData, invoices }) => {
        this._updateTable(invoices, pageFilter, metaData._allInvoicesMeta.count);
      });
  }

  /**
   * Sets the paginator options correctly and emit the fetched data.
   *
   * @param response The response from the request.
   * @param pageFilter The page-filter.
   * @param totalSize The total amount of items that can be displayed.
   */
  private _updateTable(
    response: UiAllInvoicesTablePagedResponseModel,
    pageFilter: UiInvoiceTablePageFilter,
    totalSize: number
  ): void {
    this._dataSubject.next(response.allInvoices);
    this._paginator.pageSize = pageFilter.perPage;
    this._paginator.length = totalSize;
  }
}
