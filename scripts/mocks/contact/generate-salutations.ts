import { UiSalutationModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';
import { faker } from '@faker-js/faker/locale/de';

function generateSalutations(): UiSalutationModel[] {
  return [
    { id: 'Herr', changedAt: faker.date.recent().valueOf(), createdAt: faker.date.past().valueOf(), deletedAt: null },
    { id: 'Frau', changedAt: faker.date.recent().valueOf(), createdAt: faker.date.past().valueOf(), deletedAt: null },
    { id: 'Divers', changedAt: faker.date.recent().valueOf(), createdAt: faker.date.past().valueOf(), deletedAt: null },
  ];
}

function storeSalutations(salutations: UiSalutationModel[], path: string): UiSalutationModel[] {
  writeFileSync(path, JSON.stringify(salutations, null, 2));
  return salutations;
}

export function generateAndStoreSalutations(folder: string, filename: string): UiSalutationModel[] {
  return storeSalutations(generateSalutations(), `${folder}/${filename}`);
}
