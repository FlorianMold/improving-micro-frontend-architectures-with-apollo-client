import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { UiContactDataAccessContactService, UiContactDataAccessCountryService } from '@ui-frontend-service/contact/data-access';
import { UiContactDetailByIdResponseModel, UiContactDetailModel } from '@ui-frontend-service/contact/api-types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiSalutationDataAccessService, UiTitleDataAccessService } from '@ui-frontend-service/shared/data-access';

@Component({
  selector: 'ui-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContactDetailComponent implements OnInit {
  /** An observable, which emits the contact to be displayed inside the form. */
  contact$?: Observable<UiContactDetailByIdResponseModel>;
  /** An observable, which emits all countries to display inside the form. */
  allCountries$ = inject(UiContactDataAccessCountryService)
    .allCountries()
    .pipe(filter((value) => !value.loading));
  /** An observable, which emits all titles to display inside the form. */
  allTitles$ = inject(UiTitleDataAccessService)
    .allTitles()
    .pipe(filter((value) => !value.loading));
  /** An observable, which emits all salutations to display inside the form. */
  allSalutations$? = inject(UiSalutationDataAccessService)
    .allSalutations()
    .pipe(filter((value) => !value.loading));

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _contactService: UiContactDataAccessContactService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    /**
     * Check if the contact was preloaded with a resolver.
     * If not a new contact should be created.
     */
    this.contact$ = this._route.data.pipe(
      filter((data) => !!data?.['contact']),
      map((data) => data?.['contact'])
    );
  }

  /**
   * Handles the update of a contact.
   *
   * @param contact The contact to update.
   */
  handleUpdateContact(contact: UiContactDetailModel) {
    this._contactService
      .updateContact(contact)
      .pipe(filter((data) => !data.loading))
      .subscribe(() => {
        this._snackBar.open(`Kontakt mit ${contact.customerNumber} erfolgreich bearbeitet.`, 'X');
      });
  }

  /**
   * Handles the creation of a new contact.
   *
   * @param contact The contact to create.
   */
  handleCreateContact(contact: UiContactDetailModel) {
    this._contactService
      .createContact(contact)
      .pipe(filter((data) => !data.loading))
      .subscribe((newContact) => {
        this._snackBar.open(`Kontakt mit der Kundennummer ${contact.customerNumber} erfolgreich erstellt.`, 'X');
        void this._router.navigate(['./contact', { outlets: { 'detail-outlet': ['detail', newContact.createContact?.id] } }]);
      });
  }
}
