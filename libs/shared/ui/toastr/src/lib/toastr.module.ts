import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { UiToast } from './toast.component';
import { DefaultNoComponentGlobalConfig, GlobalConfig, TOAST_CONFIG } from './toastr-config';

export const DefaultGlobalConfig: GlobalConfig = {
  ...DefaultNoComponentGlobalConfig,
  toastComponent: UiToast,
};

@NgModule({
  imports: [CommonModule],
  declarations: [UiToast],
  exports: [UiToast],
})
export class UiToastrModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<UiToastrModule> {
    return {
      ngModule: UiToastrModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultGlobalConfig,
            config,
          },
        },
      ],
    };
  }
}

@NgModule({
  imports: [CommonModule],
})
export class UiToastrComponentlessModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<UiToastrModule> {
    return {
      ngModule: UiToastrModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultNoComponentGlobalConfig,
            config,
          },
        },
      ],
    };
  }
}
