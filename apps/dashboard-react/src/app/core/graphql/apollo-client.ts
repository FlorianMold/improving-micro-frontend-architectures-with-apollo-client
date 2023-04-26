import { ApolloClient } from '@apollo/client';

/**
 * The instance of the client.
 */
let clientInstance: ApolloClient<unknown>;

/**
 * Stores the given apollo-client instance. And returns the stored instance.
 *
 * @param client The apollo client instance.
 */
export function apolloClient(client?: ApolloClient<unknown>) {
  if (client) {
    clientInstance = client;
  }

  return clientInstance;
}
