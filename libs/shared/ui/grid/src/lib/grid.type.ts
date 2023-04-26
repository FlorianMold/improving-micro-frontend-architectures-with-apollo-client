export type UiGridJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export type UiGridAlign = 'top' | 'middle' | 'bottom';

export type UiGridCol = string | number;

export type UiGridHorizontalGutter = number | null;
export type UiGridVerticalGutter = number | null;

export type UiGridGutter = [UiGridHorizontalGutter, UiGridVerticalGutter];

/**
 * Check whether the given value is not nil.
 *
 * @param value The value to check.
 */
export function isNotNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null;
}
