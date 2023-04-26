import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, TemplateRef } from '@angular/core';
import { UiLayoutConfig, UiLayoutCurrentNode, UiLayoutNavigationNode } from '../dom-layout.types';
import { UI_LAYOUT_CONFIG, UI_LAYOUT_NAVIGATION_CONFIG, UiLayoutNavigationConfig } from '../dom-layout.token';
import { UiLayoutTemplateService } from '../dom-layout.service';
import { delay, mergeWith, Observable, of } from 'rxjs';
import { UiLayoutNavigationService } from '../dom-navigation.service';

@Component({
  selector: 'ui-layout-header',
  exportAs: 'uiLayoutHeader',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-layout-header',
  },
})
export class UiLayoutHeaderComponent {
  /** Whether the button to open / close the sidenav is rendered. */
  @Input('uiLayoutToggleButton') toggleButton = false;
  /** Currently active node. */
  @Input('uiLayoutCurrentNode') currentNode?: UiLayoutCurrentNode;

  /** Emits, when the sidenav has been opened/closed. */
  @Output('uiLayoutToggleSideNav') readonly toggleNav = new EventEmitter<void>();

  /** The url of the image to display in the header. */
  _imageUrl?: string;
  /** The name of the app to display in the header. */
  _appName?: string;

  /** Observable that emits, when a menu on the top-right is registered. */
  _topRightMenu$: Observable<TemplateRef<unknown>>;

  /** The navigation-nodes for the top-menu. */
  _topNavigationNodes$: Observable<UiLayoutNavigationNode[]>;

  /** The additional toolbar-rows to display. */
  _secondToolbarRowNavigationNodes: Observable<UiLayoutNavigationNode[] | null>;

  constructor(
    @Optional() @Inject(UI_LAYOUT_CONFIG) _config: UiLayoutConfig,
    @Optional() @Inject(UI_LAYOUT_NAVIGATION_CONFIG) navigationConfig: UiLayoutNavigationConfig,
    private _navigationService: UiLayoutNavigationService,
    private _layoutTemplateService: UiLayoutTemplateService
  ) {
    if (_config.appName) {
      this._appName = _config.appName.charAt(0).toUpperCase() + _config.appName.slice(1);
    }

    // TODO(FM): way to remove delay(0) - timing problem
    this._topRightMenu$ = this._layoutTemplateService.topRightMenuTmp$.pipe(delay(0));
    this._topNavigationNodes$ = of(navigationConfig?.topNodes).pipe(
      mergeWith(this._navigationService.getTopNavigationNodes$().pipe(delay(0)))
    );

    this._secondToolbarRowNavigationNodes = this._navigationService.getSecondToolbarRowNavigationNodes$();
  }

  /** Emits the sidebar. */
  toggleSideNav(): void {
    this.toggleNav.emit();
  }
}
