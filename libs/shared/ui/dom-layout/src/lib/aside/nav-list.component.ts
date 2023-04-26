import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiLayoutCurrentNode, UiLayoutNavigationNode } from '../dom-layout.types';

@Component({
  selector: 'ui-layout-nav-list',
  template: `
    <nav [attr.aria-label]="navLabel || null">
      <ui-layout-nav-list-item
        *ngFor="let node of filteredNodes"
        [uiLayoutNavigationNode]="node"
        [uiLayoutSelectedNodes]="currentNode?.nodes"
        [uiLayoutNavigationIsWide]="isWide"
      ></ui-layout-nav-list-item>
    </nav>
  `,
  styleUrls: ['nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-layout-nav-list',
  },
})
export class UiLayoutNavListComponent {
  /** Navigation nodes in the nav-list.  */
  @Input('uiLayoutNavigationNodes') nodes: UiLayoutNavigationNode[] = [];
  /** Currently active node. */
  @Input('uiLayoutCurrentNode') currentNode?: UiLayoutCurrentNode;
  /** Whether the nav-list is wide. */
  @Input('uiLayoutIsWide') isWide = false;
  /** The aria label for the navigation element. */
  @Input('uiLayoutNavLabel') navLabel?: string;

  get filteredNodes(): UiLayoutNavigationNode[] {
    return this.nodes ? this.nodes.filter((n) => !n.hidden) : [];
  }
}
