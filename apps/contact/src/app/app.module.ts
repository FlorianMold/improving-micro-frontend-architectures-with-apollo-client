import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiContactAppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiContactCoreModule } from './core';
import { UiContactAppRoutingModule } from './app-routing.module';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MATERIAL_IMPORTS = [MatIconModule, MatButtonModule, MatSnackBarModule, MatMenuModule];

@NgModule({
  declarations: [UiContactAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiContactCoreModule,
    UiContactAppRoutingModule,
    UiLayoutModule,
    ...MATERIAL_IMPORTS,
  ],
  providers: [],
  bootstrap: [UiContactAppComponent],
})
export class UiContactAppModule {}
