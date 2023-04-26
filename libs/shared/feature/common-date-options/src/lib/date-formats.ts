// https://moment.github.io/luxon/#/formatting

export const UI_DATE_FORMATS = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    timeInput: 'HH:mm:ss',
    monthYearLabel: 'MMMM yyyy',
    dateA11yLabel: 'dd.MM.yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

export type UiDateFormats = {
  parse: {
    dateInput: string;
  };
  display: {
    dateInput: string;
    timeInput: string;
    monthLabel?: string;
    monthYearLabel: string;
    dateA11yLabel: string;
    monthYearA11yLabel: string;
  };
};
