import { UiPageFilter } from './pagination';
import { UiContactBaseModel, UiContactMutationResponse, UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of a contact.
 *
 * Primarily used for mock-data generation. Don't use it for graphql-responses.
 */
export interface UiContactModel extends UiContactBaseModel {
  id: string;
  customerNumber: number;
  name: string;
  name2: string | null;
  firstName: string | null;
  secondName: string | null;
  uidNumber: string;
  valueAddedTax: string;
  paymentDeadline: number | null;
  creditor: string | null;
  dataFolder: string | null;
  comment: string | null;
  isCustomer: boolean;
  isSupplier: boolean;
  isEmployee: boolean;
  billByEmail: boolean;
  bankWithdrawal: boolean;
  newsletter: boolean;
  dunning: boolean;
  state: number;
  title_id: string;
  address_id: string;
  salutation_id: string;
}

/**
 * The model for the contacts inside the contact-table.
 */
export interface UiAllContactsTablePagedModel {
  id: string;
  customerNumber: number;
  name: string;
  name2: string | null;
  firstName: string | null;
  secondName: string | null;
  uidNumber: string;
  isCustomer: boolean;
  isSupplier: boolean;
  isEmployee: boolean;

  Address: {
    id: string;
    postalCode: string;
    location: string;
    Country: {
      id: string;
    } | null;
  } | null;

  /** Local-only field. Whether the contact-detail is open. */
  isOpen: boolean;
}

/**
 * The response-model for the paged contact-table-query.
 */
export interface UiAllContactsTablePagedResponseModel extends UiContactQueryResponse {
  allContacts: UiAllContactsTablePagedModel[];
}

export interface UiAllContactsSubsetModel {
  id: string;
  customerNumber: number;
  firstName: string | null;
  secondName: string | null;
  uidNumber: string;
}

/**
 * The response-model for the paged contact-table-query.
 */
export interface UiAllContactsSubsetResponseModel extends UiContactQueryResponse {
  allContacts: UiAllContactsSubsetModel[];
}

/**
 * The response-model for the contact-detail query.
 */
export interface UiContactDetailModel extends UiContactBaseModel {
  id: string;
  customerNumber: number;
  name: string;
  name2: string | null;
  firstName: string | null;
  secondName: string | null;
  uidNumber: string;
  valueAddedTax: string;
  paymentDeadline: number | null;
  isCustomer: boolean;
  isSupplier: boolean;
  isEmployee: boolean;
  billByEmail: boolean;
  bankWithdrawal: boolean;
  newsletter: boolean;
  dunning: boolean;
  creditor: string | null;
  dataFolder: string | null;
  comment: string | null;
  state: number | null;

  Salutation: {
    id: string;
  } | null;

  Title: {
    id: string;
  } | null;

  PaymentMethods:
    | {
        id: string;
        isDefault: boolean;
        email: string;
        bankName: string;
        bankCode: string;
        bic: string;
        iban: string;
        accountHolder: string;
      }[]
    | null;

  Address: {
    id: string;
    streetName: string | null;
    postalCode: string | null;
    location: string | null;
    Country: {
      id: string;
    } | null;
  } | null;

  SubContacts:
    | {
        email: string;
        Person: {
          firstName: string;
          lastName: string;
          phone: string;
          mobile: string;
          fax: string;
          function: string;
        } | null;
      }[]
    | null;

  /** Local-only field. Whether the contact-detail is open. */
  isOpen: boolean;
}

/**
 * The response-model for the create-contact mutation.
 */
export interface UiCreateContactDetailResponseModel extends UiContactMutationResponse {
  createContact?: UiContactDetailModel;
}

/**
 * The response-model for the update-contact mutation.
 */
export interface UiUpdateContactDetailResponseModel extends UiContactMutationResponse {
  updateContact?: UiContactDetailModel;
}

/**
 * The response-model for the contact-detail query.
 */
export interface UiContactDetailByIdResponseModel extends UiContactQueryResponse {
  Contact: UiContactDetailModel;
}

/**
 * The response-model for the contact-title aggregated query.
 */
export interface UiContactTitlesModel extends UiContactBaseModel {
  id: string;

  Title: {
    id: string;
  };
}

/**
 * The response-model for the contact-country aggregated query.
 */
export interface UiContactCountriesModel extends UiContactBaseModel {
  id: string;

  Title: {
    id: string;
  };
}

/**
 * The response-model for the contact-detail query.
 */
export interface UiContactTitlesCountAggregatedResponseModel {
  titleCount: {
    [title: string]: number;
  };
}

/**
 * The response-model for the contact-detail query.
 */
export interface UiContactCountriesCountAggregatedResponseModel {
  countryCount: {
    [title: string]: number;
  };
}

/**
 * The response-model for the aggregated title-count query.
 */
export interface UiContactTitlesCountResponseModel extends UiContactQueryResponse {
  allContacts: UiContactTitlesModel;
}

/**
 * The response-model for the aggregated country-count query.
 */
export interface UiContactCountriesCountResponseModel extends UiContactQueryResponse {
  allContacts: UiContactCountriesModel;
}

/**
 * The response-model for the meta-data information of the query.
 */
export interface UiContactsMetaResponseModel extends UiContactQueryResponse {
  _allContactsMeta: { count: number };
}

/**
 * The response-model for the remove contact-response model.
 */
export interface UiContactRemoveByIdResponseModel extends UiContactMutationResponse {
  removeContact?: { id: string };
}

/**
 * The fields, which can be filtered on the contact-table.
 */
export type UiContactTablePageQueryFilter = {
  customerNumber?: string | null;
  firstName?: string | null;
  secondName?: string | null;
  uidNumber?: string | null;
};

/**
 * The page-filter for the contact-table.
 */
export type UiContactTablePageFilter = UiPageFilter<UiContactTablePageQueryFilter>;
