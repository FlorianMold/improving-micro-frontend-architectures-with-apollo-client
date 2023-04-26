import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesContractDetailFormComponent } from './contract-detail-form.component';

describe('ContractDetailFormComponent', () => {
  let component: UiSalesContractDetailFormComponent;
  let fixture: ComponentFixture<UiSalesContractDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesContractDetailFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesContractDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
