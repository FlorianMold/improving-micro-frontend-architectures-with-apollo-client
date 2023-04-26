import { faker } from '@faker-js/faker/locale/de';
import { UiCountryModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';

function generateCountries(amount: number): UiCountryModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.address.country(),
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeCountries(countries: UiCountryModel[], path: string): UiCountryModel[] {
  writeFileSync(path, JSON.stringify(countries, null, 2));
  return countries;
}

export function generateAndStoreCountries(amount: number, folder: string, filename: string): UiCountryModel[] {
  return storeCountries(generateCountries(amount), `${folder}/${filename}`);
}
