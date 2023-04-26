import { ChangeDetectionStrategy, Component, Directive, Host, Optional } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ui-form-submit',
  template: ` <ng-content></ng-content>`,
  styleUrls: ['./form-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormSubmitComponent {}

/**
 * TODO: If angular 15 lands, this will be refactored with host-directives. mat-button will be a host-directive.
 */

@Directive({
  selector: 'button[uiFormSubmitButton]',
  host: {
    type: 'submit',
    class: 'ui-form-submit-button',
  },
})
export class UiFormSubmitButtonDirective {
  constructor(@Host() @Optional() _button?: MatButton) {
    if (_button) {
      _button.color = 'accent';
    }
  }
}

@Directive({
  selector: 'button[uiFormResetButton]',
  host: {
    type: 'reset',
    class: 'ui-form-reset-button',
  },
})
export class UiFormResetButtonDirective {
  constructor(@Host() @Optional() _button?: MatButton) {
    if (_button) {
      _button.color = 'warn';
    }
  }
}

@Directive({
  selector: 'button[uiFormAbortButton]',
  host: {
    type: 'button',
    class: 'ui-form-abort-button',
  },
})
export class UiFormAbortButtonDirective {
  constructor(@Host() @Optional() _button?: MatButton) {
    if (_button) {
      _button.color = 'primary';
    }
  }
}
