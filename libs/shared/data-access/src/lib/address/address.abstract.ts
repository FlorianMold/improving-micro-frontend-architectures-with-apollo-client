import {
  UiCreateAddressInputModel,
  UiCreateAddressResponseModel,
  UiUpdateAddressInputModel,
  UiUpdateAddressResponseModel,
} from '@ui-frontend-service/shared/api-types';
import { Observable } from 'rxjs';
import { UiCreateAddressGQLVariables, UiUpdateAddressGQLVariables } from './graphql';
import { UiMutationOptionsAlone } from '@ui-frontend-service/shared/types/graphql-client-types';

export abstract class UiAddressDataAccessService {
  /**
   * Creates a new address.
   *
   * @param address The input values used to create the address object.
   * @param options The options to pass to the mutation method.
   *
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
   */
  abstract updateAddress(
    address: UiUpdateAddressInputModel,
    options?: UiMutationOptionsAlone<UiUpdateAddressResponseModel, UiUpdateAddressGQLVariables>
  ): Observable<UiUpdateAddressResponseModel>;
}
