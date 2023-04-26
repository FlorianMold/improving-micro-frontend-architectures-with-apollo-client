import { Component, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { loadRemoteModuleReact } from '../../../react-load-remote-definitions';
import * as React from 'react';
import { NgReactComponentService } from './ng-react-component.service';

@Component({
  standalone: true,
  template: '<div></div>',
})
export class UiDashboardReactWrapperComponent implements OnInit, OnDestroy {
  private ngReact: NgReactComponentService = inject(NgReactComponentService);
  private root = this.ngReact.createRoot(inject(ElementRef).nativeElement);

  ngOnInit() {
    /** Lazily create the dashboard-react application */
    const DashboardReact = React.lazy(() => loadRemoteModuleReact('dashboard-react', './Module'));
    this.ngReact.render(this.root, DashboardReact);
  }

  ngOnDestroy() {
    this.root.unmount();
  }
}
