import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiContactOverviewComponent } from './contact-overview.component';
import { UiCommonVersionService } from '@ui-frontend-service/shared/feature/common-services';
import { UiLayoutModule, UiLayoutNavigationService } from '@ui-frontend-service/shared/ui/dom-layout';
import { UiContactTableComponent } from '../contact-table';
import { UiContactDetailComponent } from '../contact-detail';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ContactOverviewComponent', () => {
  let component: UiContactOverviewComponent;
  let fixture: ComponentFixture<UiContactOverviewComponent>;

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
      declarations: [UiContactOverviewComponent, UiContactTableComponent, UiContactDetailComponent],
      providers: [UiCommonVersionService, UiLayoutNavigationService],
    }).compileComponents();

    fixture = TestBed.createComponent(UiContactOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
