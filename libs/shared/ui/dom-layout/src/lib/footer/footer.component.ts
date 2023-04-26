import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-layout-footer',
  exportAs: 'uiLayoutFooter',
  templateUrl: 'footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLayoutFooterComponent {}
