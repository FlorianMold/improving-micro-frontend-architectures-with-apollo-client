import { ChangeDetectionStrategy, Component, Optional } from "@angular/core";
import { UiSalesRemoteSetupService } from '../../remote-core';

@Component({
  selector: 'ui-sales-contract-overview',
  templateUrl: './invoice-overview.component.html',
  styleUrls: ['./invoice-overview.component.scss'],
  providers: [UiSalesRemoteSetupService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesInvoiceOverviewComponent {
  /** The colspan of the first-column. */
  _firstColSpan = 24;
  /** The colspan of the second-column. */
  _secondColSpan = 0;

  constructor(@Optional() remoteSetupService?: UiSalesRemoteSetupService) {
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
  }

  /**
   * Executed, when the detail-outlet is deactivated.
   * Hides the second-column and the first-column gets the whole space.
   */
  handleDetailOutletDeactivated() {
    this._firstColSpan = 24;
    this._secondColSpan = 0;
  }
}
