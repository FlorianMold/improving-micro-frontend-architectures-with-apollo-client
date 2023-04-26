import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormSubmitComponent } from './form-submit.component';

describe('FormSubmitComponent', () => {
  let component: UiFormSubmitComponent;
  let fixture: ComponentFixture<UiFormSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiFormSubmitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiFormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
