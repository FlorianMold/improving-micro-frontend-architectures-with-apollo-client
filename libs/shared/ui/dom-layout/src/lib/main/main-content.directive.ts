import { Directive } from '@angular/core';

/**
 * Declares the first section of the main-content.
 */
@Directive({
  selector: '[uiLayoutMainFirstSection]',
})
export class UiLayoutMainFirstSectionDirective {}

/**
 * Declares the second section of the main-content.
 */
@Directive({
  selector: '[uiLayoutMainSecondSection]',
})
export class UiLayoutMainSecondSectionDirective {}

/**
 * Declares the third section of the main-content.
 */
@Directive({
  selector: '[uiLayoutMainThirdSection]',
})
export class UiLayoutMainThirdSectionDirective {}
