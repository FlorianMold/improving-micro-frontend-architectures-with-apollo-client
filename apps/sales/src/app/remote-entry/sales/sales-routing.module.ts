import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { UiSalesInvoiceOverviewComponent } from './invoices';
import { UiSalesContractOverviewComponent } from './contracts';
import { UiSalesContractTableComponent } from './contracts/contract-table';
import { UiSalesInvoiceTableComponent } from './invoices/invoice-table';
import { UiSalesInvoiceDetailComponent } from './invoices/invoice-detail';
import { UiSalesContractDetailComponent } from './contracts/contract-detail';
import { UiSalesDataAccessContractService, UiSalesDataAccessInvoiceService } from '@ui-frontend-service/sales/data-access';
import { filter } from 'rxjs';
import { UiContractDetailByIdResponseModel, UiInvoiceDetailByIdResponseModel } from '@ui-frontend-service/sales/api-types';

export const SALES_ROUTES: Routes = [
  {
    path: 'invoices',
    component: UiSalesInvoiceOverviewComponent,
    children: [
      {
        path: '',
        component: UiSalesInvoiceTableComponent,
      },
      {
        path: 'new',
        component: UiSalesInvoiceDetailComponent,
        outlet: 'detail-outlet',
      },
      {
        path: 'detail/:id',
        component: UiSalesInvoiceDetailComponent,
        resolve: {
          invoice: (route: ActivatedRouteSnapshot) => {
            return inject(UiSalesDataAccessInvoiceService)
              .invoiceDetailById(route.params['id'])
              .pipe(filter((response: UiInvoiceDetailByIdResponseModel) => !response.loading));
          },
        },
        outlet: 'detail-outlet',
      },
    ],
  },
  {
    path: 'contracts',
    component: UiSalesContractOverviewComponent,
    children: [
      {
        path: '',
        component: UiSalesContractTableComponent,
      },
      {
        path: 'new',
        component: UiSalesContractDetailComponent,
        outlet: 'detail-outlet',
      },
      {
        path: 'detail/:id',
        component: UiSalesContractDetailComponent,
        resolve: {
          contract: (route: ActivatedRouteSnapshot) => {
            return inject(UiSalesDataAccessContractService)
              .contractDetailById(route.params['id'])
              .pipe(filter((response: UiContractDetailByIdResponseModel) => !response.loading));
          },
        },
        outlet: 'detail-outlet',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(SALES_ROUTES)],
  exports: [RouterModule],
})
export class UiRemoteSalesRoutingModule {}
