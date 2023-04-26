import { Inject, Injectable, Provider } from '@angular/core';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { map, Observable, tap } from 'rxjs';
import { UiUserDataAccessService } from './user.abstract';
import {
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
import {
  UiAllUsersMetaResponseModel,
  UiAllUsersResponseModel,
  UiAllUsersSubsetResponseModel,
  UiCreateUserDetailResponseModel,
  UiRemoveUserByIdResponseModel,
  UiUpdateUserDetailResponseModel,
  UiUserByCredentialsResponseModel,
  UiUserByTokenResponseModel,
  UiUserDetailByIdResponseModel,
  UiUserMutationModel,
  UiUserPageFilter,
} from '@ui-frontend-service/shared/api-types';
import {
  UI_ALL_USERS_META_QUERY,
  UI_ALL_USERS_SUBSET_TABLE_PAGED_QUERY,
  UI_ALL_USERS_TABLE_PAGED_QUERY,
  UI_CREATE_USER_DETAIL_MUTATION,
  UI_REMOVE_USER_MUTATION,
  UI_UPDATE_USER_DETAIL_MUTATION,
  UI_USER_BY_CREDENTIALS,
  UI_USER_BY_TOKEN,
  UI_USER_DETAIL_BY_ID_QUERY,
  UiCreateUserDetailGQLVariables,
  UiRemoveUserDetailGQLVariables,
  UiUpdateUserDetailGQLVariables,
  UiUserByCredentialsGQLVariables,
  UiUserByIdGQLVariables,
  UiUserByTokenGQLVariables,
} from './graphql';

const __typename = 'User';

@Injectable()
export class UiUserDataAccessServiceImpl implements UiUserDataAccessService {
  constructor(
    private _graphQLClient: UiGraphQLClient,
    private _logger: UiLoggerService,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: UiGraphQLClientInMemoryCache
  ) {}

  allUsersMeta(
    pageFilter: UiUserPageFilter,
    options?: UiWatchQueryOptionsAlone<UiUserPageFilter, UiAllUsersMetaResponseModel>
  ): Observable<UiAllUsersMetaResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          ...pageFilter,
        },
        query: UI_ALL_USERS_META_QUERY,
        fetchPolicy: 'network-only',
      })
      .pipe(
        tap(() => this._logger.debug('allUsersMeta')),
        map(mapQueryResult())
      );
  }

  allUsers(
    pageFilter: UiUserPageFilter,
    options?: UiWatchQueryOptionsAlone<UiUserPageFilter, UiAllUsersResponseModel>
  ): Observable<UiAllUsersResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          ...pageFilter,
        },
        query: UI_ALL_USERS_TABLE_PAGED_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allUsers', pageFilter)),
        map(mapQueryResult())
      );
  }

  allUsersSubset(
    pageFilter: UiUserPageFilter,
    options?: UiWatchQueryOptionsAlone<UiUserPageFilter, UiAllUsersSubsetResponseModel>
  ): Observable<UiAllUsersSubsetResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          ...pageFilter,
        },
        query: UI_ALL_USERS_SUBSET_TABLE_PAGED_QUERY,
      })
      .pipe(
        tap(() => this._logger.debug('allUsersSubset')),
        map(mapQueryResult())
      );
  }

  userDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiUserByIdGQLVariables, UiUserDetailByIdResponseModel>
  ): Observable<UiUserDetailByIdResponseModel> {
    const userRef = this._cache.identify({ id, __typename });

    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          id,
        },
        query: UI_USER_DETAIL_BY_ID_QUERY,
        additionalCacheRefs: userRef ? [{ __ref: userRef }] : [],
      })
      .pipe(
        tap(() => this._logger.debug('userDetailById')),
        map(mapQueryResult())
      );
  }

  userByCredentials(
    email: string,
    password: string,
    options?: UiWatchQueryOptionsAlone<UiUserByCredentialsGQLVariables, UiUserByCredentialsResponseModel>
  ): Observable<UiUserByCredentialsResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          email,
          password,
        },
        query: UI_USER_BY_CREDENTIALS,
      })
      .pipe(
        tap(() => this._logger.debug('userByCredentials')),
        map(mapQueryResult())
      );
  }

  userByToken(
    token: string,
    options?: UiWatchQueryOptionsAlone<UiUserByTokenGQLVariables, UiUserByTokenResponseModel>
  ): Observable<UiUserByTokenResponseModel> {
    return this._graphQLClient
      .watchQuery({
        ...options,
        variables: {
          token,
        },
        query: UI_USER_BY_TOKEN,
      })
      .pipe(
        tap(() => this._logger.debug('userByToken')),
        map(mapQueryResult())
      );
  }

  removeUserById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveUserDetailGQLVariables>
  ): Observable<UiRemoveUserByIdResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_REMOVE_USER_MUTATION,
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              allUsers(existingUsers = [], { readField }) {
                return existingUsers.filter(
                  (userRef: UiStoreObject | UiReference | undefined) => readField('id', userRef) !== id
                );
              },
              _allUsersMeta(existingUsersMeta = {}) {
                return existingUsersMeta?.count - 1;
              },
            },
          });
          /** Remove user reference from the cache. */
          cache.evict({ id: cache.identify({ __typename, id }) });
          /** Remove any dangling references. */
          cache.gc();
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('removeUser')),
        map(mapMutationResult())
      );
  }

  createUser(
    user: UiUserMutationModel,
    options?: UiMutationOptionsAlone<UiCreateUserDetailResponseModel, UiCreateUserDetailGQLVariables>
  ): Observable<UiCreateUserDetailResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_CREATE_USER_DETAIL_MUTATION,
        variables: {
          ...user,
        },
        update(cache, mutationResult) {
          /** Add the newly created user to the allUsers list. */
          cache.modify({
            fields: {
              allUsers(existingUsers = [], { toReference }) {
                const newUserRef = mutationResult.data?.createUser;
                if (newUserRef) {
                  return [...existingUsers, toReference(newUserRef as unknown as UiStoreObject)];
                }
                return existingUsers;
              },
            },
          });
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('createUser')),
        map(mapMutationResult())
      );
  }

  updateUser(
    user: UiUserMutationModel,
    options?: UiMutationOptionsAlone<UiUpdateUserDetailResponseModel, UiUpdateUserDetailGQLVariables>
  ): Observable<UiUpdateUserDetailResponseModel> {
    return this._graphQLClient
      .mutate({
        mutation: UI_UPDATE_USER_DETAIL_MUTATION,
        variables: {
          ...user,
        },
        ...options,
      })
      .pipe(
        tap(() => this._logger.debug('updateUser')),
        map(mapMutationResult())
      );
  }
}

/**
 * The provider needed for fetching user information.
 */
export const UI_USER_DATA_ACCESS_PROVIDER: Provider[] = [
  {
    provide: UiUserDataAccessService,
    useClass: UiUserDataAccessServiceImpl,
  },
];
