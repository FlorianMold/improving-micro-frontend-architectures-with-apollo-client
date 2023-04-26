import { uiGql } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UiAllUsersMetaResponseModel,
  UiAllUsersResponseModel,
  UiAllUsersSubsetResponseModel,
  UiUserDetailByIdResponseModel,
  UiUserMutationModel,
  UiUserPageFilter,
} from '@ui-frontend-service/shared/api-types';

/**
 * The variables for fetching a user by it's credentials.
 */
export interface UiUserByCredentialsGQLVariables {
  /** The email of the user to fetch. */
  email: string;
  /** The password of the user to fetch. */
  password: string;
}

/**
 * The query for fetching a user by it's credentials.
 */
export const UI_USER_BY_CREDENTIALS = uiGql<UiAllUsersResponseModel, UiUserByCredentialsGQLVariables>`
  query userByCredentials($email: String!, $password: String!) {
    userByCredentials(email: $email, password: $password) {
      id
      username
      password
      email
      token
    }
  }
`;

/**
 * The variables for fetching a user by it's token.
 */
export interface UiUserByTokenGQLVariables {
  /** The email of the user to fetch. */
  token: string;
}

/**
 * The query for fetching a user by its token.
 */
export const UI_USER_BY_TOKEN = uiGql<UiAllUsersResponseModel, UiUserByTokenGQLVariables>`
  query userByToken($token: String!) {
    userByToken(token: $token) {
      id
      username
      email
      token
    }
  }
`;

/**
 * The query for fetching the paginated users for the users-table.
 */
export const UI_ALL_USERS_TABLE_PAGED_QUERY = uiGql<UiAllUsersResponseModel, UiUserPageFilter>`
  query allUsers($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: UserFilter) {
    allUsers(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      username
      email
      password
      firstName
      secondName
      gender
      Title {
        id
      }
      Salutation {
        id
      }
    }
  }
`;

/**
 * The query for fetching the paginated users for the users-table.
 */
export const UI_ALL_USERS_SUBSET_TABLE_PAGED_QUERY = uiGql<UiAllUsersSubsetResponseModel, UiUserPageFilter>`
  query allUsersSubset($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: UserFilter) {
    allUsers(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      id
      username
      firstName
      secondName
    }
  }
`;

/**
 * Loads the meta-data of the users-table.
 * This contains the total count of the users.
 */
export const UI_ALL_USERS_META_QUERY = uiGql<UiAllUsersMetaResponseModel, UiUserPageFilter>`
  query _allUsersMeta($page: Int, $perPage: Int) {
    _allUsersMeta(page: $page, perPage: $perPage) {
      count
    }
  }
`;

/**
 * The variables for fetching a user by id.
 */
export interface UiUserByIdGQLVariables {
  /** The id of the user to fetch. */
  id: string;
}

/**
 * The query for fetching the user-details by id.
 */
export const UI_USER_DETAIL_BY_ID_QUERY = uiGql<UiUserDetailByIdResponseModel, UiUserByIdGQLVariables>`
  query User($id: ID!) {
    User(id: $id) {
      id
      username
      email
      password
      firstName
      secondName
      phone
      gender
      birthdate
      Salutation {
        id
      }
      Title {
        id
      }
      Address {
        id
        streetName
        postalCode
        location
        Country {
          id
        }
      }
    }
  }
`;

/**
 * The variables for removing a user.
 */
export interface UiRemoveUserDetailGQLVariables {
  id: string;
}

/**
 * The mutation for removing a user.
 */
export const UI_REMOVE_USER_MUTATION = uiGql<{ id: string }, UiRemoveUserDetailGQLVariables>`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;

/**
 * The variables for the update-user-detail mutation.
 */
export type UiUpdateUserDetailGQLVariables = UiUserMutationModel;

/**
 * The mutation for updating a user.
 */
export const UI_UPDATE_USER_DETAIL_MUTATION = uiGql<UiUserDetailByIdResponseModel, UiUpdateUserDetailGQLVariables>`
  mutation updateUser(
    $id: ID!,
    $username: String!,
    $email: String!,
    $password: String!,
    $firstName: String!,
    $secondName: String!,
    $phone: String!,
    $gender: String!,
    $birthdate: Date!,
    $title_id: ID!,
    $salutation_id: ID!,
    $address_id: ID!,
    $createdAt: Int!,
    $changedAt: Int!,
    $deletedAt: String,
    ) {
    updateUser(
      id: $id,
      username: $username,
      email: $email,
      password: $password,
      firstName: $firstName,
      secondName: $secondName,
      phone: $phone,
      gender: $gender,
      birthdate: $birthdate,
      title_id: $title_id,
      salutation_id: $salutation_id,
      address_id: $address_id,
      createdAt: $createdAt,
      changedAt: $changedAt,
      deletedAt: $deletedAt,
    ) {
      id
      username
      email
      password
      firstName
      secondName
      phone
      gender
      birthdate
      Salutation {
        id
      }
      Title {
        id
      }
      Address {
        id
        streetName
        postalCode
        location
        Country {
          id
        }
      }
    }
  }
`;

/**
 * The variables for the create-user-detail mutation.
 */
export type UiCreateUserDetailGQLVariables = UiUserMutationModel;

/**
 * The mutation for creating a new user.
 */
export const UI_CREATE_USER_DETAIL_MUTATION = uiGql<UiUserDetailByIdResponseModel, UiCreateUserDetailGQLVariables>`
  mutation createUser(
    $username: String!,
    $email: String!,
    $password: String!,
    $firstName: String!,
    $secondName: String!,
    $phone: String!,
    $gender: String!,
    $birthdate: Date!,
    $title_id: ID!,
    $salutation_id: ID!,
    $address_id: ID!,
    $createdAt: Int!,
    $changedAt: Int!,
    $deletedAt: String,
    ) {
    createUser(
      username: $username,
      email: $email,
      password: $password,
      firstName: $firstName,
      secondName: $secondName,
      phone: $phone,
      gender: $gender,
      birthdate: $birthdate,
      title_id: $title_id,
      salutation_id: $salutation_id,
      address_id: $address_id,
      createdAt: $createdAt,
      changedAt: $changedAt,
      deletedAt: $deletedAt,
    ) {
      id
      username
      email
      password
      firstName
      secondName
      phone
      gender
      birthdate
      Salutation {
        id
      }
      Title {
        id
      }
    }
  }
`;
