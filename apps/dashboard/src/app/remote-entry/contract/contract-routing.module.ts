import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteEntryContractComponent } from './contract.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntryContractComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntryContractRoutingModule {}
