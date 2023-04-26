import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiContactProfileWrapperComponent } from './profile-wrapper.component';

describe('UiProfileWrapperComponent', () => {
  let component: UiContactProfileWrapperComponent;
  let fixture: ComponentFixture<UiContactProfileWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiContactProfileWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiContactProfileWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
