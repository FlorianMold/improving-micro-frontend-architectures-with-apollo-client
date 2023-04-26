import { InjectionToken } from '@angular/core';
import { InMemoryCache, InMemoryCacheConfig } from '@apollo/client/core';

/**
 * Re-export the graphql cache with an alias. This is helpful if the cache
 * implementation is changed in the future. No app has to be changed, when the
 * cache is switched.
 */
export class UiGraphQLClientInMemoryCache extends InMemoryCache {
  /** Increase the visible of the cache-config, otherwise the object would not be visible. */
  override config!: InMemoryCacheConfig;
}

/**
 * Injection token that be used to provide a shared cache for the graphql-client.
 * Therefore, multiple graphql-clients can share the same cache.
 */
export const UI_GRAPHQL_CLIENT_CACHE = new InjectionToken<UiGraphQLClientInMemoryCache>('ui-graphql-client-cache');
