import { TestBed } from '@angular/core/testing';
import { UiHostAppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiToastrModule } from '@ui-frontend-service/shared/ui/toastr';
import { environment, UI_HOST_ENVIRONMENT } from './core/environment';
import { UiHostEnvironmentLoaderService } from './core/conf';
import { HttpClientModule } from '@angular/common/http';
import { UiCommonVersionService, UiEnvironmentLoaderService } from '@ui-frontend-service/shared/feature/common-services';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UiLayoutModule, UiLayoutNavigationService, UiLayoutTemplateService } from '@ui-frontend-service/shared/ui/dom-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        UiLayoutModule,
        RouterTestingModule,
        UiToastrModule.forRoot(),
        HttpClientModule,
        MatBottomSheetModule,
      ],
      declarations: [UiHostAppComponent],
      providers: [
        UiLayoutTemplateService,
        UiLayoutNavigationService,
        UiCommonVersionService,
        {
          provide: UI_HOST_ENVIRONMENT,
          useValue: environment,
        },
        { provide: UiEnvironmentLoaderService, useClass: UiHostEnvironmentLoaderService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UiHostAppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
