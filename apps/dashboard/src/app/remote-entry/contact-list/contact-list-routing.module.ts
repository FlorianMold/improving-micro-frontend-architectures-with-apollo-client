import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteEntryContactListComponent } from './contact-list.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntryContactListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntryContactListRoutingModule {}
