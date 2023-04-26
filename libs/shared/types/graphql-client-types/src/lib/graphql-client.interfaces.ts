import {
  EmptyObject,
  MutationOptions,
  MutationOptionsAlone,
  MutationResult,
  WatchQueryOptions,
  WatchQueryOptionsAlone,
} from 'apollo-angular/types';
import {
  ApolloError,
  ApolloQueryResult,
  FieldPolicy,
  FieldReadFunction,
  makeVar,
  QueryOptions,
  Reference,
  StoreObject,
  TypedDocumentNode,
  TypePolicies,
} from '@apollo/client';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { GraphQLError } from 'graphql/error/GraphQLError';
import { FieldFunctionOptions } from '@apollo/client/core';
import { OperationVariables } from '@apollo/client/core/types';
import { WatchQueryFetchPolicy } from '@apollo/client/core/watchQueryOptions';

export interface UiWatchQueryOptionsAlone<TVariables = UiEmptyObject, TData = unknown>
  extends WatchQueryOptionsAlone<TVariables, TData> {
  reduceQuery: boolean;
}

export type UiMutationOptionsAlone<TData = UiEmptyObject, TVariables = unknown> = MutationOptionsAlone<TData, TVariables>;

export type UiMutationOptions<TData = unknown, TVariables = UiEmptyObject> = MutationOptions<TData, TVariables>;

export type UiQueryOptions<TVariables = OperationVariables, TData = unknown> = QueryOptions<TVariables, TData>;

export type UiWatchQueryOptions<TVariables = UiEmptyObject, TData = unknown> = WatchQueryOptions<TVariables, TData>;

export type UiMutationResult<TData = unknown> = MutationResult<TData>;

export type UiEmptyObject = EmptyObject;

export type UiGraphQLQueryResult<T> = ApolloQueryResult<T>;

export const uiGql = gql;

export type UiWatchQueryFetchPolicy = WatchQueryFetchPolicy;

export enum UiGraphQLNetworkStatus {
  loading = 1,
  setVariables = 2,
  fetchMore = 3,
  refetch = 4,
  poll = 6,
  ready = 7,
  error = 8,
}

export type UiGraphQLFieldFunctionOptions = FieldFunctionOptions;

export class UiQueryRef<T, V = UiEmptyObject> extends QueryRef<T, V> {}

export class UiGraphQLClientError extends ApolloError {}

/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */
export class UiGraphQLError extends GraphQLError {}

/**
 * Options that can be provided by the application to configure the GraphQL client.
 */
export interface UiGraphQLProviderOptions {
  /**
   * Whether the provider for the graphql-client should be provided.
   * This determines whether a client is created or not.
   * This can be used to implement single and multiple graphql-clients.
   */
  provideGraphQLClientOptions: boolean;
}

export type UiTypePolicies = TypePolicies;

export const uiMakeVar = makeVar;

export type UiReference = Reference;

export type UiStoreObject = StoreObject;

export type UiFieldPolicy = FieldPolicy;

export type UiFieldReadFunction = FieldReadFunction;

export type UiTypedDocumentNode<D, V> = TypedDocumentNode<D, V>;

export type UiKeySpecifier = ReadonlyArray<string | UiKeySpecifier>;

export class UiApollo extends Apollo {}
