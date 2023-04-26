import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { UiResizableService } from './resizable.service';
import { UiResizableHandleDirection, UiResizableMouseDownEvent } from './resizeable.type';

const passiveEventListenerOptions = <AddEventListenerOptions>normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'ui-resizeable-handle',
  template: '<ng-content></ng-content>',
  styleUrls: ['./resize-handle.component.scss'],
  host: {
    class: 'ui-resizeable-handle',
    '[class.ui-resizeable-handle-right]': `direction === 'right'`,
    '[class.ui-resizeable-handle-left]': `direction === 'left'`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiResizableResizeHandleComponent implements OnInit, OnDestroy {
  /** The direction, where the handle is displayed. */
  @Input('uiResizeableHandleDirection') direction: UiResizableHandleDirection = 'right';
  /** Emitted, when the mouse-down event is triggered on the element. */
  @Output('uiResizeableMouseDown') readonly mouseDown = new EventEmitter<UiResizableMouseDownEvent>();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy$ = new Subject<void>();

  constructor(private _ngZone: NgZone, private _host: ElementRef<HTMLElement>, private _resizeableService: UiResizableService) {}

  /**
   * Registers an event that listens on a mouse-down event on the resize-handle.
   */
  private _registerMouseDownEvent(): void {
    this._ngZone.runOutsideAngular(() => {
      const direction = this.direction;

      fromEvent<MouseEvent>(this._host.nativeElement, 'mousedown', passiveEventListenerOptions)
        .pipe(
          takeUntil(this._onDestroy$),
          tap((mouseEvent: MouseEvent) => this.mouseDown.emit({ direction, mouseEvent }))
        )
        .subscribe((mouseEvent) => {
          this._resizeableService.handleMouseDownOutsideAngular$.next({ direction, mouseEvent });
        });
    });
  }

  ngOnInit(): void {
    this._registerMouseDownEvent();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
