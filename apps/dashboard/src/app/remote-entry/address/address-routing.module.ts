import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiDashboardRemoteEntryAddressComponent } from './address.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntryAddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntryAddressRoutingModule {}
