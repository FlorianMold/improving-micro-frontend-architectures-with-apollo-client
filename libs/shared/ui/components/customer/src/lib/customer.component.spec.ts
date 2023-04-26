import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: UiCustomerComponent;
  let fixture: ComponentFixture<UiCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCustomerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
