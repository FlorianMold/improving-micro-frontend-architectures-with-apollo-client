import { UiLoggerService } from '@ui-frontend-service/shared/feature/logger';
import { onError } from '@apollo/client/link/error';

/**
 * Creates the error-handler for the graphql-client.
 *
 * @param logger The logger for the errors.
 */
export function handleGraphQLClientErrors(logger: UiLoggerService) {
  return onError(({ graphQLErrors, networkError, operation, response }) => {
    if (graphQLErrors) {
      logger.error('[GRAPHQL ERROR]', graphQLErrors);
    }

    if (networkError) {
      logger.error('[NETWORK ERROR]', networkError);
    }

    if (operation) {
      logger.error('[OPERATION]', operation);
    }

    if (response) {
      logger.error('[RESPONSE]', response);
    }
  });
}
