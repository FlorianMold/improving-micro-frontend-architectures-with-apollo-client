import { writeFileSync } from 'fs';
import { faker } from '@faker-js/faker/locale/de';
import { UiArticleUnitModel } from '@ui-frontend-service/sales/api-types';

function generateArticleUnits(): UiArticleUnitModel[] {
  return [
    {
      id: 'STK',
      nameShort: 'Stk',
      nameLong: 'Stück',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'M',
      nameShort: 'm',
      nameLong: 'Meter',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'KG',
      nameShort: 'kg',
      nameLong: 'Kilogramm',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
  ];
}

function storeArticleUnits(currencies: UiArticleUnitModel[], path: string): UiArticleUnitModel[] {
  writeFileSync(path, JSON.stringify(currencies, null, 2));
  return currencies;
}

export function generateAndStoreArticleUnits(folder: string, filename: string): UiArticleUnitModel[] {
  return storeArticleUnits(generateArticleUnits(), `${folder}/${filename}`);
}
