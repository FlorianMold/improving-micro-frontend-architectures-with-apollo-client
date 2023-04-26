import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesProfileWrapperComponent } from './profile-wrapper.component';

describe('UWrapperComponent', () => {
  let component: UiSalesProfileWrapperComponent;
  let fixture: ComponentFixture<UiSalesProfileWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSalesProfileWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesProfileWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
