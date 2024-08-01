// ./src/gateway/index.ts
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
import { getUserFromToken, Context } from "./context/auth-context";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

dotenv.config();

const startGateway = async () => {
  const app = express();
  app.use(cors());
  const httpServer = createServer(app);

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "users", url: `http://localhost:${process.env.USERS_PORT || 4001}/graphql` },
        { name: "tasks", url: `http://localhost:${process.env.TASKS_PORT || 4002}/graphql` }
      ]
    }),
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          // Forward the authorization header to the downstream services
          request.http?.headers.set("Authorization", context.token || "");
        }
      });
    }
  });

  const server = new ApolloServer<Context>({
    gateway,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = await getUserFromToken(token);
        return { user, token };
      }
    })
  );

  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => {
    console.log(`🚀 Gateway server ready at http://localhost:${port}/graphql`);
  });
};

startGateway().catch((err) => {
  console.error("Unable to start the gateway server:", err);
});
