import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesInvoiceTableComponent } from './invoice-table.component';
import { CommonModule } from '@angular/common';
import { UiLayoutModule, UiLayoutNavigationService } from '@ui-frontend-service/shared/ui/dom-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UiCommonVersionService } from '@ui-frontend-service/shared/feature/common-services';

xdescribe('ContractTableComponent', () => {
  let component: UiSalesInvoiceTableComponent;
  let fixture: ComponentFixture<UiSalesInvoiceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        UiLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
      ],
      declarations: [UiSalesInvoiceTableComponent],
      providers: [UiCommonVersionService, UiLayoutNavigationService],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesInvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
