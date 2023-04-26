import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRemoteSalesRoutingModule } from './sales-routing.module';
import { UiSalesInvoiceOverviewComponent } from './invoices';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { UiSalesContractOverviewComponent } from './contracts';
import { UiSalesContractTableComponent } from './contracts/contract-table';
import { UiSalesInvoiceTableComponent } from './invoices/invoice-table';
import { UiSalesInvoiceDetailComponent } from './invoices/invoice-detail';
import { UiSalesContractDetailComponent } from './contracts/contract-detail';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { UiDeleteDialogModule } from '@ui-frontend-service/shared/ui/components/delete-dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UiFormSubmitModule } from '@ui-frontend-service/shared/ui/components/form-submit';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSalesContractCommonComponent } from './contracts/contract-detail/contract-detail-form/contract-common';
import { UiSalesContractDetailFormComponent } from './contracts/contract-detail/contract-detail-form';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UiSalesInvoicePositionComponent } from './invoices/invoice-detail/invoice-detail-form/invoice-position';
import { MatSelectModule } from '@angular/material/select';
import { UiSalesInvoiceNoteComponent } from './invoices/invoice-detail/invoice-detail-form/invoice-notes/invoice-note';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { MatListModule } from '@angular/material/list';
import { UiCustomerComponent } from '@ui-frontend-service/shared/ui/components/customer';
import { UiSalesInvoiceCommonComponent } from './invoices/invoice-detail/invoice-detail-form/invoice-common';
import { UiSalesInvoiceNotesComponent } from './invoices/invoice-detail/invoice-detail-form/invoice-notes';
import { UiSalesInvoiceDetailFormComponent } from './invoices/invoice-detail/invoice-detail-form';

@NgModule({
  declarations: [
    UiSalesContractOverviewComponent,
    UiSalesContractTableComponent,
    UiSalesContractDetailComponent,
    UiSalesContractCommonComponent,
    UiSalesContractDetailFormComponent,
    UiSalesInvoiceOverviewComponent,
    UiSalesInvoiceTableComponent,
    UiSalesInvoiceDetailComponent,
    UiSalesInvoicePositionComponent,
    UiSalesInvoiceNoteComponent,
    UiSalesInvoiceNotesComponent,
    UiSalesInvoiceCommonComponent,
    UiSalesInvoiceDetailFormComponent,
  ],
  imports: [
    CommonModule,
    UiRemoteSalesRoutingModule,
    UiLayoutModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    UiDeleteDialogModule,
    MatPaginatorModule,
    UiFormSubmitModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    UiGridModule,
    MatListModule,
    FormsModule,
    UiCustomerComponent,
  ],
})
export class UiSalesRemoteModule {}
