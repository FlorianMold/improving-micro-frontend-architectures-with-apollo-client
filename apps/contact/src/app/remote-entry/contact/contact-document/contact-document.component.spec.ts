import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiContactDocumentComponent } from './contact-document.component';

describe('ContactDocumentComponent', () => {
  let component: UiContactDocumentComponent;
  let fixture: ComponentFixture<UiContactDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiContactDocumentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiContactDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
