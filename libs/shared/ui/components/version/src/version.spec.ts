import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { UiVersionComponent } from './version.component';
import { MatListModule } from '@angular/material/list';

xdescribe('VersionComponent', () => {
  let component: UiVersionComponent;
  let fixture: ComponentFixture<UiVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatListModule],
      declarations: [UiVersionComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(UiVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
