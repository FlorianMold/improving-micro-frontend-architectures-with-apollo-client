import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLoginComponent } from './ui-login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: UiLoginComponent;
  let fixture: ComponentFixture<UiLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLoginComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
