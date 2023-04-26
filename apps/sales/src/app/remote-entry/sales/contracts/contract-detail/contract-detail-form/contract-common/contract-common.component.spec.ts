import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesContractCommonComponent } from './contract-common.component';

describe('ContractDetailFormComponent', () => {
  let component: UiSalesContractCommonComponent;
  let fixture: ComponentFixture<UiSalesContractCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiSalesContractCommonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesContractCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
