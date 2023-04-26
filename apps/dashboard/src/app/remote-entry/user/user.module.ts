import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDashboardRemoteEntryUserComponent } from './user.component';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../core/environment';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UiDashboardRemoteCoreModule } from '../remote-core';
import { UiDashboardRemoteEntryUserRoutingModule } from './user-routing.module';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { MatListModule } from '@angular/material/list';
import { UI_USER_WIDGET_TYPE_POLICIES } from '../../core/policies/user-widget.type-policies';

const MATERIAL_IMPORTS = [MatCardModule, MatListModule];

@NgModule({
  declarations: [UiDashboardRemoteEntryUserComponent],
  imports: [
    CommonModule,
    UiDashboardRemoteCoreModule,
    UiDashboardRemoteEntryUserRoutingModule,
    UiGraphQLClientOptionsModule.withConfig('user-remote-widget', {
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
        typePolicies: UI_USER_WIDGET_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiDashboardRemoteEntryUserModule {}
