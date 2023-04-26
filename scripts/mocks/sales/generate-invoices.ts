import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import {
  UiCustomerModel,
  UiInvoiceModel,
  UiInvoiceTypeModel,
  UiClientRefModel,
  UiSalesPaymentMethodModel,
} from '@ui-frontend-service/sales/api-types';

type UiInvoiceHelperTypes = {
  invoiceTypes: UiInvoiceTypeModel[];
  paymentMethods: UiSalesPaymentMethodModel[];
  creatorClients: UiClientRefModel[];
  modifyClients: UiClientRefModel[];
  customers: UiCustomerModel[];
};

function generateInvoices(
  amount: number,
  { invoiceTypes, paymentMethods, creatorClients, modifyClients, customers }: UiInvoiceHelperTypes
): UiInvoiceModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.datatype.uuid(),
      number: faker.random.numeric(8),
      creatorClient_id: faker.helpers.arrayElement(creatorClients).id,
      modifyClient_id: faker.helpers.arrayElement(modifyClients).id,
      customer_id: faker.helpers.arrayElement(customers).id,
      invoiceType_id: faker.helpers.arrayElement(invoiceTypes).id,
      sales_payment_method_id: faker.helpers.arrayElement(paymentMethods).id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeInvoices(invoices: UiInvoiceModel[], path: string): UiInvoiceModel[] {
  writeFileSync(path, JSON.stringify(invoices, null, 2));
  return invoices;
}

export function generateAndStoreInvoices(amount: number, folder: string, filename: string, helperTypes: UiInvoiceHelperTypes) {
  return storeInvoices(generateInvoices(amount, helperTypes), `${folder}/${filename}`);
}
