import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDashboardRemoteEntryPersonComponent } from './person.component';

xdescribe('PersonComponent', () => {
  let component: UiDashboardRemoteEntryPersonComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntryPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntryPersonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntryPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
