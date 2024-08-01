// ./containers/UserListContainer.tsx

import React, { useEffect } from "react";
import UserList from "../components/UserList";
import { useToast } from "../contexts/ToastContext";
import { ALL_USERS } from "../GQL/queries";
import { REGISTER_USER, DELETE_USER } from "../GQL/mutations";
import { useGqlQuery } from "../hooks/useGraphQL";

interface User {
  id?: string;
  username: string;
  password: string;
  role: string;
}

const UserListContainer: React.FC = () => {
  const { showToast } = useToast();
  const {
    data: allUsersData,
    loading: allUsersLoading,
    save: addUserMutation,
    refetch: refetchAllUsers
  } = useGqlQuery<{ users: User[] }, { username: string; password: string; role: string }>({
    query: ALL_USERS,
    mutation: REGISTER_USER
  });

  const { save: deleteUser } = useGqlQuery({ query: ALL_USERS, mutation: DELETE_USER });

  useEffect(() => {
    refetchAllUsers();
  }, [refetchAllUsers]);

  const addUser = async (user: { username: string; password: string; role: string }) => {
    try {
      await addUserMutation({
        username: user.username,
        password: user.password,
        role: user.role
      });
      refetchAllUsers();
      showToast("User Added Successfully!");
    } catch (err) {
      console.error("Error adding user:", err);
      showToast("Failed to add user.");
    }
  };

  const removeUser = async (id: string) => {
    const user = allUsersData?.users.find((user: User) => user.id === id);
    if (!user) {
      showToast("User not found.");
      return;
    }

    try {
      await deleteUser({ id: id });
      refetchAllUsers();
      showToast("User Deleted Successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      showToast("Failed to delete user.");
    }
  };

  if (allUsersLoading) return <p>Loading...</p>;

  return (
    <UserList
      users={allUsersData?.users || []}
      addUser={addUser}
      removeUser={removeUser}
    />
  );
};

export default UserListContainer;
