import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: UiProfileComponent;
  let fixture: ComponentFixture<UiProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
