import { Inject, Injectable } from '@angular/core';
import { Apollo, TypedDocumentNode } from 'apollo-angular';
import {
  queryCache,
  QueryCacheOptions,
  QueryVariables,
  reduceQuery,
  ReduceQueryOptions,
  WatchReduceQueryOptions,
} from '@ui-frontend-service/shared/feature/graphql-augmented-operations';
import { UI_GRAPHQL_CLIENT_CACHE } from '../graphql-cache.token';
import { filter, map, Observable, switchMap } from 'rxjs';
import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { print } from 'graphql/language/printer';
import { InMemoryCache } from '@apollo/client/core';
import { ASTNode } from 'graphql/language';
import { UiGraphQLClient } from './graphql-client.abstract';
import { UiEmptyObject, UiMutationOptions, UiMutationResult } from '@ui-frontend-service/shared/types/graphql-client-types';

const queryMap = new Map<string, number>();

@Injectable()
export class UiReduceGraphQLClientImpl implements UiGraphQLClient {
  constructor(
    private _graphqlClient: Apollo,
    private _logger: UiLoggerService,
    @Inject(UI_GRAPHQL_CLIENT_CACHE) private _cache: InMemoryCache
  ) {
    this._logger.debug('Creating UiReduceGraphQLClientImpl');
  }

  /**
   * Reduces the given query by removing all fields that are not required for the given operation.
   * Afterwards executes the reduced query against the server and the original query against the cache and returns
   * the merged result of both operations.
   *
   * @param options The options for reducing the query.
   */
  watchQuery<TData, TVariables extends QueryVariables>(
    options: WatchReduceQueryOptions<TData, TVariables>
  ): Observable<ApolloQueryResult<TData>> {
    const { query, pollInterval, fetchPolicy, keyArgs, additionalCacheRefs } = options;
    const defaultOptions: ReduceQueryOptions<TVariables> = {
      /** Set reduce to true by default. */
      reduceQuery: options.reduceQuery ?? true,
      additionalCacheRefs: additionalCacheRefs,
      keyArgs: keyArgs,
      variables: options.variables,
      fetchPolicy: fetchPolicy ?? 'cache-first',
      pollInterval: pollInterval,
    };

    const { reducedQuery, variables, queryName } = reduceQuery(query, this._cache, defaultOptions);

    const { debug: log } = this._logger;
    reducedQuery
      ? log(queryName, this._queryToString(reducedQuery))
      : log(queryName, 'All properties of the query exist inside the cache.');

    if (queryMap.has(queryName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- queryName is checked for existence
      queryMap.set(queryName, queryMap.get(queryName)! + 1);
    } else {
      queryMap.set(queryName, 1);
    }

    this._logger.debug(queryMap);

    return this._graphqlClient
      .watchQuery({
        ...options,
        query: reducedQuery || query,
        variables,
        /** If the reduced query is null, that means the fields of the query are completely inside the cache. */
        fetchPolicy: reducedQuery ? options.fetchPolicy : 'cache-only',
      })
      .valueChanges.pipe(
        filter((result) => !result.loading),
        switchMap((data) =>
          this._queryCache(query, options.variables, { dataMap: options.dataMap }).pipe(
            map((cachedData) => ({ ...data, data: cachedData.data }))
          )
        )
      );
  }

  /**
   * Creates a mutation.
   *
   * @param options The options to use to create the mutation.
   */
  mutate<TData, TVariables = UiEmptyObject>(options: UiMutationOptions<TData, TVariables>): Observable<UiMutationResult<TData>> {
    return this._graphqlClient.mutate<TData, TVariables>(options);
  }

  getClient(): ApolloClient<unknown> {
    return this._graphqlClient.client;
  }

  /**
   * Executes the given query against the cache.
   *
   * @param queryAst The query that should be executed against the cache.
   * @param variables The variables of the query.
   * @param options The options for querying the cache.
   */
  private _queryCache<TData, TVariables extends QueryVariables>(
    queryAst: TypedDocumentNode<TData, TVariables>,
    variables?: TVariables,
    options?: QueryCacheOptions
  ): Observable<ApolloQueryResult<TData>> {
    return queryCache(queryAst, variables, options, this._graphqlClient);
  }

  /**
   * Converts the given query to a string.
   *
   * @param query The query to convert.
   */
  private _queryToString(query: ASTNode): string {
    return print(query);
  }
}
