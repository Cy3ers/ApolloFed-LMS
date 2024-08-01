// ./App.tsx

import React from "react";
import { createBrowserRouter, RouterProvider, RouteObject, Navigate, Outlet } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import DashboardContainer from "./containers/DashboardContainer";
import AddTask from "./components/AddTask";
import UserListContainer from "./containers/UserListContainer";
import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "./auth";
import ToastProvider from "./contexts/ToastContext";
import { ErrorBoundary } from "react-error-boundary";
import { RenderError } from "./components/errors/ErrorBoundaryComponent";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "./config/apollo/apollo";
import ThemeContextProvider from "./contexts/theme";
import ChangePassContainer from "./containers/ChangePassContainer";
import { GET_ME } from "./GQL/queries";

const Main: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const isAdmin = data?.me?.role === "admin";

  const adminRoutes: RouteObject[] = [
    {
      path: "login",
      element: <LoginContainer />
    },
    {
      path: "dashboard",
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: <DashboardContainer isAdmin={isAdmin} />
        },
        {
          path: "task",
          element: <AddTask />
        },
        {
          path: "user",
          element: <UserListContainer />
        }
      ]
    },
    {
      path: "/",
      element: isAuthenticated() ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
    }
  ];
  const userRoutes: RouteObject[] = [
    {
      path: "login",
      element: <LoginContainer />
    },
    {
      path: "dashboard",
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: <DashboardContainer isAdmin={isAdmin} />
        },
        {
          path: "pass",
          element: <ChangePassContainer />
        }
      ]
    },
    {
      path: "/",
      element: isAuthenticated() ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
    }
  ];

  const router = createBrowserRouter(isAdmin ? adminRoutes : userRoutes);

  return <RouterProvider router={router} />;
};

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ThemeContextProvider>
      <div className='App'>
        <ErrorBoundary
          FallbackComponent={RenderError}
          onError={() => console.log("Some error caught!!")}
        >
          <ToastProvider>
            <Main />
          </ToastProvider>
        </ErrorBoundary>
      </div>
    </ThemeContextProvider>
  </ApolloProvider>
);

export default App;
