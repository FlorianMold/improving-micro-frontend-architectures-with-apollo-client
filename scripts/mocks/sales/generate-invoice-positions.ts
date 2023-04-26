import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import {
  UiArticleModel,
  UiContractModel,
  UiInvoiceModel,
  UiInvoicePositionModel,
  UiVatModel,
} from '@ui-frontend-service/sales/api-types';

type UiInvoicePositionHelpers = {
  articles: UiArticleModel[];
  contracts: UiContractModel[];
  invoices: UiInvoiceModel[];
  vats: UiVatModel[];
};

function generateInvoicesPositions(
  amount: number,
  { articles, contracts, invoices, vats }: UiInvoicePositionHelpers
): UiInvoicePositionModel[] {
  return Array.from({ length: amount }).map((_) => {
    const price = parseFloat(faker.commerce.price());

    return {
      id: faker.datatype.uuid(),
      articleNumber: faker.random.numeric(8),
      articleOrigin: faker.random.word(),
      articleSerial: faker.random.alphaNumeric(12),
      articleText: faker.commerce.product(),
      brut: price,
      cancellationInvoice: faker.datatype.number(),
      net: price * 0.8,
      paidDate: faker.date.past().valueOf(),
      paymentDeadline: faker.date.recent().valueOf(),
      position: faker.datatype.number(),
      remark: faker.lorem.sentence(),
      article_id: faker.helpers.arrayElement(articles).id,
      contract_id: faker.helpers.arrayElement(contracts).id,
      invoice_id: faker.helpers.arrayElement(invoices).id,
      vat_id: faker.helpers.arrayElement(vats).id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeInvoices(invoicePositions: UiInvoicePositionModel[], path: string): UiInvoicePositionModel[] {
  writeFileSync(path, JSON.stringify(invoicePositions, null, 2));
  return invoicePositions;
}

export function generateAndStoreInvoicePositions(
  amount: number,
  folder: string,
  filename: string,
  helperTypes: UiInvoicePositionHelpers
) {
  return storeInvoices(generateInvoicesPositions(amount, helperTypes), `${folder}/${filename}`);
}
