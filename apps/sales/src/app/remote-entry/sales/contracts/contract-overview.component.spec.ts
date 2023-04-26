import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesContractOverviewComponent } from './contract-overview.component';

xdescribe('ContractOverviewComponent', () => {
  let component: UiSalesContractOverviewComponent;
  let fixture: ComponentFixture<UiSalesContractOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesContractOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesContractOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
