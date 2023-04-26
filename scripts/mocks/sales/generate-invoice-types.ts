import { faker } from '@faker-js/faker/locale/de';
import { UiInvoiceTypeModel } from '@ui-frontend-service/sales/api-types';
import { writeFileSync } from 'fs';

function generateInvoiceTypes(): UiInvoiceTypeModel[] {
  return [
    {
      id: 'STANDARD',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'RECURRING',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'CREDIT',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
    {
      id: 'DEBIT',
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    },
  ];
}

function storeInvoiceTypes(invoiceTypes: UiInvoiceTypeModel[], path: string): UiInvoiceTypeModel[] {
  writeFileSync(path, JSON.stringify(invoiceTypes, null, 2));
  return invoiceTypes;
}

export function generateAndStoreInvoiceTypes(folder: string, filename: string): UiInvoiceTypeModel[] {
  return storeInvoiceTypes(generateInvoiceTypes(), `${folder}/${filename}`);
}
