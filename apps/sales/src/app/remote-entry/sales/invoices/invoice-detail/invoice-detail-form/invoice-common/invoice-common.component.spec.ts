import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesInvoiceCommonComponent } from './invoice-common.component';

describe('InvoiceCommonComponent', () => {
  let component: UiSalesInvoiceCommonComponent;
  let fixture: ComponentFixture<UiSalesInvoiceCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesInvoiceCommonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesInvoiceCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
