import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";

// TODO change to real-time app
// NOTE GraphQL API와 REST API의 차이점은 graphQL의 endpoint uri는 ONLY ONE이라는 점!
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // apollo server uri
  credentials: "include",
});

// WebSocket
// NOTE Nextjs에서 제공하는 SSR에서 사용하지 못하는 객체를 생성할때 쓰이는 방식
// NOT NextJs Server && In Browser
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:4000/graphql/subscriptions",
          connectionParams: async () => ({
            session: await getSession(),
          }),
        })
      )
    : null;

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
