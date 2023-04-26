import { UiBaseModel, UiBaseMutationResponse } from './base.model';

export interface UiSharedAddressModel extends UiBaseModel {
  /** The id of the address. */
  id: string;
  /** The street of the address. */
  streetName: string;
  /** The postal-code of the address. */
  postalCode: string;
  /** The location of the address. */
  location: string;
  /** The country of the address. */
  country_id: string;
}

/**
 * The model for fetching a user by id.
 */
export interface UiAddressMutationModel extends UiBaseModel {
  /** The id of the address. */
  id: string;
  /** The street of the address. */
  streetName: string;
  /** The postal-code of the address. */
  postalCode: string;
  /** The location of the address. */
  location: string;
  /** The country of the address. */
  country_id: string;
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
export interface UiCreateAddressResponseModel extends UiBaseMutationResponse {
  createAddress?: UiAddressDetailModel;
}

/**
 * The response-model for the update-address mutation.
 */
export interface UiUpdateAddressResponseModel extends UiBaseMutationResponse {
  updateAddress?: UiAddressDetailModel;
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
