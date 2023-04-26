import { mergeAndStoreData } from '../helper/merge-data';
import UI_ADDRESSES_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/address-mock.data.json';
import UI_CONTACTS_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/contact-mock.data.json';
import UI_COUNTRIES_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/country-mock.data.json';
import UI_DIRECT_DEBITS_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/direct-debit-mock.data.json';
import UI_EMAIL_TYPES_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/email-type-mock.data.json';
import UI_PAYPAL_ACCOUNTS_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/paypal-account-mock.data.json';
import UI_PERSONS_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/people-mock.data.json';
import UI_SALUTATIONS_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/salutation-mock.data.json';
import UI_SUB_CONTACTS_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/sub-contact-mock.data.json';
import UI_TITLES_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/title-mock.data.json';
import UI_PAYMENT_METHODS from '../../../libs/contact/data-access/src/lib/mock-data/payment-method-mock.data.json';
// import UI_CONTACT_PAYMENT_METHODS from '../../../libs/contact/data-access/src/lib/mock-data/contact-payment-method-mock.data.json';

const result = {
  addresses: UI_ADDRESSES_MOCK_DATA,
  contacts: UI_CONTACTS_MOCK_DATA,
  contactCountries: UI_COUNTRIES_MOCK_DATA,
  directDebits: UI_DIRECT_DEBITS_MOCK_DATA,
  emailTypes: UI_EMAIL_TYPES_MOCK_DATA,
  paypalAccounts: UI_PAYPAL_ACCOUNTS_MOCK_DATA,
  persons: UI_PERSONS_MOCK_DATA,
  salutations: UI_SALUTATIONS_MOCK_DATA,
  subContacts: UI_SUB_CONTACTS_MOCK_DATA,
  titles: UI_TITLES_MOCK_DATA,
  paymentMethods: UI_PAYMENT_METHODS,
  // contactPaymentMethods: UI_CONTACT_PAYMENT_METHODS,
};

const targetFolder = process.argv[2];

mergeAndStoreData(targetFolder, result);
