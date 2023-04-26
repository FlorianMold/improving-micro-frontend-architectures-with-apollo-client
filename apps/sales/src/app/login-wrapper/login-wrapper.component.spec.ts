import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSalesLoginWrapperComponent } from './login-wrapper.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('LoginWrapperComponent', () => {
  let component: UiSalesLoginWrapperComponent;
  let fixture: ComponentFixture<UiSalesLoginWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSalesLoginWrapperComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSalesLoginWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
