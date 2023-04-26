import { InjectionToken } from '@angular/core';

/** Whether the dashboard-app runs native or is embedded into a host-application. */
export const UI_DASHBOARD_NATIVE_ENVIRONMENT = new InjectionToken<boolean>('ui-dashboard-environment');
