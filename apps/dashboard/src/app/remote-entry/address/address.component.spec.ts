import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDashboardRemoteEntryAddressComponent } from './address.component';

xdescribe('AddressComponent', () => {
  let component: UiDashboardRemoteEntryAddressComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntryAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntryAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntryAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
