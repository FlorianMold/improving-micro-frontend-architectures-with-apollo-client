import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiDashboardRemoteCoreModule } from '../remote-core';
import { UiDashboardRemoteEntryInvoiceRoutingModule } from './invoice-routing.module';
import { UiDashboardRemoteEntryInvoiceComponent } from './invoice.component';
import { environment } from '../../core/environment';
import { MatCardModule } from '@angular/material/card';
import {
  UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
  UiGraphQLClientOptionsConfig,
  UiGraphQLClientOptionsModule,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { MatListModule } from '@angular/material/list';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { UI_INVOICE_WIDGET_TYPE_POLICIES } from '../../core/policies';

const MATERIAL_IMPORTS = [MatCardModule];

@NgModule({
  declarations: [UiDashboardRemoteEntryInvoiceComponent],
  imports: [
    CommonModule,
    UiDashboardRemoteCoreModule,
    UiDashboardRemoteEntryInvoiceRoutingModule,
    UiGraphQLClientOptionsModule.withConfig('invoice-remote-widget', {
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
        typePolicies: UI_INVOICE_WIDGET_TYPE_POLICIES,
      } as UiGraphQLClientOptionsConfig,
    },
  ],
})
export class UiDashboardRemoteEntryInvoiceModule {}
