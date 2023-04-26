import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserLoginWrapperComponent } from './login-wrapper.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('LoginWrapperComponent', () => {
  let component: UiUserLoginWrapperComponent;
  let fixture: ComponentFixture<UiUserLoginWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUserLoginWrapperComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UiUserLoginWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
