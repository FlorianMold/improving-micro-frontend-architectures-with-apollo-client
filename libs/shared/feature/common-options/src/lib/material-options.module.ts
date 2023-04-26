import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { UI_TABLE_DEFAULT_OPTIONS, UI_TABLE_DEFAULT_OPTIONS_FACTORY } from './table-options';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UiMaterialOptionsPaginatorIntl } from './paginator-intl';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';

@NgModule({
  providers: [
    { provide: UI_TABLE_DEFAULT_OPTIONS, useFactory: UI_TABLE_DEFAULT_OPTIONS_FACTORY },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        verticalPosition: 'top',
      } as MatSnackBarConfig,
    },
    {
      provide: MatPaginatorIntl,
      useClass: UiMaterialOptionsPaginatorIntl,
    },
  ],
})
export class UiMaterialOptionsModule {}
