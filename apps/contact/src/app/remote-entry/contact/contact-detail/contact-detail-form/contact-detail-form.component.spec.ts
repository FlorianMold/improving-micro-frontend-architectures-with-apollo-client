import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiContactDetailFormComponent } from './contact-detail-form.component';

xdescribe('ContactDetailFormComponent', () => {
  let component: UiContactDetailFormComponent;
  let fixture: ComponentFixture<UiContactDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiContactDetailFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiContactDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
