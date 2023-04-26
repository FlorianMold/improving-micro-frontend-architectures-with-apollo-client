import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteCoreModule } from '../remote-core';
import { UiDashboardRemoteEntryContractRoutingModule } from './contract-routing.module';
import { UiDashboardRemoteEntryContractComponent } from './contract.component';
import { environment } from '../../core/environment';
import { MatCardModule } from '@angular/material/card';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { MatListModule } from '@angular/material/list';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { UI_CONTRACT_WIDGET_TYPE_POLICIES } from '../../core/policies';

const MATERIAL_IMPORTS = [MatCardModule];

@NgModule({
  declarations: [UiDashboardRemoteEntryContractComponent],
  imports: [
    CommonModule,
    UiDashboardRemoteCoreModule,
    UiDashboardRemoteEntryContractRoutingModule,
    UiGraphQLClientOptionsModule.withConfig('contract-remote-widget', {
      provideGraphQLClientOptions: true,
    }),
    ...MATERIAL_IMPORTS,
    MatListModule,
    UiGridModule,
  ],
  providers: [
    ...environment.dataAccessProviders,
    {
      provide: UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
      useValue: {
        shareCache: true,
        persistCache: false,
        useTypePolicies: true,
        typePolicies: UI_CONTRACT_WIDGET_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiDashboardRemoteEntryContractModule {}
