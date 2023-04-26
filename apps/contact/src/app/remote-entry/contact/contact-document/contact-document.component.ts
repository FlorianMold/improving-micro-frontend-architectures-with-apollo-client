import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-contact-document',
  templateUrl: './contact-document.component.html',
  styleUrls: ['./contact-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContactDocumentComponent {
  pdfSrc = 'assets/pdfs/pdf-test.pdf';
}
