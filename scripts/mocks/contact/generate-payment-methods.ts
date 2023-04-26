import {
  UiContactModel,
  UiContactPaymentMethodModel,
  UiDirectDebitModel,
  UiPayPalAccountModel,
} from '@ui-frontend-service/contact/api-types';
import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';

type UiPaymentMethodHelperTypes = {
  contacts: UiContactModel[];
  directDebits: UiDirectDebitModel[];
  paypalAccounts: UiPayPalAccountModel[];
};

function generatePaymentMethods(
  amount: number,
  { directDebits, paypalAccounts, contacts }: UiPaymentMethodHelperTypes
): UiContactPaymentMethodModel[] {
  return Array.from({ length: amount }).map(() => {
    // Roll a die to determine, if the payment-method is direct-debit or paypal-account
    const dice: any[] = faker.helpers.maybe(() => directDebits, { probability: 0.5 }) ?? paypalAccounts;
    const randomEl = faker.helpers.arrayElement(dice);
    return {
      contact_id: faker.helpers.arrayElement(contacts).id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: undefined,
      isDefault: false,
      ...randomEl,
    };
  });
}

function storePaymentMethods(paymentMethods: UiContactPaymentMethodModel[], path: string): UiContactPaymentMethodModel[] {
  writeFileSync(path, JSON.stringify(paymentMethods, null, 2));
  return paymentMethods;
}

export function generateAndStorePaymentMethods(
  amount: number,
  folder: string,
  filename: string,
  helpers: UiPaymentMethodHelperTypes
): UiContactPaymentMethodModel[] {
  return storePaymentMethods(generatePaymentMethods(amount, helpers), `${folder}/${filename}`);
}
