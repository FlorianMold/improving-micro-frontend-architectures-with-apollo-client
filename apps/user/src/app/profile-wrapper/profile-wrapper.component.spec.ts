import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserProfileWrapperComponent } from './profile-wrapper.component';

describe('UiProfileWrapperComponent', () => {
  let component: UiUserProfileWrapperComponent;
  let fixture: ComponentFixture<UiUserProfileWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUserProfileWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiUserProfileWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
