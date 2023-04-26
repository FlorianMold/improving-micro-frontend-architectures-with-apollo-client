import { InjectionToken } from '@angular/core';

/** Whether the user-app runs native or is embedded into a host-application. */
export const UI_USER_NATIVE_ENVIRONMENT = new InjectionToken<boolean>('ui-user-environment');
