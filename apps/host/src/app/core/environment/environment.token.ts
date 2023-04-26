import { InjectionToken } from '@angular/core';
import { UiHostEnvironment } from './environment.type';

/** Injection token that can be used to inject the environment-config. */
export const UI_HOST_ENVIRONMENT = new InjectionToken<UiHostEnvironment>('ui-host-environment');
