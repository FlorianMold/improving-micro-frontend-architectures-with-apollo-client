import {
  UiAddressDetailByIdResponseModel,
  UiAddressesResponseModel,
  UiUpdateAddressInputModel,
  UiCreateAddressResponseModel,
  UiCreateAddressInputModel,
  UiUpdateAddressResponseModel,
  UiAddressRemoveByIdResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { Observable } from 'rxjs';
import {
  UiAddressByIdGQLVariables,
  UiCreateAddressGQLVariables,
  UiUpdateAddressGQLVariables,
  UiRemoveAddressDetailGQLVariables,
} from './graphql';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiContactDataAccessAddressService {
  /**
   * Fetches all addresses.
   *
   * @param options The options to pass to the watchQuery method.
   */
  abstract allAddresses(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAddressesResponseModel>
  ): Observable<UiAddressesResponseModel>;

  /**
   * Fetches an address by id.
   *
   * @param id The id of the address to fetch.
   * @param options The options to pass to the watchQuery method.
   */
  abstract addressById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiAddressByIdGQLVariables, UiAddressDetailByIdResponseModel>
  ): Observable<UiAddressDetailByIdResponseModel>;

  /**
   * Creates a new address.
   *
   * @param address The input values used to create the address object.
   * @param options The options to pass to the mutation method.
   *
   * @privateRemarks This function does not work with the json-graphql-test-backend!
   */
  abstract createAddress(
    address: UiCreateAddressInputModel,
    options?: UiMutationOptionsAlone<UiCreateAddressResponseModel, UiCreateAddressGQLVariables>
  ): Observable<UiCreateAddressResponseModel>;

  /**
   * Updates an existing address.
   *
   * @param address The updated address object.
   * @param options The options to pass to the mutation method.
   *
   * @privateRemarks This function does not work with the json-graphql-test-backend!
   */
  abstract updateAddress(
    address: UiUpdateAddressInputModel,
    options?: UiMutationOptionsAlone<UiUpdateAddressResponseModel, UiUpdateAddressGQLVariables>
  ): Observable<UiUpdateAddressResponseModel>;

  /**
   * Removes the address with the given id.
   *
   * @param id The id of the address to remove.
   * @param options The options for the removal of the address.
   */
  abstract removeAddressById(
    id: string,
    options?: UiMutationOptionsAlone<UiAddressRemoveByIdResponseModel, UiRemoveAddressDetailGQLVariables>
  ): Observable<UiAddressRemoveByIdResponseModel>;
}
