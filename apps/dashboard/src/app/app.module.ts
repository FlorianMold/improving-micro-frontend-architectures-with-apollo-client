import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiDashboardAppComponent } from './app.component';
import { UiDashboardAppRoutingModule } from './app-routing.module';
import { UiDashboardCoreModule } from './core/core.module';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [UiDashboardAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiDashboardCoreModule,
    UiDashboardAppRoutingModule,
    UiGridModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [UiDashboardAppComponent],
})
export class UiDashboardAppModule {}
