import { Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { UiResizableEvent, UiResizableMouseDownEvent } from './resizeable.type';
import { UiResizableService } from './resizable.service';
import { UI_GRID_COLUMN_AMOUNT } from '@ui-frontend-service/shared/ui/grid';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[uiResizeable]',
  providers: [UiResizableService],
  host: {
    class: 'ui-resizeable',
    '[class.ui-resizeable-is-resized]': '_isResized',
  },
})
export class UiResizeableDirective implements OnInit, OnDestroy {
  /** The minimum grid column width. */
  @Input('uiResizableMinColumn') minColumn = 0;
  /** The maximum grid column width. */
  @Input('uiResizableMaxColumn') maxColumn = 0;
  /** The amount of grid-columns that can be resized. */
  @Input('uiResizableGridColumnCount') gridColumnCount = UI_GRID_COLUMN_AMOUNT;

  /** Emits, when the element is resized. */
  // eslint-disable-next-line @angular-eslint/no-output-native -- Solved through the alias.
  @Output('uiResizableResizing') readonly resizing = new EventEmitter<UiResizableEvent>();
  /** Emits, when the resize is completed. */
  @Output('uiResizableResizeEnd') readonly resizeEnd = new EventEmitter<UiResizableEvent>();
  /** Emits, when the resize is started. */
  @Output('uiResizableResizeStart') readonly resizeStart = new EventEmitter<UiResizableEvent>();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy$ = new Subject<void>();

  /** Whether the element is currently resized. */
  _isResized = false;

  /** The event, which is currently handled. */
  private _currentHandleEvent: UiResizableMouseDownEvent | null = null;

  /** The size of the resized element. */
  private _elRect: DOMRect | null = null;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _resizeService: UiResizableService,
    private _renderer: Renderer2,
    private _ngZone: NgZone
  ) {}

  /**
   * Starts the resizing of an element.
   *
   * @param event The event, which should be handled.
   */
  startResize(event: MouseEvent): void {
    const elRect = this._elRect;
    const resizeEvent = event;

    if (!elRect || !this._currentHandleEvent) {
      return;
    }

    const handleEvent = this._currentHandleEvent.mouseEvent;

    let width = elRect.width;
    switch (this._currentHandleEvent?.direction) {
      case 'right':
        width = resizeEvent.clientX - elRect.left;
        break;
      case 'left':
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        break;
    }

    const size = this.calcSize(width);
    // Re-enter the Angular zone and run the change detection only if there are any listeners,
    if (this.resizing.observed) {
      this._ngZone.run(() => {
        this.resizing.emit({
          ...size,
          mouseEvent: event,
        });
      });
    }
  }

  /**
   * Calculates the size of the resized div.
   * @param width
   */
  calcSize(width: number): UiResizableEvent {
    let newWidth: number;
    let col = 0;
    let spanWidth = 0;
    let minWidth = 0;
    let boundWidth = Infinity;
    const parent = this._renderer.parentNode(this._elementRef.nativeElement);
    if (parent instanceof HTMLElement) {
      const parentRect = parent.getBoundingClientRect();
      boundWidth = parentRect.width;
    }

    let maxWidth = boundWidth;

    if (this.gridColumnCount !== -1) {
      spanWidth = maxWidth / this.gridColumnCount;
      minWidth = spanWidth * this.minColumn;
      maxWidth = spanWidth * this.maxColumn;
    }

    newWidth = Math.min(Math.max(width, minWidth), maxWidth);

    if (this.gridColumnCount !== -1) {
      col = Math.round(newWidth / spanWidth);
      col = Math.max(this.minColumn, Math.min(col, this.maxColumn));
      newWidth = col * spanWidth;
    }

    return {
      col,
      width: newWidth,
    };
  }

  /**
   * Executed at the end of the resize-process.
   * @param event The event, which should be handled.
   */
  endResize(event: MouseEvent): void {
    this._renderer.setStyle(document.body, 'cursor', '');
    this._renderer.setStyle(document.body, 'user-select', '');

    const elRect = this._elRect;

    if (elRect) {
      const size = {
        width: elRect.width,
        height: elRect.height,
      };
      // Re-enter the Angular zone and run the change detection only if there're any `nzResizeEnd` listeners,
      // e.g.: `<div nz-resizable (nzResizeEnd)="..."></div>`.
      if (this.resizeEnd.observed) {
        this._ngZone.run(() => {
          this.resizeEnd.emit({
            ...size,
            mouseEvent: event,
          });
        });
      }
    }
    this._currentHandleEvent = null;
  }

  ngOnInit(): void {
    this._resizeService.handleMouseDownOutsideAngular$.pipe(takeUntil(this._onDestroy$)).subscribe((event) => {
      this._isResized = true;
      this._resizeService.startResizing();
      this._currentHandleEvent = event;
      if (this.resizeStart.observed) {
        this._ngZone.run(() => this.resizeStart.emit({ mouseEvent: event.mouseEvent }));
      }
      this._elRect = this._elementRef.nativeElement.getBoundingClientRect();
    });

    this._resizeService.documentMouseUpOutsideAngular$.pipe(takeUntil(this._onDestroy$)).subscribe((event) => {
      if (this._isResized) {
        this._isResized = false;
        this._resizeService.documentMouseUpOutsideAngular$.next(event);
        this.endResize(event);
      }
    });

    this._resizeService.documentMouseMoveOutsideAngular$.pipe(takeUntil(this._onDestroy$)).subscribe((event) => {
      if (this._isResized) {
        this.startResize(event);
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
