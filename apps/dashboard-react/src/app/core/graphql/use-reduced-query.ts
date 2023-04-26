import { useInjector } from '@ui-frontend-service/shared/ui/ng-react';
import {
  QueryVariables,
  reduceQuery,
  ReduceQueryOptions,
  WatchReduceQueryOptions,
} from '@ui-frontend-service/shared/feature/graphql-augmented-operations';
import { apolloClient } from './apollo-client';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { print } from 'graphql/language';

/**
 * Reduces the given query by removing all fields that are not required for the given operation.
 * Afterwards executes the reduced query and returns the result.
 *
 * @param options The options for reducing the query.
 */
export function useReducedQuery<TData, TVariables extends QueryVariables>(options: WatchReduceQueryOptions<TData, TVariables>) {
  const client = apolloClient();
  const injector = useInjector();

  const { query, pollInterval, fetchPolicy, keyArgs, additionalCacheRefs } = options;

  /**
   * If the global reduceQuery option is set to false, the options of the watchReduceQuery method
   * are overruled. Otherwise, the of the options of the watchReduceQuery overrule the global options.
   */
  const useReducer = injector.augmentedQueryOptions.reduceQueries ? options.reduceQuery : false;

  const defaultOptions: ReduceQueryOptions<TVariables> = {
    /** Set reduce to true by default. */
    reduceQuery: useReducer ?? true,
    additionalCacheRefs: additionalCacheRefs,
    keyArgs: keyArgs,
    variables: options.variables,
    fetchPolicy: fetchPolicy ?? 'cache-first',
    pollInterval: pollInterval,
  };

  /** Functional default state to avoid recomputing the reduced query on each render. */
  const [reducedQueryAst] = useState(() => reduceQuery(query, injector.graphQLClientCache, defaultOptions));

  const { reducedQuery, variables, queryName } = reducedQueryAst;

  const { debug: log } = console;
  reducedQuery ? log(queryName, print(reducedQuery)) : log(queryName, 'All properties of the query exist inside the cache.');

  return useQuery(reducedQuery || query, {
    /** If all the requested data is already in the cache, the query can be skipped. */
    skip: !reducedQuery,
    ...options,
    variables,
    client,
    /**
     * This toggles `loading` every time a polling request starts and completes. We need this
     * for the effect hook to work.
     */
    notifyOnNetworkStatusChange: !!options.pollInterval,
    /** If all the requested data is already in the cache, we can skip this query. */
    fetchPolicy: reducedQueryAst ? options.fetchPolicy : 'cache-only',
  });
}
