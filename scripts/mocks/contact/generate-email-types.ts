import { UiEmailTypeModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';
import { faker } from '@faker-js/faker/locale/de';

function generateEmailTypes(): UiEmailTypeModel[] {
  return [
    {
      id: 'Privat',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'Arbeit',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'Anders',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
  ];
}

function storeEmailTypes(emailTypes: UiEmailTypeModel[], path: string): UiEmailTypeModel[] {
  writeFileSync(path, JSON.stringify(emailTypes, null, 2));
  return emailTypes;
}

export function generateAndStoreEmailTypes(folder: string, filename: string): UiEmailTypeModel[] {
  return storeEmailTypes(generateEmailTypes(), `${folder}/${filename}`);
}
