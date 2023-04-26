import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import { UiInvoiceModel, UiInvoiceSentModel } from '@ui-frontend-service/sales/api-types';

type UiInvoicesSentHelperTypes = { invoices: UiInvoiceModel[] };

function generateSentInvoices(amount: number, { invoices }: UiInvoicesSentHelperTypes): UiInvoiceSentModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      uid: parseInt(faker.random.numeric(12)),
      invoice_id: faker.helpers.arrayElement(invoices).id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeSentInvoices(articles: UiInvoiceSentModel[], path: string): UiInvoiceSentModel[] {
  writeFileSync(path, JSON.stringify(articles, null, 2));
  return articles;
}

export function generateAndStoreSentInvoices(
  amount: number,
  folder: string,
  filename: string,
  helperTypes: UiInvoicesSentHelperTypes
) {
  return storeSentInvoices(generateSentInvoices(amount, helperTypes), `${folder}/${filename}`);
}
