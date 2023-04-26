/** Type for emitting information, when a div is resized. */
export interface UiResizableEvent {
  width?: number;
  col?: number;
  mouseEvent?: MouseEvent;
}

/** The possible directions for the resize-handle */
export type UiResizableHandleDirection = 'left' | 'right';

/** Type, when a resize-handle is grabbed. */
export interface UiResizableMouseDownEvent {
  direction: UiResizableHandleDirection;
  mouseEvent: MouseEvent;
}
