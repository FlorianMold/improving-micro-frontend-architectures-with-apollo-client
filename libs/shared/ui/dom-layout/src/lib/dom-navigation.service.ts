import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UiLayoutNavigationNode } from './dom-layout.types';

@Injectable()
export class UiLayoutNavigationService {
  /** The navigation-nodes, which are shown on the first toolbar-row. */
  private _topNavigationNodes$ = new Subject<UiLayoutNavigationNode[]>();

  /** The navigation-nodes, which are shown on the second toolbar-row. */
  private _secondToolbarRowNavigationNodes = new Subject<UiLayoutNavigationNode[] | null>();

  /**
   * Registers the navigation nodes shown in the header.
   *
   * @param nodes The navigation-nodes to register.
   */
  registerTopNavigationNodes(nodes: UiLayoutNavigationNode[]): void {
    this._topNavigationNodes$.next(nodes);
  }

  /**
   * Registers a new toolbar-row.
   *
   * @param row The row to register.
   */
  registerSecondToolbarRowNavigationNodes(row: UiLayoutNavigationNode[]): void {
    this._secondToolbarRowNavigationNodes.next(row);
  }

  /**
   * Removes the second toolbar-row.
   */
  unregisterSecondToolbarRow(): void {
    this._secondToolbarRowNavigationNodes.next(null);
  }

  getTopNavigationNodes$(): Observable<UiLayoutNavigationNode[]> {
    return this._topNavigationNodes$.asObservable();
  }

  getSecondToolbarRowNavigationNodes$(): Observable<UiLayoutNavigationNode[] | null> {
    return this._secondToolbarRowNavigationNodes.asObservable();
  }
}
