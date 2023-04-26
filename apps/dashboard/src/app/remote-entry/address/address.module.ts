import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiDashboardRemoteEntryAddressRoutingModule } from './address-routing.module';
import { UiDashboardRemoteEntryAddressComponent } from './address.component';
import { UiDashboardRemoteCoreModule } from '../remote-core';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../core/environment';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { MatListModule } from '@angular/material/list';
import { UI_ADDRESS_WIDGET_TYPE_POLICIES } from '../../core/policies';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_IMPORTS = [MatListModule, MatButtonModule];

@NgModule({
  declarations: [UiDashboardRemoteEntryAddressComponent],
  imports: [
    CommonModule,
    UiDashboardRemoteCoreModule,
    UiDashboardRemoteEntryAddressRoutingModule,
    MatCardModule,
    UiGraphQLClientOptionsModule.withConfig('address-remote-widget', {
      provideGraphQLClientOptions: true,
    }),
    UiGridModule,
    ...MATERIAL_IMPORTS,
  ],
  exports: [UiDashboardRemoteEntryAddressComponent],
  providers: [
    ...environment.dataAccessProviders,
    {
      provide: UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
      useValue: {
        shareCache: true,
        persistCache: false,
        useTypePolicies: true,
        typePolicies: UI_ADDRESS_WIDGET_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiDashboardRemoteEntryAddressModule {}
