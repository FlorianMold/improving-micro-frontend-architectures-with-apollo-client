import { MatDatepickerIntl } from '@angular/material/datepicker';
import { Injectable } from '@angular/core';

@Injectable()
export class UiDateDatepickerIntl extends MatDatepickerIntl {
  constructor() {
    super();
  }

  override calendarLabel = 'Kalender';
  override openCalendarLabel = 'Kalender öffnen';
  override closeCalendarLabel = 'Kalender schließen';
  override prevMonthLabel = 'Vorheriger Monat';
  override nextMonthLabel = 'Nächster Monat';
  override prevYearLabel = 'Vorheriges Jahr';
  override nextYearLabel = 'Nächstes Jahr';
  override prevMultiYearLabel = 'Vorherige 24 Jahre';
  override nextMultiYearLabel = 'Nächste 24 Jahre';
  override switchToMonthViewLabel = 'Datum auswählen';
  override switchToMultiYearViewLabel = 'Monat und Jahr auswählen';
}
