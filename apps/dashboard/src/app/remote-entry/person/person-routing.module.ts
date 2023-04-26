import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiDashboardRemoteEntryPersonComponent } from './person.component';

const routes: Routes = [
  {
    path: '',
    component: UiDashboardRemoteEntryPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiDashboardRemoteEntryPersonRoutingModule {}
