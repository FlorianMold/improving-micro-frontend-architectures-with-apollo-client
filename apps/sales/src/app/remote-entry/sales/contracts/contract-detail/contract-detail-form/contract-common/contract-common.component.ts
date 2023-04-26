import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UiSalesContractCommonForm } from './contract-common.type';

@Component({
  selector: 'ui-sales-contract-common',
  templateUrl: './contract-common.component.html',
  styleUrls: ['./contract-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesContractCommonComponent {
  /** The form, that should be rendered. Renders an empty form by default. */
  @Input('uiForm') contractForm = UiSalesContractCommonComponent.getEmptyForm();

  /**
   * Returns an empty form for common contract details.
   */
  static getEmptyForm(): FormGroup<UiSalesContractCommonForm> {
    return new FormGroup<UiSalesContractCommonForm>({
      id: new FormControl<string>('', { nonNullable: true }),
      contractor: new FormControl<string>('', { nonNullable: true }),
      description: new FormControl<string>('', { nonNullable: true }),
      name: new FormControl<string>('', { nonNullable: true }),
      payPeriod: new FormControl<number | null>(null),
      payPeriodAdvance: new FormControl<number | null>(null),
    });
  }
}
