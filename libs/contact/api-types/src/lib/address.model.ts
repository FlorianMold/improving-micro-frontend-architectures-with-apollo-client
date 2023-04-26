import { UiContactBaseModel, UiContactMutationResponse, UiContactQueryResponse } from './base.model';

/**
 * The model for specifying all properties of an addresses.
 *
 * Primarily used for mock-data generation. Don't use if for graphql-responses.
 */
export interface UiAddressModel extends UiContactBaseModel {
  id: string;
  streetName: string;
  postalCode: string;
  location: string;
  country_id: string;
}

/**
 * The model for loading all contacts.
 */
export interface UiAllAddressesModel {
  id: string;
  streetName: string;
  postalCode: string;
  location: string;
  Country: {
    id: string;
  };
}

/**
 * The response-model for all addresses query.
 */
export interface UiAddressesResponseModel extends UiContactQueryResponse {
  allAddresses: UiAllAddressesModel[];
}

/**
 * The model for the address-detail query.
 */
export interface UiAddressByIdDetailModel {
  id: string;
  streetName: string;
  postalCode: string;
  location: string;
  Country: {
    id: string;
  };
}

/**
 * The response-model for the address-detail query.
 */
export interface UiAddressDetailByIdResponseModel extends UiContactQueryResponse {
  Address: UiAddressByIdDetailModel;
}

/**
 * The input-model for the create-address mutation.
 */
export interface UiCreateAddressInputModel {
  streetName: string;
  postalCode: string;
  location: string;
  country_id: string;
}

/**
 * The input-model for the update-address mutation.
 */
export interface UiUpdateAddressInputModel extends UiCreateAddressInputModel {
  id: string;
}

/**
 * The model for complete address objects.
 */
export interface UiAddressDetailModel {
  id: string;
  streetName: string;
  postalCode: string;
  location: string;
  Country: {
    id: string;
  };
}

/**
 * The response-model for the create-address mutation.
 */
export interface UiCreateAddressResponseModel extends UiContactMutationResponse {
  createAddress?: UiAddressDetailModel;
}

/**
 * The response-model for the update-address mutation.
 */
export interface UiUpdateAddressResponseModel extends UiContactMutationResponse {
  updateAddress?: UiAddressDetailModel;
}

/**
 * The response-model for the remove contact-response model.
 */
export interface UiAddressRemoveByIdResponseModel extends UiContactMutationResponse {
  removeAddress?: { id: string };
}
