import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  UiAllCountriesModel,
  UiArticleUnitModel,
  UiInvoiceDetailModel,
  UiInvoiceTypeModel,
  UiVatModel,
} from '@ui-frontend-service/sales/api-types';
import { UiCustomerComponent, UiCustomerFormRawValue } from '@ui-frontend-service/shared/ui/components/customer';
import { UiSalesInvoiceCommonComponent, UiSalesInvoiceCommonFormRawValue } from './invoice-common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  UiSalesInvoicePositionComponent,
  UiSalesInvoicePositionForm,
  UiSalesInvoicePositionFormRawValue,
} from './invoice-position';
import {
  UiSalesInvoiceNoteComponent,
  UiSalesInvoiceNoteForm,
  UiSalesInvoiceNoteFormRawValue,
} from './invoice-notes/invoice-note';

@Component({
  selector: 'ui-sales-invoice-detail-form',
  templateUrl: './invoice-detail-form.component.html',
  styleUrls: ['./invoice-detail-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesInvoiceDetailFormComponent implements OnChanges {
  /**
   * The invoice which should prefill the form.
   *
   * If invoice is not specified, the component creates a new invoice.
   */
  @Input('uiInvoice') invoice?: UiInvoiceDetailModel | null = null;
  /** All article units, which should be selectable for the user. */
  @Input('uiInvoiceTypes') invoiceTypes?: UiInvoiceTypeModel[] = [];

  /** All vat values, which should be selectable for the user. */
  @Input('uiVats') vats?: UiVatModel[] = [];

  /** All countries, which should be selectable in the customer form. */
  @Input('uiCustomerCountries') customerCountries?: UiAllCountriesModel[] = [];

  /** All countries, which should be selectable in the invoice-position form. */
  @Input('uiInvoicePositionCountries') invoicePositionCountries?: UiAllCountriesModel[] = [];

  /** All article units, which should be selectable in the invoice-position form. */
  @Input('uiArticleUnits') articleUnits?: UiArticleUnitModel[] = [];

  /** Emits, when the form has been submitted and no initial invoice was provided. */
  @Output('uiCreateInvoice') readonly createInvoice = new EventEmitter<{
    common: Omit<UiSalesInvoiceCommonFormRawValue, 'id'>;
    customer: Omit<UiCustomerFormRawValue, 'id'>;
  }>();

  /** Emits, when the form has been submitted and an initial invoice was provided. */
  @Output('uiUpdateInvoice') readonly updateInvoice = new EventEmitter<{
    common: UiSalesInvoiceCommonFormRawValue;
    positions: UiSalesInvoicePositionFormRawValue[];
    notes: UiSalesInvoiceNoteFormRawValue[];
    customer: UiCustomerFormRawValue;
  }>();

  private _formBuilder = inject(FormBuilder);

  _invoiceCommonForm = UiSalesInvoiceCommonComponent.getEmptyForm();

  _invoicePositionForms = new FormArray<FormGroup<UiSalesInvoicePositionForm>>([]);

  _noteForms = new FormArray<FormGroup<UiSalesInvoiceNoteForm>>([]);

  _customerForm = UiCustomerComponent.getEmptyForm();

  _invoiceForm = this._formBuilder.group({
    common: this._invoiceCommonForm,
    positions: this._invoicePositionForms,
    notes: this._noteForms,
    customer: this._customerForm,
  });

  ngOnChanges(changes: SimpleChanges): void {
    const { invoice } = changes;

    if (invoice?.currentValue) {
      this._fillForm(invoice.currentValue);
    }
  }

  /**
   * Fills in the form with the provided invoice details.
   */
  private _fillForm(invoice: UiInvoiceDetailModel): void {
    this._invoicePositionForms.clear();
    this._noteForms = new FormArray<FormGroup<UiSalesInvoiceNoteForm>>([]);
    this._invoiceForm.setControl('notes', this._noteForms);

    this._invoiceCommonForm.patchValue({
      id: invoice.id,
      invoiceType: invoice.InvoiceType.id,
      modifyClient: invoice.ModifyClient.Client.name,
      creatorClient: invoice.CreatorClient.Client.name,
      customerName: invoice.Customer.name,
    });

    for (const pos of invoice.InvoicePositions) {
      const posForm = UiSalesInvoicePositionComponent.getEmptyForm();
      posForm.patchValue(pos);
      posForm.controls.vat_id.setValue(pos.Vat.id);
      posForm.controls.articleUnit_id.setValue(pos.Article.ArticleUnit.id);
      this._invoicePositionForms.push(posForm);
    }

    for (const note of invoice.Notes) {
      const noteForm = UiSalesInvoiceNoteComponent.getEmptyForm();
      noteForm.patchValue(note);
      this._noteForms.push(noteForm);
    }

    this._customerForm.patchValue(invoice.Customer);
    this._customerForm.controls.country_id.setValue(invoice.Customer.SalesCountry.id);
  }

  /**
   * Handles the submit-event of the invoice-detail form. When the invoice already has an id, the "Update"-event will be emitted.
   * Otherwise, the "Create"-event will be emitted.
   */
  _handleFormSubmission(): void {
    if (this._invoiceForm.valid) {
      const commonInvoiceForm = this._invoiceCommonForm.getRawValue();
      const customerForm = this._customerForm.getRawValue();

      if (this.invoice) {
        const positionForms = this._invoicePositionForms.getRawValue();
        const noteForms = this._noteForms.getRawValue();

        this.updateInvoice.emit({
          common: commonInvoiceForm,
          positions: positionForms,
          notes: noteForms,
          customer: customerForm,
        });
      } else {
        this.createInvoice.emit({
          common: commonInvoiceForm,
          customer: customerForm,
        });
      }
    }
  }
}
