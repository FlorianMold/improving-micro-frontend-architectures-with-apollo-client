import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLayoutDomComponent } from './dom-layout.component';
import { UiLayoutHeaderComponent, UiLayoutTopMenuComponent, UiLayoutTopRightMenuComponent } from './header';
import { UiLayoutFooterComponent } from './footer';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {
  UiLayoutMainContentComponent,
  UiLayoutMainFirstSectionDirective,
  UiLayoutMainSecondSectionDirective,
  UiLayoutMainThirdSectionDirective,
} from './main';
import { UiLayoutNavListComponent, UiLayoutNavListItemComponent } from './aside';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { UiResizableModule } from '@ui-frontend-service/shared/ui/resizable';
import { UiLayoutNavigationService } from './dom-navigation.service';
import { UiLayoutTemplateService } from './dom-layout.service';
import { QuicklinkModule } from 'ngx-quicklink';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    UiLayoutDomComponent,
    UiLayoutHeaderComponent,
    UiLayoutFooterComponent,
    UiLayoutMainContentComponent,
    UiLayoutNavListComponent,
    UiLayoutNavListItemComponent,
    UiLayoutTopMenuComponent,
    UiLayoutTopRightMenuComponent,
    UiLayoutMainFirstSectionDirective,
    UiLayoutMainSecondSectionDirective,
    UiLayoutMainThirdSectionDirective,
  ],
  imports: [
    QuicklinkModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    UiGridModule,
    UiResizableModule,
    MatMenuModule,
  ],
  exports: [
    UiLayoutDomComponent,
    UiLayoutHeaderComponent,
    UiLayoutFooterComponent,
    UiLayoutMainContentComponent,
    UiLayoutNavListComponent,
    UiLayoutNavListItemComponent,
    UiLayoutTopMenuComponent,
    UiLayoutTopRightMenuComponent,
    UiLayoutMainFirstSectionDirective,
    UiLayoutMainSecondSectionDirective,
    UiLayoutMainThirdSectionDirective,
  ],
})
export class UiLayoutModule {
  static forRoot(): ModuleWithProviders<UiLayoutModule> {
    return {
      ngModule: UiLayoutModule,
      providers: [UiLayoutNavigationService, UiLayoutTemplateService],
    };
  }

  static forChild(): ModuleWithProviders<UiLayoutModule> {
    return {
      ngModule: UiLayoutModule,
    };
  }
}
