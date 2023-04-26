import { UiContactBaseModel } from './base.model';

export interface UiContactPaymentMethodModel extends UiContactBaseModel {
  id: string;
  isDefault?: boolean;
  contact_id?: string;
}

/**
 * Checks whether the given payment-method is a paypal-payment-method.
 *
 * @param paymentMethod The payment-method to check.
 */
export function isPaypalAccount(paymentMethod: UiContactPaymentMethodModel): boolean {
  return !!paymentMethod;
}
