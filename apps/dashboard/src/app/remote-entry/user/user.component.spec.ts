import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDashboardRemoteEntryUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UiDashboardRemoteEntryUserComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntryUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
