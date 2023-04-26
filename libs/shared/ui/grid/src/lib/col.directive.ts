import {
  Directive,
  ElementRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { isNotNil, UiGridCol } from './grid.type';
import { UiGridRowDirective } from './row.directive';
import { Subject, takeUntil } from 'rxjs';

export const UI_GRID_COLUMN_AMOUNT = 24;

export interface UiNgClassInterface {
  [clazz: string]: any;
}

@Directive({
  selector: '[uiGridCol]',
  host: {
    class: 'ui-grid-col',
    '[style.flex]': 'flexStyle',
    '[class]': '_classMap',
  },
})
export class UiGridColDirective implements OnInit, OnChanges, OnDestroy {
  /** The classes, which are applied to the host element. */
  _classMap: Record<string, boolean> = {};
  /** The flex-style, which is applied to the host element. */
  flexStyle: string | null = null;

  /** Specify a flex-width or flex-grow. Or a complete flex-style. */
  @Input('uiGridColFlex') flex: UiGridCol | null = null;
  /** The span of the col-item. */
  @Input('uiGridColSpan') span: UiGridCol | null = null;
  /** The offset of the col-item. */
  @Input('uiGridColOffset') offset: UiGridCol | null = null;
  /** The order of the col-item. */
  @Input('uiGridColOrder') order: UiGridCol | null = null;
  /** The amount of columns for the xs-breakpoint. */
  @Input('uiXs') xs: UiGridCol | null = null;
  /** The amount of columns for the sm-breakpoint. */
  @Input('uiSm') sm: UiGridCol | null = null;
  /** The amount of columns for the md-breakpoint. */
  @Input('uiMd') md: UiGridCol | null = null;
  /** The amount of columns for the lg-breakpoint. */
  @Input('uiLg') lg: UiGridCol | null = null;
  /** The amount of columns for the xl-breakpoint. */
  @Input('uiXl') xl: UiGridCol | null = null;
  /** The amount of columns for the xxl-breakpoint. */
  @Input('uiXXl') xxl: UiGridCol | null = null;

  /** Emits, when the component is destroyed. */
  private _destroy$ = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    @Optional() @Host() private _uiRowDirective: UiGridRowDirective
  ) {}

  /**
   * Uses the given flex-value to generate a valid flex-style.
   *
   * @param flex The value for the flex.
   */
  setHostFlexStyle(flex: string | number | null): void {
    this.flexStyle = this.parseFlex(flex);
  }

  /**
   * Uses the given flex-value to generate a valid flex-style.
   *
   * @param flex The flex-value to use.
   */
  parseFlex(flex: number | string | null): string | null {
    if (typeof flex === 'number') {
      return `${flex} ${flex} auto`;
    } else if (typeof flex === 'string') {
      if (/^\d+(\.\d+)(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
    }
    return flex;
  }

  /**
   * Generates a class-map for the host-element depending on the current values
   * of span, order and offset. If a value is null, the class for this value is not generated.
   *
   * Afterwards appends the classes to the element.
   */
  setHostClassMap(): void {
    this._classMap = {
      [`ui-grid-col-${this.span}`]: isNotNil(this.span),
      [`ui-grid-col-order-${this.order}`]: isNotNil(this.order),
      [`ui-grid-col-offset-${this.offset}`]: isNotNil(this.offset),
      ...this._generateClass(),
    };
  }

  /**
   * Generates a class-map for the responsive breakpoints.
   */
  private _generateClass(): UiNgClassInterface {
    const listOfSizeInputName = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    const classMap: UiNgClassInterface = {};
    listOfSizeInputName.forEach((size) => {
      if (isNotNil(this[size])) {
        classMap[`ui-grid-col-${size}-${this[size]}`] = true;
      }
    });

    return classMap;
  }

  /**
   * Renders the gutter horizontal and vertical.
   *
   * @param name The name of the style to set.
   * @param gutter The value for the style.
   */
  private _renderGutter(name: string, gutter: number | null): void {
    const nativeElement = this._elementRef.nativeElement;
    if (gutter !== null) {
      this._renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
    }
  }

  ngOnInit(): void {
    this.setHostFlexStyle(this.flex);

    this._uiRowDirective.currentGutter$.pipe(takeUntil(this._destroy$)).subscribe(([horizontalGutter, verticalGutter]) => {
      this._renderGutter('padding-left', horizontalGutter);
      this._renderGutter('padding-right', horizontalGutter);
      this._renderGutter('padding-top', verticalGutter);
      this._renderGutter('padding-bottom', verticalGutter);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setHostClassMap();
    const { flex } = changes;
    if (flex) {
      this.setHostFlexStyle(this.flex);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
