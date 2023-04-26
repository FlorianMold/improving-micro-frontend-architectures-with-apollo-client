import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDashboardRemoteEntryContactListComponent } from './contact-list.component';

xdescribe('ContactListComponent', () => {
  let component: UiDashboardRemoteEntryContactListComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntryContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntryContactListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntryContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
