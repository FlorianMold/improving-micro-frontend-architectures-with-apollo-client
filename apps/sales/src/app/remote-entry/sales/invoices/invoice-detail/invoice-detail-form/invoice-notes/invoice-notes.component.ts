import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { UiSalesInvoiceNoteForm } from './invoice-note';

@Component({
  selector: 'ui-sales-invoice-notes',
  templateUrl: './invoice-notes.component.html',
  styleUrls: ['./invoice-notes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesInvoiceNotesComponent {
  /**
   * The Form-Array of notes to render. Defaults to an empty array.
   */
  @Input('uiNoteForms') noteForms = new FormArray<FormGroup<UiSalesInvoiceNoteForm>>([]);
}
