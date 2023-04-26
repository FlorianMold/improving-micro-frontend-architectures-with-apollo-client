import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiSalesAppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiSalesAppRoutingModule } from './app-routing.module';
import { UiSalesCoreModule } from './core';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_IMPORTS = [MatIconModule, MatButtonModule, MatSnackBarModule, MatMenuModule];

@NgModule({
  declarations: [UiSalesAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiSalesCoreModule,
    UiSalesAppRoutingModule,
    UiLayoutModule,
    ...MATERIAL_IMPORTS,
  ],
  providers: [],
  bootstrap: [UiSalesAppComponent],
})
export class UiSalesAppModule {}
