import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteEntryContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntryContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntryContactRoutingModule {}
