import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { UiEmptyObject, UiMutationOptions, UiMutationResult } from '@ui-frontend-service/shared/types/graphql-client-types';
import { QueryVariables, UiGraphQLClient, UiWatchQueryOptions } from './graphql-client.abstract';
import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { getQueryName } from '@ui-frontend-service/shared/feature/graphql-augmented-operations';

const queryMap = new Map<string, number>();

@Injectable()
export class UiGraphQLClientImpl implements UiGraphQLClient {
  constructor(private _graphqlClient: Apollo, private _logger: UiLoggerService) {
    this._logger.debug('Creating UiGraphQLClientImpl');
  }

  /**
   * Creates a watch-query.
   *
   * @param options The options to use to create the query.
   */
  watchQuery<TData, TVariables extends QueryVariables>(
    options: UiWatchQueryOptions<TData, TVariables>
  ): Observable<ApolloQueryResult<TData>> {
    /** TODO: Remove later */
    const queryName = getQueryName(options.query);

    if (queryMap.has(queryName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- queryName is checked for existence
      queryMap.set(queryName, queryMap.get(queryName)! + 1);
    } else {
      queryMap.set(queryName, 1);
    }

    this._logger.debug(queryMap);

    return this._graphqlClient.watchQuery<TData, TVariables>(options).valueChanges;
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
}
