import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UiLayoutMainFirstSectionDirective,
  UiLayoutMainSecondSectionDirective,
  UiLayoutMainThirdSectionDirective,
} from './main-content.directive';
import { UiResizableEvent } from '@ui-frontend-service/shared/ui/resizable';
import { UI_GRID_COLUMN_AMOUNT } from '@ui-frontend-service/shared/ui/grid';

export const UI_LAYOUT_TOO_MANY_COLUMNS = `The maximum amount of columns is ${UI_GRID_COLUMN_AMOUNT}`;

export const throwTooManyColumnsError = (): never => {
  throw Error(UI_LAYOUT_TOO_MANY_COLUMNS);
};

@Component({
  selector: 'ui-layout-main-content',
  exportAs: 'uiLayoutMainContent',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-layout-main-content',
  },
})
export class UiLayoutMainContentComponent implements OnInit {
  /**
   * The title, displayed as the top heading.
   */
  @Input() title!: string;

  /** The col-span of the first-column. */
  @Input('uiLayoutFirstColSpan') firstColSpan = 0;
  /** The col-span of the second-column. */
  @Input('uiLayoutSecondColSpan') secondColSpan = 0;
  /** The col-span of the third-column. */
  @Input('uiLayoutThirdColSpan') thirdColSpan = 0;

  /** The col-span of the first-column. */
  @Output('uiLayoutFirstColSpanChange') firstColSpanChange = new EventEmitter<number>();
  /** The col-span of the second-column. */
  @Output('uiLayoutSecondColSpanChange') secondColSpanChange = new EventEmitter<number>();
  /** The col-span of the third-column. */
  @Output('uiLayoutThirdColSpanChange') thirdColSpanChange = new EventEmitter<number>();

  /** Reference to the first animation frame. */
  private _firstAnimationFrameId = -1;
  /** Reference to the second animation frame. */
  private _secondAnimationFrameId = -1;

  /** The possible amount of grid columns. */
  _gridColumnAmount = UI_GRID_COLUMN_AMOUNT;

  /** The minimum grid column count. */
  _minimumColSpan = 1;

  /** Reference to the first section of the layout. */
  @ContentChild(UiLayoutMainFirstSectionDirective) firstSection?: UiLayoutMainFirstSectionDirective;
  /** Reference to the second section of the layout. */
  @ContentChild(UiLayoutMainSecondSectionDirective) secondSection?: UiLayoutMainSecondSectionDirective;
  /** Reference to the third section of the layout. */
  @ContentChild(UiLayoutMainThirdSectionDirective) thirdSection?: UiLayoutMainThirdSectionDirective;

  /**
   * Handles, when the first resize-handle is used. Sets the amount of columns of the first-col and sets the columns
   * of the second-col as well.
   *
   * @param col The col-span for the first section.
   */
  onFirstResize({ col }: UiResizableEvent): void {
    cancelAnimationFrame(this._firstAnimationFrameId);
    this._firstAnimationFrameId = requestAnimationFrame(() => {
      this.firstColSpan = Math.min(col || this._minimumColSpan, this._gridColumnAmount - this.thirdColSpan - 1);
      this.firstColSpanChange.emit(this.firstColSpan);
      this.secondColSpan = Math.max(
        Math.min(this._gridColumnAmount - this.firstColSpan - this.thirdColSpan, this._gridColumnAmount),
        this._minimumColSpan
      );
      this.secondColSpanChange.emit(this.secondColSpan);
    });
  }

  /**
   * Handles, when the first resize-handle is used. Sets the amount of columns of the second-col and sets the columns
   * of the third-col as well.
   *
   * @param col The col-span for the first section.
   */
  onSecondResize({ col }: UiResizableEvent): void {
    cancelAnimationFrame(this._secondAnimationFrameId);
    this._secondAnimationFrameId = requestAnimationFrame(() => {
      this.secondColSpan = Math.min(col || this._minimumColSpan, this._gridColumnAmount - this.firstColSpan - 1);
      this.secondColSpanChange.emit(this.secondColSpan);
      this.thirdColSpan = Math.max(
        Math.min(this._gridColumnAmount - this.firstColSpan - this.secondColSpan, this._gridColumnAmount),
        this._minimumColSpan
      );
      this.thirdColSpanChange.emit(this.thirdColSpan);
    });
  }

  ngOnInit(): void {
    if (this.firstColSpan + this.secondColSpan + this.thirdColSpan > this._gridColumnAmount) {
      throwTooManyColumnsError();
    }
  }
}
