import { InjectionToken } from '@angular/core';

/** Whether the contact-app runs native or is embedded into a host-application. */
export const UI_CONTACT_NATIVE_ENVIRONMENT = new InjectionToken<boolean>('ui-contact-environment');
