import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { UiGridAlign, UiGridGutter, UiGridJustify } from './grid.type';
import { ReplaySubject } from 'rxjs';

@Directive({
  selector: '[uiGridRow]',
  host: {
    class: 'ui-grid-row',
    '[class.ui-grid-row-top]': `align === 'top'`,
    '[class.ui-grid-row-middle]': `align === 'middle'`,
    '[class.ui-grid-row-bottom]': `align === 'bottom'`,
    '[class.ui-grid-row-start]': `justify === 'start'`,
    '[class.ui-grid-row-end]': `justify === 'end'`,
    '[class.ui-grid-row-center]': `justify === 'center'`,
    '[class.ui-grid-row-space-around]': `justify === 'space-around'`,
    '[class.ui-grid-row-space-between]': `justify === 'space-between'`,
    '[class.ui-grid-row-space-evenly]': `justify === 'space-evenly'`,
  },
})
export class UiGridRowDirective implements OnInit, OnChanges {
  /** The flex align of the grid-items. */
  @Input('uiGridAlign') align?: UiGridAlign;
  /** The flex justify value of the grid-items. */
  @Input('uiGridJustify') justify?: UiGridJustify;

  /**
   * The spacing between columns inside the grid in px.
   * Can either be an object specifying the horizontal and vertical spacing,
   * or a number specifying only the horizontal spacing.
   */
  @Input('uiGridGutter') gutter?: UiGridGutter | number | string;

  /**
   * Subject containing a reference to the current gutter.
   */
  readonly currentGutter$ = new ReplaySubject<UiGridGutter>(1);

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  /**
   * Normalizes the gutter input-value.
   * If the gutter is a number, it will be converted to an
   * array with the same value for horizontal and null for vertical.
   */
  private _createGutter(): UiGridGutter {
    const result: UiGridGutter = [null, null];
    const gutter = this.gutter || 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];

    normalizedGutter.forEach((g, index) => {
      result[index] = Number(g) || null;
    });

    return result;
  }

  /**
   * Sets the gutter style on the element-ref.
   */
  private _setGutterStyle(): void {
    const [horizontalGutter, verticalGutter] = this._createGutter();
    this.currentGutter$.next([horizontalGutter, verticalGutter]);

    this._renderGutter('margin-left', horizontalGutter);
    this._renderGutter('margin-right', horizontalGutter);
    this._renderGutter('margin-top', verticalGutter);
    this._renderGutter('margin-bottom', verticalGutter);
  }

  /**
   * Renders the gutter horizontal and vertical.
   *
   * @param name The name of the style to apply.
   * @param gutter The value of the gutter.
   */
  private _renderGutter(name: string, gutter: number | null): void {
    const nativeElement = this._elementRef.nativeElement;
    if (gutter !== null) {
      this._renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
    }
  }

  ngOnInit(): void {
    this._setGutterStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { gutter } = changes;
    if (gutter) {
      this._setGutterStyle();
    }
  }
}
