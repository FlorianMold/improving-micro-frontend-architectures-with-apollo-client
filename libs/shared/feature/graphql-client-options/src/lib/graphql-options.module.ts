import { NgModule, Optional } from '@angular/core';
import { Apollo, APOLLO_FLAGS, APOLLO_OPTIONS, ApolloModule, Flags } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { UI_APPLICATION_NAME, UI_BASE_ENVIRONMENT } from '@ui-frontend-service/shared/feature/common-options';
import { UI_GRAPHQL_CLIENT_CACHE, UiGraphQLClientInMemoryCache } from './graphql-cache.token';
import { UI_GRAPHQL_CLIENT_OPTIONS_CONFIG } from './graphql-options.token';
import { createGraphQLClientWithName } from './graphql-client.factory';
import { UiGraphQLProviderOptions } from '@ui-frontend-service/shared/types/graphql-client-types';
import {
  UI_REDUCE_QUERY_OPTIONS,
  UiGraphQLClient,
  UiGraphQLClientImpl,
  UiReduceGraphQLClientImpl,
  UiReduceQueryOptions,
} from './client';
import { UiGraphQLEnvironmentLoaderService } from './environment-loader';

let uniqueId = 0;

@NgModule({
  exports: [ApolloModule],
})
export class UiGraphQLClientOptionsModule {
  /**
   * Generates a unique id for the graphql-client.
   *
   * @param identifier The identifier to use for the id.
   */
  static generateUniqueId(identifier?: string) {
    return `${identifier}-graphql-client-options-${uniqueId++}`;
  }

  /**
   *
   * Determines, whether the graphql-providers are provided or not.
   * This is needed, when a new client should be provided or if no client is provided at all.
   *
   * @param identifier The unique identifier for the graphql-client.
   * @param config The options for the graphql-client
   */
  static getGraphQLProviders(identifier: string, config: UiGraphQLProviderOptions) {
    return config.provideGraphQLClientOptions
      ? [
          {
            provide: APOLLO_FLAGS,
            useValue: {
              useInitialLoading: true,
              useMutationLoading: true,
            } as Flags,
          },
          {
            provide: APOLLO_OPTIONS,
            useFactory: createGraphQLClientWithName(UiGraphQLClientOptionsModule.generateUniqueId(identifier), config),
            deps: [
              HttpLink,
              UiGraphQLEnvironmentLoaderService,
              UiLoggerService,
              UI_APPLICATION_NAME,
              UI_BASE_ENVIRONMENT,
              UI_GRAPHQL_CLIENT_OPTIONS_CONFIG,
              UI_GRAPHQL_CLIENT_CACHE,
            ],
          },
        ]
      : [];
  }

  static getGraphQLClient() {
    return {
      provide: UiGraphQLClient,
      useFactory: (
        apollo: Apollo,
        logger: UiLoggerService,
        cache: UiGraphQLClientInMemoryCache,
        reduceOptions?: UiReduceQueryOptions
      ) => {
        return reduceOptions?.reduceQueries
          ? new UiReduceGraphQLClientImpl(apollo, logger, cache)
          : new UiGraphQLClientImpl(apollo, logger);
      },
      deps: [Apollo, UiLoggerService, UI_GRAPHQL_CLIENT_CACHE, [new Optional(), UI_REDUCE_QUERY_OPTIONS]],
    };
  }

  /**
   * Creates a new graphql-client with the given config.
   * Every application can have a separate graphql-client, but a shared cache.
   * The cache-instance should be provided in the root-module of the application, so that it is unique.
   *
   * @param identifier A unique identifier used for the options-module. Used for debugging purposes.
   * @param config The configuration options for the graphql-options module.
   */
  static withConfig(identifier: string, config: UiGraphQLProviderOptions) {
    return {
      ngModule: UiGraphQLClientOptionsModule,
      providers: [
        UiGraphQLClientOptionsModule.getGraphQLProviders(identifier, config),
        UiGraphQLClientOptionsModule.getGraphQLClient(),
      ],
    };
  }
}
