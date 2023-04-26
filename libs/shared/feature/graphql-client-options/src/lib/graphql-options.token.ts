import { InjectionToken } from '@angular/core';
import { TypePolicies } from '@apollo/client';

/**
 * Configurable options for the graphql-client options module.
 */
export interface UiGraphQLClientOptionsConfig {
  /**
   * Whether the cache is provided through an injection-token inside the application.
   * Or if a new cache should be created when the graphql-client is created.
   *
   * By default, the cache is shared.
   */
  shareCache: boolean;

  /**
   * Whether the cache should be persisted in the local-storage.
   * The cache is rehydrated on the next application start.
   */
  persistCache: boolean;

  /**
   * Whether to add the given type-policies to the cache.
   */
  useTypePolicies: boolean;

  /**
   * The type-policies for the graphql-client.
   * If a single client is used, the type-policies are merged inside the cache.
   */
  typePolicies?: TypePolicies;
}

/**
 * Injection token that can be used to provide a config for the creation of the graphql-client.
 */
export const UI_GRAPHQL_CLIENT_OPTIONS_CONFIG = new InjectionToken<UiGraphQLClientOptionsConfig>('ui-graphql-options-config');
