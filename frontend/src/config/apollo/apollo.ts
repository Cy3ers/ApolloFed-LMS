import { ApolloClient, InMemoryCache, split, createHttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const url = process.env.REACT_APP_API_BASE_URL;
const ws_url = process.env.REACT_APP_WS_SERVER;

const httpLink = createHttpLink({
  uri: url
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: ws_url ?? "ws://localhost:5000/graphql",
    // shouldRetry: () => true,
    // retryAttempts: 5,
    shouldRetry: () => true, //retry on connection problem
    lazy: false, //connect as soon as the client is created
    retryAttempts: 6, //if 0 then fail immediately else keep trying to connect
    connectionParams: () => ({
      authToken: localStorage.getItem("token")
    })
  })
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  authLink.concat(wsLink),
  // httpLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client;
