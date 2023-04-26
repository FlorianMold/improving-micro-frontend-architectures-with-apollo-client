import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { RouterOutlet } from '@angular/router';
import { UiUserRemoteSetupService } from '../../remote-core';

@Component({
  selector: 'ui-user-overview',
  standalone: true,
  templateUrl: './user-overview.component.html',
  providers: [UiUserRemoteSetupService],
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, UiLayoutModule, RouterOutlet],
})
export class UiUserOverviewComponent {
  /** The colspan of the first column. */
  _firstColSpan = 24;
  /** The colspan of the second column. */
  _secondColSpan = 0;

  constructor(@Optional() remoteSetupService?: UiUserRemoteSetupService) {
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
