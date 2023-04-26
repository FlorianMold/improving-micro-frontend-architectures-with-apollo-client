import { InjectionToken } from '@angular/core';
import UI_ARTICLE_UNITS_MOCK_DATA from './article-unit-mock.data.json';
import UI_ARTICLES_MOCK_DATA from './article-mock.data.json';
import UI_CLIENTS_MOCK_DATA from './client-mock.data.json';
import UI_CONTRACTS_MOCK_DATA from './contract-mock.data.json';
import UI_COUNTRIES_MOCK_DATA from './country-mock.data.json';
import UI_CURRENCIES_MOCK_DATA from './currency-mock.data.json';
import UI_CUSTOMERS_MOCK_DATA from './customer-mock.data.json';
import UI_INVOICES_MOCK_DATA from './invoice-mock.data.json';
import UI_INVOICE_POSITIONS_MOCK_DATA from './invoice-position-mock.data.json';
import UI_INVOICES_SENT_MOCK_DATA from './invoice-sent-mock.data.json';
import UI_INVOICE_TYPES_MOCK_DATA from './invoice-type-mock.data.json';
import UI_NOTES_MOCK_DATA from './note-mock.data.json';
import UI_PAYMENT_METHODS_MOCK_DATA from './payment-method-mock.data.json';
import UI_VATS_MOCK_DATA from './vat-mock.data.json';

import {
  UiArticleModel,
  UiArticleUnitModel,
  UiClientModel,
  UiContractModel,
  UiCurrencyModel,
  UiCustomerModel,
  UiInvoicePositionModel,
  UiInvoiceSentModel,
  UiInvoiceTypeModel,
  UiNoteModel,
  UiSalesCountryModel,
  UiSalesPaymentMethodModel,
  UiVatModel,
} from '@ui-frontend-service/sales/api-types';

/** The mocked data of the sales-service. */
export interface UiSalesMockData {
  articleUnits: UiArticleUnitModel[];
  articles: UiArticleModel[];
  clients: UiClientModel[];
  contracts: UiContractModel[];
  countries: UiSalesCountryModel[];
  currencies: UiCurrencyModel[];
  customers: UiCustomerModel[];
  invoicePositions: UiInvoicePositionModel[];
  invoiceTypes: UiInvoiceTypeModel[];
  invoices: UiInvoiceTypeModel[];
  notes: UiNoteModel[];
  paymentMethods: UiSalesPaymentMethodModel[];
  sentInvoices: UiInvoiceSentModel[];
  vats: UiVatModel[];
}

/** Injection token that can be used to inject mock-data. */
export const UI_SALES_MOCK_DATA_TOKEN = new InjectionToken<UiSalesMockData>('UI_SALES_MOCK_DATA');

export const mockData: UiSalesMockData = {
  articleUnits: UI_ARTICLE_UNITS_MOCK_DATA,
  articles: UI_ARTICLES_MOCK_DATA,
  clients: UI_CLIENTS_MOCK_DATA,
  contracts: UI_CONTRACTS_MOCK_DATA,
  countries: UI_COUNTRIES_MOCK_DATA,
  currencies: UI_CURRENCIES_MOCK_DATA,
  customers: UI_CUSTOMERS_MOCK_DATA,
  invoices: UI_INVOICES_MOCK_DATA,
  invoicePositions: UI_INVOICE_POSITIONS_MOCK_DATA,
  invoiceTypes: UI_INVOICE_TYPES_MOCK_DATA,
  notes: UI_NOTES_MOCK_DATA,
  paymentMethods: UI_PAYMENT_METHODS_MOCK_DATA,
  sentInvoices: UI_INVOICES_SENT_MOCK_DATA,
  vats: UI_VATS_MOCK_DATA,
};

/** Provider that provides the sales mock-data. */
export const UI_SALES_MOCK_DATA_PROVIDER = {
  provide: UI_SALES_MOCK_DATA_TOKEN,
  useValue: mockData,
};
