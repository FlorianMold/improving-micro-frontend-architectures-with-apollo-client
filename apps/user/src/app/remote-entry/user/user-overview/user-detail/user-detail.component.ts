import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import {
  UiCountryDataAccessService,
  UiSalutationDataAccessService,
  UiTitleDataAccessService,
} from '@ui-frontend-service/shared/data-access';
import { ActivatedRoute } from '@angular/router';
import { UiUserDetailByIdResponseModel } from '@ui-frontend-service/shared/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { UiUserDetailFormComponent } from '@ui-frontend-service/shared/ui/components/user';
import { UiProfileFormRawValue } from '@ui-frontend-service/shared/ui/components/profile';
import { UiAddressFormRawValue } from '@ui-frontend-service/shared/ui/components/address';

@Component({
  selector: 'ui-user-detail',
  standalone: true,
  imports: [CommonModule, UiUserDetailFormComponent],
  template: `
    <ui-user-detail-form
      (uiCreateUser)="_handleCreateUser($event)"
      (uiUpdateUser)="_handleUpdateUser($event)"
      [uiUser]="(user$ | async)?.User"
      [uiCountries]="(allCountries$ | async)?.allCountries"
      [uiSalutations]="(allSalutations$ | async)?.allSalutations"
      [uiTitles]="(allTitles$ | async)?.allTitles"
    ></ui-user-detail-form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiUserWrapperComponent implements OnInit {
  /** An observable, which emits all countries to display inside the form. */
  allCountries$ = inject(UiCountryDataAccessService)
    .allCountries()
    .pipe(filter((value) => !value.loading));
  /** An observable, which emits all titles to display inside the form. */
  allTitles$ = inject(UiTitleDataAccessService)
    .allTitles()
    .pipe(filter((value) => !value.loading));
  /** An observable, which emits all salutations to display inside the form. */
  allSalutations$ = inject(UiSalutationDataAccessService)
    .allSalutations()
    .pipe(filter((value) => !value.loading));
  /** An observable, which emits the user. */
  user$?: Observable<UiUserDetailByIdResponseModel>;

  constructor(private _route: ActivatedRoute, private _logger: UiLoggerService) {}

  ngOnInit() {
    this.user$ = this._route.data.pipe(
      filter((data) => !!data?.['user']),
      map((data) => data?.['user'])
    );
  }

  _handleCreateUser(user: {
    profile: Omit<UiProfileFormRawValue, 'address_id' | 'id'>;
    address: Omit<UiAddressFormRawValue, 'id'>;
  }): void {
    // TODO: Implement mutations
    this._logger.info('Create User:');
    this._logger.info(user);
  }

  _handleUpdateUser(user: { profile: UiProfileFormRawValue; address: UiAddressFormRawValue }): void {
    // TODO: Implement mutations
    this._logger.info('Update User:');
    this._logger.info(user);
  }
}
