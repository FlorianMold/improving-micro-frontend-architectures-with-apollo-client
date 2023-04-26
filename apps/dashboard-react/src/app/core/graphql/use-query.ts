import { QueryVariables, WatchReduceQueryOptions } from '@ui-frontend-service/shared/feature/graphql-augmented-operations';
import { useReducedQuery } from './use-reduced-query';
import { useCacheQuery } from './use-cache-query';

/**
 * Reduces the given query by removing all fields that are not required for the given operation.
 * Afterwards executes the reduced query and executes the original query against the cache and returns
 * the merged result of both operations.
 *
 * @param options The options for reducing the query.
 */
export function useQuery<TData, TVariables extends QueryVariables>(options: WatchReduceQueryOptions<TData, TVariables>) {
  const reducedResult = useReducedQuery(options);
  const cacheData = useCacheQuery(options);

  return {
    ...reducedResult,
    data: cacheData,
    loading: !cacheData,
  };
}
