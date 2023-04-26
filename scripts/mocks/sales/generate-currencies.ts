import { writeFileSync } from 'fs';
import { faker } from '@faker-js/faker/locale/de';
import { UiCurrencyModel } from '@ui-frontend-service/sales/api-types';

function generateCurrencies(): UiCurrencyModel[] {
  return [
    {
      id: 'EUR',
      shortName: 'Euro',
      longName: 'Euro',
      country_id: 'AT',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'USD',
      shortName: 'USD',
      longName: 'US Dollar',
      country_id: 'US',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'GBP',
      shortName: 'GBP',
      longName: 'Britischer Pfund',
      country_id: 'UK',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
  ];
}

function storeCurrencies(currencies: UiCurrencyModel[], path: string): UiCurrencyModel[] {
  writeFileSync(path, JSON.stringify(currencies, null, 2));
  return currencies;
}

export function generateAndStoreCurrencies(folder: string, filename: string): UiCurrencyModel[] {
  return storeCurrencies(generateCurrencies(), `${folder}/${filename}`);
}
