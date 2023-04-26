import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { UiContactTableDataSource } from './contact-table-datasource';
import {
  UiContactDataAccessContactService,
  UiContactDataAccessCountryService,
  UiContactDataAccessSalutationService,
  UiContactDataAccessTitleService,
} from '@ui-frontend-service/contact/data-access';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UiAllContactsTablePagedModel, UiContactModel } from '@ui-frontend-service/contact/api-types';
import { UI_TABLE_DEFAULT_OPTIONS, UiTableOptions } from '@ui-frontend-service/shared/feature/common-options';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { UiDeleteDialogConfig } from '@ui-frontend-service/shared/ui/components/delete-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ui-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContactTableComponent implements OnInit, OnDestroy {
  /** The data-source. **/
  _dataSource!: UiContactTableDataSource;

  /** Whether to display the search-inputs in every column.  */
  @Input() displaySearchColumns = false;

  /** The columns to display inside the table. */
  displayedColumns = [
    'customerNumber',
    'name',
    'firstName',
    'secondName',
    'uidNumber',
    'postalCode',
    'location',
    'country',
    'isCustomer',
    'isSupplier',
    'isEmployee',
    'context-menu',
  ];

  /** The columns, which can be searched. */
  displayedSearchColumns = [
    'customNumberSearch',
    'nameSearch',
    'firstNameSearch',
    'secondNameSearch',
    'uidNumberSearch',
    'postalCodeSearch',
    'locationSearch',
    'countrySearch',
    'isCustomerSearch',
    'isSupplierSearch',
    'isEmployeeSearch',
  ];

  /** Reference to the paginator of the table. */
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  /** Reference to the sort. */
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  /** Reference to the table. */
  @ViewChild(MatTable, { static: true }) table!: MatTable<UiContactModel>;

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
    title: 'Kontakt entfernen',
    description: 'Wollen Sie den Kontakt wirklich entfernen?',
    applyButtonText: 'OK',
    cancelButtonText: 'Abbrechen',
  };

  /** Subscription of the search-value-form. */
  private _searchFormValueChangesSubscription?: Subscription;

  /** Whether the data for the contact-detail form has been prefetched. */
  private _dataPrefetched = false;

  constructor(
    private _contactService: UiContactDataAccessContactService,
    private _countryService: UiContactDataAccessCountryService,
    private _titleService: UiContactDataAccessTitleService,
    private _salutationService: UiContactDataAccessSalutationService,
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
    customerNumberSearchInput: [''],
    nameSearchInput: [''],
    firstNameSearchInput: [''],
    secondNameSearchInput: [''],
    uidNumberSearchInput: [''],
    postalCodeSearchInput: [''],
    locationSearchInput: [''],
    countrySearchInput: [''],
    isCustomerSearchInput: [''],
    isSupplierSearchInput: [''],
    isEmployeeSearchInput: [''],
  });

  /**
   * Loads all contacts for the table with the given filter.
   *
   * @param pageEvent The page-event from the paginator.
   * @param customerNumberSearchInput The value of the customer-number-search-input.
   * @param uidNumberSearchInput The value of the uid-number-search-input.
   * @param firstNameSearchInput The value of the first-name-search-input.
   * @param secondNameSearchInput The value of the second-name-search-input.
   */
  loadContacts(
    pageEvent?: PageEvent,
    { customerNumberSearchInput, uidNumberSearchInput, firstNameSearchInput, secondNameSearchInput } = this.searchForm.value
  ): void {
    const filterObj = {
      ...(customerNumberSearchInput && { customerNumber: customerNumberSearchInput }),
      ...(uidNumberSearchInput && { uidNumber: uidNumberSearchInput }),
      ...(firstNameSearchInput && { firstName: firstNameSearchInput }),
      ...(secondNameSearchInput && { secondName: secondNameSearchInput }),
    };

    const direction = this.sort.direction === '' ? 'asc' : this.sort.direction;

    this._dataSource._loadContacts(
      filterObj,
      this.sort.active,
      direction,
      this.paginator.pageIndex,
      pageEvent?.pageSize || this._pageSize
    );
  }

  /**
   * Handles when the mat-sort button is clicked.
   * Reloads the contacts with the new sort.
   */
  handleTableSortChange() {
    this.paginator.pageIndex = 0;
    this.loadContacts();
  }

  /**
   * Handles the click of a table-row.
   *
   * @param row The data of the row that was clicked.
   * @param event The click-event on the table-row.
   */
  handleTableRowClick({ id }: UiAllContactsTablePagedModel, { target }: MouseEvent): void {
    const htmlTarget = target as HTMLElement;

    /** Prevent routing to the detail-view, when the remove-icon was clicked. */
    if (htmlTarget && htmlTarget.classList.contains('mat-icon')) {
      return;
    }

    this._selectedRow.select(id);
    void this._router.navigate(['./contact', { outlets: { 'detail-outlet': ['detail', id] } }]);
  }

  /**
   * Handles the click of the delete-button inside the table.
   *
   * @param contact The contact to delete.
   */
  handleDeleteContactClick(contact: UiAllContactsTablePagedModel): void {
    this._contactService
      .removeContactById(contact.id)
      .pipe(filter((data) => !data.loading))
      .subscribe(() => {
        this._snackBar.open(`Kontakt mit der KNR ${contact.customerNumber} erfolgreich gelöscht`, 'X');
      });
  }

  /**
   * Sets up a listener on the search-form value-changes.
   * Everytime a value is typing into one of the fields of the form, a
   * query will be executed, which fetches the contacts that match the
   * filter.
   */
  private _setupSearchFormListener(): void {
    this._searchFormValueChangesSubscription = this.searchForm.valueChanges
      .pipe(
        map(({ customerNumberSearchInput, uidNumberSearchInput, firstNameSearchInput, secondNameSearchInput }) => ({
          customerNumberSearchInput,
          uidNumberSearchInput: uidNumberSearchInput?.trim(),
          firstNameSearchInput: firstNameSearchInput?.trim(),
          secondNameSearchInput: secondNameSearchInput?.trim(),
        })),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((formValue) => {
        this.paginator.pageIndex = 0;
        this.loadContacts(undefined, formValue);
      });
  }

  /**
   * When the user hovers over a row inside the table, the countries, salutations and titles will be prefetched.
   */
  prefetchFormData() {
    /** Make sure the data gets only prefetched once. */
    if (!this._dataPrefetched) {
      this._countryService.allCountries().subscribe();
      this._salutationService.allSalutations().subscribe();
      this._titleService.allTitles().subscribe();
      this._dataPrefetched = true;
    }
  }

  ngOnInit(): void {
    this._dataSource = new UiContactTableDataSource(this._contactService, this.paginator);

    /** Load the initial data of the table. */
    this._dataSource._loadContacts();

    this._setupSearchFormListener();
  }

  ngOnDestroy(): void {
    this._searchFormValueChangesSubscription?.unsubscribe();
  }
}
