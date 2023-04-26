import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { UiLayoutNavigationNode } from '../dom-layout.types';

@Component({
  selector: 'ui-layout-nav-list-item',
  templateUrl: 'nav-list-item.component.html',
  styleUrls: ['nav-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-layout-nav-list-item',
  },
})
export class UiLayoutNavListItemComponent implements OnChanges {
  /** Whether the navigation is wide.  */
  @Input('uiLayoutNavigationIsWide') isWide = false;
  /** The nesting level of the navigation.  */
  @Input('uiLayoutNavigationLevel') level = 1;
  /** The currently active node. */
  @Input('uiLayoutNavigationNode') node!: UiLayoutNavigationNode;
  /** Whether the parent of the current node is expanded. */
  @Input('uiLayoutIsParentExpanded') isParentExpanded = true;
  /** The selected nodes in the sidebar. */
  @Input('uiLayoutSelectedNodes') selectedNodes?: UiLayoutNavigationNode[];

  isExpanded = false;
  isSelected = false;
  classes!: { [index: string]: boolean };
  nodeChildren?: UiLayoutNavigationNode[];

  ngOnChanges(): void {
    this.nodeChildren = this.node && this.node.children ? this.node.children.filter((n) => !n.hidden) : [];

    if (this.selectedNodes) {
      const ix = this.selectedNodes.indexOf(this.node);
      this.isSelected = ix !== -1; // this node is the selected node or its ancestor
      this.isExpanded =
        this.isParentExpanded &&
        (this.isSelected || // expand if selected or ...
          // preserve expanded state when display is wide; collapse in mobile.
          (this.isWide && this.isExpanded));
    } else {
      this.isSelected = false;
    }

    this.setClasses();
  }

  setClasses(): void {
    this.classes = {
      ['ui-layout-navigation-level-' + this.level]: true,
      ['ui-layout-navigation-collapsed']: !this.isExpanded,
      ['ui-layout-navigation-expanded']: this.isExpanded,
      ['ui-layout-navigation-selected']: this.isSelected,
    };
  }

  /** Expands or collapsed the header and sets the according classes. */
  headerClicked(): void {
    this.isExpanded = !this.isExpanded;
    this.setClasses();
  }
}
