import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteCoreModule } from '../remote-core';
import { UiDashboardRemoteEntryContactRoutingModule } from './contact-routing.module';
import { UiDashboardRemoteEntryContactComponent } from './contact.component';
import { environment } from '../../core/environment';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { UI_CONTACT_WIDGET_TYPE_POLICIES } from '../../core/policies';

const MATERIAL_IMPORTS = [MatCardModule, MatListModule, MatIconModule];

@NgModule({
  declarations: [UiDashboardRemoteEntryContactComponent],
  imports: [
    CommonModule,
    UiDashboardRemoteCoreModule,
    UiDashboardRemoteEntryContactRoutingModule,
    UiGraphQLClientOptionsModule.withConfig('contact-remote-widget', {
      provideGraphQLClientOptions: true,
    }),
    UiGridModule,
    ...MATERIAL_IMPORTS,
  ],
  providers: [
    ...environment.dataAccessProviders,
    {
      provide: UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
      useValue: {
        shareCache: true,
        persistCache: false,
        useTypePolicies: true,
        typePolicies: UI_CONTACT_WIDGET_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiDashboardRemoteEntryContactModule {}
