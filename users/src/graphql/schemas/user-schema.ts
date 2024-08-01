// ./src/users/user-schema.ts
import { gql } from "graphql-tag";

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  type Query {
    users: [User!]!
    me: User
  }

  type Mutation {
    register(username: String!, password: String!, role: String!): User!
    login(username: String!, password: String!): AuthPayload!
    changePassword(currentPassword: String!, newPassword: String!, confirmPassword: String!): Boolean!
    deleteUser(id: ID!): Boolean!
  }

  type User @key(fields: "id") {
    id: ID!
    username: String!
    password: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

export default typeDefs;
