import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiDashboardRemoteEntryUserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntryUserComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntryUserRoutingModule {}
