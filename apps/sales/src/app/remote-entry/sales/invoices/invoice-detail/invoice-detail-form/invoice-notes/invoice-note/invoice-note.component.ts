import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UiSalesInvoiceNoteForm } from './invoice-note.type';

@Component({
  selector: 'ui-sales-invoice-note',
  templateUrl: './invoice-note.component.html',
  styleUrls: ['./invoice-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesInvoiceNoteComponent {
  /** The form, that should be rendered. Renders an empty form by default. */
  @Input('uiNoteForm') noteForm = UiSalesInvoiceNoteComponent.getEmptyForm();

  /**
   * Returns an empty form for an invoice note.
   */
  static getEmptyForm(): FormGroup<UiSalesInvoiceNoteForm> {
    return new FormGroup<UiSalesInvoiceNoteForm>({
      id: new FormControl('', { nonNullable: true }),
      subject: new FormControl('', { nonNullable: true }),
      body: new FormControl('', { nonNullable: true }),
    });
  }
}
