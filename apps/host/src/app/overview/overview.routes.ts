import { Routes } from '@angular/router';
import { UiHostOverviewComponent } from './overview.component';
import { loadRemoteModule } from '@nrwl/angular/mf';
import { UI_HOST_REMOTES } from '../app-config.const';
import { UiDashboardReactWrapperComponent } from './exp-react/dashboard-react-wrapper';

export const OVERVIEW_ROUTES: Routes = [
  {
    path: '',
    component: UiHostOverviewComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './ContactWidget').then((m) => m.UiDashboardRemoteEntryContactModule),
        outlet: 'contact-widget',
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './SalesWidget').then((m) => m.UiDashboardRemoteEntrySalesModule),
        outlet: 'sales-widget',
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './AddressWidget').then((m) => m.UiDashboardRemoteEntryAddressModule),
        outlet: 'address-widget',
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './PersonWidget').then((m) => m.UiDashboardRemoteEntryPersonModule),
        outlet: 'person-widget',
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './UserWidget').then((m) => m.UiDashboardRemoteEntryUserModule),
        outlet: 'user-widget',
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './InvoiceWidget').then((m) => m.UiDashboardRemoteEntryInvoiceModule),
        outlet: 'invoice-widget',
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './ContractWidget').then((m) => m.UiDashboardRemoteEntryContractModule),
        outlet: 'contract-widget',
      },
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule(UI_HOST_REMOTES.DASHBOARD, './ContactListWidget').then(
            (m) => m.UiDashboardRemoteEntryContactListModule
          ),
        outlet: 'contact-list-widget',
      },
      {
        path: '',
        loadComponent: () => UiDashboardReactWrapperComponent,
        outlet: 'react-widget',
      },
    ],
  },
];
