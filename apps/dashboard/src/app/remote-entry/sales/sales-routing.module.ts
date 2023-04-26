import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteEntrySalesComponent } from './sales.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntrySalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntrySalesRoutingModule {}
