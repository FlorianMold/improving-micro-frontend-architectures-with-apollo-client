import {
  UiGraphQLClientError,
  UiGraphQLError,
  UiGraphQLNetworkStatus,
} from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * The base model for every api-type.
 * Contains basic information that every type should have.
 */
export interface UiSalesBaseModel {
  __typename?: string;
  createdAt: number | null;
  changedAt: number | null;
  deletedAt: number | null;
}

/**
 * The base model for responses of graphql-queries.
 * Contains the same properties as the graphql-client-response.
 */
export interface UiSalesQueryResponse {
  loading: boolean;
  networkStatus: UiGraphQLNetworkStatus;
  partial?: boolean;
  errors?: ReadonlyArray<UiGraphQLError>;
  error?: UiGraphQLClientError;
}

/**
 * The base model for responses of graphql-mutations.
 *
 * TODO: Specify the type of errors, extensions and context.
 */
export interface UiSalesMutationResponse {
  loading: boolean;
  errors?: unknown;
  extensions?: unknown;
  context?: unknown;
}
