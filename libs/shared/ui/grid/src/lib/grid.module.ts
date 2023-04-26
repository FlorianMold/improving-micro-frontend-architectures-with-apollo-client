import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiGridRowDirective } from './row.directive';
import { UiGridColDirective } from './col.directive';

@NgModule({
  declarations: [UiGridRowDirective, UiGridColDirective],
  imports: [CommonModule],
  exports: [UiGridRowDirective, UiGridColDirective],
})
export class UiGridModule {}
