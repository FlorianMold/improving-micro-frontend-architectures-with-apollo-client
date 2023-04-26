import { UiSalesPaymentMethodModel } from '@ui-frontend-service/sales/api-types';
import { writeFileSync } from 'fs';
import { faker } from '@faker-js/faker/locale/de';

function generatePaymentMethods(): UiSalesPaymentMethodModel[] {
  return [
    {
      id: 'CASH',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'CREDIT',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'DEBIT',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'BANK_TRANSFER',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
  ];
}

function storePaymentMethods(currencies: UiSalesPaymentMethodModel[], path: string): UiSalesPaymentMethodModel[] {
  writeFileSync(path, JSON.stringify(currencies, null, 2));
  return currencies;
}

export function generateAndStorePaymentMethods(folder: string, filename: string): UiSalesPaymentMethodModel[] {
  return storePaymentMethods(generatePaymentMethods(), `${folder}/${filename}`);
}
