import { NgModule } from '@angular/core';
import {
  UiFormAbortButtonDirective,
  UiFormResetButtonDirective,
  UiFormSubmitButtonDirective,
  UiFormSubmitComponent,
} from './form-submit.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [UiFormSubmitComponent, UiFormSubmitButtonDirective, UiFormResetButtonDirective, UiFormAbortButtonDirective],
  exports: [UiFormSubmitComponent, UiFormSubmitButtonDirective, UiFormResetButtonDirective, UiFormAbortButtonDirective],
})
export class UiFormSubmitModule {}
