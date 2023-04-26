import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserOverviewComponent } from './user-overview.component';

describe('UserOverviewComponent', () => {
  let component: UiUserOverviewComponent;
  let fixture: ComponentFixture<UiUserOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUserOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiUserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
