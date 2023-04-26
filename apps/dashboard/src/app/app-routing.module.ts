import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./remote-entry/contact/contact.module').then((m) => m.UiDashboardRemoteEntryContactModule),
    outlet: 'contact-widget',
  },
  {
    path: '',
    loadChildren: () => import('./remote-entry/sales/sales.module').then((m) => m.UiDashboardRemoteEntrySalesModule),
    outlet: 'sales-widget',
  },
  {
    path: '',
    loadChildren: () => import('./remote-entry/person/person.module').then((m) => m.UiDashboardRemoteEntryPersonModule),
    outlet: 'person-widget',
  },
  {
    path: '',
    loadChildren: () => import('./remote-entry/address/address.module').then((m) => m.UiDashboardRemoteEntryAddressModule),
    outlet: 'address-widget',
  },
  {
    path: '',
    loadChildren: () => import('./remote-entry/user/user.module').then((m) => m.UiDashboardRemoteEntryUserModule),
    outlet: 'user-widget',
  },
  {
    path: '',
    loadChildren: () => import('./remote-entry/invoice/invoice.module').then((m) => m.UiDashboardRemoteEntryInvoiceModule),
    outlet: 'invoice-widget',
  },
  {
    path: '',
    loadChildren: () => import('./remote-entry/contract/contract.module').then((m) => m.UiDashboardRemoteEntryContractModule),
    outlet: 'contract-widget',
  },
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/contact-list/contact-list.module').then((m) => m.UiDashboardRemoteEntryContactListModule),
    outlet: 'contact-list-widget',
  },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      preloadingStrategy: QuicklinkStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class UiDashboardAppRoutingModule {}
