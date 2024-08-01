import { gql } from "@apollo/client";

export const ALL_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      status
      priority
      userId
    }
  }
`;

export const ALL_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
      role
    }
  }
`;
