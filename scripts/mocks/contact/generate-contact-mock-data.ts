import { generateAndStoreContacts } from './generate-contacts';
import { generateAndStoreAddresses } from './generate-addresses';
import { generateAndStoreSalutations } from './generate-salutations';
import { generateAndStoreTitles } from './generate-titles';
import { generateAndStoreSubContacts } from './generate-sub-contacts';
import { generateAndStoreEmailTypes } from './generate-email-types';
import { generateAndStorePersons } from './generate-persons';
import { generateAndStoreCountries } from './generate-countries';
import { generateAndStoreDirectDebits } from './generate-direct-debits';
import { generateAndStorePaypalAccounts } from './generate-paypal-accounts';
import { writeFileSync } from 'fs';
import { generateAndStorePaymentMethods } from './generate-payment-methods';

const mockedDataAmount = +process.argv[2];
const folder = process.argv[3];

const salutations = generateAndStoreSalutations(folder, 'salutation-mock.data.json');
const titles = generateAndStoreTitles(folder, 'title-mock.data.json');
const countries = generateAndStoreCountries(mockedDataAmount, folder, 'country-mock.data.json');
const addresses = generateAndStoreAddresses(mockedDataAmount, folder, 'address-mock.data.json', {
  countries,
});
const contacts = generateAndStoreContacts(mockedDataAmount, folder, 'contact-mock.data.json', {
  titles,
  salutations,
  addresses,
});
const emailTypes = generateAndStoreEmailTypes(folder, 'email-type-mock.data.json');
const people = generateAndStorePersons(mockedDataAmount, folder, 'people-mock.data.json');
const subContacts = generateAndStoreSubContacts(mockedDataAmount, folder, 'sub-contact-mock.data.json', {
  contacts,
  emailTypes,
  people,
});
const directDebits = generateAndStoreDirectDebits(mockedDataAmount, folder, 'direct-debit-mock.data.json', {
  contacts,
});
const paypalAccounts = generateAndStorePaypalAccounts(mockedDataAmount, folder, 'paypal-account-mock.data.json', {
  contacts,
});
const paymentMethods = generateAndStorePaymentMethods(mockedDataAmount, folder, 'payment-method-mock.data.json', {
  directDebits,
  paypalAccounts,
  contacts,
});

console.log('Successfully generated mock-data for contact.');

const MOCK_DATA = {
  salutations,
  titles,
  countries,
  addresses,
  contacts,
  emailTypes,
  subContacts,
  people,
  directDebits,
  paypalAccounts,
  paymentMethods,
};

writeFileSync('mock-data/contact-mock-data.json', JSON.stringify(MOCK_DATA, null, 2));
