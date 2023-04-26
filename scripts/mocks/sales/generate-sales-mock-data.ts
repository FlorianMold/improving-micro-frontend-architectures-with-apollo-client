import { generateAndStoreArticleUnits } from './generate-article-units';
import { generateAndStoreCountries } from './generate-countries';
import { generateAndStoreCurrencies } from './generate-currencies';
import { generateAndStorePaymentMethods } from './generate-payment-methods';
import { writeFileSync } from 'fs';
import { generateAndStoreClients } from './generate-clients';
import { generateAndStoreVats } from './generate-vats';
import { generateAndStoreInvoiceTypes } from './generate-invoice-types';
import { generateAndStoreCustomers } from './generate-customers';
import { generateAndStoreArticles } from './generate-articles';
import { generateAndStoreContracts } from './generate-contracts';
import { generateAndStoreInvoices } from './generate-invoices';
import { generateAndStoreInvoicePositions } from './generate-invoice-positions';
import { generateAndStoreNotes } from './generate-notes';
import { generateAndStoreSentInvoices } from './generate-sent-invoices';
import { generateAndStoreClientReferences } from './generate-client-references';

const mockedDataAmount = +process.argv[2];
const folder = process.argv[3];

const articleUnits = generateAndStoreArticleUnits(folder, 'article-unit-mock.data.json');
const countries = generateAndStoreCountries(folder, 'country-mock.data.json');
const currencies = generateAndStoreCurrencies(folder, 'currency-mock.data.json');
const paymentMethods = generateAndStorePaymentMethods(folder, 'payment-method-mock.data.json');
const vats = generateAndStoreVats(mockedDataAmount, folder, 'vat-mock.data.json');
const invoiceTypes = generateAndStoreInvoiceTypes(folder, 'invoice-type-mock.data.json');
const clients = generateAndStoreClients(mockedDataAmount, folder, 'client-mock.data.json');
const creatorClients = generateAndStoreClientReferences(folder, 'creator-client-mock.data.json', {
  clients: clients,
});
const modifyClients = generateAndStoreClientReferences(folder, 'modify-client-mock.data.json', {
  clients: clients,
});
const customers = generateAndStoreCustomers(mockedDataAmount, folder, 'customer-mock.data.json', { countries: countries });
const articles = generateAndStoreArticles(mockedDataAmount, folder, 'article-mock.data.json', {
  clients: clients,
  articleUnits: articleUnits,
});
const contracts = generateAndStoreContracts(mockedDataAmount, folder, 'contract-mock.data.json', {
  clients: clients,
  customers: customers,
});
const invoices = generateAndStoreInvoices(mockedDataAmount, folder, 'invoice-mock.data.json', {
  creatorClients: creatorClients,
  modifyClients: modifyClients,
  paymentMethods: paymentMethods,
  invoiceTypes: invoiceTypes,
  customers: customers,
});
const invoicePositions = generateAndStoreInvoicePositions(mockedDataAmount, folder, 'invoice-position-mock.data.json', {
  invoices: invoices,
  vats: vats,
  contracts: contracts,
  articles: articles,
});
const notes = generateAndStoreNotes(mockedDataAmount, folder, 'note-mock.data.json', { invoices: invoices });
const sentInvoices = generateAndStoreSentInvoices(mockedDataAmount, folder, 'sent-invoice-mock.data.json', {
  invoices: invoices,
});

console.log('Successfully generated mock-data for sales.');

const MOCK_DATA = {
  articleUnits,
  salesCountries: countries,
  currencies,
  salesPaymentMethods: paymentMethods,
  vats,
  clients,
  creatorClients,
  modifyClients,
  customers,
  articles,
  contracts,
  invoices,
  invoicePositions,
  invoiceTypes,
  sentInvoices,
  notes,
};

writeFileSync('mock-data/sales-mock-data.json', JSON.stringify(MOCK_DATA, null, 2));
