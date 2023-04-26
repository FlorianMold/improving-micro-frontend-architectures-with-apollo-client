import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesInvoiceNotesComponent } from './invoice-notes.component';

describe('InvoiceNotesComponent', () => {
  let component: UiSalesInvoiceNotesComponent;
  let fixture: ComponentFixture<UiSalesInvoiceNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesInvoiceNotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesInvoiceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
