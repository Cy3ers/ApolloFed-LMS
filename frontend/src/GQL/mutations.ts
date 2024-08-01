import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!, $status: String!, $priority: String!) {
    createTask(title: $title, description: $description, status: $status, priority: $priority) {
      id
      title
      description
      status
      priority
      userId
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String!, $description: String!, $status: String!, $priority: String!) {
    updateTask(id: $id, title: $title, description: $description, status: $status, priority: $priority) {
      id
      title
      description
      status
      priority
      userId
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!, $role: String!) {
    register(username: $username, password: $password, role: $role) {
      id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
