import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UiAllContractsTablePagedModel } from '@ui-frontend-service/sales/api-types';
import { SelectionModel } from '@angular/cdk/collections';
import { UiDeleteDialogConfig } from '@ui-frontend-service/shared/ui/components/delete-dialog';
import { filter, Subscription } from 'rxjs';
import { UiSalesDataAccessContractService, UiSalesDataAccessCountryService } from '@ui-frontend-service/sales/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UI_TABLE_DEFAULT_OPTIONS, UiTableOptions } from '@ui-frontend-service/shared/feature/common-options';
import { UiContractTableDataSource } from './contract-table-datasource';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-sales-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesContractTableComponent implements OnInit, OnDestroy {
  /** The data-source. **/
  _dataSource!: UiContractTableDataSource;

  /** The columns to display inside the table. */
  displayedColumns = ['contractNumber', 'name', 'contractor', 'modifierName', 'customerName', 'customerCountry', 'context-menu'];

  /** Reference to the paginator of the table. */
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  /** Reference to the sort. */
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  /** Reference to the table. */
  @ViewChild(MatTable, { static: true }) table!: MatTable<UiAllContractsTablePagedModel>;

  /** The possible options for the size of the table-page. */
  _pageSizeOptions: number[] = [10, 25, 50, 100];

  /** The initial size of the table-page. */
  _pageSize = 100;

  /**
   * Store the id of the selected table-row.
   * Used to show the selected-row.
   */
  _selectedRow = new SelectionModel<string>(false);

  /**
   * The configuration for the delete-dialog inside the table.
   */
  _deleteDialogConfig: UiDeleteDialogConfig = {
    title: 'Vertrag entfernen',
    description: 'Wollen Sie den Vertrag wirklich entfernen?',
    applyButtonText: 'OK',
    cancelButtonText: 'Abbrechen',
  };

  /** Subscription of the search-value-form. */
  private _searchFormValueChangesSubscription?: Subscription;

  /** Whether the data for the contract-detail form has been prefetched. */
  private _dataPrefetched = false;

  constructor(
    private _contractService: UiSalesDataAccessContractService,
    private _countryService: UiSalesDataAccessCountryService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    @Optional() @Inject(UI_TABLE_DEFAULT_OPTIONS) private _tableOptions?: UiTableOptions
  ) {
    if (this._tableOptions) {
      this._pageSizeOptions = this._tableOptions?.pageSizeOptions;
      this._pageSize = this._tableOptions?.pageSize;
    }

    /**
     * Preselect a row inside the table.
     */
    const path = window.location.pathname;
    const result = path.match(/.*\/(.*)\)/);
    if (result && result.length > 1) {
      this._selectedRow.select(result[1]);
    }
  }

  /**
   * Loads all contracts for the table with the given filter.
   *
   * @param pageEvent The page-event from the paginator.
   */
  loadContracts(pageEvent?: PageEvent): void {
    const filterObj = {};

    const direction = this.sort.direction === '' ? 'asc' : this.sort.direction;

    this._dataSource._loadContracts(
      filterObj,
      this.sort.active,
      direction,
      this.paginator.pageIndex,
      pageEvent?.pageSize || this._pageSize
    );
  }

  /**
   * Handles when the mat-sort button is clicked.
   * Reloads the contracts with the new sort.
   */
  handleTableSortChange() {
    this.paginator.pageIndex = 0;
    this.loadContracts();
  }

  /**
   * Handles the click of a table-row.
   *
   * @param row The data of the row that was clicked.
   * @param event The click-event on the table-row.
   */
  handleTableRowClick({ id }: UiAllContractsTablePagedModel, { target }: MouseEvent): void {
    const htmlTarget = target as HTMLElement;

    /** Prevent routing to the detail-view, when the remove-icon was clicked. */
    if (htmlTarget && htmlTarget.classList.contains('mat-icon')) {
      return;
    }

    this._selectedRow.select(id);
    void this._router.navigate(['./sales/contracts', { outlets: { 'detail-outlet': ['detail', id] } }]);
  }

  /**
   * Handles the click of the delete-button inside the table.
   *
   * @param contract The contract to delete.
   */
  handleDeleteContractClick(contract: UiAllContractsTablePagedModel): void {
    this._contractService
      .removeContractById(contract.id)
      .pipe(filter((data) => !data.loading))
      .subscribe(() => {
        this._snackBar.open(`Vertrag mit der Nr. ${contract.id} erfolgreich gelöscht`, 'X');
      });
  }

  /**
   */
  prefetchFormData() {
    /** Make sure the data gets only prefetched once. */
    if (!this._dataPrefetched) {
      this._countryService.allCountries().subscribe();
      this._dataPrefetched = true;
    }
  }

  ngOnInit(): void {
    this._dataSource = new UiContractTableDataSource(this._contractService, this.paginator);

    /** Load the initial data of the table. */
    this._dataSource._loadContracts();
  }

  ngOnDestroy(): void {
    this._searchFormValueChangesSubscription?.unsubscribe();
  }
}
