import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLayoutCurrentNode, UiLayoutNavigationNode } from '../../dom-layout.types';

@Component({
  selector: 'ui-layout-top-menu',
  exportAs: 'uiLayoutTopMenu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-layout-top-menu',
  },
})
export class UiLayoutTopMenuComponent {
  /** Navigation nodes shown in the top-menu. */
  @Input('uiLayoutTopNavigationNodes') topNodes: UiLayoutNavigationNode[] = [];
  /** Currently selected node. */
  @Input('uiLayoutCurrentNode') currentNode?: UiLayoutCurrentNode;

  get currentUrl(): string | null {
    return this.currentNode ? this.currentNode.url : null;
  }
}
