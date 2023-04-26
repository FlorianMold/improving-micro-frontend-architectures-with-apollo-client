import { QueryCacheOptions, QueryVariables } from './augmented-query.interface';
import { map, Observable } from 'rxjs';
import { mapData } from './mapData';
import { ApolloQueryResult } from '@apollo/client';
import { UiApollo, UiTypedDocumentNode } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * Executes the given query against the cache.
 *
 * @param queryAst The query to execute against the cache.
 * @param variables The variables of the query.
 * @param options The options for the cache-query.
 * @param client The graphql-client.
 */
export function queryCache<TData, TVariables extends QueryVariables>(
  queryAst: UiTypedDocumentNode<TData, TVariables>,
  variables: TVariables | undefined,
  options: QueryCacheOptions | undefined,
  client: UiApollo
): Observable<ApolloQueryResult<TData>> {
  const result = client.query({
    query: queryAst,
    variables,
    fetchPolicy: 'cache-only',
  });

  return result.pipe(map((data) => mapData(data, options?.dataMap)));
}
