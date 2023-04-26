import { HttpLink } from 'apollo-angular/http';
import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { UiBaseEnvironment } from '@ui-frontend-service/shared/feature/common-options';
import { UiGraphQLClientOptionsConfig } from './graphql-options.token';
import { handleGraphQLClientErrors } from './graphql-error-handler';
import { UiGraphQLProviderOptions } from '@ui-frontend-service/shared/types/graphql-client-types';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { UiGraphQLEnvironmentLoaderService } from './environment-loader';
import { UiGraphQLClientInMemoryCache } from './graphql-cache.token';

/**
 * A closure for the creation of the graphql-client options. Adds the possibility to add a name to the
 * client, which can be used for debugging purposes. This is needed, because I can't directly pass the config
 * from the `withConfig`-method to the factory-function, which creates the graphql-client.
 *
 * @param id The name of the module, which uses the graphql-client.
 * @param config The configuration for the graphql-client.
 */
export const createGraphQLClientWithName = (id: string, config: UiGraphQLProviderOptions) => {
  /**
   * The factory function for creating the graphql-client options.
   *
   * @param httpLink The http-link to use for the graphql-client.
   * @param environmentLoader The service to load the environment.
   * @param logger The logger service.
   * @param applicationName The application-name for the graphql-client.
   * @param cache The cache to use.
   * @param environment The environment configuration of the app that creates the client.
   * @param graphQLClientOptions The options for the graphql-client.
   */
  return function createGraphQLClient(
    httpLink: HttpLink,
    environmentLoader: UiGraphQLEnvironmentLoaderService,
    logger: UiLoggerService,
    applicationName: string,
    environment: UiBaseEnvironment,
    graphQLClientOptions: UiGraphQLClientOptionsConfig,
    cache: InMemoryCache
  ): ApolloClientOptions<unknown> {
    const { graphQLEndpoint } = environmentLoader.getConfigurationValue(applicationName);

    if (!graphQLEndpoint) {
      throw new Error('No graphql-endpoint configured!');
    }

    logger.info(applicationName, id, config);

    const http = httpLink.create({
      uri: graphQLEndpoint,
    });

    const errorHandler = handleGraphQLClientErrors(logger);
    const link = errorHandler.concat(http);

    const { shareCache, persistCache: isCachePersisted, useTypePolicies, typePolicies } = graphQLClientOptions;

    /** Whether the provided cache should be used if a new cache should be created. */
    const clientCache = shareCache ? cache : new UiGraphQLClientInMemoryCache();

    /** If the config provides extra type-policies, append them to the cache. */
    if (typePolicies && useTypePolicies) {
      clientCache.policies.addTypePolicies(typePolicies);
      logger.debug(clientCache.policies);
    }

    if (isCachePersisted) {
      void persistCache({
        cache: clientCache,
        storage: new LocalStorageWrapper(window.localStorage),
      }).then(() => logger.debug(createGraphQLClient.name, 'Persist the graphql-client cache inside the LocalStorage.'));
    }

    return {
      name: applicationName,
      connectToDevTools: environment.connectToDevTools,
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
          returnPartialData: true,
          notifyOnNetworkStatusChange: true,
        },
      },
      link,
      cache: clientCache,
    };
  };
};
