import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-layout-top-right-menu',
  exportAs: 'uiLayoutTopRightMenu',
  templateUrl: './top-right-menu.component.html',
  styleUrls: ['./top-right-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-layout-top-right-menu',
  },
})
export class UiLayoutTopRightMenuComponent {}
