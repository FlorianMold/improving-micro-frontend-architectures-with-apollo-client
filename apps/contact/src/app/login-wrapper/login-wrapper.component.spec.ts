import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiContactLoginWrapperComponent } from './login-wrapper.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('LoginWrapperComponent', () => {
  let component: UiContactLoginWrapperComponent;
  let fixture: ComponentFixture<UiContactLoginWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiContactLoginWrapperComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UiContactLoginWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
