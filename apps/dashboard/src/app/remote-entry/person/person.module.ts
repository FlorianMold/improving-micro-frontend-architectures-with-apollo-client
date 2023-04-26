import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDashboardRemoteEntryPersonRoutingModule } from './person-routing.module';
import { UiDashboardRemoteEntryPersonComponent } from './person.component';
import { UiDashboardRemoteCoreModule } from '../remote-core';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../core/environment';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { MatListModule } from '@angular/material/list';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { MatButtonModule } from '@angular/material/button';
import { UI_CONTACT_WIDGET_TYPE_POLICIES } from '../../core/policies';

const MATERIAL_IMPORTS = [MatCardModule, MatListModule, UiGridModule, MatButtonModule];

@NgModule({
  declarations: [UiDashboardRemoteEntryPersonComponent],
  imports: [
    CommonModule,
    UiDashboardRemoteCoreModule,
    UiDashboardRemoteEntryPersonRoutingModule,
    UiGraphQLClientOptionsModule.withConfig('person-remote-widget', {
      provideGraphQLClientOptions: true,
    }),
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
export class UiDashboardRemoteEntryPersonModule {}
