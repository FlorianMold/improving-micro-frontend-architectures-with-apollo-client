import { UiEmptyObject, uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UiAddressDetailByIdResponseModel,
  UiAddressesResponseModel,
  UiCreateAddressInputModel,
  UiCreateAddressResponseModel,
  UiUpdateAddressInputModel,
  UiUpdateAddressResponseModel,
} from '@ui-frontend-service/contact/api-types';

/**
 * The query for fetching all addresses.
 */
export const UI_ALL_ADDRESSES_QUERY = uiGql<UiAddressesResponseModel, UiEmptyObject>`
  query addresses {
    allAddresses {
      id
      streetName
      postalCode
      location
      Country {
        id
      }
    }
  }
`;

/**
 * The variables for the address-detail query.
 */
export type UiAddressByIdGQLVariables = {
  id: string;
};

/**
 * The query for fetching the address-details by id.
 */
export const UI_ADDRESS_BY_ID_QUERY = uiGql<UiAddressDetailByIdResponseModel, UiAddressByIdGQLVariables>`
  query addressById($id: ID!) {
    Address(id: $id) {
      id
      streetName
      postalCode
      location
      Country {
        id
      }
    }
  }
`;

/**
 * The variables for the create-address mutation.
 */
export type UiCreateAddressGQLVariables = {
  addressInput: UiCreateAddressInputModel;
};

/**
 * The variables for the update-address mutation.
 */
export type UiUpdateAddressGQLVariables = {
  addressInput: UiUpdateAddressInputModel;
};

/**
 * The mutation for creating a new address.
 */
export const UI_CREATE_ADDRESS_MUTATION = uiGql<UiCreateAddressResponseModel, UiCreateAddressGQLVariables>`
  mutation createAddress($addressInput: AddressInput) {
    createAddress(addressInput: $addressInput) {
      id
      streetName
      postalCode
      location
      Country {
        id
      }
    }
  }
`;

/**
 * The mutation for updating an existing address.
 */
export const UI_UPDATE_ADDRESS_MUTATION = uiGql<UiUpdateAddressResponseModel, UiUpdateAddressGQLVariables>`
  mutation updateAddress($addressInput: AddressInput) {
    updateAddress(addressInput: $addressInput) {
      id
      streetName
      postalCode
      location
      Country {
        id
      }
    }
  }
`;

/**
 * The variables for removing an address.
 */
export interface UiRemoveAddressDetailGQLVariables {
  id: string;
}

/**
 * The mutation for removing an address.
 */
export const UI_REMOVE_ADDRESS_MUTATION = uiGql<{ id: string }, UiRemoveAddressDetailGQLVariables>`
  mutation removeAddress($id: ID!) {
    removeAddress(id: $id) {
      id
    }
  }
`;
