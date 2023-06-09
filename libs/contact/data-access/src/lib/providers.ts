import { UI_CONTACT_DATA_ACCESS_ADDRESS_PROVIDER } from './address';
import { UI_CONTACT_DATA_ACCESS_CONTACT_PROVIDER } from './contact';
import { UI_CONTACT_DATA_ACCESS_COUNTRY_PROVIDER } from './country';
import { UI_CONTACT_DATA_ACCESS_EMAIL_TYPE_PROVIDER } from './email-type';
import { UI_CONTACT_DATA_ACCESS_PERSON_PROVIDER } from './person';
import { UI_CONTACT_DATA_ACCESS_SALUTATION_PROVIDER } from './salutation';
import { UI_CONTACT_DATA_ACCESS_SUB_CONTACT_PROVIDER } from './sub-contact';
import { UI_CONTACT_DATA_ACCESS_TITLE_PROVIDER } from './title';
import { UI_CONTACT_DATA_ACCESS_DIRECT_DEBIT_PROVIDER } from './direct-debit';
import { UI_CONTACT_DATA_ACCESS_PAYPAL_ACCOUNT_PROVIDER } from './paypal-account';

/** Provides all services for accessing data for the contact-service. */
export const UI_CONTACT_DATA_ACCESS_SERVICE_PROVIDERS = [
  ...UI_CONTACT_DATA_ACCESS_CONTACT_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_ADDRESS_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_COUNTRY_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_EMAIL_TYPE_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_SALUTATION_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_TITLE_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_PERSON_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_SUB_CONTACT_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_DIRECT_DEBIT_PROVIDER,
  ...UI_CONTACT_DATA_ACCESS_PAYPAL_ACCOUNT_PROVIDER,
];
