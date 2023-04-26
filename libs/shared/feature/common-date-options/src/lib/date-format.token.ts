import { InjectionToken } from '@angular/core';
import { MatDateFormats } from '@angular/material/core';

export type UiDateFormats = MatDateFormats;
export const UI_DATE_FORMATS = new InjectionToken<UiDateFormats>('UI_DATE_FORMATS');
