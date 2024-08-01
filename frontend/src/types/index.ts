// ./types/index.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  userId?: number;
}

export interface User {
  id?: string;
  username: string;
}

export interface UserListProps {
  users: User[];
  addUser: (user: { username: string; password: string; role: string }) => void;
  removeUser: (username: string) => void;
}
