import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUserTableComponent } from './user-table.component';

describe('UserTableComponent', () => {
  let component: UiUserTableComponent;
  let fixture: ComponentFixture<UiUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUserTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
