import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDashboardRemoteEntryContactComponent } from './contact.component';

xdescribe('ContactComponent', () => {
  let component: UiDashboardRemoteEntryContactComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntryContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntryContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntryContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
