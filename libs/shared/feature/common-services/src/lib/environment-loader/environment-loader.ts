import { UiEnvironmentIdentifier } from './environment-loader.type';

export abstract class UiEnvironmentLoaderService {
  /**
   * The map where the configuration is stored.
   */
  configMap!: Map<UiEnvironmentIdentifier, unknown>;

  /**
   * Loads the configuration at the given path and stores the result with the given
   * identifier to be able the get the result later.
   *
   * @param identifier A unique identifier, which can be used to get the result later.
   * @param configPath The path to the config-file to load
   */
  abstract storeResource(identifier: UiEnvironmentIdentifier, configPath: string): Promise<void>;

  /**
   * Tries to load the configuration for the given key.
   *
   * @param identifier The unique key for the configuration.
   */
  abstract getConfigurationValue(identifier: UiEnvironmentIdentifier): unknown;
}
