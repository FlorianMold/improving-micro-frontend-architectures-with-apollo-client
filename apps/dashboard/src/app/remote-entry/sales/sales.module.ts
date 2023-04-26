import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteCoreModule } from '../remote-core';
import { UiDashboardRemoteEntrySalesRoutingModule } from './sales-routing.module';
import { UiDashboardRemoteEntrySalesComponent } from './sales.component';
import { environment } from '../../core/environment';
import { MatCardModule } from '@angular/material/card';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { UI_SALES_WIDGET_TYPE_POLICIES } from '../../core/policies/sales-widget.type-policies';
import { MatListModule } from '@angular/material/list';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';

const MATERIAL_IMPORTS = [MatCardModule];

@NgModule({
  declarations: [UiDashboardRemoteEntrySalesComponent],
  imports: [
    CommonModule,
    UiDashboardRemoteCoreModule,
    UiDashboardRemoteEntrySalesRoutingModule,
    UiGraphQLClientOptionsModule.withConfig('sales-remote-widget', {
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
        typePolicies: UI_SALES_WIDGET_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiDashboardRemoteEntrySalesModule {}
