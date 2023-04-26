import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { UiContactRemoteSetupService } from '../../remote-core';

@Component({
  selector: 'ui-contact-overview',
  templateUrl: './contact-overview.component.html',
  styleUrls: ['./contact-overview.component.scss'],
  providers: [UiContactRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiContactOverviewComponent {
  /** The colspan of the first column. */
  _firstColSpan = 24;
  /** The colspan of the second column. */
  _secondColSpan = 0;
  /** The colspan of the third column. */
  _thirdColSpan = 0;

  /** Whether third column is shown. */
  showThirdColumn = false;

  constructor(@Optional() remoteSetupService?: UiContactRemoteSetupService) {
    remoteSetupService?.start();
  }

  /**
   * Executed, when the detail-outlet is activated.
   * This shows the second-column and the space is evenly distributed
   * among the first- and second-column.
   */
  handleDetailOutletActivated() {
    this._firstColSpan = 16;
    this._secondColSpan = 8;

    /** Defer the rendering of the third column a bit.
     * Otherwise, the second and third column would be rendered immediately,
     * when the page is reloaded with detail- and document-outlet activated.
     */
    this.showThirdColumn = true;
  }

  /**
   * Executed, when the detail-outlet is deactivated.
   * Hides the second-column and the first-column gets the whole space.
   */
  handleDetailOutletDeactivated() {
    this._firstColSpan = 24;
    this._secondColSpan = 0;
  }

  /**
   * Executed, when the document-outlet is activated.
   * This shows the third-column and the space is evenly distributed
   * among the first-, second-column and third-column.
   */
  handleDocumentOutletActivated() {
    this._firstColSpan = 8;
    this._secondColSpan = 8;
    this._thirdColSpan = 8;
  }

  /**
   * Executed, when the document-outlet is deactivated.
   * Hides the third-column and the first-column and second-column gets the whole space.
   */
  handleDocumentOutletDeactivated() {
    this._firstColSpan = 16;
    this._secondColSpan = 8;
    this._thirdColSpan = 0;
  }
}
