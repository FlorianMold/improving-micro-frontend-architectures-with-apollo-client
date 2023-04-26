import { InjectionToken } from '@angular/core';

/**
 * Configurable options for the augmented graphql queries.
 */
export interface UiReduceQueryOptions {
  /** Whether the queries should be reduced. */
  reduceQueries: boolean;
}

/**
 * Injection token that can be used to provide configuration for the reduction of queries
 */
export const UI_REDUCE_QUERY_OPTIONS = new InjectionToken<UiReduceQueryOptions>('ui-reduce-query-options');
