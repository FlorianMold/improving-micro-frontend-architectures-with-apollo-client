import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import { UiArticleModel, UiArticleUnitModel, UiClientModel } from '@ui-frontend-service/sales/api-types';

type UiArticleHelperTypes = { clients: UiClientModel[]; articleUnits: UiArticleUnitModel[] };

function generateArticles(amount: number, { clients, articleUnits }: UiArticleHelperTypes): UiArticleModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      descriptionInt: faker.commerce.productDescription(),
      articleUnit_id: faker.helpers.arrayElement(articleUnits).id,
      creatorClient_id: faker.helpers.arrayElement(clients).id,
      modifyClient_id: faker.helpers.arrayElement(clients).id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeArticles(articles: UiArticleModel[], path: string): UiArticleModel[] {
  writeFileSync(path, JSON.stringify(articles, null, 2));
  return articles;
}

export function generateAndStoreArticles(amount: number, folder: string, filename: string, helperTypes: UiArticleHelperTypes) {
  return storeArticles(generateArticles(amount, helperTypes), `${folder}/${filename}`);
}
