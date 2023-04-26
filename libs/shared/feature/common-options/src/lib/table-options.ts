import { InjectionToken } from '@angular/core';

/**
 * Default options for material-tables.
 */
export interface UiTableOptions {
  pageSize: number;
  pageSizeOptions: number[];
}

export const UI_TABLE_DEFAULT_OPTIONS_FACTORY: () => UiTableOptions = () => ({
  pageSize: 100,
  pageSizeOptions: [10, 25, 50, 100],
});

/**
 * Injection-token used for specifying the default options for mat-table.
 */
export const UI_TABLE_DEFAULT_OPTIONS = new InjectionToken<UiTableOptions>('UI_TABLE_OPTIONS');
