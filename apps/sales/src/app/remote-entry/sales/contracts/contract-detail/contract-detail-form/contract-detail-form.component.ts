import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { UiAllCountriesModel, UiContractDetailModel } from '@ui-frontend-service/sales/api-types';
import { UiCustomerComponent, UiCustomerFormRawValue } from '@ui-frontend-service/shared/ui/components/customer';
import { UiSalesContractCommonComponent, UiSalesContractCommonFormRawValues } from './contract-common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ui-sales-contract-detail-form',
  templateUrl: './contract-detail-form.component.html',
  styleUrls: ['./contract-detail-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSalesContractDetailFormComponent implements OnChanges {
  /**
   * The contract which should prefill the form.
   *
   * If contract is not specified, the component creates a new contract.
   */
  @Input('uiContract') contract?: UiContractDetailModel | null = null;
  /** All countries, which should be selectable in the customer form. */
  @Input('uiCustomerCountries') countries?: UiAllCountriesModel[] = [];

  /** Emits, when the form has been submitted and no initial contract was provided. */
  @Output('uiCreateContract') readonly createContract = new EventEmitter<{
    common: Omit<UiSalesContractCommonFormRawValues, 'id'>;
    customer: Omit<UiCustomerFormRawValue, 'id'>;
  }>();

  /** Emits, when the form has been submitted and an initial contract was provided. */
  @Output('uiUpdateContract') readonly updateContract = new EventEmitter<{
    common: UiSalesContractCommonFormRawValues;
    customer: UiCustomerFormRawValue;
  }>();

  private _formBuilder = inject(FormBuilder);

  _customerForm = UiCustomerComponent.getEmptyForm();

  _contractCommonForm = UiSalesContractCommonComponent.getEmptyForm();

  _contractForm = this._formBuilder.group({
    common: this._contractCommonForm,
    customer: this._customerForm,
  });

  ngOnChanges(changes: SimpleChanges): void {
    const { contract } = changes;

    if (contract?.currentValue) {
      const updatedContract = contract.currentValue;
      this._contractCommonForm.patchValue(updatedContract);
      this._customerForm.setValue({
        id: updatedContract.Customer.id,
        name: updatedContract.Customer.name,
        name2: updatedContract.Customer.name2,
        postal: updatedContract.Customer.postal,
        street: updatedContract.Customer.street,
        vatNumber: updatedContract.Customer.vatNumber,
        country_id: updatedContract.Customer.SalesCountry.id,
      });
    }
  }

  /**
   * Handles the submit-event of the contract-detail form. When the contract already has an id, the "Update"-event will be emitted.
   * Otherwise, the "Create"-event will be emitted.
   */
  _handleFormSubmission(): void {
    if (this._contractForm.valid) {
      const commonContractForm = this._contractCommonForm.getRawValue();
      const commonContractModel = {
        contractor: commonContractForm.contractor,
        description: commonContractForm.description,
        name: commonContractForm.name,
        payPeriod: commonContractForm.payPeriod,
        payPeriodAdvance: commonContractForm.payPeriodAdvance,
      };
      const customerForm = this._customerForm.getRawValue();
      const customerModel = {
        name: customerForm.name,
        name2: customerForm.name2,
        postal: customerForm.postal,
        street: customerForm.street,
        vatNumber: customerForm.vatNumber,
        country_id: customerForm.country_id,
      };

      if (this.contract) {
        this.updateContract.emit({
          common: { id: this.contract.id, ...commonContractModel },
          customer: { id: this.contract.Customer.id, ...customerModel },
        });
      } else {
        this.createContract.emit({
          common: commonContractModel,
          customer: customerModel,
        });
      }
    }
  }
}
