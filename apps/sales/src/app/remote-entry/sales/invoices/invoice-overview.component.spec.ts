import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesInvoiceOverviewComponent } from './invoice-overview.component';

xdescribe('InvoiceOverviewComponent', () => {
  let component: UiSalesInvoiceOverviewComponent;
  let fixture: ComponentFixture<UiSalesInvoiceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesInvoiceOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesInvoiceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
