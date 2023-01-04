import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// TODO change to real-time app
// NOTE GraphQL API와 REST API의 차이점은 graphQL의 endpoint uri는 ONLY ONE이라는 점!
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // apollo server uri
  credentials: "include",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
