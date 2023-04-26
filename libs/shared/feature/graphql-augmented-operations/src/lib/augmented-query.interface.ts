import { WatchQueryFetchPolicy } from '@apollo/client';
import { KeySpecifier } from '@apollo/client/cache/inmemory/policies';
import { UiTypedDocumentNode } from '@ui-frontend-service/shared/types/graphql-client-types';

/** A reference to an object inside the cache. */
export interface CacheReference {
  /** Reference to an object inside the cache. */
  __ref: string;
}

/** Identifies an object inside the cache. */
export interface CacheObject {
  /** Every object inside the cache, must contain a reference. */
  __typename?: string;

  [storeFieldName: string]: unknown;
}

/** The key-fields of a specific typename inside the cache. */
export interface TypeKeyFields {
  [__typename: string]: string[];
}

/** The arguments of a query as a flat lookup object. */
export interface QueryArguments {
  [variableName: string]: unknown;
}

/** The variables of the query. */
export interface QueryVariables {
  [variableName: string]: unknown;
}

/** Options that can be provided for reducing a query. */
export interface ReduceQueryOptions<TVariables extends QueryVariables> {
  /** The variables of the query. */
  variables?: TVariables;
  /** Whether the query should be reduced. */
  reduceQuery: boolean;
  /** The fetch-policy of the request. */
  fetchPolicy: WatchQueryFetchPolicy;
  /** The interval to poll the query. */
  pollInterval?: number;

  /**
   * Specify additional cache-references that the query-reducer should look into.
   *
   * Especially useful, if two different queries query the same type of data.
   * Caching works on the query level, therefore two different queries, which query the same
   * type of data can't benefit from the cache.
   *
   * To circumvent this problem, this property can be used to specify references to objects inside the cache.
   * The references are used to look, which properties are already inside the cache.
   */
  additionalCacheRefs?: CacheReference[];

  /**
   * Whether the arguments of the query should be appended to field-name.
   * This setting is especially important for paginated queries, where the field policies are configured
   * to have no keyArgs.
   */
  keyArgs?: false | KeySpecifier;
}

/** The result of a reduce-query operation.  */
export interface ReducedQuery<TData, TVariables extends QueryVariables> {
  /** The reduced query. */
  reducedQuery: UiTypedDocumentNode<TData, TVariables> | null;
  /** The variables of the query. */
  variables?: TVariables;
  /** Whether the query was reduced. */
  reduceQuery: boolean;
  options: {
    /** The fetch-policy of the reduced query. */
    fetchPolicy?: WatchQueryFetchPolicy;
    /** The interval to poll the query. */
    pollInterval?: number;
  };
  /** The name of the query to execute. */
  queryName: string;
}

/** The options for querying the cache. */
export interface QueryCacheOptions {
  dataMap?: { [key: string]: string };
}

/** Options that can be provided for the reduce-query service. */
export interface WatchReduceQueryOptions<TData, TVariables extends QueryVariables>
  extends Partial<ReduceQueryOptions<TVariables>> {
  /** The query, that should be reduced */
  query: UiTypedDocumentNode<TData, TVariables>;
  /** Whether the query should be reduced. */
  reduceQuery?: boolean;
  /** A data-mapper for the result of the query. */
  dataMap?: { [key: string]: string };
}
