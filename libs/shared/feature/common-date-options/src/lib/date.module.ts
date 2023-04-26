import { NgModule } from '@angular/core';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UiDateDatepickerIntl } from './date-intl';
import { UI_DATE_FORMATS } from './date-formats';

@NgModule({
  imports: [MatDatepickerModule, MatLuxonDateModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-AT' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: UI_DATE_FORMATS,
    },
    {
      provide: UI_DATE_FORMATS,
      useExisting: MAT_DATE_FORMATS,
    },
    { provide: MatDatepickerIntl, useClass: UiDateDatepickerIntl },
  ],
  exports: [MatLuxonDateModule, MatDatepickerModule],
})
export class UiDateModule {}
