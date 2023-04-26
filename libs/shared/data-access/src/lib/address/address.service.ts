import { Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiAddressDataAccessService } from './address.abstract';
import {
  UI_CREATE_ADDRESS_MUTATION,
  UI_UPDATE_ADDRESS_MUTATION,
  UiCreateAddressGQLVariables,
  UiUpdateAddressGQLVariables,
} from './graphql';
import { UiMutationOptionsAlone, UiStoreObject } from '@ui-frontend-service/shared/types/graphql-client-types';
import { UiGraphQLClient } from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapMutationResult } from '../util';
import {
  UiAddressMutationModel,
  UiCreateAddressResponseModel,
  UiUpdateAddressResponseModel,
} from '@ui-frontend-service/shared/api-types';

@Injectable()
export class UiAddressDataAccessServiceImpl implements UiAddressDataAccessService {
  constructor(private _graphQLClient: UiGraphQLClient, private _logger: UiLoggerService) {}

  createAddress(
    address: UiAddressMutationModel,
    options?: UiMutationOptionsAlone<UiCreateAddressResponseModel, UiCreateAddressGQLVariables>
  ): Observable<UiCreateAddressResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_CREATE_ADDRESS_MUTATION,
        variables: {
          ...address,
        },
        update: (cache, mutationResult) => {
          /** Add the newly created address to the allContacts list. */
          cache.modify({
            fields: {
              allAddresses(existingAddresses = [], { toReference }) {
                const newAddressRef = mutationResult.data?.createAddress;
                if (newAddressRef) {
                  return [...existingAddresses, toReference(newAddressRef as unknown as UiStoreObject)];
                }
                return existingAddresses;
              },
            },
          });
        },

        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('createAddress')),
        map(mapMutationResult())
      );
  }

  updateAddress(
    address: UiAddressMutationModel,
    options?: UiMutationOptionsAlone<UiUpdateAddressResponseModel, UiUpdateAddressGQLVariables>
  ): Observable<UiUpdateAddressResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_UPDATE_ADDRESS_MUTATION,
        variables: {
          ...address,
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('updateAddress')),
        map(mapMutationResult())
      );
  }
}

/**
 * The provider needed for fetching addresses.
 */
export const UI_ADDRESS_DATA_ACCESS_PROVIDER: Provider[] = [
  {
    provide: UiAddressDataAccessService,
    useClass: UiAddressDataAccessServiceImpl,
  },
];
