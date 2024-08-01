// ./src/tasks/task-schema.ts
import { gql } from "graphql-tag";

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!, description: String!, status: String!, priority: String!): Task!
    updateTask(id: ID!, title: String, description: String, status: String, priority: String): Task!
    deleteTask(id: ID!): Boolean!
  }

  type Task @key(fields: "id") {
    id: ID!
    title: String!
    description: String!
    status: String!
    priority: String!
    userId: ID!
  }
`;

export default typeDefs;
