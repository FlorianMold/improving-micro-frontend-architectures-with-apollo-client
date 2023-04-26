import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, map, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  UiAllUsersModel,
  UiAllUsersResponseModel,
  UiUserPageFilter,
  UiUserQueryFilter,
} from '@ui-frontend-service/shared/api-types';
import { UiUserDataAccessService } from '@ui-frontend-service/shared/data-access';

export class UiUserTableDataSource extends DataSource<UiAllUsersModel> {
  /** The data-subject that contains the current users for the table. */
  private _dataSubject = new BehaviorSubject<UiAllUsersModel[]>([]);

  /** Handles the subscription to the table-data. */
  private _dataSubscription = new Subscription();

  constructor(private _userService: UiUserDataAccessService, private _paginator: MatPaginator) {
    super();
  }

  /**
   * Connects a collection viewer (such as a data-table) to this data source. Note that
   * the stream provided will be accessed during change detection and should not directly change
   * values that are bound in template views.
   * @returns Observable that emits a new value when the data changes.
   */
  override connect(): Observable<UiAllUsersModel[]> {
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
   * Loads all users based on the given filter.
   *
   * @param _filterObj The object, which contains the fields to filter by.
   * @param sortOrder The sort-order.
   * @param sortField The field to sort by.
   * @param pageIndex The index of the page to fetch.
   * @param pageSize The size of the page to fetch.
   */
  _loadUsers(_filterObj: UiUserQueryFilter = {}, sortField = 'email', sortOrder = 'asc', pageIndex = 0, pageSize = 100) {
    const pageFilter: UiUserPageFilter = {
      sortField,
      sortOrder,
      perPage: pageSize,
      page: pageIndex,
    };

    this._dataSubscription = combineLatest([
      this._userService.allUsersMeta(pageFilter).pipe(filter((response) => !response.loading)),
      this._userService.allUsers(pageFilter).pipe(filter((response) => !response.loading)),
    ])
      .pipe(
        map(([metaData, users]) => ({
          metaData,
          users,
        }))
      )
      .subscribe(({ metaData, users }) => {
        this._updateTable(users, pageFilter, metaData._allUsersMeta.count);
      });
  }

  /**
   * Sets the paginator options correctly and emit the fetched data.
   *
   * @param response The response from the request.
   * @param pageFilter The page-filter.
   * @param totalSize The total amount of items that can be displayed.
   */
  private _updateTable(response: UiAllUsersResponseModel, pageFilter: UiUserPageFilter, totalSize: number): void {
    this._dataSubject.next(response.allUsers);
    this._paginator.pageSize = pageFilter.perPage;
    this._paginator.length = totalSize;
  }
}
