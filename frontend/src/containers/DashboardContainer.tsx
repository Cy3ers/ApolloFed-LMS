// ./containers/DashboardContainer.tsx

import React from "react";
// import { useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth";
import AdminDashboardContainer from "./AdminDashboardContainer";
import UserDashboard from "../components/UserDashboard";
// import AddTask from "../components/AddTask";
// import UserListContainer from "./UserListContainer";
// import { useQuery } from "@apollo/client";
// import { GET_ME } from "../GQL/queries";

interface DashProps {
  isAdmin: boolean;
}

const DashboardContainer: React.FC<DashProps> = ({ isAdmin }) => {
  // const { data } = useQuery(GET_ME);
  // const isAdmin = data?.me?.role === "admin";
  const auth = isAuthenticated();
  // const location = useLocation();

  if (!auth) {
    return <div>Error: Not Authorized</div>;
  }

  console.log(`in Dashboard container isAdmin: ${isAdmin}`);

  // if (location.pathname === "/dashboard" && !isAdmin) {
  //   return <UserDashboard />;
  // }

  // if (location.pathname === "/dashboard/pass" && !isAdmin) {
  //   return <div>Error: Not Authorized</div>;
  // }

  // if (isAdmin) {
  //   switch (location.pathname) {
  //     case "/dashboard":
  //       return <AdminDashboardContainer />;
  //     case "/dashboard/task":
  //       return <AddTask />;
  //     case "/dashboard/user":
  //       return <UserListContainer />;
  //     default:
  //       return <div>Error: Not Authorized</div>;
  //   }
  // }

  // return <div>Error: Not Authorized</div>;

  return isAdmin ? <AdminDashboardContainer /> : <UserDashboard />;
};

export default DashboardContainer;
