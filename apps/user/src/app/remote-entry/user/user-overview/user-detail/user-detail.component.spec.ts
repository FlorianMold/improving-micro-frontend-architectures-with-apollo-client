import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserWrapperComponent } from './user-detail.component';

describe('UserWrapperComponent', () => {
  let component: UiUserWrapperComponent;
  let fixture: ComponentFixture<UiUserWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUserWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiUserWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
