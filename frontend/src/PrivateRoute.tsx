// ./PrivateRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
