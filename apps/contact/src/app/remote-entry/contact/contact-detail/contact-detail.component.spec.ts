import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiContactDetailComponent } from './contact-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UiLayoutModule } from '@ui-frontend-service/shared/ui/dom-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ContactDetailComponent', () => {
  let component: UiContactDetailComponent;
  let fixture: ComponentFixture<UiContactDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        UiLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
      ],
      declarations: [UiContactDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
