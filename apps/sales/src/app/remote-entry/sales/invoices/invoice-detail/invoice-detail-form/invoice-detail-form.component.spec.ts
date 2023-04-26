import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesInvoiceDetailFormComponent } from './invoice-detail-form.component';

describe('InvoiceDetailFormComponent', () => {
  let component: UiSalesInvoiceDetailFormComponent;
  let fixture: ComponentFixture<UiSalesInvoiceDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesInvoiceDetailFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesInvoiceDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
