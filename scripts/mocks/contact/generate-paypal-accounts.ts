import { faker } from '@faker-js/faker/locale/de';
import { UiContactModel, UiPayPalAccountModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';

type UiPaypalAccountsHelperTypes = { contacts: UiContactModel[] };

function generatePaypalAccounts(amount: number, _: UiPaypalAccountsHelperTypes): UiPayPalAccountModel[] {
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      createdAt: faker.date.past().valueOf(),
      changedAt: faker.date.recent().valueOf(),
      deletedAt: null,
    };
  });
}

function storePaypalAccounts(directDebits: UiPayPalAccountModel[], path: string): UiPayPalAccountModel[] {
  writeFileSync(path, JSON.stringify(directDebits, null, 2));
  return directDebits;
}

export function generateAndStorePaypalAccounts(
  amount: number,
  folder: string,
  filename: string,
  helpers: UiPaypalAccountsHelperTypes
): UiPayPalAccountModel[] {
  return storePaypalAccounts(generatePaypalAccounts(amount, helpers), `${folder}/${filename}`);
}
