import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UiContactDetailModel, UiCountryModel, UiSalutationModel, UiTitleModel } from '@ui-frontend-service/contact/api-types';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { uiGql, UiReference } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';

@Component({
  selector: 'ui-contact-detail-form',
  templateUrl: './contact-detail-form.component.html',
  styleUrls: ['./contact-detail-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContactDetailFormComponent implements OnChanges {
  /**
   * The contact-which should prefill the form.
   *
   * If contact is not specified, the component creates a new contact.
   */
  @Input('uiContact') contact?: UiContactDetailModel | null = null;

  /** All titles, which should be selectable for the contact. */
  @Input('uiTitles') titles?: UiTitleModel[] = [];

  /** All countries, which should be selectable for the contact. */
  @Input('uiCountries') countries?: UiCountryModel[] = [];

  /** All salutations, which should be selectable for the contact. */
  @Input('uiSalutations') salutations?: UiSalutationModel[] = [];

  /** Emits, when the form has been submitted and an initial contact was provided. */
  @Output('uiUpdateContact') readonly updateContact = new EventEmitter<UiContactDetailModel>();

  /** Emits, when the form has been submitted and no initial contact was provided. */
  @Output('uiCreateContact') readonly createContact = new EventEmitter<UiContactDetailModel>();

  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _graphQLClient = inject(UiGraphQLClient);

  /** Whether the document is open. */
  _isDocumentOpen = false;

  _contactForm = this._fb.group({
    id: [''],
    customerNumber: this._fb.control<number | null>(null),
    salutation: [''],
    title: [''],
    name: [''],
    name2: [''],
    streetName: [''],
    postalCode: [''],
    location: [''],
    country: [''],
    phone: [''],
    mobilePhone: [''],
    fax: [''],
    email: [''],
    isCustomer: this._fb.control<boolean>(false),
    isSupplier: this._fb.control<boolean>(false),
    isEmployee: this._fb.control<boolean>(false),
    billByEmail: this._fb.control<boolean>(false),
    uidNumber: [''],
    valueAddedTax: [''],
    paymentDeadline: this._fb.control<number | null>(null),
    bankWithdrawal: this._fb.control<boolean>(false),
    accountHolder: [''],
    bankName: [''],
    iban: [''],
    bic: [''],
    bankCode: [''],
    creditor: [''],
    dataFolder: [''],
    newsletter: this._fb.control<boolean | null>(false),
    comment: [''],
    dunning: this._fb.control<boolean | null>(false),
  });

  /**
   * If a contact was given, the values of the contact-form are populated with
   * the values from the given contact.
   *
   * @param contact The contact for setting up the contact-form.
   */
  private _fillContactForm(contact: UiContactDetailModel): void {
    const primarySubContact = contact.SubContacts && contact.SubContacts.length > 0 ? contact.SubContacts[0] : null;
    const primaryPaymentMethod = contact.PaymentMethods && contact.PaymentMethods.length > 0 ? contact.PaymentMethods[0] : null;
    this._contactForm.setValue({
      id: contact.id,
      customerNumber: contact.customerNumber,
      salutation: contact.Salutation?.id ?? null,
      title: contact.Title?.id ?? null,
      name: contact.name ?? null,
      name2: contact.name2 ?? null,
      streetName: contact.Address?.streetName ?? null,
      postalCode: contact.Address?.postalCode ?? null,
      location: contact.Address?.location ?? null,
      country: contact.Address?.Country?.id ?? null,
      phone: primarySubContact?.Person?.phone ?? null,
      mobilePhone: primarySubContact?.Person?.mobile ?? null,
      fax: primarySubContact?.Person?.fax ?? null,
      email: primarySubContact?.email ?? null,
      isCustomer: contact.isCustomer ?? null,
      isSupplier: contact.isSupplier ?? null,
      isEmployee: contact.isEmployee ?? null,
      billByEmail: contact.billByEmail ?? null,
      uidNumber: contact.uidNumber ?? null,
      valueAddedTax: contact.valueAddedTax ?? null,
      paymentDeadline: contact.paymentDeadline ?? null,
      bankWithdrawal: contact.bankWithdrawal ?? null,
      accountHolder: primaryPaymentMethod?.accountHolder ?? null,
      bankName: primaryPaymentMethod?.bankName ?? null,
      iban: primaryPaymentMethod?.iban ?? null,
      bic: primaryPaymentMethod?.bic ?? null,
      bankCode: primaryPaymentMethod?.bankCode ?? null,
      creditor: contact.creditor ?? null,
      dataFolder: contact.dataFolder ?? null,
      newsletter: contact.newsletter ?? null,
      comment: contact.comment ?? null,
      dunning: contact.dunning ?? null,
    });
  }

  /**
   * Depending, whether the contact is a new contact or an existing contact,
   * the component emits an event for updating or creating the contact.
   */
  _insertContact(): void {
    /** TODO: Remove the as any, when the mutations from the correct backend are implemented. */

    if (this.contact) {
      this.updateContact.emit(this._contactForm.getRawValue() as any);
      return;
    }

    this.createContact.emit(this._contactForm.getRawValue() as any);
  }

  /**
   * Opens or closes the document.
   * This causes the third-column to be shown.
   */
  _handleToggleDocument() {
    this._isDocumentOpen = !this._isDocumentOpen;
    if (this._isDocumentOpen) {
      void this._router.navigate(['./contact', { outlets: { 'document-outlet': ['document', '1'] } }]);
    } else {
      void this._router.navigate(['./contact', { outlets: { 'document-outlet': null } }]);
    }
  }

  /**
   * Handles the click on the abort-button inside the form.
   */
  _handleAbortButtonClick() {
    this._toggleContactOpen();
    // Navigate back to only the table-view
    void this._router.navigate(['./contact']);

    /**
     * TODO: Write a canDeactivate function or something similar to ask the user, if he really wants to
     * return the the table-view, if he has unsaved changes.
     */
  }

  /**
   * Sets the isOpen field to true inside the contact.
   */
  private _toggleContactOpen() {
    if (this.contact) {
      const { cache } = this._graphQLClient.getClient();
      const { id } = this.contact;
      cache.modify({
        fields: {
          allContacts(existingContacts, { readField }) {
            return existingContacts.map((contactRef: UiReference) => {
              return cache.writeFragment({
                id: contactRef.__ref,
                fragment: uiGql`
                fragment ChangeContact on Contact {
                  isOpen
                }
              `,
                data: {
                  isOpen: id === readField('id', contactRef),
                },
              });
            });
          },
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { contact } = changes;

    /** Fill the contact-form with the values from the @Input */
    if (contact && contact.currentValue) {
      this._fillContactForm(contact.currentValue);
      this._toggleContactOpen();
    }
  }
}
