import { Inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { UiResizableMouseDownEvent } from './resizeable.type';

@Injectable()
export class UiResizableService implements OnDestroy {
  /** */
  handleMouseDownOutsideAngular$ = new Subject<UiResizableMouseDownEvent>();
  /** */
  documentMouseMoveOutsideAngular$ = new Subject<MouseEvent>();
  /** */
  documentMouseUpOutsideAngular$ = new Subject<MouseEvent>();

  /**
   * The registered event listeners on the document.
   */
  private _listeners = new Map<string, (event: MouseEvent) => void>();

  constructor(@Inject(DOCUMENT) private _document: Document, private _ngZone: NgZone) {}

  /** */
  startResizing(): void {
    this._clearListeners();

    const moveEventHandler = (e: MouseEvent): void => {
      this.documentMouseMoveOutsideAngular$.next(e);
    };

    const upEventHandler = (e: MouseEvent): void => {
      this.documentMouseUpOutsideAngular$.next(e);
      this._clearListeners();
    };

    this._listeners.set('mousemove', moveEventHandler);
    this._listeners.set('mouseup', upEventHandler);

    this._ngZone.runOutsideAngular(() => {
      this._listeners.forEach((handler, name) => {
        this._document.addEventListener(name, handler as EventListener);
      });
    });
  }

  /** */
  private _clearListeners() {
    this._listeners.forEach((handler, name) => {
      this._document.removeEventListener(name, handler as EventListener);
    });
    this._listeners.clear();
  }

  ngOnDestroy(): void {
    this.handleMouseDownOutsideAngular$.complete();
    this.documentMouseMoveOutsideAngular$.complete();
    this.documentMouseUpOutsideAngular$.complete();
    this._clearListeners();
  }
}
