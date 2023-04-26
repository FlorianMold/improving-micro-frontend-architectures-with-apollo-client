/**
 * The key for storing a value inside the environment.
 */
export type UiGraphQLEnvironmentIdentifier = string;

/**
 * The configuration, which is needed to create the graphql-client.
 */
export type UiGraphQLEnvironmentType = {
  graphQLEndpoint: string;
};
