import { InjectionToken } from '@angular/core';
import UI_ADDRESSES_MOCK_DATA from './address-mock.data.json';
import UI_CONTACTS_MOCK_DATA from './contact-mock.data.json';
import UI_COUNTRIES_MOCK_DATA from './country-mock.data.json';
import UI_DIRECT_DEBITS_MOCK_DATA from './direct-debit-mock.data.json';
import UI_EMAIL_TYPES_MOCK_DATA from './email-type-mock.data.json';
import UI_PAYPAL_ACCOUNTS_MOCK_DATA from './paypal-account-mock.data.json';
import UI_PERSONS_MOCK_DATA from './people-mock.data.json';
import UI_SALUTATIONS_MOCK_DATA from './salutation-mock.data.json';
import UI_SUB_CONTACTS_MOCK_DATA from './sub-contact-mock.data.json';
import UI_TITLES_MOCK_DATA from './title-mock.data.json';
import {
  UiAddressModel,
  UiContactModel,
  UiCountryModel,
  UiDirectDebitModel,
  UiEmailTypeModel,
  UiPayPalAccountModel,
  UiPersonModel,
  UiSalutationModel,
  UiSubContactModel,
  UiTitleModel,
} from '@ui-frontend-service/contact/api-types';

/** The mocked data of the contact-service. */
export interface UiContactMockData {
  contacts: UiContactModel[];
  addresses: UiAddressModel[];
  countries: UiCountryModel[];
  directDebits: UiDirectDebitModel[];
  emailTypes: UiEmailTypeModel[];
  paypalAccounts: UiPayPalAccountModel[];
  people: UiPersonModel[];
  salutations: UiSalutationModel[];
  subContacts: UiSubContactModel[];
  titles: UiTitleModel[];
}

/** Injection token that can be used to inject mock-data. */
export const UI_CONTACT_MOCK_DATA_TOKEN = new InjectionToken<UiContactMockData>('UI_CONTACT_MOCK_DATA');

export const mockData: UiContactMockData = {
  addresses: UI_ADDRESSES_MOCK_DATA,
  contacts: UI_CONTACTS_MOCK_DATA,
  countries: UI_COUNTRIES_MOCK_DATA,
  directDebits: UI_DIRECT_DEBITS_MOCK_DATA,
  emailTypes: UI_EMAIL_TYPES_MOCK_DATA,
  paypalAccounts: UI_PAYPAL_ACCOUNTS_MOCK_DATA,
  people: UI_PERSONS_MOCK_DATA,
  salutations: UI_SALUTATIONS_MOCK_DATA,
  subContacts: UI_SUB_CONTACTS_MOCK_DATA,
  titles: UI_TITLES_MOCK_DATA,
};

/** Provider that provides the contact mock-data. */
export const UI_CONTACT_MOCK_DATA_PROVIDER = {
  provide: UI_CONTACT_MOCK_DATA_TOKEN,
  useValue: mockData,
};
