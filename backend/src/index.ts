import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { GraphQLContext, Session, SubscriptionContext } from "./util/types";

const main = async () => {
  dotenv.config();
  // ANCHOR Create the schema, which will be used separately by ApolloServer and the WebSocket server.
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // ANCHOR Create an Express app and HTTP server; we will attach both the WebSocket server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = http.createServer(app);

  // ANCHOR Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql/subscriptions",
  });

  // ANCHOR Context Parameter
  const prisma = new PrismaClient();
  const pubsub = new PubSub();

  // ANCHOR Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: SubscriptionContext): Promise<GraphQLContext> => {
        // ctx is the graphql-ws Context where connectionParams live
        if (ctx.connectionParams && ctx.connectionParams.session) {
          const { session } = ctx.connectionParams;
          return { session, prisma, pubsub };
        }
        // Otherwise let our resolvers know we don't have a current user
        return { session: null, prisma, pubsub };
      },
    },
    wsServer
  );

  // ANCHOR Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQLContext> => {
        const session = await getSession({ req });
        return { session: session as Session, prisma, pubsub };
      },
    })
  );

  // ANCHOR Now that our HTTP server is fully set up, we can listen to it.
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main().catch((error) => console.log(error));
