import { faker } from '@faker-js/faker/locale/de';
import { UiVatModel } from '@ui-frontend-service/sales/api-types';
import { writeFileSync } from 'fs';

function generateVats(amount: number): UiVatModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.datatype.uuid(),
      vat: faker.datatype.number({ precision: 0.01 }),
      vatRemark: faker.lorem.sentence(),
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeVats(vats: UiVatModel[], path: string): UiVatModel[] {
  writeFileSync(path, JSON.stringify(vats, null, 2));
  return vats;
}

export function generateAndStoreVats(amount: number, folder: string, filename: string): UiVatModel[] {
  return storeVats(generateVats(amount), `${folder}/${filename}`);
}
