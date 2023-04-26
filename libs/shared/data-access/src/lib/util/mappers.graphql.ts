import { UiGraphQLQueryResult, UiMutationResult } from '@ui-frontend-service/shared/types/graphql-client-types';

/**
 * Maps the result of a graphql-query to a query-result.
 */
export function mapQueryResult<T>() {
  return (result: UiGraphQLQueryResult<T>) => ({
    ...result.data,
    error: result.error,
    errors: result.errors,
    loading: result.loading,
    networkStatus: result.networkStatus,
    partial: result.partial,
  });
}

/**
 * Maps the result of a graphql-mutation to a mutation-result.
 */
export function mapMutationResult<T>() {
  return (result: UiMutationResult<T>) => ({
    ...result.data,
    loading: result.loading,
    errors: result.errors,
    extensions: result.extensions,
  });
}
