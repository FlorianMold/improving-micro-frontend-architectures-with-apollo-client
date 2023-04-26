import { Inject, Injectable, Provider } from '@angular/core';
import {
  UiAddressDetailByIdResponseModel,
  UiAddressesResponseModel,
  UiAddressRemoveByIdResponseModel,
  UiCreateAddressResponseModel,
  UiUpdateAddressInputModel,
  UiUpdateAddressResponseModel,
} from '@ui-frontend-service/contact/api-types';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiContactDataAccessAddressService } from './address.abstract';
import {
  UI_ADDRESS_BY_ID_QUERY,
  UI_ALL_ADDRESSES_QUERY,
  UI_CREATE_ADDRESS_MUTATION,
  UI_REMOVE_ADDRESS_MUTATION,
  UI_UPDATE_ADDRESS_MUTATION,
  UiAddressByIdGQLVariables,
  UiCreateAddressGQLVariables,
  UiRemoveAddressDetailGQLVariables,
  UiUpdateAddressGQLVariables,
} from './graphql';
import {
  UiEmptyObject,
  UiMutationOptionsAlone,
  UiReference,
  UiStoreObject,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_GRAPHQL_CLIENT_CACHE,
  UiGraphQLClient,
  UiGraphQLClientInMemoryCache,
} from '@ui-frontend-service/shared/feature/graphql-client-options';
import { mapMutationResult, mapQueryResult } from '../util';

const __typename = 'Address';

@Injectable()
export class UiContactDataAccessAddressServiceImpl implements UiContactDataAccessAddressService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache,
    private _logger: UiLoggerService
  ) {}

  allAddresses(
    options?: UiWatchQueryOptionsAlone<UiEmptyObject, UiAddressesResponseModel>
  ): Observable<UiAddressesResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ALL_ADDRESSES_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allAddresses')),
        map(mapQueryResult())
      );
  }

  addressById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiAddressByIdGQLVariables, UiAddressDetailByIdResponseModel>
  ): Observable<UiAddressDetailByIdResponseModel> {
    const addressRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        query: UI_ADDRESS_BY_ID_QUERY,
        variables: { id },
        additionalCacheRefs: addressRef ? [{ __ref: addressRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('addressById')),
        map(mapQueryResult())
      );
  }

  createAddress(
    address: UiUpdateAddressInputModel,
    options?: UiMutationOptionsAlone<UiCreateAddressResponseModel, UiCreateAddressGQLVariables>
  ): Observable<UiCreateAddressResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_CREATE_ADDRESS_MUTATION,
        variables: {
          addressInput: address,
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('createAddress')),
        map(mapMutationResult())
      );
  }

  updateAddress(
    address: UiUpdateAddressInputModel,
    options?: UiMutationOptionsAlone<UiUpdateAddressResponseModel, UiUpdateAddressGQLVariables>
  ): Observable<UiUpdateAddressResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_UPDATE_ADDRESS_MUTATION,
        variables: {
          addressInput: address,
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('updateAddress')),
        map(mapMutationResult())
      );
  }

  removeAddressById(
    id: string,
    options?: UiMutationOptionsAlone<UiAddressRemoveByIdResponseModel, UiRemoveAddressDetailGQLVariables>
  ): Observable<UiAddressRemoveByIdResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_ADDRESS_MUTATION,
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              allAddresses(existingAddresses = [], { readField }) {
                return existingAddresses.filter(
                  (addressRef: UiStoreObject | UiReference | undefined) => readField('id', addressRef) !== id
                );
              },
            },
          });
          /** Remove address reference from the cache. */
          cache.evict({ id: cache.identify({ __typename: 'Address', id }) });
          /** Remove any dangling references. */
          cache.gc();
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeAddressById')),
        map(mapMutationResult())
      );
  }
}

/**
 * The provider needed for fetching addresses.
 */
export const UI_CONTACT_DATA_ACCESS_ADDRESS_PROVIDER: Provider[] = [
  {
    provide: UiContactDataAccessAddressService,
    useClass: UiContactDataAccessAddressServiceImpl,
  },
];
