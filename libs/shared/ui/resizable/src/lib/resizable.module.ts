import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiResizeableDirective } from './resizeable.directive';
import { UiResizableResizeHandleComponent } from './resize-handle.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UiResizeableDirective, UiResizableResizeHandleComponent],
  exports: [UiResizeableDirective, UiResizableResizeHandleComponent],
})
export class UiResizableModule {}
