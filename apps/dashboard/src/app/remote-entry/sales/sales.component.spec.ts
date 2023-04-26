import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDashboardRemoteEntrySalesComponent } from './sales.component';

xdescribe('SalesComponent', () => {
  let component: UiDashboardRemoteEntrySalesComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntrySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntrySalesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntrySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
