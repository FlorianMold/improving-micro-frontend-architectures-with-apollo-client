import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDashboardRemoteEntryContractComponent } from './contract.component';

xdescribe('ContractComponent', () => {
  let component: UiDashboardRemoteEntryContractComponent;
  let fixture: ComponentFixture<UiDashboardRemoteEntryContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardRemoteEntryContractComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardRemoteEntryContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
