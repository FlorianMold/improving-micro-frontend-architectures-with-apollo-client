import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDashboardRemoteEntryInvoiceComponent } from './invoice.component';

xdescribe('InvoiceComponent', () => {
  let component: UiDashboardRemoteEntryInvoiceComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntryInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntryInvoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntryInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
