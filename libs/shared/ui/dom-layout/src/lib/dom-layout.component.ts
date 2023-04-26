import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { UiLayoutConfig, UiLayoutCurrentNodes, UiLayoutDrawerMode, UiLayoutNavigationNode } from './dom-layout.types';
import { UI_LAYOUT_CONFIG } from './dom-layout.token';
import { UiLayoutNavigationService } from './dom-navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ui-layout-dom',
  templateUrl: './dom-layout.component.html',
  styleUrls: ['./dom-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-layout-dom',
  },
})
export class UiLayoutDomComponent {
  /** Whether the side-navigation is shown. */
  @Input('uiLayoutDisableSidenav') disableSidenav = false;
  /** Navigation nodes shown in the left-navigation. */
  @Input('uiLayoutLeftNavigationNodes') leftNodes: UiLayoutNavigationNode[] = [];
  /** Resembles the current-node. */
  @Input('uiLayoutCurrentNodes') currentNodes?: UiLayoutCurrentNodes;
  /** Whether the sidenav is open initially. */
  @Input('uiLayoutSidenavOpen') isSidenavOpen = false;
  /** Mode of the sidenav-drawer. */
  @Input('uiLayoutSidenavMode') drawerMode: UiLayoutDrawerMode = 'side';

  /** Emits, when the sidenav has opened or changed. */
  @Output('uiLayoutSidenavOpenedChange') readonly openedChange = new EventEmitter<boolean>();

  /** The second toolbar-row that can be registered. */
  _secondToolbarRowNavigationNodes$: Observable<UiLayoutNavigationNode[] | null>;

  constructor(@Optional() @Inject(UI_LAYOUT_CONFIG) _config: UiLayoutConfig, private _layoutService: UiLayoutNavigationService) {
    this.disableSidenav = !!_config?.disableSidenav;
    this._secondToolbarRowNavigationNodes$ = this._layoutService.getSecondToolbarRowNavigationNodes$();
  }
}
