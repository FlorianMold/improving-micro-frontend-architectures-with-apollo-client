import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAddressComponent } from './address.component';

describe('UiAddressComponent', () => {
  let component: UiAddressComponent;
  let fixture: ComponentFixture<UiAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
