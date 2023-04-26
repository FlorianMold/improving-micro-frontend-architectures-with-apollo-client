import { ModuleWithProviders, NgModule } from '@angular/core';
import { UI_LOGGER_LEVEL, UiLoggerService } from './logger.service';
import { UiLogLevel } from './levels.const';

@NgModule()
export class UiLoggerModule {
  /**
   * Provide the {@link UiLoggerService}.
   */
  static forRoot(): ModuleWithProviders<UiLoggerModule> {
    return {
      ngModule: UiLoggerModule,
      providers: [UiLoggerService],
    };
  }

  /**
   *
   * @param level
   */
  static withLogLevel(level: UiLogLevel = UiLogLevel.LOG): ModuleWithProviders<UiLoggerModule> {
    return {
      ngModule: UiLoggerModule,
      providers: [UiLoggerService, { provide: UI_LOGGER_LEVEL, useValue: level }],
    };
  }
}
