import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${GRAPHQL_URL}/graphql`,
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
