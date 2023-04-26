import {
  mapData,
  QueryVariables,
  WatchReduceQueryOptions,
} from '@ui-frontend-service/shared/feature/graphql-augmented-operations';
import { useQuery } from '@apollo/client';
import { apolloClient } from './apollo-client';

/**
 * Executes the given query against the cache. Returns the data of the query, which is stored inside the cache.
 *
 * @param options The options for accessing the cache with a query.
 */
export function useCacheQuery<TData, TVariables extends QueryVariables>(options: WatchReduceQueryOptions<TData, TVariables>) {
  const client = apolloClient();
  /**
   * Grab all the requested data from the cache. If some or all of the data is missing, the reduced query will get it.
   */
  const cacheResult = useQuery(options.query, {
    client,
    variables: options.variables,
    fetchPolicy: 'cache-only',
  });

  return mapData(cacheResult.data, options.dataMap);
}
