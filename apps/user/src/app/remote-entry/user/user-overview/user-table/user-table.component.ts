import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UiDeleteDialogConfig, UiDeleteDialogModule } from '@ui-frontend-service/shared/ui/components/delete-dialog';
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UI_TABLE_DEFAULT_OPTIONS, UiTableOptions } from '@ui-frontend-service/shared/feature/common-options';
import { filter } from 'rxjs/operators';
import {
  UiCountryDataAccessService,
  UiSalutationDataAccessService,
  UiTitleDataAccessService,
  UiUserDataAccessService,
} from '@ui-frontend-service/shared/data-access';
import { UiAllUsersModel } from '@ui-frontend-service/shared/api-types';
import { UiUserTableDataSource } from './user-table-datasource';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ui-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    UiDeleteDialogModule,
  ],
})
export class UiUserTableComponent implements OnInit, OnDestroy {
  /** The data-source. **/
  _dataSource!: UiUserTableDataSource;

  /** Whether to display the search-inputs in every column.  */
  @Input() displaySearchColumns = false;

  /** The columns to display inside the table. */
  displayedColumns = ['email', 'username', 'title', 'salutation', 'firstName', 'secondName', 'gender', 'context-menu'];

  /** The columns, which can be searched. */
  displayedSearchColumns = [];

  /** Reference to the paginator of the table. */
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  /** Reference to the sort. */
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  /** Reference to the table. */
  @ViewChild(MatTable, { static: true }) table!: MatTable<UiAllUsersModel>;

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
    title: 'Benutzer entfernen',
    description: 'Wollen Sie den Benutzer wirklich entfernen?',
    applyButtonText: 'OK',
    cancelButtonText: 'Abbrechen',
  };

  /** Subscription of the search-value-form. */
  private _searchFormValueChangesSubscription?: Subscription;

  /** Whether the data for the user-detail form has been prefetched. */
  private _dataPrefetched = false;

  constructor(
    private _userService: UiUserDataAccessService,
    private _countryService: UiCountryDataAccessService,
    private _titleService: UiTitleDataAccessService,
    private _salutationService: UiSalutationDataAccessService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
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

  /** The form displayed inside the table. */
  searchForm = this._formBuilder.group({
    emailInput: [''],
    usernameInput: [''],
  });

  /**
   * Loads all users for the table with the given filter.
   *
   * @param pageEvent The page-event from the paginator.
   * @param emailInput The filter to apply.
   * @param usernameInput The filter to apply.
   */
  loadUsers(pageEvent?: PageEvent, { emailInput, usernameInput } = this.searchForm.value): void {
    const filterObj = {
      ...(emailInput && { email: emailInput }),
      ...(usernameInput && { username: usernameInput }),
    };
    const direction = this.sort.direction === '' ? 'asc' : this.sort.direction;

    this._dataSource._loadUsers(
      filterObj,
      this.sort.active,
      direction,
      this.paginator.pageIndex,
      pageEvent?.pageSize || this._pageSize
    );
  }

  /**
   * Handles when the mat-sort button is clicked.
   * Reloads the users with the new sort.
   */
  handleTableSortChange() {
    this.paginator.pageIndex = 0;
    this.loadUsers();
  }

  /**
   * Handles the click of a table-row.
   *
   * @param row The data of the row that was clicked.
   * @param event The click-event on the table-row.
   */
  handleTableRowClick({ id }: UiAllUsersModel, { target }: MouseEvent): void {
    const htmlTarget = target as HTMLElement;

    /** Prevent routing to the detail-view, when the remove-icon was clicked. */
    if (htmlTarget && htmlTarget.classList.contains('mat-icon')) {
      return;
    }

    this._selectedRow.select(id);
    void this._router.navigate(['./users', { outlets: { 'detail-outlet': ['detail', id] } }]);
  }

  /**
   * Handles the click of the delete-button inside the table.
   *
   * @param user The user to delete.
   */
  handleDeleteUserClick(user: UiAllUsersModel): void {
    this._userService
      .removeUserById(user.id)
      .pipe(filter((data) => !data.loading))
      .subscribe(() => {
        this._snackBar.open(`Benutzer ${user.id} erfolgreich gelöscht`, 'X');
      });
  }

  /**
   * Sets up a listener on the search-form value-changes.
   * Everytime a value is typing into one of the fields of the form, a
   * query will be executed, which fetches the user that match the
   * filter.
   */
  private _setupSearchFormListener(): void {
    this._searchFormValueChangesSubscription = this.searchForm.valueChanges
      .pipe(
        map(({ usernameInput, emailInput }) => ({
          usernameInput: usernameInput?.trim(),
          emailInput: emailInput?.trim(),
        })),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((formValue) => {
        this.paginator.pageIndex = 0;
        this.loadUsers(undefined, formValue);
      });
  }

  /**
   * When the user hovers over a row inside the table, the countries, salutations and titles will be prefetched.
   */
  prefetchFormData(): void {
    /** Make sure the data gets only prefetched once. */
    if (!this._dataPrefetched) {
      this._countryService.allCountries().subscribe();
      this._salutationService.allSalutations().subscribe();
      this._titleService.allTitles().subscribe();
      this._dataPrefetched = true;
    }
  }

  ngOnInit(): void {
    this._dataSource = new UiUserTableDataSource(this._userService, this.paginator);

    /** Load the initial data of the table. */
    this._dataSource._loadUsers();

    this._setupSearchFormListener();
  }

  ngOnDestroy(): void {
    this._searchFormValueChangesSubscription?.unsubscribe();
  }
}
