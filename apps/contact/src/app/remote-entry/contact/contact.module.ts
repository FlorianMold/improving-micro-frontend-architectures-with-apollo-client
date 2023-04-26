import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiRemoteContactRoutingModule } from './contact-routing.module';
import { UiContactDetailComponent, UiContactDetailFormComponent } from './contact-detail';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UiContactTableComponent } from './contact-table';
import { UiContactOverviewComponent } from './contact-overview';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { MatSortModule } from '@angular/material/sort';
import { UiContactDocumentComponent } from './contact-document';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { UiGridModule } from '@ui-frontend-service/shared/ui/grid';
import { UiFormSubmitModule } from '@ui-frontend-service/shared/ui/components/form-submit';
import { MatIconModule } from '@angular/material/icon';
import { UiDeleteDialogModule } from '@ui-frontend-service/shared/ui/components/delete-dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [
    UiContactOverviewComponent,
    UiContactDetailComponent,
    UiContactTableComponent,
    UiContactDocumentComponent,
    UiContactDetailFormComponent,
  ],
  imports: [
    CommonModule,
    UiRemoteContactRoutingModule,
    UiLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    UiGridModule,
    UiFormSubmitModule,
    MatIconModule,
    UiDeleteDialogModule,
    MatSnackBarModule,
    NgxExtendedPdfViewerModule,
  ],
})
export class UiContactRemoteModule {}
