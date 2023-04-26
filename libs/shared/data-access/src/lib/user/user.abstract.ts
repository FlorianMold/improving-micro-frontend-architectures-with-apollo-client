import { Observable } from 'rxjs';
import {
  UiFieldPolicy,
  UiFieldReadFunction,
  UiMutationOptionsAlone,
  UiWatchQueryOptionsAlone,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UiCreateUserDetailGQLVariables,
  UiRemoveUserDetailGQLVariables,
  UiUpdateUserDetailGQLVariables,
  UiUserByCredentialsGQLVariables,
  UiUserByIdGQLVariables,
  UiUserByTokenGQLVariables,
} from './graphql';
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

export abstract class UiUserDataAccessService {
  /**
   * Fetches the meta-data about the user-table.
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options to pass to the watchQuery method.
   */
  abstract allUsersMeta(
    pageFilter: UiUserPageFilter,
    options?: UiWatchQueryOptionsAlone<UiUserPageFilter, UiAllUsersMetaResponseModel>
  ): Observable<UiAllUsersMetaResponseModel>;

  /**
   * Fetches all users paged according to the filter.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all users for the table.
   */
  abstract allUsers(
    pageFilter?: UiUserPageFilter,
    options?: UiWatchQueryOptionsAlone<UiUserPageFilter, UiAllUsersResponseModel>
  ): Observable<UiAllUsersResponseModel>;

  /**
   * Fetches all users with a subset of the fields.
   *
   * @param pageFilter Specifies the page to fetch and the amount of items per page.
   * @param options The options for the retrieval of all users for the table.
   */
  abstract allUsersSubset(
    pageFilter?: UiUserPageFilter,
    options?: UiWatchQueryOptionsAlone<UiUserPageFilter, UiAllUsersSubsetResponseModel>
  ): Observable<UiAllUsersSubsetResponseModel>;

  /**
   * Fetch a user by id.
   *
   * @param id The id of the user to fetch.
   * @param options The options for the retrieval of the user by id.
   */
  abstract userDetailById(
    id: string,
    options?: UiWatchQueryOptionsAlone<UiUserByIdGQLVariables, UiUserDetailByIdResponseModel>
  ): Observable<UiUserDetailByIdResponseModel>;

  /**
   * Tries to fetch the user with the given email and password.
   *
   * @param email The email of the user.
   * @param password The password of the user.
   * @param options The options to pass to the watchQuery method.
   */
  abstract userByCredentials(
    email: string,
    password: string,
    options?: UiWatchQueryOptionsAlone<UiUserByCredentialsGQLVariables, UiUserByCredentialsResponseModel>
  ): Observable<UiUserByCredentialsResponseModel>;

  /**
   * Tries to fetch the user with the given token.
   *
   * @param token The token of the user.
   * @param options The options to pass to the watchQuery method.
   */
  abstract userByToken(
    token: string,
    options?: UiWatchQueryOptionsAlone<UiUserByTokenGQLVariables, UiUserByTokenResponseModel>
  ): Observable<UiUserByTokenResponseModel>;

  /**
   * Remove the user with the given id.
   *
   * @param id The id of the user to remove.
   * @param options The options to pass to the mutate method.
   */
  abstract removeUserById(
    id: string,
    options?: UiMutationOptionsAlone<{ id: string }, UiRemoveUserDetailGQLVariables>
  ): Observable<UiRemoveUserByIdResponseModel>;

  /**
   * Updates an existing user.
   *
   * @param user The updated user details.
   * @param options The options for the update of the user.
   *
   */
  abstract updateUser(
    user: UiUserMutationModel,
    options?: UiMutationOptionsAlone<UiUpdateUserDetailResponseModel, UiUpdateUserDetailGQLVariables>
  ): Observable<UiUpdateUserDetailResponseModel>;

  /**
   * Creates the given user.
   *
   * @param user The input values used to create the user object.
   * @param options The options for the creation of the user.
   *
   */
  abstract createUser(
    user: UiUserMutationModel,
    options?: UiMutationOptionsAlone<UiCreateUserDetailResponseModel, UiCreateUserDetailGQLVariables>
  ): Observable<UiCreateUserDetailResponseModel>;
}

export const UI_USER_ROOT_QUERY_FIELD_POLICY: {
  [fieldName: string]: UiFieldPolicy | UiFieldReadFunction;
} = {
  User(_: unknown, { args, toReference }) {
    return toReference({
      __typename: 'User',
      id: args?.['id'],
    });
  },
  // allUsers: {
  //   /**
  //    * Don't cache separate results based on any of this field's arguments.
  //    */
  //   keyArgs: false,
  //   /**
  //    * Concatenate the incoming list items with the existing list items.
  //    *
  //    * @param existing The existing list of items.
  //    * @param incoming The incoming list of items.
  //    * @param args The arguments passed to the field.
  //    */
  //   merge(existing, incoming, { args }) {
  //     const { page, perPage } = (
  //       args
  //         ? args
  //         : {
  //             page: null,
  //             perPage: null,
  //           }
  //     ) as { page: number | null; perPage: number | null };
  //
  //     let merged = [];
  //     if (isNotNil(page) && isNotNil(perPage)) {
  //       merged = existing ? existing.slice(0) : [];
  //       for (let i = 0; i < incoming.length; ++i) {
  //         merged[page * perPage + i] = incoming[i];
  //       }
  //     } else {
  //       merged = incoming;
  //     }
  //
  //     return merged;
  //   },
  //   read(existing, { args, readField }) {
  //     const { page, perPage } = (
  //       args
  //         ? args
  //         : {
  //             page: null,
  //             perPage: null,
  //           }
  //     ) as { page: number | null; perPage: number | null };
  //
  //     if (args && args['filter']) {
  //       const { email, password, token } = args['filter'] as {
  //         email: string | null;
  //         password: string | null;
  //         token: string | null;
  //       };
  //
  //       if (!!email && !!password) {
  //         return existing && existing.length > 0
  //           ? existing.slice().filter((userRef: { email: string; password: string }) => {
  //               return readField('email', userRef) === email && readField('password', userRef) === password;
  //             })
  //           : undefined;
  //       }
  //
  //       if (isNotNil(token)) {
  //         return existing && existing.length > 0
  //           ? existing.slice().filter((userRef: { token: string }) => readField('token', userRef) === token)
  //           : undefined;
  //       }
  //     }
  //
  //     if (isNotNil(page) && isNotNil(perPage)) {
  //       const offset = page * perPage;
  //
  //       /**
  //        * A read function should always return undefined if existing is
  //        * undefined. Returning undefined signals that the field is
  //        * missing from the cache, which instructs Apollo Client to
  //        * fetch its value from your GraphQL server.
  //        */
  //       const res = existing && existing.slice(offset, offset + perPage);
  //       return res && res.length > 0 ? res : undefined;
  //     }
  //
  //     return existing;
  //   },
  // },
  _allUsersMeta: {
    keyArgs: false,
  },
};
