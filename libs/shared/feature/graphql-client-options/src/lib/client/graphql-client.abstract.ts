import { Observable } from 'rxjs';
import {
  UiEmptyObject,
  UiKeySpecifier,
  UiMutationOptions,
  UiMutationResult,
  UiTypedDocumentNode,
} from '@ui-frontend-service/shared/types/graphql-client-types';
import { ApolloClient, ApolloQueryResult, WatchQueryFetchPolicy } from '@apollo/client';

export abstract class UiGraphQLClient {
  /**
   * Creates a watch-query.
   *
   * @param options The options to use to create the query.
   */
  abstract watchQuery<TData, TVariables extends QueryVariables>(
    options: UiWatchQueryOptions<TData, TVariables>
  ): Observable<ApolloQueryResult<TData>>;

  /**
   * Creates a mutation.
   *
   * @param options The options to use to create the mutation.
   */
  abstract mutate<TData, TVariables = UiEmptyObject>(
    options: UiMutationOptions<TData, TVariables>
  ): Observable<UiMutationResult<TData>>;

  /** Returns the underlying GraphQL client. */
  abstract getClient(): ApolloClient<unknown>;
}

/** An object that represents the variables of the query */
export interface QueryVariables {
  [variableName: string]: unknown;
}

/** Options that can be provided to the graphql-client. */
export interface UiWatchQueryOptions<TData, TVariables extends QueryVariables> extends Partial<UiQueryOptions<TVariables>> {
  /** The query, that should be reduced */
  query: UiTypedDocumentNode<TData, TVariables>;
  /** A data-mapper for the result of the query. */
  dataMap?: { [key: string]: string };
}

/** Options that can be provided for reducing a query. */
export interface UiQueryOptions<TVariables extends QueryVariables> {
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
  additionalCacheRefs?: { __ref: string }[];

  /**
   * Whether the arguments of the query should be appended to field-name.
   * This setting is especially important for paginated queries, where the field policies are configured
   * to have no keyArgs.
   */
  keyArgs?: false | UiKeySpecifier;
}
