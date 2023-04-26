import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteEntryInvoiceComponent } from './invoice.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntryInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntryInvoiceRoutingModule {}
