import { useInjector } from "@ui-frontend-service/shared/ui/ng-react";
import { VERSION } from "./core/version";
import { ApolloClient, ApolloProvider, gql } from "@apollo/client";
import PaymentMethodList from "./contact-list/payment-method-list";
import { apolloClient } from "./core/graphql/apollo-client";

export const UI_GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    getAuthenticatedUser @client {
      id
      username
      email
      token
    }
  }
`;

export function App() {
  const injector = useInjector();

  const client = new ApolloClient({
    /** Use the endpoint from the host. */
    uri: injector.graphQLEndpoint,
    cache: injector.graphQLClientCache,
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
        returnPartialData: true,
        notifyOnNetworkStatusChange: true,
      },
    },
  });

  /** Store the apollo-client globally. */
  apolloClient(client);

  return (
    <ApolloProvider client={client}>
      <PaymentMethodList></PaymentMethodList>
      <p style={{ marginTop: "1rem" }}>{VERSION}</p>
    </ApolloProvider>
  );
}

export default App;
