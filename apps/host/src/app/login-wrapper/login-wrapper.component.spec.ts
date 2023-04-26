import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiHostLoginWrapperComponent } from './login-wrapper.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('LoginWrapperComponent', () => {
  let component: UiHostLoginWrapperComponent;
  let fixture: ComponentFixture<UiHostLoginWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiHostLoginWrapperComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UiHostLoginWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
