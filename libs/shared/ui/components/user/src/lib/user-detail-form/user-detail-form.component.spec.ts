import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserDetailFormComponent } from './user-detail-form.component';

describe('UserDetailFormComponent', () => {
  let component: UiUserDetailFormComponent;
  let fixture: ComponentFixture<UiUserDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUserDetailFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiUserDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
