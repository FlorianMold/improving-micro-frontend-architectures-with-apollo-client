import { mergeAndStoreData } from '../helper/merge-data';
import UI_ARTICLE_UNITS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/article-unit-mock.data.json';
import UI_ARTICLES_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/article-mock.data.json';
import UI_CLIENTS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/client-mock.data.json';
import UI_CREATOR_CLIENTS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/creator-client-mock.data.json';
import UI_MODIFY_CLIENTS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/modify-client-mock.data.json';
import UI_CONTRACTS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/contract-mock.data.json';
import UI_COUNTRIES_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/country-mock.data.json';
import UI_CURRENCIES_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/currency-mock.data.json';
import UI_CUSTOMERS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/customer-mock.data.json';
import UI_INVOICES_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/invoice-mock.data.json';
import UI_INVOICE_POSITIONS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/invoice-position-mock.data.json';
import UI_SENT_INVOICES_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/sent-invoice-mock.data.json';
import UI_INVOICE_TYPES_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/invoice-type-mock.data.json';
import UI_NOTES_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/note-mock.data.json';
import UI_PAYMENT_METHODS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/payment-method-mock.data.json';
import UI_VATS_MOCK_DATA from '../../../libs/sales/data-access/src/lib/mock-data/vat-mock.data.json';

const result = {
  articleUnits: UI_ARTICLE_UNITS_MOCK_DATA,
  articles: UI_ARTICLES_MOCK_DATA,
  clients: UI_CLIENTS_MOCK_DATA,
  creatorClients: UI_CREATOR_CLIENTS_MOCK_DATA,
  modifyClients: UI_MODIFY_CLIENTS_MOCK_DATA,
  contracts: UI_CONTRACTS_MOCK_DATA,
  salesCountries: UI_COUNTRIES_MOCK_DATA,
  currencies: UI_CURRENCIES_MOCK_DATA,
  customers: UI_CUSTOMERS_MOCK_DATA,
  invoices: UI_INVOICES_MOCK_DATA,
  invoicePositions: UI_INVOICE_POSITIONS_MOCK_DATA,
  invoiceTypes: UI_INVOICE_TYPES_MOCK_DATA,
  notes: UI_NOTES_MOCK_DATA,
  salesPaymentMethods: UI_PAYMENT_METHODS_MOCK_DATA,
  sentInvoices: UI_SENT_INVOICES_MOCK_DATA,
  vats: UI_VATS_MOCK_DATA,
};

const targetFolder = process.argv[2];

mergeAndStoreData(targetFolder, result);
