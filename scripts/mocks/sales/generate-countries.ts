import { faker } from '@faker-js/faker/locale/de';
import { UiSalesCountryModel } from '@ui-frontend-service/sales/api-types';
import { writeFileSync } from 'fs';

function generateCountries(): UiSalesCountryModel[] {
  return [
    {
      id: 'AT',
      shortName: 'AT',
      longName: 'Österreich',
      euMember: true,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'DE',
      shortName: 'DE',
      longName: 'Deutschland',
      euMember: true,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'IT',
      shortName: 'IT',
      longName: 'Italien',
      euMember: true,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'SK',
      shortName: 'SK',
      longName: 'Slowakei',
      euMember: true,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'US',
      shortName: 'USA',
      longName: 'Vereinigte Staaten von Amerika',
      euMember: false,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'FR',
      shortName: 'FR',
      longName: 'Frankreich',
      euMember: true,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'UK',
      shortName: 'UK',
      longName: 'Großbritannien',
      euMember: false,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
  ];
}

function storeCountries(countries: UiSalesCountryModel[], path: string): UiSalesCountryModel[] {
  writeFileSync(path, JSON.stringify(countries, null, 2));
  return countries;
}

export function generateAndStoreCountries(folder: string, filename: string): UiSalesCountryModel[] {
  return storeCountries(generateCountries(), `${folder}/${filename}`);
}
