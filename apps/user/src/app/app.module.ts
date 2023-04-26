import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiUserAppComponent } from './app.component';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { UiUserCoreModule } from './core';
import { UiUserAppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MATERIAL_IMPORTS = [MatIconModule, MatButtonModule, MatSnackBarModule, MatMenuModule];

@NgModule({
  declarations: [UiUserAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiUserCoreModule,
    UiUserAppRoutingModule,
    UiLayoutModule,
    ...MATERIAL_IMPORTS,
  ],
  providers: [],
  bootstrap: [UiUserAppComponent],
})
export class UiUserAppModule {}
