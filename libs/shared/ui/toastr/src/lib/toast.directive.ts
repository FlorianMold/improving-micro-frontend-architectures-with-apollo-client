import { Directive, ElementRef, NgModule } from '@angular/core';

@Directive({
  selector: '[toastContainer]',
  exportAs: 'toastContainer',
})
export class UiToastContainerDirective {
  constructor(private el: ElementRef) {}

  getContainerElement(): HTMLElement {
    return this.el.nativeElement;
  }
}

@NgModule({
  declarations: [UiToastContainerDirective],
  exports: [UiToastContainerDirective],
})
export class UiToastContainerModule {}
