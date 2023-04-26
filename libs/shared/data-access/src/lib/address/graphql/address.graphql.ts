import { uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiAddressDetailModel, UiAddressMutationModel } from '@ui-frontend-service/shared/api-types';

/**
 * The variables for the create-address mutation.
 */
export type UiCreateAddressGQLVariables = UiAddressMutationModel;

/**
 * The variables for the update-address mutation.
 */
export type UiUpdateAddressGQLVariables = UiAddressMutationModel;

/**
 * The mutation for creating a new address.
 */
export const UI_CREATE_ADDRESS_MUTATION = uiGql<UiAddressDetailModel, UiCreateAddressGQLVariables>`
  mutation createAddress(
    $country_id: ID!,
    $location: String!,
    $postalCode: String!,
    $streetName: String!,
    $createdAt: Int!,
    $changedAt: Int!,
    $deletedAt: String,
  ) {
    createAddress(
      country_id: $country_id,
      location: $location,
      postalCode: $postalCode,
      streetName: $streetName,
      createdAt: $createdAt,
      changedAt: $changedAt,
      deletedAt: $deletedAt,
    ) {
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
export const UI_UPDATE_ADDRESS_MUTATION = uiGql<UiAddressDetailModel, UiUpdateAddressGQLVariables>`
  mutation updateAddress(
    $id: ID!
    $country_id: ID!,
    $location: String!,
    $postalCode: String!,
    $streetName: String!,
    $createdAt: Int!,
    $changedAt: Int!,
    $deletedAt: String,
  ) {
    updateAddress(
      id: $id,
      country_id: $country_id,
      location: $location,
      postalCode: $postalCode,
      streetName: $streetName,
      createdAt: $createdAt,
      changedAt: $changedAt,
      deletedAt: $deletedAt,
    ) {
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
