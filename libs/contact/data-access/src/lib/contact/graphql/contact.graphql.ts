import {
  UiAllContactsSubsetResponseModel,
  UiAllContactsTablePagedResponseModel,
  UiContactCountriesCountResponseModel,
  UiContactDetailByIdResponseModel,
  UiContactDetailModel,
  UiContactsMetaResponseModel,
  UiContactTablePageFilter,
  UiContactTitlesCountResponseModel,
  UiCreateContactDetailResponseModel,
  UiUpdateContactDetailResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The query for fetching the paginated contacts for the contacts-table.
 */
export const UI_ALL_CONTACTS_TABLE_PAGED_QUERY = uiGql<UiAllContactsTablePagedResponseModel, UiContactTablePageFilter>`
  query allContacts($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: ContactFilter) {
    allContacts(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      customerNumber
      name
      name2
      firstName
      secondName
      uidNumber
      isCustomer
      isSupplier
      isEmployee
      isOpen @client
      Address {
        id
        postalCode
        location
        Country {
          id
        }
      }
    }
  }
`;

export const UI_ALL_CONTACTS_SUBSET_QUERY = uiGql<UiAllContactsSubsetResponseModel, UiContactTablePageFilter>`
  query allContactsSubset($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: ContactFilter) {
    allContacts(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      customerNumber
      firstName
      secondName
      uidNumber
    }
  }
`;

/**
 * Loads the meta-data of the contacts-table.
 * This contains the total count of the contacts.
 */
export const UI_ALL_CONTACTS_META_QUERY = uiGql<UiContactsMetaResponseModel, UiContactTablePageFilter>`
  query _allContactsMeta($page: Int, $perPage: Int) {
    _allContactsMeta(page: $page, perPage: $perPage) {
      count
    }
  }
`;

/**
 * The variables for fetching a contact by id.
 */
export interface UiContactByIdGQLVariables {
  /** The id of the contact to fetch. */
  id: string;
}

/**
 * The query for fetching the contact-details by id.
 */
export const UI_CONTACT_DETAIL_BY_ID_QUERY = uiGql<UiContactDetailByIdResponseModel, UiContactByIdGQLVariables>`
  query Contact($id: ID!) {
    Contact(id: $id) {
      id
      customerNumber
      name
      name2
      firstName
      secondName
      uidNumber
      valueAddedTax
      paymentDeadline
      isCustomer
      isSupplier
      isEmployee
      billByEmail
      bankWithdrawal
      newsletter
      dunning
      dataFolder
      creditor
      comment
      Salutation {
        id
      }
      Title {
        id
      }
      PaymentMethods {
        id
        isDefault
        email
        bankName
        bankCode
        bic
        iban
        accountHolder
      }
      Address {
        id
        streetName
        postalCode
        location
        Country {
          id
        }
      }
      SubContacts {
        id
        email
        Person {
          id
          firstName
          lastName
          phone
          mobile
          fax
          function
        }
      }
    }
  }
`;

/**
 * The variables for the create-contact-detail mutation.
 */
export type UiCreateContactDetailGQLVariables = UiContactDetailModel;

/**
 * The mutation for updating a contact.
 */
export const UI_UPDATE_CONTACT_DETAIL_MUTATION = uiGql<UiUpdateContactDetailResponseModel, UiUpdateContactDetailGQLVariables>`
  mutation updateContact(
    $id: ID!,
    $comment: String,
    $bankWithdrawal: Boolean,
    $billByEmail: Boolean,
    $customerNumber: Int,
    $dataFolder: String,
    $dunning: Boolean,
    $firstName: String,
    $secondName: String,
    $isCustomer: Boolean,
    $isEmployee: Boolean,
    $isSupplier: Boolean,
    $name: String,
    $name2: String,
    $newsletter: Boolean,
    $paymentDeadline: Int,
    $salutation: ID,
    $state: Int,
    $title: ID,
    $address_id: ID,
    $uidNumber: String,
    $valueAddedTax: String,
    $creditor: String,
    $createdAt: Int,
    $changedAt: Int,
    $deletedAt: String,
  ) {
  updateContact(
    id: $id,
    comment: $comment,
    bankWithdrawal: $bankWithdrawal,
    billByEmail: $billByEmail,
    customerNumber: $customerNumber,
    dataFolder: $dataFolder,
    dunning: $dunning,
    firstName: $firstName,
    secondName: $secondName,
    isCustomer: $isCustomer,
    isEmployee: $isEmployee,
    isSupplier: $isSupplier,
    name: $name,
    name2: $name2,
    newsletter: $newsletter,
    paymentDeadline: $paymentDeadline,
    salutation_id: $salutation,
    state: $state,
    title_id: $title,
    address_id: $address_id,
    uidNumber: $uidNumber,
    valueAddedTax: $valueAddedTax,
    creditor: $creditor,
    createdAt: $createdAt,
    changedAt: $changedAt,
    deletedAt: $deletedAt,
    ) {
      id
      customerNumber
      name
      name2
      firstName
      secondName
      uidNumber
      valueAddedTax
      paymentDeadline
      isCustomer
      isSupplier
      isEmployee
      billByEmail
      bankWithdrawal
      newsletter
      dunning
      dataFolder
      creditor
      comment
      Salutation {
        id
      }
      Title {
        id
      }
      PaymentMethods {
        id
        isDefault
        email
        bankName
        bankCode
        bic
        iban
        accountHolder
      }
      Address {
        id
        streetName
        postalCode
        location
        Country {
          id
        }
      }
      SubContacts {
        id
        email
        Person {
          id
          firstName
          lastName
          phone
          mobile
          fax
          function
        }
      }
    }
  }
`;

/**
 * The variables for the update-contact-detail mutation.
 */
export type UiUpdateContactDetailGQLVariables = UiContactDetailModel;

/**
 * The mutation for creating a new contact.
 */
export const UI_CREATE_CONTACT_DETAIL_MUTATION = uiGql<UiCreateContactDetailResponseModel, UiCreateContactDetailGQLVariables>`
  mutation createContact(
    $comment: String!,
    $bankWithdrawal: Boolean!,
    $billByEmail: Boolean!,
    $customerNumber: Int!,
    $dataFolder: String!,
    $dunning: Boolean!,
    $firstName: String!,
    $secondName: String!,
    $isCustomer: Boolean!,
    $isEmployee: Boolean!,
    $isSupplier: Boolean!,
    $name: String!,
    $name2: String!,
    $newsletter: Boolean!,
    $paymentDeadline: Int!,
    $salutation: ID!,
    $state: Int!,
    $title: ID!,
    $address_id: ID!,
    $uidNumber: String!,
    $valueAddedTax: String!,
    $creditor: String!,
    $changedAt: Int!,
    $createdAt: Int!,
    $deletedAt: String,
  ) {
    createContact(
      comment: $comment,
      bankWithdrawal: $bankWithdrawal,
      billByEmail: $billByEmail,
      customerNumber: $customerNumber,
      dataFolder: $dataFolder,
      dunning: $dunning,
      firstName: $firstName,
      secondName: $secondName,
      isCustomer: $isCustomer,
      isEmployee: $isEmployee,
      isSupplier: $isSupplier,
      name: $name,
      name2: $name2,
      newsletter: $newsletter,
      paymentDeadline: $paymentDeadline,
      salutation_id: $salutation,
      state: $state,
      title_id: $title,
      address_id: $address_id,
      uidNumber: $uidNumber,
      valueAddedTax: $valueAddedTax,
      creditor: $creditor,
      changedAt: $changedAt,
      createdAt: $createdAt,
      deletedAt: $deletedAt,
    ) {
      id
      comment
      customerNumber
      name
      name2
      firstName
      secondName
      uidNumber
      valueAddedTax
      paymentDeadline
      isCustomer
      isSupplier
      isEmployee
      billByEmail
      bankWithdrawal
      newsletter
      dunning
      dataFolder
      creditor
      comment
      Salutation {
        id
      }
      Title {
        id
      }
      PaymentMethods {
        id
        isDefault
        email
        bankName
        bankCode
        bic
        iban
        accountHolder
      }
      Address {
        id
        streetName
        postalCode
        location
        Country {
          id
        }
      }
      SubContacts {
        id
        email
        Person {
          id
          firstName
          lastName
          phone
          mobile
          fax
          function
        }
      }
    }
  }
`;

/**
 * The variables for removing a contact.
 */
export interface UiRemoveContactDetailGQLVariables {
  id: string;
}

/**
 * The mutation for removing a contact.
 */
export const UI_REMOVE_CONTACT_MUTATION = uiGql<{ id: string }, UiRemoveContactDetailGQLVariables>`
  mutation removeContact($id: ID!) {
    removeContact(id: $id) {
      id
    }
  }
`;

/**
 * The query for fetching the contact-title count.
 */
export const UI_CONTACT_TITLES_COUNT_QUERY = uiGql<UiContactTitlesCountResponseModel, UiEmptyObject>`
  query contactTitlesAggregated {
    allContacts {
      id
      Title {
        id
      }
    }
  }
`;

/**
 * The query for fetching the contact-country count.
 */
export const UI_CONTACT_COUNTRIES_COUNT_QUERY = uiGql<UiContactCountriesCountResponseModel, UiEmptyObject>`
  query contactCountriesAggregated {
    allContacts {
      id
      Address {
        id
        streetName
        postalCode
        location
        Country {
          id
        }
      }
    }
  }
`;
