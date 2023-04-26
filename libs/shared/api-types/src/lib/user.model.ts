import { UiBaseModel, UiBaseMutationResponse, UiBaseQueryResponse } from './base.model';
import { UiPageFilter } from './pagination';

/**
 * The model for specifying all properties of a user.
 */
export interface UiSharedUserModel extends UiBaseModel {
  /** The id of the user. */
  id: string;
  /** The username of the user. */
  username: string;
  /** The token of the user. */
  token: string;
  /** The email of the user. */
  email: string;
  /** The password of the user. */
  password: string;
  /** The first name of the user. */
  firstName: string;
  /** The second name of the user. */
  secondName: string;
  /** The phone-number of the user. */
  phone: string;
  /** The gender of the user. */
  gender: string;
  /** The birthdate of the user. */
  birthdate: string;
  /** A reference to the address of the user. */
  address_id: string;
  /** The id of the salutation for the user. */
  salutation_id: string;
  /** The id of the title for the user. */
  title_id: string;
}

/**
 * The response-model for the meta-data information of the query.
 */
export interface UiAllUsersMetaResponseModel extends UiBaseQueryResponse {
  _allUsersMeta: { count: number };
}

/**
 * The model for fetching all users.
 */
export interface UiAllUsersModel extends UiBaseModel {
  /** The id of the user. */
  id: string;
  /** The username of the user. */
  username: string;
  /** The email of the user. */
  email: string;
  /** The first name of the user. */
  firstName: string;
  /** The second name of the user. */
  secondName: string;
  /** The gender of the user. */
  gender: string;

  /** The salutation of the user. */
  Salutation: {
    id: string;
  };

  /** The title of the user. */
  Title: {
    id: string;
  };
}

/**
 * The response-model for the allUsers query.
 */
export interface UiAllUsersResponseModel extends UiBaseQueryResponse {
  allUsers: UiAllUsersModel[];
}

/**
 * The response-model for the allUsers query.
 */
export interface UiAllUsersSubsetResponseModel extends UiBaseQueryResponse {
  allUsers: UiUserSubsetDetailModel[];
}

/**
 * The model for fetching a user by id.
 */
export interface UiUserSubsetDetailModel extends UiBaseModel {
  /** The id of the user. */
  id: string;
  /** The username of the user. */
  username: string;
  /** The first name of the user. */
  firstName: string;
  /** The second name of the user. */
  secondName: string;
}

/**
 * The model for fetching a user by id.
 */
export interface UiUserDetailModel extends UiBaseModel {
  /** The id of the user. */
  id: string;
  /** The username of the user. */
  username: string;
  /** The password of the user. */
  password: string;
  /** The email of the user. */
  email: string;
  /** The first name of the user. */
  firstName: string;
  /** The second name of the user. */
  secondName: string;
  /** The phone-number of the user. */
  phone: string;
  /** The gender of the user. */
  gender: string;
  /** The birthdate of the user. */
  birthdate: string;

  /** The salutation of the user. */
  Salutation: {
    id: string;
  };

  /** The title of the user. */
  Title: {
    id: string;
  };

  Address: {
    id: string;
    /** The street of the address. */
    streetName: string;
    /** The postal-code of the address. */
    postalCode: string;
    /** The location of the address. */
    location: string;
    /** The country of the address. */
    Country: {
      id: string;
    };
  };
}

/**
 * The response-model for the user-detail query.
 */
export interface UiUserDetailByIdResponseModel extends UiBaseQueryResponse {
  User: UiUserDetailModel | null;
}

/**
 * The model for fetching a user by its credentials.
 */
export interface UiUserByCredentialsModel {
  /** The id of the user. */
  id: string;
  /** The username of the user. */
  username: string;
  /** The email of the user. */
  email: string;
  /** The token of the user. */
  token: string;
}

/**
 * The response-model for fetching a user by its credentials.
 */
export interface UiUserByCredentialsResponseModel extends UiBaseQueryResponse {
  userByCredentials: UiUserByCredentialsModel | null;
}

/**
 * The response-model for fetching a user by its credentials.
 */
export interface UiUserByTokenResponseModel extends UiBaseQueryResponse {
  userByToken: UiUserByCredentialsModel | null;
}

export interface UiUserResponseModel extends UiBaseQueryResponse {
  getAuthenticatedUser: UiUserByCredentialsModel;
}

/**
 * The response-model for the remove user-mutation.
 */
export interface UiRemoveUserByIdResponseModel extends UiBaseMutationResponse {
  removeUser?: { id: string };
}

/**
 * The response-model for the update-user mutation.
 */
export interface UiUpdateUserDetailResponseModel extends UiBaseMutationResponse {
  updateUser?: UiUserDetailModel;
}

/**
 * The response-model for the create-user mutation.
 */
export interface UiCreateUserDetailResponseModel extends UiBaseMutationResponse {
  createUser?: UiUserDetailModel;
}

/**
 * The fields, which can be filtered on the user-table.
 */
export type UiUserQueryFilter = {
  email?: string | null;
  password?: string | null;
};

/**
 * The page-filter for the user-table.
 */
export type UiUserPageFilter = UiPageFilter<UiUserQueryFilter>;

/**
 * The model for fetching a user by id.
 */
export interface UiUserMutationModel extends UiBaseModel {
  /** The id of the user. */
  id: string;
  /** The username of the user. */
  username: string;
  /** The password of the user. */
  password: string;
  /** The email of the user. */
  email: string;
  /** The first name of the user. */
  firstName: string;
  /** The second name of the user. */
  secondName: string;
  /** The phone-number of the user. */
  phone: string;
  /** The gender of the user. */
  gender: string;
  /** The birthdate of the user. */
  birthdate: string;

  /** The salutation of the user. */
  salutation_id: string;

  /** The title of the user. */
  title_id: string;

  /** The address of the user. */
  address_id: string;
}
