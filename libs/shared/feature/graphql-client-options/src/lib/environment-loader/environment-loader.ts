import { UiGraphQLEnvironmentIdentifier, UiGraphQLEnvironmentType } from './environment-loader.type';

/**
 * Assume that the `UiGraphQLEnvironmentType` is stored.
 */
export abstract class UiGraphQLEnvironmentLoaderService {
  /**
   * The map where the configuration is stored.
   *
   * The graphql-client needs only a subset of the environment, therefore assume that only the subset is stored.
   */
  configMap!: Map<UiGraphQLEnvironmentIdentifier, UiGraphQLEnvironmentType>;

  /**
   * Tries to load the configuration for the given key.
   *
   * @param identifier The unique key for the configuration.
   */
  abstract getConfigurationValue(identifier: UiGraphQLEnvironmentIdentifier): UiGraphQLEnvironmentType;
}
