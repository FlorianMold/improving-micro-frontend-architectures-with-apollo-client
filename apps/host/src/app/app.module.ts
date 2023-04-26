import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UiHostAppComponent, UiHostVersionBottomSheetComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiHostAppRoutingModule } from './app-routing.module';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { UiResizableModule } from '@ui-frontend-service/shared/ui/resizable';
import { UiVersionComponent } from '@ui-frontend-service/shared/ui/components/version';
import { UiHostCoreModule } from './core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { UiLoginComponent } from '@ui-frontend-service/shared/ui/components/login';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

const MATERIAL_IMPORTS = [MatIconModule, MatButtonModule, MatBottomSheetModule, MatSnackBarModule, MatMenuModule];

@NgModule({
  declarations: [UiHostAppComponent, UiHostVersionBottomSheetComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiHostCoreModule,
    UiHostAppRoutingModule,
    UiLayoutModule,
    UiGridModule,
    UiResizableModule,
    UiVersionComponent,
    UiLoginComponent,
    ...MATERIAL_IMPORTS,
  ],
  providers: [],
  bootstrap: [UiHostAppComponent],
})
export class UiHostAppModule {}
