import { InjectionToken } from '@angular/core';

/** Whether the sales-app runs native or is embedded into a host-application. */
export const UI_SALES_NATIVE_ENVIRONMENT = new InjectionToken<boolean>('ui-sales-environment');
