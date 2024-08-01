// ./src/users/index.ts
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import typeDefs from "./graphql/schemas/user-schema";
import resolvers from "./graphql/resolvers/user-resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import { getUserFromToken, Context } from "./context/auth-context";
import { applyMiddleware } from "graphql-middleware";
import requireRole from "./middleware/authMiddleware";
import { roles } from "./constants/roles";

dotenv.config();

const permissions = {
  Query: {
    users: requireRole(roles.ADMIN)
  },
  Mutation: {
    register: requireRole(roles.ADMIN),
    deleteUser: requireRole(roles.ADMIN)
  }
};

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);
  const schemaWithMiddleware = applyMiddleware(schema, permissions);

  const server = new ApolloServer<Context>({
    schema: schemaWithMiddleware,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await sequelize.sync();
  console.log("User models synchronized successfully.");

  await server.start();
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = await getUserFromToken(token);
        return { user };
      }
    })
  );

  const port = process.env.USERS_PORT || 4001;
  httpServer.listen(port, () => {
    console.log(`🚀 User service ready at http://localhost:${port}/graphql`);
  });
};

startServer().catch((err) => {
  console.error("Unable to start the user server:", err);
});
