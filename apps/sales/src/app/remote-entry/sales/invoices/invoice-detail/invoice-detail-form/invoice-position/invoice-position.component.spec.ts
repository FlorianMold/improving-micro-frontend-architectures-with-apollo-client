import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesInvoicePositionComponent } from './invoice-position.component';

describe('InvoicePositionComponent', () => {
  let component: UiSalesInvoicePositionComponent;
  let fixture: ComponentFixture<UiSalesInvoicePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesInvoicePositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesInvoicePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
