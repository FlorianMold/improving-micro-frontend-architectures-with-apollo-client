import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesInvoiceNoteComponent } from './invoice-note.component';

describe('InvoiceNoteComponent', () => {
  let component: UiSalesInvoiceNoteComponent;
  let fixture: ComponentFixture<UiSalesInvoiceNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesInvoiceNoteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesInvoiceNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
