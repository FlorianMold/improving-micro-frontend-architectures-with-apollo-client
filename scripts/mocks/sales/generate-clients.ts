import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import { UiClientModel } from '@ui-frontend-service/sales/api-types';

function generateClients(amount: number): UiClientModel[] {
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      createdAt: faker.date.past().valueOf(),
      changedAt: faker.date.recent().valueOf(),
      deletedAt: null,
    };
  });
}

function storeClients(persons: UiClientModel[], path: string): UiClientModel[] {
  writeFileSync(path, JSON.stringify(persons, null, 2));
  return persons;
}

export function generateAndStoreClients(amount: number, folder: string, filename: string): UiClientModel[] {
  return storeClients(generateClients(amount), `${folder}/${filename}`);
}
