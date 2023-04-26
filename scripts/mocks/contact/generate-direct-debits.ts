import { faker } from '@faker-js/faker/locale/de';
import { UiContactModel, UiDirectDebitModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';

type UiDirectDebitsHelperTypes = { contacts: UiContactModel[] };

function generateDirectDebits(amount: number, _: UiDirectDebitsHelperTypes): UiDirectDebitModel[] {
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.datatype.uuid(),
      accountHolder: faker.name.firstName(),
      iban: faker.finance.iban(),
      bic: faker.finance.bic(),
      bankName: faker.company.name(),
      bankCode: faker.finance.routingNumber(),
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeDirectDebits(directDebits: UiDirectDebitModel[], path: string): UiDirectDebitModel[] {
  writeFileSync(path, JSON.stringify(directDebits, null, 2));
  return directDebits;
}

export function generateAndStoreDirectDebits(
  amount: number,
  folder: string,
  filename: string,
  helperTypes: UiDirectDebitsHelperTypes
): UiDirectDebitModel[] {
  return storeDirectDebits(generateDirectDebits(amount, helperTypes), `${folder}/${filename}`);
}
